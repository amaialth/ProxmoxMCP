import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const storageTools: ProxmoxTool[] = [
  {
    name: "list_storage",
    description: "List all configured storage pools at the datacenter level.\n\nArgs:\n    type: Filter by type (dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs).\n    enabled: Only show enabled storage (default True).",
    module: "storage",
    parameters: {
    "properties": {
        "enabled": {
            "default": true,
            "title": "Enabled",
            "type": "boolean"
        },
        "type": {
            "default": "",
            "title": "Type",
            "type": "string"
        }
    },
    "title": "list_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/storage";
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
    name: "get_storage_config",
    description: "Get configuration of a specific storage pool.\n\nArgs:\n    storage: The storage ID.",
    module: "storage",
    parameters: {
    "properties": {
        "storage": {
            "title": "Storage",
            "type": "string"
        }
    },
    "required": [
        "storage"
    ],
    "title": "get_storage_configArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/storage/{storage}";
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
    name: "create_storage",
    description: "Create a new storage pool configuration.\n\nArgs:\n    storage: Storage ID.\n    type: Storage type: dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs.\n    path: File system path (for dir, nfs mounts).\n    server: Server IP/hostname (for nfs, cifs, iscsi, pbs, glusterfs, rbd, cephfs).\n    export: NFS export path.\n    vgname: LVM volume group name.\n    thinpool: LVM thin pool name (for lvmthin).\n    pool: Pool name (for Ceph RBD/CephFS, ZFS).\n    portal: iSCSI portal.\n    target: iSCSI target.\n    datastore: PBS datastore name.\n    content: Comma-separated content types (images, rootdir, vztmpl, iso, backup, snippets, import).\n    nodes: Restrict storage to these nodes (comma-separated).\n    shared: Mark as shared storage.\n    disable: Create disabled.\n    maxfiles: Max backup files (0 = unlimited).\n    prune_backups: Backup retention policy.",
    module: "storage",
    parameters: {
    "properties": {
        "content": {
            "default": "",
            "title": "Content",
            "type": "string"
        },
        "datastore": {
            "default": "",
            "title": "Datastore",
            "type": "string"
        },
        "disable": {
            "default": false,
            "title": "Disable",
            "type": "boolean"
        },
        "export": {
            "default": "",
            "title": "Export",
            "type": "string"
        },
        "maxfiles": {
            "default": 0,
            "title": "Maxfiles",
            "type": "integer"
        },
        "nodes": {
            "default": "",
            "title": "Nodes",
            "type": "string"
        },
        "path": {
            "default": "",
            "title": "Path",
            "type": "string"
        },
        "pool": {
            "default": "",
            "title": "Pool",
            "type": "string"
        },
        "portal": {
            "default": "",
            "title": "Portal",
            "type": "string"
        },
        "prune_backups": {
            "default": "",
            "title": "Prune Backups",
            "type": "string"
        },
        "server": {
            "default": "",
            "title": "Server",
            "type": "string"
        },
        "shared": {
            "default": false,
            "title": "Shared",
            "type": "boolean"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "target": {
            "default": "",
            "title": "Target",
            "type": "string"
        },
        "thinpool": {
            "default": "",
            "title": "Thinpool",
            "type": "string"
        },
        "type": {
            "title": "Type",
            "type": "string"
        },
        "vgname": {
            "default": "",
            "title": "Vgname",
            "type": "string"
        }
    },
    "required": [
        "storage",
        "type"
    ],
    "title": "create_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/storage";
    const paramMap: Record<string, string> = {"1": "disable", "maxfiles": "maxfiles"};
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
    name: "update_storage",
    description: "Update an existing storage pool configuration.\n\nArgs:\n    storage: The storage ID to update.\n    content: Content types (images, rootdir, vztmpl, iso, backup, snippets, import).\n    nodes: Allowed nodes (comma-separated).\n    shared: Mark as shared.\n    disable: Disable this storage.\n    prune_backups: Backup retention policy.\n    delete: Comma-separated list of settings to delete.",
    module: "storage",
    parameters: {
    "properties": {
        "content": {
            "default": "",
            "title": "Content",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "disable": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "type": "null"
                }
            ],
            "default": null,
            "title": "Disable"
        },
        "nodes": {
            "default": "",
            "title": "Nodes",
            "type": "string"
        },
        "prune_backups": {
            "default": "",
            "title": "Prune Backups",
            "type": "string"
        },
        "shared": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "type": "null"
                }
            ],
            "default": null,
            "title": "Shared"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        }
    },
    "required": [
        "storage"
    ],
    "title": "update_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/storage/{storage}";
    const paramMap: Record<string, string> = {"int": "disable"};
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
    name: "delete_storage",
    description: "Delete a storage pool configuration (does not delete data on the backend).\n\nArgs:\n    storage: The storage ID.",
    module: "storage",
    parameters: {
    "properties": {
        "storage": {
            "title": "Storage",
            "type": "string"
        }
    },
    "required": [
        "storage"
    ],
    "title": "delete_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/storage/{storage}";
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
    name: "list_node_storage",
    description: "List storage pools available on a specific node with usage info.\n\nArgs:\n    node: The node name.\n    content: Filter by content type (images, rootdir, vztmpl, iso, backup).\n    enabled: Only show enabled storage.",
    module: "storage",
    parameters: {
    "properties": {
        "content": {
            "default": "",
            "title": "Content",
            "type": "string"
        },
        "enabled": {
            "default": true,
            "title": "Enabled",
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
    "title": "list_node_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage";
    const paramMap: Record<string, string> = {"content": "content"};
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
    name: "get_node_storage_status",
    description: "Get usage status of a storage pool on a node (total, used, available).\n\nArgs:\n    node: The node name.\n    storage: The storage ID.",
    module: "storage",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage"
    ],
    "title": "get_node_storage_statusArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/status";
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
    name: "list_storage_content",
    description: "List content of a storage pool (disk images, ISOs, templates, backups).\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    content: Filter by type: 'images', 'rootdir', 'vztmpl', 'iso', 'backup', 'snippets'.\n    vmid: Filter by VM ID.",
    module: "storage",
    parameters: {
    "properties": {
        "content": {
            "default": "",
            "title": "Content",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "vmid": {
            "default": 0,
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "storage"
    ],
    "title": "list_storage_contentArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/content";
    const paramMap: Record<string, string> = {"content": "content", "vmid": "vmid"};
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
    name: "get_storage_volume_info",
    description: "Get details about a specific volume in storage.\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    volume: The volume ID.",
    module: "storage",
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
        "volume": {
            "title": "Volume",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "volume"
    ],
    "title": "get_storage_volume_infoArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/content/{volume}";
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
    name: "allocate_storage_volume",
    description: "Allocate a new disk volume in storage.\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    vmid: VM ID to associate with.\n    filename: Volume name.\n    size: Volume size (e.g. '10G').\n    format: Disk format (raw, qcow2, vmdk). Auto-detected if empty.",
    module: "storage",
    parameters: {
    "properties": {
        "filename": {
            "title": "Filename",
            "type": "string"
        },
        "format": {
            "default": "",
            "title": "Format",
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
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "vmid": {
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "storage",
        "vmid",
        "filename",
        "size"
    ],
    "title": "allocate_storage_volumeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/storage/{storage}/content";
    const paramMap: Record<string, string> = {"format": "format"};
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
    name: "delete_storage_volume",
    description: "Delete a volume from storage.\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    volume: The volume ID.",
    module: "storage",
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
        "volume": {
            "title": "Volume",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "volume"
    ],
    "title": "delete_storage_volumeArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/nodes/{node}/storage/{storage}/content/{volume}";
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
    name: "upload_to_storage",
    description: "Upload a file (ISO, template, etc.) to storage. Note: actual file upload must go through the HTTP API directly.\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    content: Content type: 'iso', 'vztmpl', 'snippets', 'import'.\n    filename: Target filename.\n    tmpfilename: Temporary filename for the upload.",
    module: "storage",
    parameters: {
    "properties": {
        "content": {
            "title": "Content",
            "type": "string"
        },
        "filename": {
            "title": "Filename",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "tmpfilename": {
            "default": "",
            "title": "Tmpfilename",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "content",
        "filename"
    ],
    "title": "upload_to_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/storage/{storage}/upload";
    const paramMap: Record<string, string> = {"tmpfilename": "tmpfilename"};
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
    name: "download_url_to_storage",
    description: "Download a file from a URL directly to storage (ISO, template, etc.).\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    url: URL to download from.\n    content: Content type: 'iso', 'vztmpl'.\n    filename: Target filename.\n    checksum: Expected checksum.\n    checksum_algorithm: Checksum algorithm (sha256, sha512, md5).",
    module: "storage",
    parameters: {
    "properties": {
        "checksum": {
            "default": "",
            "title": "Checksum",
            "type": "string"
        },
        "checksum_algorithm": {
            "default": "",
            "title": "Checksum Algorithm",
            "type": "string"
        },
        "content": {
            "title": "Content",
            "type": "string"
        },
        "filename": {
            "title": "Filename",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "url": {
            "title": "Url",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "url",
        "content",
        "filename"
    ],
    "title": "download_url_to_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/storage/{storage}/download-url";
    const paramMap: Record<string, string> = {"checksum": "checksum", "checksum_algorithm": "checksum-algorithm"};
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
    name: "get_storage_rrddata",
    description: "Get RRD statistics for a storage pool (usage over time).\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.",
    module: "storage",
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
        "timeframe": {
            "default": "hour",
            "title": "Timeframe",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage"
    ],
    "title": "get_storage_rrddataArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/rrddata";
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
    name: "prune_storage_backups",
    description: "Prune (delete) old backups from storage according to retention policy.\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    type: Guest type filter ('qemu' or 'lxc').\n    vmid: Filter by VM ID.\n    prune_backups: Retention spec (e.g. 'keep-last=3,keep-daily=7,keep-weekly=4').\n    dry_run: If True, only simulate (default True for safety).",
    module: "storage",
    parameters: {
    "properties": {
        "dry_run": {
            "default": true,
            "title": "Dry Run",
            "type": "boolean"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "prune_backups": {
            "default": "",
            "title": "Prune Backups",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "type": {
            "default": "",
            "title": "Type",
            "type": "string"
        },
        "vmid": {
            "default": 0,
            "title": "Vmid",
            "type": "integer"
        }
    },
    "required": [
        "node",
        "storage"
    ],
    "title": "prune_storage_backupsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/prunebackups";
    const paramMap: Record<string, string> = {"type": "type", "vmid": "vmid", "prune_backups": "prune-backups"};
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
    name: "list_file_restore",
    description: "List files in a backup volume for file-level restore (PBS backups).\n\nArgs:\n    node: The node name.\n    storage: The storage ID.\n    volume: The backup volume ID.\n    filepath: Path inside the backup to list (default '/').",
    module: "storage",
    parameters: {
    "properties": {
        "filepath": {
            "default": "/",
            "title": "Filepath",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "volume": {
            "title": "Volume",
            "type": "string"
        }
    },
    "required": [
        "node",
        "storage",
        "volume"
    ],
    "title": "list_file_restoreArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/file-restore/list";
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
    name: "list_lvm_volumes",
    description: "List LVM volume groups on a node.\n\nArgs:\n    node: The node name.",
    module: "storage",
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
    "title": "list_lvm_volumesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/lvm";
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
    name: "create_lvm",
    description: "Create a new LVM volume group on a device.\n\nArgs:\n    node: The node name.\n    name: VG name.\n    device: Block device path (e.g. '/dev/sdb').\n    add_to_storage: Auto-add as Proxmox storage.",
    module: "storage",
    parameters: {
    "properties": {
        "add_to_storage": {
            "default": true,
            "title": "Add To Storage",
            "type": "boolean"
        },
        "device": {
            "title": "Device",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "name",
        "device"
    ],
    "title": "create_lvmArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/disks/lvm";
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
    name: "list_lvmthin_pools",
    description: "List LVM thin pools on a node.\n\nArgs:\n    node: The node name.",
    module: "storage",
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
    "title": "list_lvmthin_poolsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/lvmthin";
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
    name: "create_lvmthin",
    description: "Create a new LVM thin pool.\n\nArgs:\n    node: The node name.\n    name: Thin pool name.\n    device: Block device path.\n    add_to_storage: Auto-add as Proxmox storage.",
    module: "storage",
    parameters: {
    "properties": {
        "add_to_storage": {
            "default": true,
            "title": "Add To Storage",
            "type": "boolean"
        },
        "device": {
            "title": "Device",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "name",
        "device"
    ],
    "title": "create_lvmthinArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/disks/lvmthin";
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
    name: "list_zfs_pools",
    description: "List ZFS pools on a node.\n\nArgs:\n    node: The node name.",
    module: "storage",
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
    "title": "list_zfs_poolsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/zfs";
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
    name: "get_zfs_pool",
    description: "Get details of a ZFS pool.\n\nArgs:\n    node: The node name.\n    name: ZFS pool name.",
    module: "storage",
    parameters: {
    "properties": {
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "name"
    ],
    "title": "get_zfs_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/zfs/{name}";
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
    name: "create_zfs_pool",
    description: "Create a new ZFS pool.\n\nArgs:\n    node: The node name.\n    name: Pool name.\n    raidlevel: RAID level: single, mirror, raid10, raidz, raidz2, raidz3, draid, draid2, draid3.\n    devices: Space-separated device paths (e.g. '/dev/sdb /dev/sdc').\n    add_to_storage: Auto-add as Proxmox storage.\n    ashift: ashift value (default 12).\n    compression: Compression (on, off, lz4, zstd, etc.).",
    module: "storage",
    parameters: {
    "properties": {
        "add_to_storage": {
            "default": true,
            "title": "Add To Storage",
            "type": "boolean"
        },
        "ashift": {
            "default": 12,
            "title": "Ashift",
            "type": "integer"
        },
        "compression": {
            "default": "on",
            "title": "Compression",
            "type": "string"
        },
        "devices": {
            "title": "Devices",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "raidlevel": {
            "title": "Raidlevel",
            "type": "string"
        }
    },
    "required": [
        "node",
        "name",
        "raidlevel",
        "devices"
    ],
    "title": "create_zfs_poolArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/disks/zfs";
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
    name: "list_directory_storage",
    description: "List directory-based storage mounts on a node.\n\nArgs:\n    node: The node name.",
    module: "storage",
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
    "title": "list_directory_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/disks/directory";
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
    name: "create_directory_storage",
    description: "Create a directory-based storage mount from a device.\n\nArgs:\n    node: The node name.\n    name: Storage name.\n    device: Block device path.\n    filesystem: Filesystem type (ext4, xfs).\n    add_to_storage: Auto-add as Proxmox storage.",
    module: "storage",
    parameters: {
    "properties": {
        "add_to_storage": {
            "default": true,
            "title": "Add To Storage",
            "type": "boolean"
        },
        "device": {
            "title": "Device",
            "type": "string"
        },
        "filesystem": {
            "default": "ext4",
            "title": "Filesystem",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node",
        "name",
        "device"
    ],
    "title": "create_directory_storageArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/disks/directory";
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
    name: "initialize_gpt",
    description: "Initialize a disk with GPT partition table (WARNING: destroys all data).\n\nArgs:\n    node: The node name.\n    disk: Disk device path (e.g. '/dev/sdb').",
    module: "storage",
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
    "title": "initialize_gptArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/disks/initgpt";
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