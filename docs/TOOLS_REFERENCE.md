# Proxmox MCP Tools Reference

> Generated from the tool registry for **v2.0.0** by `bun run docs`. Do not edit by hand.

**324 tools** in 12 modules.

Legend: 🟢 read-only (safe to auto-approve) · 🟡 write, additive (creates/starts things) · 🔴 destructive (deletes, stops, overwrites or runs arbitrary commands).

Hide write tools with `PROXMOX_READ_ONLY=true`, or limit modules with `PROXMOX_MODULES=qemu,nodes,...`.

## Contents

| Module | Tools | 🟢 | 🟡 | 🔴 |
| :--- | ---: | ---: | ---: | ---: |
| [`access` — Access (users, groups, roles, tokens, ACLs)](#module-access) | 27 | 13 | 4 | 10 |
| [`backup` — Backup](#module-backup) | 11 | 6 | 3 | 2 |
| [`cluster` — Cluster](#module-cluster) | 46 | 35 | 5 | 6 |
| [`firewall` — Firewall](#module-firewall) | 32 | 17 | 8 | 7 |
| [`ha` — High Availability](#module-ha) | 14 | 6 | 2 | 6 |
| [`lxc` — LXC containers](#module-lxc) | 25 | 8 | 5 | 12 |
| [`nodes` — Nodes](#module-nodes) | 43 | 30 | 6 | 7 |
| [`pools` — Pools & ACME](#module-pools) | 14 | 9 | 3 | 2 |
| [`qemu` — QEMU virtual machines](#module-qemu) | 41 | 16 | 5 | 20 |
| [`sdn` — Software-defined networking](#module-sdn) | 17 | 10 | 3 | 4 |
| [`storage` — Storage](#module-storage) | 26 | 13 | 8 | 5 |
| [`guest-services` — Guest services (inside VMs via the QEMU guest agent)](#module-guest-services) | 28 | 12 | 2 | 14 |

---

<a id="module-access"></a>
## `access` — Access (users, groups, roles, tokens, ACLs) (27)

### `change_password`

🔴 destructive

Change a user's password.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `password` | `string` | ✅ |  | New password. |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |

### `create_group`

🟡 write

Create a new group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `groupid` | `string` | ✅ |  | Group ID. |
| `comment` | `string` |  |  | Description. |

### `create_role`

🟡 write

Create a new role with specific privileges.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `privs` | `string` | ✅ |  | Comma-separated list of privileges (e.g. 'VM.Allocate,VM.Config.Disk,VM.PowerMgmt'). |
| `roleid` | `string` | ✅ |  | Role ID. |

### `create_user`

🟡 write

Create a new user.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm', e.g. 'myuser@pve'). |
| `comment` | `string` |  |  | Description. |
| `email` | `string` |  |  | Email address. |
| `enable` | `boolean` |  | `true` | Enable user. |
| `expire` | `integer` |  | `0` | Account expiration (Unix epoch, 0 = never). |
| `firstname` | `string` |  |  | First name. |
| `groups` | `string` |  |  | Comma-separated group list. |
| `lastname` | `string` |  |  | Last name. |
| `password` | `string` |  |  | Password (only for pve/pam realms). |

### `create_user_token`

🟡 write

Create a new API token for a user. Returns the token value (shown only once).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `tokenid` | `string` | ✅ |  | Token ID (alphanumeric). |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |
| `comment` | `string` |  |  | Token description. |
| `expire` | `integer` |  | `0` | Expiration (Unix epoch, 0 = never). |
| `privsep` | `boolean` |  | `true` | Enable privilege separation (token has own permissions, not user's full permissions). |

### `delete_group`

🔴 destructive

Delete a group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `groupid` | `string` | ✅ |  | Group ID. |

### `delete_role`

🔴 destructive

Delete a role.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `roleid` | `string` | ✅ |  | Role ID. |

### `delete_user`

🔴 destructive

Delete a user.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` | ✅ |  | User ID to delete (format: 'user@realm'). |

### `delete_user_token`

🔴 destructive

Delete an API token.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `tokenid` | `string` | ✅ |  | Token ID. |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |

### `get_acl`

🟢 read-only

Get the full ACL (access control list) — shows all permission assignments.

_No parameters._

### `get_auth_domain`

🟢 read-only

Get authentication domain configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `realm` | `string` | ✅ |  | Realm ID (e.g. 'pam', 'pve', 'my-ldap'). |

### `get_group`

🟢 read-only

Get group details.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `groupid` | `string` | ✅ |  | Group ID. |

### `get_permissions`

🟢 read-only

Check effective permissions for a user on a given path.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `path` | `string` |  |  | Object path to check (empty = root). |
| `userid` | `string` |  |  | User to check (empty = current user). |

### `get_role`

🟢 read-only

Get role details and its privileges.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `roleid` | `string` | ✅ |  | Role ID. |

### `get_user`

🟢 read-only

Get details for a specific user.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm', e.g. 'admin@pam'). |

### `get_user_token`

🟢 read-only

Get details for a specific API token.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `tokenid` | `string` | ✅ |  | Token ID. |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |

### `list_auth_domains`

🟢 read-only

List configured authentication realms/domains (PAM, PVE, LDAP, AD, OpenID).

_No parameters._

### `list_groups`

🟢 read-only

List all user groups.

_No parameters._

### `list_roles`

🟢 read-only

List all available roles.

_No parameters._

### `list_tfa`

🟢 read-only

List TFA (two-factor auth) entries.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` |  |  | Filter by user ID (empty = all users). |

### `list_user_tokens`

🟢 read-only

List API tokens for a user.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |

### `list_users`

🟢 read-only

List all users in Proxmox.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `enabled` | `boolean` |  | `false` | Only show enabled users. |
| `full` | `boolean` |  | `true` | Include detailed info (groups, tokens, etc.). |

### `sync_auth_domain`

🔴 destructive

Sync users/groups from an external auth domain (LDAP/AD).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `realm` | `string` | ✅ |  | Realm ID to sync. |
| `dry_run` | `boolean` |  | `false` | Only show what would change. |
| `enable_new` | `boolean` |  | `true` | Enable newly synced users. |
| `full` | `boolean` |  | `false` | Full sync (not just incremental). |
| `remove_vanished` | `string` |  |  | Comma-separated: 'entry' (remove users), 'properties' (clear), 'acl' (remove ACLs). |

### `update_acl`

🔴 destructive

Add or remove ACL entries (permission assignments).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `path` | `string` | ✅ |  | Object path (e.g. '/', '/vms/100', '/storage/local', '/pool/mypool'). |
| `roles` | `string` | ✅ |  | Comma-separated role list. |
| `delete` | `boolean` |  | `false` | Remove the ACL entry instead of adding. |
| `groups` | `string` |  |  | Comma-separated group list. |
| `propagate` | `boolean` |  | `true` | Propagate permissions to child objects. |
| `tokens` | `string` |  |  | Comma-separated token list (format: 'user@realm!tokenid'). |
| `users` | `string` |  |  | Comma-separated user list (format: 'user@realm'). |

### `update_group`

🔴 destructive

Update a group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `groupid` | `string` | ✅ |  | Group ID. |
| `comment` | `string` |  |  | Description. |

### `update_role`

🔴 destructive

Update role privileges.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `privs` | `string` | ✅ |  | Comma-separated list of privileges. |
| `roleid` | `string` | ✅ |  | Role ID. |
| `append` | `boolean` |  | `false` | Append privileges instead of replacing. |

### `update_user`

🔴 destructive

Update an existing user.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `userid` | `string` | ✅ |  | User ID (format: 'user@realm'). |
| `append` | `boolean` |  | `false` | Append groups instead of replacing. |
| `comment` | `string` |  |  | Description. |
| `email` | `string` |  |  | Email address. |
| `enable` | `boolean` |  | `true` | Enable/disable user. |
| `expire` | `integer` |  | `-1` | Account expiration (Unix epoch, 0 = never, -1 = don't change). |
| `firstname` | `string` |  |  | First name. |
| `groups` | `string` |  |  | Comma-separated group list. |
| `lastname` | `string` |  |  | Last name. |

---

<a id="module-backup"></a>
## `backup` — Backup (11)

### `create_backup_job`

🟡 write

Create a scheduled backup job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `storage` | `string` | ✅ |  | Target storage ID for backups. |
| `all_guests` | `boolean` |  | `true` | Backup all guests. |
| `comment` | `string` |  |  | Description. |
| `compress` | `string` |  | `"zstd"` | Compression: 'none', 'lzo', 'gzip', 'zstd'. |
| `enabled` | `boolean` |  | `true` | Enable the job. |
| `mailnotification` | `string` |  |  | 'always' or 'failure'. |
| `mailto` | `string` |  |  | Comma-separated email addresses. |
| `maxfiles` | `integer` |  | `0` | Max backup files to keep (0 = unlimited, deprecated - use prune_backups). |
| `mode` | `string` |  | `"snapshot"` | Backup mode: 'snapshot', 'suspend', 'stop'. |
| `node` | `string` |  |  | Only back up guests on this node. |
| `notes_template` | `string` |  |  | Template for backup notes. |
| `prune_backups` | `string` |  |  | Retention schedule (e.g. 'keep-daily=7,keep-weekly=4'). |
| `schedule` | `string` |  | `"daily"` | Schedule in systemd calendar format (e.g. 'daily', 'weekly', '02:00'). |
| `vmid` | `string` |  |  | Comma-separated VMIDs to back up (if not all_guests). |

### `create_vzdump`

🟡 write

Start an immediate backup (vzdump) on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node to run the backup on. |
| `all_guests` | `boolean` |  | `false` | Back up all guests on the node. |
| `compress` | `string` |  | `"zstd"` | Compression: 'none', 'lzo', 'gzip', 'zstd'. |
| `mode` | `string` |  | `"snapshot"` | Backup mode: 'snapshot', 'suspend', 'stop'. |
| `stdout` | `boolean` |  | `false` | Write to stdout instead of storage. |
| `storage` | `string` |  |  | Target storage (empty = default). |
| `vmid` | `string` |  |  | Comma-separated VMIDs (required if not all_guests). |

### `delete_backup_job`

🔴 destructive

Delete a scheduled backup job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Backup job ID. |

### `download_file_restore`

🟡 write

Download a file from a vzdump backup.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `filepath` | `string` | ✅ |  | Path of the file to download from the backup. |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | Storage ID. |
| `volume` | `string` | ✅ |  | Backup volume ID. |

### `get_backup_job`

🟢 read-only

Get details of a specific backup job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Backup job ID. |

### `get_backup_job_included_volumes`

🟢 read-only

Get volumes included in a backup job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Backup job ID. |

### `get_vzdump_defaults`

🟢 read-only

Get the default vzdump configuration for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_vzdump_extractconfig`

🟢 read-only

Extract the guest configuration from a vzdump backup archive.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `volume` | `string` | ✅ |  | Backup volume ID (e.g. 'local:backup/vzdump-qemu-100-2024_01_01-00_00_00.vma.zst'). |

### `list_backup_file_restore`

🟢 read-only

List files in a vzdump backup for single-file restore.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | Storage ID. |
| `volume` | `string` | ✅ |  | Backup volume ID. |
| `filepath` | `string` |  | `"/"` | Path within the backup (default '/'). |

### `list_backup_jobs`

🟢 read-only

List all scheduled backup jobs (vzdump) in the cluster.

_No parameters._

### `update_backup_job`

🔴 destructive

Update a scheduled backup job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Backup job ID. |
| `all_guests` | `boolean` |  | `false` | Backup all guests. |
| `compress` | `string` |  |  | Compression. |
| `delete` | `string` |  |  | Comma-separated properties to delete. |
| `enabled` | `boolean` |  | `true` | Enable/disable. |
| `mode` | `string` |  |  | Backup mode. |
| `node` | `string` |  |  | Node filter. |
| `schedule` | `string` |  |  | Schedule in systemd calendar format. |
| `storage` | `string` |  |  | Target storage ID. |
| `vmid` | `string` |  |  | Comma-separated VMIDs. |

---

<a id="module-cluster"></a>
## `cluster` — Cluster (46)

### `bulk_migrate_guests`

🔴 destructive

Bulk migrate guests to a target node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `target` | `string` | ✅ |  | Target node name. |
| `vms` | `string` |  |  | Comma-separated VMIDs. |

### `bulk_shutdown_guests`

🔴 destructive

Bulk shutdown guests across the cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vms` | `string` |  |  | Comma-separated list of VMIDs (empty = all). |

### `bulk_start_guests`

🟡 write

Bulk start guests across the cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vms` | `string` |  |  | Comma-separated list of VMIDs (empty = all). |

### `create_ceph_osd`

🟡 write

Create a new Ceph OSD on a device.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `dev` | `string` | ✅ |  | Block device for the OSD (e.g. '/dev/sdb'). |
| `node` | `string` | ✅ |  | The node name. |
| `db_dev` | `string` |  |  | Separate block device for DB. |
| `encrypted` | `boolean` |  | `false` | Encrypt the OSD. |
| `wal_dev` | `string` |  |  | Separate block device for WAL. |

### `create_ceph_pool`

🟡 write

Create a new Ceph pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | Pool name. |
| `node` | `string` | ✅ |  | The node name. |
| `application` | `string` |  | `"rbd"` | Pool application (rbd, cephfs, rgw). |
| `min_size` | `integer` |  | `2` | Minimum replicas for I/O (default 2). |
| `pg_num` | `integer` |  | `128` | Number of placement groups (default 128). |
| `size` | `integer` |  | `3` | Number of replicas (default 3). |

### `create_replication_job`

🟡 write

Create a storage replication job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Job ID (format: GUEST-JOBNUM, e.g. '100-0'). |
| `target` | `string` | ✅ |  | Target node. |
| `comment` | `string` |  |  | Description. |
| `disable` | `boolean` |  | `false` | Create disabled. |
| `rate` | `number` |  | `0` | Rate limit in mbps. |
| `schedule` | `string` |  | `"*/15"` | Schedule in systemd calendar format (default '*/15' = every 15 min). |
| `type` | `string` |  | `"local"` | Replication type (currently only 'local'). |

### `delete_replication_job`

🔴 destructive

Delete a replication job.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Replication job ID. |
| `force` | `boolean` |  | `false` | Force removal (skip cleanup). |
| `keep` | `boolean` |  | `false` | Keep replicated data on target. |

### `get_ceph_config`

🟢 read-only

Get the raw Ceph configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_ceph_crush_rules`

🟢 read-only

Get Ceph CRUSH rules.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_ceph_flags`

🟢 read-only

Get Ceph global flags (noout, noscrub, etc.).

_No parameters._

### `get_ceph_metadata`

🟢 read-only

Get Ceph metadata (versions, services across nodes).

_No parameters._

### `get_ceph_status_cluster`

🟢 read-only

Get Ceph cluster status (health, monitors, OSDs, PGs).

_No parameters._

### `get_ceph_status_node`

🟢 read-only

Get Ceph status from a specific node's perspective.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_cluster_config`

🟢 read-only

Get the current cluster configuration (corosync, nodes, join info).

_No parameters._

### `get_cluster_config_nodes`

🟢 read-only

List nodes configured in the cluster.

_No parameters._

### `get_cluster_join_info`

🟢 read-only

Get info needed to join a node to this cluster.

_No parameters._

### `get_cluster_log`

🟢 read-only

Get the cluster log (recent events).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `max_entries` | `integer` |  | `50` | Max log entries. |

### `get_cluster_options`

🟢 read-only

Get datacenter/cluster-wide options (keyboard layout, console, language, etc.).

_No parameters._

### `get_cluster_resources`

🟢 read-only

List all resources across the cluster (VMs, containers, storage, nodes).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `type` | `string` |  |  | Filter by type: 'vm', 'storage', 'node', 'sdn', 'pool' (empty = all). |

### `get_cluster_status`

🟢 read-only

Get cluster status (nodes online, quorum, HA state).

_No parameters._

### `get_cluster_tasks`

🟢 read-only

List recent tasks across all nodes in the cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `limit` | `integer` |  | `50` | Maximum number of tasks to return. |

### `get_cluster_totem`

🟢 read-only

Get the corosync totem configuration.

_No parameters._

### `get_metric_server`

🟢 read-only

Get metric server configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Metric server ID. |

### `get_next_vmid`

🟢 read-only

Get the next available VMID in the cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vmid` | `integer` |  | `0` | Specific VMID to check availability for (0 = auto-assign). |

### `get_replication_job`

🟢 read-only

Get a specific replication job configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Replication job ID (format: GUEST-JOBNUM, e.g. '100-0'). |

### `get_version`

🟢 read-only

Get the Proxmox VE API version information.

_No parameters._

### `join_cluster`

🔴 destructive

Join a node to an existing cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `fingerprint` | `string` | ✅ |  | SSL fingerprint of the cluster node. |
| `hostname` | `string` | ✅ |  | Hostname/IP of existing cluster node. |
| `password` | `string` | ✅ |  | Root password of the cluster node. |
| `force` | `boolean` |  | `false` | Force join even with warnings. |
| `nodeid` | `integer` |  | `0` | Force specific node ID. |

### `list_ceph_fs`

🟢 read-only

List CephFS filesystems.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_ceph_managers`

🟢 read-only

List Ceph managers.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_ceph_mds`

🟢 read-only

List Ceph metadata servers (MDS, for CephFS).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_ceph_monitors`

🟢 read-only

List Ceph monitors.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_ceph_osds`

🟢 read-only

List Ceph OSDs on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_ceph_pools`

🟢 read-only

List Ceph pools.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_dir_mappings`

🟢 read-only

List directory mappings.

_No parameters._

### `list_metric_servers`

🟢 read-only

List configured metric servers (InfluxDB, Graphite).

_No parameters._

### `list_notification_endpoints`

🟢 read-only

List all configured notification endpoints (sendmail, gotify, smtp, webhook).

_No parameters._

### `list_notification_matchers`

🟢 read-only

List all notification matchers (rules that route notifications).

_No parameters._

### `list_notification_targets`

🟢 read-only

List all notification targets.

_No parameters._

### `list_pci_mappings`

🟢 read-only

List PCI device mappings for passthrough.

_No parameters._

### `list_realm_sync_jobs`

🟢 read-only

List realm synchronization jobs.

_No parameters._

### `list_replication_jobs`

🟢 read-only

List all replication jobs in the cluster.

_No parameters._

### `list_scheduled_jobs`

🟢 read-only

List all scheduled cluster jobs (realm-sync, etc.).

_No parameters._

### `list_usb_mappings`

🟢 read-only

List USB device mappings for passthrough.

_No parameters._

### `set_ceph_flags`

🔴 destructive

Set a Ceph global flag.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `flag` | `string` | ✅ |  | Flag name (noout, noscrub, nobackfill, norebalance, nodown, noup, etc.). |
| `value` | `boolean` | ✅ |  | True to set, False to unset. |

### `test_notification_target`

🟡 write

Send a test notification to a target.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | Target name. |

### `update_cluster_options`

🔴 destructive

Update datacenter/cluster-wide options.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `console` | `string` |  |  | Default console viewer: 'applet', 'vv', 'html5', 'xtermjs'. |
| `delete` | `string` |  |  | Comma-separated settings to delete. |
| `description` | `string` |  |  | Datacenter description. |
| `email_from` | `string` |  |  | Default email sender address. |
| `http_proxy` | `string` |  |  | HTTP proxy URL. |
| `keyboard` | `string` |  |  | Keyboard layout (e.g. 'en-us', 'de'). |
| `language` | `string` |  |  | Default language. |
| `max_workers` | `integer` |  | `0` | Max parallel workers. |

---

<a id="module-firewall"></a>
## `firewall` — Firewall (32)

### `add_firewall_ipset_entry`

🟡 write

Add an IP/CIDR to an IP set.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `cidr` | `string` | ✅ |  | IP address or CIDR. |
| `name` | `string` | ✅ |  | IP set name. |
| `comment` | `string` |  |  | Description. |
| `nomatch` | `boolean` |  | `false` | Exclude this entry (nomatch). |

### `create_cluster_firewall_rule`

🟡 write

Create a cluster-level firewall rule.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string` | ✅ |  | 'ACCEPT', 'DROP', 'REJECT'. |
| `type` | `string` | ✅ |  | 'in', 'out', 'group'. |
| `comment` | `string` |  |  | Description. |
| `dest` | `string` |  |  | Destination address/range. |
| `dport` | `string` |  |  | Destination port(s). |
| `enable` | `integer` |  | `1` | 1 = enabled, 0 = disabled. |
| `iface` | `string` |  |  | Network interface. |
| `log` | `string` |  |  | Log level: 'emerg', 'alert', 'crit', 'err', 'warning', 'notice', 'info', 'debug', 'nolog'. |
| `macro` | `string` |  |  | Use predefined macro (e.g. 'SSH', 'HTTP', 'HTTPS', 'Ping'). |
| `pos` | `integer` |  | `-1` | Rule position (-1 = append). |
| `proto` | `string` |  |  | Protocol (tcp, udp, icmp, etc.). |
| `source` | `string` |  |  | Source address/range (CIDR or alias). |
| `sport` | `string` |  |  | Source port(s). |

### `create_container_firewall_rule`

🟡 write

Create a firewall rule for an LXC container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string` | ✅ |  | 'ACCEPT', 'DROP', 'REJECT'. |
| `node` | `string` | ✅ |  | The node name. |
| `type` | `string` | ✅ |  | 'in', 'out', 'group'. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `comment` | `string` |  |  | Description. |
| `dest` | `string` |  |  | Destination CIDR or alias. |
| `dport` | `string` |  |  | Destination port(s). |
| `enable` | `integer` |  | `1` | 1 = enabled, 0 = disabled. |
| `macro` | `string` |  |  | Predefined macro. |
| `proto` | `string` |  |  | Protocol. |
| `source` | `string` |  |  | Source CIDR or alias. |

### `create_firewall_alias`

🟡 write

Create a firewall alias (named IP address or CIDR).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `cidr` | `string` | ✅ |  | IP address or CIDR (e.g. '10.0.0.0/24' or '192.168.1.1'). |
| `name` | `string` | ✅ |  | Alias name. |
| `comment` | `string` |  |  | Description. |

### `create_firewall_group`

🟡 write

Create a new firewall security group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Group name. |
| `comment` | `string` |  |  | Description. |

### `create_firewall_group_rule`

🟡 write

Add a rule to a firewall security group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string` | ✅ |  | 'ACCEPT', 'DROP', 'REJECT'. |
| `group` | `string` | ✅ |  | Security group name. |
| `type` | `string` | ✅ |  | 'in', 'out'. |
| `comment` | `string` |  |  | Description. |
| `dest` | `string` |  |  | Destination address/range. |
| `dport` | `string` |  |  | Destination port(s). |
| `enable` | `integer` |  | `1` | 1 = enabled, 0 = disabled. |
| `macro` | `string` |  |  | Predefined macro. |
| `proto` | `string` |  |  | Protocol. |
| `source` | `string` |  |  | Source address/range. |
| `sport` | `string` |  |  | Source port(s). |

### `create_firewall_ipset`

🟡 write

Create a new firewall IP set.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | IP set name. |
| `comment` | `string` |  |  | Description. |

### `create_vm_firewall_rule`

🟡 write

Create a firewall rule for a QEMU VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string` | ✅ |  | 'ACCEPT', 'DROP', 'REJECT'. |
| `node` | `string` | ✅ |  | The node name. |
| `type` | `string` | ✅ |  | 'in', 'out', 'group'. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `comment` | `string` |  |  | Description. |
| `dest` | `string` |  |  | Destination CIDR or alias. |
| `dport` | `string` |  |  | Destination port(s). |
| `enable` | `integer` |  | `1` | 1 = enabled, 0 = disabled. |
| `macro` | `string` |  |  | Predefined macro. |
| `proto` | `string` |  |  | Protocol. |
| `source` | `string` |  |  | Source CIDR or alias. |

### `delete_cluster_firewall_rule`

🔴 destructive

Delete a cluster-level firewall rule.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `pos` | `integer` | ✅ |  | Rule position to delete. |

### `delete_firewall_alias`

🔴 destructive

Delete a firewall alias.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | Alias name. |

### `delete_firewall_ipset_entry`

🔴 destructive

Remove an IP/CIDR from an IP set.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `cidr` | `string` | ✅ |  | IP address or CIDR to remove. |
| `name` | `string` | ✅ |  | IP set name. |

### `get_cluster_firewall_options`

🟢 read-only

Get cluster-wide firewall options (enable, policy_in, policy_out, etc.).

_No parameters._

### `get_cluster_firewall_rule`

🟢 read-only

Get a specific cluster firewall rule.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `pos` | `integer` | ✅ |  | Rule position number. |

### `get_container_firewall_options`

🟢 read-only

Get firewall options for an LXC container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `get_firewall_group_rules`

🟢 read-only

List rules in a firewall security group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Security group name. |

### `get_firewall_refs`

🟢 read-only

Get available firewall references (aliases, ipsets, names usable in rules).

_No parameters._

### `get_node_firewall_log`

🟢 read-only

Get firewall log for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `limit` | `integer` |  | `50` | Max entries. |

### `get_node_firewall_options`

🟢 read-only

Get firewall options for a specific node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_vm_firewall_options`

🟢 read-only

Get firewall options for a QEMU VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `list_cluster_firewall_rules`

🟢 read-only

List cluster-level firewall rules.

_No parameters._

### `list_container_firewall_rules`

🟢 read-only

List firewall rules for an LXC container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `list_firewall_aliases`

🟢 read-only

List cluster firewall aliases (named IP addresses/ranges).

_No parameters._

### `list_firewall_groups`

🟢 read-only

List firewall security groups (reusable sets of rules).

_No parameters._

### `list_firewall_ipset_entries`

🟢 read-only

List entries in a firewall IP set.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | IP set name. |

### `list_firewall_ipsets`

🟢 read-only

List cluster firewall IP sets (named groups of IPs).

_No parameters._

### `list_firewall_macros`

🟢 read-only

List available firewall macros (predefined rule sets like SSH, HTTP, etc.).

_No parameters._

### `list_node_firewall_rules`

🟢 read-only

List firewall rules for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_vm_firewall_rules`

🟢 read-only

List firewall rules for a QEMU VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `set_cluster_firewall_options`

🔴 destructive

Set cluster-wide firewall options.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `delete` | `string` |  |  | Comma-separated options to delete. |
| `ebtables` | `integer` |  | `-1` | 1 to enable ebtables rules, 0 to disable, -1 to not change. |
| `enable` | `integer` |  | `-1` | 1 to enable, 0 to disable, -1 to not change. |
| `log_ratelimit` | `string` |  |  | Log rate limit (e.g. 'enable=1,rate=1/second,burst=5'). |
| `policy_in` | `string` |  |  | Default input policy: 'ACCEPT', 'REJECT', 'DROP'. |
| `policy_out` | `string` |  |  | Default output policy: 'ACCEPT', 'REJECT', 'DROP'. |

### `set_node_firewall_options`

🔴 destructive

Set firewall options for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `delete` | `string` |  |  | Comma-separated options to delete. |
| `enable` | `integer` |  | `-1` | 1 = enable, 0 = disable, -1 = don't change. |
| `log_level_in` | `string` |  |  | Input log level. |
| `log_level_out` | `string` |  |  | Output log level. |
| `ndp` | `integer` |  | `-1` | 1 = enable NDP, 0 = disable, -1 = don't change. |
| `nf_conntrack_max` | `integer` |  | `0` | Max conntrack entries (0 = don't change). |

### `set_vm_firewall_options`

🔴 destructive

Set firewall options for a QEMU VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `delete` | `string` |  |  | Comma-separated options to delete. |
| `dhcp` | `integer` |  | `-1` | 1 = enable DHCP. |
| `enable` | `integer` |  | `-1` | 1 = enable, 0 = disable. |
| `ipfilter` | `integer` |  | `-1` | 1 = enable IP filter. |
| `macfilter` | `integer` |  | `-1` | 1 = enable MAC filter. |
| `policy_in` | `string` |  |  | Input policy. |
| `policy_out` | `string` |  |  | Output policy. |

### `update_cluster_firewall_rule`

🔴 destructive

Update a cluster-level firewall rule.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `pos` | `integer` | ✅ |  | Rule position to update. |
| `action` | `string` |  |  | 'ACCEPT', 'DROP', 'REJECT'. |
| `comment` | `string` |  |  | Description. |
| `delete` | `string` |  |  | Comma-separated properties to delete. |
| `dest` | `string` |  |  | Destination address/range. |
| `dport` | `string` |  |  | Destination port(s). |
| `enable` | `integer` |  | `-1` | 1 = enabled, 0 = disabled, -1 = don't change. |
| `macro` | `string` |  |  | Predefined macro. |
| `moveto` | `integer` |  | `-1` | Move rule to this position. |
| `proto` | `string` |  |  | Protocol. |
| `source` | `string` |  |  | Source address/range. |
| `sport` | `string` |  |  | Source port(s). |

---

<a id="module-ha"></a>
## `ha` — High Availability (14)

### `create_ha_group`

🟡 write

Create an HA group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Group ID. |
| `nodes` | `string` | ✅ |  | Node list with optional priority (e.g. 'node1:2,node2:1' — higher = preferred). |
| `comment` | `string` |  |  | Description. |
| `nofailback` | `boolean` |  | `false` | If true, don't fail back to higher-priority nodes once recovered. |
| `restricted` | `boolean` |  | `false` | Only run on nodes in this group (otherwise runs anywhere but prefers group nodes). |

### `create_ha_resource`

🟡 write

Add a resource to HA management.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `sid` | `string` | ✅ |  | Resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101'). |
| `comment` | `string` |  |  | Description. |
| `group` | `string` |  |  | HA group name. |
| `max_relocate` | `integer` |  | `1` | Max relocations on failure. |
| `max_restart` | `integer` |  | `1` | Max restarts on failure. |
| `state` | `string` |  | `"started"` | Desired state: 'started', 'stopped', 'enabled', 'disabled', 'ignored'. |

### `delete_ha_group`

🔴 destructive

Delete an HA group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Group ID. |

### `delete_ha_resource`

🔴 destructive

Remove a resource from HA management.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `sid` | `string` | ✅ |  | Resource ID (format: 'type:vmid'). |

### `get_ha_group`

🟢 read-only

Get HA group configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Group ID. |

### `get_ha_manager_status`

🟢 read-only

Get detailed HA manager status.

_No parameters._

### `get_ha_resource`

🟢 read-only

Get HA resource configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `sid` | `string` | ✅ |  | HA resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101'). |

### `get_ha_status`

🟢 read-only

Get HA manager status (active, quorum, manager status).

_No parameters._

### `list_ha_groups`

🟢 read-only

List HA groups (define which nodes can run HA resources).

_No parameters._

### `list_ha_resources`

🟢 read-only

List all HA-managed resources.

_No parameters._

### `migrate_ha_resource`

🔴 destructive

Request migration of an HA resource to a different node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Target node. |
| `sid` | `string` | ✅ |  | Resource ID. |

### `relocate_ha_resource`

🔴 destructive

Request relocation of an HA resource to a different node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Target node. |
| `sid` | `string` | ✅ |  | Resource ID. |

### `update_ha_group`

🔴 destructive

Update an HA group.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `group` | `string` | ✅ |  | Group ID. |
| `comment` | `string` |  |  | Description. |
| `delete` | `string` |  |  | Comma-separated properties to delete. |
| `nodes` | `string` |  |  | Node list with optional priority. |
| `nofailback` | `boolean` |  | `false` | Don't fail back. |
| `restricted` | `boolean` |  | `false` | Only run on group nodes. |

### `update_ha_resource`

🔴 destructive

Update an HA resource configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `sid` | `string` | ✅ |  | Resource ID. |
| `comment` | `string` |  |  | Description. |
| `delete` | `string` |  |  | Comma-separated properties to delete. |
| `group` | `string` |  |  | HA group name. |
| `max_relocate` | `integer` |  | `-1` | Max relocations (-1 = don't change). |
| `max_restart` | `integer` |  | `-1` | Max restarts (-1 = don't change). |
| `state` | `string` |  |  | Desired state. |

---

<a id="module-lxc"></a>
## `lxc` — LXC containers (25)

### `clone_container`

🟡 write

Clone a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `newid` | `integer` | ✅ |  | ID for the new container. |
| `node` | `string` | ✅ |  | The source node name. |
| `vmid` | `integer` | ✅ |  | The source container ID. |
| `description` | `string` |  |  | Description. |
| `full` | `boolean` |  | `true` | Full clone (True) or linked clone (False). |
| `hostname` | `string` |  |  | Hostname for the clone. |
| `pool` | `string` |  |  | Resource pool. |
| `snapname` | `string` |  |  | Snapshot to clone from. |
| `storage` | `string` |  |  | Target storage for full clone. |
| `target` | `string` |  |  | Target node (default: same node). |

### `convert_container_to_template`

🔴 destructive

Convert a container into a template (irreversible).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `create_container`

🟡 write

Create a new LXC container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `ostemplate` | `string` | ✅ |  | Template volume (e.g. 'local:vztmpl/debian-12-standard_12.2-1_amd64.tar.zst'). |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `cores` | `integer` |  | `1` | CPU cores (default 1). |
| `cpulimit` | `number` |  | `0` | CPU limit (0 = unlimited). |
| `description` | `string` |  |  | Container description. |
| `features` | `string` |  |  | Comma-separated features (e.g. 'nesting=1,keyctl=1'). |
| `hostname` | `string` |  |  | Container hostname. |
| `memory` | `integer` |  | `512` | Memory in MB (default 512). |
| `mp0` | `string` |  |  | Mount point (e.g. 'local-lvm:4,mp=/mnt/data'). |
| `nameserver` | `string` |  |  | DNS nameserver. |
| `net0` | `string` |  |  | Network config (e.g. 'name=eth0,bridge=vmbr0,ip=dhcp'). |
| `onboot` | `boolean` |  | `false` | Start on host boot. |
| `password` | `string` |  |  | Root password. |
| `pool` | `string` |  |  | Resource pool. |
| `rootfs` | `string` |  |  | Root filesystem spec (e.g. 'local-lvm:8' for 8GB). |
| `searchdomain` | `string` |  |  | DNS search domain. |
| `ssh_public_keys` | `string` |  |  | SSH public keys (newline delimited). |
| `start` | `boolean` |  | `false` | Start after creation. |
| `storage` | `string` |  | `"local"` | Storage for rootfs (default 'local'). |
| `swap` | `integer` |  | `512` | Swap in MB (default 512). |
| `tags` | `string` |  |  | Tags for the container. |
| `unprivileged` | `boolean` |  | `true` | Create an unprivileged container (default True, recommended). |

### `create_container_snapshot`

🟡 write

Create a snapshot of a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | Snapshot name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `description` | `string` |  |  | Snapshot description. |

### `delete_container`

🔴 destructive

Delete a container. Must be stopped first unless force=True.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `destroy_unreferenced_disks` | `boolean` |  | `true` | Destroy unreferenced disks. |
| `force` | `boolean` |  | `false` | Force destroy even if running. |
| `purge` | `boolean` |  | `false` | Remove from replication, HA, backup and ACLs too. |

### `delete_container_snapshot`

🔴 destructive

Delete a container snapshot.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | Snapshot name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `force` | `boolean` |  | `false` | Force delete. |

### `get_container_config`

🟢 read-only

Get the configuration of a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `get_container_feature`

🟢 read-only

Check if a feature is available for a container (snapshot, clone, copy).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `feature` | `string` | ✅ |  | Feature to check ('snapshot', 'clone', 'copy'). |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `get_container_interfaces`

🟢 read-only

Get network interfaces and IPs of a running container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `get_container_pending`

🟢 read-only

Get pending configuration changes for a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `get_container_rrddata`

🟢 read-only

Get RRD statistics data for a container (CPU, memory, disk, network over time).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `timeframe` | `string` |  | `"hour"` | Time range: 'hour', 'day', 'week', 'month', 'year'. |

### `get_container_status`

🟢 read-only

Get the current runtime status of a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID (CTID). |

### `list_container_snapshots`

🟢 read-only

List all snapshots of a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `list_containers`

🟢 read-only

List all LXC containers on a node with status, memory, CPU, and disk info.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `migrate_container`

🔴 destructive

Migrate a container to another node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The source node. |
| `target` | `string` | ✅ |  | Target node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `online` | `boolean` |  | `false` | Live migration. |
| `restart` | `boolean` |  | `false` | Restart container after migration (for non-live). |
| `target_storage` | `string` |  |  | Target storage mapping. |

### `move_container_volume`

🔴 destructive

Move a container volume to different storage or to another container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `volume` | `string` | ✅ |  | Volume name (e.g. 'rootfs', 'mp0'). |
| `delete_original` | `boolean` |  | `false` | Delete original after move. |
| `storage` | `string` |  |  | Target storage. |
| `target_vmid` | `integer` |  | `0` | Target container ID. |
| `target_volume` | `string` |  |  | Target volume slot. |

### `reboot_container`

🔴 destructive

Reboot a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `timeout` | `integer` |  | `0` | Timeout in seconds. |

### `resize_container_disk`

🔴 destructive

Resize a container disk/volume.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `disk` | `string` | ✅ |  | Disk name (e.g. 'rootfs', 'mp0'). |
| `node` | `string` | ✅ |  | The node name. |
| `size` | `string` | ✅ |  | New size or increment (e.g. '10G', '+2G'). |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `resume_container`

🟡 write

Resume a suspended container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `rollback_container_snapshot`

🔴 destructive

Rollback a container to a previous snapshot.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | Snapshot name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `shutdown_container`

🔴 destructive

Gracefully shut down a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `force_stop` | `boolean` |  | `true` | Force stop after timeout. |
| `timeout` | `integer` |  | `0` | Timeout in seconds before force stop. |

### `start_container`

🟡 write

Start a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `stop_container`

🔴 destructive

Hard-stop a container (immediate, like power off).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `suspend_container`

🔴 destructive

Suspend (freeze) a container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |

### `update_container_config`

🔴 destructive

Update the configuration of an existing container.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The container ID. |
| `cores` | `integer` |  | `0` | CPU cores. |
| `cpulimit` | `number` |  | `-1` | CPU limit (0 = unlimited). |
| `delete` | `string` |  |  | Comma-separated list of settings to delete. |
| `description` | `string` |  |  | Description. |
| `features` | `string` |  |  | Comma-separated features. |
| `hostname` | `string` |  |  | Container hostname. |
| `memory` | `integer` |  | `0` | Memory in MB. |
| `nameserver` | `string` |  |  | DNS nameserver. |
| `net0` | `string` |  |  | Network config. |
| `onboot` | `any` |  | `null` | Start on boot. |
| `searchdomain` | `string` |  |  | DNS search domain. |
| `swap` | `integer` |  | `-1` | Swap in MB. |
| `tags` | `string` |  |  | Tags for the container. |

---

<a id="module-nodes"></a>
## `nodes` — Nodes (43)

### `bulk_start_node_vms`

🟡 write

Bulk start VMs/containers on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |
| `vms` | `string` |  |  | Comma-separated VMIDs/CTIDs to start |

### `bulk_stop_node_vms`

🔴 destructive

Bulk stop VMs/containers on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |
| `timeout` | `integer` |  |  | Timeout in seconds per guest |

### `create_node_network_interface`

🟡 write

Create a network interface on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `iface` | `string` | ✅ |  | Interface name (e.g. 'vmbr1'). |
| `node` | `string` | ✅ |  | The node name. |
| `type` | `string` | ✅ |  | Interface type (bridge, bond, eth, alias, vlan, OVSBridge, OVSPort, OVSIntPort, OVSBond). |
| `address` | `string` |  |  | IP address (CIDR notation or IP). |
| `autostart` | `boolean` |  | `true` | Whether to start on boot. |
| `bridge_ports` | `string` |  |  | Bridge ports (for bridge type). |
| `comments` | `string` |  |  | Comments for the interface. |
| `gateway` | `string` |  |  | Default gateway. |
| `netmask` | `string` |  |  | Subnet mask. |

### `download_appliance_template`

🟡 write

Download an appliance template to local storage.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | Target storage ID. |
| `template` | `string` | ✅ |  | Template name to download. |

### `get_disk_smart`

🟢 read-only

Get S.M.A.R.T. health data for a disk.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `disk` | `string` | ✅ |  | Disk device path (e.g. '/dev/sda'). |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_aplinfo`

🟢 read-only

List available appliance templates (LXC templates) that can be downloaded.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_apt_update`

🟢 read-only

List available package updates on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_capabilities_qemu`

🟢 read-only

Get QEMU capabilities for a node: supported CPU models, machine types, etc.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_config`

🟢 read-only

Get the configuration of a node (description, wakeonlan, etc.).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_disks`

🟢 read-only

List physical disks on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_dns`

🟢 read-only

Get DNS settings for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_hardware_pci`

🟢 read-only

List PCI hardware devices on a node (for passthrough).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_hardware_usb`

🟢 read-only

List USB hardware devices on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_hosts`

🟢 read-only

Get the /etc/hosts file content for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_journal`

🟢 read-only

Read systemd journal entries from a node.

Tip: for date strings like '2026-11-19 02:00:00' use get_node_syslog instead.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `endcursor` | `string` |  |  | Journal cursor to end at. |
| `lastentries` | `integer` |  | `50` | Maximum number of entries to return |
| `since` | `integer` |  |  | Unix epoch seconds |
| `startcursor` | `string` |  |  | Journal cursor to start from (for paging). |
| `until` | `integer` |  |  | Unix epoch seconds |

### `get_node_netstat`

🟢 read-only

Get network statistics for a node (per-interface traffic).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_network`

🟢 read-only

Get network interface configuration for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_network_interface`

🟢 read-only

Get details for a specific network interface.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `iface` | `string` | ✅ |  | Interface name (e.g. 'vmbr0', 'eth0'). |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_report`

🟢 read-only

Generate a system report for a node (useful for diagnostics).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_status`

🟢 read-only

Get detailed status of a specific node including CPU, memory, disk, uptime, and kernel info.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name (e.g. 'pve1'). |

### `get_node_storage_scan`

🟢 read-only

Scan for available storage targets (NFS, CIFS, iSCSI, LVM, ZFS, PBS).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `scan_type` | `string` | ✅ |  | Type to scan: 'nfs', 'cifs', 'iscsi', 'lvm', 'lvmthin', 'zfs', 'pbs'. |
| `server` | `string` |  |  | Server address (required for nfs, cifs, iscsi, pbs). |

### `get_node_subscription`

🟢 read-only

Get subscription status for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_syslog`

🟢 read-only

Read system log (syslog) entries from a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `limit` | `integer` |  | `50` | Max number of log lines to return (default 50). |
| `since` | `string` |  |  | Only show entries since this date (YYYY-MM-DD). |
| `start` | `integer` |  | `0` | Start line number. |
| `until` | `string` |  |  | Only show entries until this date (YYYY-MM-DD). |

### `get_node_time`

🟢 read-only

Get the current time and timezone of a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_node_version`

🟢 read-only

Get Proxmox VE version information for a specific node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_task_log`

🟢 read-only

Get log output of a specific task.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `upid` | `string` | ✅ |  | The task UPID string. |
| `limit` | `integer` |  | `50` | Max lines to return. |
| `start` | `integer` |  | `0` | Start line number. |

### `get_task_status`

🟢 read-only

Get the status of a specific task by its UPID.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `upid` | `string` | ✅ |  | The task UPID string. |

### `list_lvm_pools`

🟢 read-only

List LVM volume groups on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |

### `list_node_disks`

🟢 read-only

List physical disks on a node with health, size, model, serial, and wearout status.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |
| `include_partitions` | `boolean` |  |  | Include partitions in disk list |

### `list_node_pci_devices`

🟢 read-only

List PCI devices on a node (useful for GPU or network passthrough configuration).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |
| `pci_class_blacklist` | `string` |  |  | Class blacklist filter |

### `list_node_services`

🟢 read-only

List all system services on a node (pve, ssh, cron, etc.).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_node_tasks`

🟢 read-only

List recent tasks on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `limit` | `integer` |  | `50` | Max tasks to return (default 50). |
| `start` | `integer` |  | `0` | Offset for paging. |
| `statusfilter` | `string` |  |  | Filter by status ('running', 'ok', 'error', etc.). |
| `typefilter` | `string` |  |  | Filter by task type (e.g. 'qmstart', 'vzstart', 'vzcreate'). |
| `vmid` | `integer` |  | `0` | Filter by VM ID (0 = all). |

### `list_node_usb_devices`

🟢 read-only

List USB devices attached to a node (useful for USB passthrough).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |

### `list_nodes`

🟢 read-only

List all nodes in the Proxmox cluster with their status, CPU, memory, and uptime.

_No parameters._

### `manage_node_service`

🔴 destructive

Start, stop, restart, or reload a system service on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string` | ✅ |  | One of 'start', 'stop', 'restart', 'reload'. |
| `node` | `string` | ✅ |  | The node name. |
| `service` | `string` | ✅ |  | Service name (e.g. 'pvedaemon', 'pveproxy', 'ssh', 'cron', 'postfix'). |

### `node_power`

🔴 destructive

Reboot or shut down a Proxmox node (the physical host). All guests on it are stopped or migrated according to their HA/startup settings.

Requires Sys.PowerMgmt on /nodes/{node}.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string (reboot \\| shutdown)` | ✅ |  | Power action |
| `confirm` | `string` | ✅ |  | Repeat the node name to confirm |
| `node` | `string` | ✅ |  | Node name |

### `run_apt_update`

🟡 write

Refresh the package index on a node (apt update).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `set_node_time`

🔴 destructive

Set the timezone of a node (writes /etc/timezone and /etc/localtime on the host).

Requires Sys.Modify on /nodes/{node}. Restart cron afterwards (manage_node_service) so scheduled jobs use the new zone.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Node name |
| `timezone` | `string` | ✅ |  | IANA timezone, e.g. America/New_York |

### `startall_node`

🟡 write

Start all VMs and containers on a node (respecting boot order).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `force` | `boolean` |  | `false` | Force start even if already running. |
| `vms` | `string` |  |  | Comma-separated list of VMIDs to start (empty = all). |

### `stop_node_task`

🔴 destructive

Stop or cancel an active background task on a node using its UPID.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name |
| `upid` | `string` | ✅ |  | Task UPID |

### `stop_task`

🔴 destructive

Stop (abort) a running task.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `upid` | `string` | ✅ |  | The task UPID string. |

### `stopall_node`

🔴 destructive

Stop all VMs and containers on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vms` | `string` |  |  | Comma-separated list of VMIDs to stop (empty = all). |

### `wakeonlan_node`

🟡 write

Send a Wake-on-LAN magic packet to a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

---

<a id="module-pools"></a>
## `pools` — Pools & ACME (14)

### `create_pool`

🟡 write

Create a resource pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `poolid` | `string` | ✅ |  | Pool ID. |
| `comment` | `string` |  |  | Description. |

### `delete_pool`

🔴 destructive

Delete a resource pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `poolid` | `string` | ✅ |  | Pool ID. |

### `get_acme_account`

🟢 read-only

Get ACME account details.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` |  | `"default"` | Account name (default: 'default'). |

### `get_acme_directories`

🟢 read-only

List known ACME directory URLs.

_No parameters._

### `get_acme_plugin`

🟢 read-only

Get ACME plugin configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | ✅ |  | Plugin ID. |

### `get_acme_tos`

🟢 read-only

Get the ACME Terms of Service URL.

_No parameters._

### `get_node_certificates`

🟢 read-only

Get certificate info for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `get_pool`

🟢 read-only

Get pool configuration and members.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `poolid` | `string` | ✅ |  | Pool ID. |

### `list_acme_accounts`

🟢 read-only

List ACME (Let's Encrypt) accounts.

_No parameters._

### `list_acme_plugins`

🟢 read-only

List ACME DNS challenge plugins.

_No parameters._

### `list_pools`

🟢 read-only

List all resource pools.

_No parameters._

### `order_node_certificate`

🟡 write

Order/renew ACME certificate for a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `force` | `boolean` |  | `false` | Force renewal even if not due. |

### `register_acme_account`

🟡 write

Register a new ACME account.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `contact` | `string` | ✅ |  | Contact email address. |
| `directory` | `string` |  |  | ACME directory URL (empty = Let's Encrypt production). |
| `name` | `string` |  | `"default"` | Account name. |
| `tos_url` | `string` |  |  | Terms of service URL to accept. |

### `update_pool`

🔴 destructive

Update a resource pool (add/remove members).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `poolid` | `string` | ✅ |  | Pool ID. |
| `comment` | `string` |  |  | Description. |
| `delete` | `boolean` |  | `false` | If true, remove the specified vms/storage from the pool instead of adding. |
| `storage` | `string` |  |  | Comma-separated storage IDs to add/remove. |
| `vms` | `string` |  |  | Comma-separated VMIDs to add/remove. |

---

<a id="module-qemu"></a>
## `qemu` — QEMU virtual machines (41)

### `clone_vm`

🟡 write

Clone a VM to create a new one. Can be a full copy or linked clone.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `newid` | `integer` | ✅ |  | The VMID for the new clone. |
| `node` | `string` | ✅ |  | The source node name. |
| `vmid` | `integer` | ✅ |  | The source VM ID. |
| `description` | `string` |  |  | Description for the clone. |
| `full` | `boolean` |  | `true` | Full clone (True) or linked clone (False). |
| `name` | `string` |  |  | Name for the clone. |
| `pool` | `string` |  |  | Resource pool. |
| `snapname` | `string` |  |  | Snapshot name to clone from. |
| `storage` | `string` |  |  | Target storage for full clone. |
| `target` | `string` |  |  | Target node for the clone (default: same node). |

### `convert_vm_to_template`

🔴 destructive

Convert a VM into a template (irreversible).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `create_vm`

🟡 write

Create a new QEMU virtual machine.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID number. |
| `agent` | `string` |  |  | QEMU guest agent: '1' to enable, 'enabled=1,fstrim_cloned_disks=1'. |
| `bios` | `string` |  | `"seabios"` | BIOS type: seabios, ovmf (UEFI). |
| `boot` | `string` |  |  | Boot order, for example scsi0 then ide2 then net0. |
| `cdrom` | `string` |  |  | CD-ROM ISO image path. |
| `cores` | `integer` |  | `1` | Number of CPU cores per socket (default 1). |
| `cpu` | `string` |  | `"host"` | CPU type (default 'host'). |
| `description` | `string` |  |  | VM description. |
| `ide2` | `string` |  |  | IDE device, often used for CD-ROM (e.g. 'local:iso/ubuntu.iso,media=cdrom'). |
| `machine` | `string` |  |  | Machine type (e.g. 'q35', 'i440fx'). |
| `memory` | `integer` |  | `2048` | Memory in MB (default 2048). |
| `name` | `string` |  |  | VM name. |
| `net0` | `string` |  |  | Network device (e.g. 'virtio,bridge=vmbr0'). |
| `onboot` | `boolean` |  | `false` | Start on host boot. |
| `ostype` | `string` |  | `"l26"` | OS type: l26 (Linux 2.6+), win10, win11, wxp, other, etc. |
| `pool` | `string` |  |  | Resource pool to add the VM to. |
| `scsi0` | `string` |  |  | First SCSI disk (e.g. 'local-lvm:32' for 32GB on local-lvm). |
| `scsihw` | `string` |  | `"virtio-scsi-single"` | SCSI controller: virtio-scsi-single, virtio-scsi-pci, lsi, megasas, pvscsi. |
| `sockets` | `integer` |  | `1` | Number of CPU sockets (default 1). |
| `start` | `boolean` |  | `false` | Start the VM after creation. |
| `tags` | `string` |  |  | Tags for the VM. |

### `create_vm_snapshot`

🟡 write

Create a snapshot of a VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | Snapshot name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `description` | `string` |  |  | Snapshot description. |
| `vmstate` | `boolean` |  | `false` | Include RAM state (for running VMs). |

### `delete_vm`

🔴 destructive

Delete a VM. The VM must be stopped first.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `destroy_unreferenced_disks` | `boolean` |  | `true` | Also destroy unreferenced disks owned by the VM. |
| `purge` | `boolean` |  | `false` | Remove from replication, HA, backup jobs and ACLs too. |

### `delete_vm_snapshot`

🔴 destructive

Delete a VM snapshot.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | Snapshot name to delete. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `force` | `boolean` |  | `false` | Force delete even if snapshot is in use. |

### `dump_vm_cloudinit`

🟢 read-only

Dump the Cloud-Init generated config file (user-data, network-data, or meta-data).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `type` | `string` |  | `"user"` | Config type: 'user', 'network', or 'meta'. |

### `get_vm_cloudinit`

🟢 read-only

Get Cloud-Init configuration for a VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_config`

🟢 read-only

Get the configuration of a VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `current` | `boolean` |  | `true` | If True, return current (runtime) config. If False, return pending config. |

### `get_vm_feature`

🟢 read-only

Check if a specific feature is available/supported for a VM (e.g. snapshot, clone, copy).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `feature` | `string` | ✅ |  | Feature to check ('snapshot', 'clone', 'copy'). |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_pending`

🟢 read-only

Get pending configuration changes for a VM (not yet applied).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_rrddata`

🟢 read-only

Get RRD statistics data for a VM (CPU, memory, disk, network over time).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `timeframe` | `string` |  | `"hour"` | Time range: 'hour', 'day', 'week', 'month', 'year'. |

### `get_vm_snapshot_config`

🟢 read-only

Get the configuration stored in a VM snapshot.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | The snapshot name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_spiceproxy`

🟢 read-only

Create a SPICE proxy connection for a VM console.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_status`

🟢 read-only

Get the current runtime status of a VM (state, CPU, memory, disk, network, uptime).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `get_vm_vncproxy`

🟢 read-only

Create a VNC proxy connection ticket for a VM (for console access).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `websocket` | `boolean` |  | `true` | Use WebSocket connection. |

### `list_vm_snapshots`

🟢 read-only

List all snapshots of a VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `list_vms`

🟢 read-only

List all QEMU virtual machines on a node with status, memory, CPU, and disk info.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `migrate_vm`

🔴 destructive

Migrate a VM to another node in the cluster.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The source node. |
| `target` | `string` | ✅ |  | Target node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `online` | `boolean` |  | `false` | Live migration (True) or offline (False). |
| `targetstorage` | `string` |  |  | Target storage mapping for migration (e.g. 'local-lvm'). |
| `with_local_disks` | `boolean` |  | `false` | Migrate local disks as well. |

### `move_vm_disk`

🔴 destructive

Move a VM disk to different storage or attach to another VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `disk` | `string` | ✅ |  | Source disk name (e.g. 'scsi0'). |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `delete_original` | `boolean` |  | `false` | Delete the original disk after moving. |
| `storage` | `string` |  |  | Target storage ID (for moving to different storage). |
| `target_disk` | `string` |  |  | Target disk slot on the target VM. |
| `target_vmid` | `integer` |  | `0` | Target VM ID (for moving disk to another VM). |

### `reboot_vm`

🔴 destructive

Reboot a VM via ACPI.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `timeout` | `integer` |  | `0` | Wait timeout in seconds. |

### `reset_vm`

🔴 destructive

Hard reset a VM (like pressing the reset button).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `resize_vm_disk`

🔴 destructive

Resize a VM disk. Can only grow, not shrink.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `disk` | `string` | ✅ |  | Disk name (e.g. 'scsi0', 'virtio0', 'ide0'). |
| `node` | `string` | ✅ |  | The node name. |
| `size` | `string` | ✅ |  | New size or size increment (e.g. '50G', '+10G'). |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `resume_vm`

🟡 write

Resume a suspended/paused VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `rollback_vm_snapshot`

🔴 destructive

Rollback a VM to a previous snapshot (current state will be lost).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `snapname` | `string` | ✅ |  | The snapshot name to rollback to. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `send_vm_key`

🔴 destructive

Send a key event to a VM (e.g. ctrl-alt-del).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `key` | `string` | ✅ |  | Key combination (e.g. 'ctrl-alt-delete'). |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `send_vm_monitor_command`

🔴 destructive

Send a QEMU monitor command to a VM (advanced/low-level).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string` | ✅ |  | The QEMU monitor command. |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `shutdown_vm`

🔴 destructive

Gracefully shut down a VM via ACPI. Falls back to hard stop after timeout if force_stop is true.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `force_stop` | `boolean` |  | `true` | Force stop after timeout (default True). |
| `timeout` | `integer` |  | `0` | Timeout in seconds before force stop. |

### `start_vm`

🟡 write

Start a VM.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `timeout` | `integer` |  | `0` | Timeout in seconds (0 = default). |

### `stop_vm`

🔴 destructive

Hard-stop a VM (like pulling the power plug). Prefer shutdown_vm for graceful stop.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `skiplock` | `boolean` |  | `false` | Ignore locks (requires root). |
| `timeout` | `integer` |  | `0` | Wait timeout in seconds. |

### `suspend_vm`

🔴 destructive

Suspend a VM (pause execution or hibernate to disk).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `todisk` | `boolean` |  | `false` | If True, hibernate to disk. If False, pause in RAM. |

### `update_vm_cloudinit`

🔴 destructive

Set Cloud-Init parameters for a VM (user, password, SSH keys, network).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `cipassword` | `string` |  |  | Cloud-Init password. |
| `ciuser` | `string` |  |  | Cloud-Init user name. |
| `ipconfig0` | `string` |  |  | IP config for first interface (e.g. 'ip=dhcp' or 'ip=10.0.0.5/24,gw=10.0.0.1'). |
| `nameserver` | `string` |  |  | DNS nameserver IP. |
| `searchdomain` | `string` |  |  | DNS search domain. |
| `sshkeys` | `string` |  |  | SSH public keys (URL-encoded, newline delimited). |

### `update_vm_config`

🔴 destructive

Update the configuration of an existing VM. Only provided parameters are changed.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `agent` | `string` |  |  | Guest agent config. |
| `boot` | `string` |  |  | Boot order. |
| `cores` | `integer` |  | `0` | CPU cores per socket. |
| `cpu` | `string` |  |  | CPU type. |
| `delete` | `string` |  |  | Comma-separated list of settings to delete. |
| `description` | `string` |  |  | Description. |
| `hotplug` | `string` |  |  | Hotplug features (disk, network, usb, memory, cpu). |
| `memory` | `integer` |  | `0` | Memory in MB. |
| `name` | `string` |  |  | VM name. |
| `net0` | `string` |  |  | Network config. |
| `onboot` | `any` |  | `null` | Start on boot. |
| `sockets` | `integer` |  | `0` | CPU sockets. |
| `tags` | `string` |  |  | Tags for the VM. |

### `vm_agent_exec`

🔴 destructive

Execute a command inside a VM via the QEMU Guest Agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string` | ✅ |  | The command to execute. |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `input_data` | `string` |  |  | Data to pass to stdin. |

### `vm_agent_exec_status`

🟢 read-only

Get the status/result of a command previously executed via the guest agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `pid` | `integer` | ✅ |  | The PID returned by the exec call. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `vm_agent_exec_sync`

🔴 destructive

Synchronously execute a command inside a VM via QEMU Guest Agent, waiting for output and exit status.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string` | ✅ |  | Command string or shell command |
| `node` | `string` | ✅ |  | Node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `input_data` | `string` |  |  | Stdin input data |
| `timeout_seconds` | `integer` |  |  | Timeout in seconds (default 30) |
| `use_shell` | `boolean` |  |  | Wrap in /bin/sh -c (default true) |

### `vm_agent_file_read`

🟢 read-only

Read a file from inside a VM via the guest agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `file` | `string` | ✅ |  | Absolute file path inside the guest. |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |

### `vm_agent_file_write`

🔴 destructive

Write content to a file inside a VM via the guest agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `content` | `string` | ✅ |  | File content as plain text (or base64 if content_is_base64 is true). |
| `file` | `string` | ✅ |  | Absolute file path inside the guest. |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `content_is_base64` | `boolean` |  | `false` | Set true only when content is already base64-encoded (e.g. binary files). |

### `vm_agent_get_info`

🟢 read-only

Get various system information from a VM via the guest agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `info_type` | `string` |  | `"get-osinfo"` | Info to retrieve: 'get-osinfo', 'get-host-name', 'get-time', 'get-timezone', 'get-users', 'get-vcpus', 'get-fsinfo', 'get-memory-blocks', 'get-memory-block-info', 'info', 'network-get-interfaces'. |

### `vm_agent_ping`

🟢 read-only

Check whether the QEMU guest agent inside a VM is responding.

Returns { agentRunning: true } on success, or the reason it is not reachable (agent disabled in VM options, package not installed/running, VM stopped).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Node name |
| `vmid` | `integer` | ✅ |  | VM ID |

### `vm_agent_set_password`

🔴 destructive

Set a user password inside a VM via the guest agent.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `password` | `string` | ✅ |  | The new password. |
| `username` | `string` | ✅ |  | The username. |
| `vmid` | `integer` | ✅ |  | The VM ID. |
| `crypted` | `boolean` |  | `false` | If True, password is already encrypted. |

---

<a id="module-sdn"></a>
## `sdn` — Software-defined networking (17)

### `apply_sdn_changes`

🔴 destructive

Apply pending SDN configuration changes to all nodes.

_No parameters._

### `create_sdn_subnet`

🟡 write

Create a subnet for an SDN VNet.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `subnet` | `string` | ✅ |  | Subnet CIDR (e.g. '10.0.0.0/24'). |
| `vnet` | `string` | ✅ |  | VNet ID. |
| `dnszoneprefix` | `string` |  |  | DNS zone prefix. |
| `gateway` | `string` |  |  | Gateway IP. |
| `snat` | `boolean` |  | `false` | Enable SNAT. |

### `create_sdn_vnet`

🟡 write

Create an SDN VNet.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vnet` | `string` | ✅ |  | VNet ID. |
| `zone` | `string` | ✅ |  | Zone ID. |
| `alias` | `string` |  |  | Display alias. |
| `tag` | `integer` |  | `0` | VLAN tag. |
| `vlanaware` | `boolean` |  | `false` | Enable VLAN-aware bridge. |

### `create_sdn_zone`

🟡 write

Create an SDN zone.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `type` | `string` | ✅ |  | Zone type: 'simple', 'vlan', 'qinq', 'vxlan', 'evpn'. |
| `zone` | `string` | ✅ |  | Zone ID. |
| `bridge` | `string` |  |  | Bridge name. |
| `dns` | `string` |  |  | DNS plugin name. |
| `ipam` | `string` |  |  | IPAM plugin name. |
| `mtu` | `integer` |  | `0` | MTU. |
| `nodes` | `string` |  |  | Comma-separated node list. |

### `delete_sdn_vnet`

🔴 destructive

Delete an SDN VNet.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vnet` | `string` | ✅ |  | VNet ID. |

### `delete_sdn_zone`

🔴 destructive

Delete an SDN zone.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `zone` | `string` | ✅ |  | Zone ID. |

### `get_sdn_controller`

🟢 read-only

Get SDN controller configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `controller` | `string` | ✅ |  | Controller ID. |

### `get_sdn_ipam`

🟢 read-only

Get IPAM plugin configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `ipam` | `string` | ✅ |  | IPAM ID. |

### `get_sdn_vnet`

🟢 read-only

Get SDN VNet configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vnet` | `string` | ✅ |  | VNet ID. |

### `get_sdn_zone`

🟢 read-only

Get SDN zone configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `zone` | `string` | ✅ |  | Zone ID. |

### `list_sdn_controllers`

🟢 read-only

List SDN controllers (e.g. EVPN controller).

_No parameters._

### `list_sdn_dns`

🟢 read-only

List SDN DNS plugins.

_No parameters._

### `list_sdn_ipams`

🟢 read-only

List IPAM (IP Address Management) plugins.

_No parameters._

### `list_sdn_subnets`

🟢 read-only

List subnets for an SDN VNet.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vnet` | `string` | ✅ |  | VNet ID. |

### `list_sdn_vnets`

🟢 read-only

List SDN virtual networks (VNets).

_No parameters._

### `list_sdn_zones`

🟢 read-only

List SDN zones.

_No parameters._

### `update_sdn_vnet`

🔴 destructive

Update an SDN VNet.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `vnet` | `string` | ✅ |  | VNet ID. |
| `alias` | `string` |  |  | Display alias. |
| `delete` | `string` |  |  | Comma-separated properties to delete. |
| `tag` | `integer` |  | `-1` | VLAN tag (-1 = don't change). |
| `zone` | `string` |  |  | Zone ID. |

---

<a id="module-storage"></a>
## `storage` — Storage (26)

### `allocate_storage_volume`

🟡 write

Allocate a new disk volume in storage.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `filename` | `string` | ✅ |  | Volume name. |
| `node` | `string` | ✅ |  | The node name. |
| `size` | `string` | ✅ |  | Volume size (e.g. '10G'). |
| `storage` | `string` | ✅ |  | The storage ID. |
| `vmid` | `integer` | ✅ |  | VM ID to associate with. |
| `format` | `string` |  |  | Disk format (raw, qcow2, vmdk). Auto-detected if empty. |

### `create_directory_storage`

🟡 write

Create a directory-based storage mount from a device.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `device` | `string` | ✅ |  | Block device path. |
| `name` | `string` | ✅ |  | Storage name. |
| `node` | `string` | ✅ |  | The node name. |
| `add_to_storage` | `boolean` |  | `true` | Auto-add as Proxmox storage. |
| `filesystem` | `string` |  | `"ext4"` | Filesystem type (ext4, xfs). |

### `create_lvm`

🟡 write

Create a new LVM volume group on a device.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `device` | `string` | ✅ |  | Block device path (e.g. '/dev/sdb'). |
| `name` | `string` | ✅ |  | VG name. |
| `node` | `string` | ✅ |  | The node name. |
| `add_to_storage` | `boolean` |  | `true` | Auto-add as Proxmox storage. |

### `create_lvmthin`

🟡 write

Create a new LVM thin pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `device` | `string` | ✅ |  | Block device path. |
| `name` | `string` | ✅ |  | Thin pool name. |
| `node` | `string` | ✅ |  | The node name. |
| `add_to_storage` | `boolean` |  | `true` | Auto-add as Proxmox storage. |

### `create_storage`

🟡 write

Create a new storage pool configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `storage` | `string` | ✅ |  | Storage ID. |
| `type` | `string` | ✅ |  | Storage type: dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs. |
| `content` | `string` |  |  | Comma-separated content types (images, rootdir, vztmpl, iso, backup, snippets, import). |
| `datastore` | `string` |  |  | PBS datastore name. |
| `disable` | `boolean` |  | `false` | Create disabled. |
| `export` | `string` |  |  | NFS export path. |
| `maxfiles` | `integer` |  | `0` | Max backup files (0 = unlimited). |
| `nodes` | `string` |  |  | Restrict storage to these nodes (comma-separated). |
| `path` | `string` |  |  | File system path (for dir, nfs mounts). |
| `pool` | `string` |  |  | Pool name (for Ceph RBD/CephFS, ZFS). |
| `portal` | `string` |  |  | iSCSI portal. |
| `prune_backups` | `string` |  |  | Backup retention policy. |
| `server` | `string` |  |  | Server IP/hostname (for nfs, cifs, iscsi, pbs, glusterfs, rbd, cephfs). |
| `shared` | `boolean` |  | `false` | Mark as shared storage. |
| `target` | `string` |  |  | iSCSI target. |
| `thinpool` | `string` |  |  | LVM thin pool name (for lvmthin). |
| `vgname` | `string` |  |  | LVM volume group name. |

### `create_zfs_pool`

🟡 write

Create a new ZFS pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `devices` | `string` | ✅ |  | Space-separated device paths (e.g. '/dev/sdb /dev/sdc'). |
| `name` | `string` | ✅ |  | Pool name. |
| `node` | `string` | ✅ |  | The node name. |
| `raidlevel` | `string` | ✅ |  | RAID level: single, mirror, raid10, raidz, raidz2, raidz3, draid, draid2, draid3. |
| `add_to_storage` | `boolean` |  | `true` | Auto-add as Proxmox storage. |
| `ashift` | `integer` |  | `12` | ashift value (default 12). |
| `compression` | `string` |  | `"on"` | Compression (on, off, lz4, zstd, etc.). |

### `delete_storage`

🔴 destructive

Delete a storage pool configuration (does not delete data on the backend).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `storage` | `string` | ✅ |  | The storage ID. |

### `delete_storage_volume`

🔴 destructive

Delete a volume from storage.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `volume` | `string` | ✅ |  | The volume ID. |

### `download_url_to_storage`

🟡 write

Download a file from a URL directly to storage (ISO, template, etc.).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `content` | `string` | ✅ |  | Content type: 'iso', 'vztmpl'. |
| `filename` | `string` | ✅ |  | Target filename. |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `url` | `string` | ✅ |  | URL to download from. |
| `checksum` | `string` |  |  | Expected checksum. |
| `checksum_algorithm` | `string` |  |  | Checksum algorithm (sha256, sha512, md5). |

### `get_node_storage_status`

🟢 read-only

Get usage status of a storage pool on a node (total, used, available).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |

### `get_storage_config`

🟢 read-only

Get configuration of a specific storage pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `storage` | `string` | ✅ |  | The storage ID. |

### `get_storage_rrddata`

🟢 read-only

Get RRD statistics for a storage pool (usage over time).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `timeframe` | `string` |  | `"hour"` | Time range: 'hour', 'day', 'week', 'month', 'year'. |

### `get_storage_volume_info`

🟢 read-only

Get details about a specific volume in storage.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `volume` | `string` | ✅ |  | The volume ID. |

### `get_zfs_pool`

🟢 read-only

Get details of a ZFS pool.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | `string` | ✅ |  | ZFS pool name. |
| `node` | `string` | ✅ |  | The node name. |

### `initialize_gpt`

🔴 destructive

Initialize a disk with GPT partition table (WARNING: destroys all data).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `disk` | `string` | ✅ |  | Disk device path (e.g. '/dev/sdb'). |
| `node` | `string` | ✅ |  | The node name. |

### `list_directory_storage`

🟢 read-only

List directory-based storage mounts on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_file_restore`

🟢 read-only

List files in a backup volume for file-level restore (PBS backups).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `volume` | `string` | ✅ |  | The backup volume ID. |
| `filepath` | `string` |  | `"/"` | Path inside the backup to list (default '/'). |

### `list_lvm_volumes`

🟢 read-only

List LVM volume groups on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_lvmthin_pools`

🟢 read-only

List LVM thin pools on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `list_node_storage`

🟢 read-only

List storage pools available on a specific node with usage info.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `content` | `string` |  |  | Filter by content type (images, rootdir, vztmpl, iso, backup). |
| `enabled` | `boolean` |  | `true` | Only show enabled storage. |

### `list_storage`

🟢 read-only

List all configured storage pools at the datacenter level.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `enabled` | `boolean` |  | `true` | Only show enabled storage (default True). |
| `type` | `string` |  |  | Filter by type (dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs). |

### `list_storage_content`

🟢 read-only

List content of a storage pool (disk images, ISOs, templates, backups).

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `content` | `string` |  |  | Filter by type: 'images', 'rootdir', 'vztmpl', 'iso', 'backup', 'snippets'. |
| `vmid` | `integer` |  | `0` | Filter by VM ID. |

### `list_zfs_pools`

🟢 read-only

List ZFS pools on a node.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |

### `prune_storage_backups`

🔴 destructive

Prune (delete) old backups from storage according to retention policy.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `dry_run` | `boolean` |  | `true` | If True, only simulate (default True for safety). |
| `prune_backups` | `string` |  |  | Retention spec (e.g. 'keep-last=3,keep-daily=7,keep-weekly=4'). |
| `type` | `string` |  |  | Guest type filter ('qemu' or 'lxc'). |
| `vmid` | `integer` |  | `0` | Filter by VM ID. |

### `update_storage`

🔴 destructive

Update an existing storage pool configuration.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `storage` | `string` | ✅ |  | The storage ID to update. |
| `content` | `string` |  |  | Content types (images, rootdir, vztmpl, iso, backup, snippets, import). |
| `delete` | `string` |  |  | Comma-separated list of settings to delete. |
| `disable` | `any` |  | `null` | Disable this storage. |
| `nodes` | `string` |  |  | Allowed nodes (comma-separated). |
| `prune_backups` | `string` |  |  | Backup retention policy. |
| `shared` | `any` |  | `null` | Mark as shared. |

### `upload_to_storage`

🟡 write

Upload a file (ISO, template, etc.) to storage. Note: actual file upload must go through the HTTP API directly.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `content` | `string` | ✅ |  | Content type: 'iso', 'vztmpl', 'snippets', 'import'. |
| `filename` | `string` | ✅ |  | Target filename. |
| `node` | `string` | ✅ |  | The node name. |
| `storage` | `string` | ✅ |  | The storage ID. |
| `tmpfilename` | `string` |  |  | Temporary filename for the upload. |

---

<a id="module-guest-services"></a>
## `guest-services` — Guest services (inside VMs via the QEMU guest agent) (28)

### `vm_docker_compose_down`

🔴 destructive

Run docker compose down inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `compose_file` | `string` |  |  | docker-compose.yml path |
| `project_dir` | `string` |  |  | Working directory |
| `remove_orphans` | `boolean` |  | `false` | Remove orphaned containers |
| `timeout_seconds` | `integer` |  | `120` | Timeout (default 120) |
| `volumes` | `boolean` |  | `false` | Remove named volumes |

### `vm_docker_compose_logs`

🟢 read-only

Get logs from Docker Compose services inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `compose_file` | `string` |  |  | docker-compose.yml path |
| `project_dir` | `string` |  |  | Working directory |
| `services` | `string` |  |  | Service(s) to get logs for (default all) |
| `tail` | `integer` |  | `100` | Lines from end (default 100) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `timestamps` | `boolean` |  | `false` | Include timestamps |

### `vm_docker_compose_ps`

🟢 read-only

List containers in a Docker Compose project inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `compose_file` | `string` |  |  | docker-compose.yml path |
| `project_dir` | `string` |  |  | Working directory |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_compose_pull`

🔴 destructive

Pull latest images for Docker Compose services inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `compose_file` | `string` |  |  | docker-compose.yml path |
| `project_dir` | `string` |  |  | Working directory |
| `services` | `string` |  |  | Services to pull (default all) |
| `timeout_seconds` | `integer` |  | `300` | Timeout (default 300) |

### `vm_docker_compose_restart`

🔴 destructive

Restart Docker Compose services inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `compose_file` | `string` |  |  | docker-compose.yml path |
| `project_dir` | `string` |  |  | Working directory |
| `services` | `string` |  |  | Services to restart (default all) |
| `timeout_seconds` | `integer` |  | `120` | Timeout (default 120) |

### `vm_docker_compose_up`

🔴 destructive

Run docker compose up inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `build` | `boolean` |  | `false` | Build images before starting |
| `compose_file` | `string` |  |  | Custom docker-compose.yml path |
| `detach` | `boolean` |  | `true` | Run in background (default true) |
| `env_file` | `string` |  |  | .env file path inside the guest |
| `project_dir` | `string` |  |  | Working directory with docker-compose.yml |
| `pull` | `boolean` |  | `false` | Pull latest images |
| `services` | `string` |  |  | Services to start (space-separated, default all) |
| `timeout_seconds` | `integer` |  | `300` | Timeout (default 300) |

### `vm_docker_exec`

🔴 destructive

Execute a command inside a running Docker container within a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

Nests: Proxmox guest agent -> docker exec -> your command.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string` | ✅ |  | Command to run inside the container |
| `container` | `string` | ✅ |  | Docker container name or ID |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `user` | `string` |  |  | User to run as (e.g. root) |
| `workdir` | `string` |  |  | Working directory inside the container |

### `vm_docker_images`

🟢 read-only

List Docker images inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_info`

🟢 read-only

Get Docker daemon version and config info from inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_inspect`

🟢 read-only

Inspect Docker objects (container, image, network, volume) inside a VM. Returns JSON. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `objects` | `string` | ✅ |  | Object name(s)/ID(s), space-separated |
| `vmid` | `integer` | ✅ |  | VM ID |
| `format` | `string` |  |  | Go template format string (optional) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `type` | `string` |  | `"container"` | Object type: container, image, network, volume |

### `vm_docker_logs`

🟢 read-only

Get logs from a Docker container inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `container` | `string` | ✅ |  | Container name or ID |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `since` | `string` |  |  | Show logs since (e.g. "1h", "2024-01-01") |
| `tail` | `integer` |  | `100` | Log lines from end (default 100) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `timestamps` | `boolean` |  | `false` | Show timestamps |

### `vm_docker_network_ls`

🟢 read-only

List Docker networks inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_ps`

🟢 read-only

List Docker containers inside a VM via the guest agent. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

Returns container ID, image, status, names, and ports.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `all` | `boolean` |  | `true` | Include stopped containers (default true) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_pull`

🟡 write

Pull a Docker image inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `image` | `string` | ✅ |  | Docker image (e.g. nginx:latest) |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `300` | Timeout (default 300 for large images) |

### `vm_docker_restart`

🔴 destructive

Restart Docker containers inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `containers` | `string` | ✅ |  | Container name(s) or ID(s), space-separated |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_rm`

🔴 destructive

Remove Docker containers inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `containers` | `string` | ✅ |  | Container name(s) or ID(s), space-separated |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `force` | `boolean` |  | `false` | Force removal of running containers |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `volumes` | `boolean` |  | `false` | Remove anonymous volumes |

### `vm_docker_rmi`

🔴 destructive

Remove Docker images inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `images` | `string` | ✅ |  | Image name(s) or ID(s), space-separated |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `force` | `boolean` |  | `false` | Force removal |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_run`

🔴 destructive

Run a Docker container inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `image` | `string` | ✅ |  | Docker image to run |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `detach` | `boolean` |  | `true` | Run in background (default true) |
| `env` | `string` |  |  | Env vars comma-separated (e.g. "KEY=val,FOO=bar") |
| `extra_args` | `string` |  |  | Additional docker run flags |
| `name` | `string` |  |  | Container name |
| `network` | `string` |  |  | Docker network name |
| `ports` | `string` |  |  | Port mappings comma-separated (e.g. "8080:80,443:443") |
| `restart` | `string` |  |  | Restart policy: no, always, unless-stopped, on-failure |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
| `volumes` | `string` |  |  | Volume mounts comma-separated (e.g. "/data:/app") |

### `vm_docker_start`

🟡 write

Start stopped Docker containers inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `containers` | `string` | ✅ |  | Container name(s) or ID(s), space-separated |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_stats`

🟢 read-only

Get CPU/memory/IO usage stats for Docker containers inside a VM (single snapshot). Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `containers` | `string` |  |  | Container name(s)/ID(s), leave empty for all |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_stop`

🔴 destructive

Stop Docker containers inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `containers` | `string` | ✅ |  | Container name(s) or ID(s), space-separated |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout` | `integer` |  | `10` | Seconds before SIGKILL (default 10) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_docker_system_prune`

🔴 destructive

Remove unused Docker data inside a VM (stopped containers, dangling images, unused networks). Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `all` | `boolean` |  | `false` | Remove all unused images (not just dangling) |
| `timeout_seconds` | `integer` |  | `120` | Timeout (default 120) |
| `volumes` | `boolean` |  | `false` | Also prune volumes |

### `vm_docker_volume_ls`

🟢 read-only

List Docker volumes inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_package_install`

🔴 destructive

Install packages inside a VM using apt-get (Debian/Ubuntu). Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `packages` | `string` | ✅ |  | Space-separated package names (e.g. "nginx curl git") |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `300` | Timeout (default 300) |
| `update_first` | `boolean` |  | `true` | Run apt-get update first (default true) |

### `vm_run_shell`

🔴 destructive

Execute an arbitrary shell command inside a VM via the guest agent. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

Command is wrapped in /bin/sh -c. Both stdout and stderr are returned synchronously.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `command` | `string` | ✅ |  | Shell command to execute |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `input_data` | `string` |  |  | Data to pass to stdin |
| `timeout_seconds` | `integer` |  | `60` | Timeout in seconds (default 60) |

### `vm_service_manage`

🔴 destructive

Manage a systemd service inside a VM (start, stop, restart, enable, disable, reload). Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `action` | `string (start \\| stop \\| restart \\| reload \\| enable \\| disable \\| mask \\| unmask)` | ✅ |  | Action: start, stop, restart, reload, enable, disable, mask, unmask |
| `node` | `string` | ✅ |  | Proxmox node name |
| `service` | `string` | ✅ |  | Service name (e.g. nginx, docker) |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_service_status`

🟢 read-only

Check status of a systemd service inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

Returns active/sub state and recent journal entries.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `service` | `string` | ✅ |  | Service name (e.g. nginx, docker, mysql) |
| `vmid` | `integer` | ✅ |  | VM ID |
| `journal_lines` | `integer` |  | `20` | Journal log lines to include (default 20) |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |

### `vm_system_info`

🟢 read-only

Get OS, CPU, memory, disk, network and uptime info from inside a VM. Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `node` | `string` | ✅ |  | Proxmox node name |
| `vmid` | `integer` | ✅ |  | VM ID |
| `timeout_seconds` | `integer` |  | `60` | Command timeout in seconds (default 60) |
