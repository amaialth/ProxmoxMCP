import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

/**
 * A value that is effectively "not set": empty, or a template placeholder a
 * client left unexpanded (e.g. `${user_config.host}` or `${PROXMOX_HOST}` when
 * the plugin option / env var was never filled in).
 */
export function isUnsetValue(val: string | undefined): boolean {
  if (val === undefined) return true;
  const v = val.trim();
  return v === '' || /^\$\{[^}]*\}$/.test(v);
}

/** Config files checked in order; earlier files win. Real env vars always win over files. */
export function configFileCandidates(env: NodeJS.ProcessEnv = process.env, cwd: string = process.cwd()): string[] {
  const xdg = !isUnsetValue(env.XDG_CONFIG_HOME) ? env.XDG_CONFIG_HOME! : join(homedir(), '.config');
  const list = [
    !isUnsetValue(env.PROXMOX_MCP_ENV_FILE) ? resolve(env.PROXMOX_MCP_ENV_FILE!) : '',
    resolve(cwd, '.env'),
    join(xdg, 'proxmox-mcp', '.env'),
    join(homedir(), '.proxmox-mcp.env'),
  ];
  return [...new Set(list.filter(Boolean))];
}

/**
 * Fill unset variables from config files. Unlike plain dotenv this also
 * replaces empty values and unexpanded `${...}` placeholders, which is what
 * MCP clients pass when an optional plugin setting was left blank.
 * Returns the files that were loaded.
 */
/**
 * Plugin settings (userConfig) reach the server as CLAUDE_PLUGIN_OPTION_<KEY>.
 * Map them onto the PROXMOX_* names. An explicit PROXMOX_* value wins.
 */
export const PLUGIN_OPTION_ALIASES: Record<string, string> = {
  CLAUDE_PLUGIN_OPTION_HOST: 'PROXMOX_HOST',
  CLAUDE_PLUGIN_OPTION_PORT: 'PROXMOX_PORT',
  CLAUDE_PLUGIN_OPTION_TOKEN_ID: 'PROXMOX_TOKEN_NAME',
  CLAUDE_PLUGIN_OPTION_TOKEN_SECRET: 'PROXMOX_TOKEN_VALUE',
  CLAUDE_PLUGIN_OPTION_VERIFY_SSL: 'PROXMOX_VERIFY_SSL',
  CLAUDE_PLUGIN_OPTION_READ_ONLY: 'PROXMOX_READ_ONLY',
  CLAUDE_PLUGIN_OPTION_MODULES: 'PROXMOX_MODULES',
};

export function applyPluginOptions(env: NodeJS.ProcessEnv = process.env): void {
  for (const [option, target] of Object.entries(PLUGIN_OPTION_ALIASES)) {
    const value = env[option];
    if (!isUnsetValue(value) && isUnsetValue(env[target])) env[target] = value;
  }
}

export function loadEnvFiles(env: NodeJS.ProcessEnv = process.env, cwd: string = process.cwd()): string[] {
  applyPluginOptions(env);
  const loaded: string[] = [];
  for (const file of configFileCandidates(env, cwd)) {
    if (!existsSync(file)) continue;
    let parsed: Record<string, string>;
    try {
      parsed = dotenv.parse(readFileSync(file));
    } catch {
      continue;
    }
    for (const [key, value] of Object.entries(parsed)) {
      if (isUnsetValue(env[key]) && !isUnsetValue(value)) env[key] = value;
    }
    loaded.push(file);
  }
  // Placeholders that nothing filled in are treated as unset.
  for (const key of Object.keys(env)) {
    if ((key.startsWith('PROXMOX_') || key === 'HOST' || key === 'PORT') && isUnsetValue(env[key])) {
      delete env[key];
    }
  }
  return loaded;
}

export const loadedConfigFiles: string[] = loadEnvFiles();

