# API tokens and permissions

## Create a token

1. Proxmox web UI → **Datacenter → Permissions → API Tokens → Add**.
2. **User**: `root@pam`, or better a dedicated user (create it first under **Datacenter → Permissions → Users → Add**, e.g. `mcp@pve`).
3. **Token ID**: `mcp`. The full token ID becomes `root@pam!mcp` (user + `!` + ID).
4. **Privilege Separation**: on by default (see below).
5. Copy the **Secret** immediately. Proxmox never shows it again.

## Grant a role

**Datacenter → Permissions → Add → API Token Permission**:
- Path: `/`
- API Token: the token
- Role: see table
- Propagate: ✅

### Privilege Separation trap

With Privilege Separation on, the token's effective rights are the **intersection** of the user's rights and the token's rights. A token with `PVEAuditor` whose user has no permissions can do nothing. Fix it either way:
- also add the role as a **User Permission** for the token's user on `/`, or
- edit the token and untick **Privilege Separation** so it inherits the user's rights.

## Roles

| Goal | Role on `/` | Unlocks |
|---|---|---|
| Monitoring only | `PVEAuditor` | All `get_*` / `list_*` tools, cluster status, node stats, logs, tasks |
| Run VMs day to day | `PVEVMAdmin` (+ `PVEAuditor`) | Start/stop/snapshot/configure VMs and containers, guest-agent tools (`vm_*`) |
| Storage/network/firewall | `PVEAdmin` | Plus storage, SDN, firewall, users, node services, `set_node_time` (`Sys.Modify`) |
| Host power | `Administrator` | `node_power` (`Sys.PowerMgmt`) |

## Error → missing privilege

| Error text | Privilege | Typical fix |
|---|---|---|
| `Permission check failed (/, Sys.Audit)` | `Sys.Audit` | `PVEAuditor` on `/` |
| `Permission check failed (/nodes/<node>, Sys.Modify)` | `Sys.Modify` | `PVEAdmin` |
| `Permission check failed (/nodes/<node>, Sys.PowerMgmt)` | `Sys.PowerMgmt` | `Administrator` |
| `Permission check failed (/vms/<id>, VM.Monitor)` | `VM.Monitor` | `PVEVMAdmin` |
| `Permission check failed (/vms/<id>, VM.PowerMgmt)` | `VM.PowerMgmt` | `PVEVMAdmin` |
| `Permission check failed (/storage/<id>, Datastore.Audit)` | `Datastore.Audit` | `PVEAuditor` |

Permission changes apply immediately; no restart is needed.
