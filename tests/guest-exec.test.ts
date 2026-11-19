import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { formatCommand, guestText, vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded } from '../src/proxmox/guest-exec.js';
import { resetConfig } from '../src/config.js';
import { resetProxmoxClient } from '../src/proxmox/client.js';

type Call = { method: string; url: string; body?: string };

function mockFetch(responder: (call: Call) => unknown) {
  const calls: Call[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: any, init: any = {}) => {
    const call = { method: init.method || 'GET', url: String(url), body: init.body };
    calls.push(call);
    return new Response(JSON.stringify({ data: responder(call) }), { status: 200 });
  }) as any;
  return { calls, restore: () => (globalThis.fetch = original) };
}

const savedEnv = { ...process.env };

describe('Guest Execution Engine', () => {
  beforeEach(() => {
    process.env.PROXMOX_HOST = 'pve.test';
    process.env.PROXMOX_TOKEN_NAME = 'mcp';
    process.env.PROXMOX_TOKEN_VALUE = 'secret';
    process.env.PROXMOX_READ_ONLY = 'false';
    resetConfig();
    resetProxmoxClient();
  });

  afterEach(() => {
    process.env = { ...savedEnv };
    resetConfig();
    resetProxmoxClient();
  });

  it('formats shell command strings into a /bin/sh -c array', () => {
    assert.deepStrictEqual(formatCommand('cat /etc/os-release | grep VERSION', true), ['/bin/sh', '-c', 'cat /etc/os-release | grep VERSION']);
  });

  it('leaves command arrays untouched', () => {
    assert.deepStrictEqual(formatCommand(['ls', '-la'], true), ['ls', '-la']);
  });

  it('returns the raw command string if shell option is false', () => {
    assert.strictEqual(formatCommand('uptime', false), 'uptime');
  });

  it('guestText never base64-decodes (Proxmox already decodes agent output)', () => {
    assert.strictEqual(guestText('immichserver\n'), 'immichserver\n');
    assert.strictEqual(guestText('aGVsbG8='), 'aGVsbG8=');
    assert.strictEqual(guestText(undefined), '');
  });

  it('vmAgentExecSync returns Proxmox out-data verbatim', async () => {
    const m = mockFetch((c) =>
      c.url.includes('/agent/exec-status')
        ? { exited: 1, exitcode: 0, 'out-data': 'immichserver\n', 'err-data': 'warn\n' }
        : { pid: 42 }
    );
    try {
      const res = await vmAgentExecSync({ node: 'pve', vmid: 100, command: 'hostname', pollIntervalMs: 1 });
      assert.strictEqual(res.stdout, 'immichserver\n');
      assert.strictEqual(res.stderr, 'warn\n');
      assert.strictEqual(res.exitcode, 0);
      assert.strictEqual(res.timedOut, false);
      assert.ok(m.calls[0].url.endsWith('/nodes/pve/qemu/100/agent/exec'));
      assert.strictEqual(m.calls[0].method, 'POST');
    } finally {
      m.restore();
    }
  });

  it('vmAgentExecSync reports truncation and signals', async () => {
    const m = mockFetch((c) =>
      c.url.includes('/agent/exec-status') ? { exited: 1, signal: 9, 'out-data': 'x', 'out-truncated': 1 } : { pid: 7 }
    );
    try {
      const res = await vmAgentExecSync({ node: 'pve', vmid: 100, command: 'yes', pollIntervalMs: 1 });
      assert.strictEqual(res.exitcode, 137);
      assert.strictEqual(res.truncated, true);
    } finally {
      m.restore();
    }
  });

  it('vmAgentExecSync times out cleanly', async () => {
    const m = mockFetch((c) => (c.url.includes('/agent/exec-status') ? { exited: 0 } : { pid: 9 }));
    try {
      const res = await vmAgentExecSync({ node: 'pve', vmid: 100, command: 'sleep 99', timeoutSeconds: 0.05, pollIntervalMs: 10 });
      assert.strictEqual(res.timedOut, true);
      assert.strictEqual(res.exitcode, null);
    } finally {
      m.restore();
    }
  });

  it('file read returns content verbatim', async () => {
    const m = mockFetch(() => ({ content: 'immichserver\n', 'bytes-read': 13 }));
    try {
      const res = await vmAgentFileReadDecoded('pve', 100, '/etc/hostname');
      assert.strictEqual(res.content, 'immichserver\n');
      assert.strictEqual(res.truncated, false);
    } finally {
      m.restore();
    }
  });

  it('file write sends plain text with encode=1 and base64 with encode=0', async () => {
    const m = mockFetch(() => null);
    try {
      await vmAgentFileWriteEncoded('pve', 100, '/tmp/a', 'hello world');
      await vmAgentFileWriteEncoded('pve', 100, '/tmp/b', 'aGVsbG8=', true);
      const first = new URLSearchParams(m.calls[0].body);
      const second = new URLSearchParams(m.calls[1].body);
      assert.strictEqual(first.get('content'), 'hello world');
      assert.strictEqual(first.get('encode'), '1');
      assert.strictEqual(second.get('content'), 'aGVsbG8=');
      assert.strictEqual(second.get('encode'), '0');
    } finally {
      m.restore();
    }
  });
});
