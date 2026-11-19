# Changelog — Proxmox MCP Server
**Author:** Anbumani - CreativeStudio14.com

All notable changes to this project will be documented in this file.

## [2.0.1] — 2026-11-19

### Changed
- **Claude plugin 0.1.2:** the plugin now pins the server to an exact version (`@amailath/proxmox-mcp-server@2.0.1`) instead of the range `^2.0.0`. Anthropic's plugin directory requires `npx` packages to be pinned.
- Added a `LICENSE` file inside `plugins/proxmox/`, as the plugin directory requires a license in the plugin folder.

No changes to the server's code or tools since 2.0.0.

## [2.0.0] — 2026-11-19

### ⚠️ Breaking
- **Removed 30 `lxc_*` exec tools** (`lxc_exec_sync`, `lxc_agent_exec_sync` and the 28 `lxc_docker_*` / `lxc_service_*` / `lxc_run_shell` / `lxc_package_install` / `lxc_system_info` / `lxc_docker_info` tools). They called Proxmox endpoints that don't exist and could never work; Proxmox has no API for running commands inside containers.
- **HTTP mode listens on `127.0.0.1` by default** (was `0.0.0.0`) and refuses a non-localhost bind without `PROXMOX_MCP_AUTH_TOKEN`.
- **The SSE transport (`/sse`, `/api/message`) was replaced by MCP Streamable HTTP at `/mcp`.**
- `vm_agent_file_write`: the `encode` argument is replaced by `content_is_base64` (default `false`, meaning plain text).
- The npm `bin` now points to the built `dist/index.js`.

### Fixed
- **Guest command output was garbled**: `vm_run_shell`, `vm_docker_*`, `vm_agent_exec_sync`, `vm_agent_exec_status` and `vm_agent_file_read` base64-decoded text that Proxmox had already decoded. Output is now returned verbatim, with a `truncated` flag when the agent cuts it short.
- **`vm_agent_file_write` double-encoded content**, so files ended up containing base64 text. Plain text is now sent with `encode=1`.
- **`PROXMOX_HOST` given as a URL** (`https://host:8006/`, quoted, or a markdown link) produced `fetch() URL is invalid`. It is now normalised, with a warning on stderr; IPv6 is supported.
- **`PROXMOX_TOKEN_NAME=root@pam!mcp`** (the form shown in the Proxmox UI) produced an invalid `root@pam!root@pam!mcp` token header. Both forms now work.
- **`PROXMOX_VERIFY_SSL=false` was ignored on Node**, so self-signed certificates failed under `npx`. It now works on Node and Bun.
- **The npm package could not start**: `bin` pointed at TypeScript source that wasn't published. It is now a Node-compatible bundle in `dist/`.
- **`get_node_journal`**: `since`/`until` are now typed as Unix timestamps, and empty responses no longer crash with `null is not an object (evaluating 'resJson.data')`.
- Optional parameters no longer advertise `default: ""`, and empty-string GET parameters are no longer sent (Proxmox rejected them).
- The server version was hard-coded as `1.0.0`; it now comes from `package.json`.
- Clearer errors for unreachable hosts, rejected certificates and missing credentials.

### Added
- **MCP tool annotations** on every tool (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `title`), so clients can auto-approve safe reads and always confirm destructive actions.
- **`PROXMOX_READ_ONLY=true` now hides write tools** instead of listing tools that would only fail.
- **`PROXMOX_MODULES`** to expose only selected modules, for clients that cap tool counts.
- **HTTP bearer authentication** (`PROXMOX_MCP_AUTH_TOKEN`, `Authorization: Bearer` or `X-API-Key`).
- New tools: **`set_node_time`** (change a node's timezone), **`node_power`** (reboot/shutdown a node, with a name confirmation), **`vm_agent_ping`** (check a VM's guest agent).
- Server `instructions` sent to clients at initialisation.
- `docs/TOOLS_REFERENCE.md` is now generated from the code (`bun run docs`), with a safety label per tool.
- **Config files:** settings are also read from `~/.config/proxmox-mcp/.env` (or `PROXMOX_MCP_ENV_FILE`, `./.env`, `~/.proxmox-mcp.env`) for anything not set in the environment. Unexpanded `${...}` placeholders from clients are treated as unset.
- **Claude plugin** in `plugins/proxmox` with a marketplace at the repo root (`/plugin marketplace add amailath/ProxmoxMCP`): the server via `npx`, plugin settings for host and token (secret stored securely), and four skills: `proxmox-setup`, `proxmox-health-check`, `proxmox-troubleshoot`, `proxmox-safe-operations`.
- `.env.example`, `LICENSE`, and a `prepublishOnly` check (typecheck + tests + build).
- Tests for config normalisation, the HTTP client, guest exec, annotations and the HTTP transport (23 → 70 tests).

### Docs
- README rewritten with setup for Claude Desktop, Claude Code, Cursor, VS Code, Copilot CLI, Windsurf, Antigravity, Gemini CLI, Codex CLI, Cline/Roo, Zed and remote HTTP clients, plus permissions, troubleshooting and security sections.
- GETTING_STARTED and CONTRIBUTING rewritten for this project.

## [1.0.1] — 2024-08-29

### Added
- **Auto NPM publish**: Added GitHub Actions workflow for automatic NPM publishing on release.

## [1.0.0] — 2024-08-24

## Initial commit
- **Initial release**: Initial release of Proxmox MCP server for local AI clients