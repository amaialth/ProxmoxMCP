import { getProxmoxClient, formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, vmAgentFileReadDecoded, vmAgentFileWriteEncoded, lxcExecSync } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

export const sdnTools: ProxmoxTool[] = [
  {
    name: "list_sdn_vnets",
    description: "List SDN virtual networks (VNets).",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "list_sdn_vnetsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/vnets";
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
    name: "get_sdn_vnet",
    description: "Get SDN VNet configuration.\n\nArgs:\n    vnet: VNet ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "vnet": {
            "title": "Vnet",
            "type": "string"
        }
    },
    "required": [
        "vnet"
    ],
    "title": "get_sdn_vnetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/vnets/{vnet}";
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
    name: "create_sdn_vnet",
    description: "Create an SDN VNet.\n\nArgs:\n    vnet: VNet ID.\n    zone: Zone ID.\n    tag: VLAN tag.\n    alias: Display alias.\n    vlanaware: Enable VLAN-aware bridge.",
    module: "sdn",
    parameters: {
    "properties": {
        "alias": {
            "default": "",
            "title": "Alias",
            "type": "string"
        },
        "tag": {
            "default": 0,
            "title": "Tag",
            "type": "integer"
        },
        "vlanaware": {
            "default": false,
            "title": "Vlanaware",
            "type": "boolean"
        },
        "vnet": {
            "title": "Vnet",
            "type": "string"
        },
        "zone": {
            "title": "Zone",
            "type": "string"
        }
    },
    "required": [
        "vnet",
        "zone"
    ],
    "title": "create_sdn_vnetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/sdn/vnets";
    const paramMap: Record<string, string> = {"tag": "tag", "alias": "alias", "1": "vlanaware"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "update_sdn_vnet",
    description: "Update an SDN VNet.\n\nArgs:\n    vnet: VNet ID.\n    zone: Zone ID.\n    tag: VLAN tag (-1 = don't change).\n    alias: Display alias.\n    delete: Comma-separated properties to delete.",
    module: "sdn",
    parameters: {
    "properties": {
        "alias": {
            "default": "",
            "title": "Alias",
            "type": "string"
        },
        "delete": {
            "default": "",
            "title": "Delete",
            "type": "string"
        },
        "tag": {
            "default": -1,
            "title": "Tag",
            "type": "integer"
        },
        "vnet": {
            "title": "Vnet",
            "type": "string"
        },
        "zone": {
            "default": "",
            "title": "Zone",
            "type": "string"
        }
    },
    "required": [
        "vnet"
    ],
    "title": "update_sdn_vnetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/sdn/vnets/{vnet}";
    const paramMap: Record<string, string> = {"zone": "zone", "tag": "tag", "alias": "alias", "delete": "delete"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "delete_sdn_vnet",
    description: "Delete an SDN VNet.\n\nArgs:\n    vnet: VNet ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "vnet": {
            "title": "Vnet",
            "type": "string"
        }
    },
    "required": [
        "vnet"
    ],
    "title": "delete_sdn_vnetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/sdn/vnets/{vnet}";
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
    name: "list_sdn_subnets",
    description: "List subnets for an SDN VNet.\n\nArgs:\n    vnet: VNet ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "vnet": {
            "title": "Vnet",
            "type": "string"
        }
    },
    "required": [
        "vnet"
    ],
    "title": "list_sdn_subnetsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/vnets/{vnet}/subnets";
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
    name: "create_sdn_subnet",
    description: "Create a subnet for an SDN VNet.\n\nArgs:\n    vnet: VNet ID.\n    subnet: Subnet CIDR (e.g. '10.0.0.0/24').\n    gateway: Gateway IP.\n    snat: Enable SNAT.\n    dnszoneprefix: DNS zone prefix.",
    module: "sdn",
    parameters: {
    "properties": {
        "dnszoneprefix": {
            "default": "",
            "title": "Dnszoneprefix",
            "type": "string"
        },
        "gateway": {
            "default": "",
            "title": "Gateway",
            "type": "string"
        },
        "snat": {
            "default": false,
            "title": "Snat",
            "type": "boolean"
        },
        "subnet": {
            "title": "Subnet",
            "type": "string"
        },
        "vnet": {
            "title": "Vnet",
            "type": "string"
        }
    },
    "required": [
        "vnet",
        "subnet"
    ],
    "title": "create_sdn_subnetArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/sdn/vnets/{vnet}/subnets";
    const paramMap: Record<string, string> = {"gateway": "gateway", "1": "snat", "dnszoneprefix": "dnszoneprefix"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "list_sdn_zones",
    description: "List SDN zones.",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "list_sdn_zonesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/zones";
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
    name: "get_sdn_zone",
    description: "Get SDN zone configuration.\n\nArgs:\n    zone: Zone ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "zone": {
            "title": "Zone",
            "type": "string"
        }
    },
    "required": [
        "zone"
    ],
    "title": "get_sdn_zoneArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/zones/{zone}";
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
    name: "create_sdn_zone",
    description: "Create an SDN zone.\n\nArgs:\n    zone: Zone ID.\n    type: Zone type: 'simple', 'vlan', 'qinq', 'vxlan', 'evpn'.\n    nodes: Comma-separated node list.\n    ipam: IPAM plugin name.\n    dns: DNS plugin name.\n    bridge: Bridge name.\n    mtu: MTU.",
    module: "sdn",
    parameters: {
    "properties": {
        "bridge": {
            "default": "",
            "title": "Bridge",
            "type": "string"
        },
        "dns": {
            "default": "",
            "title": "Dns",
            "type": "string"
        },
        "ipam": {
            "default": "",
            "title": "Ipam",
            "type": "string"
        },
        "mtu": {
            "default": 0,
            "title": "Mtu",
            "type": "integer"
        },
        "nodes": {
            "default": "",
            "title": "Nodes",
            "type": "string"
        },
        "type": {
            "title": "Type",
            "type": "string"
        },
        "zone": {
            "title": "Zone",
            "type": "string"
        }
    },
    "required": [
        "zone",
        "type"
    ],
    "title": "create_sdn_zoneArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "POST";
    let path = "/cluster/sdn/zones";
    const paramMap: Record<string, string> = {"mtu": "mtu"};
    const reqParams: Record<string, any> = {};

    for (const [k, v] of Object.entries(args)) {
      if (v === undefined || v === null) continue;
      const placeholder = `{${k}}`;
      if (path.includes(placeholder)) {
        path = path.replace(placeholder, encodeURIComponent(String(v)));
      } else {
        const apiKey = paramMap[k] || k;
        reqParams[apiKey] = v;
      }
    }
    const res = await client.request(method as any, path, reqParams);
    return formatResponse(res);
  }
  },
  {
    name: "delete_sdn_zone",
    description: "Delete an SDN zone.\n\nArgs:\n    zone: Zone ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "zone": {
            "title": "Zone",
            "type": "string"
        }
    },
    "required": [
        "zone"
    ],
    "title": "delete_sdn_zoneArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "DELETE";
    let path = "/cluster/sdn/zones/{zone}";
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
    name: "list_sdn_controllers",
    description: "List SDN controllers (e.g. EVPN controller).",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "list_sdn_controllersArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/controllers";
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
    name: "get_sdn_controller",
    description: "Get SDN controller configuration.\n\nArgs:\n    controller: Controller ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "controller": {
            "title": "Controller",
            "type": "string"
        }
    },
    "required": [
        "controller"
    ],
    "title": "get_sdn_controllerArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/controllers/{controller}";
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
    name: "list_sdn_ipams",
    description: "List IPAM (IP Address Management) plugins.",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "list_sdn_ipamsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/ipams";
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
    name: "get_sdn_ipam",
    description: "Get IPAM plugin configuration.\n\nArgs:\n    ipam: IPAM ID.",
    module: "sdn",
    parameters: {
    "properties": {
        "ipam": {
            "title": "Ipam",
            "type": "string"
        }
    },
    "required": [
        "ipam"
    ],
    "title": "get_sdn_ipamArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/ipams/{ipam}";
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
    name: "list_sdn_dns",
    description: "List SDN DNS plugins.",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "list_sdn_dnsArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "GET";
    let path = "/cluster/sdn/dns";
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
    name: "apply_sdn_changes",
    description: "Apply pending SDN configuration changes to all nodes.",
    module: "sdn",
    parameters: {
    "properties": {},
    "title": "apply_sdn_changesArguments",
    "type": "object"
},
    execute: async (args: Record<string, any>) => {
    const client = getProxmoxClient();
    const method = "PUT";
    let path = "/cluster/sdn";
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