import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allTools, toolMap } from '../src/mcp/registry.js';
import { accessTools } from '../src/tools/access.js';
import { backupTools } from '../src/tools/backup.js';
import { clusterTools } from '../src/tools/cluster.js';
import { firewallTools } from '../src/tools/firewall.js';
import { haTools } from '../src/tools/ha.js';
import { lxcTools } from '../src/tools/lxc.js';
import { nodesTools } from '../src/tools/nodes.js';
import { poolsTools } from '../src/tools/pools.js';
import { qemuTools } from '../src/tools/qemu.js';
import { sdnTools } from '../src/tools/sdn.js';
import { storageTools } from '../src/tools/storage.js';

describe('Comprehensive MCP Tools Suite (All 294 Tools)', () => {
  it('should have correct tool counts across all 11 modules', () => {
    assert.strictEqual(accessTools.length, 27, 'Access module tool count');
    assert.strictEqual(backupTools.length, 11, 'Backup module tool count');
    assert.strictEqual(clusterTools.length, 46, 'Cluster module tool count');
    assert.strictEqual(firewallTools.length, 32, 'Firewall module tool count');
    assert.strictEqual(haTools.length, 14, 'HA module tool count');
    assert.strictEqual(lxcTools.length, 26, 'LXC module tool count');
    assert.strictEqual(nodesTools.length, 41, 'Nodes module tool count');
    assert.strictEqual(poolsTools.length, 14, 'Pools module tool count');
    assert.strictEqual(qemuTools.length, 40, 'QEMU module tool count');
    assert.strictEqual(sdnTools.length, 17, 'SDN module tool count');
    assert.strictEqual(storageTools.length, 26, 'Storage module tool count');

    assert.strictEqual(allTools.length, 294, 'Total tool count should be exactly 294 unique tools');
  });

  it('should verify every tool has valid metadata, non-empty description, and execute function', () => {
    const names = new Set<string>();

    for (const tool of allTools) {
      assert.ok(tool.name, 'Tool must have a name');
      assert.ok(!names.has(tool.name), `Duplicate tool name found: ${tool.name}`);
      names.add(tool.name);

      assert.ok(tool.description && tool.description.length > 5, `Tool ${tool.name} must have a non-empty description`);
      assert.ok(tool.module, `Tool ${tool.name} must specify a module`);
      assert.strictEqual(typeof tool.execute, 'function', `Tool ${tool.name} execute property must be a function`);
      assert.ok(tool.parameters && typeof tool.parameters === 'object', `Tool ${tool.name} must have parameters schema`);
    }
  });

  it('should correctly execute read-only tool calls in dry-run mode (handling missing PROXMOX_HOST safely)', async () => {
    const listNodesTool = toolMap.get('list_nodes');
    assert.ok(listNodesTool);

    try {
      await listNodesTool.execute({});
    } catch (err: any) {
      assert.ok(
        err.message.includes('PROXMOX_HOST') || err.message.includes('fetch failed') || err.message.includes('Proxmox API Error'),
        `Unexpected error message: ${err.message}`
      );
    }
  });

  it('should verify enhanced QEMU tools exist and have valid parameter schemas', () => {
    const syncExec = toolMap.get('vm_agent_exec_sync');
    assert.ok(syncExec, 'vm_agent_exec_sync should exist');
    assert.ok(syncExec.parameters.properties?.node, 'node property required');
    assert.ok(syncExec.parameters.properties?.vmid, 'vmid property required');
    assert.ok(syncExec.parameters.properties?.command, 'command property required');

    const fileRead = toolMap.get('vm_agent_file_read');
    assert.ok(fileRead, 'vm_agent_file_read should exist');

    const fileWrite = toolMap.get('vm_agent_file_write');
    assert.ok(fileWrite, 'vm_agent_file_write should exist');
  });

  it('should verify enhanced LXC execution tools exist', () => {
    const lxcSync = toolMap.get('lxc_exec_sync');
    assert.ok(lxcSync, 'lxc_exec_sync should exist');
    assert.ok(lxcSync.parameters.properties?.node);
    assert.ok(lxcSync.parameters.properties?.vmid);
    assert.ok(lxcSync.parameters.properties?.command);
  });

  it('should verify physical disk, SMART, PCI, USB, and task management tools exist', () => {
    assert.ok(toolMap.has('list_node_disks'), 'list_node_disks tool');
    assert.ok(toolMap.has('get_disk_smart'), 'get_disk_smart tool');
    assert.ok(toolMap.has('list_zfs_pools'), 'list_zfs_pools tool');
    assert.ok(toolMap.has('list_node_pci_devices'), 'list_node_pci_devices tool');
    assert.ok(toolMap.has('list_node_usb_devices'), 'list_node_usb_devices tool');
    assert.ok(toolMap.has('stop_node_task'), 'stop_node_task tool');
    assert.ok(toolMap.has('get_task_log'), 'get_task_log tool');
    assert.ok(toolMap.has('bulk_start_node_vms'), 'bulk_start_node_vms tool');
    assert.ok(toolMap.has('bulk_stop_node_vms'), 'bulk_stop_node_vms tool');
  });
});
