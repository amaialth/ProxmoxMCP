import { Elysia } from 'elysia';
import { timingSafeEqual } from 'node:crypto';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { getConfig } from './config.js';
import { getExposedTools, toolMap, annotationsFor, toInputSchema } from './mcp/registry.js';
import { createMcpServer, runStdioServer } from './mcp/server.js';
import { getProxmoxClient } from './proxmox/client.js';
import { VERSION } from './version.js';

export { createMcpServer, runStdioServer };

const LOOPBACK = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);

export function isLoopback(host: string): boolean {
  return LOOPBACK.has(host.trim().toLowerCase()) || host.startsWith('127.');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function extractToken(request: Request): string | null {
  const auth = request.headers.get('authorization');
  if (auth && /^bearer\s+/i.test(auth)) return auth.replace(/^bearer\s+/i, '').trim();
  return request.headers.get('x-api-key');
}

export function createElysiaApp() {
  const config = getConfig();
  const exposedTools = getExposedTools();
  const exposed = new Map(exposedTools.map((t) => [t.name, t]));

  const app = new Elysia()
    // Bearer-token auth for everything except the bare status endpoint.
    .onBeforeHandle(({ request, set, path }) => {
      if (!config.authToken || path === '/') return;
      const token = extractToken(request);
      if (!token || !safeEqual(token, config.authToken)) {
        set.status = 401;
        set.headers['WWW-Authenticate'] = 'Bearer';
        return { error: 'Unauthorized: send "Authorization: Bearer <PROXMOX_MCP_AUTH_TOKEN>".' };
      }
    })
    .get('/', () => ({
      status: 'ok',
      service: 'Proxmox MCP Server',
      version: VERSION,
      framework: 'Elysia',
      readOnly: config.readOnly,
      authRequired: Boolean(config.authToken),
      totalTools: exposedTools.length,
      endpoints: {
        mcp: '/mcp',
        health: '/health',
        metrics: '/metrics',
        tools: '/api/tools',
      },
    }))
    .get('/health', async () => {
      const client = getProxmoxClient();
      let proxmoxConnected = false;
      let proxmoxVersion: any = null;
      let error: string | undefined;

      try {
        if (config.host) {
          proxmoxVersion = await client.get('/version');
          proxmoxConnected = true;
        } else {
          error = 'PROXMOX_HOST is not configured';
        }
      } catch (err: any) {
        error = err?.message || String(err);
      }

      return {
        status: proxmoxConnected ? 'healthy' : 'degraded',
        uptimeSeconds: process.uptime(),
        config: {
          host: config.host || 'not configured',
          port: config.port,
          protocol: config.protocol,
          readOnly: config.readOnly,
          verifySsl: config.verifySsl,
          authMode: config.tokenName ? 'api-token' : config.password ? 'password' : 'none',
        },
        proxmoxConnected,
        proxmoxVersion,
        ...(error ? { error } : {}),
        warnings: config.warnings,
        timestamp: new Date().toISOString(),
      };
    })
    .get('/metrics', () => ({
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      totalToolsRegistered: exposedTools.length,
      cpuUsage: process.cpuUsage(),
    }))
    .get('/api/tools', () => ({
      total: exposedTools.length,
      tools: exposedTools.map((t) => ({
        name: t.name,
        module: t.module,
        description: t.description,
        parameters: toInputSchema(t),
        annotations: annotationsFor(t),
      })),
    }))
    .get('/api/tools/:name', ({ params, set }) => {
      const tool = exposed.get(params.name);
      if (!tool) {
        set.status = 404;
        return { error: `Tool ${params.name} not found` };
      }
      return { ...tool, parameters: toInputSchema(tool), annotations: annotationsFor(tool) };
    })
    .post('/api/tools/:name/execute', async ({ params, body, set }) => {
      const tool = exposed.get(params.name);
      if (!tool) {
        set.status = toolMap.has(params.name) ? 403 : 404;
        return {
          error: toolMap.has(params.name)
            ? `Tool ${params.name} is disabled by the server configuration (PROXMOX_READ_ONLY or PROXMOX_MODULES).`
            : `Tool ${params.name} not found`,
        };
      }
      try {
        const result = await tool.execute((body as Record<string, any>) || {});
        return { success: true, result };
      } catch (err: any) {
        set.status = 500;
        return { success: false, error: err?.message || String(err) };
      }
    })
    // MCP Streamable HTTP transport (stateless: one server per request).
    .all('/mcp', async ({ request, body }) => {
      const server = createMcpServer();
      const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });
      await server.connect(transport);
      try {
        return await transport.handleRequest(request, request.method === 'POST' ? { parsedBody: body } : undefined);
      } finally {
        if (request.method !== 'GET') {
          // JSON responses are complete once handleRequest resolves.
          void transport.close().catch(() => undefined);
          void server.close().catch(() => undefined);
        }
      }
    });

  return app;
}

export async function startHttpServer(): Promise<void> {
  const config = getConfig();

  if (typeof (globalThis as any).Bun === 'undefined') {
    throw new Error(
      'HTTP mode requires the Bun runtime. Run with `bun run src/index.ts`, or use stdio mode (--stdio), which works on Node too.'
    );
  }

  if (!isLoopback(config.serverHost) && !config.authToken && !config.allowUnauthenticated) {
    throw new Error(
      `Refusing to listen on ${config.serverHost} without authentication. Set PROXMOX_MCP_AUTH_TOKEN, ` +
        'bind to HOST=127.0.0.1, or set PROXMOX_MCP_ALLOW_UNAUTHENTICATED=true if you really want an open server.'
    );
  }

  const app = createElysiaApp();
  app.listen({ hostname: config.serverHost, port: config.serverPort }, ({ hostname, port }) => {
    const base = `http://${hostname}:${port}`;
    console.error(`🚀 Proxmox MCP Server v${VERSION} (HTTP) on ${base}`);
    console.error(`🔌 MCP endpoint (Streamable HTTP): ${base}/mcp`);
    console.error(`📊 Health: ${base}/health   🛠️ Tools: ${base}/api/tools`);
    console.error(config.authToken ? '🔒 Bearer authentication enabled.' : '⚠️  No authentication (loopback only).');
  });
}
