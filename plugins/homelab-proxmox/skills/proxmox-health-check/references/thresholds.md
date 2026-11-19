# Health thresholds

| Area | Info | Warn | Critical |
|---|---|---|---|
| Storage used | ≥ 70 % | ≥ 80 % | ≥ 90 % (thin/ZFS: ≥ 85 %) |
| Node RAM used | ≥ 80 % | ≥ 90 % | ≥ 97 % or swap in heavy use |
| Node load (15 min) / cores | ≥ 0.8 | ≥ 1.5 | ≥ 3 |
| Root filesystem | ≥ 70 % | ≥ 85 % | ≥ 95 % |
| Node uptime | | < 24 h (unexplained) | repeated reboots in 7 days |
| Failed tasks (7 days) | | ≥ 1 | failed `vzdump` or repeated failures |
| Last successful backup | | > 7 days | none ever / no backup job |
| SMART | | wearout ≤ 20 % left | not PASSED, or wearout ≤ 10 % left |
| VM memory vs allocation | | ≥ 95 % | guest OOM in logs |
| Pending APT updates | ≥ 1 | ≥ 50 or kernel update pending | security updates > 30 days old |

## Reading Proxmox values

- `get_cluster_resources` gives `disk`/`maxdisk` and `mem`/`maxmem` in **bytes**, and `cpu` as a **fraction** (0.25 = 25 % of `maxcpu` cores).
- Task `starttime`/`endtime` are **Unix epoch seconds**; `status` is `OK` for success, otherwise an error string.
- `uptime` is in seconds.
- Task types worth knowing: `startall`/`stopall` (node boot/shutdown), `qmstart`/`qmstop`/`qmshutdown`/`qmreboot` (VMs), `vzstart`/`vzstop`/`vzshutdown` (containers), `vzdump` (backup), `aptupdate`, `vncproxy` (console sessions, ignore).

## Byte formatting

Report sizes in GiB/TiB with one decimal, percentages as whole numbers.
