#!/usr/bin/env node

import { getConfig, loadedConfigFiles } from './config.js';

async function main() {
  const config = getConfig();

  // Never write to stdout here: in stdio mode it carries the MCP protocol.
  for (const file of loadedConfigFiles) {
    console.error(`[Proxmox MCP] Loaded settings from ${file}`);
  }
  for (const warning of config.warnings) {
    console.error(`[Proxmox MCP] ${warning}`);
  }
  if (!config.host) {
    console.error(
      '[Proxmox MCP] PROXMOX_HOST is not set; every tool call will fail until it is configured. ' +
        'Set it in your client config, or in ~/.config/proxmox-mcp/.env.'
    );
  }

  if (config.stdioMode) {
    const { runStdioServer } = await import('./mcp/server.js');
    await runStdioServer();
  } else {
    const { startHttpServer } = await import('./server.js');
    await startHttpServer();
  }
}

main().catch((err) => {
  console.error('[Proxmox MCP Fatal Error]:', err?.message || err);
  process.exit(1);
});
