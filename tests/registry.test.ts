import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allTools, toolMap } from '../src/mcp/registry.js';

describe('Tool Registry', () => {
  it('should absorb all original tools plus enhanced guest tools (count >= 287)', () => {
    assert.ok(allTools.length >= 287, `Expected at least 287 tools, got ${allTools.length}`);
  });

  it('should register enhanced guest execution tools', () => {
    assert.ok(toolMap.has('vm_agent_exec_sync'), 'vm_agent_exec_sync should be registered');
    assert.ok(toolMap.has('vm_agent_exec'), 'vm_agent_exec should be registered');
    assert.ok(toolMap.has('lxc_exec_sync'), 'lxc_exec_sync should be registered');
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
