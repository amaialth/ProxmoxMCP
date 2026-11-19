# Reading Proxmox task history

Tasks come from `list_node_tasks` (per node) or `get_cluster_tasks`. Each has a UPID like
`UPID:<node>:<pid>:<pstart>:<starttime-hex>:<type>:<id>:<user>:`, plus `starttime`/`endtime` (epoch seconds), `type`, `id` (VMID), `user` and `status` (`OK` or an error).

## Task types

| Type | What it is |
|---|---|
| `startall` | Node boot: starts guests with `onboot=1`. Marks a boot time. |
| `stopall` | Node shutdown/reboot in progress: stops all guests. Marks a **clean** shutdown. |
| `qmstart` / `qmstop` / `qmshutdown` / `qmreboot` / `qmreset` | VM start / hard stop / clean shutdown / reboot / reset |
| `qmsuspend` / `qmresume` | VM paused/resumed (also happens during snapshot-with-RAM and some backups) |
| `vzstart` / `vzstop` / `vzshutdown` / `vzreboot` | Container equivalents |
| `vzdump` | Backup. Stop mode briefly shuts the guest down. |
| `qmigrate` / `vzmigrate` | Migration (HA or manual) |
| `hamigrate` / `hastart` / `hastop` | HA manager actions |
| `aptupdate` | Package list refresh (daily, harmless) |
| `vncproxy` / `vncshell` / `termproxy` | Console sessions. `vncshell`/`termproxy` without an ID = someone opened the **host** shell. |
| `srvreload` / `srvrestart` | A node service was reloaded/restarted |
| `acmerenew` | Certificate renewal |

## Patterns

**Clean, scheduled host shutdown**
```
02:30:04 stopall
02:30:04 qmshutdown 102
02:30:04 qmshutdown 100
         (nothing until the machine is powered on again)
05:25:46 startall
```
Same `stopall` time on several days ⇒ cron/systemd timer on the host (often `shutdown -h now` at a fixed hour, written in the **node's** timezone).

**Crash / power loss**
```
(last task the previous day)
09:04:13 startall      ← no stopall before it
```
Check SMART, PSU/UPS, `journalctl -b -1` (only if the journal is persistent) and `last -x` in the host shell.

**Backup in stop mode**
```
01:00:00 vzdump 100
01:00:01 qmshutdown 100 (user root@pam)
01:05:40 qmstart 100
```

**Guest died on its own** (no stop task): `get_vm_status` shows `stopped`; check the guest's own logs after starting it, and the host syslog for `oom-kill` or `kvm: exiting`.

## Timezones

`list_node_tasks` times are epoch seconds (UTC-based) and are unaffected by timezone. Cron schedules on the host use the **node's local timezone** (`get_node_time`). A cron line `30 21 * * *` on a node set to `America/Adak` (UTC−10) fires at 02:30 in `America/New_York` (UTC−5).
