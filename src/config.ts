import dotenv from 'dotenv';

dotenv.config();

export interface ProxmoxConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  tokenName?: string;
  tokenValue?: string;
  verifySsl: boolean;
  readOnly: boolean;
  timeout: number;
  serverPort: number;
  serverHost: string;
  stdioMode: boolean;
}

function parseBool(val: string | undefined, defaultVal: boolean): boolean {
  if (val === undefined || val === '') return defaultVal;
  const lower = val.trim().toLowerCase();
  return lower === '1' || lower === 'true' || lower === 'yes';
}

export function loadConfig(): ProxmoxConfig {
  const host = process.env.PROXMOX_HOST || '';
  const port = parseInt(process.env.PROXMOX_PORT || '8006', 10);
  const user = process.env.PROXMOX_USER || 'root@pam';
  const password = process.env.PROXMOX_PASSWORD || undefined;
  const tokenName = process.env.PROXMOX_TOKEN_NAME || undefined;
  const tokenValue = process.env.PROXMOX_TOKEN_VALUE || undefined;
  const verifySsl = parseBool(process.env.PROXMOX_VERIFY_SSL, false);
  const readOnly = parseBool(process.env.PROXMOX_READ_ONLY, false);
  const timeout = parseInt(process.env.PROXMOX_TIMEOUT || '30000', 10);
  const serverPort = parseInt(process.env.PORT || '3000', 10);
  const serverHost = process.env.HOST || '0.0.0.0';
  const stdioMode = parseBool(process.env.PROXMOX_STDIO, false) || process.argv.includes('--stdio');

  return {
    host,
    port,
    user,
    password,
    tokenName,
    tokenValue,
    verifySsl,
    readOnly,
    timeout,
    serverPort,
    serverHost,
    stdioMode,
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
