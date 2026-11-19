import { getConfig, ProxmoxConfig, formatBaseUrl } from '../config.js';

const isBun = typeof (globalThis as any).Bun !== 'undefined';
let nodeTlsRelaxed = false;

export interface ProxmoxTicket {
  ticket: string;
  CSRFPreventionToken: string;
  username: string;
  expiresAt: number;
}

export class ProxmoxClient {
  private config: ProxmoxConfig;
  private ticketCache: ProxmoxTicket | null = null;

  constructor(customConfig?: ProxmoxConfig) {
    this.config = customConfig || getConfig();
  }

  private get baseUrl(): string {
    return formatBaseUrl(this.config);
  }

  private getFetchOptions(): Record<string, any> {
    if (this.config.protocol !== 'https' || this.config.verifySsl) return {};

    if (isBun) {
      // Bun's fetch accepts a per-request TLS option.
      return { tls: { rejectUnauthorized: false } };
    }

    // Node's fetch (undici) has no per-request switch without an extra
    // dependency, so relax verification for this process once. Proxmox's
    // default certificate is self-signed, so this is what most users need.
    if (!nodeTlsRelaxed && process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      nodeTlsRelaxed = true;
      console.error('[Proxmox MCP] PROXMOX_VERIFY_SSL=false: TLS certificate verification is disabled for this process.');
    }
    return {};
  }

  private async getTicket(): Promise<ProxmoxTicket> {
    if (
      this.ticketCache &&
      this.ticketCache.expiresAt > Date.now() + 60 * 1000
    ) {
      return this.ticketCache;
    }

    if (!this.config.password) {
      throw new Error(
        'No Proxmox credentials configured. Set PROXMOX_TOKEN_NAME + PROXMOX_TOKEN_VALUE (recommended) or PROXMOX_USER + PROXMOX_PASSWORD.'
      );
    }

    const loginUrl = `${this.baseUrl}/access/ticket`;
    const bodyParams = new URLSearchParams({
      username: this.config.user,
      password: this.config.password,
    });

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
      ...this.getFetchOptions(),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Proxmox auth ticket request failed (${response.status}): ${errText}`);
    }

    const data = (await response.json()) as any;
    const ticketData = data.data;

    this.ticketCache = {
      ticket: ticketData.ticket,
      CSRFPreventionToken: ticketData.CSRFPreventionToken,
      username: ticketData.username,
      expiresAt: Date.now() + 115 * 60 * 1000,
    };

    return this.ticketCache;
  }

  public async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    params?: Record<string, any>
  ): Promise<T> {
    const normalizedMethod = method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE';

    if (this.config.readOnly && normalizedMethod !== 'GET') {
      throw new Error(
        `Proxmox MCP server is running in read-only mode. Write operation (${normalizedMethod} ${path}) blocked.`
      );
    }

    if (!this.config.host) {
      throw new Error(
        'PROXMOX_HOST environment variable is not configured. Set it to the IP or hostname of your Proxmox server, e.g. 192.168.1.21.'
      );
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    let url = `${this.baseUrl}${cleanPath}`;

    const headers: Record<string, string> = {};

    // Auth Strategy 1: API Token
    if (this.config.tokenName && this.config.tokenValue) {
      headers['Authorization'] = `PVEAPIToken=${this.config.user}!${this.config.tokenName}=${this.config.tokenValue}`;
    } else {
      // Auth Strategy 2: Ticket
      const ticket = await this.getTicket();
      headers['Cookie'] = `PVEAuthCookie=${ticket.ticket}`;
      if (normalizedMethod !== 'GET') {
        headers['CSRFPreventionToken'] = ticket.CSRFPreventionToken;
      }
    }

    let requestBody: string | undefined = undefined;

    if (params && Object.keys(params).length > 0) {
      if (normalizedMethod === 'GET') {
        const query = new URLSearchParams();
        for (const [key, val] of Object.entries(params)) {
          // Optional GET filters arrive as "" when a client fills in schema
          // defaults; Proxmox rejects empty values for typed parameters.
          if (val === undefined || val === null || val === '') continue;
          if (Array.isArray(val)) {
            for (const item of val) query.append(key, String(item));
          } else if (typeof val === 'boolean') {
            query.append(key, val ? '1' : '0');
          } else {
            query.append(key, String(val));
          }
        }
        const queryString = query.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      } else {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const bodyParams = new URLSearchParams();
        for (const [key, val] of Object.entries(params)) {
          if (val !== undefined && val !== null) {
            if (Array.isArray(val)) {
              for (const item of val) {
                bodyParams.append(key, String(item));
              }
            } else if (typeof val === 'boolean') {
              bodyParams.append(key, val ? '1' : '0');
            } else {
              bodyParams.append(key, String(val));
            }
          }
        }
        requestBody = bodyParams.toString();
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method: normalizedMethod,
        headers,
        body: requestBody,
        signal: controller.signal,
        ...this.getFetchOptions(),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errBody = await response.text();
        if (response.status === 401 || response.status === 403) {
          this.ticketCache = null;
        }
        throw new Error(
          `Proxmox API Error [${normalizedMethod} ${cleanPath}] (${response.status}): ${errBody || response.statusText}`
        );
      }

      const text = await response.text();
      if (!text) return null as T;
      let resJson: any;
      try {
        resJson = JSON.parse(text);
      } catch {
        return text as T;
      }
      if (resJson && typeof resJson === 'object' && 'data' in resJson) {
        return resJson.data as T;
      }
      return resJson as T;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`Proxmox API request timed out after ${this.config.timeout}ms [${normalizedMethod} ${cleanPath}]`);
      }
      if (err instanceof Error && !err.message.startsWith('Proxmox API Error')) {
        const cause = (err as any).cause?.code || (err as any).code || '';
        const hint = /CERT|SELF_SIGNED|UNABLE_TO_VERIFY|certificate/i.test(`${cause} ${err.message}`)
          ? ' The server certificate was rejected; set PROXMOX_VERIFY_SSL=false for a self-signed certificate.'
          : ` Check that ${this.baseUrl.replace('/api2/json', '')} is reachable from this computer.`;
        throw new Error(`Could not reach Proxmox [${normalizedMethod} ${cleanPath}]: ${err.message}${cause ? ` (${cause})` : ''}.${hint}`);
      }
      throw err;
    }
  }

  public get<T = any>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('GET', path, params);
  }

  public post<T = any>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('POST', path, params);
  }

  public put<T = any>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('PUT', path, params);
  }

  public delete<T = any>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('DELETE', path, params);
  }
}

let defaultClientInstance: ProxmoxClient | null = null;

/** Drop the cached client (and its config/ticket) so the next call picks up new settings. */
export function resetProxmoxClient(): void {
  defaultClientInstance = null;
}

export function getProxmoxClient(): ProxmoxClient {
  if (!defaultClientInstance) {
    defaultClientInstance = new ProxmoxClient();
  }
  return defaultClientInstance;
}

export function formatResponse(data: any): string {
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data, null, 2);
}
