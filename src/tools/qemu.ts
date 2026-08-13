import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const qemuTools: ProxmoxTool[] = [
  {
    name: "list_vms",
    description: "List all QEMU virtual machines on a node with status, memory, CPU, and disk info.\n\nArgs:\n    node: The node name.",
    module: "qemu",
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
    "title": "list_vmsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu";
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
    name: "get_vm_status",
    description: "Get the current runtime status of a VM (state, CPU, memory, disk, network, uptime).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "get_vm_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/status/current";
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
    name: "get_vm_config",
    description: "Get the configuration of a VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    current: If True, return current (runtime) config. If False, return pending config.",
    module: "qemu",
    parameters: {
    "properties": {
        "current": {
            "default": true,
            "title": "Current",
            "type": "boolean"
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
        "vmid"
    ],
    "title": "get_vm_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/config";
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
    name: "get_vm_pending",
    description: "Get pending configuration changes for a VM (not yet applied).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "get_vm_pendingArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/pending";
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
    name: "get_vm_feature",
    description: "Check if a specific feature is available/supported for a VM (e.g. snapshot, clone, copy).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    feature: Feature to check ('snapshot', 'clone', 'copy').",
    module: "qemu",
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
    "title": "get_vm_featureArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/feature";
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
    name: "get_vm_rrddata",
    description: "Get RRD statistics data for a VM (CPU, memory, disk, network over time).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.",
    module: "qemu",
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
    "title": "get_vm_rrddataArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/rrddata";
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
    name: "create_vm",
    description: "Create a new QEMU virtual machine.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID number.\n    name: VM name.\n    memory: Memory in MB (default 2048).\n    cores: Number of CPU cores per socket (default 1).\n    sockets: Number of CPU sockets (default 1).\n    cpu: CPU type (default 'host').\n    ostype: OS type: l26 (Linux 2.6+), win10, win11, wxp, other, etc.\n    scsihw: SCSI controller: virtio-scsi-single, virtio-scsi-pci, lsi, megasas, pvscsi.\n    scsi0: First SCSI disk (e.g. 'local-lvm:32' for 32GB on local-lvm).\n    ide2: IDE device, often used for CD-ROM (e.g. 'local:iso/ubuntu.iso,media=cdrom').\n    net0: Network device (e.g. 'virtio,bridge=vmbr0').\n    boot: Boot order, for example scsi0 then ide2 then net0.\n    bios: BIOS type: seabios, ovmf (UEFI).\n    machine: Machine type (e.g. 'q35', 'i440fx').\n    cdrom: CD-ROM ISO image path.\n    agent: QEMU guest agent: '1' to enable, 'enabled=1,fstrim_cloned_disks=1'.\n    start: Start the VM after creation.\n    onboot: Start on host boot.\n    description: VM description.\n    pool: Resource pool to add the VM to.\n    tags: Tags for the VM.",
    module: "qemu",
    parameters: {
    "properties": {
        "agent": {
            "default": "",
            "title": "Agent",
            "type": "string"
        },
        "bios": {
            "default": "seabios",
            "title": "Bios",
            "type": "string"
        },
        "boot": {
            "default": "",
            "title": "Boot",
            "type": "string"
        },
        "cdrom": {
            "default": "",
            "title": "Cdrom",
            "type": "string"
        },
        "cores": {
            "default": 1,
            "title": "Cores",
            "type": "integer"
        },
        "cpu": {
            "default": "host",
            "title": "Cpu",
            "type": "string"
        },
        "description": {
            "default": "",
            "title": "Description",
            "type": "string"
        },
        "ide2": {
            "default": "",
            "title": "Ide2",
            "type": "string"
        },
        "machine": {
            "default": "",
            "title": "Machine",
            "type": "string"
        },
        "memory": {
            "default": 2048,
            "title": "Memory",
            "type": "integer"
        },
        "name": {
            "default": "",
            "title": "Name",
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
        "ostype": {
            "default": "l26",
            "title": "Ostype",
            "type": "string"
        },
        "pool": {
            "default": "",
            "title": "Pool",
            "type": "string"
        },
        "scsi0": {
            "default": "",
            "title": "Scsi0",
            "type": "string"
        },
        "scsihw": {
            "default": "virtio-scsi-single",
            "title": "Scsihw",
            "type": "string"
        },
        "sockets": {
            "default": 1,
            "title": "Sockets",
            "type": "integer"
        },
        "start": {
            "default": false,
            "title": "Start",
            "type": "boolean"
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
    "title": "create_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu";
    const paramMap: Record<string, string> = {"1": "onboot"};
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
    name: "update_vm_config",
    description: "Update the configuration of an existing VM. Only provided parameters are changed.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    name: VM name.\n    memory: Memory in MB.\n    cores: CPU cores per socket.\n    sockets: CPU sockets.\n    cpu: CPU type.\n    net0: Network config.\n    description: Description.\n    onboot: Start on boot.\n    agent: Guest agent config.\n    boot: Boot order.\n    tags: Tags for the VM.\n    hotplug: Hotplug features (disk, network, usb, memory, cpu).\n    delete: Comma-separated list of settings to delete.",
    module: "qemu",
    parameters: {
    "properties": {
        "agent": {
            "default": "",
            "title": "Agent",
            "type": "string"
        },
        "boot": {
            "default": "",
            "title": "Boot",
            "type": "string"
        },
        "cores": {
            "default": 0,
            "title": "Cores",
            "type": "integer"
        },
        "cpu": {
            "default": "",
            "title": "Cpu",
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
        "hotplug": {
            "default": "",
            "title": "Hotplug",
            "type": "string"
        },
        "memory": {
            "default": 0,
            "title": "Memory",
            "type": "integer"
        },
        "name": {
            "default": "",
            "title": "Name",
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
        "sockets": {
            "default": 0,
            "title": "Sockets",
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
    "title": "update_vm_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/qemu/{vmid}/config";
    const paramMap: Record<string, string> = {"memory": "memory", "cores": "cores", "sockets": "sockets", "int": "onboot"};
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
    name: "delete_vm",
    description: "Delete a VM. The VM must be stopped first.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    purge: Remove from replication, HA, backup jobs and ACLs too.\n    destroy_unreferenced_disks: Also destroy unreferenced disks owned by the VM.",
    module: "qemu",
    parameters: {
    "properties": {
        "destroy_unreferenced_disks": {
            "default": true,
            "title": "Destroy Unreferenced Disks",
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
    "title": "delete_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/qemu/{vmid}";
    const paramMap: Record<string, string> = {"1": "purge"};
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
    name: "start_vm",
    description: "Start a VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    timeout: Timeout in seconds (0 = default).",
    module: "qemu",
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
    "title": "start_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/start";
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
    name: "stop_vm",
    description: "Hard-stop a VM (like pulling the power plug). Prefer shutdown_vm for graceful stop.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    timeout: Wait timeout in seconds.\n    skiplock: Ignore locks (requires root).",
    module: "qemu",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "skiplock": {
            "default": false,
            "title": "Skiplock",
            "type": "boolean"
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
    "title": "stop_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/stop";
    const paramMap: Record<string, string> = {"timeout": "timeout", "1": "skiplock"};
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
    name: "shutdown_vm",
    description: "Gracefully shut down a VM via ACPI. Falls back to hard stop after timeout if force_stop is true.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    timeout: Timeout in seconds before force stop.\n    force_stop: Force stop after timeout (default True).",
    module: "qemu",
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
    "title": "shutdown_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/shutdown";
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
    name: "reboot_vm",
    description: "Reboot a VM via ACPI.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    timeout: Wait timeout in seconds.",
    module: "qemu",
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
    "title": "reboot_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/reboot";
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
    name: "suspend_vm",
    description: "Suspend a VM (pause execution or hibernate to disk).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    todisk: If True, hibernate to disk. If False, pause in RAM.",
    module: "qemu",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "todisk": {
            "default": false,
            "title": "Todisk",
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
    "title": "suspend_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/suspend";
    const paramMap: Record<string, string> = {"1": "todisk"};
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
    name: "resume_vm",
    description: "Resume a suspended/paused VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "resume_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/resume";
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
    name: "reset_vm",
    description: "Hard reset a VM (like pressing the reset button).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "reset_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/status/reset";
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
    name: "clone_vm",
    description: "Clone a VM to create a new one. Can be a full copy or linked clone.\n\nArgs:\n    node: The source node name.\n    vmid: The source VM ID.\n    newid: The VMID for the new clone.\n    name: Name for the clone.\n    target: Target node for the clone (default: same node).\n    full: Full clone (True) or linked clone (False).\n    storage: Target storage for full clone.\n    description: Description for the clone.\n    pool: Resource pool.\n    snapname: Snapshot name to clone from.",
    module: "qemu",
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
        "name": {
            "default": "",
            "title": "Name",
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
    "title": "clone_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/clone";
    const paramMap: Record<string, string> = {"name": "name", "target": "target", "1": "full", "storage": "storage", "description": "description", "pool": "pool", "snapname": "snapname"};
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
    name: "migrate_vm",
    description: "Migrate a VM to another node in the cluster.\n\nArgs:\n    node: The source node.\n    vmid: The VM ID.\n    target: Target node name.\n    online: Live migration (True) or offline (False).\n    with_local_disks: Migrate local disks as well.\n    targetstorage: Target storage mapping for migration (e.g. 'local-lvm').",
    module: "qemu",
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
        "target": {
            "title": "Target",
            "type": "string"
        },
        "targetstorage": {
            "default": "",
            "title": "Targetstorage",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        },
        "with_local_disks": {
            "default": false,
            "title": "With Local Disks",
            "type": "boolean"
        }
    },
    "required": [
        "node",
        "vmid",
        "target"
    ],
    "title": "migrate_vmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/migrate";
    const paramMap: Record<string, string> = {"1": "with-local-disks", "targetstorage": "targetstorage"};
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
    name: "convert_vm_to_template",
    description: "Convert a VM into a template (irreversible).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "convert_vm_to_templateArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/template";
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
    name: "resize_vm_disk",
    description: "Resize a VM disk. Can only grow, not shrink.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    disk: Disk name (e.g. 'scsi0', 'virtio0', 'ide0').\n    size: New size or size increment (e.g. '50G', '+10G').",
    module: "qemu",
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
    "title": "resize_vm_diskArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/qemu/{vmid}/resize";
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
    name: "move_vm_disk",
    description: "Move a VM disk to different storage or attach to another VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    disk: Source disk name (e.g. 'scsi0').\n    storage: Target storage ID (for moving to different storage).\n    target_vmid: Target VM ID (for moving disk to another VM).\n    target_disk: Target disk slot on the target VM.\n    delete_original: Delete the original disk after moving.",
    module: "qemu",
    parameters: {
    "properties": {
        "delete_original": {
            "default": false,
            "title": "Delete Original",
            "type": "boolean"
        },
        "disk": {
            "title": "Disk",
            "type": "string"
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
        "target_disk": {
            "default": "",
            "title": "Target Disk",
            "type": "string"
        },
        "target_vmid": {
            "default": 0,
            "title": "Target Vmid",
            "type": "integer"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "disk"
    ],
    "title": "move_vm_diskArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/move_disk";
    const paramMap: Record<string, string> = {"storage": "storage", "target_vmid": "target-vmid", "target_disk": "target-disk", "1": "delete"};
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
    name: "list_vm_snapshots",
    description: "List all snapshots of a VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "list_vm_snapshotsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/snapshot";
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
    name: "create_vm_snapshot",
    description: "Create a snapshot of a VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    snapname: Snapshot name.\n    description: Snapshot description.\n    vmstate: Include RAM state (for running VMs).",
    module: "qemu",
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
        },
        "vmstate": {
            "default": false,
            "title": "Vmstate",
            "type": "boolean"
        }
    },
    "required": [
        "node",
        "vmid",
        "snapname"
    ],
    "title": "create_vm_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/snapshot";
    const paramMap: Record<string, string> = {"description": "description", "1": "vmstate"};
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
    name: "delete_vm_snapshot",
    description: "Delete a VM snapshot.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    snapname: Snapshot name to delete.\n    force: Force delete even if snapshot is in use.",
    module: "qemu",
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
    "title": "delete_vm_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}";
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
    name: "rollback_vm_snapshot",
    description: "Rollback a VM to a previous snapshot (current state will be lost).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    snapname: The snapshot name to rollback to.",
    module: "qemu",
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
    "title": "rollback_vm_snapshotArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback";
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
    name: "get_vm_snapshot_config",
    description: "Get the configuration stored in a VM snapshot.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    snapname: The snapshot name.",
    module: "qemu",
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
    "title": "get_vm_snapshot_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config";
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
    name: "get_vm_cloudinit",
    description: "Get Cloud-Init configuration for a VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "get_vm_cloudinitArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/cloudinit";
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
    name: "update_vm_cloudinit",
    description: "Set Cloud-Init parameters for a VM (user, password, SSH keys, network).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    ciuser: Cloud-Init user name.\n    cipassword: Cloud-Init password.\n    sshkeys: SSH public keys (URL-encoded, newline delimited).\n    ipconfig0: IP config for first interface (e.g. 'ip=dhcp' or 'ip=10.0.0.5/24,gw=10.0.0.1').\n    nameserver: DNS nameserver IP.\n    searchdomain: DNS search domain.",
    module: "qemu",
    parameters: {
    "properties": {
        "cipassword": {
            "default": "",
            "title": "Cipassword",
            "type": "string"
        },
        "ciuser": {
            "default": "",
            "title": "Ciuser",
            "type": "string"
        },
        "ipconfig0": {
            "default": "",
            "title": "Ipconfig0",
            "type": "string"
        },
        "nameserver": {
            "default": "",
            "title": "Nameserver",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "searchdomain": {
            "default": "",
            "title": "Searchdomain",
            "type": "string"
        },
        "sshkeys": {
            "default": "",
            "title": "Sshkeys",
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
    "title": "update_vm_cloudinitArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/qemu/{vmid}/cloudinit";
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
    name: "dump_vm_cloudinit",
    description: "Dump the Cloud-Init generated config file (user-data, network-data, or meta-data).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    type: Config type: 'user', 'network', or 'meta'.",
    module: "qemu",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "type": {
            "default": "user",
            "title": "Type",
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
    "title": "dump_vm_cloudinitArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/cloudinit/dump";
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
    name: "vm_agent_exec",
    description: "Execute a command inside a VM via the QEMU Guest Agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    command: The command to execute.\n    input_data: Data to pass to stdin.",
    module: "qemu",
    parameters: {
    "properties": {
        "command": {
            "title": "Command",
            "type": "string"
        },
        "input_data": {
            "default": "",
            "title": "Input Data",
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
        "command"
    ],
    "title": "vm_agent_execArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    if (args.wait === true || args.wait === 'true') {
      const res = await vmAgentExecSync({
        node: String(args.node),
        vmid: Number(args.vmid),
        command: args.command,
        inputData: args.input_data ? String(args.input_data) : undefined,
        timeoutSeconds: args.timeout_seconds ? Number(args.timeout_seconds) : 30,
        useShell: args.use_shell !== false,
      });
      return formatResponse(res);
    }
    const client = getProxmoxClient();
    const params: Record<string, any> = { command: args.command };
    if (args.input_data) params['input-data'] = args.input_data;
    const res = await client.post(`/nodes/${args.node}/qemu/${args.vmid}/agent/exec`, params);
    return formatResponse(res);
  }
  },
  {
    name: "vm_agent_exec_status",
    description: "Get the status/result of a command previously executed via the guest agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    pid: The PID returned by the exec call.",
    module: "qemu",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "pid": {
            "title": "Pid",
            "type": "integer"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "vmid",
        "pid"
    ],
    "title": "vm_agent_exec_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const res = await client.get(`/nodes/${args.node}/qemu/${args.vmid}/agent/exec-status`, { pid: args.pid });
    if (res && (res['out-data'] || res['err-data'])) {
      if (res['out-data']) res.stdout = Buffer.from(res['out-data'], 'base64').toString('utf-8');
      if (res['err-data']) res.stderr = Buffer.from(res['err-data'], 'base64').toString('utf-8');
    }
    return formatResponse(res);
  }
  },
  {
    name: "vm_agent_file_read",
    description: "Read a file from inside a VM via the guest agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    file: Absolute file path inside the guest.",
    module: "qemu",
    parameters: {
    "properties": {
        "file": {
            "title": "File",
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
        "file"
    ],
    "title": "vm_agent_file_readArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const res = await vmAgentFileReadDecoded(String(args.node), Number(args.vmid), String(args.file));
    return formatResponse(res.content || res.raw);
  }
  },
  {
    name: "vm_agent_file_write",
    description: "Write content to a file inside a VM via the guest agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    file: Absolute file path inside the guest.\n    content: File content to write.",
    module: "qemu",
    parameters: {
    "properties": {
        "content": {
            "title": "Content",
            "type": "string"
        },
        "file": {
            "title": "File",
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
        "file",
        "content"
    ],
    "title": "vm_agent_file_writeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const res = await vmAgentFileWriteEncoded(
      String(args.node),
      Number(args.vmid),
      String(args.file),
      String(args.content),
      args.encode !== false
    );
    return formatResponse(res);
  }
  },
  {
    name: "vm_agent_get_info",
    description: "Get various system information from a VM via the guest agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    info_type: Info to retrieve: 'get-osinfo', 'get-host-name', 'get-time',\n               'get-timezone', 'get-users', 'get-vcpus', 'get-fsinfo',\n               'get-memory-blocks', 'get-memory-block-info', 'info',\n               'network-get-interfaces'.",
    module: "qemu",
    parameters: {
    "properties": {
        "info_type": {
            "default": "get-osinfo",
            "title": "Info Type",
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
        "vmid"
    ],
    "title": "vm_agent_get_infoArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/agent/{info_type}";
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
    name: "vm_agent_set_password",
    description: "Set a user password inside a VM via the guest agent.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    username: The username.\n    password: The new password.\n    crypted: If True, password is already encrypted.",
    module: "qemu",
    parameters: {
    "properties": {
        "crypted": {
            "default": false,
            "title": "Crypted",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "password": {
            "title": "Password",
            "type": "string"
        },
        "username": {
            "title": "Username",
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
        "username",
        "password"
    ],
    "title": "vm_agent_set_passwordArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/agent/set-user-password";
    const paramMap: Record<string, string> = {"1": "crypted"};
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
    name: "get_vm_vncproxy",
    description: "Create a VNC proxy connection ticket for a VM (for console access).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    websocket: Use WebSocket connection.",
    module: "qemu",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        },
        "websocket": {
            "default": true,
            "title": "Websocket",
            "type": "boolean"
        }
    },
    "required": [
        "node",
        "vmid"
    ],
    "title": "get_vm_vncproxyArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/vncproxy";
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
    name: "get_vm_spiceproxy",
    description: "Create a SPICE proxy connection for a VM console.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "qemu",
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
    "title": "get_vm_spiceproxyArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/spiceproxy";
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
    name: "send_vm_key",
    description: "Send a key event to a VM (e.g. ctrl-alt-del).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    key: Key combination (e.g. 'ctrl-alt-delete').",
    module: "qemu",
    parameters: {
    "properties": {
        "key": {
            "title": "Key",
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
        "key"
    ],
    "title": "send_vm_keyArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/qemu/{vmid}/sendkey";
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
    name: "send_vm_monitor_command",
    description: "Send a QEMU monitor command to a VM (advanced/low-level).\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    command: The QEMU monitor command.",
    module: "qemu",
    parameters: {
    "properties": {
        "command": {
            "title": "Command",
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
        "command"
    ],
    "title": "send_vm_monitor_commandArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/monitor";
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
    name: "vm_agent_exec_sync",
    description: "Synchronously execute a command inside a VM via QEMU Guest Agent, waiting for output and exit status.",
    module: "qemu",
    parameters: {
      type: "object",
      properties: {
        node: { type: "string", description: "Node name" },
        vmid: { type: "integer", description: "VM ID" },
        command: { type: "string", description: "Command string or shell command" },
        input_data: { type: "string", description: "Stdin input data" },
        timeout_seconds: { type: "integer", description: "Timeout in seconds (default 30)" },
        use_shell: { type: "boolean", description: "Wrap in /bin/sh -c (default true)" }
      },
      required: ["node", "vmid", "command"]
    },
    execute: async (args: Record<string, any>) => {
      const res = await vmAgentExecSync({
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