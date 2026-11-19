import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerToolsToMcpServer, getExposedTools } from './registry.js';
import { SERVER_NAME, VERSION } from '../version.js';
import { getConfig } from '../config.js';

export function createMcpServer(): Server {
  const config = getConfig();
  const server = new Server(
    {
      name: SERVER_NAME,
      version: VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
      instructions: [
        `Tools for a Proxmox VE cluster at ${config.host || '(PROXMOX_HOST not set)'}.`,
        'Start with list_nodes or get_cluster_resources to discover node names and VM IDs.',
        'vm_* guest tools (vm_run_shell, vm_docker_ps, ...) run as root inside QEMU VMs through the guest agent.',
        'There is no tool to run commands on the Proxmox host itself or inside LXC containers.',
        config.readOnly ? 'The server is in read-only mode: write tools are hidden.' : '',
      ]
        .filter(Boolean)
        .join(' '),
    }
  );

  registerToolsToMcpServer(server);
  return server;
}

export async function runStdioServer(): Promise<void> {
  const mcpServer = createMcpServer();
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error(
    `[Proxmox MCP] v${VERSION} stdio server running (${getExposedTools().length} tools, host ${getConfig().host || 'not configured'}).`
  );
}
