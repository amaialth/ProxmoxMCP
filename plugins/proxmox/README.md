# Proxmox plugin

Manage a **Proxmox VE** cluster or homelab from Claude. The plugin connects the [Proxmox MCP server](https://github.com/amailath/ProxmoxMCP) (324 tools: nodes, VMs, containers, storage, networking, firewall, backups, HA, and Docker inside VMs) and adds four workflows:

| Skill | Say something like… | What it does |
|---|---|---|
| **proxmox-setup** | "Set up Proxmox", "the Proxmox tools aren't working" | Walks through the API token and permissions, verifies the connection, and reports what the token can do |
| **proxmox-health-check** | "Check my Proxmox", "is my homelab healthy?" | One-page report: nodes, storage %, VMs, failed tasks, backups, SMART, guest agents, Docker containers |
| **proxmox-troubleshoot** | "Why does my server shut down every night?", "why did VM 100 stop?" | Rebuilds the timeline from tasks and logs, separates clean shutdowns from crashes, and finds the root cause |
| **proxmox-safe-operations** | (used automatically when you ask for changes) | Confirms the target, snapshots before risky changes, prefers graceful actions, and verifies the result |

## Requirements

- **Node.js 20+** on the computer running Claude. The server is started with `npx @amailath/proxmox-mcp-server`.
- A Proxmox VE 7/8 server reachable from that computer on port 8006.
- A Proxmox **API token**. The **proxmox-setup** skill walks you through creating one.

## Configure

After installing, fill in the plugin settings:

| Setting | Example | Notes |
|---|---|---|
| Proxmox host | `192.168.1.21` | IP or hostname; `host:port` for a non-default port |
| API token ID | `root@pam!mcp` | As shown under Datacenter → Permissions → API Tokens |
| API token secret | `xxxxxxxx-…` | Stored securely |
| Verify TLS certificate | off | Leave off for Proxmox's default self-signed certificate |
| Read-only mode | off | On = only read tools are available |
| Tool modules | `qemu,nodes,cluster,guest-services` | Optional, for clients that limit tool counts |

In Claude Code: `/plugin` → **proxmox** → configure, or `claude plugin configure proxmox`.

**Clients without plugin settings:** put the same values in `~/.config/proxmox-mcp/.env`. The server reads that file for anything not set in the plugin:

```env
PROXMOX_HOST=192.168.1.21
PROXMOX_TOKEN_NAME=root@pam!mcp
PROXMOX_TOKEN_VALUE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PROXMOX_VERIFY_SSL=false
```

Restart or reload the client after changing settings, then say **"set up Proxmox"** to verify.

## Permissions

| You want to… | Give the token (on `/`) |
|---|---|
| Monitor and run health checks | `PVEAuditor` |
| Also start/stop/snapshot guests and use in-VM tools | `PVEVMAdmin` |
| Also manage storage, network, firewall, node services, timezone | `PVEAdmin` |

If the token has **Privilege Separation** on, give the same role to its user as well.

## Safety

Every tool is labelled read-only, additive or destructive, so Claude asks before anything risky, and the **proxmox-safe-operations** skill adds snapshot-first and verify-after habits. For monitoring-only use, turn on **Read-only mode**: write tools are then not even visible to Claude.

## Install

```text
/plugin marketplace add amailath/ProxmoxMCP
/plugin install proxmox@proxmox-mcp
```

Or install the `proxmox.plugin` file from the repository's releases.

MIT © Anbumani - CreativeStudio14.com
