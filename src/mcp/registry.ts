import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ProxmoxTool } from '../tools/types.js';
import { getConfig } from '../config.js';
import { getToolAnnotations, needsWriteAccess, ToolAnnotations } from './annotations.js';

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
import { guestServicesTools } from '../tools/guest-services.js';

/** Every tool the server knows about, regardless of configuration. */
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
  ...guestServicesTools,
];

export const toolMap = new Map<string, ProxmoxTool>();
for (const tool of allTools) {
  toolMap.set(tool.name, tool);
}

export const MODULES = Array.from(new Set(allTools.map((t) => t.module)));

export function annotationsFor(tool: ProxmoxTool): ToolAnnotations {
  return { ...getToolAnnotations(tool.name), ...(tool.annotations ?? {}) };
}

export interface ToolFilterOptions {
  readOnly?: boolean;
  /** Comma-separated module list (PROXMOX_MODULES). Empty = all modules. */
  modules?: string;
}

/**
 * Tools exposed to clients.
 *  - PROXMOX_READ_ONLY=true hides every tool that needs write access, so the
 *    model never sees tools that would only fail.
 *  - PROXMOX_MODULES=qemu,nodes,cluster limits the list for clients that cap
 *    the number of tools (Cursor, VS Code, Windsurf…).
 */
export function getExposedTools(opts: ToolFilterOptions = {}): ProxmoxTool[] {
  const cfg = getConfig();
  const readOnly = opts.readOnly ?? cfg.readOnly;
  const modulesRaw = opts.modules ?? process.env.PROXMOX_MODULES ?? '';
  const wanted = modulesRaw
    .split(',')
    .map((m) => m.trim().toLowerCase())
    .filter(Boolean);

  return allTools.filter((t) => {
    if (wanted.length > 0 && !wanted.includes(t.module.toLowerCase())) return false;
    if (readOnly && needsWriteAccess(t.name)) return false;
    return true;
  });
}

/**
 * Remove schema noise that confuses clients and models:
 *  - `default: ""` on optional strings (clients then send "" which Proxmox rejects)
 *  - generator-only `title` keys
 */
export function toInputSchema(tool: ProxmoxTool): Record<string, any> {
  const properties: Record<string, any> = {};
  for (const [key, raw] of Object.entries(tool.parameters.properties ?? {})) {
    const prop: Record<string, any> = { ...(raw as Record<string, any>) };
    if (prop.default === '') delete prop.default;
    delete prop.title;
    properties[key] = prop;
  }
  return {
    type: 'object',
    properties,
    required: tool.parameters.required ?? [],
  };
}

function textResult(text: string, isError = false) {
  return { content: [{ type: 'text' as const, text }], ...(isError ? { isError: true } : {}) };
}

export function registerToolsToMcpServer(server: Server, tools: ProxmoxTool[] = getExposedTools()): void {
  const exposed = new Map(tools.map((t) => [t.name, t]));

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: tools.map((t) => ({
        name: t.name,
        title: annotationsFor(t).title,
        description: t.description,
        inputSchema: toInputSchema(t),
        annotations: annotationsFor(t),
      })),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = exposed.get(name);

    if (!tool) {
      const hidden = toolMap.has(name);
      return textResult(
        hidden
          ? `Error: Tool '${name}' is disabled by the server configuration (PROXMOX_READ_ONLY or PROXMOX_MODULES).`
          : `Error: Unknown tool '${name}'`,
        true
      );
    }

    try {
      const result = await tool.execute((args as Record<string, any>) || {});
      return textResult(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
    } catch (err: any) {
      return textResult(`Error executing ${name}: ${err?.message || String(err)}`, true);
    }
  });
}
