import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const poolsTools: ProxmoxTool[] = [
  {
    name: "list_pools",
    description: "List all resource pools.",
    module: "pools",
    parameters: {
    "properties": {},
    "title": "list_poolsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/pools";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_pool",
    description: "Get pool configuration and members.\n\nArgs:\n    poolid: Pool ID.",
    module: "pools",
    parameters: {
    "properties": {
        "poolid": {
            "title": "Poolid",
            "type": "string"
        }
    },
    "required": [
        "poolid"
    ],
    "title": "get_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/pools/{poolid}";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "create_pool",
    description: "Create a resource pool.\n\nArgs:\n    poolid: Pool ID.\n    comment: Description.",
    module: "pools",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "poolid": {
            "title": "Poolid",
            "type": "string"
        }
    },
    "required": [
        "poolid"
    ],
    "title": "create_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/pools";
    const paramMap: Record<string, string> = {"comment": "comment"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "update_pool",
    description: "Update a resource pool (add/remove members).\n\nArgs:\n    poolid: Pool ID.\n    comment: Description.\n    vms: Comma-separated VMIDs to add/remove.\n    storage: Comma-separated storage IDs to add/remove.\n    delete: If true, remove the specified vms/storage from the pool instead of adding.",
    module: "pools",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "delete": {
            "default": false,
            "title": "Delete",
            "type": "boolean"
        },
        "poolid": {
            "title": "Poolid",
            "type": "string"
        },
        "storage": {
            "default": "",
            "title": "Storage",
            "type": "string"
        },
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "required": [
        "poolid"
    ],
    "title": "update_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/pools/{poolid}";
    const paramMap: Record<string, string> = {"comment": "comment", "vms": "vms", "storage": "storage", "1": "delete"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "delete_pool",
    description: "Delete a resource pool.\n\nArgs:\n    poolid: Pool ID.",
    module: "pools",
    parameters: {
    "properties": {
        "poolid": {
            "title": "Poolid",
            "type": "string"
        }
    },
    "required": [
        "poolid"
    ],
    "title": "delete_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/pools/{poolid}";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "list_acme_accounts",
    description: "List ACME (Let's Encrypt) accounts.",
    module: "pools",
    parameters: {
    "properties": {},
    "title": "list_acme_accountsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/account";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_acme_account",
    description: "Get ACME account details.\n\nArgs:\n    name: Account name (default: 'default').",
    module: "pools",
    parameters: {
    "properties": {
        "name": {
            "default": "default",
            "title": "Name",
            "type": "string"
        }
    },
    "title": "get_acme_accountArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/account/{name}";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "register_acme_account",
    description: "Register a new ACME account.\n\nArgs:\n    contact: Contact email address.\n    directory: ACME directory URL (empty = Let's Encrypt production).\n    name: Account name.\n    tos_url: Terms of service URL to accept.",
    module: "pools",
    parameters: {
    "properties": {
        "contact": {
            "title": "Contact",
            "type": "string"
        },
        "directory": {
            "default": "",
            "title": "Directory",
            "type": "string"
        },
        "name": {
            "default": "default",
            "title": "Name",
            "type": "string"
        },
        "tos_url": {
            "default": "",
            "title": "Tos Url",
            "type": "string"
        }
    },
    "required": [
        "contact"
    ],
    "title": "register_acme_accountArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/acme/account";
    const paramMap: Record<string, string> = {"directory": "directory", "tos_url": "tos_url"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "list_acme_plugins",
    description: "List ACME DNS challenge plugins.",
    module: "pools",
    parameters: {
    "properties": {},
    "title": "list_acme_pluginsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/plugins";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_acme_plugin",
    description: "Get ACME plugin configuration.\n\nArgs:\n    id: Plugin ID.",
    module: "pools",
    parameters: {
    "properties": {
        "id": {
            "title": "Id",
            "type": "string"
        }
    },
    "required": [
        "id"
    ],
    "title": "get_acme_pluginArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/plugins/{id}";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_acme_directories",
    description: "List known ACME directory URLs.",
    module: "pools",
    parameters: {
    "properties": {},
    "title": "get_acme_directoriesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/directories";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_acme_tos",
    description: "Get the ACME Terms of Service URL.",
    module: "pools",
    parameters: {
    "properties": {},
    "title": "get_acme_tosArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/acme/tos";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "order_node_certificate",
    description: "Order/renew ACME certificate for a node.\n\nArgs:\n    node: The node name.\n    force: Force renewal even if not due.",
    module: "pools",
    parameters: {
    "properties": {
        "force": {
            "default": false,
            "title": "Force",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "order_node_certificateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/certificates/acme/certificate";
    const paramMap: Record<string, string> = {"1": "force"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "get_node_certificates",
    description: "Get certificate info for a node.\n\nArgs:\n    node: The node name.",
    module: "pools",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "get_node_certificatesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/certificates/info";
    const paramMap: Record<string, string> = {};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
];