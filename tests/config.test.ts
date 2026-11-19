import { describe, it } from 'node:test';
import assert from 'node:assert';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadConfig, normalizeHost, normalizeTokenName, formatBaseUrl, loadEnvFiles, isUnsetValue, configFileCandidates } from '../src/config.js';

describe('normalizeHost', () => {
  const cases: Array<[string, string, number | undefined, string | undefined]> = [
    ['192.168.1.21', '192.168.1.21', undefined, undefined],
    ['  192.168.1.21  ', '192.168.1.21', undefined, undefined],
    ['https://192.168.1.21:8006', '192.168.1.21', 8006, 'https'],
    ['https://192.168.1.21:8006/', '192.168.1.21', 8006, 'https'],
    ['https://pve.lan:8006/api2/json', 'pve.lan', 8006, 'https'],
    ['192.168.1.21:8443', '192.168.1.21', 8443, undefined],
    ['"192.168.1.21"', '192.168.1.21', undefined, undefined],
    ["'https://pve.lan'", 'pve.lan', undefined, 'https'],
    ['[https://proxmox.local:8006](https://proxmox.local:8006)', 'proxmox.local', 8006, 'https'],
    ['http://pve.lan', 'pve.lan', undefined, 'http'],
    ['[fd00::21]:8006', 'fd00::21', 8006, undefined],
    ['fd00::21', 'fd00::21', undefined, undefined],
  ];

  for (const [input, host, port, protocol] of cases) {
    it(`parses ${JSON.stringify(input)}`, () => {
      const r = normalizeHost(input);
      assert.strictEqual(r.host, host);
      assert.strictEqual(r.port, port);
      assert.strictEqual(r.protocol, protocol);
    });
  }

  it('flags bare hosts as unchanged', () => {
    assert.strictEqual(normalizeHost('192.168.1.21').changed, false);
    assert.strictEqual(normalizeHost('https://192.168.1.21:8006').changed, true);
  });
});

describe('normalizeTokenName', () => {
  it('keeps a plain token ID', () => {
    assert.deepStrictEqual(normalizeTokenName('mcp'), { tokenName: 'mcp', changed: false });
  });
  it('warns only when PROXMOX_USER conflicts with the token owner', () => {
    assert.deepStrictEqual(loadConfig({ PROXMOX_TOKEN_NAME: 'root@pam!mcp', PROXMOX_TOKEN_VALUE: 'x' }, []).warnings, []);
    const c = loadConfig({ PROXMOX_USER: 'other@pve', PROXMOX_TOKEN_NAME: 'root@pam!mcp', PROXMOX_TOKEN_VALUE: 'x' }, []);
    assert.strictEqual(c.user, 'root@pam');
    assert.strictEqual(c.warnings.length, 1);
  });

  it('splits user@realm!tokenid', () => {
    const r = normalizeTokenName('root@pam!mcp');
    assert.strictEqual(r.user, 'root@pam');
    assert.strictEqual(r.tokenName, 'mcp');
  });
});

