import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const nodesTools: ProxmoxTool[] = [
  {
    name: "list_nodes",
    description: "List all nodes in the Proxmox cluster with their status, CPU, memory, and uptime.",
    module: "nodes",
    parameters: {
    "properties": {},
    "title": "list_nodesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes";
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
    name: "get_node_status",
    description: "Get detailed status of a specific node including CPU, memory, disk, uptime, and kernel info.\n\nArgs:\n    node: The node name (e.g. 'pve1').",
    module: "nodes",
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
    "title": "get_node_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/status";
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
    name: "get_node_config",
    description: "Get the configuration of a node (description, wakeonlan, etc.).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/config";
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
    name: "get_node_dns",
    description: "Get DNS settings for a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_dnsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/dns";
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
    name: "get_node_network",
    description: "Get network interface configuration for a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_networkArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/network";
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
    name: "get_node_network_interface",
    description: "Get details for a specific network interface.\n\nArgs:\n    node: The node name.\n    iface: Interface name (e.g. 'vmbr0', 'eth0').",
    module: "nodes",
    parameters: {
    "properties": {
        "iface": {
            "title": "Iface",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "iface"
    ],
    "title": "get_node_network_interfaceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/network/{iface}";
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
    name: "create_node_network_interface",
    description: "Create a network interface on a node.\n\nArgs:\n    node: The node name.\n    iface: Interface name (e.g. 'vmbr1').\n    type: Interface type (bridge, bond, eth, alias, vlan, OVSBridge, OVSPort, OVSIntPort, OVSBond).\n    address: IP address (CIDR notation or IP).\n    netmask: Subnet mask.\n    gateway: Default gateway.\n    bridge_ports: Bridge ports (for bridge type).\n    autostart: Whether to start on boot.\n    comments: Comments for the interface.",
    module: "nodes",
    parameters: {
    "properties": {
        "address": {
            "default": "",
            "title": "Address",
            "type": "string"
        },
        "autostart": {
            "default": true,
            "title": "Autostart",
            "type": "boolean"
        },
        "bridge_ports": {
            "default": "",
            "title": "Bridge Ports",
            "type": "string"
        },
        "comments": {
            "default": "",
            "title": "Comments",
            "type": "string"
        },
        "gateway": {
            "default": "",
            "title": "Gateway",
            "type": "string"
        },
        "iface": {
            "title": "Iface",
            "type": "string"
        },
        "netmask": {
            "default": "",
            "title": "Netmask",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "type": {
            "title": "Type",
            "type": "string"
        }
    },
    "required": [
        "node",
        "iface",
        "type"
    ],
    "title": "create_node_network_interfaceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/network";
    const paramMap: Record<string, string> = {"address": "address", "netmask": "netmask", "gateway": "gateway", "bridge_ports": "bridge_ports", "comments": "comments"};
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
    name: "list_node_services",
    description: "List all system services on a node (pve, ssh, cron, etc.).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "list_node_servicesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/services";
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
    name: "manage_node_service",
    description: "Start, stop, restart, or reload a system service on a node.\n\nArgs:\n    node: The node name.\n    service: Service name (e.g. 'pvedaemon', 'pveproxy', 'ssh', 'cron', 'postfix').\n    action: One of 'start', 'stop', 'restart', 'reload'.",
    module: "nodes",
    parameters: {
    "properties": {
        "action": {
            "title": "Action",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "service": {
            "title": "Service",
            "type": "string"
        }
    },
    "required": [
        "node",
        "service",
        "action"
    ],
    "title": "manage_node_serviceArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/services/{service}/{action}";
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
    name: "get_node_syslog",
    description: "Read system log (syslog) entries from a node.\n\nArgs:\n    node: The node name.\n    limit: Max number of log lines to return (default 50).\n    start: Start line number.\n    since: Only show entries since this date (YYYY-MM-DD).\n    until: Only show entries until this date (YYYY-MM-DD).",
    module: "nodes",
    parameters: {
    "properties": {
        "limit": {
            "default": 50,
            "title": "Limit",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "since": {
            "default": "",
            "title": "Since",
            "type": "string"
        },
        "start": {
            "default": 0,
            "title": "Start",
            "type": "integer"
        },
        "until": {
            "default": "",
            "title": "Until",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "get_node_syslogArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/syslog";
    const paramMap: Record<string, string> = {"since": "since", "until": "until"};
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
    name: "get_node_journal",
    description: "Read systemd journal entries from a node.\n\nArgs:\n    node: The node name.\n    lastentries: Max number of entries (default 50).\n    since: Show entries since date/time.\n    until: Show entries until date/time.\n    startcursor: Start cursor for paging.",
    module: "nodes",
    parameters: {
    "properties": {
        "lastentries": {
            "default": 50,
            "title": "Lastentries",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "since": {
            "default": "",
            "title": "Since",
            "type": "string"
        },
        "startcursor": {
            "default": "",
            "title": "Startcursor",
            "type": "string"
        },
        "until": {
            "default": "",
            "title": "Until",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "get_node_journalArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/journal";
    const paramMap: Record<string, string> = {"since": "since", "until": "until", "startcursor": "startcursor"};
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
    name: "list_node_tasks",
    description: "List recent tasks on a node.\n\nArgs:\n    node: The node name.\n    limit: Max tasks to return (default 50).\n    start: Offset for paging.\n    vmid: Filter by VM ID (0 = all).\n    typefilter: Filter by task type (e.g. 'qmstart', 'vzstart', 'vzcreate').\n    statusfilter: Filter by status ('running', 'ok', 'error', etc.).",
    module: "nodes",
    parameters: {
    "properties": {
        "limit": {
            "default": 50,
            "title": "Limit",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "start": {
            "default": 0,
            "title": "Start",
            "type": "integer"
        },
        "statusfilter": {
            "default": "",
            "title": "Statusfilter",
            "type": "string"
        },
        "typefilter": {
            "default": "",
            "title": "Typefilter",
            "type": "string"
        },
        "vmid": {
            "default": 0,
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node"
    ],
    "title": "list_node_tasksArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/tasks";
    const paramMap: Record<string, string> = {"vmid": "vmid", "typefilter": "typefilter", "statusfilter": "statusfilter"};
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
    name: "get_task_status",
    description: "Get the status of a specific task by its UPID.\n\nArgs:\n    node: The node name.\n    upid: The task UPID string.",
    module: "nodes",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "upid": {
            "title": "Upid",
            "type": "string"
        }
    },
    "required": [
        "node",
        "upid"
    ],
    "title": "get_task_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/tasks/{upid}/status";
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
    name: "get_task_log",
    description: "Get log output of a specific task.\n\nArgs:\n    node: The node name.\n    upid: The task UPID string.\n    limit: Max lines to return.\n    start: Start line number.",
    module: "nodes",
    parameters: {
    "properties": {
        "limit": {
            "default": 50,
            "title": "Limit",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "start": {
            "default": 0,
            "title": "Start",
            "type": "integer"
        },
        "upid": {
            "title": "Upid",
            "type": "string"
        }
    },
    "required": [
        "node",
        "upid"
    ],
    "title": "get_task_logArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/tasks/{upid}/log";
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
    name: "stop_task",
    description: "Stop (abort) a running task.\n\nArgs:\n    node: The node name.\n    upid: The task UPID string.",
    module: "nodes",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "upid": {
            "title": "Upid",
            "type": "string"
        }
    },
    "required": [
        "node",
        "upid"
    ],
    "title": "stop_taskArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/tasks/{upid}";
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
    name: "get_node_time",
    description: "Get the current time and timezone of a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_timeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/time";
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
    name: "get_node_subscription",
    description: "Get subscription status for a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_subscriptionArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/subscription";
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
    name: "get_node_apt_update",
    description: "List available package updates on a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_apt_updateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/apt/update";
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
    name: "run_apt_update",
    description: "Refresh the package index on a node (apt update).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "run_apt_updateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/apt/update";
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
    name: "get_node_report",
    description: "Generate a system report for a node (useful for diagnostics).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_reportArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/report";
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
    name: "get_node_disks",
    description: "List physical disks on a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_disksArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/list";
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
    name: "get_disk_smart",
    description: "Get S.M.A.R.T. health data for a disk.\n\nArgs:\n    node: The node name.\n    disk: Disk device path (e.g. '/dev/sda').",
    module: "nodes",
    parameters: {
    "properties": {
        "disk": {
            "title": "Disk",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "disk"
    ],
    "title": "get_disk_smartArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/smart";
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
    name: "get_node_hardware_pci",
    description: "List PCI hardware devices on a node (for passthrough).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_hardware_pciArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/hardware/pci";
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
    name: "get_node_hardware_usb",
    description: "List USB hardware devices on a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_hardware_usbArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/hardware/usb";
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
    name: "get_node_capabilities_qemu",
    description: "Get QEMU capabilities for a node: supported CPU models, machine types, etc.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_capabilities_qemuArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/capabilities/qemu/cpu";
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
    name: "get_node_storage_scan",
    description: "Scan for available storage targets (NFS, CIFS, iSCSI, LVM, ZFS, PBS).\n\nArgs:\n    node: The node name.\n    scan_type: Type to scan: 'nfs', 'cifs', 'iscsi', 'lvm', 'lvmthin', 'zfs', 'pbs'.\n    server: Server address (required for nfs, cifs, iscsi, pbs).",
    module: "nodes",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "scan_type": {
            "title": "Scan Type",
            "type": "string"
        },
        "server": {
            "default": "",
            "title": "Server",
            "type": "string"
        }
    },
    "required": [
        "node",
        "scan_type"
    ],
    "title": "get_node_storage_scanArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/scan/{scan_type}";
    const paramMap: Record<string, string> = {"server": "server"};
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
    name: "wakeonlan_node",
    description: "Send a Wake-on-LAN magic packet to a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "wakeonlan_nodeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/wakeonlan";
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
    name: "startall_node",
    description: "Start all VMs and containers on a node (respecting boot order).\n\nArgs:\n    node: The node name.\n    force: Force start even if already running.\n    vms: Comma-separated list of VMIDs to start (empty = all).",
    module: "nodes",
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
        },
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "startall_nodeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/startall";
    const paramMap: Record<string, string> = {"1": "force", "vms": "vms"};
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
    name: "stopall_node",
    description: "Stop all VMs and containers on a node.\n\nArgs:\n    node: The node name.\n    vms: Comma-separated list of VMIDs to stop (empty = all).",
    module: "nodes",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "stopall_nodeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/stopall";
    const paramMap: Record<string, string> = {"vms": "vms"};
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
    name: "get_node_hosts",
    description: "Get the /etc/hosts file content for a node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_hostsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/hosts";
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
    name: "get_node_version",
    description: "Get Proxmox VE version information for a specific node.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_versionArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/version";
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
    name: "get_node_netstat",
    description: "Get network statistics for a node (per-interface traffic).\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_netstatArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/netstat";
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
    name: "get_node_aplinfo",
    description: "List available appliance templates (LXC templates) that can be downloaded.\n\nArgs:\n    node: The node name.",
    module: "nodes",
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
    "title": "get_node_aplinfoArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/aplinfo";
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
    name: "download_appliance_template",
    description: "Download an appliance template to local storage.\n\nArgs:\n    node: The node name.\n    storage: Target storage ID.\n    template: Template name to download.",
    module: "nodes",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "template": {
            "title": "Template",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "template"
    ],
    "title": "download_appliance_templateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/aplinfo";
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
    name: "list_node_disks",
    description: "List physical disks on a node with health, size, model, serial, and wearout status.",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" },
        include_partitions: { type: "boolean", description: "Include partitions in disk list" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const res = await client.get(`/nodes/${args.node}/disks/list`, {
        skiptrash: 1,
        include_partitions: args.include_partitions ? 1 : 0
      });
      return formatResponse(res);
    }
  },
  {
    name: "list_lvm_pools",
    description: "List LVM volume groups on a node.",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const res = await client.get(`/nodes/${args.node}/disks/lvm`);
      return formatResponse(res);
    }
  },
  {
    name: "list_node_pci_devices",
    description: "List PCI devices on a node (useful for GPU or network passthrough configuration).",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" },
        pci_class_blacklist: { type: "string", description: "Class blacklist filter" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const res = await client.get(`/nodes/${args.node}/hardware/pci`);
      return formatResponse(res);
    }
  },
  {
    name: "list_node_usb_devices",
    description: "List USB devices attached to a node (useful for USB passthrough).",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const res = await client.get(`/nodes/${args.node}/hardware/usb`);
      return formatResponse(res);
    }
  },
  {
    name: "stop_node_task",
    description: "Stop or cancel an active background task on a node using its UPID.",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" },
        upid: { type: "string", description: "Task UPID" }
      },
      required: ["node", "upid"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const res = await client.delete(`/nodes/${args.node}/tasks/${encodeURIComponent(args.upid)}`);
      return formatResponse(res);
    }
  },
  {
    name: "bulk_start_node_vms",
    description: "Bulk start VMs/containers on a node.",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" },
        vms: { type: "string", description: "Comma-separated VMIDs/CTIDs to start" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const params: Record<string, any> = {};
      if (args.vms) params.vms = args.vms;
      const res = await client.post(`/nodes/${args.node}/startall`, params);
      return formatResponse(res);
    }
  },
  {
    name: "bulk_stop_node_vms",
    description: "Bulk stop VMs/containers on a node.",
    module: "nodes",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "The node name" },
        timeout: { type: "integer", description: "Timeout in seconds per guest" }
      },
      required: ["node"]
    },
    execute: async (args: Record<string, any>) => {
      const client = getProxmoxClient();
      const params: Record<string, any> = {};
      if (args.timeout) params.timeout = args.timeout;
      const res = await client.post(`/nodes/${args.node}/stopall`, params);
      return formatResponse(res);
    }
  }
];