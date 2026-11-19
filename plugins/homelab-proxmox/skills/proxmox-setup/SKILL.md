---
name: proxmox-setup
description: Sets up and verifies the connection between Claude and a self-hosted Proxmox MCP server for a Proxmox VE homelab. Use when the user says "set up Proxmox", "set up homelab-proxmox", "connect to my Proxmox", "how do I host the server", "Proxmox tools aren't working", or when a Proxmox tool or the connection fails with errors like "401", "Unauthorized", "PROXMOX_HOST is not configured", "Could not reach Proxmox", "No Proxmox credentials", or "Permission check failed".
---

# Homelab Proxmox setup and connection check

This plugin connects Claude to a **Proxmox MCP server that the user hosts**. The chain is:

```
Claude ──HTTPS + bearer token──▶ user's MCP server (/mcp) ──API token──▶ Proxmox VE (port 8006)
```

The plugin's two settings are **Server URL** (`https://…/mcp`) and **Server access token** (the server's `PROXMOX_MCP_AUTH_TOKEN`). The Proxmox credentials live on the server, not in the plugin. Read `references/self-hosting.md` before giving hosting instructions.

## 1. Test the current state

If the Proxmox tools (`get_version`, `list_nodes`, …) are available, call `get_version` and branch:

| Result | Meaning | Go to |
|---|---|---|
| Returns a version | Everything works | Step 4 (permissions) |
| Tools missing, or a connection error / 401 from the plugin's server | Claude can't reach or authenticate to the MCP server | Step 3 |
| `PROXMOX_HOST environment variable is not configured` / `No Proxmox credentials configured` | Server runs but isn't configured | Step 2b |
| `Could not reach Proxmox …` | Server can't reach Proxmox | Step 2b (network/TLS) |
| `(401)` from Proxmox / `authentication failure` | Wrong Proxmox token on the server | Step 2a |

If no Proxmox tools are available at all and the user hasn't hosted a server yet, start at step 2.

## 2. Host the server (first-time setup)

Walk the user through it in plain language, one stage at a time, and confirm each stage before moving on.

**a. Create a Proxmox API token.** Use `references/token-and-permissions.md`: Datacenter → Permissions → API Tokens → Add, token `root@pam!mcp` (or a dedicated user), a role on `/` (`PVEAuditor` read-only, `PVEVMAdmin` or `PVEAdmin` for changes), and the Privilege Separation caveat.

**b. Run the server** on a machine that can reach Proxmox: an LXC or VM on the Proxmox host itself, a NAS, or a Raspberry Pi. Docker is easiest; see `references/self-hosting.md` for the env file and commands. Required settings: `PROXMOX_HOST`, `PROXMOX_TOKEN_NAME`, `PROXMOX_TOKEN_VALUE`, `PROXMOX_VERIFY_SSL=false` (self-signed), and a long random `PROXMOX_MCP_AUTH_TOKEN` (`openssl rand -hex 32`).

**c. Give it an HTTPS address.**
- **Claude on the web (claude.ai) or mobile** reaches the server from the internet, so it needs a **public HTTPS URL**: Cloudflare Tunnel, Tailscale Funnel, or a reverse proxy with a certificate.
- **Claude Code / Claude desktop** connect from the user's computer, so a private address reachable from that computer works, such as a Tailscale `https://<machine>.<tailnet>.ts.net` name.

**d. Enter the plugin settings:** Server URL = the HTTPS address plus `/mcp`; Server access token = the `PROXMOX_MCP_AUTH_TOKEN` value. Never ask the user to paste either token into the chat; tell them where to enter it.

## 3. Connection problems between Claude and the server

Ask the user to check, in order:
1. `https://<server>/` in a browser returns JSON with `"status":"ok"` and `"authRequired":true`. If not, the server isn't running or the URL/tunnel is wrong.
2. The URL in the plugin settings ends in **`/mcp`** and starts with **`https://`**.
3. The access token matches the server's `PROXMOX_MCP_AUTH_TOKEN` exactly. A 401 means it doesn't.
4. For claude.ai, the address must be reachable from the public internet, not just the home network.
5. Server logs: `docker logs proxmox-mcp`.

## 4. Verify permissions

With `get_version` working, probe with read-only calls:

| Probe | Needs | If it fails with 403 |
|---|---|---|
| `list_nodes`, `get_node_status` | `Sys.Audit` | `PVEAuditor` on `/` (user **and** token if privilege-separated) |
| `get_cluster_status` | `Sys.Audit` on `/` | same |
| `list_vms` per node | `VM.Audit` | `PVEAuditor` or `PVEVMAdmin` |
| `vm_agent_ping` on one running VM | `VM.Monitor` + guest agent | `PVEVMAdmin`; install `qemu-guest-agent` and enable *QEMU Guest Agent* in VM options |

If the server runs with `PROXMOX_READ_ONLY=true`, write tools and guest tools are hidden. That's expected.

## 5. Report and advise on exposure

Summarise: the server URL host (never the token), Proxmox version, nodes, VM/container count, capability level (read-only / VM operations / full admin), and anything still missing with its one-line fix.

If the server is reachable from the public internet, recommend: a long random access token, `PROXMOX_READ_ONLY=true` or a Proxmox role that is only as broad as needed, `PROXMOX_MODULES` to limit tools, and tunnel-level access control (Cloudflare Access, Tailscale ACLs) where possible.

Suggest running the **proxmox-health-check** skill next.