export interface ProxmoxConfig {
  /** Bare hostname / IP of the Proxmox API (no scheme, port or path). */
  host: string;
  port: number;
  protocol: 'http' | 'https';
  user: string;
  password?: string;
  /** Token ID only, e.g. `mcp` (never `user@realm!mcp`). */
  tokenName?: string;
  tokenValue?: string;
  verifySsl: boolean;
  readOnly: boolean;
  timeout: number;
  serverPort: number;
  serverHost: string;
  stdioMode: boolean;
  /** Bearer token required by the HTTP transport. */
  authToken?: string;
  /** Allow HTTP mode on a non-loopback address without an auth token. */
  allowUnauthenticated: boolean;
  /** Human-readable notes about values that were corrected while loading. */
  warnings: string[];
}

export function parseBool(val: string | undefined, defaultVal: boolean): boolean {
  if (val === undefined || val.trim() === '') return defaultVal;
  const lower = val.trim().toLowerCase();
  return lower === '1' || lower === 'true' || lower === 'yes' || lower === 'on';
}

function parseIntSafe(val: string | undefined, defaultVal: number): number {
  if (val === undefined || val.trim() === '') return defaultVal;
  const n = parseInt(val.trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : defaultVal;
}

/** Remove surrounding whitespace and matching quotes that often sneak into env values. */
function cleanValue(val: string | undefined): string {
  if (val === undefined || isUnsetValue(val)) return '';
  let v = val.trim();
  while (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

export interface NormalizedHost {
  host: string;
  port?: number;
  protocol?: 'http' | 'https';
  changed: boolean;
}

/**
 * Accepts anything a user is likely to paste into PROXMOX_HOST and returns the
 * bare host, plus a port/protocol if one was embedded:
 *   192.168.1.21
 *   https://192.168.1.21:8006/
 *   192.168.1.21:8006
 *   pve.lan/api2/json
 *   [https://pve.lan:8006](https://pve.lan:8006)   (markdown link)
 *   [fd00::21]:8006                                (IPv6)
 */
export function normalizeHost(raw: string | undefined): NormalizedHost {
  const original = raw ?? '';
  let v = cleanValue(original);
  if (!v) return { host: '', changed: original !== '' };

  // Markdown link: [text](url) -> url
  const md = v.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
  if (md) v = (md[2] || md[1]).trim();

  let protocol: 'http' | 'https' | undefined;
  const scheme = v.match(/^([a-z][a-z0-9+.-]*):\/\//i);
  if (scheme) {
    const s = scheme[1].toLowerCase();
    if (s === 'http' || s === 'https') protocol = s;
    v = v.slice(scheme[0].length);
  }

  // Drop any path, query or fragment.
  v = v.split(/[/?#]/)[0];
  // Drop credentials if someone pasted user:pass@host.
  if (v.includes('@')) v = v.slice(v.lastIndexOf('@') + 1);

  let host = v;
  let port: number | undefined;

  if (v.startsWith('[')) {
    // Bracketed IPv6, optional :port
    const m = v.match(/^\[([^\]]+)\](?::(\d+))?$/);
    if (m) {
      host = m[1];
      if (m[2]) port = parseInt(m[2], 10);
    }
  } else {
    const colonCount = (v.match(/:/g) || []).length;
    if (colonCount === 1) {
      const [h, p] = v.split(':');
      host = h;
      if (/^\d+$/.test(p)) port = parseInt(p, 10);
    }
    // colonCount > 1 => bare IPv6 without brackets; leave as-is.
  }

  host = host.trim();
  return { host, port, protocol, changed: host !== original.trim() };
}

export interface NormalizedToken {
  user?: string;
  tokenName?: string;
  changed: boolean;
}

/**
 * PROXMOX_TOKEN_NAME should be just the token ID (`mcp`), but the Proxmox UI
 * shows the full `user@realm!mcp`. Accept both.
 */
export function normalizeTokenName(raw: string | undefined): NormalizedToken {
  const v = cleanValue(raw);
  if (!v) return { changed: false };
  const bang = v.lastIndexOf('!');
  if (bang > 0) {
    return { user: v.slice(0, bang), tokenName: v.slice(bang + 1), changed: true };
  }
  return { tokenName: v, changed: v !== (raw ?? '').trim() };
}

function bracketIfIpv6(host: string): string {
  return host.includes(':') && !host.startsWith('[') ? `[${host}]` : host;
}

export function formatBaseUrl(config: Pick<ProxmoxConfig, 'host' | 'port' | 'protocol'>): string {
  return `${config.protocol}://${bracketIfIpv6(config.host || '127.0.0.1')}:${config.port}/api2/json`;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env, argv: string[] = process.argv): ProxmoxConfig {
  const warnings: string[] = [];

  const hostInfo = normalizeHost(env.PROXMOX_HOST);
  if (hostInfo.changed && hostInfo.host) {
    warnings.push(
      `PROXMOX_HOST "${env.PROXMOX_HOST}" was normalised to "${hostInfo.host}". ` +
        'Set it to the bare IP or hostname to silence this message.'
    );
  }

  const explicitPort = cleanValue(env.PROXMOX_PORT);
  let port = parseIntSafe(explicitPort, hostInfo.port ?? 8006);
  if (hostInfo.port && explicitPort && hostInfo.port !== port) {
    warnings.push(`PROXMOX_HOST contains port ${hostInfo.port} but PROXMOX_PORT is ${port}; using PROXMOX_PORT.`);
  }
  if (!explicitPort && hostInfo.port) port = hostInfo.port;

  const protocol: 'http' | 'https' = hostInfo.protocol ?? (port === 80 ? 'http' : 'https');

  let user = cleanValue(env.PROXMOX_USER) || 'root@pam';
  const tokenInfo = normalizeTokenName(env.PROXMOX_TOKEN_NAME ?? env.PROXMOX_TOKEN_ID);
  if (tokenInfo.user) {
    if (cleanValue(env.PROXMOX_USER) && cleanValue(env.PROXMOX_USER) !== tokenInfo.user) {
      warnings.push(
        `PROXMOX_TOKEN_NAME belongs to "${tokenInfo.user}" but PROXMOX_USER is "${cleanValue(env.PROXMOX_USER)}"; using "${tokenInfo.user}".`
      );
    }
    // The full "user@realm!tokenid" form is supported, so no warning for it.
    user = tokenInfo.user;
  }

  const tokenName = tokenInfo.tokenName || undefined;
  const tokenValue = cleanValue(env.PROXMOX_TOKEN_VALUE ?? env.PROXMOX_TOKEN_SECRET) || undefined;
  const password = cleanValue(env.PROXMOX_PASSWORD) || undefined;

  if (tokenName && !tokenValue) warnings.push('PROXMOX_TOKEN_NAME is set but PROXMOX_TOKEN_VALUE is empty.');
  if (!tokenName && tokenValue) warnings.push('PROXMOX_TOKEN_VALUE is set but PROXMOX_TOKEN_NAME is empty.');

  const stdioMode = parseBool(env.PROXMOX_STDIO, false) || argv.includes('--stdio');

  return {
    host: hostInfo.host,
    port,
    protocol,
    user,
    password,
    tokenName,
    tokenValue,
    verifySsl: parseBool(env.PROXMOX_VERIFY_SSL, false),
    readOnly: parseBool(env.PROXMOX_READ_ONLY, false),
    timeout: parseIntSafe(env.PROXMOX_TIMEOUT, 30000),
    serverPort: parseIntSafe(env.PORT, 3000),
    serverHost: cleanValue(env.HOST) || '127.0.0.1',
    stdioMode,
    authToken: cleanValue(env.PROXMOX_MCP_AUTH_TOKEN) || undefined,
    allowUnauthenticated: parseBool(env.PROXMOX_MCP_ALLOW_UNAUTHENTICATED, false),
    warnings,
  };
}

let cachedConfig: ProxmoxConfig | null = null;

export function getConfig(): ProxmoxConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}

export function resetConfig(): void {
  cachedConfig = null;
}
