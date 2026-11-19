# Self-hosting the Proxmox MCP server

The server is the npm package `@amailath/proxmox-mcp-server`. Without `--stdio` it serves MCP over Streamable HTTP at `/mcp`.

## Settings (env file)

Create `proxmox-mcp.env` on the machine that will run the server:

```env
# Proxmox connection
PROXMOX_HOST=192.168.1.21
PROXMOX_TOKEN_NAME=root@pam!mcp
PROXMOX_TOKEN_VALUE=<proxmox token secret>
PROXMOX_VERIFY_SSL=false

# Access token Claude must send (generate with: openssl rand -hex 32)
PROXMOX_MCP_AUTH_TOKEN=<long random string>

# Optional hardening
# PROXMOX_READ_ONLY=true
# PROXMOX_MODULES=qemu,nodes,cluster,storage,guest-services
```

Protect it: `chmod 600 proxmox-mcp.env`. The server refuses to listen on a non-localhost address unless `PROXMOX_MCP_AUTH_TOKEN` is set.

## Option A: Docker (recommended)

From a clone of https://github.com/amaialth/ProxmoxMCP (it contains `Dockerfile` and `docker-compose.yml`):

```bash
cp .env.example proxmox-mcp.env   # then edit as above
docker compose up -d
docker logs proxmox-mcp           # expect "MCP endpoint (Streamable HTTP): …/mcp"
```

The compose file publishes the port on `127.0.0.1:3000` only, so put a tunnel or reverse proxy in front of it.

Without compose:

```bash
docker build -t proxmox-mcp .
docker run -d --name proxmox-mcp --restart unless-stopped \
  -p 127.0.0.1:3000:3000 --env-file proxmox-mcp.env proxmox-mcp
```

## Option B: Node.js 20+ directly

```bash
set -a; . ./proxmox-mcp.env; set +a
HOST=127.0.0.1 PORT=3000 npx -y @amailath/proxmox-mcp-server@2.1.0
```

Use a process manager (systemd, pm2) to keep it running.

## Giving it an HTTPS address

| Client | Needs |
|---|---|
| Claude on the web (claude.ai), mobile | Public HTTPS URL reachable from the internet |
| Claude Code, Claude desktop / Cowork | HTTPS URL reachable from the user's computer (private is fine) |

- **Cloudflare Tunnel:** `cloudflared tunnel --url http://localhost:3000` for a quick test URL, or a named tunnel with your domain. Add Cloudflare Access for an extra login layer.
- **Tailscale:** `tailscale serve --bg 3000` gives a private `https://<machine>.<tailnet>.ts.net` URL for devices on your tailnet. `tailscale funnel --bg 3000` makes it public, which claude.ai needs.
- **Reverse proxy** (Caddy, Nginx Proxy Manager, Traefik) with a real certificate, forwarding to `http://127.0.0.1:3000`.

The plugin's **Server URL** is the HTTPS address plus `/mcp`, e.g. `https://pve-mcp.example.com/mcp`.

## Checks

- `curl https://<address>/` → `{"status":"ok", … "authRequired": true}`
- `curl -H "Authorization: Bearer <token>" https://<address>/health` → `"proxmoxConnected": true`

If `/health` shows `proxmoxConnected: false`, read its `error` field: usually a wrong `PROXMOX_HOST`, the token, or `PROXMOX_VERIFY_SSL=true` with a self-signed certificate.
