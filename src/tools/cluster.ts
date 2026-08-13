import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const clusterTools: ProxmoxTool[] = [
  {
    name: "get_version",
    description: "Get the Proxmox VE API version information.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_versionArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/version";
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
    name: "get_cluster_status",
    description: "Get cluster status (nodes online, quorum, HA state).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/status";
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
    name: "get_cluster_resources",
    description: "List all resources across the cluster (VMs, containers, storage, nodes).\n\nArgs:\n    type: Filter by type: 'vm', 'storage', 'node', 'sdn', 'pool' (empty = all).",
    module: "cluster",
    parameters: {
    "properties": {
        "type": {
            "default": "",
            "title": "Type",
            "type": "string"
        }
    },
    "title": "get_cluster_resourcesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/resources";
    const paramMap: Record<string, string> = {"type": "type"};
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
    name: "get_cluster_tasks",
    description: "List recent tasks across all nodes in the cluster.\n\nArgs:\n    limit: Maximum number of tasks to return.",
    module: "cluster",
    parameters: {
    "properties": {
        "limit": {
            "default": 50,
            "title": "Limit",
            "type": "integer"
        }
    },
    "title": "get_cluster_tasksArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/tasks";
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
    name: "get_cluster_log",
    description: "Get the cluster log (recent events).\n\nArgs:\n    max_entries: Max log entries.",
    module: "cluster",
    parameters: {
    "properties": {
        "max_entries": {
            "default": 50,
            "title": "Max Entries",
            "type": "integer"
        }
    },
    "title": "get_cluster_logArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/log";
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
    name: "get_next_vmid",
    description: "Get the next available VMID in the cluster.\n\nArgs:\n    vmid: Specific VMID to check availability for (0 = auto-assign).",
    module: "cluster",
    parameters: {
    "properties": {
        "vmid": {
            "default": 0,
            "title": "Vmid",
            "type": "integer"
        }
    },
    "title": "get_next_vmidArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/nextid";
    const paramMap: Record<string, string> = {"vmid": "vmid"};
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
    name: "get_cluster_options",
    description: "Get datacenter/cluster-wide options (keyboard layout, console, language, etc.).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/options";
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
    name: "update_cluster_options",
    description: "Update datacenter/cluster-wide options.\n\nArgs:\n    keyboard: Keyboard layout (e.g. 'en-us', 'de').\n    language: Default language.\n    console: Default console viewer: 'applet', 'vv', 'html5', 'xtermjs'.\n    http_proxy: HTTP proxy URL.\n    email_from: Default email sender address.\n    max_workers: Max parallel workers.\n    description: Datacenter description.\n    delete: Comma-separated settings to delete.",
    module: "cluster",
    parameters: {
    "properties": {
        "console": {
            "default": "",
            "title": "Console",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "description": {
            "default": "",
            "title": "Description",
            "type": "string"
        },
        "email_from": {
            "default": "",
            "title": "Email From",
            "type": "string"
        },
        "http_proxy": {
            "default": "",
            "title": "Http Proxy",
            "type": "string"
        },
        "keyboard": {
            "default": "",
            "title": "Keyboard",
            "type": "string"
        },
        "language": {
            "default": "",
            "title": "Language",
            "type": "string"
        },
        "max_workers": {
            "default": 0,
            "title": "Max Workers",
            "type": "integer"
        }
    },
    "title": "update_cluster_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/options";
    const paramMap: Record<string, string> = {"max_workers": "max_workers"};
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
    name: "get_cluster_config",
    description: "Get the current cluster configuration (corosync, nodes, join info).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/config";
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
    name: "get_cluster_config_nodes",
    description: "List nodes configured in the cluster.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_config_nodesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/config/nodes";
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
    name: "get_cluster_join_info",
    description: "Get info needed to join a node to this cluster.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_join_infoArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/config/join";
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
    name: "join_cluster",
    description: "Join a node to an existing cluster.\n\nArgs:\n    hostname: Hostname/IP of existing cluster node.\n    fingerprint: SSL fingerprint of the cluster node.\n    password: Root password of the cluster node.\n    nodeid: Force specific node ID.\n    force: Force join even with warnings.",
    module: "cluster",
    parameters: {
    "properties": {
        "fingerprint": {
            "title": "Fingerprint",
            "type": "string"
        },
        "force": {
            "default": false,
            "title": "Force",
            "type": "boolean"
        },
        "hostname": {
            "title": "Hostname",
            "type": "string"
        },
        "nodeid": {
            "default": 0,
            "title": "Nodeid",
            "type": "integer"
        },
        "password": {
            "title": "Password",
            "type": "string"
        }
    },
    "required": [
        "hostname",
        "fingerprint",
        "password"
    ],
    "title": "join_clusterArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/config/join";
    const paramMap: Record<string, string> = {"nodeid": "nodeid", "1": "force"};
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
    name: "get_cluster_totem",
    description: "Get the corosync totem configuration.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_cluster_totemArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/config/totem";
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
    name: "list_replication_jobs",
    description: "List all replication jobs in the cluster.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_replication_jobsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/replication";
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
    name: "get_replication_job",
    description: "Get a specific replication job configuration.\n\nArgs:\n    id: Replication job ID (format: GUEST-JOBNUM, e.g. '100-0').",
    module: "cluster",
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
    "title": "get_replication_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/replication/{id}";
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
    name: "create_replication_job",
    description: "Create a storage replication job.\n\nArgs:\n    id: Job ID (format: GUEST-JOBNUM, e.g. '100-0').\n    target: Target node.\n    type: Replication type (currently only 'local').\n    schedule: Schedule in systemd calendar format (default '*/15' = every 15 min).\n    comment: Description.\n    rate: Rate limit in mbps.\n    disable: Create disabled.",
    module: "cluster",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "disable": {
            "default": false,
            "title": "Disable",
            "type": "boolean"
        },
        "id": {
            "title": "Id",
            "type": "string"
        },
        "rate": {
            "default": 0,
            "title": "Rate",
            "type": "number"
        },
        "schedule": {
            "default": "*/15",
            "title": "Schedule",
            "type": "string"
        },
        "target": {
            "title": "Target",
            "type": "string"
        },
        "type": {
            "default": "local",
            "title": "Type",
            "type": "string"
        }
    },
    "required": [
        "id",
        "target"
    ],
    "title": "create_replication_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/replication";
    const paramMap: Record<string, string> = {"schedule": "schedule", "comment": "comment", "rate": "rate", "1": "disable"};
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
    name: "delete_replication_job",
    description: "Delete a replication job.\n\nArgs:\n    id: Replication job ID.\n    force: Force removal (skip cleanup).\n    keep: Keep replicated data on target.",
    module: "cluster",
    parameters: {
    "properties": {
        "force": {
            "default": false,
            "title": "Force",
            "type": "boolean"
        },
        "id": {
            "title": "Id",
            "type": "string"
        },
        "keep": {
            "default": false,
            "title": "Keep",
            "type": "boolean"
        }
    },
    "required": [
        "id"
    ],
    "title": "delete_replication_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/replication/{id}";
    const paramMap: Record<string, string> = {"1": "keep"};
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
    name: "list_metric_servers",
    description: "List configured metric servers (InfluxDB, Graphite).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_metric_serversArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/metrics/server";
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
    name: "get_metric_server",
    description: "Get metric server configuration.\n\nArgs:\n    id: Metric server ID.",
    module: "cluster",
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
    "title": "get_metric_serverArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/metrics/server/{id}";
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
    name: "list_notification_endpoints",
    description: "List all configured notification endpoints (sendmail, gotify, smtp, webhook).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_notification_endpointsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/notifications/endpoints";
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
    name: "list_notification_targets",
    description: "List all notification targets.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_notification_targetsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/notifications/targets";
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
    name: "list_notification_matchers",
    description: "List all notification matchers (rules that route notifications).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_notification_matchersArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/notifications/matchers";
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
    name: "test_notification_target",
    description: "Send a test notification to a target.\n\nArgs:\n    name: Target name.",
    module: "cluster",
    parameters: {
    "properties": {
        "name": {
            "title": "Name",
            "type": "string"
        }
    },
    "required": [
        "name"
    ],
    "title": "test_notification_targetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/notifications/targets/{name}/test";
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
    name: "bulk_start_guests",
    description: "Bulk start guests across the cluster.\n\nArgs:\n    vms: Comma-separated list of VMIDs (empty = all).",
    module: "cluster",
    parameters: {
    "properties": {
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "title": "bulk_start_guestsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/bulk-action/guest/start";
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
    name: "bulk_shutdown_guests",
    description: "Bulk shutdown guests across the cluster.\n\nArgs:\n    vms: Comma-separated list of VMIDs (empty = all).",
    module: "cluster",
    parameters: {
    "properties": {
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "title": "bulk_shutdown_guestsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/bulk-action/guest/shutdown";
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
    name: "bulk_migrate_guests",
    description: "Bulk migrate guests to a target node.\n\nArgs:\n    target: Target node name.\n    vms: Comma-separated VMIDs.",
    module: "cluster",
    parameters: {
    "properties": {
        "target": {
            "title": "Target",
            "type": "string"
        },
        "vms": {
            "default": "",
            "title": "Vms",
            "type": "string"
        }
    },
    "required": [
        "target"
    ],
    "title": "bulk_migrate_guestsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/bulk-action/guest/migrate";
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
    name: "get_ceph_status_cluster",
    description: "Get Ceph cluster status (health, monitors, OSDs, PGs).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_ceph_status_clusterArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ceph/status";
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
    name: "get_ceph_metadata",
    description: "Get Ceph metadata (versions, services across nodes).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_ceph_metadataArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ceph/metadata";
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
    name: "get_ceph_flags",
    description: "Get Ceph global flags (noout, noscrub, etc.).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "get_ceph_flagsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/ceph/flags";
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
    name: "set_ceph_flags",
    description: "Set a Ceph global flag.\n\nArgs:\n    flag: Flag name (noout, noscrub, nobackfill, norebalance, nodown, noup, etc.).\n    value: True to set, False to unset.",
    module: "cluster",
    parameters: {
    "properties": {
        "flag": {
            "title": "Flag",
            "type": "string"
        },
        "value": {
            "title": "Value",
            "type": "boolean"
        }
    },
    "required": [
        "flag",
        "value"
    ],
    "title": "set_ceph_flagsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/ceph/flags/{flag}";
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
    name: "get_ceph_status_node",
    description: "Get Ceph status from a specific node's perspective.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "get_ceph_status_nodeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/status";
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
    name: "list_ceph_osds",
    description: "List Ceph OSDs on a node.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_osdsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/osd";
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
    name: "create_ceph_osd",
    description: "Create a new Ceph OSD on a device.\n\nArgs:\n    node: The node name.\n    dev: Block device for the OSD (e.g. '/dev/sdb').\n    db_dev: Separate block device for DB.\n    wal_dev: Separate block device for WAL.\n    encrypted: Encrypt the OSD.",
    module: "cluster",
    parameters: {
    "properties": {
        "db_dev": {
            "default": "",
            "title": "Db Dev",
            "type": "string"
        },
        "dev": {
            "title": "Dev",
            "type": "string"
        },
        "encrypted": {
            "default": false,
            "title": "Encrypted",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "wal_dev": {
            "default": "",
            "title": "Wal Dev",
            "type": "string"
        }
    },
    "required": [
        "node",
        "dev"
    ],
    "title": "create_ceph_osdArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/ceph/osd";
    const paramMap: Record<string, string> = {"db_dev": "db_dev", "wal_dev": "wal_dev", "1": "encrypted"};
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
    name: "list_ceph_pools",
    description: "List Ceph pools.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_poolsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/pool";
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
    name: "create_ceph_pool",
    description: "Create a new Ceph pool.\n\nArgs:\n    node: The node name.\n    name: Pool name.\n    size: Number of replicas (default 3).\n    min_size: Minimum replicas for I/O (default 2).\n    pg_num: Number of placement groups (default 128).\n    application: Pool application (rbd, cephfs, rgw).",
    module: "cluster",
    parameters: {
    "properties": {
        "application": {
            "default": "rbd",
            "title": "Application",
            "type": "string"
        },
        "min_size": {
            "default": 2,
            "title": "Min Size",
            "type": "integer"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "pg_num": {
            "default": 128,
            "title": "Pg Num",
            "type": "integer"
        },
        "size": {
            "default": 3,
            "title": "Size",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "name"
    ],
    "title": "create_ceph_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/ceph/pool";
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
    name: "list_ceph_monitors",
    description: "List Ceph monitors.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_monitorsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/mon";
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
    name: "list_ceph_managers",
    description: "List Ceph managers.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_managersArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/mgr";
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
    name: "list_ceph_mds",
    description: "List Ceph metadata servers (MDS, for CephFS).\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_mdsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/mds";
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
    name: "list_ceph_fs",
    description: "List CephFS filesystems.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "list_ceph_fsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/fs";
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
    name: "get_ceph_config",
    description: "Get the raw Ceph configuration.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "get_ceph_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/cfg/raw";
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
    name: "get_ceph_crush_rules",
    description: "Get Ceph CRUSH rules.\n\nArgs:\n    node: The node name.",
    module: "cluster",
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
    "title": "get_ceph_crush_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/ceph/rules";
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
    name: "list_scheduled_jobs",
    description: "List all scheduled cluster jobs (realm-sync, etc.).",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_scheduled_jobsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/jobs";
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
    name: "list_realm_sync_jobs",
    description: "List realm synchronization jobs.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_realm_sync_jobsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/jobs/realm-sync";
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
    name: "list_pci_mappings",
    description: "List PCI device mappings for passthrough.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_pci_mappingsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/mapping/pci";
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
    name: "list_usb_mappings",
    description: "List USB device mappings for passthrough.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_usb_mappingsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/mapping/usb";
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
    name: "list_dir_mappings",
    description: "List directory mappings.",
    module: "cluster",
    parameters: {
    "properties": {},
    "title": "list_dir_mappingsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/mapping/dir";
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