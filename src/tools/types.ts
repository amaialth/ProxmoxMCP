import type { ToolAnnotations } from '../mcp/annotations.js';

export interface ToolParameterSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  title?: string;
  description?: string;
}

export interface ProxmoxTool {
  name: string;
  description: string;
  module: string;
  parameters: ToolParameterSchema;
  /** Optional overrides for the name-based MCP annotations. */
  annotations?: Partial<ToolAnnotations>;
  execute: (args: Record<string, any>) => Promise<string>;
}
