import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const firewallTools: ProxmoxTool[] = [
  {
    name: "get_cluster_firewall_options",
    description: "Get cluster-wide firewall options (enable, policy_in, policy_out, etc.).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "get_cluster_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/options";
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
    name: "set_cluster_firewall_options",
    description: "Set cluster-wide firewall options.\n\nArgs:\n    enable: 1 to enable, 0 to disable, -1 to not change.\n    policy_in: Default input policy: 'ACCEPT', 'REJECT', 'DROP'.\n    policy_out: Default output policy: 'ACCEPT', 'REJECT', 'DROP'.\n    log_ratelimit: Log rate limit (e.g. 'enable=1,rate=1/second,burst=5').\n    ebtables: 1 to enable ebtables rules, 0 to disable, -1 to not change.\n    delete: Comma-separated options to delete.",
    module: "firewall",
    parameters: {
    "properties": {
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "ebtables": {
            "default": -1,
            "title": "Ebtables",
            "type": "integer"
        },
        "enable": {
            "default": -1,
            "title": "Enable",
            "type": "integer"
        },
        "log_ratelimit": {
            "default": "",
            "title": "Log Ratelimit",
            "type": "string"
        },
        "policy_in": {
            "default": "",
            "title": "Policy In",
            "type": "string"
        },
        "policy_out": {
            "default": "",
            "title": "Policy Out",
            "type": "string"
        }
    },
    "title": "set_cluster_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/firewall/options";
    const paramMap: Record<string, string> = {"enable": "enable", "policy_in": "policy_in", "policy_out": "policy_out", "log_ratelimit": "log_ratelimit", "ebtables": "ebtables", "delete": "delete"};
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
    name: "list_cluster_firewall_rules",
    description: "List cluster-level firewall rules.",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "list_cluster_firewall_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/rules";
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
    name: "get_cluster_firewall_rule",
    description: "Get a specific cluster firewall rule.\n\nArgs:\n    pos: Rule position number.",
    module: "firewall",
    parameters: {
    "properties": {
        "pos": {
            "title": "Pos",
            "type": "integer"
        }
    },
    "required": [
        "pos"
    ],
    "title": "get_cluster_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/rules/{pos}";
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
    name: "create_cluster_firewall_rule",
    description: "Create a cluster-level firewall rule.\n\nArgs:\n    action: 'ACCEPT', 'DROP', 'REJECT'.\n    type: 'in', 'out', 'group'.\n    enable: 1 = enabled, 0 = disabled.\n    source: Source address/range (CIDR or alias).\n    dest: Destination address/range.\n    proto: Protocol (tcp, udp, icmp, etc.).\n    sport: Source port(s).\n    dport: Destination port(s).\n    iface: Network interface.\n    macro: Use predefined macro (e.g. 'SSH', 'HTTP', 'HTTPS', 'Ping').\n    comment: Description.\n    log: Log level: 'emerg', 'alert', 'crit', 'err', 'warning', 'notice', 'info', 'debug', 'nolog'.\n    pos: Rule position (-1 = append).",
    module: "firewall",
    parameters: {
    "properties": {
        "action": {
            "title": "Action",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "dest": {
            "default": "",
            "title": "Dest",
            "type": "string"
        },
        "dport": {
            "default": "",
            "title": "Dport",
            "type": "string"
        },
        "enable": {
            "default": 1,
            "title": "Enable",
            "type": "integer"
        },
        "iface": {
            "default": "",
            "title": "Iface",
            "type": "string"
        },
        "log": {
            "default": "",
            "title": "Log",
            "type": "string"
        },
        "macro": {
            "default": "",
            "title": "Macro",
            "type": "string"
        },
        "pos": {
            "default": -1,
            "title": "Pos",
            "type": "integer"
        },
        "proto": {
            "default": "",
            "title": "Proto",
            "type": "string"
        },
        "source": {
            "default": "",
            "title": "Source",
            "type": "string"
        },
        "sport": {
            "default": "",
            "title": "Sport",
            "type": "string"
        },
        "type": {
            "title": "Type",
            "type": "string"
        }
    },
    "required": [
        "action",
        "type"
    ],
    "title": "create_cluster_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/rules";
    const paramMap: Record<string, string> = {"pos": "pos"};
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
    name: "update_cluster_firewall_rule",
    description: "Update a cluster-level firewall rule.\n\nArgs:\n    pos: Rule position to update.\n    action: 'ACCEPT', 'DROP', 'REJECT'.\n    enable: 1 = enabled, 0 = disabled, -1 = don't change.\n    source: Source address/range.\n    dest: Destination address/range.\n    proto: Protocol.\n    sport: Source port(s).\n    dport: Destination port(s).\n    macro: Predefined macro.\n    comment: Description.\n    moveto: Move rule to this position.\n    delete: Comma-separated properties to delete.",
    module: "firewall",
    parameters: {
    "properties": {
        "action": {
            "default": "",
            "title": "Action",
            "type": "string"
        },
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
        "dest": {
            "default": "",
            "title": "Dest",
            "type": "string"
        },
        "dport": {
            "default": "",
            "title": "Dport",
            "type": "string"
        },
        "enable": {
            "default": -1,
            "title": "Enable",
            "type": "integer"
        },
        "macro": {
            "default": "",
            "title": "Macro",
            "type": "string"
        },
        "moveto": {
            "default": -1,
            "title": "Moveto",
            "type": "integer"
        },
        "pos": {
            "title": "Pos",
            "type": "integer"
        },
        "proto": {
            "default": "",
            "title": "Proto",
            "type": "string"
        },
        "source": {
            "default": "",
            "title": "Source",
            "type": "string"
        },
        "sport": {
            "default": "",
            "title": "Sport",
            "type": "string"
        }
    },
    "required": [
        "pos"
    ],
    "title": "update_cluster_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/firewall/rules/{pos}";
    const paramMap: Record<string, string> = {"action": "action", "enable": "enable", "moveto": "moveto"};
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
    name: "delete_cluster_firewall_rule",
    description: "Delete a cluster-level firewall rule.\n\nArgs:\n    pos: Rule position to delete.",
    module: "firewall",
    parameters: {
    "properties": {
        "pos": {
            "title": "Pos",
            "type": "integer"
        }
    },
    "required": [
        "pos"
    ],
    "title": "delete_cluster_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/firewall/rules/{pos}";
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
    name: "list_firewall_groups",
    description: "List firewall security groups (reusable sets of rules).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "list_firewall_groupsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/groups";
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
    name: "get_firewall_group_rules",
    description: "List rules in a firewall security group.\n\nArgs:\n    group: Security group name.",
    module: "firewall",
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
    "title": "get_firewall_group_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/groups/{group}";
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
    name: "create_firewall_group",
    description: "Create a new firewall security group.\n\nArgs:\n    group: Group name.\n    comment: Description.",
    module: "firewall",
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
        }
    },
    "required": [
        "group"
    ],
    "title": "create_firewall_groupArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/groups";
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
    name: "create_firewall_group_rule",
    description: "Add a rule to a firewall security group.\n\nArgs:\n    group: Security group name.\n    action: 'ACCEPT', 'DROP', 'REJECT'.\n    type: 'in', 'out'.\n    enable: 1 = enabled, 0 = disabled.\n    source: Source address/range.\n    dest: Destination address/range.\n    proto: Protocol.\n    sport: Source port(s).\n    dport: Destination port(s).\n    macro: Predefined macro.\n    comment: Description.",
    module: "firewall",
    parameters: {
    "properties": {
        "action": {
            "title": "Action",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "dest": {
            "default": "",
            "title": "Dest",
            "type": "string"
        },
        "dport": {
            "default": "",
            "title": "Dport",
            "type": "string"
        },
        "enable": {
            "default": 1,
            "title": "Enable",
            "type": "integer"
        },
        "group": {
            "title": "Group",
            "type": "string"
        },
        "macro": {
            "default": "",
            "title": "Macro",
            "type": "string"
        },
        "proto": {
            "default": "",
            "title": "Proto",
            "type": "string"
        },
        "source": {
            "default": "",
            "title": "Source",
            "type": "string"
        },
        "sport": {
            "default": "",
            "title": "Sport",
            "type": "string"
        },
        "type": {
            "title": "Type",
            "type": "string"
        }
    },
    "required": [
        "group",
        "action",
        "type"
    ],
    "title": "create_firewall_group_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/groups/{group}";
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
    name: "list_firewall_aliases",
    description: "List cluster firewall aliases (named IP addresses/ranges).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "list_firewall_aliasesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/aliases";
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
    name: "create_firewall_alias",
    description: "Create a firewall alias (named IP address or CIDR).\n\nArgs:\n    name: Alias name.\n    cidr: IP address or CIDR (e.g. '10.0.0.0/24' or '192.168.1.1').\n    comment: Description.",
    module: "firewall",
    parameters: {
    "properties": {
        "cidr": {
            "title": "Cidr",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        }
    },
    "required": [
        "name",
        "cidr"
    ],
    "title": "create_firewall_aliasArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/aliases";
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
    name: "delete_firewall_alias",
    description: "Delete a firewall alias.\n\nArgs:\n    name: Alias name.",
    module: "firewall",
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
    "title": "delete_firewall_aliasArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/firewall/aliases/{name}";
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
    name: "list_firewall_ipsets",
    description: "List cluster firewall IP sets (named groups of IPs).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "list_firewall_ipsetsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/ipset";
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
    name: "create_firewall_ipset",
    description: "Create a new firewall IP set.\n\nArgs:\n    name: IP set name.\n    comment: Description.",
    module: "firewall",
    parameters: {
    "properties": {
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        }
    },
    "required": [
        "name"
    ],
    "title": "create_firewall_ipsetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/ipset";
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
    name: "list_firewall_ipset_entries",
    description: "List entries in a firewall IP set.\n\nArgs:\n    name: IP set name.",
    module: "firewall",
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
    "title": "list_firewall_ipset_entriesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/ipset/{name}";
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
    name: "add_firewall_ipset_entry",
    description: "Add an IP/CIDR to an IP set.\n\nArgs:\n    name: IP set name.\n    cidr: IP address or CIDR.\n    comment: Description.\n    nomatch: Exclude this entry (nomatch).",
    module: "firewall",
    parameters: {
    "properties": {
        "cidr": {
            "title": "Cidr",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        },
        "nomatch": {
            "default": false,
            "title": "Nomatch",
            "type": "boolean"
        }
    },
    "required": [
        "name",
        "cidr"
    ],
    "title": "add_firewall_ipset_entryArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/firewall/ipset/{name}";
    const paramMap: Record<string, string> = {"comment": "comment", "1": "nomatch"};
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
    name: "delete_firewall_ipset_entry",
    description: "Remove an IP/CIDR from an IP set.\n\nArgs:\n    name: IP set name.\n    cidr: IP address or CIDR to remove.",
    module: "firewall",
    parameters: {
    "properties": {
        "cidr": {
            "title": "Cidr",
            "type": "string"
        },
        "name": {
            "title": "Name",
            "type": "string"
        }
    },
    "required": [
        "name",
        "cidr"
    ],
    "title": "delete_firewall_ipset_entryArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/firewall/ipset/{name}/{cidr}";
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
    name: "list_firewall_macros",
    description: "List available firewall macros (predefined rule sets like SSH, HTTP, etc.).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "list_firewall_macrosArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/macros";
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
    name: "get_firewall_refs",
    description: "Get available firewall references (aliases, ipsets, names usable in rules).",
    module: "firewall",
    parameters: {
    "properties": {},
    "title": "get_firewall_refsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/firewall/refs";
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
    name: "get_node_firewall_options",
    description: "Get firewall options for a specific node.\n\nArgs:\n    node: The node name.",
    module: "firewall",
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
    "title": "get_node_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/firewall/options";
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
    name: "set_node_firewall_options",
    description: "Set firewall options for a node.\n\nArgs:\n    node: The node name.\n    enable: 1 = enable, 0 = disable, -1 = don't change.\n    log_level_in: Input log level.\n    log_level_out: Output log level.\n    ndp: 1 = enable NDP, 0 = disable, -1 = don't change.\n    nf_conntrack_max: Max conntrack entries (0 = don't change).\n    delete: Comma-separated options to delete.",
    module: "firewall",
    parameters: {
    "properties": {
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "enable": {
            "default": -1,
            "title": "Enable",
            "type": "integer"
        },
        "log_level_in": {
            "default": "",
            "title": "Log Level In",
            "type": "string"
        },
        "log_level_out": {
            "default": "",
            "title": "Log Level Out",
            "type": "string"
        },
        "ndp": {
            "default": -1,
            "title": "Ndp",
            "type": "integer"
        },
        "nf_conntrack_max": {
            "default": 0,
            "title": "Nf Conntrack Max",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        }
    },
    "required": [
        "node"
    ],
    "title": "set_node_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/firewall/options";
    const paramMap: Record<string, string> = {"enable": "enable", "log_level_in": "log_level_in", "log_level_out": "log_level_out", "ndp": "ndp", "nf_conntrack_max": "nf_conntrack_max", "delete": "delete"};
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
    name: "list_node_firewall_rules",
    description: "List firewall rules for a node.\n\nArgs:\n    node: The node name.",
    module: "firewall",
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
    "title": "list_node_firewall_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/firewall/rules";
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
    name: "get_node_firewall_log",
    description: "Get firewall log for a node.\n\nArgs:\n    node: The node name.\n    limit: Max entries.",
    module: "firewall",
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
        }
    },
    "required": [
        "node"
    ],
    "title": "get_node_firewall_logArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/firewall/log";
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
    name: "get_vm_firewall_options",
    description: "Get firewall options for a QEMU VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "firewall",
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
    "title": "get_vm_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/firewall/options";
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
    name: "set_vm_firewall_options",
    description: "Set firewall options for a QEMU VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    enable: 1 = enable, 0 = disable.\n    dhcp: 1 = enable DHCP.\n    ipfilter: 1 = enable IP filter.\n    macfilter: 1 = enable MAC filter.\n    policy_in: Input policy.\n    policy_out: Output policy.\n    delete: Comma-separated options to delete.",
    module: "firewall",
    parameters: {
    "properties": {
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "dhcp": {
            "default": -1,
            "title": "Dhcp",
            "type": "integer"
        },
        "enable": {
            "default": -1,
            "title": "Enable",
            "type": "integer"
        },
        "ipfilter": {
            "default": -1,
            "title": "Ipfilter",
            "type": "integer"
        },
        "macfilter": {
            "default": -1,
            "title": "Macfilter",
            "type": "integer"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "policy_in": {
            "default": "",
            "title": "Policy In",
            "type": "string"
        },
        "policy_out": {
            "default": "",
            "title": "Policy Out",
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
    "title": "set_vm_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/nodes/{node}/qemu/{vmid}/firewall/options";
    const paramMap: Record<string, string> = {"enable": "enable", "dhcp": "dhcp", "ipfilter": "ipfilter", "macfilter": "macfilter", "policy_in": "policy_in", "policy_out": "policy_out", "delete": "delete"};
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
    name: "list_vm_firewall_rules",
    description: "List firewall rules for a QEMU VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.",
    module: "firewall",
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
    "title": "list_vm_firewall_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/qemu/{vmid}/firewall/rules";
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
    name: "create_vm_firewall_rule",
    description: "Create a firewall rule for a QEMU VM.\n\nArgs:\n    node: The node name.\n    vmid: The VM ID.\n    action: 'ACCEPT', 'DROP', 'REJECT'.\n    type: 'in', 'out', 'group'.\n    enable: 1 = enabled, 0 = disabled.\n    source: Source CIDR or alias.\n    dest: Destination CIDR or alias.\n    proto: Protocol.\n    dport: Destination port(s).\n    macro: Predefined macro.\n    comment: Description.",
    module: "firewall",
    parameters: {
    "properties": {
        "action": {
            "title": "Action",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "dest": {
            "default": "",
            "title": "Dest",
            "type": "string"
        },
        "dport": {
            "default": "",
            "title": "Dport",
            "type": "string"
        },
        "enable": {
            "default": 1,
            "title": "Enable",
            "type": "integer"
        },
        "macro": {
            "default": "",
            "title": "Macro",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "proto": {
            "default": "",
            "title": "Proto",
            "type": "string"
        },
        "source": {
            "default": "",
            "title": "Source",
            "type": "string"
        },
        "type": {
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
        "vmid",
        "action",
        "type"
    ],
    "title": "create_vm_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/qemu/{vmid}/firewall/rules";
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
    name: "get_container_firewall_options",
    description: "Get firewall options for an LXC container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "firewall",
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
    "title": "get_container_firewall_optionsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/firewall/options";
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
    name: "list_container_firewall_rules",
    description: "List firewall rules for an LXC container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.",
    module: "firewall",
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
    "title": "list_container_firewall_rulesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/nodes/{node}/lxc/{vmid}/firewall/rules";
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
    name: "create_container_firewall_rule",
    description: "Create a firewall rule for an LXC container.\n\nArgs:\n    node: The node name.\n    vmid: The container ID.\n    action: 'ACCEPT', 'DROP', 'REJECT'.\n    type: 'in', 'out', 'group'.\n    enable: 1 = enabled, 0 = disabled.\n    source: Source CIDR or alias.\n    dest: Destination CIDR or alias.\n    proto: Protocol.\n    dport: Destination port(s).\n    macro: Predefined macro.\n    comment: Description.",
    module: "firewall",
    parameters: {
    "properties": {
        "action": {
            "title": "Action",
            "type": "string"
        },
        "comment": {
            "default": "",
            "title": "Comment",
            "type": "string"
        },
        "dest": {
            "default": "",
            "title": "Dest",
            "type": "string"
        },
        "dport": {
            "default": "",
            "title": "Dport",
            "type": "string"
        },
        "enable": {
            "default": 1,
            "title": "Enable",
            "type": "integer"
        },
        "macro": {
            "default": "",
            "title": "Macro",
            "type": "string"
        },
        "node": {
            "title": "Node",
            "type": "string"
        },
        "proto": {
            "default": "",
            "title": "Proto",
            "type": "string"
        },
        "source": {
            "default": "",
            "title": "Source",
            "type": "string"
        },
        "type": {
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
        "vmid",
        "action",
        "type"
    ],
    "title": "create_container_firewall_ruleArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/nodes/{node}/lxc/{vmid}/firewall/rules";
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