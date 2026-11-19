import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import { createElysiaApp, isLoopback } from '../src/server.js';
import { resetConfig } from '../src/config.js';
import { VERSION } from '../src/version.js';

const savedEnv = { ...process.env };

function appWith(env: Record<string, string> = {}) {
  process.env = { ...savedEnv, PROXMOX_HOST: '', PROXMOX_READ_ONLY: 'false', PROXMOX_MCP_AUTH_TOKEN: '', ...env };
  resetConfig();
  return createElysiaApp();
}

const mcpHeaders = {
  'content-type': 'application/json',
  accept: 'application/json, text/event-stream',
  'mcp-protocol-version': '2025-06-18',
};

describe('Elysia HTTP server', () => {
  afterEach(() => {
    process.env = { ...savedEnv };
    resetConfig();
  });

  it('serves the index with version and tool count', async () => {
    const res = await appWith().handle(new Request('http://localhost/'));
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.version, VERSION);
    assert.strictEqual(data.totalTools, 324);
    assert.strictEqual(data.endpoints.mcp, '/mcp');
  });

  it('reports degraded health when PROXMOX_HOST is missing', async () => {
    const res = await appWith().handle(new Request('http://localhost/health'));
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;
    assert.strictEqual(data.status, 'degraded');
    assert.match(data.error, /PROXMOX_HOST/);
    assert.strictEqual(typeof data.uptimeSeconds, 'number');
  });

  it('serves metrics and tool listings with annotations', async () => {
    const app = appWith();
    const metrics = (await (await app.handle(new Request('http://localhost/metrics'))).json()) as any;
    assert.strictEqual(metrics.totalToolsRegistered, 324);
    const list = (await (await app.handle(new Request('http://localhost/api/tools'))).json()) as any;
    assert.strictEqual(list.tools.length, list.total);
    const one = (await (await app.handle(new Request('http://localhost/api/tools/vm_agent_exec_sync'))).json()) as any;
    assert.strictEqual(one.name, 'vm_agent_exec_sync');
    assert.strictEqual(one.module, 'qemu');
    assert.strictEqual(one.annotations.destructiveHint, true);
  });

  it('requires the bearer token when PROXMOX_MCP_AUTH_TOKEN is set', async () => {
    const app = appWith({ PROXMOX_MCP_AUTH_TOKEN: 'tok' });
    assert.strictEqual((await app.handle(new Request('http://localhost/'))).status, 200, 'index stays public');
    assert.strictEqual((await app.handle(new Request('http://localhost/api/tools'))).status, 401);
    assert.strictEqual(
      (await app.handle(new Request('http://localhost/api/tools', { headers: { authorization: 'Bearer wrong' } }))).status,
      401
    );
    assert.strictEqual(
      (await app.handle(new Request('http://localhost/api/tools', { headers: { authorization: 'Bearer tok' } }))).status,
      200
    );
    assert.strictEqual((await app.handle(new Request('http://localhost/api/tools', { headers: { 'x-api-key': 'tok' } }))).status, 200);
  });

  it('speaks MCP Streamable HTTP on /mcp', async () => {
    const app = appWith();
    const init = await app.handle(
      new Request('http://localhost/mcp', {
        method: 'POST',
        headers: mcpHeaders,
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } },
        }),
      })
    );
    assert.strictEqual(init.status, 200);
    const initData = (await init.json()) as any;
    assert.strictEqual(initData.result.serverInfo.version, VERSION);

    const list = await app.handle(
      new Request('http://localhost/mcp', {
        method: 'POST',
        headers: mcpHeaders,
        body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }),
      })
    );
    const listData = (await list.json()) as any;
    assert.strictEqual(listData.result.tools.length, 324);
    const del = listData.result.tools.find((t: any) => t.name === 'delete_vm');
    assert.strictEqual(del.annotations.destructiveHint, true);
  });

  it('hides write tools over HTTP in read-only mode', async () => {
    const app = appWith({ PROXMOX_READ_ONLY: 'true' });
    const res = await app.handle(new Request('http://localhost/api/tools/delete_vm/execute', { method: 'POST', body: '{}', headers: { 'content-type': 'application/json' } }));
    assert.strictEqual(res.status, 403);
    const data = (await res.json()) as any;
    assert.match(data.error, /disabled/);
  });

  it('knows loopback addresses', () => {
    assert.ok(isLoopback('127.0.0.1'));
    assert.ok(isLoopback('localhost'));
    assert.ok(isLoopback('::1'));
    assert.ok(!isLoopback('0.0.0.0'));
    assert.ok(!isLoopback('192.168.1.10'));
  });
});

describe('serveWithNode', () => {
  it('serves the app through node:http with auth', async () => {
    const { serveWithNode } = await import('../src/server.js');
    process.env = { ...process.env, PROXMOX_HOST: '', PROXMOX_MCP_AUTH_TOKEN: 'tok' };
    resetConfig();
    const app = createElysiaApp();
    const server = await serveWithNode((r) => app.handle(r), '127.0.0.1', 0);
    const port = (server.address() as any).port;
    try {
      assert.strictEqual((await fetch(`http://127.0.0.1:${port}/api/tools`)).status, 401);
      const ok = await fetch(`http://127.0.0.1:${port}/mcp`, {
        method: 'POST',
        headers: { ...mcpHeaders, authorization: 'Bearer tok' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
      });
      assert.strictEqual(ok.status, 200);
      const data = (await ok.json()) as any;
      assert.strictEqual(data.result.tools.length, 324);
    } finally {
      server.close();
    }
  });
});
