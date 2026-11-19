---
name: proxmox-setup
description: Connects Claude to a Proxmox VE server and verifies it works. Use when the user says "set up Proxmox", "connect to my Proxmox", "configure the Proxmox plugin", "Proxmox tools aren't working", or when a Proxmox tool fails with errors like "PROXMOX_HOST is not configured", "Could not reach Proxmox", "No Proxmox credentials", "401", or "Permission check failed".
---

# Proxmox setup and connection check

Get the Proxmox tools working end to end, then confirm exactly what the token is allowed to do. Tools referenced here come from the plugin's `proxmox` MCP server; call them by their short names (`get_version`, `list_nodes`, …).

## 1. Test the current state first

Call `get_version`. Then branch on the result:

| Result | Meaning | Go to |
|---|---|---|
| Returns a version | Connected | Step 4 (permissions) |
| `PROXMOX_HOST environment variable is not configured` | No settings yet | Step 2 |
| `No Proxmox credentials configured` | Host set, token missing | Step 2 (token part) |
| `Could not reach Proxmox … certificate was rejected` | Self-signed cert with verification on | Turn **Verify TLS certificate** off |
| `Could not reach Proxmox … reachable from this computer` | Network problem | Step 3 |
| `(401)` / `authentication failure` | Wrong token ID or secret | Step 2, re-enter token |
| Proxmox tools missing entirely | Plugin's server didn't start | Step 5 |

## 2. Collect the settings

Ask the user for the Proxmox IP/hostname. If they have no API token yet, walk them through creating one (read `references/token-and-permissions.md` and give the steps in plain language):

1. Proxmox web UI → **Datacenter → Permissions → API Tokens → Add**, user `root@pam` (or a dedicated user), Token ID `mcp`. Copy the secret; it's shown once.
2. **Datacenter → Permissions → Add → API Token Permission**, path `/`, role `PVEAuditor` for read-only or `PVEVMAdmin`/`PVEAdmin` for management, **Propagate** on.
3. If **Privilege Separation** is on, add the same role as a **User Permission** for the token's user too.

Never ask the user to paste the token secret into the chat. Tell them where to enter it instead:

- **Plugin settings (preferred).** In Claude Code: `/plugin` → *proxmox* → configure, or run `claude plugin configure proxmox`. Fields: Proxmox host, API token ID (`root@pam!mcp`), API token secret, Verify TLS certificate (off for self-signed), Read-only mode, Tool modules.
- **Config file (works in every client).** Create `~/.config/proxmox-mcp/.env` with:
  ```env
  PROXMOX_HOST=192.168.1.21
  PROXMOX_TOKEN_NAME=root@pam!mcp
  PROXMOX_TOKEN_VALUE=<secret>
  PROXMOX_VERIFY_SSL=false
  ```
  Values set in plugin settings take priority; anything left blank there is read from this file. If you can write files on the user's computer, offer to create the file with the host and token ID filled in and a `<paste secret here>` placeholder for them to complete. Recommend `chmod 600` on it.

After saving, the MCP server must restart: reload plugins / restart the client, then repeat step 1.

## 3. Network problems

The server runs on the user's computer, so Proxmox must be reachable **from that computer**:

- Ask them to open `https://<host>:8006` in a browser on the same machine. If the login page doesn't load, the issue is network/VPN/firewall/IP, not the plugin.
- If it loads after a certificate warning, keep **Verify TLS certificate** off.
- A non-default port can be given as `host:port`.

## 4. Verify permissions

Once `get_version` works, probe what the token can do. Use read-only calls only:

| Probe | Needs | If it fails with 403 |
|---|---|---|
| `list_nodes` then `get_node_status` | `Sys.Audit` | Add `PVEAuditor` on `/` (both user and token if privilege-separated) |
| `get_cluster_status` | `Sys.Audit` on `/` | Same as above |
| `list_vms` for each node | `VM.Audit` | Add `PVEAuditor` or `PVEVMAdmin` |
| `vm_agent_ping` on one running VM | `VM.Monitor` + agent installed | Add `PVEVMAdmin`; install `qemu-guest-agent` and enable *QEMU Guest Agent* in VM options |

`vm_agent_ping` is a POST, so it is hidden in read-only mode; skip it then.

## 5. Plugin server not starting

- The server runs via `npx`, so **Node.js 20+** must be installed on the computer. Ask the user to run `node --version`.
- The first start downloads the package and can take ~20 s; retry once.
- Corporate proxies can block npm. The user can install it globally instead: `npm i -g @amailath/proxmox-mcp-server`.

## 6. Report

Finish with a short summary:
- connected host and Proxmox version,
- node names and number of VMs/containers found,
- capability level: **read-only**, **VM operations**, or **full admin**, based on the probes,
- anything still missing (e.g. "guest agent not installed in VM 102"), with the one-line fix.

Suggest running the **proxmox-health-check** skill next.