describe('loadConfig', () => {
  it('has safe defaults', () => {
    const c = loadConfig({}, []);
    assert.strictEqual(c.host, '');
    assert.strictEqual(c.port, 8006);
    assert.strictEqual(c.protocol, 'https');
    assert.strictEqual(c.user, 'root@pam');
    assert.strictEqual(c.readOnly, false);
    assert.strictEqual(c.verifySsl, false);
    assert.strictEqual(c.serverHost, '127.0.0.1');
    assert.strictEqual(c.stdioMode, false);
    assert.deepStrictEqual(c.warnings, []);
  });

  it('respects custom environment variables', () => {
    const c = loadConfig(
      { PROXMOX_HOST: 'pve-test.local', PROXMOX_READ_ONLY: 'true', PROXMOX_VERIFY_SSL: '1', PROXMOX_STDIO: 'yes' },
      []
    );
    assert.strictEqual(c.host, 'pve-test.local');
    assert.strictEqual(c.readOnly, true);
    assert.strictEqual(c.verifySsl, true);
    assert.strictEqual(c.stdioMode, true);
  });

  it('detects --stdio on the command line', () => {
    assert.strictEqual(loadConfig({}, ['bun', 'index.ts', '--stdio']).stdioMode, true);
  });

  it('repairs a pasted URL and a full token name, with warnings', () => {
    const c = loadConfig(
      {
        PROXMOX_HOST: 'https://192.168.1.21:8006/',
        PROXMOX_TOKEN_NAME: 'automation@pve!mcp',
        PROXMOX_TOKEN_VALUE: 'secret',
      },
      []
    );
    assert.strictEqual(c.host, '192.168.1.21');
    assert.strictEqual(c.port, 8006);
    assert.strictEqual(c.user, 'automation@pve');
    assert.strictEqual(c.tokenName, 'mcp');
    assert.strictEqual(formatBaseUrl(c), 'https://192.168.1.21:8006/api2/json');
    assert.strictEqual(c.warnings.length, 1, 'only the host is warned about; user!token is a supported form');
  });

  it('lets PROXMOX_PORT win over a port embedded in PROXMOX_HOST', () => {
    const c = loadConfig({ PROXMOX_HOST: 'pve.lan:8443', PROXMOX_PORT: '8006' }, []);
    assert.strictEqual(c.port, 8006);
    assert.ok(c.warnings.some((w) => w.includes('PROXMOX_PORT')));
  });

  it('uses http for port 80 and brackets IPv6 hosts', () => {
    assert.strictEqual(formatBaseUrl(loadConfig({ PROXMOX_HOST: 'pve.lan', PROXMOX_PORT: '80' }, [])), 'http://pve.lan:80/api2/json');
    assert.strictEqual(formatBaseUrl(loadConfig({ PROXMOX_HOST: 'fd00::21' }, [])), 'https://[fd00::21]:8006/api2/json');
  });

  it('warns when only half of a token is set', () => {
    assert.ok(loadConfig({ PROXMOX_TOKEN_NAME: 'mcp' }, []).warnings.some((w) => w.includes('TOKEN_VALUE')));
  });

  it('reads HTTP auth settings', () => {
    const c = loadConfig({ PROXMOX_MCP_AUTH_TOKEN: ' abc ', PROXMOX_MCP_ALLOW_UNAUTHENTICATED: 'true', HOST: '0.0.0.0' }, []);
    assert.strictEqual(c.authToken, 'abc');
    assert.strictEqual(c.allowUnauthenticated, true);
    assert.strictEqual(c.serverHost, '0.0.0.0');
  });
});

describe('config files and placeholders', () => {
  it('treats empty values and unexpanded placeholders as unset', () => {
    assert.ok(isUnsetValue(undefined));
    assert.ok(isUnsetValue('  '));
    assert.ok(isUnsetValue('${user_config.host}'));
    assert.ok(isUnsetValue('${PROXMOX_HOST}'));
    assert.ok(!isUnsetValue('192.168.1.21'));
    assert.ok(!isUnsetValue('pa$$word'));
  });

  it('ignores placeholder values in loadConfig', () => {
    const c = loadConfig({ PROXMOX_HOST: '${user_config.host}', PROXMOX_TOKEN_NAME: '${user_config.token_id}' }, []);
    assert.strictEqual(c.host, '');
    assert.strictEqual(c.tokenName, undefined);
    assert.deepStrictEqual(c.warnings, []);
  });

  it('fills unset and placeholder values from the XDG config file, but never overrides real values', () => {
    const dir = mkdtempSync(join(tmpdir(), 'pmcp-'));
    mkdirSync(join(dir, 'proxmox-mcp'));
    writeFileSync(
      join(dir, 'proxmox-mcp', '.env'),
      'PROXMOX_HOST=10.0.0.5\nPROXMOX_TOKEN_NAME=mcp\nPROXMOX_TOKEN_VALUE=from-file\nPROXMOX_READ_ONLY=true\n'
    );
    const env: NodeJS.ProcessEnv = {
      XDG_CONFIG_HOME: dir,
      PROXMOX_HOST: '${user_config.host}',
      PROXMOX_TOKEN_NAME: '',
      PROXMOX_TOKEN_VALUE: 'from-client',
      PROXMOX_VERIFY_SSL: '${user_config.verify_ssl}',
    };
    const loaded = loadEnvFiles(env, dir);
    assert.deepStrictEqual(loaded, [join(dir, 'proxmox-mcp', '.env')]);
    assert.strictEqual(env.PROXMOX_HOST, '10.0.0.5');
    assert.strictEqual(env.PROXMOX_TOKEN_NAME, 'mcp');
    assert.strictEqual(env.PROXMOX_TOKEN_VALUE, 'from-client');
    assert.strictEqual(env.PROXMOX_READ_ONLY, 'true');
    assert.ok(!('PROXMOX_VERIFY_SSL' in env), 'unfilled placeholder removed');
  });

  it('checks PROXMOX_MCP_ENV_FILE first', () => {
    const list = configFileCandidates({ PROXMOX_MCP_ENV_FILE: '/etc/pmcp.env', XDG_CONFIG_HOME: '/x' }, '/work');
    assert.strictEqual(list[0], '/etc/pmcp.env');
    assert.ok(list.includes('/work/.env'));
    assert.ok(list.includes('/x/proxmox-mcp/.env'));
  });
});
