import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allTools, toolMap, getExposedTools, toInputSchema, MODULES } from '../src/mcp/registry.js';

describe('Tool Registry', () => {
  it('registers 324 tools', () => {
    assert.strictEqual(allTools.length, 324);
  });

  it('registers guest execution and the new helper tools', () => {
    for (const name of ['vm_agent_exec', 'vm_agent_exec_sync', 'vm_agent_ping', 'set_node_time', 'node_power']) {
      assert.ok(toolMap.has(name), name);
    }
  });

  it('does not register LXC exec tools (Proxmox has no API for them)', () => {
    const lxcExec = allTools.filter((t) => /^lxc_(exec|agent_exec|docker|service|run_shell|package|system_info)/.test(t.name));
    assert.deepStrictEqual(lxcExec.map((t) => t.name), []);
  });

  it('registers all 28 vm_* guest service tools', () => {
    const guest = allTools.filter((t) => t.module === 'guest-services');
    assert.strictEqual(guest.length, 28);
    assert.ok(guest.every((t) => t.name.startsWith('vm_')));
    for (const name of ['vm_docker_ps', 'vm_docker_compose_up', 'vm_service_status', 'vm_run_shell', 'vm_package_install', 'vm_system_info']) {
      assert.ok(toolMap.has(name), name);
    }
  });

  it('has unique names and valid schemas', () => {
    assert.strictEqual(toolMap.size, allTools.length);
    for (const tool of allTools) {
      assert.ok(tool.description, `${tool.name} description`);
      assert.strictEqual(typeof tool.execute, 'function');
      const schema = toInputSchema(tool);
      assert.strictEqual(schema.type, 'object');
      for (const req of schema.required) {
        assert.ok(req in schema.properties, `${tool.name}: required "${req}" missing from properties`);
      }
      for (const [k, p] of Object.entries<any>(schema.properties)) {
        assert.notStrictEqual(p.default, '', `${tool.name}.${k} still has an empty-string default`);
      }
    }
  });

  it('get_node_journal takes Unix timestamps', () => {
    const p = toolMap.get('get_node_journal')!.parameters.properties!;
    assert.strictEqual(p.since.type, 'integer');
    assert.strictEqual(p.until.type, 'integer');
  });

  it('hides write tools in read-only mode', () => {
    const ro = getExposedTools({ readOnly: true, modules: '' });
    assert.ok(ro.length > 100 && ro.length < allTools.length);
    assert.ok(ro.some((t) => t.name === 'list_vms'));
    assert.ok(!ro.some((t) => t.name === 'delete_vm'));
    assert.ok(!ro.some((t) => t.name === 'vm_docker_ps'), 'agent exec is a POST, blocked in read-only mode');
  });

  it('filters by module', () => {
    const only = getExposedTools({ readOnly: false, modules: 'qemu, nodes' });
    assert.ok(only.length > 0);
    assert.ok(only.every((t) => t.module === 'qemu' || t.module === 'nodes'));
    assert.deepStrictEqual(
      [...MODULES].sort(),
      ['access', 'backup', 'cluster', 'firewall', 'guest-services', 'ha', 'lxc', 'nodes', 'pools', 'qemu', 'sdn', 'storage']
    );
  });
});
