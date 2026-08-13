# Enterprise Proxmox VE Model Context Protocol (MCP) Server

An enterprise-grade, high-performance **Model Context Protocol (MCP)** server for Proxmox VE, built with **TypeScript**, **Bun**, and the **Elysia framework**.

It absorbs **all 285 tools** from the reference Python implementation and adds **enhanced guest command execution** capabilities and high-value enterprise management tools (totaling **298 tools**).

---

## 📖 Complete Documentation Links

- 🚀 **[Getting Started & Integration Guide](docs/GETTING_STARTED.md)** — Step-by-step installation, API Token configuration, Stdio mode setup for Claude Desktop/Cursor, and Elysia SSE server setup.
- 🛠️ **[Complete 298 Tools Reference Guide](docs/TOOLS_REFERENCE.md)** — Comprehensive reference listing all 298 tools with parameter tables, types, required arguments, and descriptions grouped by domain.

---

## 🌟 Key Features

- **⚡ Bun & Elysia Powered**: Ultra-fast execution, native TypeScript support, and low memory consumption.
- **🛠️ 298 Enterprise MCP Tools**: Full coverage across 11 Proxmox VE domains:
  - `access`: Users, Groups, Roles, Permissions, Tokens, ACLs, TFA, Auth Domains.
  - `backup`: Jobs, schedules, included volumes, and manual backup triggers.
  - `cluster`: Cluster status, resources, tasks, logs, replication, metrics, options.
  - `firewall`: Node/Cluster/VM/LXC firewall rules, aliases, IP sets, security groups.
  - `ha`: High Availability status, manager, resources, groups.
  - `lxc`: Container management, creation, migration, snapshots, firewall, plus `lxc_exec_sync`.
  - `nodes`: Status, config, DNS, network interfaces, storage, services, APT updates, RRD stats, system journal, certificates, task logs, **Physical Disks**, **SMART Health**, **ZFS & LVM Pools**, **PCI & USB Passthrough Discovery**, **Task Cancellation**, **Bulk Operations**.
  - `pools`: Resource pools and ACME (Let's Encrypt) certificates.
  - `qemu`: Virtual machine lifecycle, snapshots, cloud-init, cloning, migration, plus **`vm_agent_exec_sync`** and **Auto Base64 File Read/Write**.
  - `sdn`: Software Defined Networks (VNets, zones, subnets, controllers, IPAM, DNS).
  - `storage`: Storage status, config, content, ISO upload, volume allocation/deletion.
- **🚀 Corrected & Enhanced Guest Command Execution**:
  - **Synchronous Wait (`vm_agent_exec_sync`)**: Automatically polls `exec-status` until command completion, returning stdout, stderr, and exitcode in a single tool call.
  - **Auto Base64 Decoding**: Base64-encoded `out-data` and `err-data` from QEMU guest agent are automatically decoded into clean UTF-8 text strings.
  - **Smart Shell Formatting**: Automatically wraps string commands with shell execution (`/bin/sh -c`) so pipes, redirects, and quotes work out-of-the-box.
  - **LXC Guest Command Execution (`lxc_exec_sync`)**: Brand new execution capability inside LXC containers.
- **🔒 Enterprise Security & Auth**:
  - Dual Auth: API Tokens (`PROXMOX_TOKEN_NAME` + `PROXMOX_TOKEN_VALUE`) or User Passwords (`PROXMOX_USER` + `PROXMOX_PASSWORD` with automatic ticket renewal).
  - Read-Only Mode (`PROXMOX_READ_ONLY=true`) to prevent write/destructive operations.
  - TLS Verification Control (`PROXMOX_VERIFY_SSL=false` for self-signed certificates).
- **📡 Dual MCP Transport**:
  - **Stdio Transport**: Integrated for Cursor, Claude Desktop, VS Code, and CLI clients.
  - **Elysia HTTP & SSE Transport**: Real-time Server-Sent Events MCP endpoint at `/sse`, health check at `/health`, and metrics at `/metrics`.

---

## 🚀 Quick Start

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/your-org/proxmox-mcp.git
cd proxmox-mcp

# Install dependencies using Bun
bun install

# Run unit tests
bun test

# Type check
bun run typecheck

# Start Elysia HTTP/SSE server in development mode
bun dev

# Build production bundle
bun run build
```

---

## 📄 License

MIT License.
