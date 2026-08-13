import { describe, it } from 'node:test';
import assert from 'node:assert';
import { loadConfig, resetConfig } from '../src/config.js';

describe('ProxmoxConfig Module', () => {
  it('should load default configuration settings', () => {
    resetConfig();
    const config = loadConfig();
    assert.strictEqual(typeof config.port, 'number');
    assert.strictEqual(typeof config.readOnly, 'boolean');
    assert.strictEqual(typeof config.verifySsl, 'boolean');
    assert.strictEqual(typeof config.timeout, 'number');
  });

  it('should respect custom environment variables', () => {
    process.env.PROXMOX_HOST = 'pve-test.local';
    process.env.PROXMOX_READ_ONLY = 'true';
    process.env.PROXMOX_VERIFY_SSL = '1';

    resetConfig();
    const config = loadConfig();

    assert.strictEqual(config.host, 'pve-test.local');
    assert.strictEqual(config.readOnly, true);
    assert.strictEqual(config.verifySsl, true);
  });
});
