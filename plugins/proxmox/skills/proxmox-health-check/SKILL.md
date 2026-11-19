---
name: proxmox-health-check
description: Produces a one-page health report for a Proxmox VE cluster or homelab, covering nodes, storage, VMs, containers, failed tasks, backups, disks, guest agents and Docker containers inside VMs. Use when the user asks "check my Proxmox", "is my homelab healthy", "Proxmox status report", "anything wrong with my server", "how full is my storage", or wants a daily or weekly infrastructure check.
---

# Proxmox health check

Build a concise, evidence-based health report. This skill is **read-only**: never start, stop, change or delete anything while running it. If a fix is needed, list it as a recommendation and ask before acting.

## Collect (in this order, in parallel where possible)

1. **Cluster:** `get_version`, `get_cluster_status` (quorum; skip quietly on 403), `get_cluster_resources` (every node, VM, container and storage in one call).
2. **Each node:** `get_node_status` (CPU, load, memory, root disk, uptime, kernel), `get_node_time` (timezone), `list_node_tasks` with `limit: 100`, `get_node_apt_update` (pending updates).
3. **Storage:** usage from `get_cluster_resources` (`disk` / `maxdisk`, type `storage`).
4. **Disks:** `list_node_disks` per node: SMART `health` and wear.
5. **Backups:** `list_backup_jobs`; in the node tasks look for `vzdump` entries and their status.
6. **Guests:** for each running QEMU VM, `vm_agent_ping`. For VMs whose agent responds, `vm_docker_ps` (if Docker isn't installed, note it and move on). Skip guest calls in read-only mode, where they're hidden.

If a call fails with a permission error, record "not checked (token lacks X)" rather than stopping.

## Evaluate

Use the thresholds in `references/thresholds.md`. Key signals:

- **Storage:** ≥ 80 % warn, ≥ 90 % critical. Thin pools (`lvmthin`, ZFS) are more dangerous when full: VMs pause or corrupt.
- **Memory:** node RAM ≥ 90 % warn; any VM using ≥ 95 % of its allocation warn.
- **Uptime < 24 h:** the node rebooted recently. Check the tasks for a `stopall` (clean shutdown) followed by `startall`; a `startall` with no preceding `stopall` suggests a crash or power loss. Repeated shutdowns at the same clock time point to a schedule. Hand off to **proxmox-troubleshoot**.
- **Tasks:** any task with status other than `OK` in the last 7 days. Name the type (e.g. `vzdump`, `qmstart`) and the error.
- **Backups:** no backup jobs at all, or none successful in 7 days → warn.
- **Disks:** SMART not `PASSED`/`OK`, or wearout ≤ 10 % remaining → critical.
- **Timezone:** if the node timezone differs from the user's, flag it; schedules (cron, backups) run in node-local time.
- **Updates:** many pending packages, or a pending `pve-kernel`/`proxmox-kernel` → info.
- **Guests:** stopped VMs that have `onboot` enabled; running VMs without a responding agent; Docker containers that are `Restarting`, `Exited (non-zero)` or `unhealthy`.
- **Exposure (info only):** Docker containers publishing databases or caches (5432, 3306, 6379, 27017) on `0.0.0.0`.

## Report format

Start with a one-line verdict (✅ Healthy / ⚠️ Needs attention / 🔴 Action required), then:

1. **Findings**, most severe first, each as: what's wrong → evidence (numbers, task IDs, times in the user's timezone) → recommended fix.
2. **Inventory table:** node(s) with CPU, RAM, uptime; storage with % used; VMs/containers with status and memory.
3. **Not checked:** anything skipped for permissions or a missing agent.

Keep it scannable. Convert all epoch timestamps to the user's local time and say which timezone you used. Don't pad the report with healthy items beyond the inventory table.

## Offer next steps

Close with at most three concrete offers, for example "investigate the recent reboot", "show the logs of the restarting container", or "set the node timezone". Make no changes without the user's go-ahead. For any change, follow the **proxmox-safe-operations** skill.
