# Homelab Proxmox

Run your **Proxmox VE** homelab from Claude. This plugin connects Claude to **your own, self-hosted** [Proxmox MCP server](https://github.com/amaialth/ProxmoxMCP) (324 tools covering nodes, VMs, containers, storage, networking, firewall, backups, HA, and Docker inside VMs through the QEMU guest agent) and adds four skills:

| Skill | Say something like… | What it does |
|---|---|---|
| **proxmox-setup** | "Set up Homelab Proxmox", "the Proxmox tools aren't working" | Walks you through hosting the server, the Proxmox API token and permissions, and the HTTPS address, then verifies the connection |
| **proxmox-health-check** | "Check my Proxmox", "is my homelab healthy?" | One-page report: nodes, storage %, VMs, failed tasks, backups, SMART, guest agents, Docker containers |
| **proxmox-troubleshoot** | "Why does my server shut down every night?", "why did VM 100 stop?" | Rebuilds the timeline from tasks and logs, tells clean shutdowns from crashes, and finds the root cause |
| **proxmox-safe-operations** | (used automatically when you ask for changes) | Confirms the target, snapshots before risky changes, prefers graceful actions, and verifies the result |

## How it works

```
Claude ──HTTPS + access token──▶ your MCP server (/mcp) ──Proxmox API token──▶ your Proxmox VE
```

- The plugin itself runs nothing on your computer. It contains the four skills and one **remote MCP server entry** that points at the URL you enter.
- You host the server (Docker or Node.js) on a machine that can reach Proxmox, and give it an HTTPS address.
- Your Proxmox credentials stay on your server. The plugin only stores the server URL and its access token, and the token is kept in Claude's secure storage.
- No data goes to the plugin's publisher. See the [privacy policy](https://github.com/amaialth/ProxmoxMCP/blob/main/PRIVACY.md).

## Setup

1. **Create a Proxmox API token** (Datacenter → Permissions → API Tokens), e.g. `root@pam!mcp`, with role `PVEAuditor` (read-only) or `PVEVMAdmin`/`PVEAdmin` on `/`. If *Privilege Separation* is on, give the user the same role too.
2. **Run the server** with Docker. From a clone of the repository, create `proxmox-mcp.env`:
   ```env
   PROXMOX_HOST=192.168.1.21
   PROXMOX_TOKEN_NAME=root@pam!mcp
   PROXMOX_TOKEN_VALUE=<proxmox token secret>
   PROXMOX_VERIFY_SSL=false
   PROXMOX_MCP_AUTH_TOKEN=<output of: openssl rand -hex 32>
   ```
   then run `docker compose up -d`.
3. **Give it an HTTPS address.** Claude on the web needs a public one (Cloudflare Tunnel, Tailscale Funnel, or a reverse proxy with a certificate). Claude Code and Claude desktop only need it reachable from your computer.
4. **Fill in the plugin settings:**
   - **Server URL:** `https://<your address>/mcp`
   - **Server access token:** your `PROXMOX_MCP_AUTH_TOKEN`
5. Say **"set up Homelab Proxmox"**. Claude checks the connection and reports what your token can do.

## Safety

- Every tool is labelled read-only, additive or destructive, and the **proxmox-safe-operations** skill makes Claude confirm targets, snapshot first and verify afterwards.
- For a monitoring-only setup, start the server with `PROXMOX_READ_ONLY=true`. Write tools are then not even visible to Claude.
- If your server is reachable from the internet, use a long random access token and the narrowest Proxmox role you need. Consider `PROXMOX_MODULES` and tunnel-level access control (Cloudflare Access, Tailscale ACLs).

## What the plugin connects to

Only the server URL you configure. That server connects only to the Proxmox host you configure on it. When installed with Docker or `npx`, the server package is downloaded from the public npm registry (`@amailath/proxmox-mcp-server`).

## License

MIT © Anbumani - CreativeStudio14.com
