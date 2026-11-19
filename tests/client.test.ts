import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ProxmoxClient } from '../src/proxmox/client.js';
import { loadConfig } from '../src/config.js';

function withFetch(body: string | null, status = 200) {
  const calls: Array<{ url: string; init: any }> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: any, init: any = {}) => {
    calls.push({ url: String(url), init });
    return new Response(body, { status });
  }) as any;
  return { calls, restore: () => (globalThis.fetch = original) };
}

const tokenConfig = (extra: Record<string, string> = {}) =>
  loadConfig({ PROXMOX_HOST: 'https://pve.test:8006/', PROXMOX_TOKEN_NAME: 'root@pam!mcp', PROXMOX_TOKEN_VALUE: 's3', ...extra }, []);

describe('ProxmoxClient', () => {
  it('builds the URL and token header from repaired config', async () => {
    const m = withFetch(JSON.stringify({ data: { version: '8.4' } }));
    try {
      const res = await new ProxmoxClient(tokenConfig()).get('/version');
      assert.deepStrictEqual(res, { version: '8.4' });
      assert.strictEqual(m.calls[0].url, 'https://pve.test:8006/api2/json/version');
      assert.strictEqual(m.calls[0].init.headers.Authorization, 'PVEAPIToken=root@pam!mcp=s3');
    } finally {
      m.restore();
    }
  });

  it('drops empty-string GET parameters', async () => {
    const m = withFetch(JSON.stringify({ data: [] }));
    try {
      await new ProxmoxClient(tokenConfig()).get('/nodes/pve/journal', { since: '', until: '', lastentries: 5 });
      assert.strictEqual(m.calls[0].url, 'https://pve.test:8006/api2/json/nodes/pve/journal?lastentries=5');
    } finally {
      m.restore();
    }
  });

  it('handles empty and null bodies without crashing', async () => {
    for (const body of ['', 'null', JSON.stringify({ data: null })]) {
      const m = withFetch(body);
      try {
        const res = await new ProxmoxClient(tokenConfig()).get('/nodes/pve/journal');
        assert.strictEqual(res, null);
      } finally {
        m.restore();
      }
    }
  });

  it('blocks writes in read-only mode before any request is sent', async () => {
    const m = withFetch('{}');
    try {
      await assert.rejects(new ProxmoxClient(tokenConfig({ PROXMOX_READ_ONLY: 'true' })).post('/nodes/pve/status', { command: 'reboot' }), /read-only/);
      assert.strictEqual(m.calls.length, 0);
    } finally {
      m.restore();
    }
  });

  it('reports API errors with status and body', async () => {
    const m = withFetch('{"message":"Permission check failed (/, Sys.Audit)"}', 403);
    try {
      await assert.rejects(new ProxmoxClient(tokenConfig()).get('/cluster/status'), /\(403\).*Sys\.Audit/);
    } finally {
      m.restore();
    }
  });

  it('explains missing credentials', async () => {
    const m = withFetch('{}');
    try {
      await assert.rejects(new ProxmoxClient(loadConfig({ PROXMOX_HOST: 'pve.test' }, [])).get('/version'), /No Proxmox credentials/);
    } finally {
      m.restore();
    }
  });
});
