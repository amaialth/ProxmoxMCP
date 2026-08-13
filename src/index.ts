#!/usr/bin/env node

import { getConfig } from './config.js';
import { runStdioServer, startHttpServer } from './server.js';

async function main() {
  const config = getConfig();

  if (config.stdioMode) {
    await runStdioServer();
  } else {
    await startHttpServer();
  }
}

main().catch((err) => {
  console.error('[Proxmox MCP Fatal Error]:', err);
  process.exit(1);
});
