import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createElysiaApp } from '../src/server.js';

describe('Elysia Server Endpoints', () => {
  it('should serve index root with tool count and status', async () => {
    const app = createElysiaApp();
    const response = await app.handle(new Request('http://localhost/'));
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.framework, 'Elysia');
    assert.ok(data.totalTools >= 287);
  });

  it('should serve health check endpoint', async () => {
    const app = createElysiaApp();
    const response = await app.handle(new Request('http://localhost/health'));
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.ok(data.status);
    assert.strictEqual(typeof data.uptimeSeconds, 'number');
  });

  it('should serve metrics endpoint', async () => {
    const app = createElysiaApp();
    const response = await app.handle(new Request('http://localhost/metrics'));
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.ok(data.totalToolsRegistered >= 287);
  });

  it('should list all tools on /api/tools', async () => {
    const app = createElysiaApp();
    const response = await app.handle(new Request('http://localhost/api/tools'));
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.ok(data.total >= 287);
    assert.strictEqual(data.tools.length, data.total);
  });

  it('should return specific tool details on /api/tools/:name', async () => {
    const app = createElysiaApp();
    const response = await app.handle(new Request('http://localhost/api/tools/vm_agent_exec_sync'));
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.strictEqual(data.name, 'vm_agent_exec_sync');
    assert.strictEqual(data.module, 'qemu');
  });
});
