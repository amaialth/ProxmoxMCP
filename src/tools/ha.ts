import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const haTools: ProxmoxTool[] = [
  {
    name: "get_ha_status",
    description: "Get HA manager status (active, quorum, manager status).",
    module: "ha",
    parameters: {
    "properties": {},
    "title": "get_ha_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/status";
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
    name: "get_ha_manager_status",
    description: "Get detailed HA manager status.",
    module: "ha",
    parameters: {
    "properties": {},
    "title": "get_ha_manager_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/status/manager_status";
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
    name: "list_ha_resources",
    description: "List all HA-managed resources.",
    module: "ha",
    parameters: {
    "properties": {},
    "title": "list_ha_resourcesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/resources";
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
    name: "get_ha_resource",
    description: "Get HA resource configuration.\n\nArgs:\n    sid: HA resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101').",
    module: "ha",
    parameters: {
    "properties": {
        "sid": {
            "title": "Sid",
            "type": "string"
        }
    },
    "required": [
        "sid"
    ],
    "title": "get_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/resources/{sid}";
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
    name: "create_ha_resource",
    description: "Add a resource to HA management.\n\nArgs:\n    sid: Resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101').\n    group: HA group name.\n    max_relocate: Max relocations on failure.\n    max_restart: Max restarts on failure.\n    state: Desired state: 'started', 'stopped', 'enabled', 'disabled', 'ignored'.\n    comment: Description.",
    module: "ha",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "group": {
            "default": "",
            "title": "Group",
            "type": "string"
        },
        "max_relocate": {
            "default": 1,
            "title": "Max Relocate",
            "type": "integer"
        },
        "max_restart": {
            "default": 1,
            "title": "Max Restart",
            "type": "integer"
        },
        "sid": {
            "title": "Sid",
            "type": "string"
        },
        "state": {
            "default": "started",
            "title": "State",
            "type": "string"
        }
    },
    "required": [
        "sid"
    ],
    "title": "create_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/ha/resources";
    const paramMap: Record<string, string> = {"group": "group", "comment": "comment"};
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
    name: "update_ha_resource",
    description: "Update an HA resource configuration.\n\nArgs:\n    sid: Resource ID.\n    group: HA group name.\n    max_relocate: Max relocations (-1 = don't change).\n    max_restart: Max restarts (-1 = don't change).\n    state: Desired state.\n    comment: Description.\n    delete: Comma-separated properties to delete.",
    module: "ha",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "group": {
            "default": "",
            "title": "Group",
            "type": "string"
        },
        "max_relocate": {
            "default": -1,
            "title": "Max Relocate",
            "type": "integer"
        },
        "max_restart": {
            "default": -1,
            "title": "Max Restart",
            "type": "integer"
        },
        "sid": {
            "title": "Sid",
            "type": "string"
        },
        "state": {
            "default": "",
            "title": "State",
            "type": "string"
        }
    },
    "required": [
        "sid"
    ],
    "title": "update_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/ha/resources/{sid}";
    const paramMap: Record<string, string> = {"group": "group", "max_relocate": "max_relocate", "max_restart": "max_restart", "state": "state", "comment": "comment", "delete": "delete"};
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
    name: "delete_ha_resource",
    description: "Remove a resource from HA management.\n\nArgs:\n    sid: Resource ID (format: 'type:vmid').",
    module: "ha",
    parameters: {
    "properties": {
        "sid": {
            "title": "Sid",
            "type": "string"
        }
    },
    "required": [
        "sid"
    ],
    "title": "delete_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/ha/resources/{sid}";
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
    name: "migrate_ha_resource",
    description: "Request migration of an HA resource to a different node.\n\nArgs:\n    sid: Resource ID.\n    node: Target node.",
    module: "ha",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "sid": {
            "title": "Sid",
            "type": "string"
        }
    },
    "required": [
        "sid",
        "node"
    ],
    "title": "migrate_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/ha/resources/{sid}/migrate";
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
    name: "relocate_ha_resource",
    description: "Request relocation of an HA resource to a different node.\n\nArgs:\n    sid: Resource ID.\n    node: Target node.",
    module: "ha",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "sid": {
            "title": "Sid",
            "type": "string"
        }
    },
    "required": [
        "sid",
        "node"
    ],
    "title": "relocate_ha_resourceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/ha/resources/{sid}/relocate";
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
    name: "list_ha_groups",
    description: "List HA groups (define which nodes can run HA resources).",
    module: "ha",
    parameters: {
    "properties": {},
    "title": "list_ha_groupsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/groups";
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
    name: "get_ha_group",
    description: "Get HA group configuration.\n\nArgs:\n    group: Group ID.",
    module: "ha",
    parameters: {
    "properties": {
        "group": {
            "title": "Group",
            "type": "string"
        }
    },
    "required": [
        "group"
    ],
    "title": "get_ha_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ha/groups/{group}";
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
    name: "create_ha_group",
    description: "Create an HA group.\n\nArgs:\n    group: Group ID.\n    nodes: Node list with optional priority (e.g. 'node1:2,node2:1' \u2014 higher = preferred).\n    nofailback: If true, don't fail back to higher-priority nodes once recovered.\n    restricted: Only run on nodes in this group (otherwise runs anywhere but prefers group nodes).\n    comment: Description.",
    module: "ha",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "group": {
            "title": "Group",
            "type": "string"
        },
        "nodes": {
            "title": "Nodes",
            "type": "string"
        },
        "nofailback": {
            "default": false,
            "title": "Nofailback",
            "type": "boolean"
        },
        "restricted": {
            "default": false,
            "title": "Restricted",
            "type": "boolean"
        }
    },
    "required": [
        "group",
        "nodes"
    ],
    "title": "create_ha_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/ha/groups";
    const paramMap: Record<string, string> = {"1": "restricted", "comment": "comment"};
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
    name: "update_ha_group",
    description: "Update an HA group.\n\nArgs:\n    group: Group ID.\n    nodes: Node list with optional priority.\n    nofailback: Don't fail back.\n    restricted: Only run on group nodes.\n    comment: Description.\n    delete: Comma-separated properties to delete.",
    module: "ha",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "group": {
            "title": "Group",
            "type": "string"
        },
        "nodes": {
            "default": "",
            "title": "Nodes",
            "type": "string"
        },
        "nofailback": {
            "default": false,
            "title": "Nofailback",
            "type": "boolean"
        },
        "restricted": {
            "default": false,
            "title": "Restricted",
            "type": "boolean"
        }
    },
    "required": [
        "group"
    ],
    "title": "update_ha_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/ha/groups/{group}";
    const paramMap: Record<string, string> = {"nodes": "nodes", "1": "restricted", "comment": "comment", "delete": "delete"};
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
    name: "delete_ha_group",
    description: "Delete an HA group.\n\nArgs:\n    group: Group ID.",
    module: "ha",
    parameters: {
    "properties": {
        "group": {
            "title": "Group",
            "type": "string"
        }
    },
    "required": [
        "group"
    ],
    "title": "delete_ha_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/ha/groups/{group}";
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