# Contributing to Proxmox MCP Server
**Author:** Anbumani - CreativeStudio14.com

Thanks for helping improve the project.

## Reporting issues

Open a GitHub issue with:
- what you ran (client, runtime: Bun or Node, server version from `GET /` or the startup line),
- the tool name and arguments,
- the full error text, with tokens and passwords removed,
- your Proxmox VE version (`get_version`).

## Development setup

```bash
git clone https://github.com/amailath/ProxmoxMCP.git
cd ProxmoxMCP
bun install
cp .env.example .env   # fill in a test cluster
```

## Before opening a pull request

```bash
bun run typecheck
bun test
bun run build && node dist/index.js --stdio   # starts and waits; Ctrl-C to stop
bun run docs                                   # if you added, removed or changed tools
```

- Add or update tests in `tests/` for any behaviour change.
- New tools go in the matching `src/tools/<module>.ts`, follow the `verb_object` naming (`get_`, `list_`, `create_`, `update_`, `delete_`…), and must have a description and parameter schema. Safety annotations come from the name (`src/mcp/annotations.ts`); add an explicit `annotations` override if the name is misleading.
- Never write to **stdout** outside the MCP transport. In stdio mode it is the protocol channel, so log to stderr.
- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `test:`, `chore:`.
- Add a line to `CHANGELOG.md` under **Unreleased**.

## Releasing (maintainers)

1. Update `version` in `package.json` and add a dated section to `CHANGELOG.md`.
2. If the plugin changed, bump `version` in `plugins/proxmox/.claude-plugin/plugin.json` and in `.claude-plugin/marketplace.json`, then run `claude plugin validate plugins/proxmox/.claude-plugin/plugin.json`.
3. Check what will be published: `npm pack --dry-run`.
4. Publish: `npm login` (once), then `npm publish --access public`. `prepublishOnly` runs the typecheck, tests and build.
5. Tag and push: `git tag v<version> && git push --tags`, and attach `proxmox.plugin` (`cd plugins/proxmox && zip -r ../../proxmox.plugin .`) to the GitHub release.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
