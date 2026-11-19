---
name: proxmox-safe-operations
description: Rules for making changes on a Proxmox VE cluster safely, covering confirmation, snapshots before risky changes, verifying results, and handling HA, backups and in-guest commands. Use whenever the user asks Claude to start, stop, shut down, reboot, delete, resize, migrate, restore, roll back, reconfigure or update a VM, container, node, storage, network, firewall rule, user or backup job, or to run commands, install packages or manage Docker inside a VM.
---

# Safe changes on Proxmox

Every Proxmox tool is labelled 🟢 read-only, 🟡 additive write, or 🔴 destructive (stops, deletes, overwrites, or runs arbitrary commands). Read freely. Change deliberately.

## Before any change

1. **Resolve the exact target.** Use `get_cluster_resources` / `list_vms` / `list_containers` to confirm the node name and VMID. Never guess a VMID from a name the user gave; match it and show both (e.g. "VM 100 `immichserver` on `anbuproxmoxserver`").
2. **Read current state** (`get_vm_status`, `get_vm_config`, `get_container_config`, `get_storage_config`, …) so you can describe the change as a before → after and undo it if needed.
3. **State the plan and its impact** in one or two sentences: what will change, what downtime it causes, whether it is reversible.
4. **Confirmation:**
   - 🟢 read-only: no confirmation needed.
   - 🟡 additive (create snapshot, start a stopped VM, clone, download): proceed if the user clearly asked for it.
   - 🔴 destructive: get an explicit yes **that names the target** before calling the tool, unless the user's request already named that exact target and action ("stop VM 102"). Ask again for anything broader than what they named.
   - Never call `node_power` (host reboot/shutdown), `delete_*`, `rollback_*`, `initialize_gpt`, `prune_storage_backups` or `vm_docker_system_prune` without that explicit, target-specific yes.

## Make the change reversible

- **Snapshot first** before risky VM or container changes (config edits, package upgrades inside the guest, disk moves): `create_vm_snapshot` / `create_container_snapshot` named `pre-<change>-<yyyymmdd>`. If the storage doesn't support snapshots, say so and suggest a backup (`create_vzdump`) instead.
- Prefer **graceful** over forceful: `shutdown_vm` before `stop_vm`, `reboot_vm` before `reset_vm`. Use forceful variants only if graceful fails or times out, and say so.
- For config edits, change only the keys involved; don't resend the whole config.
- On the host, prefer commenting out to deleting (cron lines, config entries).

## Watch for side effects

- **HA-managed guests** (`list_ha_resources`): starting or stopping them directly fights the HA manager. Change the HA resource state (`update_ha_resource` with `state`) instead.
- **Backups:** don't stop or migrate a guest while a `vzdump` task for it is running (`list_node_tasks` with `statusfilter: running`).
- **Shared services:** before stopping a VM, check whether other services depend on it (reverse proxy, DNS, database). If unsure, ask.
- **Network/firewall/SDN:** a wrong rule can cut off access to the cluster, including this connection. Add allow rules before deny rules, and apply SDN changes (`apply_sdn_changes`) only after reviewing the pending config.
- **Storage:** never delete a volume or storage that `get_cluster_resources` or VM configs still reference.

## Commands inside VMs (`vm_*` guest tools)

- They run as **root** in the guest. Prefer the purpose-built tools (`vm_docker_ps`, `vm_service_status`, `vm_system_info`) over `vm_run_shell`.
- Inspect before acting: `vm_docker_ps` before `vm_docker_restart`, `vm_service_status` before `vm_service_manage`.
- Don't upgrade packages, prune Docker or edit files in the guest unless asked. `vm_package_install` installs only what the user named.
- Avoid long-running or interactive commands. Set `timeout_seconds` for slow ones, such as `docker compose pull`.
- If output comes back `truncated`, narrow the command (e.g. `| tail -100`) instead of re-running it as is.

## After the change

1. Check the result: most write tools return a **UPID**. Poll `get_task_status`, and read `get_task_log` if the status isn't `OK`.
2. Re-read the state (`get_vm_status`, `vm_agent_ping`, `vm_docker_ps`…) and confirm it matches the plan.
3. Report briefly: what changed, the verification result, and how to undo it (e.g. "rollback to snapshot `pre-resize-20261119` if needed").

## Respect the configuration

- If a tool is reported as **disabled by PROXMOX_READ_ONLY / PROXMOX_MODULES**, don't look for workarounds. Tell the user which setting blocks it.
- On `403 Permission check failed`, explain which privilege is missing (see the **proxmox-setup** skill). Don't retry with other tools to get around it.
- Never print or ask for API token secrets or passwords in the chat.
