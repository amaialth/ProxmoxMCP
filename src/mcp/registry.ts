import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ProxmoxTool } from '../tools/types.js';

import { accessTools } from '../tools/access.js';
import { backupTools } from '../tools/backup.js';
import { clusterTools } from '../tools/cluster.js';
import { firewallTools } from '../tools/firewall.js';
import { haTools } from '../tools/ha.js';
import { lxcTools } from '../tools/lxc.js';
import { nodesTools } from '../tools/nodes.js';
import { poolsTools } from '../tools/pools.js';
import { qemuTools } from '../tools/qemu.js';
import { sdnTools } from '../tools/sdn.js';
import { storageTools } from '../tools/storage.js';

export const allTools: ProxmoxTool[] = [
  ...accessTools,
  ...backupTools,
  ...clusterTools,
  ...firewallTools,
  ...haTools,
  ...lxcTools,
  ...nodesTools,
  ...poolsTools,
  ...qemuTools,
  ...sdnTools,
  ...storageTools,
];

export const toolMap = new Map<string, ProxmoxTool>();
for (const tool of allTools) {
  toolMap.set(tool.name, tool);
}

export function registerToolsToMcpServer(server: Server): void {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: allTools.map((t) => ({
        name: t.name,
        description: t.description,
        inputSchema: {
          type: 'object',
          properties: t.parameters.properties || {},
          required: t.parameters.required || [],
        },
      })),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = toolMap.get(name);

    if (!tool) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: Unknown tool '${name}'`,
          },
        ],
        isError: true,
      };
    }

    try {
      const result = await tool.execute(args || {});
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error executing ${name}: ${err.message || String(err)}`,
          },
        ],
        isError: true,
      };
    }
  });
}
