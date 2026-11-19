# Privacy Policy — Proxmox MCP Server and Claude plugins

_Last updated: 2026-11-19 · Publisher: Anbumani - CreativeStudio14.com_

This policy covers the `@amailath/proxmox-mcp-server` package and the `proxmox` and `homelab-proxmox` Claude plugins.

## What we collect

**Nothing.** The publisher runs no servers for this project and receives no data from it. There is no telemetry, analytics, crash reporting or account system.

## How data flows

- **The server runs on infrastructure you control**: your computer (the `proxmox` plugin), or a machine or container you host (the `homelab-proxmox` plugin).
- The server talks only to **the Proxmox VE API you configure** (`PROXMOX_HOST`), using your API token. It sends that API's responses (node, VM, storage and task data, and the output of commands you ask it to run inside VMs) back to **your AI client** (for example Claude) over the connection you set up.
- What your AI client does with that data is governed by that client's own terms and privacy policy (for Claude, see https://www.anthropic.com/legal/privacy).
- When installed with `npx` or Docker, the package is downloaded from the public npm registry, which sees a normal package download.

## Credentials

Your Proxmox API token and the server access token are stored by your client (Claude stores plugin secrets in its secure storage) or in configuration files you create. They are sent only to your Proxmox server and your own MCP server, never to the publisher.

## Logs

The server writes diagnostic messages to its own standard error output on your machine. It doesn't write files or send logs anywhere.

## Contact

Questions: open an issue at https://github.com/amaialth/ProxmoxMCP/issues.
