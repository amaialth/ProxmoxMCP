---
name: proxmox-troubleshoot
description: Investigates why a Proxmox node, VM or container went down, rebooted, stopped or became unreachable, by reconstructing a timeline from tasks and logs and finding the root cause. Use when the user says "my server shuts down every night", "why did my VM stop", "the node rebooted", "Proxmox keeps going offline", "VM won't start", "container keeps restarting", or similar outage questions.
---

# Proxmox outage troubleshooting

Find the root cause with evidence before suggesting any fix. Work read-only until the user approves a change.

## 1. Pin down the symptom

From the user's words, establish: **what** went down (node, VM `<id>`, container, a service inside a VM), **when** (one-off or recurring; approximate local time), and **how it came back** (by itself, manually, still down). Don't interrogate: infer what you can and ask at most one question.

## 2. Build the timeline

1. `list_nodes` and `get_node_status`: current uptime gives the last boot time.
2. `get_node_time`: note the node's **timezone**. It often differs from the user's (e.g. a server left on `America/Adak` when the user is in New York). Show every time in the user's zone and mention the node's zone when it differs.
3. `list_node_tasks` with `limit: 200` (add `vmid` to focus on one guest). Convert `starttime` (epoch seconds) to local time and lay out the relevant events in order.

Read the tasks with `references/task-patterns.md`. The most important distinction:

| Pattern | Meaning |
|---|---|
| `stopall` → guest `qmshutdown`/`vzshutdown` → later `startall` | **Clean host shutdown or reboot** (someone or something ran shutdown/reboot) |
| `startall` with **no** `stopall` before it | **Crash / power loss / hard reset**: no clean shutdown happened |
| `qmshutdown`/`qmstop` for one VM, no `stopall` | Guest-level action (user, HA, backup in stop mode, API client) |
| No task at all, VM simply `stopped` | Guest shut itself down (OS shutdown, OOM kill of QEMU, kernel panic) |

**Recurring at the same clock time** almost always means a schedule: a cron job or systemd timer on the host, a backup job in `stop` mode, a script elsewhere calling the API, or a BIOS/UPS power schedule.

## 3. Gather evidence for the suspected cause

- **Host logs:** `get_node_syslog` with `since: "YYYY-MM-DD HH:MM:SS"` around the event; `get_node_journal` takes **Unix epoch seconds**. If the logs only start at the last boot, the journal isn't persistent. Say so and include enabling it in the fixes.
- **Task detail:** `get_task_log` with the UPID of `stopall`/`qmshutdown`/failed tasks.
- **Backups:** `list_backup_jobs`, then check `mode` (`stop` mode shuts VMs down) and `schedule`.
- **HA:** `get_ha_status` / `list_ha_resources`: HA may have stopped, fenced or relocated a guest.
- **Services:** `list_node_services`: look for UPS daemons (`nut-*`, `apcupsd`) that power off on battery.
- **Inside guests** (if the agent responds): `vm_run_shell` with read-only commands such as `crontab -l; ls /etc/cron.d; systemctl list-timers --all; journalctl -b -1 -n 50 --no-pager` to find guest-side shutdowns, OOM kills or scripts that call the Proxmox API or SSH to the host.
- **Docker restarts:** `vm_docker_ps`, then `vm_docker_logs` / `vm_docker_inspect` (exit code 137 = OOM-killed or SIGKILL; 143 = SIGTERM).

## 4. Things the API cannot see

The API cannot read the host's crontab, systemd timers or arbitrary files. When the evidence points at the host itself, give the user **read-only** commands to paste into **Proxmox web UI → node → Shell**, then interpret the output they paste back:

```bash
grep -rnE "shutdown|poweroff|halt|reboot|rtcwake" /etc/crontab /etc/cron.d /var/spool/cron 2>/dev/null; crontab -l
systemctl list-timers --all | grep -iE "shut|power|halt|reboot"
last -x | head -20          # shutdown/reboot history
timedatectl | grep "Time zone"
```

## 5. Report and fix

Present:
1. **Root cause** in one sentence, with confidence (confirmed / likely / possible).
2. **Evidence:** the timeline (local times) and the specific task or log lines.
3. **Fix**, with exact steps. Prefer reversible fixes (comment out a cron line rather than delete it).
4. **Prevention:** e.g. set the correct timezone (`set_node_time`, then restart cron with `manage_node_service`), enable persistent journaling (`mkdir -p /var/log/journal && systemctl restart systemd-journald` in the node shell), switch backups to `snapshot` mode.

Apply fixes through tools only after the user says so, following **proxmox-safe-operations**. Afterwards, offer to verify (e.g. check uptime the next morning past the time the outage used to happen).
