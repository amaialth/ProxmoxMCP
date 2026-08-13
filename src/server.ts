import { Elysia } from 'elysia';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { getConfig } from './config.js';
import { allTools, registerToolsToMcpServer, toolMap } from './mcp/registry.js';
import { getProxmoxClient } from './proxmox/client.js';

export function createMcpServer(): Server {
  const server = new Server(
    {
      name: 'proxmox-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  registerToolsToMcpServer(server);
  return server;
}

export async function runStdioServer(): Promise<void> {
  const mcpServer = createMcpServer();
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('[Proxmox MCP] Stdio server running successfully.');
}

export function createElysiaApp() {
  const config = getConfig();
  const mcpServer = createMcpServer();
  const activeSseTransports = new Map<string, SSEServerTransport>();

  const app = new Elysia()
    .get('/', () => ({
      status: 'ok',
      service: 'Proxmox MCP Server',
      version: '1.0.0',
      framework: 'Elysia',
      readOnly: config.readOnly,
      totalTools: allTools.length,
      endpoints: {
        health: '/health',
        metrics: '/metrics',
        tools: '/api/tools',
        sse: '/sse',
        mcpMessage: '/api/message',
      },
    }))
    .get('/health', async () => {
      const client = getProxmoxClient();
      let proxmoxConnected = false;
      let clusterVersion: any = null;

      try {
        if (config.host) {
          clusterVersion = await client.get('/version');
          proxmoxConnected = true;
        }
      } catch (err: any) {
        proxmoxConnected = false;
      }

      return {
        status: proxmoxConnected ? 'healthy' : 'degraded',
        uptimeSeconds: process.uptime(),
        memoryUsage: process.memoryUsage(),
        config: {
          host: config.host || 'not configured',
          port: config.port,
          readOnly: config.readOnly,
          user: config.user,
          verifySsl: config.verifySsl,
        },
        proxmoxConnected,
        proxmoxVersion: clusterVersion,
        timestamp: new Date().toISOString(),
      };
    })
    .get('/metrics', () => ({
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      totalToolsRegistered: allTools.length,
      activeSseConnections: activeSseTransports.size,
      cpuUsage: process.cpuUsage(),
    }))
    .get('/api/tools', () => {
      return {
        total: allTools.length,
        tools: allTools.map((t) => ({
          name: t.name,
          module: t.module,
          description: t.description,
          parameters: t.parameters,
        })),
      };
    })
    .get('/api/tools/:name', ({ params, set }) => {
      const tool = toolMap.get(params.name);
      if (!tool) {
        set.status = 404;
        return { error: `Tool ${params.name} not found` };
      }
      return tool;
    })
    .post('/api/tools/:name/execute', async ({ params, body, set }) => {
      if (config.readOnly && params.name.startsWith('delete_')) {
        set.status = 403;
        return { error: 'Read-only mode enabled.' };
      }
      const tool = toolMap.get(params.name);
      if (!tool) {
        set.status = 404;
        return { error: `Tool ${params.name} not found` };
      }
      try {
        const result = await tool.execute((body as Record<string, any>) || {});
        return { success: true, result };
      } catch (err: any) {
        set.status = 500;
        return { success: false, error: err.message || String(err) };
      }
    })
    .get('/sse', async ({ set }) => {
      set.headers['Content-Type'] = 'text/event-stream';
      set.headers['Cache-Control'] = 'no-cache';
      set.headers['Connection'] = 'keep-alive';

      const sseTransport = new SSEServerTransport('/api/message', {
        headers: { 'Access-Control-Allow-Origin': '*' },
      } as any);

      activeSseTransports.set(sseTransport.sessionId, sseTransport);
      await mcpServer.connect(sseTransport);

      return new Response(
        new ReadableStream({
          start(controller) {
            // Keep-alive ping
            const interval = setInterval(() => {
              controller.enqueue(new TextEncoder().encode(': ping\n\n'));
            }, 15000);

            sseTransport.onclose = () => {
              clearInterval(interval);
              activeSseTransports.delete(sseTransport.sessionId);
              controller.close();
            };
          },
        }),
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    })
    .post('/api/message', async ({ request }) => {
      const url = new URL(request.url);
      const sessionId = url.searchParams.get('sessionId');
      if (!sessionId || !activeSseTransports.has(sessionId)) {
        return new Response('Session not found', { status: 404 });
      }

      const transport = activeSseTransports.get(sessionId)!;
      await transport.handlePostMessage(request as any, new Response() as any);
      return new Response('Accepted', { status: 202 });
    });

  return app;
}

export async function startHttpServer(): Promise<void> {
  const config = getConfig();
  const app = createElysiaApp();

  app.listen(
    {
      hostname: config.serverHost,
      port: config.serverPort,
    },
    ({ hostname, port }) => {
      console.log(`🚀 Proxmox Enterprise MCP Server running with Elysia on http://${hostname}:${port}`);
      console.log(`📊 Health Check: http://${hostname}:${port}/health`);
      console.log(`🛠️ REST Tools API: http://${hostname}:${port}/api/tools`);
      console.log(`🔌 MCP SSE Transport: http://${hostname}:${port}/sse`);
    }
  );
}
