import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getToolAnnotations, needsWriteAccess, titleFromName } from '../src/mcp/annotations.js';
import { allTools, annotationsFor } from '../src/mcp/registry.js';

describe('Tool annotations', () => {
  it('marks reads as read-only and non-destructive', () => {
    for (const name of ['list_vms', 'get_cluster_status', 'dump_vm_cloudinit', 'vm_docker_ps', 'vm_agent_ping']) {
      const a = getToolAnnotations(name);
      assert.strictEqual(a.readOnlyHint, true, name);
      assert.strictEqual(a.destructiveHint, false, name);
      assert.strictEqual(a.idempotentHint, true, name);
    }
  });

  it('marks destructive operations', () => {
    for (const name of ['delete_vm', 'stop_vm', 'reset_vm', 'rollback_vm_snapshot', 'vm_run_shell', 'vm_docker_system_prune', 'node_power', 'update_vm_config', 'initialize_gpt']) {
      const a = getToolAnnotations(name);
      assert.strictEqual(a.readOnlyHint, false, name);
      assert.strictEqual(a.destructiveHint, true, name);
    }
  });

  it('marks additive writes as non-destructive', () => {
    for (const name of ['create_vm_snapshot', 'start_vm', 'clone_vm', 'create_vzdump', 'vm_docker_pull']) {
      const a = getToolAnnotations(name);
      assert.strictEqual(a.readOnlyHint, false, name);
      assert.strictEqual(a.destructiveHint, false, name);
    }
  });

  it('knows which read tools still need write API access', () => {
    assert.strictEqual(needsWriteAccess('list_vms'), false);
    assert.strictEqual(needsWriteAccess('vm_docker_ps'), true);
    assert.strictEqual(needsWriteAccess('get_vm_vncproxy'), true);
    assert.strictEqual(needsWriteAccess('delete_vm'), true);
  });

  it('produces readable titles', () => {
    assert.strictEqual(titleFromName('get_vm_rrddata'), 'Get VM RRD data');
    assert.strictEqual(titleFromName('list_sdn_vnets'), 'List SDN VNets');
  });

  it('annotates every registered tool', () => {
    for (const tool of allTools) {
      const a = annotationsFor(tool);
      assert.ok(a.title.length > 0, tool.name);
      assert.strictEqual(typeof a.readOnlyHint, 'boolean');
      if (a.readOnlyHint) assert.strictEqual(a.destructiveHint, false, tool.name);
    }
  });
});
