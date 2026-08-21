import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync, lxcAgentExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const lxcTools: ProxmoxTool[] = [
  {
    name: "list_containers",
    description: "List all LXC containers on a node with status, memory, CPU, and disk info.\n\nArgs:\n    node: The node name.",
    module: "lxc",
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
    "title": "list_containersArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc";
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
    name: "get_container_status",
    description: "Get the current runtime status of a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID (CTID).",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_container_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/status/current";
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
    name: "get_container_config",
    description: "Get the configuration of a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_container_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/config";
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
    name: "get_container_pending",
    description: "Get pending configuration changes for a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_container_pendingArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/pending";
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
    name: "get_container_interfaces",
    description: "Get network interfaces and IPs of a running container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_container_interfacesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/interfaces";
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
    name: "get_container_rrddata",
    description: "Get RRD statistics data for a container (CPU, memory, disk, network over time).\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "timeframe": {
            "default": "hour",
            "title": "Timeframe",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_container_rrddataArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/rrddata";
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
    name: "get_container_feature",
    description: "Check if a feature is available for a container (snapshot, clone, copy).\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    feature: Feature to check ('snapshot', 'clone', 'copy').",
    module: "lxc",
    parameters: {
    "properties": {
        "feature": {
            "title": "Feature",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "feature"
    ],
    "title": "get_container_featureArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/feature";
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
    name: "create_container",
    description: "Create a new LXC container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    ostemplate: Template volume (e.g. 'local:vztmpl/debian-12-standard_12.2-1_amd64.tar.zst').\n    hostname: Container hostname.\n    password: Root password.\n    ssh_public_keys: SSH public keys (newline delimited).\n    storage: Storage for rootfs (default 'local').\n    rootfs: Root filesystem spec (e.g. 'local-lvm:8' for 8GB).\n    memory: Memory in MB (default 512).\n    swap: Swap in MB (default 512).\n    cores: CPU cores (default 1).\n    cpulimit: CPU limit (0 = unlimited).\n    net0: Network config (e.g. 'name=eth0,bridge=vmbr0,ip=dhcp').\n    nameserver: DNS nameserver.\n    searchdomain: DNS search domain.\n    onboot: Start on host boot.\n    start: Start after creation.\n    unprivileged: Create an unprivileged container (default True, recommended).\n    features: Comma-separated features (e.g. 'nesting=1,keyctl=1').\n    description: Container description.\n    pool: Resource pool.\n    tags: Tags for the container.\n    mp0: Mount point (e.g. 'local-lvm:4,mp=/mnt/data').",
    module: "lxc",
    parameters: {
    "properties": {
        "cores": {
            "default": 1,
            "title": "Cores",
            "type": "integer"
        },
        "cpulimit": {
            "default": 0,
            "title": "Cpulimit",
            "type": "number"
        },
        "description": {
            "default": "",
            "title": "Description",
            "type": "string"
        },
        "features": {
            "default": "",
            "title": "Features",
            "type": "string"
        },
        "hostname": {
            "default": "",
            "title": "Hostname",
            "type": "string"
        },
        "memory": {
            "default": 512,
            "title": "Memory",
            "type": "integer"
        },
        "mp0": {
            "default": "",
            "title": "Mp0",
            "type": "string"
        },
        "nameserver": {
            "default": "",
            "title": "Nameserver",
            "type": "string"
        },
        "net0": {
            "default": "",
            "title": "Net0",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "onboot": {
            "default": false,
            "title": "Onboot",
            "type": "boolean"
        },
        "ostemplate": {
            "title": "Ostemplate",
            "type": "string"
        },
        "password": {
            "default": "",
            "title": "Password",
            "type": "string"
        },
        "pool": {
            "default": "",
            "title": "Pool",
            "type": "string"
        },
        "rootfs": {
            "default": "",
            "title": "Rootfs",
            "type": "string"
        },
        "searchdomain": {
            "default": "",
            "title": "Searchdomain",
            "type": "string"
        },
        "ssh_public_keys": {
            "default": "",
            "title": "Ssh Public Keys",
            "type": "string"
        },
        "start": {
            "default": false,
            "title": "Start",
            "type": "boolean"
        },
        "storage": {
            "default": "local",
            "title": "Storage",
            "type": "string"
        },
        "swap": {
            "default": 512,
            "title": "Swap",
            "type": "integer"
        },
        "tags": {
            "default": "",
            "title": "Tags",
            "type": "string"
        },
        "unprivileged": {
            "default": true,
            "title": "Unprivileged",
            "type": "boolean"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "ostemplate"
    ],
    "title": "create_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc";
    const paramMap: Record<string, string> = {"storage": "storage", "cpulimit": "cpulimit", "1": "start"};
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
    name: "update_container_config",
    description: "Update the configuration of an existing container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    hostname: Container hostname.\n    memory: Memory in MB.\n    swap: Swap in MB.\n    cores: CPU cores.\n    cpulimit: CPU limit (0 = unlimited).\n    net0: Network config.\n    nameserver: DNS nameserver.\n    searchdomain: DNS search domain.\n    onboot: Start on boot.\n    description: Description.\n    features: Comma-separated features.\n    tags: Tags for the container.\n    delete: Comma-separated list of settings to delete.",
    module: "lxc",
    parameters: {
    "properties": {
        "cores": {
            "default": 0,
            "title": "Cores",
            "type": "integer"
        },
        "cpulimit": {
            "default": -1,
            "title": "Cpulimit",
            "type": "number"
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
        "features": {
            "default": "",
            "title": "Features",
            "type": "string"
        },
        "hostname": {
            "default": "",
            "title": "Hostname",
            "type": "string"
        },
        "memory": {
            "default": 0,
            "title": "Memory",
            "type": "integer"
        },
        "nameserver": {
            "default": "",
            "title": "Nameserver",
            "type": "string"
        },
        "net0": {
            "default": "",
            "title": "Net0",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "onboot": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "type": "null"
                }
            ],
            "default": null,
            "title": "Onboot"
        },
        "searchdomain": {
            "default": "",
            "title": "Searchdomain",
            "type": "string"
        },
        "swap": {
            "default": -1,
            "title": "Swap",
            "type": "integer"
        },
        "tags": {
            "default": "",
            "title": "Tags",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "update_container_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/lxc/{vmid}/config";
    const paramMap: Record<string, string> = {"memory": "memory", "swap": "swap", "cores": "cores", "cpulimit": "cpulimit", "int": "onboot"};
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
    name: "delete_container",
    description: "Delete a container. Must be stopped first unless force=True.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    purge: Remove from replication, HA, backup and ACLs too.\n    destroy_unreferenced_disks: Destroy unreferenced disks.\n    force: Force destroy even if running.",
    module: "lxc",
    parameters: {
    "properties": {
        "destroy_unreferenced_disks": {
            "default": true,
            "title": "Destroy Unreferenced Disks",
            "type": "boolean"
        },
        "force": {
            "default": false,
            "title": "Force",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "purge": {
            "default": false,
            "title": "Purge",
            "type": "boolean"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "delete_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/lxc/{vmid}";
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
    name: "start_container",
    description: "Start a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "start_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/start";
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
    name: "stop_container",
    description: "Hard-stop a container (immediate, like power off).\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "stop_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/stop";
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
    name: "shutdown_container",
    description: "Gracefully shut down a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    timeout: Timeout in seconds before force stop.\n    force_stop: Force stop after timeout.",
    module: "lxc",
    parameters: {
    "properties": {
        "force_stop": {
            "default": true,
            "title": "Force Stop",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "timeout": {
            "default": 0,
            "title": "Timeout",
            "type": "integer"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "shutdown_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/shutdown";
    const paramMap: Record<string, string> = {"timeout": "timeout"};
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
    name: "reboot_container",
    description: "Reboot a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    timeout: Timeout in seconds.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "timeout": {
            "default": 0,
            "title": "Timeout",
            "type": "integer"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "reboot_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/reboot";
    const paramMap: Record<string, string> = {"timeout": "timeout"};
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
    name: "suspend_container",
    description: "Suspend (freeze) a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "suspend_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/suspend";
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
    name: "resume_container",
    description: "Resume a suspended container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "resume_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/status/resume";
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
    name: "clone_container",
    description: "Clone a container.\n\nArgs:\n    node: The source node name.\n    vmid: The source container ID.\n    newid: ID for the new container.\n    hostname: Hostname for the clone.\n    target: Target node (default: same node).\n    full: Full clone (True) or linked clone (False).\n    storage: Target storage for full clone.\n    description: Description.\n    pool: Resource pool.\n    snapname: Snapshot to clone from.",
    module: "lxc",
    parameters: {
    "properties": {
        "description": {
            "default": "",
            "title": "Description",
            "type": "string"
        },
        "full": {
            "default": true,
            "title": "Full",
            "type": "boolean"
        },
        "hostname": {
            "default": "",
            "title": "Hostname",
            "type": "string"
        },
        "newid": {
            "title": "Newid",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "pool": {
            "default": "",
            "title": "Pool",
            "type": "string"
        },
        "snapname": {
            "default": "",
            "title": "Snapname",
            "type": "string"
        },
        "storage": {
            "default": "",
            "title": "Storage",
            "type": "string"
        },
        "target": {
            "default": "",
            "title": "Target",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "newid"
    ],
    "title": "clone_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/clone";
    const paramMap: Record<string, string> = {"1": "full"};
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
    name: "migrate_container",
    description: "Migrate a container to another node.\n\nArgs:\n    node: The source node.\n    vmid: The container ID.\n    target: Target node name.\n    online: Live migration.\n    restart: Restart container after migration (for non-live).\n    target_storage: Target storage mapping.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "online": {
            "default": false,
            "title": "Online",
            "type": "boolean"
        },
        "restart": {
            "default": false,
            "title": "Restart",
            "type": "boolean"
        },
        "target": {
            "title": "Target",
            "type": "string"
        },
        "target_storage": {
            "default": "",
            "title": "Target Storage",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "target"
    ],
    "title": "migrate_containerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/migrate";
    const paramMap: Record<string, string> = {"1": "restart", "target_storage": "target-storage"};
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
    name: "convert_container_to_template",
    description: "Convert a container into a template (irreversible).\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "convert_container_to_templateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/template";
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
    name: "resize_container_disk",
    description: "Resize a container disk/volume.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    disk: Disk name (e.g. 'rootfs', 'mp0').\n    size: New size or increment (e.g. '10G', '+2G').",
    module: "lxc",
    parameters: {
    "properties": {
        "disk": {
            "title": "Disk",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "size": {
            "title": "Size",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "disk",
        "size"
    ],
    "title": "resize_container_diskArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/lxc/{vmid}/resize";
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
    name: "move_container_volume",
    description: "Move a container volume to different storage or to another container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    volume: Volume name (e.g. 'rootfs', 'mp0').\n    storage: Target storage.\n    target_vmid: Target container ID.\n    target_volume: Target volume slot.\n    delete_original: Delete original after move.",
    module: "lxc",
    parameters: {
    "properties": {
        "delete_original": {
            "default": false,
            "title": "Delete Original",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "default": "",
            "title": "Storage",
            "type": "string"
        },
        "target_vmid": {
            "default": 0,
            "title": "Target Vmid",
            "type": "integer"
        },
        "target_volume": {
            "default": "",
            "title": "Target Volume",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        },
        "volume": {
            "title": "Volume",
            "type": "string"
        }
    },
    "required": [
        "node",
        "vmid",
        "volume"
    ],
    "title": "move_container_volumeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/move_volume";
    const paramMap: Record<string, string> = {"storage": "storage", "target_vmid": "target-vmid", "target_volume": "target-volume", "1": "delete"};
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
    name: "list_container_snapshots",
    description: "List all snapshots of a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "list_container_snapshotsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/snapshot";
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
    name: "create_container_snapshot",
    description: "Create a snapshot of a container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    snapname: Snapshot name.\n    description: Snapshot description.",
    module: "lxc",
    parameters: {
    "properties": {
        "description": {
            "default": "",
            "title": "Description",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "snapname": {
            "title": "Snapname",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "snapname"
    ],
    "title": "create_container_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/snapshot";
    const paramMap: Record<string, string> = {"description": "description"};
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
    name: "delete_container_snapshot",
    description: "Delete a container snapshot.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    snapname: Snapshot name.\n    force: Force delete.",
    module: "lxc",
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
        "snapname": {
            "title": "Snapname",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "snapname"
    ],
    "title": "delete_container_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/lxc/{vmid}/snapshot/{snapname}";
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
    name: "rollback_container_snapshot",
    description: "Rollback a container to a previous snapshot.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    snapname: Snapshot name.",
    module: "lxc",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "snapname": {
            "title": "Snapname",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "snapname"
    ],
    "title": "rollback_container_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback";
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
    name: "lxc_exec_sync",
    description: "Execute a command inside an LXC container and wait for completion.",
    module: "lxc",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "Node name" },
        vmid: { type: "integer", description: "Container ID" },
        command: { type: "string", description: "Command to execute" },
        timeout_seconds: { type: "integer", description: "Timeout in seconds (default 30)" }
      },
      required: ["node", "vmid", "command"]
    },
    execute: async (args: Record<string, any>) => {
      const res = await lxcExecSync(
        String(args.node),
        Number(args.vmid),
        args.command,
        args.timeout_seconds ? Number(args.timeout_seconds) : 30
      );
      return formatResponse(res);
    }
  },
  {
    name: "lxc_agent_exec_sync",
    description: "Synchronously execute a command inside an LXC container that has qemu-guest-agent installed.\n\nThe container must have:\n  - qemu-guest-agent installed and running\n  - agent: 1 in the container config\n\nThis uses the Proxmox LXC agent API (/nodes/{node}/lxc/{vmid}/agent/exec) and waits for output.\nFor Docker commands inside LXC, use the lxc_docker_* tools instead which call this automatically.",
    module: "lxc",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "Node name" },
        vmid: { type: "integer", description: "Container ID" },
        command: { type: "string", description: "Shell command to execute" },
        input_data: { type: "string", description: "Stdin input" },
        timeout_seconds: { type: "integer", description: "Timeout (default 30)", default: 30 },
        use_shell: { type: "boolean", description: "Wrap in /bin/sh -c (default true)", default: true },
      },
      required: ["node", "vmid", "command"]
    },
    execute: async (args: Record<string, any>) => {
      const res = await lxcAgentExecSync({
        node: String(args.node),
        vmid: Number(args.vmid),
        command: args.command,
        inputData: args.input_data ? String(args.input_data) : undefined,
        timeoutSeconds: args.timeout_seconds ? Number(args.timeout_seconds) : 30,
        useShell: args.use_shell !== false,
      });
      return formatResponse(res);
    }
  },
];