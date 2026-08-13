import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const backupTools: ProxmoxTool[] = [
  {
    name: "list_backup_jobs",
    description: "List all scheduled backup jobs (vzdump) in the cluster.",
    module: "backup",
    parameters: {
    "properties": {},
    "title": "list_backup_jobsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/backup";
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
    name: "get_backup_job",
    description: "Get details of a specific backup job.\n\nArgs:\n    id: Backup job ID.",
    module: "backup",
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
    "title": "get_backup_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/backup/{id}";
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
    name: "get_backup_job_included_volumes",
    description: "Get volumes included in a backup job.\n\nArgs:\n    id: Backup job ID.",
    module: "backup",
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
    "title": "get_backup_job_included_volumesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/backup/{id}/included_volumes";
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
    name: "create_backup_job",
    description: "Create a scheduled backup job.\n\nArgs:\n    storage: Target storage ID for backups.\n    schedule: Schedule in systemd calendar format (e.g. 'daily', 'weekly', '02:00').\n    all_guests: Backup all guests.\n    vmid: Comma-separated VMIDs to back up (if not all_guests).\n    node: Only back up guests on this node.\n    mode: Backup mode: 'snapshot', 'suspend', 'stop'.\n    compress: Compression: 'none', 'lzo', 'gzip', 'zstd'.\n    mailnotification: 'always' or 'failure'.\n    mailto: Comma-separated email addresses.\n    maxfiles: Max backup files to keep (0 = unlimited, deprecated - use prune_backups).\n    prune_backups: Retention schedule (e.g. 'keep-daily=7,keep-weekly=4').\n    notes_template: Template for backup notes.\n    enabled: Enable the job.\n    comment: Description.",
    module: "backup",
    parameters: {
    "properties": {
        "all_guests": {
            "default": true,
            "title": "All Guests",
            "type": "boolean"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "compress": {
            "default": "zstd",
            "title": "Compress",
            "type": "string"
        },
        "enabled": {
            "default": true,
            "title": "Enabled",
            "type": "boolean"
        },
        "mailnotification": {
            "default": "",
            "title": "Mailnotification",
            "type": "string"
        },
        "mailto": {
            "default": "",
            "title": "Mailto",
            "type": "string"
        },
        "maxfiles": {
            "default": 0,
            "title": "Maxfiles",
            "type": "integer"
        },
        "mode": {
            "default": "snapshot",
            "title": "Mode",
            "type": "string"
        },
        "node": {
            "default": "",
            "title": "Node",
            "type": "string"
        },
        "notes_template": {
            "default": "",
            "title": "Notes Template",
            "type": "string"
        },
        "prune_backups": {
            "default": "",
            "title": "Prune Backups",
            "type": "string"
        },
        "schedule": {
            "default": "daily",
            "title": "Schedule",
            "type": "string"
        },
        "storage": {
            "title": "Storage",
            "type": "string"
        },
        "vmid": {
            "default": "",
            "title": "Vmid",
            "type": "string"
        }
    },
    "required": [
        "storage"
    ],
    "title": "create_backup_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/backup";
    const paramMap: Record<string, string> = {"1": "all", "vmid": "vmid", "node": "node", "mailnotification": "mailnotification", "mailto": "mailto", "maxfiles": "maxfiles", "prune_backups": "prune-backups", "notes_template": "notes-template", "0": "enabled", "comment": "comment"};
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
    name: "update_backup_job",
    description: "Update a scheduled backup job.\n\nArgs:\n    id: Backup job ID.\n    storage: Target storage ID.\n    schedule: Schedule in systemd calendar format.\n    all_guests: Backup all guests.\n    vmid: Comma-separated VMIDs.\n    node: Node filter.\n    mode: Backup mode.\n    compress: Compression.\n    enabled: Enable/disable.\n    delete: Comma-separated properties to delete.",
    module: "backup",
    parameters: {
    "properties": {
        "all_guests": {
            "default": false,
            "title": "All Guests",
            "type": "boolean"
        },
        "compress": {
            "default": "",
            "title": "Compress",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "enabled": {
            "default": true,
            "title": "Enabled",
            "type": "boolean"
        },
        "id": {
            "title": "Id",
            "type": "string"
        },
        "mode": {
            "default": "",
            "title": "Mode",
            "type": "string"
        },
        "node": {
            "default": "",
            "title": "Node",
            "type": "string"
        },
        "schedule": {
            "default": "",
            "title": "Schedule",
            "type": "string"
        },
        "storage": {
            "default": "",
            "title": "Storage",
            "type": "string"
        },
        "vmid": {
            "default": "",
            "title": "Vmid",
            "type": "string"
        }
    },
    "required": [
        "id"
    ],
    "title": "update_backup_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/backup/{id}";
    const paramMap: Record<string, string> = {"storage": "storage", "schedule": "schedule", "1": "all", "vmid": "vmid", "node": "node", "mode": "mode", "compress": "compress", "0": "enabled", "delete": "delete"};
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
    name: "delete_backup_job",
    description: "Delete a scheduled backup job.\n\nArgs:\n    id: Backup job ID.",
    module: "backup",
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
    "title": "delete_backup_jobArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/backup/{id}";
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
    name: "create_vzdump",
    description: "Start an immediate backup (vzdump) on a node.\n\nArgs:\n    node: The node to run the backup on.\n    vmid: Comma-separated VMIDs (required if not all_guests).\n    all_guests: Back up all guests on the node.\n    storage: Target storage (empty = default).\n    mode: Backup mode: 'snapshot', 'suspend', 'stop'.\n    compress: Compression: 'none', 'lzo', 'gzip', 'zstd'.\n    stdout: Write to stdout instead of storage.",
    module: "backup",
    parameters: {
    "properties": {
        "all_guests": {
            "default": false,
            "title": "All Guests",
            "type": "boolean"
        },
        "compress": {
            "default": "zstd",
            "title": "Compress",
            "type": "string"
        },
        "mode": {
            "default": "snapshot",
            "title": "Mode",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "stdout": {
            "default": false,
            "title": "Stdout",
            "type": "boolean"
        },
        "storage": {
            "default": "",
            "title": "Storage",
            "type": "string"
        },
        "vmid": {
            "default": "",
            "title": "Vmid",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "create_vzdumpArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/vzdump";
    const paramMap: Record<string, string> = {"vmid": "vmid", "1": "stdout", "storage": "storage"};
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
    name: "get_vzdump_defaults",
    description: "Get the default vzdump configuration for a node.\n\nArgs:\n    node: The node name.",
    module: "backup",
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
    "title": "get_vzdump_defaultsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/vzdump/defaults";
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
    name: "get_vzdump_extractconfig",
    description: "Extract the guest configuration from a vzdump backup archive.\n\nArgs:\n    node: The node name.\n    volume: Backup volume ID (e.g. 'local:backup/vzdump-qemu-100-2024_01_01-00_00_00.vma.zst').",
    module: "backup",
    parameters: {
    "properties": {
        "node": {
            "title": "Node",
            "type": "string"
        },
        "volume": {
            "title": "Volume",
            "type": "string"
        }
    },
    "required": [
        "node",
        "volume"
    ],
    "title": "get_vzdump_extractconfigArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/vzdump/extractconfig";
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
    name: "list_backup_file_restore",
    description: "List files in a vzdump backup for single-file restore.\n\nArgs:\n    node: The node name.\n    storage: Storage ID.\n    volume: Backup volume ID.\n    filepath: Path within the backup (default '/').",
    module: "backup",
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
    "title": "list_backup_file_restoreArguments",
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
    name: "download_file_restore",
    description: "Download a file from a vzdump backup.\n\nArgs:\n    node: The node name.\n    storage: Storage ID.\n    volume: Backup volume ID.\n    filepath: Path of the file to download from the backup.",
    module: "backup",
    parameters: {
    "properties": {
        "filepath": {
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
        "volume",
        "filepath"
    ],
    "title": "download_file_restoreArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/storage/{storage}/file-restore/download";
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