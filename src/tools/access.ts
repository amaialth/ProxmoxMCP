import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const accessTools: ProxmoxTool[] = [
  {
    name: "list_users",
    description: "List all users in Proxmox.\n\nArgs:\n    enabled: Only show enabled users.\n    full: Include detailed info (groups, tokens, etc.).",
    module: "access",
    parameters: {
    "properties": {
        "enabled": {
            "default": false,
            "title": "Enabled",
            "type": "boolean"
        },
        "full": {
            "default": true,
            "title": "Full",
            "type": "boolean"
        }
    },
    "title": "list_usersArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/users";
    const paramMap: Record<string, string> = {"1": "enabled"};
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
    name: "get_user",
    description: "Get details for a specific user.\n\nArgs:\n    userid: User ID (format: 'user@realm', e.g. 'admin@pam').",
    module: "access",
    parameters: {
    "properties": {
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid"
    ],
    "title": "get_userArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/users/{userid}";
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
    name: "create_user",
    description: "Create a new user.\n\nArgs:\n    userid: User ID (format: 'user@realm', e.g. 'myuser@pve').\n    password: Password (only for pve/pam realms).\n    email: Email address.\n    firstname: First name.\n    lastname: Last name.\n    groups: Comma-separated group list.\n    comment: Description.\n    enable: Enable user.\n    expire: Account expiration (Unix epoch, 0 = never).",
    module: "access",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "email": {
            "default": "",
            "title": "Email",
            "type": "string"
        },
        "enable": {
            "default": true,
            "title": "Enable",
            "type": "boolean"
        },
        "expire": {
            "default": 0,
            "title": "Expire",
            "type": "integer"
        },
        "firstname": {
            "default": "",
            "title": "Firstname",
            "type": "string"
        },
        "groups": {
            "default": "",
            "title": "Groups",
            "type": "string"
        },
        "lastname": {
            "default": "",
            "title": "Lastname",
            "type": "string"
        },
        "password": {
            "default": "",
            "title": "Password",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid"
    ],
    "title": "create_userArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/access/users";
    const paramMap: Record<string, string> = {"password": "password", "0": "enable", "expire": "expire"};
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
    name: "update_user",
    description: "Update an existing user.\n\nArgs:\n    userid: User ID (format: 'user@realm').\n    email: Email address.\n    firstname: First name.\n    lastname: Last name.\n    groups: Comma-separated group list.\n    comment: Description.\n    enable: Enable/disable user.\n    expire: Account expiration (Unix epoch, 0 = never, -1 = don't change).\n    append: Append groups instead of replacing.",
    module: "access",
    parameters: {
    "properties": {
        "append": {
            "default": false,
            "title": "Append",
            "type": "boolean"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "email": {
            "default": "",
            "title": "Email",
            "type": "string"
        },
        "enable": {
            "default": true,
            "title": "Enable",
            "type": "boolean"
        },
        "expire": {
            "default": -1,
            "title": "Expire",
            "type": "integer"
        },
        "firstname": {
            "default": "",
            "title": "Firstname",
            "type": "string"
        },
        "groups": {
            "default": "",
            "title": "Groups",
            "type": "string"
        },
        "lastname": {
            "default": "",
            "title": "Lastname",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid"
    ],
    "title": "update_userArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/access/users/{userid}";
    const paramMap: Record<string, string> = {"0": "enable", "expire": "expire", "1": "append"};
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
    name: "delete_user",
    description: "Delete a user.\n\nArgs:\n    userid: User ID to delete (format: 'user@realm').",
    module: "access",
    parameters: {
    "properties": {
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid"
    ],
    "title": "delete_userArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/access/users/{userid}";
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
    name: "list_user_tokens",
    description: "List API tokens for a user.\n\nArgs:\n    userid: User ID (format: 'user@realm').",
    module: "access",
    parameters: {
    "properties": {
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid"
    ],
    "title": "list_user_tokensArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/users/{userid}/token";
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
    name: "get_user_token",
    description: "Get details for a specific API token.\n\nArgs:\n    userid: User ID (format: 'user@realm').\n    tokenid: Token ID.",
    module: "access",
    parameters: {
    "properties": {
        "tokenid": {
            "title": "Tokenid",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid",
        "tokenid"
    ],
    "title": "get_user_tokenArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/users/{userid}/token/{tokenid}";
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
    name: "create_user_token",
    description: "Create a new API token for a user. Returns the token value (shown only once).\n\nArgs:\n    userid: User ID (format: 'user@realm').\n    tokenid: Token ID (alphanumeric).\n    comment: Token description.\n    privsep: Enable privilege separation (token has own permissions, not user's full permissions).\n    expire: Expiration (Unix epoch, 0 = never).",
    module: "access",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "expire": {
            "default": 0,
            "title": "Expire",
            "type": "integer"
        },
        "privsep": {
            "default": true,
            "title": "Privsep",
            "type": "boolean"
        },
        "tokenid": {
            "title": "Tokenid",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid",
        "tokenid"
    ],
    "title": "create_user_tokenArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/access/users/{userid}/token/{tokenid}";
    const paramMap: Record<string, string> = {"comment": "comment", "0": "privsep", "expire": "expire"};
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
    name: "delete_user_token",
    description: "Delete an API token.\n\nArgs:\n    userid: User ID (format: 'user@realm').\n    tokenid: Token ID.",
    module: "access",
    parameters: {
    "properties": {
        "tokenid": {
            "title": "Tokenid",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid",
        "tokenid"
    ],
    "title": "delete_user_tokenArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/access/users/{userid}/token/{tokenid}";
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
    name: "list_groups",
    description: "List all user groups.",
    module: "access",
    parameters: {
    "properties": {},
    "title": "list_groupsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/groups";
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
    name: "get_group",
    description: "Get group details.\n\nArgs:\n    groupid: Group ID.",
    module: "access",
    parameters: {
    "properties": {
        "groupid": {
            "title": "Groupid",
            "type": "string"
        }
    },
    "required": [
        "groupid"
    ],
    "title": "get_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/groups/{groupid}";
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
    name: "create_group",
    description: "Create a new group.\n\nArgs:\n    groupid: Group ID.\n    comment: Description.",
    module: "access",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "groupid": {
            "title": "Groupid",
            "type": "string"
        }
    },
    "required": [
        "groupid"
    ],
    "title": "create_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/access/groups";
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
    name: "update_group",
    description: "Update a group.\n\nArgs:\n    groupid: Group ID.\n    comment: Description.",
    module: "access",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "groupid": {
            "title": "Groupid",
            "type": "string"
        }
    },
    "required": [
        "groupid"
    ],
    "title": "update_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/access/groups/{groupid}";
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
    name: "delete_group",
    description: "Delete a group.\n\nArgs:\n    groupid: Group ID.",
    module: "access",
    parameters: {
    "properties": {
        "groupid": {
            "title": "Groupid",
            "type": "string"
        }
    },
    "required": [
        "groupid"
    ],
    "title": "delete_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/access/groups/{groupid}";
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
    name: "list_roles",
    description: "List all available roles.",
    module: "access",
    parameters: {
    "properties": {},
    "title": "list_rolesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/roles";
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
    name: "get_role",
    description: "Get role details and its privileges.\n\nArgs:\n    roleid: Role ID.",
    module: "access",
    parameters: {
    "properties": {
        "roleid": {
            "title": "Roleid",
            "type": "string"
        }
    },
    "required": [
        "roleid"
    ],
    "title": "get_roleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/roles/{roleid}";
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
    name: "create_role",
    description: "Create a new role with specific privileges.\n\nArgs:\n    roleid: Role ID.\n    privs: Comma-separated list of privileges (e.g. 'VM.Allocate,VM.Config.Disk,VM.PowerMgmt').",
    module: "access",
    parameters: {
    "properties": {
        "privs": {
            "title": "Privs",
            "type": "string"
        },
        "roleid": {
            "title": "Roleid",
            "type": "string"
        }
    },
    "required": [
        "roleid",
        "privs"
    ],
    "title": "create_roleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/access/roles";
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
    name: "update_role",
    description: "Update role privileges.\n\nArgs:\n    roleid: Role ID.\n    privs: Comma-separated list of privileges.\n    append: Append privileges instead of replacing.",
    module: "access",
    parameters: {
    "properties": {
        "append": {
            "default": false,
            "title": "Append",
            "type": "boolean"
        },
        "privs": {
            "title": "Privs",
            "type": "string"
        },
        "roleid": {
            "title": "Roleid",
            "type": "string"
        }
    },
    "required": [
        "roleid",
        "privs"
    ],
    "title": "update_roleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/access/roles/{roleid}";
    const paramMap: Record<string, string> = {"1": "append"};
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
    name: "delete_role",
    description: "Delete a role.\n\nArgs:\n    roleid: Role ID.",
    module: "access",
    parameters: {
    "properties": {
        "roleid": {
            "title": "Roleid",
            "type": "string"
        }
    },
    "required": [
        "roleid"
    ],
    "title": "delete_roleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/access/roles/{roleid}";
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
    name: "get_acl",
    description: "Get the full ACL (access control list) \u2014 shows all permission assignments.",
    module: "access",
    parameters: {
    "properties": {},
    "title": "get_aclArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/acl";
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
    name: "update_acl",
    description: "Add or remove ACL entries (permission assignments).\n\nArgs:\n    path: Object path (e.g. '/', '/vms/100', '/storage/local', '/pool/mypool').\n    roles: Comma-separated role list.\n    users: Comma-separated user list (format: 'user@realm').\n    groups: Comma-separated group list.\n    tokens: Comma-separated token list (format: 'user@realm!tokenid').\n    propagate: Propagate permissions to child objects.\n    delete: Remove the ACL entry instead of adding.",
    module: "access",
    parameters: {
    "properties": {
        "delete": {
            "default": false,
            "title": "Delete",
            "type": "boolean"
        },
        "groups": {
            "default": "",
            "title": "Groups",
            "type": "string"
        },
        "path": {
            "title": "Path",
            "type": "string"
        },
        "propagate": {
            "default": true,
            "title": "Propagate",
            "type": "boolean"
        },
        "roles": {
            "title": "Roles",
            "type": "string"
        },
        "tokens": {
            "default": "",
            "title": "Tokens",
            "type": "string"
        },
        "users": {
            "default": "",
            "title": "Users",
            "type": "string"
        }
    },
    "required": [
        "path",
        "roles"
    ],
    "title": "update_aclArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/access/acl";
    const paramMap: Record<string, string> = {"users": "users", "groups": "groups", "tokens": "tokens", "0": "propagate", "1": "delete"};
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
    name: "list_auth_domains",
    description: "List configured authentication realms/domains (PAM, PVE, LDAP, AD, OpenID).",
    module: "access",
    parameters: {
    "properties": {},
    "title": "list_auth_domainsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/domains";
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
    name: "get_auth_domain",
    description: "Get authentication domain configuration.\n\nArgs:\n    realm: Realm ID (e.g. 'pam', 'pve', 'my-ldap').",
    module: "access",
    parameters: {
    "properties": {
        "realm": {
            "title": "Realm",
            "type": "string"
        }
    },
    "required": [
        "realm"
    ],
    "title": "get_auth_domainArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/domains/{realm}";
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
    name: "sync_auth_domain",
    description: "Sync users/groups from an external auth domain (LDAP/AD).\n\nArgs:\n    realm: Realm ID to sync.\n    dry_run: Only show what would change.\n    full: Full sync (not just incremental).\n    enable_new: Enable newly synced users.\n    remove_vanished: Comma-separated: 'entry' (remove users), 'properties' (clear), 'acl' (remove ACLs).",
    module: "access",
    parameters: {
    "properties": {
        "dry_run": {
            "default": false,
            "title": "Dry Run",
            "type": "boolean"
        },
        "enable_new": {
            "default": true,
            "title": "Enable New",
            "type": "boolean"
        },
        "full": {
            "default": false,
            "title": "Full",
            "type": "boolean"
        },
        "realm": {
            "title": "Realm",
            "type": "string"
        },
        "remove_vanished": {
            "default": "",
            "title": "Remove Vanished",
            "type": "string"
        }
    },
    "required": [
        "realm"
    ],
    "title": "sync_auth_domainArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/access/domains/{realm}/sync";
    const paramMap: Record<string, string> = {"1": "full", "0": "enable-new", "remove_vanished": "remove-vanished"};
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
    name: "list_tfa",
    description: "List TFA (two-factor auth) entries.\n\nArgs:\n    userid: Filter by user ID (empty = all users).",
    module: "access",
    parameters: {
    "properties": {
        "userid": {
            "default": "",
            "title": "Userid",
            "type": "string"
        }
    },
    "title": "list_tfaArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/tfa/{userid}";
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
    name: "get_permissions",
    description: "Check effective permissions for a user on a given path.\n\nArgs:\n    userid: User to check (empty = current user).\n    path: Object path to check (empty = root).",
    module: "access",
    parameters: {
    "properties": {
        "path": {
            "default": "",
            "title": "Path",
            "type": "string"
        },
        "userid": {
            "default": "",
            "title": "Userid",
            "type": "string"
        }
    },
    "title": "get_permissionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/access/permissions";
    const paramMap: Record<string, string> = {"userid": "userid", "path": "path"};
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
    name: "change_password",
    description: "Change a user's password.\n\nArgs:\n    userid: User ID (format: 'user@realm').\n    password: New password.",
    module: "access",
    parameters: {
    "properties": {
        "password": {
            "title": "Password",
            "type": "string"
        },
        "userid": {
            "title": "Userid",
            "type": "string"
        }
    },
    "required": [
        "userid",
        "password"
    ],
    "title": "change_passwordArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/access/password";
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