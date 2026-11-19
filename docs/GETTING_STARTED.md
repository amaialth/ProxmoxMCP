# Getting Started

This guide takes you from nothing to a working Proxmox MCP server in your AI client in about ten minutes. For every client's exact config format, see the [README](../README.md#connect-it-to-your-ai-client).

---

## 1. Prerequisites

- **Bun** 1.1+ (`curl -fsSL https://bun.sh/install | bash`) or **Node.js** 20+
- **Proxmox VE** 7.x or 8.x, reachable from this computer on port **8006**
- A Proxmox **API token** (step 3)

Check the network first. Open `https://<your-proxmox-ip>:8006` in a browser on the computer that will run the server. If the login page doesn't load, fix that before going further (VPN, firewall, wrong IP).

---

## 2. Install

```bash
git clone https://github.com/amailath/ProxmoxMCP.git
cd ProxmoxMCP
bun install
which bun   # note this absolute path
pwd         # and this one
```

Or skip the clone and let your client run `npx -y @amailath/proxmox-mcp-server --stdio`.

---

## 3. Create an API token

1. Proxmox web UI → **Datacenter → Permissions → API Tokens → Add**.
2. **User** `root@pam` (or a dedicated user such as `mcp@pve`), **Token ID** `mcp`.
3. Copy the **Secret**. It is shown once.
4. **Datacenter → Permissions → Add → API Token Permission**: path `/`, your token, role **PVEAuditor** (read-only) or **PVEVMAdmin** / **PVEAdmin** for more. Tick **Propagate**.
5. If **Privilege Separation** was ticked on the token, add the **same role as a User Permission** for the token's user too. The token only gets privileges that both have.

---

## 4. Configure

Copy the example file and fill it in. This is used when you run the server by hand; clients pass the same values in their `env` block.

```bash
cp .env.example .env
```

```env
PROXMOX_HOST=192.168.1.21        # IP or hostname only
PROXMOX_USER=root@pam
PROXMOX_TOKEN_NAME=mcp           # token ID (root@pam!mcp also accepted)
PROXMOX_TOKEN_VALUE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PROXMOX_VERIFY_SSL=false         # true only with a trusted certificate
```

All variables are listed in the [README](../README.md#configuration).

---

## 5. Test from the terminal

```bash
bun run src/index.ts --stdio
```

You should see on stderr:

```
[Proxmox MCP] v2.0.1 stdio server running (324 tools, host 192.168.1.21).
```

Any value the server had to correct, such as a URL in `PROXMOX_HOST`, is reported above that line. Press Ctrl-C to stop.

To test real API calls without an AI client, use HTTP mode:

```bash
PROXMOX_MCP_AUTH_TOKEN=dev bun start
curl -s -H 'authorization: Bearer dev' localhost:3000/health
```

`"proxmoxConnected": true` means the host, token and certificate settings all work.

---

## 6. Add it to your AI client

Claude Desktop example (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "proxmox": {
      "command": "/Users/you/.bun/bin/bun",
      "args": ["run", "/Users/you/Projects/ProxmoxMCP/src/index.ts", "--stdio"],
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

- Use **absolute paths**: desktop apps don't see your shell `PATH`.
- Keep **`--stdio`** in `args`.
- **Fully quit and reopen** the client after editing.

Configs for Claude Code, Cursor, VS Code, Copilot CLI, Windsurf, Antigravity, Gemini CLI, Codex CLI, Cline/Roo and Zed are in the [README](../README.md#connect-it-to-your-ai-client).

---

## 7. First prompts to try

- "List my Proxmox nodes and VMs with their status and memory use."
- "Show cluster status." (needs `PVEAuditor`)
- "Is the guest agent running in VM 100?" (`vm_agent_ping`)
- "What Docker containers are running in each VM?" (`vm_docker_ps`, needs the guest agent)

---

## 8. Optional: in-guest tools

The `vm_*` tools run commands inside VMs through the QEMU guest agent:

1. In the VM: `apt install qemu-guest-agent && systemctl enable --now qemu-guest-agent`
2. In Proxmox: **VM → Options → QEMU Guest Agent → Enabled**, then stop and start the VM.

LXC containers can't run commands through the Proxmox API, so there are no `lxc_*` exec tools.

---

## Troubleshooting

See the [troubleshooting table](../README.md#troubleshooting) in the README. The usual culprits are an unreachable host, a missing `--stdio`, a relative `bun` path, or a token missing permissions because of Privilege Separation.
