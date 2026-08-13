# Proxmox MCP Server Getting Started & Integration Guide

Welcome to the **Enterprise Proxmox VE Model Context Protocol (MCP) Server**. This guide provides step-by-step instructions to configure, run, and integrate the MCP server with AI tools such as **Claude Desktop**, **Cursor**, **VS Code**, or custom HTTP clients using **Bun** and **Elysia**.

---

## 🎯 Prerequisites

1. **Bun Runtime** (v1.0 or newer):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
2. **Proxmox VE Cluster** (v7.0, v8.0, or newer).
3. Access to a Proxmox API Token or User credentials (`root@pam` or dedicated API user).

---

## 🚀 Quick Setup & Configuration

### 1. Installation

```bash
git clone https://github.com/your-org/proxmox-mcp.git
cd proxmox-mcp
bun install
```

### 2. Environment Variables Configuration

Copy `.env.example` to `.env` or set environment variables in your environment:

```bash
cp .env.example .env
```

Edit your `.env` file according to your Proxmox VE cluster settings:

```env
# Proxmox Host & Port
PROXMOX_HOST=pve.example.com
PROXMOX_PORT=8006

# -------------------------------------------------------------
# AUTHENTICATION MODE 1: API Token (RECOMMENDED FOR ENTERPRISE)
# -------------------------------------------------------------
PROXMOX_USER=root@pam
PROXMOX_TOKEN_NAME=mcp-token
PROXMOX_TOKEN_VALUE=12345678-abcd-1234-abcd-1234567890ab

# -------------------------------------------------------------
# AUTHENTICATION MODE 2: Password Authentication (FALLBACK)
# -------------------------------------------------------------
# PROXMOX_USER=root@pam
# PROXMOX_PASSWORD=your_secure_password

# Security & Safety Settings
PROXMOX_VERIFY_SSL=false     # Set true if using valid SSL certificates
PROXMOX_READ_ONLY=false      # Set true to block write/destructive actions
PROXMOX_TIMEOUT=30000        # API request timeout in milliseconds

# Elysia HTTP/SSE Server Settings
PORT=3000
HOST=0.0.0.0
```

---

## 🔒 Proxmox API Token Creation Guide

To create a dedicated API token in Proxmox VE:

1. Log into your Proxmox VE Web UI.
2. Go to **Datacenter** ➔ **Permissions** ➔ **API Tokens**.
3. Click **Add**:
   - User: `root@pam` (or create a dedicated user `mcp-bot@pve`)
   - Token ID: `mcp-token`
   - Uncheck **Privilege Separation** if you want the token to inherit full user permissions.
4. Copy the generated **Secret Value** immediately and put it in `PROXMOX_TOKEN_VALUE`.

---

## 🖥️ Execution Modes

### Mode 1: Elysia HTTP & SSE Server Mode (Default)

Runs a high-performance web server providing REST endpoints, health metrics, and a Server-Sent Events (SSE) MCP transport.

```bash
# Start server in development mode with auto-reload
bun dev

# Start server in production mode
bun start
```

**Elysia Server Endpoints**:
- `http://localhost:3000/` — Server status & information
- `http://localhost:3000/health` — Proxmox connectivity check & uptime metrics
- `http://localhost:3000/metrics` — Memory & process metrics
- `http://localhost:3000/api/tools` — REST endpoint returning all 298 tool schemas
- `http://localhost:3000/sse` — SSE MCP transport for remote AI clients

### Mode 2: Stdio Transport Mode

Used by local desktop AI clients (Cursor, Claude Desktop, VS Code) communicating via standard input/output.

```bash
bun run src/index.ts --stdio
```

---

## 🔌 Integrating with AI Clients

### 1. Claude Desktop Integration

> **Note on macOS GUI Apps (`spawn bun ENOENT`)**: Desktop applications (Claude Desktop, Cursor, VS Code) do not inherit shell `$PATH` environments. Always specify the full absolute path to `bun` (e.g. `/Users/yourusername/.bun/bin/bun` or run `which bun` in your terminal).

Add the server to your `claude_desktop_config.json`:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "proxmox-local": {
      "command": "/Users/creativestudio14/.bun/bin/bun",
      "args": ["run", "/Users/creativestudio14/Projects/ProxmoxMCP/src/index.ts", "--stdio"],
      "env": {
        "PROXMOX_HOST": "192.168.1.21",
        "PROXMOX_USER": "root@pam",
        "PROXMOX_TOKEN_NAME": "mcp",
        "PROXMOX_TOKEN_VALUE": "ae95648d-2eca-4caf-be48-2b7854094aa5",
        "PROXMOX_VERIFY_SSL": "false"
      }
    }
  }
}
```

### 2. Cursor Integration

1. Go to **Cursor Settings** ➔ **Features** ➔ **MCP Servers**.
2. Click **+ Add New MCP Server**:
   - **Name**: `proxmox-local`
   - **Type**: `command`
   - **Command**: `/Users/creativestudio14/.bun/bin/bun run /Users/creativestudio14/Projects/ProxmoxMCP/src/index.ts --stdio`
3. Add Environment Variables (`PROXMOX_HOST`, `PROXMOX_USER`, `PROXMOX_TOKEN_NAME`, `PROXMOX_TOKEN_VALUE`, `PROXMOX_VERIFY_SSL`).

---

## 🧪 Testing & Verification

```bash
# Run unit test suite (13 passing tests)
bun test

# Perform TypeScript static type check
bun run typecheck

# Build standalone distribution bundle
bun run build
```

---

## 💡 Troubleshooting & Tips

- **Read-Only Safety**: Enable `PROXMOX_READ_ONLY=true` in staging or multi-user environments. Any attempt to modify, create, or delete VMs or storage will return a safe error without mutating the Proxmox cluster.
- **SSL Certificate Warnings**: If your Proxmox server uses a self-signed certificate (default installation), ensure `PROXMOX_VERIFY_SSL=false` is set to avoid connection errors.
- **Guest Agent Execution**: For `vm_agent_exec_sync` to work, ensure the **QEMU Guest Agent** is enabled in the VM settings (VM ➔ Options ➔ QEMU Guest Agent) and the agent package (`qemu-guest-agent`) is installed and running inside the guest operating system.
