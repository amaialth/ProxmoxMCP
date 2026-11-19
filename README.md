# Proxmox VE MCP Server

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge" alt="v2.0.0">
  <img src="https://img.shields.io/badge/tools-324-orange?style=for-the-badge" alt="324 tools">
  <img src="https://img.shields.io/badge/runtime-Bun%20%7C%20Node%2020%2B-black?style=for-the-badge" alt="Bun or Node 20+">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge" alt="MIT">
</p>

A **Model Context Protocol (MCP)** server for **Proxmox VE**, written in TypeScript. It exposes **324 tools** that let an AI assistant (Claude, Cursor, Copilot, Codex, Gemini and others) inspect and manage your Proxmox nodes, VMs, containers, storage, networking, firewall, backups and HA, and run commands and Docker inside VMs through the QEMU guest agent.

Every tool is labelled **read-only**, **write** or **destructive** (MCP tool annotations), so clients can auto-approve safe lookups and always ask before anything risky.

- 🚀 **[Getting Started guide](./docs/GETTING_STARTED.md)**: install, API token, first run
- 🛠️ **[Tools reference](./docs/TOOLS_REFERENCE.md)**: every tool with its parameters and safety label
- 🧩 **[Claude plugin](./plugins/proxmox/README.md)**: one-click install with guided setup, health check, troubleshooting and safe-change skills
- 📝 **[Changelog](./CHANGELOG.md)**: what changed in v2.0.0

---

## Contents

