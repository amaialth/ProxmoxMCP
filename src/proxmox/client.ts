import { getConfig, ProxmoxConfig } from '../config.js';

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
    const protocol = this.config.port === 80 ? 'http' : 'https';
    const host = this.config.host || '127.0.0.1';
    return `${protocol}://${host}:${this.config.port}/api2/json`;
  }

  private getFetchOptions(): Record<string, any> {
    const opts: Record<string, any> = {};
    // Bun native TLS verification setting
    if (typeof (globalThis as any).Bun !== 'undefined' && this.config.port !== 80) {
      opts.tls = {
        rejectUnauthorized: this.config.verifySsl,
      };
    }
    return opts;
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
        'Proxmox password is required for ticket-based authentication.'
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
        'PROXMOX_HOST environment variable is not configured.'
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
          if (val !== undefined && val !== null) {
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
          `Proxmox API Error [${normalizedMethod} ${cleanPath}] (${response.status}): ${errBody}`
        );
      }

      const resJson = (await response.json()) as any;
      return resJson.data !== undefined ? resJson.data : resJson;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`Proxmox API request timed out after ${this.config.timeout}ms [${normalizedMethod} ${cleanPath}]`);
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
