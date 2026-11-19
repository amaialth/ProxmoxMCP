import pkg from '../package.json' with { type: 'json' };

export const SERVER_NAME = 'proxmox-mcp-server';
export const VERSION: string = (pkg as { version: string }).version;
