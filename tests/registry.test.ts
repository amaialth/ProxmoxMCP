import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allTools, toolMap } from '../src/mcp/registry.js';

describe('Tool Registry', () => {
  it('should absorb all original tools plus enhanced guest tools (count >= 350)', () => {
    assert.ok(allTools.length >= 350, `Expected at least 350 tools, got ${allTools.length}`);
  });

  it('should register enhanced guest execution tools', () => {
    assert.ok(toolMap.has('vm_agent_exec_sync'), 'vm_agent_exec_sync should be registered');
    assert.ok(toolMap.has('vm_agent_exec'), 'vm_agent_exec should be registered');
    assert.ok(toolMap.has('lxc_exec_sync'), 'lxc_exec_sync should be registered');
    assert.ok(toolMap.has('lxc_agent_exec_sync'), 'lxc_agent_exec_sync should be registered');
  });

  it('should register Docker management tools for VMs and LXC containers', () => {
    // VM Docker tools
    assert.ok(toolMap.has('vm_docker_ps'), 'vm_docker_ps should be registered');
    assert.ok(toolMap.has('vm_docker_images'), 'vm_docker_images should be registered');
    assert.ok(toolMap.has('vm_docker_pull'), 'vm_docker_pull should be registered');
    assert.ok(toolMap.has('vm_docker_run'), 'vm_docker_run should be registered');
    assert.ok(toolMap.has('vm_docker_stop'), 'vm_docker_stop should be registered');
    assert.ok(toolMap.has('vm_docker_start'), 'vm_docker_start should be registered');
    assert.ok(toolMap.has('vm_docker_restart'), 'vm_docker_restart should be registered');
    assert.ok(toolMap.has('vm_docker_rm'), 'vm_docker_rm should be registered');
    assert.ok(toolMap.has('vm_docker_rmi'), 'vm_docker_rmi should be registered');
    assert.ok(toolMap.has('vm_docker_exec'), 'vm_docker_exec should be registered');
    assert.ok(toolMap.has('vm_docker_logs'), 'vm_docker_logs should be registered');
    assert.ok(toolMap.has('vm_docker_inspect'), 'vm_docker_inspect should be registered');
    assert.ok(toolMap.has('vm_docker_stats'), 'vm_docker_stats should be registered');
    assert.ok(toolMap.has('vm_docker_network_ls'), 'vm_docker_network_ls should be registered');
    assert.ok(toolMap.has('vm_docker_volume_ls'), 'vm_docker_volume_ls should be registered');
    assert.ok(toolMap.has('vm_docker_system_prune'), 'vm_docker_system_prune should be registered');
    assert.ok(toolMap.has('vm_docker_info'), 'vm_docker_info should be registered');
    // LXC Docker tools
    assert.ok(toolMap.has('lxc_docker_ps'), 'lxc_docker_ps should be registered');
    assert.ok(toolMap.has('lxc_docker_run'), 'lxc_docker_run should be registered');
    assert.ok(toolMap.has('lxc_docker_exec'), 'lxc_docker_exec should be registered');
    assert.ok(toolMap.has('lxc_docker_logs'), 'lxc_docker_logs should be registered');
    assert.ok(toolMap.has('lxc_docker_compose_up'), 'lxc_docker_compose_up should be registered');
    assert.ok(toolMap.has('lxc_docker_compose_down'), 'lxc_docker_compose_down should be registered');
  });

  it('should register Docker Compose tools', () => {
    assert.ok(toolMap.has('vm_docker_compose_up'), 'vm_docker_compose_up');
    assert.ok(toolMap.has('vm_docker_compose_down'), 'vm_docker_compose_down');
    assert.ok(toolMap.has('vm_docker_compose_logs'), 'vm_docker_compose_logs');
    assert.ok(toolMap.has('vm_docker_compose_ps'), 'vm_docker_compose_ps');
    assert.ok(toolMap.has('vm_docker_compose_pull'), 'vm_docker_compose_pull');
    assert.ok(toolMap.has('vm_docker_compose_restart'), 'vm_docker_compose_restart');
  });

  it('should register systemd service management tools', () => {
    assert.ok(toolMap.has('vm_service_status'), 'vm_service_status');
    assert.ok(toolMap.has('vm_service_manage'), 'vm_service_manage');
    assert.ok(toolMap.has('lxc_service_status'), 'lxc_service_status');
    assert.ok(toolMap.has('lxc_service_manage'), 'lxc_service_manage');
  });

  it('should register general shell and package tools', () => {
    assert.ok(toolMap.has('vm_run_shell'), 'vm_run_shell');
    assert.ok(toolMap.has('vm_package_install'), 'vm_package_install');
    assert.ok(toolMap.has('vm_system_info'), 'vm_system_info');
    assert.ok(toolMap.has('lxc_run_shell'), 'lxc_run_shell');
    assert.ok(toolMap.has('lxc_package_install'), 'lxc_package_install');
    assert.ok(toolMap.has('lxc_system_info'), 'lxc_system_info');
  });

  it('should have valid descriptions and parameter schemas for all tools', () => {
    for (const tool of allTools) {
      assert.ok(tool.name, 'Tool must have a name');
      assert.ok(tool.description, `Tool ${tool.name} must have a description`);
      assert.ok(tool.parameters, `Tool ${tool.name} must have parameters schema`);
      assert.strictEqual(typeof tool.execute, 'function', `Tool ${tool.name} must have an execute function`);
    }
  });
});
