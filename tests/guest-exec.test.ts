import { describe, it } from 'node:test';
import assert from 'node:assert';
import { formatCommand } from '../src/proxmox/guest-exec.js';

describe('Guest Execution Engine', () => {
  it('should format shell command strings into /bin/sh -c array', () => {
    const formatted = formatCommand('cat /etc/os-release | grep VERSION', true);
    assert.deepStrictEqual(formatted, ['/bin/sh', '-c', 'cat /etc/os-release | grep VERSION']);
  });

  it('should leave command arrays untouched', () => {
    const formatted = formatCommand(['ls', '-la'], true);
    assert.deepStrictEqual(formatted, ['ls', '-la']);
  });

  it('should return raw command string if shell option is false', () => {
    const formatted = formatCommand('uptime', false);
    assert.strictEqual(formatted, 'uptime');
  });
});