1. [Requirements](#requirements)
2. [Install](#install)
3. [Configuration (environment variables)](#configuration)
4. [Create a Proxmox API token & permissions](#create-a-proxmox-api-token--permissions)
5. [Connect it to your AI client](#connect-it-to-your-ai-client)
   - [Claude plugin (easiest)](#claude-plugin-easiest)
   - [Claude Desktop / Claude app](#claude-desktop--claude-app)
   - [Claude Code (CLI)](#claude-code-cli)
   - [Cursor](#cursor)
   - [VS Code (GitHub Copilot)](#vs-code-github-copilot)
   - [GitHub Copilot CLI](#github-copilot-cli)
   - [Windsurf](#windsurf)
   - [Google Antigravity](#google-antigravity)
   - [Gemini CLI](#gemini-cli)
   - [OpenAI Codex CLI](#openai-codex-cli)
   - [Cline / Roo Code](#cline--roo-code)
   - [Zed](#zed)
   - [Any other client (HTTP mode)](#any-other-client-http-mode)
6. [Verify it works](#verify-it-works)
7. [Tool catalogue](#tool-catalogue)
8. [Running commands inside guests](#running-commands-inside-guests)
9. [Security](#security)
10. [Troubleshooting](#troubleshooting)
11. [Known limitations](#known-limitations)
12. [Development](#development)

---

## Requirements

| | |
|---|---|
| **Runtime** | **Bun** 1.1+ (`curl -fsSL https://bun.sh/install \| bash`) or **Node.js** 20+. HTTP mode needs Bun; stdio mode, which every desktop/CLI client uses, runs on either. |
| **Proxmox VE** | 7.x or 8.x, reachable over HTTPS (default port **8006**) from the machine running the server |
| **Credentials** | An API token (recommended) or a username + password |
| **For guest tools** | `qemu-guest-agent` installed and running in the VM, and **Options → QEMU Guest Agent** enabled |

---

## Install

**Option A: from source (recommended while developing)**

```bash
git clone https://github.com/amailath/ProxmoxMCP.git
cd ProxmoxMCP
bun install
```

**Option B: from npm.** Clients can launch the published package directly, with no clone:

```bash
npx -y @amailath/proxmox-mcp-server --stdio     # Node 20+
bunx @amailath/proxmox-mcp-server --stdio       # Bun
```

In any client config below, you can replace `"command": "/ABS/PATH/TO/bun", "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"]` with `"command": "npx", "args": ["-y", "@amailath/proxmox-mcp-server", "--stdio"]`. Use the absolute path to `npx` (`which npx`) for desktop apps.

Note the **absolute paths** you'll need for the client configuration:

```bash
which bun   # e.g. /Users/you/.bun/bin/bun
pwd         # e.g. /Users/you/Projects/ProxmoxMCP
```

> **Why absolute paths?** Desktop apps (Claude Desktop, Cursor, VS Code, Windsurf…) don't load your shell's `PATH`, so a bare `bun` usually fails with `spawn bun ENOENT`.

Throughout this README, replace:
- `/ABS/PATH/TO/bun` with the output of `which bun`
- `/ABS/PATH/TO/ProxmoxMCP` with the folder you cloned into

---

## Configuration

All settings are environment variables. Set them in the client's `env` block (shown below for every client), or in a config file. Real environment variables always win; anything unset (or left as an unexpanded `${...}` placeholder) is filled from the first file found:

1. the file named by `PROXMOX_MCP_ENV_FILE`
2. `.env` in the current directory
3. `~/.config/proxmox-mcp/.env` (or `$XDG_CONFIG_HOME/proxmox-mcp/.env`)
4. `~/.proxmox-mcp.env`

A config file in your home folder works with **every** client and keeps the token secret out of client configs. Protect it with `chmod 600`.

| Variable | Default | Description |
|---|---|---|
| `PROXMOX_HOST` | — **(required)** | Hostname or IP, e.g. `192.168.1.21` or `pve.lan`. A pasted URL such as `https://192.168.1.21:8006/` is also accepted: the scheme, port and path are stripped (with a warning on stderr). |
| `PROXMOX_PORT` | `8006` | Proxmox API port. |
| `PROXMOX_USER` | `root@pam` | User in `user@realm` form. With tokens, this is the user that **owns** the token. |
| `PROXMOX_TOKEN_NAME` | — | The token ID: either the full form shown in the Proxmox UI, `root@pam!mcp` (user part overrides `PROXMOX_USER`), or just `mcp` together with `PROXMOX_USER`. |
| `PROXMOX_TOKEN_VALUE` | — | The token secret (UUID). |
| `PROXMOX_PASSWORD` | — | Password auth, used only when no token is set. Tickets are renewed automatically. |
| `PROXMOX_VERIFY_SSL` | `false` | Set `true` only if Proxmox has a trusted certificate. Leave `false` for the default self-signed certificate (works on Bun and Node). |
| `PROXMOX_READ_ONLY` | `false` | `true` **hides** every tool that needs write access and blocks any non-GET API call as a second safety net. |
| `PROXMOX_MODULES` | all | Comma-separated list of modules to expose, e.g. `qemu,nodes,cluster,guest-services`. Use it for clients that cap the number of tools. Modules: `access`, `backup`, `cluster`, `firewall`, `ha`, `lxc`, `nodes`, `pools`, `qemu`, `sdn`, `storage`, `guest-services`. |
| `PROXMOX_TIMEOUT` | `30000` | API request timeout in milliseconds. |
| `PROXMOX_STDIO` | `false` | `true` runs the server over stdio (same as the `--stdio` flag). **Every desktop/CLI client below needs stdio.** |
| `PORT` / `HOST` | `3000` / `127.0.0.1` | Listen address for HTTP mode only. |
| `PROXMOX_MCP_AUTH_TOKEN` | — | HTTP mode only: bearer token clients must send (`Authorization: Bearer …`). **Required** to listen on anything other than localhost. |
| `PROXMOX_MCP_ALLOW_UNAUTHENTICATED` | `false` | HTTP mode only: allow a non-localhost `HOST` without a token. Not recommended. |
| `PROXMOX_MCP_ENV_FILE` | — | Path to an extra config file, checked before the default locations. |

Example of a correct set of values:

```env
PROXMOX_HOST=192.168.1.21
PROXMOX_PORT=8006
PROXMOX_USER=root@pam
PROXMOX_TOKEN_NAME=mcp
PROXMOX_TOKEN_VALUE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PROXMOX_VERIFY_SSL=false
PROXMOX_READ_ONLY=false
```

---

## Create a Proxmox API token & permissions

1. In the Proxmox web UI go to **Datacenter → Permissions → API Tokens → Add**.
2. **User:** `root@pam` (or a dedicated user such as `mcp@pve`). **Token ID:** `mcp`.
3. Copy the **Secret** right away (it's shown only once) and set it as `PROXMOX_TOKEN_VALUE`.
4. Grant permissions under **Datacenter → Permissions → Add**, on path **`/`** with **Propagate** ticked.

### ⚠️ Privilege Separation

If **Privilege Separation** is ticked on the token (the default), the token gets only the permissions that **both** the user and the token have. You must add the role **twice**: once as a **User Permission** for the user, and once as an **API Token Permission** for the token. Or untick Privilege Separation so the token simply inherits the user's rights.

### Which role?

| Use | Role on `/` | What works |
|---|---|---|
| Read-only monitoring | `PVEAuditor` | Status, resources, cluster status, node stats, tasks, logs, configs |
| Day-to-day VM operations | `PVEVMAdmin` + `PVEAuditor` | Plus start/stop/snapshot/configure guests and guest-agent exec |
| Full management | `PVEAdmin` or `Administrator` | Plus storage, network, firewall, users, **node services and timezone** (`Sys.Modify`) |
| Host power (`node_power`) | `Administrator` | Reboot or shut down a node (`Sys.PowerMgmt`) |

Common permission errors map to roles like this:

| Error | Missing privilege | Fix |
|---|---|---|
| `Permission check failed (/, Sys.Audit)` | `Sys.Audit` | Add `PVEAuditor` on `/` (see Privilege Separation above) |
| `Permission check failed (/nodes/<node>, Sys.Modify)` | `Sys.Modify` | Needed for `manage_node_service` and `set_node_time`; add `PVEAdmin`, or accept it as read-only |
| `Permission check failed (/vms/<id>, VM.Monitor)` | `VM.Monitor` | Needed for guest-agent tools; add `PVEVMAdmin` |

---

## Connect it to your AI client

Every client launches the same command:

```
/ABS/PATH/TO/bun run /ABS/PATH/TO/ProxmoxMCP/src/index.ts --stdio
```

…with the environment variables from [Configuration](#configuration). **Don't forget `--stdio`**: without it the server starts in HTTP mode and the client hangs or times out.

After editing any config, **fully quit and reopen the client** (or reload its MCP servers) so it starts the server with the new settings.

### Claude plugin (easiest)

For Claude Code and other Claude apps that support plugins, install the bundled **proxmox** plugin. It starts the server with `npx` (Node 20+ required), asks for your host and token in its settings, and adds four skills: guided setup, health check, outage troubleshooting and safe-change rules.

```text
/plugin marketplace add amailath/ProxmoxMCP
/plugin install proxmox@proxmox-mcp
```

Then fill in the settings (`/plugin` → proxmox → configure, or `claude plugin configure proxmox`) and say **"set up Proxmox"**. See the [plugin README](./plugins/proxmox/README.md) for details. If your client doesn't offer plugin settings, put the values in `~/.config/proxmox-mcp/.env` instead.

### Claude Desktop / Claude app

Edit `claude_desktop_config.json`:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Or open it from **Settings → Developer → Edit Config**.

```json
{
  "mcpServers": {
    "proxmox-local": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_PORT": "8006",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

> **Using Claude from the web or your phone?** A server configured in Claude Desktop is also available to Claude sessions **linked to that computer**. The Desktop app must be open and the computer awake, and the Proxmox host must be reachable from that computer.

### Claude Code (CLI)

```bash
claude mcp add proxmox --scope user \
  -e PROXMOX_HOST=192.168.1.21 \
  -e PROXMOX_USER=root@pam \
  -e PROXMOX_TOKEN_NAME=mcp \
  -e PROXMOX_TOKEN_VALUE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
  -e PROXMOX_VERIFY_SSL=false \
  -- /ABS/PATH/TO/bun run /ABS/PATH/TO/ProxmoxMCP/src/index.ts --stdio
```

Check it with `claude mcp list`, or `/mcp` inside a session. Use `--scope project` to write it to a shareable `.mcp.json` in your repo instead; in that case don't commit the token, but reference `${PROXMOX_TOKEN_VALUE}` from your environment.

### Cursor

`~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per project):

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

Then enable it under **Cursor Settings → MCP**. Cursor limits how many tools it sends to the model, so with 324 tools, switch off the ones you don't need in that panel, or set `PROXMOX_MODULES` (see [Too many tools?](#too-many-tools-for-your-client)).

### VS Code (GitHub Copilot)

`.vscode/mcp.json` in your workspace, or run **MCP: Open User Configuration** from the Command Palette. VS Code uses `servers`, not `mcpServers`, and supports a secret prompt:

```json
{
  "inputs": [
    { "id": "pveToken", "type": "promptString", "description": "Proxmox API token secret", "password": true }
  ],
  "servers": {
    "proxmox": {
      "type": "stdio",
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "${input:pveToken}",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

Start it from the **Start** code-lens above the entry, then pick tools in Copilot Chat **Agent** mode. VS Code also caps tools per request, so deselect the groups you don't use, or set `PROXMOX_MODULES`.

### GitHub Copilot CLI

`~/.copilot/mcp-config.json` (or add it interactively with `/mcp add`):

```json
{
  "mcpServers": {
    "proxmox": {
      "type": "local",
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      },
      "tools": ["*"]
    }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json`, or **Windsurf Settings → Cascade → MCP Servers → View raw config**:

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

Windsurf caps the total number of enabled tools, so toggle off the groups you don't need, or set `PROXMOX_MODULES`.

### Google Antigravity

In the Agent panel open **⋯ → MCP Servers → Manage MCP Servers → View raw config**, and add the same block to `mcp_config.json`:

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

### Gemini CLI

`~/.gemini/settings.json` (global) or `.gemini/settings.json` (per project):

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "$PROXMOX_TOKEN_VALUE",
        "PROXMOX_VERIFY_SSL": "false"
      },
      "timeout": 60000
    }
  }
}
```

Gemini CLI expands `$VARS` from your shell, so the secret can stay out of the file. Check it with `/mcp` inside the CLI.

### OpenAI Codex CLI

`~/.codex/config.toml`:

```toml
[mcp_servers.proxmox]
command = "/ABS/PATH/TO/bun"
args = ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"]
startup_timeout_sec = 20
tool_timeout_sec = 120

[mcp_servers.proxmox.env]
PROXMOX_HOST = "192.168.1.21"
PROXMOX_USER = "root@pam"
PROXMOX_TOKEN_NAME = "mcp"
PROXMOX_TOKEN_VALUE = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
PROXMOX_VERIFY_SSL = "false"
```

Or use `codex mcp add proxmox --env PROXMOX_HOST=… -- /ABS/PATH/TO/bun run /ABS/PATH/TO/ProxmoxMCP/src/index.ts --stdio`.

### Cline / Roo Code

Open the extension's **MCP Servers → Configure** (edits `cline_mcp_settings.json` or `mcp_settings.json`):

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

Put read-only tools such as `list_vms` or `get_cluster_resources` in `alwaysAllow` to skip approval prompts for them. The 🟢 tools in the [tools reference](./docs/TOOLS_REFERENCE.md) are safe candidates.

### Zed

In Zed's `settings.json`:

```json
{
  "context_servers": {
    "proxmox": {
      "source": "custom",
      "command": "/ABS/PATH/TO/bun",
      "args": ["run", "/ABS/PATH/TO/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

### Any other client (HTTP mode)

Any client that accepts a stdio `command` + `args` + `env` works with the blocks above. For remote use, or for clients that only speak HTTP, run the server in HTTP mode (**Bun required**). It serves the standard **MCP Streamable HTTP** transport at `/mcp`:

```bash
cd /ABS/PATH/TO/ProxmoxMCP
PROXMOX_MCP_AUTH_TOKEN=$(openssl rand -hex 32) HOST=0.0.0.0 PORT=3000 bun start
```

Then point the client at `http://<server>:3000/mcp` with the header `Authorization: Bearer <token>`. For example, in Claude Code:

```bash
claude mcp add --transport http proxmox http://<server>:3000/mcp --header "Authorization: Bearer <token>"
```

Or in Cursor, VS Code, Windsurf and others that accept a URL:

```json
{ "mcpServers": { "proxmox": { "url": "http://<server>:3000/mcp", "headers": { "Authorization": "Bearer <token>" } } } }
```

(VS Code uses `"servers"` and `"type": "http"`.)

| Endpoint | Auth | Purpose |
|---|:---:|---|
| `POST /mcp` | 🔒 | MCP Streamable HTTP (stateless, JSON responses) |
| `GET /` | — | Server info (version, tool count) |
| `GET /health` | 🔒 | Checks the Proxmox connection and shows config warnings |
| `GET /metrics` | 🔒 | Process metrics |
| `GET /api/tools`, `GET /api/tools/:name` | 🔒 | Tool schemas with safety annotations |
| `POST /api/tools/:name/execute` | 🔒 | Run a tool with a JSON body of arguments (simple REST for scripts) |

🔒 = requires `Authorization: Bearer <PROXMOX_MCP_AUTH_TOKEN>` (or `X-API-Key`) when a token is set.

> **Safety:** HTTP mode listens on `127.0.0.1` by default. It refuses to bind to any other address unless `PROXMOX_MCP_AUTH_TOKEN` is set. Put it behind HTTPS (a reverse proxy or Cloudflare Tunnel) before exposing it beyond your LAN.

---

## Verify it works

1. **Network:** from the same computer, open `https://<PROXMOX_HOST>:8006` in a browser. The Proxmox login page should load.
2. **Server starts:** run the exact command from your config in a terminal, with the same env vars:
   ```bash
   PROXMOX_HOST=192.168.1.21 PROXMOX_TOKEN_NAME=mcp PROXMOX_TOKEN_VALUE=… \
     /ABS/PATH/TO/bun run /ABS/PATH/TO/ProxmoxMCP/src/index.ts --stdio
   ```
   It should print something like `[Proxmox MCP] v2.0.0 stdio server running (324 tools, host 192.168.1.21).` to stderr and wait. Any configuration it had to correct is printed above that line. Press Ctrl-C to stop it.
3. **In your client**, ask: *"Use the Proxmox tools to get the version and list nodes."* You should see `get_version` and `list_nodes` succeed.
4. **Permissions:** ask for *"cluster status"*. A `Sys.Audit` error means the token needs `PVEAuditor` (see [Privilege Separation](#️-privilege-separation)).

---

## Tool catalogue

**324 tools** across 12 modules: 175 read-only, the rest write or destructive. Full parameters and the safety label for every tool are in **[docs/TOOLS_REFERENCE.md](./docs/TOOLS_REFERENCE.md)**, which is generated from the code with `bun run docs`.

| Module | Tools | Covers |
|---|---:|---|
| `cluster` | 46 | Cluster status & resources, tasks, logs, options, config, join info, replication, metric servers, notifications, scheduled jobs, Ceph |
| `nodes` | 43 | Node status/config, **time & timezone (`set_node_time`)**, **reboot/shutdown (`node_power`)**, DNS, hosts, network interfaces, services, APT updates, RRD stats, syslog/journal, certificates, tasks, disks & SMART, PCI/USB devices, bulk start/stop, Wake-on-LAN |
| `qemu` | 41 | VM lifecycle, config, snapshots, clone, migrate, template, disk resize/move, cloud-init, VNC/SPICE, monitor, guest agent (`vm_agent_ping`, `vm_agent_exec`, `vm_agent_exec_sync`, file read/write, info, set password) |
| `firewall` | 32 | Cluster, node, VM and container rules, options, aliases, IP sets, security groups, macros, logs |
| `guest-services` | 28 | Inside VMs: `vm_run_shell`, `vm_system_info`, `vm_package_install`, `vm_service_status/manage`, and Docker / Compose (`vm_docker_ps`, `logs`, `exec`, `run`, `stats`, `compose_up/down/ps/logs/pull/restart`, `system_prune`…) |
| `access` | 27 | Users, groups, roles, ACLs, API tokens, TFA, auth realms and sync, permissions |
| `storage` | 26 | Storage config & status, content, upload, download-from-URL, appliance templates, volume allocate/delete, backup prune, ZFS/LVM/LVM-thin/directory pools |
| `lxc` | 25 | Container lifecycle, config, snapshots, clone, migrate, template, volume resize/move |
| `sdn` | 17 | Zones, VNets, subnets, controllers, IPAM, DNS, apply changes |
| `ha` | 14 | HA status, manager, resources, groups, migrate/relocate |
| `pools` | 14 | Resource pools, ACME accounts & plugins |
| `backup` | 11 | Backup jobs, included volumes, vzdump defaults, run backup now, extract config, file-level restore |

### Too many tools for your client?

Cursor, VS Code and Windsurf cap how many tools they send to the model. Either untick tools in the client's MCP panel, or expose only what you need:

```json
"env": { "PROXMOX_MODULES": "qemu,nodes,cluster,guest-services", "...": "..." }
```

`PROXMOX_READ_ONLY=true` also cuts the list to about 157 read-only tools.

---

## Running commands inside guests

The `vm_*` guest tools (`vm_run_shell`, `vm_docker_ps`, `vm_agent_exec_sync`, …) run commands inside a VM through the **QEMU guest agent**. They don't need SSH or network access to the guest.

Requirements:
1. Inside the VM: `apt install qemu-guest-agent && systemctl enable --now qemu-guest-agent`
2. In Proxmox: **VM → Options → QEMU Guest Agent → Enabled**, then fully stop and start the VM once.
3. The token needs `VM.Monitor` on that VM (included in `PVEVMAdmin`).

Commands run as **root** in the guest, wrapped in `/bin/sh -c`, so pipes and redirects work. Output is returned as plain text, flagged `truncated` if the agent cut it short. Use `vm_agent_ping` first to check that a VM's agent is reachable.

> **Not possible through the Proxmox API:**
> - **LXC containers:** there is no API for running commands inside a container (`pct exec` is a host-only CLI), so there are no `lxc_*` exec tools. Use SSH into the container instead.
> - **The Proxmox host itself:** no tool can run shell commands or edit files such as the crontab on the host. Use **Node → Shell** in the web UI or SSH. The host *timezone* is the exception: `set_node_time` changes it through the API.

---

## Security

- **Use a dedicated user and token** with the smallest role that does the job (see the [role table](#which-role)). Avoid `root@pam` tokens without Privilege Separation in shared setups.
- **`PROXMOX_READ_ONLY=true`** is the simplest safety net for monitoring assistants: write tools are not even shown to the model.
- **Use the safety labels.** Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`). Clients that honour them can auto-approve 🟢 read-only tools and always confirm 🔴 destructive ones. `node_power` additionally requires `confirm` to repeat the node name.
- **Guest tools are root shells.** `vm_run_shell`, `vm_docker_exec` and similar tools can do anything inside the VM. Keep them behind your client's approval prompts, and don't auto-approve them.
- **Keep secrets out of shared configs.** Use VS Code `inputs`, Gemini/Claude Code env expansion, or a local `.env` (already in `.gitignore`).
- **HTTP mode:** set `PROXMOX_MCP_AUTH_TOKEN`, keep the default `HOST=127.0.0.1` unless you need remote access, and put TLS in front of it.
- **`PROXMOX_VERIFY_SSL=false`** skips certificate checks. That's fine on a trusted LAN; use a real certificate (ACME tools are included) if the API crosses untrusted networks.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Warning `PROXMOX_HOST "…" was normalised` | You pasted a URL into `PROXMOX_HOST` | Harmless. Set it to the bare IP/hostname to silence the warning |
| `PROXMOX_HOST environment variable is not configured` | `env` block missing or misspelled, or plugin settings not filled in | Check the variable name and that it's inside `env`, fill in the plugin settings, or create `~/.config/proxmox-mcp/.env` |
| `Could not reach Proxmox …` | Host not reachable from this computer, wrong port, or certificate rejected (the message says which) | Open `https://HOST:8006` in a browser on the same machine; check VPN/firewall; set `PROXMOX_VERIFY_SSL=false` for self-signed certs |
| `No Proxmox credentials configured` | Neither a token nor a password is set | Set `PROXMOX_TOKEN_NAME` + `PROXMOX_TOKEN_VALUE` |
| `401 … authentication failure` / `invalid token` | Wrong user, token ID or secret | Check `PROXMOX_USER`, `PROXMOX_TOKEN_NAME` and `PROXMOX_TOKEN_VALUE` against **Datacenter → Permissions → API Tokens** |
| `403 Permission check failed (…)` | Token lacks a privilege | See [permissions](#which-role); remember **Privilege Separation** needs the role on both the user and the token |
| `spawn bun ENOENT` / `spawn npx ENOENT` | The app can't find the runtime | Use the absolute path from `which bun` / `which npx` |
| `Tool '…' is disabled by the server configuration` | Hidden by `PROXMOX_READ_ONLY` or `PROXMOX_MODULES` | Change those settings if you need the tool |
| HTTP mode: `Refusing to listen on 0.0.0.0 without authentication` | Remote bind with no token | Set `PROXMOX_MCP_AUTH_TOKEN` |
| HTTP mode: `401 Unauthorized` | Missing or wrong bearer token | Send `Authorization: Bearer <PROXMOX_MCP_AUTH_TOKEN>` |
| Client shows the server but it never responds | Started without `--stdio` (HTTP mode) | Add `--stdio` to `args` or set `PROXMOX_STDIO=true` |
| Changes to the config have no effect | Client still running the old process | Fully quit and reopen the client, or reload its MCP servers |
| `QEMU guest agent is not running` / `vm_agent_ping` returns `agentRunning: false` | Agent missing or disabled | Install and enable it in the VM, and enable the option in Proxmox (see above) |
| `get_node_journal`: `type check ('integer') failed` | `since`/`until` must be **Unix timestamps** | Pass epoch seconds, or use `get_node_syslog`, which accepts `YYYY-MM-DD HH:MM:SS` dates |
| Too many tools / tools missing in client | Client caps tool count | Use `PROXMOX_MODULES` (see [Tool catalogue](#too-many-tools-for-your-client)) |

---

## Known limitations

- **No commands inside LXC containers** and **no shell on the Proxmox host**: the Proxmox API doesn't offer either (see [Running commands inside guests](#running-commands-inside-guests)).
- **HTTP mode needs Bun.** Stdio mode runs on Bun or Node 20+.
- **On Node, `PROXMOX_VERIFY_SSL=false` applies to the whole process**, because Node's built-in fetch has no per-request switch. This only matters if you embed the server in a larger Node program.
- **Read-only guest tools (e.g. `vm_docker_ps`) need write API access**, because the guest-agent exec endpoint is a POST. They're hidden when `PROXMOX_READ_ONLY=true`.

---

## Development

```bash
bun install          # dependencies
bun test             # unit tests
bun run typecheck    # TypeScript check
bun dev              # HTTP mode with auto-reload
bun run src/index.ts --stdio   # stdio mode
bun run build        # bundle to dist/index.js (runs on Node 20+ and Bun)
bun run docs         # regenerate docs/TOOLS_REFERENCE.md from the registry
```

Smoke-test the built bundle the way a client would:

```bash
bun run build
PROXMOX_HOST=192.168.1.21 PROXMOX_TOKEN_NAME=mcp PROXMOX_TOKEN_VALUE=… node dist/index.js --stdio
```

Publishing (`npm publish`) runs typecheck, tests and the build automatically (`prepublishOnly`).

Test a tool without a client:

```bash
PROXMOX_MCP_AUTH_TOKEN=dev bun start &
curl -s localhost:3000/api/tools/get_version/execute -X POST \
  -H 'authorization: Bearer dev' -H 'content-type: application/json' -d '{}'
```

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## License

MIT © Anbumani - CreativeStudio14.com
