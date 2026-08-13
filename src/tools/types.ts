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
  execute: (args: Record<string, any>) => Promise<string>;
}
