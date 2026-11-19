# Self-hosted Proxmox MCP server (HTTP mode) for remote MCP clients such as
# the homelab-proxmox Claude plugin.
#
#   docker build -t proxmox-mcp .
#   docker run -d --name proxmox-mcp -p 3000:3000 --env-file proxmox-mcp.env proxmox-mcp
#
# The image runs the server from the published npm package (pinned).
FROM node:22-alpine

ARG VERSION=2.1.0
RUN npm install -g "@amailath/proxmox-mcp-server@${VERSION}" && npm cache clean --force

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

EXPOSE 3000
USER node

# "/" is the only endpoint that answers without the bearer token.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null || exit 1

ENTRYPOINT ["proxmox-mcp-server"]
