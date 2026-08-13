# Proxmox MCP Tools Reference Guide

This document provides detailed documentation for all **298 MCP Tools** available in this Proxmox VE MCP Server.

## 📚 Table of Contents

- [ACCESS Module (27 tools)](#-access-module)
- [BACKUP Module (11 tools)](#-backup-module)
- [CLUSTER Module (46 tools)](#-cluster-module)
- [FIREWALL Module (32 tools)](#-firewall-module)
- [HA Module (14 tools)](#-ha-module)
- [LXC Module (26 tools)](#-lxc-module)
- [NODES Module (45 tools)](#-nodes-module)
- [POOLS Module (14 tools)](#-pools-module)
- [QEMU Module (40 tools)](#-qemu-module)
- [SDN Module (17 tools)](#-sdn-module)
- [STORAGE Module (26 tools)](#-storage-module)

---

## 🛠️ ACCESS Module

Total tools in category: **27**

### `key: change_password`
**Description**: Change a user's password.

Args:
    userid: User ID (format: 'user@realm').
    password: New password.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `password` | `string` | ✅ Yes | Password |
| `userid` | `string` | ✅ Yes | Userid |

### `key: create_group`
**Description**: Create a new group.

Args:
    groupid: Group ID.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `groupid` | `string` | ✅ Yes | Groupid |

### `key: create_role`
**Description**: Create a new role with specific privileges.

Args:
    roleid: Role ID.
    privs: Comma-separated list of privileges (e.g. 'VM.Allocate,VM.Config.Disk,VM.PowerMgmt').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `privs` | `string` | ✅ Yes | Privs |
| `roleid` | `string` | ✅ Yes | Roleid |

### `key: create_user`
**Description**: Create a new user.

Args:
    userid: User ID (format: 'user@realm', e.g. 'myuser@pve').
    password: Password (only for pve/pam realms).
    email: Email address.
    firstname: First name.
    lastname: Last name.
    groups: Comma-separated group list.
    comment: Description.
    enable: Enable user.
    expire: Account expiration (Unix epoch, 0 = never).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `email` | `string` | No | Email |
| `enable` | `boolean` | No | Enable |
| `expire` | `integer` | No | Expire |
| `firstname` | `string` | No | Firstname |
| `groups` | `string` | No | Groups |
| `lastname` | `string` | No | Lastname |
| `password` | `string` | No | Password |
| `userid` | `string` | ✅ Yes | Userid |

### `key: create_user_token`
**Description**: Create a new API token for a user. Returns the token value (shown only once).

Args:
    userid: User ID (format: 'user@realm').
    tokenid: Token ID (alphanumeric).
    comment: Token description.
    privsep: Enable privilege separation (token has own permissions, not user's full permissions).
    expire: Expiration (Unix epoch, 0 = never).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `expire` | `integer` | No | Expire |
| `privsep` | `boolean` | No | Privsep |
| `tokenid` | `string` | ✅ Yes | Tokenid |
| `userid` | `string` | ✅ Yes | Userid |

### `key: delete_group`
**Description**: Delete a group.

Args:
    groupid: Group ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `groupid` | `string` | ✅ Yes | Groupid |

### `key: delete_role`
**Description**: Delete a role.

Args:
    roleid: Role ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `roleid` | `string` | ✅ Yes | Roleid |

### `key: delete_user`
**Description**: Delete a user.

Args:
    userid: User ID to delete (format: 'user@realm').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `userid` | `string` | ✅ Yes | Userid |

### `key: delete_user_token`
**Description**: Delete an API token.

Args:
    userid: User ID (format: 'user@realm').
    tokenid: Token ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `tokenid` | `string` | ✅ Yes | Tokenid |
| `userid` | `string` | ✅ Yes | Userid |

### `key: get_acl`
**Description**: Get the full ACL (access control list) — shows all permission assignments.

*No arguments required.*

### `key: get_auth_domain`
**Description**: Get authentication domain configuration.

Args:
    realm: Realm ID (e.g. 'pam', 'pve', 'my-ldap').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `realm` | `string` | ✅ Yes | Realm |

### `key: get_group`
**Description**: Get group details.

Args:
    groupid: Group ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `groupid` | `string` | ✅ Yes | Groupid |

### `key: get_permissions`
**Description**: Check effective permissions for a user on a given path.

Args:
    userid: User to check (empty = current user).
    path: Object path to check (empty = root).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `path` | `string` | No | Path |
| `userid` | `string` | No | Userid |

### `key: get_role`
**Description**: Get role details and its privileges.

Args:
    roleid: Role ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `roleid` | `string` | ✅ Yes | Roleid |

### `key: get_user`
**Description**: Get details for a specific user.

Args:
    userid: User ID (format: 'user@realm', e.g. 'admin@pam').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `userid` | `string` | ✅ Yes | Userid |

### `key: get_user_token`
**Description**: Get details for a specific API token.

Args:
    userid: User ID (format: 'user@realm').
    tokenid: Token ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `tokenid` | `string` | ✅ Yes | Tokenid |
| `userid` | `string` | ✅ Yes | Userid |

### `key: list_auth_domains`
**Description**: List configured authentication realms/domains (PAM, PVE, LDAP, AD, OpenID).

*No arguments required.*

### `key: list_groups`
**Description**: List all user groups.

*No arguments required.*

### `key: list_roles`
**Description**: List all available roles.

*No arguments required.*

### `key: list_tfa`
**Description**: List TFA (two-factor auth) entries.

Args:
    userid: Filter by user ID (empty = all users).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `userid` | `string` | No | Userid |

### `key: list_user_tokens`
**Description**: List API tokens for a user.

Args:
    userid: User ID (format: 'user@realm').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `userid` | `string` | ✅ Yes | Userid |

### `key: list_users`
**Description**: List all users in Proxmox.

Args:
    enabled: Only show enabled users.
    full: Include detailed info (groups, tokens, etc.).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `enabled` | `boolean` | No | Enabled |
| `full` | `boolean` | No | Full |

### `key: sync_auth_domain`
**Description**: Sync users/groups from an external auth domain (LDAP/AD).

Args:
    realm: Realm ID to sync.
    dry_run: Only show what would change.
    full: Full sync (not just incremental).
    enable_new: Enable newly synced users.
    remove_vanished: Comma-separated: 'entry' (remove users), 'properties' (clear), 'acl' (remove ACLs).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `dry_run` | `boolean` | No | Dry Run |
| `enable_new` | `boolean` | No | Enable New |
| `full` | `boolean` | No | Full |
| `realm` | `string` | ✅ Yes | Realm |
| `remove_vanished` | `string` | No | Remove Vanished |

### `key: update_acl`
**Description**: Add or remove ACL entries (permission assignments).

Args:
    path: Object path (e.g. '/', '/vms/100', '/storage/local', '/pool/mypool').
    roles: Comma-separated role list.
    users: Comma-separated user list (format: 'user@realm').
    groups: Comma-separated group list.
    tokens: Comma-separated token list (format: 'user@realm!tokenid').
    propagate: Propagate permissions to child objects.
    delete: Remove the ACL entry instead of adding.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete` | `boolean` | No | Delete |
| `groups` | `string` | No | Groups |
| `path` | `string` | ✅ Yes | Path |
| `propagate` | `boolean` | No | Propagate |
| `roles` | `string` | ✅ Yes | Roles |
| `tokens` | `string` | No | Tokens |
| `users` | `string` | No | Users |

### `key: update_group`
**Description**: Update a group.

Args:
    groupid: Group ID.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `groupid` | `string` | ✅ Yes | Groupid |

### `key: update_role`
**Description**: Update role privileges.

Args:
    roleid: Role ID.
    privs: Comma-separated list of privileges.
    append: Append privileges instead of replacing.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `append` | `boolean` | No | Append |
| `privs` | `string` | ✅ Yes | Privs |
| `roleid` | `string` | ✅ Yes | Roleid |

### `key: update_user`
**Description**: Update an existing user.

Args:
    userid: User ID (format: 'user@realm').
    email: Email address.
    firstname: First name.
    lastname: Last name.
    groups: Comma-separated group list.
    comment: Description.
    enable: Enable/disable user.
    expire: Account expiration (Unix epoch, 0 = never, -1 = don't change).
    append: Append groups instead of replacing.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `append` | `boolean` | No | Append |
| `comment` | `string` | No | Comment |
| `email` | `string` | No | Email |
| `enable` | `boolean` | No | Enable |
| `expire` | `integer` | No | Expire |
| `firstname` | `string` | No | Firstname |
| `groups` | `string` | No | Groups |
| `lastname` | `string` | No | Lastname |
| `userid` | `string` | ✅ Yes | Userid |

## 🛠️ BACKUP Module

Total tools in category: **11**

### `key: create_backup_job`
**Description**: Create a scheduled backup job.

Args:
    storage: Target storage ID for backups.
    schedule: Schedule in systemd calendar format (e.g. 'daily', 'weekly', '02:00').
    all_guests: Backup all guests.
    vmid: Comma-separated VMIDs to back up (if not all_guests).
    node: Only back up guests on this node.
    mode: Backup mode: 'snapshot', 'suspend', 'stop'.
    compress: Compression: 'none', 'lzo', 'gzip', 'zstd'.
    mailnotification: 'always' or 'failure'.
    mailto: Comma-separated email addresses.
    maxfiles: Max backup files to keep (0 = unlimited, deprecated - use prune_backups).
    prune_backups: Retention schedule (e.g. 'keep-daily=7,keep-weekly=4').
    notes_template: Template for backup notes.
    enabled: Enable the job.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `all_guests` | `boolean` | No | All Guests |
| `comment` | `string` | No | Comment |
| `compress` | `string` | No | Compress |
| `enabled` | `boolean` | No | Enabled |
| `mailnotification` | `string` | No | Mailnotification |
| `mailto` | `string` | No | Mailto |
| `maxfiles` | `integer` | No | Maxfiles |
| `mode` | `string` | No | Mode |
| `node` | `string` | No | Node |
| `notes_template` | `string` | No | Notes Template |
| `prune_backups` | `string` | No | Prune Backups |
| `schedule` | `string` | No | Schedule |
| `storage` | `string` | ✅ Yes | Storage |
| `vmid` | `string` | No | Vmid |

### `key: create_vzdump`
**Description**: Start an immediate backup (vzdump) on a node.

Args:
    node: The node to run the backup on.
    vmid: Comma-separated VMIDs (required if not all_guests).
    all_guests: Back up all guests on the node.
    storage: Target storage (empty = default).
    mode: Backup mode: 'snapshot', 'suspend', 'stop'.
    compress: Compression: 'none', 'lzo', 'gzip', 'zstd'.
    stdout: Write to stdout instead of storage.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `all_guests` | `boolean` | No | All Guests |
| `compress` | `string` | No | Compress |
| `mode` | `string` | No | Mode |
| `node` | `string` | ✅ Yes | Node |
| `stdout` | `boolean` | No | Stdout |
| `storage` | `string` | No | Storage |
| `vmid` | `string` | No | Vmid |

### `key: delete_backup_job`
**Description**: Delete a scheduled backup job.

Args:
    id: Backup job ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: download_file_restore`
**Description**: Download a file from a vzdump backup.

Args:
    node: The node name.
    storage: Storage ID.
    volume: Backup volume ID.
    filepath: Path of the file to download from the backup.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `filepath` | `string` | ✅ Yes | Filepath |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `volume` | `string` | ✅ Yes | Volume |

### `key: get_backup_job`
**Description**: Get details of a specific backup job.

Args:
    id: Backup job ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: get_backup_job_included_volumes`
**Description**: Get volumes included in a backup job.

Args:
    id: Backup job ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: get_vzdump_defaults`
**Description**: Get the default vzdump configuration for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_vzdump_extractconfig`
**Description**: Extract the guest configuration from a vzdump backup archive.

Args:
    node: The node name.
    volume: Backup volume ID (e.g. 'local:backup/vzdump-qemu-100-2024_01_01-00_00_00.vma.zst').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `volume` | `string` | ✅ Yes | Volume |

### `key: list_backup_file_restore`
**Description**: List files in a vzdump backup for single-file restore.

Args:
    node: The node name.
    storage: Storage ID.
    volume: Backup volume ID.
    filepath: Path within the backup (default '/').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `filepath` | `string` | No | Filepath |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `volume` | `string` | ✅ Yes | Volume |

### `key: list_backup_jobs`
**Description**: List all scheduled backup jobs (vzdump) in the cluster.

*No arguments required.*

### `key: update_backup_job`
**Description**: Update a scheduled backup job.

Args:
    id: Backup job ID.
    storage: Target storage ID.
    schedule: Schedule in systemd calendar format.
    all_guests: Backup all guests.
    vmid: Comma-separated VMIDs.
    node: Node filter.
    mode: Backup mode.
    compress: Compression.
    enabled: Enable/disable.
    delete: Comma-separated properties to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `all_guests` | `boolean` | No | All Guests |
| `compress` | `string` | No | Compress |
| `delete` | `string` | No | Delete |
| `enabled` | `boolean` | No | Enabled |
| `id` | `string` | ✅ Yes | Id |
| `mode` | `string` | No | Mode |
| `node` | `string` | No | Node |
| `schedule` | `string` | No | Schedule |
| `storage` | `string` | No | Storage |
| `vmid` | `string` | No | Vmid |

## 🛠️ CLUSTER Module

Total tools in category: **46**

### `key: bulk_migrate_guests`
**Description**: Bulk migrate guests to a target node.

Args:
    target: Target node name.
    vms: Comma-separated VMIDs.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `target` | `string` | ✅ Yes | Target |
| `vms` | `string` | No | Vms |

### `key: bulk_shutdown_guests`
**Description**: Bulk shutdown guests across the cluster.

Args:
    vms: Comma-separated list of VMIDs (empty = all).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vms` | `string` | No | Vms |

### `key: bulk_start_guests`
**Description**: Bulk start guests across the cluster.

Args:
    vms: Comma-separated list of VMIDs (empty = all).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vms` | `string` | No | Vms |

### `key: create_ceph_osd`
**Description**: Create a new Ceph OSD on a device.

Args:
    node: The node name.
    dev: Block device for the OSD (e.g. '/dev/sdb').
    db_dev: Separate block device for DB.
    wal_dev: Separate block device for WAL.
    encrypted: Encrypt the OSD.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `db_dev` | `string` | No | Db Dev |
| `dev` | `string` | ✅ Yes | Dev |
| `encrypted` | `boolean` | No | Encrypted |
| `node` | `string` | ✅ Yes | Node |
| `wal_dev` | `string` | No | Wal Dev |

### `key: create_ceph_pool`
**Description**: Create a new Ceph pool.

Args:
    node: The node name.
    name: Pool name.
    size: Number of replicas (default 3).
    min_size: Minimum replicas for I/O (default 2).
    pg_num: Number of placement groups (default 128).
    application: Pool application (rbd, cephfs, rgw).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `application` | `string` | No | Application |
| `min_size` | `integer` | No | Min Size |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |
| `pg_num` | `integer` | No | Pg Num |
| `size` | `integer` | No | Size |

### `key: create_replication_job`
**Description**: Create a storage replication job.

Args:
    id: Job ID (format: GUEST-JOBNUM, e.g. '100-0').
    target: Target node.
    type: Replication type (currently only 'local').
    schedule: Schedule in systemd calendar format (default '*/15' = every 15 min).
    comment: Description.
    rate: Rate limit in mbps.
    disable: Create disabled.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `disable` | `boolean` | No | Disable |
| `id` | `string` | ✅ Yes | Id |
| `rate` | `number` | No | Rate |
| `schedule` | `string` | No | Schedule |
| `target` | `string` | ✅ Yes | Target |
| `type` | `string` | No | Type |

### `key: delete_replication_job`
**Description**: Delete a replication job.

Args:
    id: Replication job ID.
    force: Force removal (skip cleanup).
    keep: Keep replicated data on target.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force` | `boolean` | No | Force |
| `id` | `string` | ✅ Yes | Id |
| `keep` | `boolean` | No | Keep |

### `key: get_ceph_config`
**Description**: Get the raw Ceph configuration.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_ceph_crush_rules`
**Description**: Get Ceph CRUSH rules.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_ceph_flags`
**Description**: Get Ceph global flags (noout, noscrub, etc.).

*No arguments required.*

### `key: get_ceph_metadata`
**Description**: Get Ceph metadata (versions, services across nodes).

*No arguments required.*

### `key: get_ceph_status_cluster`
**Description**: Get Ceph cluster status (health, monitors, OSDs, PGs).

*No arguments required.*

### `key: get_ceph_status_node`
**Description**: Get Ceph status from a specific node's perspective.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_cluster_config`
**Description**: Get the current cluster configuration (corosync, nodes, join info).

*No arguments required.*

### `key: get_cluster_config_nodes`
**Description**: List nodes configured in the cluster.

*No arguments required.*

### `key: get_cluster_join_info`
**Description**: Get info needed to join a node to this cluster.

*No arguments required.*

### `key: get_cluster_log`
**Description**: Get the cluster log (recent events).

Args:
    max_entries: Max log entries.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `max_entries` | `integer` | No | Max Entries |

### `key: get_cluster_options`
**Description**: Get datacenter/cluster-wide options (keyboard layout, console, language, etc.).

*No arguments required.*

### `key: get_cluster_resources`
**Description**: List all resources across the cluster (VMs, containers, storage, nodes).

Args:
    type: Filter by type: 'vm', 'storage', 'node', 'sdn', 'pool' (empty = all).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `type` | `string` | No | Type |

### `key: get_cluster_status`
**Description**: Get cluster status (nodes online, quorum, HA state).

*No arguments required.*

### `key: get_cluster_tasks`
**Description**: List recent tasks across all nodes in the cluster.

Args:
    limit: Maximum number of tasks to return.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `limit` | `integer` | No | Limit |

### `key: get_cluster_totem`
**Description**: Get the corosync totem configuration.

*No arguments required.*

### `key: get_metric_server`
**Description**: Get metric server configuration.

Args:
    id: Metric server ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: get_next_vmid`
**Description**: Get the next available VMID in the cluster.

Args:
    vmid: Specific VMID to check availability for (0 = auto-assign).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vmid` | `integer` | No | Vmid |

### `key: get_replication_job`
**Description**: Get a specific replication job configuration.

Args:
    id: Replication job ID (format: GUEST-JOBNUM, e.g. '100-0').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: get_version`
**Description**: Get the Proxmox VE API version information.

*No arguments required.*

### `key: join_cluster`
**Description**: Join a node to an existing cluster.

Args:
    hostname: Hostname/IP of existing cluster node.
    fingerprint: SSL fingerprint of the cluster node.
    password: Root password of the cluster node.
    nodeid: Force specific node ID.
    force: Force join even with warnings.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `fingerprint` | `string` | ✅ Yes | Fingerprint |
| `force` | `boolean` | No | Force |
| `hostname` | `string` | ✅ Yes | Hostname |
| `nodeid` | `integer` | No | Nodeid |
| `password` | `string` | ✅ Yes | Password |

### `key: list_ceph_fs`
**Description**: List CephFS filesystems.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_ceph_managers`
**Description**: List Ceph managers.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_ceph_mds`
**Description**: List Ceph metadata servers (MDS, for CephFS).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_ceph_monitors`
**Description**: List Ceph monitors.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_ceph_osds`
**Description**: List Ceph OSDs on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_ceph_pools`
**Description**: List Ceph pools.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_dir_mappings`
**Description**: List directory mappings.

*No arguments required.*

### `key: list_metric_servers`
**Description**: List configured metric servers (InfluxDB, Graphite).

*No arguments required.*

### `key: list_notification_endpoints`
**Description**: List all configured notification endpoints (sendmail, gotify, smtp, webhook).

*No arguments required.*

### `key: list_notification_matchers`
**Description**: List all notification matchers (rules that route notifications).

*No arguments required.*

### `key: list_notification_targets`
**Description**: List all notification targets.

*No arguments required.*

### `key: list_pci_mappings`
**Description**: List PCI device mappings for passthrough.

*No arguments required.*

### `key: list_realm_sync_jobs`
**Description**: List realm synchronization jobs.

*No arguments required.*

### `key: list_replication_jobs`
**Description**: List all replication jobs in the cluster.

*No arguments required.*

### `key: list_scheduled_jobs`
**Description**: List all scheduled cluster jobs (realm-sync, etc.).

*No arguments required.*

### `key: list_usb_mappings`
**Description**: List USB device mappings for passthrough.

*No arguments required.*

### `key: set_ceph_flags`
**Description**: Set a Ceph global flag.

Args:
    flag: Flag name (noout, noscrub, nobackfill, norebalance, nodown, noup, etc.).
    value: True to set, False to unset.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `flag` | `string` | ✅ Yes | Flag |
| `value` | `boolean` | ✅ Yes | Value |

### `key: test_notification_target`
**Description**: Send a test notification to a target.

Args:
    name: Target name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | ✅ Yes | Name |

### `key: update_cluster_options`
**Description**: Update datacenter/cluster-wide options.

Args:
    keyboard: Keyboard layout (e.g. 'en-us', 'de').
    language: Default language.
    console: Default console viewer: 'applet', 'vv', 'html5', 'xtermjs'.
    http_proxy: HTTP proxy URL.
    email_from: Default email sender address.
    max_workers: Max parallel workers.
    description: Datacenter description.
    delete: Comma-separated settings to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `console` | `string` | No | Console |
| `delete` | `string` | No | Delete |
| `description` | `string` | No | Description |
| `email_from` | `string` | No | Email From |
| `http_proxy` | `string` | No | Http Proxy |
| `keyboard` | `string` | No | Keyboard |
| `language` | `string` | No | Language |
| `max_workers` | `integer` | No | Max Workers |

## 🛠️ FIREWALL Module

Total tools in category: **32**

### `key: add_firewall_ipset_entry`
**Description**: Add an IP/CIDR to an IP set.

Args:
    name: IP set name.
    cidr: IP address or CIDR.
    comment: Description.
    nomatch: Exclude this entry (nomatch).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cidr` | `string` | ✅ Yes | Cidr |
| `comment` | `string` | No | Comment |
| `name` | `string` | ✅ Yes | Name |
| `nomatch` | `boolean` | No | Nomatch |

### `key: create_cluster_firewall_rule`
**Description**: Create a cluster-level firewall rule.

Args:
    action: 'ACCEPT', 'DROP', 'REJECT'.
    type: 'in', 'out', 'group'.
    enable: 1 = enabled, 0 = disabled.
    source: Source address/range (CIDR or alias).
    dest: Destination address/range.
    proto: Protocol (tcp, udp, icmp, etc.).
    sport: Source port(s).
    dport: Destination port(s).
    iface: Network interface.
    macro: Use predefined macro (e.g. 'SSH', 'HTTP', 'HTTPS', 'Ping').
    comment: Description.
    log: Log level: 'emerg', 'alert', 'crit', 'err', 'warning', 'notice', 'info', 'debug', 'nolog'.
    pos: Rule position (-1 = append).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | ✅ Yes | Action |
| `comment` | `string` | No | Comment |
| `dest` | `string` | No | Dest |
| `dport` | `string` | No | Dport |
| `enable` | `integer` | No | Enable |
| `iface` | `string` | No | Iface |
| `log` | `string` | No | Log |
| `macro` | `string` | No | Macro |
| `pos` | `integer` | No | Pos |
| `proto` | `string` | No | Proto |
| `source` | `string` | No | Source |
| `sport` | `string` | No | Sport |
| `type` | `string` | ✅ Yes | Type |

### `key: create_container_firewall_rule`
**Description**: Create a firewall rule for an LXC container.

Args:
    node: The node name.
    vmid: The container ID.
    action: 'ACCEPT', 'DROP', 'REJECT'.
    type: 'in', 'out', 'group'.
    enable: 1 = enabled, 0 = disabled.
    source: Source CIDR or alias.
    dest: Destination CIDR or alias.
    proto: Protocol.
    dport: Destination port(s).
    macro: Predefined macro.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | ✅ Yes | Action |
| `comment` | `string` | No | Comment |
| `dest` | `string` | No | Dest |
| `dport` | `string` | No | Dport |
| `enable` | `integer` | No | Enable |
| `macro` | `string` | No | Macro |
| `node` | `string` | ✅ Yes | Node |
| `proto` | `string` | No | Proto |
| `source` | `string` | No | Source |
| `type` | `string` | ✅ Yes | Type |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_firewall_alias`
**Description**: Create a firewall alias (named IP address or CIDR).

Args:
    name: Alias name.
    cidr: IP address or CIDR (e.g. '10.0.0.0/24' or '192.168.1.1').
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cidr` | `string` | ✅ Yes | Cidr |
| `comment` | `string` | No | Comment |
| `name` | `string` | ✅ Yes | Name |

### `key: create_firewall_group`
**Description**: Create a new firewall security group.

Args:
    group: Group name.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `group` | `string` | ✅ Yes | Group |

### `key: create_firewall_group_rule`
**Description**: Add a rule to a firewall security group.

Args:
    group: Security group name.
    action: 'ACCEPT', 'DROP', 'REJECT'.
    type: 'in', 'out'.
    enable: 1 = enabled, 0 = disabled.
    source: Source address/range.
    dest: Destination address/range.
    proto: Protocol.
    sport: Source port(s).
    dport: Destination port(s).
    macro: Predefined macro.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | ✅ Yes | Action |
| `comment` | `string` | No | Comment |
| `dest` | `string` | No | Dest |
| `dport` | `string` | No | Dport |
| `enable` | `integer` | No | Enable |
| `group` | `string` | ✅ Yes | Group |
| `macro` | `string` | No | Macro |
| `proto` | `string` | No | Proto |
| `source` | `string` | No | Source |
| `sport` | `string` | No | Sport |
| `type` | `string` | ✅ Yes | Type |

### `key: create_firewall_ipset`
**Description**: Create a new firewall IP set.

Args:
    name: IP set name.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `name` | `string` | ✅ Yes | Name |

### `key: create_vm_firewall_rule`
**Description**: Create a firewall rule for a QEMU VM.

Args:
    node: The node name.
    vmid: The VM ID.
    action: 'ACCEPT', 'DROP', 'REJECT'.
    type: 'in', 'out', 'group'.
    enable: 1 = enabled, 0 = disabled.
    source: Source CIDR or alias.
    dest: Destination CIDR or alias.
    proto: Protocol.
    dport: Destination port(s).
    macro: Predefined macro.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | ✅ Yes | Action |
| `comment` | `string` | No | Comment |
| `dest` | `string` | No | Dest |
| `dport` | `string` | No | Dport |
| `enable` | `integer` | No | Enable |
| `macro` | `string` | No | Macro |
| `node` | `string` | ✅ Yes | Node |
| `proto` | `string` | No | Proto |
| `source` | `string` | No | Source |
| `type` | `string` | ✅ Yes | Type |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: delete_cluster_firewall_rule`
**Description**: Delete a cluster-level firewall rule.

Args:
    pos: Rule position to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `pos` | `integer` | ✅ Yes | Pos |

### `key: delete_firewall_alias`
**Description**: Delete a firewall alias.

Args:
    name: Alias name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | ✅ Yes | Name |

### `key: delete_firewall_ipset_entry`
**Description**: Remove an IP/CIDR from an IP set.

Args:
    name: IP set name.
    cidr: IP address or CIDR to remove.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cidr` | `string` | ✅ Yes | Cidr |
| `name` | `string` | ✅ Yes | Name |

### `key: get_cluster_firewall_options`
**Description**: Get cluster-wide firewall options (enable, policy_in, policy_out, etc.).

*No arguments required.*

### `key: get_cluster_firewall_rule`
**Description**: Get a specific cluster firewall rule.

Args:
    pos: Rule position number.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `pos` | `integer` | ✅ Yes | Pos |

### `key: get_container_firewall_options`
**Description**: Get firewall options for an LXC container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_firewall_group_rules`
**Description**: List rules in a firewall security group.

Args:
    group: Security group name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `group` | `string` | ✅ Yes | Group |

### `key: get_firewall_refs`
**Description**: Get available firewall references (aliases, ipsets, names usable in rules).

*No arguments required.*

### `key: get_node_firewall_log`
**Description**: Get firewall log for a node.

Args:
    node: The node name.
    limit: Max entries.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `limit` | `integer` | No | Limit |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_firewall_options`
**Description**: Get firewall options for a specific node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_vm_firewall_options`
**Description**: Get firewall options for a QEMU VM.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: list_cluster_firewall_rules`
**Description**: List cluster-level firewall rules.

*No arguments required.*

### `key: list_container_firewall_rules`
**Description**: List firewall rules for an LXC container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: list_firewall_aliases`
**Description**: List cluster firewall aliases (named IP addresses/ranges).

*No arguments required.*

### `key: list_firewall_groups`
**Description**: List firewall security groups (reusable sets of rules).

*No arguments required.*

### `key: list_firewall_ipset_entries`
**Description**: List entries in a firewall IP set.

Args:
    name: IP set name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | ✅ Yes | Name |

### `key: list_firewall_ipsets`
**Description**: List cluster firewall IP sets (named groups of IPs).

*No arguments required.*

### `key: list_firewall_macros`
**Description**: List available firewall macros (predefined rule sets like SSH, HTTP, etc.).

*No arguments required.*

### `key: list_node_firewall_rules`
**Description**: List firewall rules for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_vm_firewall_rules`
**Description**: List firewall rules for a QEMU VM.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: set_cluster_firewall_options`
**Description**: Set cluster-wide firewall options.

Args:
    enable: 1 to enable, 0 to disable, -1 to not change.
    policy_in: Default input policy: 'ACCEPT', 'REJECT', 'DROP'.
    policy_out: Default output policy: 'ACCEPT', 'REJECT', 'DROP'.
    log_ratelimit: Log rate limit (e.g. 'enable=1,rate=1/second,burst=5').
    ebtables: 1 to enable ebtables rules, 0 to disable, -1 to not change.
    delete: Comma-separated options to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete` | `string` | No | Delete |
| `ebtables` | `integer` | No | Ebtables |
| `enable` | `integer` | No | Enable |
| `log_ratelimit` | `string` | No | Log Ratelimit |
| `policy_in` | `string` | No | Policy In |
| `policy_out` | `string` | No | Policy Out |

### `key: set_node_firewall_options`
**Description**: Set firewall options for a node.

Args:
    node: The node name.
    enable: 1 = enable, 0 = disable, -1 = don't change.
    log_level_in: Input log level.
    log_level_out: Output log level.
    ndp: 1 = enable NDP, 0 = disable, -1 = don't change.
    nf_conntrack_max: Max conntrack entries (0 = don't change).
    delete: Comma-separated options to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete` | `string` | No | Delete |
| `enable` | `integer` | No | Enable |
| `log_level_in` | `string` | No | Log Level In |
| `log_level_out` | `string` | No | Log Level Out |
| `ndp` | `integer` | No | Ndp |
| `nf_conntrack_max` | `integer` | No | Nf Conntrack Max |
| `node` | `string` | ✅ Yes | Node |

### `key: set_vm_firewall_options`
**Description**: Set firewall options for a QEMU VM.

Args:
    node: The node name.
    vmid: The VM ID.
    enable: 1 = enable, 0 = disable.
    dhcp: 1 = enable DHCP.
    ipfilter: 1 = enable IP filter.
    macfilter: 1 = enable MAC filter.
    policy_in: Input policy.
    policy_out: Output policy.
    delete: Comma-separated options to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete` | `string` | No | Delete |
| `dhcp` | `integer` | No | Dhcp |
| `enable` | `integer` | No | Enable |
| `ipfilter` | `integer` | No | Ipfilter |
| `macfilter` | `integer` | No | Macfilter |
| `node` | `string` | ✅ Yes | Node |
| `policy_in` | `string` | No | Policy In |
| `policy_out` | `string` | No | Policy Out |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: update_cluster_firewall_rule`
**Description**: Update a cluster-level firewall rule.

Args:
    pos: Rule position to update.
    action: 'ACCEPT', 'DROP', 'REJECT'.
    enable: 1 = enabled, 0 = disabled, -1 = don't change.
    source: Source address/range.
    dest: Destination address/range.
    proto: Protocol.
    sport: Source port(s).
    dport: Destination port(s).
    macro: Predefined macro.
    comment: Description.
    moveto: Move rule to this position.
    delete: Comma-separated properties to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | No | Action |
| `comment` | `string` | No | Comment |
| `delete` | `string` | No | Delete |
| `dest` | `string` | No | Dest |
| `dport` | `string` | No | Dport |
| `enable` | `integer` | No | Enable |
| `macro` | `string` | No | Macro |
| `moveto` | `integer` | No | Moveto |
| `pos` | `integer` | ✅ Yes | Pos |
| `proto` | `string` | No | Proto |
| `source` | `string` | No | Source |
| `sport` | `string` | No | Sport |

## 🛠️ HA Module

Total tools in category: **14**

### `key: create_ha_group`
**Description**: Create an HA group.

Args:
    group: Group ID.
    nodes: Node list with optional priority (e.g. 'node1:2,node2:1' — higher = preferred).
    nofailback: If true, don't fail back to higher-priority nodes once recovered.
    restricted: Only run on nodes in this group (otherwise runs anywhere but prefers group nodes).
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `group` | `string` | ✅ Yes | Group |
| `nodes` | `string` | ✅ Yes | Nodes |
| `nofailback` | `boolean` | No | Nofailback |
| `restricted` | `boolean` | No | Restricted |

### `key: create_ha_resource`
**Description**: Add a resource to HA management.

Args:
    sid: Resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101').
    group: HA group name.
    max_relocate: Max relocations on failure.
    max_restart: Max restarts on failure.
    state: Desired state: 'started', 'stopped', 'enabled', 'disabled', 'ignored'.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `group` | `string` | No | Group |
| `max_relocate` | `integer` | No | Max Relocate |
| `max_restart` | `integer` | No | Max Restart |
| `sid` | `string` | ✅ Yes | Sid |
| `state` | `string` | No | State |

### `key: delete_ha_group`
**Description**: Delete an HA group.

Args:
    group: Group ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `group` | `string` | ✅ Yes | Group |

### `key: delete_ha_resource`
**Description**: Remove a resource from HA management.

Args:
    sid: Resource ID (format: 'type:vmid').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `sid` | `string` | ✅ Yes | Sid |

### `key: get_ha_group`
**Description**: Get HA group configuration.

Args:
    group: Group ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `group` | `string` | ✅ Yes | Group |

### `key: get_ha_manager_status`
**Description**: Get detailed HA manager status.

*No arguments required.*

### `key: get_ha_resource`
**Description**: Get HA resource configuration.

Args:
    sid: HA resource ID (format: 'type:vmid', e.g. 'vm:100' or 'ct:101').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `sid` | `string` | ✅ Yes | Sid |

### `key: get_ha_status`
**Description**: Get HA manager status (active, quorum, manager status).

*No arguments required.*

### `key: list_ha_groups`
**Description**: List HA groups (define which nodes can run HA resources).

*No arguments required.*

### `key: list_ha_resources`
**Description**: List all HA-managed resources.

*No arguments required.*

### `key: migrate_ha_resource`
**Description**: Request migration of an HA resource to a different node.

Args:
    sid: Resource ID.
    node: Target node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `sid` | `string` | ✅ Yes | Sid |

### `key: relocate_ha_resource`
**Description**: Request relocation of an HA resource to a different node.

Args:
    sid: Resource ID.
    node: Target node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `sid` | `string` | ✅ Yes | Sid |

### `key: update_ha_group`
**Description**: Update an HA group.

Args:
    group: Group ID.
    nodes: Node list with optional priority.
    nofailback: Don't fail back.
    restricted: Only run on group nodes.
    comment: Description.
    delete: Comma-separated properties to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `delete` | `string` | No | Delete |
| `group` | `string` | ✅ Yes | Group |
| `nodes` | `string` | No | Nodes |
| `nofailback` | `boolean` | No | Nofailback |
| `restricted` | `boolean` | No | Restricted |

### `key: update_ha_resource`
**Description**: Update an HA resource configuration.

Args:
    sid: Resource ID.
    group: HA group name.
    max_relocate: Max relocations (-1 = don't change).
    max_restart: Max restarts (-1 = don't change).
    state: Desired state.
    comment: Description.
    delete: Comma-separated properties to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `delete` | `string` | No | Delete |
| `group` | `string` | No | Group |
| `max_relocate` | `integer` | No | Max Relocate |
| `max_restart` | `integer` | No | Max Restart |
| `sid` | `string` | ✅ Yes | Sid |
| `state` | `string` | No | State |

## 🛠️ LXC Module

Total tools in category: **26**

### `key: clone_container`
**Description**: Clone a container.

Args:
    node: The source node name.
    vmid: The source container ID.
    newid: ID for the new container.
    hostname: Hostname for the clone.
    target: Target node (default: same node).
    full: Full clone (True) or linked clone (False).
    storage: Target storage for full clone.
    description: Description.
    pool: Resource pool.
    snapname: Snapshot to clone from.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `description` | `string` | No | Description |
| `full` | `boolean` | No | Full |
| `hostname` | `string` | No | Hostname |
| `newid` | `integer` | ✅ Yes | Newid |
| `node` | `string` | ✅ Yes | Node |
| `pool` | `string` | No | Pool |
| `snapname` | `string` | No | Snapname |
| `storage` | `string` | No | Storage |
| `target` | `string` | No | Target |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: convert_container_to_template`
**Description**: Convert a container into a template (irreversible).

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_container`
**Description**: Create a new LXC container.

Args:
    node: The node name.
    vmid: The container ID.
    ostemplate: Template volume (e.g. 'local:vztmpl/debian-12-standard_12.2-1_amd64.tar.zst').
    hostname: Container hostname.
    password: Root password.
    ssh_public_keys: SSH public keys (newline delimited).
    storage: Storage for rootfs (default 'local').
    rootfs: Root filesystem spec (e.g. 'local-lvm:8' for 8GB).
    memory: Memory in MB (default 512).
    swap: Swap in MB (default 512).
    cores: CPU cores (default 1).
    cpulimit: CPU limit (0 = unlimited).
    net0: Network config (e.g. 'name=eth0,bridge=vmbr0,ip=dhcp').
    nameserver: DNS nameserver.
    searchdomain: DNS search domain.
    onboot: Start on host boot.
    start: Start after creation.
    unprivileged: Create an unprivileged container (default True, recommended).
    features: Comma-separated features (e.g. 'nesting=1,keyctl=1').
    description: Container description.
    pool: Resource pool.
    tags: Tags for the container.
    mp0: Mount point (e.g. 'local-lvm:4,mp=/mnt/data').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cores` | `integer` | No | Cores |
| `cpulimit` | `number` | No | Cpulimit |
| `description` | `string` | No | Description |
| `features` | `string` | No | Features |
| `hostname` | `string` | No | Hostname |
| `memory` | `integer` | No | Memory |
| `mp0` | `string` | No | Mp0 |
| `nameserver` | `string` | No | Nameserver |
| `net0` | `string` | No | Net0 |
| `node` | `string` | ✅ Yes | Node |
| `onboot` | `boolean` | No | Onboot |
| `ostemplate` | `string` | ✅ Yes | Ostemplate |
| `password` | `string` | No | Password |
| `pool` | `string` | No | Pool |
| `rootfs` | `string` | No | Rootfs |
| `searchdomain` | `string` | No | Searchdomain |
| `ssh_public_keys` | `string` | No | Ssh Public Keys |
| `start` | `boolean` | No | Start |
| `storage` | `string` | No | Storage |
| `swap` | `integer` | No | Swap |
| `tags` | `string` | No | Tags |
| `unprivileged` | `boolean` | No | Unprivileged |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_container_snapshot`
**Description**: Create a snapshot of a container.

Args:
    node: The node name.
    vmid: The container ID.
    snapname: Snapshot name.
    description: Snapshot description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `description` | `string` | No | Description |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: delete_container`
**Description**: Delete a container. Must be stopped first unless force=True.

Args:
    node: The node name.
    vmid: The container ID.
    purge: Remove from replication, HA, backup and ACLs too.
    destroy_unreferenced_disks: Destroy unreferenced disks.
    force: Force destroy even if running.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `destroy_unreferenced_disks` | `boolean` | No | Destroy Unreferenced Disks |
| `force` | `boolean` | No | Force |
| `node` | `string` | ✅ Yes | Node |
| `purge` | `boolean` | No | Purge |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: delete_container_snapshot`
**Description**: Delete a container snapshot.

Args:
    node: The node name.
    vmid: The container ID.
    snapname: Snapshot name.
    force: Force delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force` | `boolean` | No | Force |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_config`
**Description**: Get the configuration of a container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_feature`
**Description**: Check if a feature is available for a container (snapshot, clone, copy).

Args:
    node: The node name.
    vmid: The container ID.
    feature: Feature to check ('snapshot', 'clone', 'copy').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `feature` | `string` | ✅ Yes | Feature |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_interfaces`
**Description**: Get network interfaces and IPs of a running container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_pending`
**Description**: Get pending configuration changes for a container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_rrddata`
**Description**: Get RRD statistics data for a container (CPU, memory, disk, network over time).

Args:
    node: The node name.
    vmid: The container ID.
    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `timeframe` | `string` | No | Timeframe |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_container_status`
**Description**: Get the current runtime status of a container.

Args:
    node: The node name.
    vmid: The container ID (CTID).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: list_container_snapshots`
**Description**: List all snapshots of a container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: list_containers`
**Description**: List all LXC containers on a node with status, memory, CPU, and disk info.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: lxc_exec_sync`
**Description**: Execute a command inside an LXC container and wait for completion.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node name |
| `vmid` | `integer` | ✅ Yes | Container ID |
| `command` | `string` | ✅ Yes | Command to execute |
| `timeout_seconds` | `integer` | No | Timeout in seconds (default 30) |

### `key: migrate_container`
**Description**: Migrate a container to another node.

Args:
    node: The source node.
    vmid: The container ID.
    target: Target node name.
    online: Live migration.
    restart: Restart container after migration (for non-live).
    target_storage: Target storage mapping.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `online` | `boolean` | No | Online |
| `restart` | `boolean` | No | Restart |
| `target` | `string` | ✅ Yes | Target |
| `target_storage` | `string` | No | Target Storage |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: move_container_volume`
**Description**: Move a container volume to different storage or to another container.

Args:
    node: The node name.
    vmid: The container ID.
    volume: Volume name (e.g. 'rootfs', 'mp0').
    storage: Target storage.
    target_vmid: Target container ID.
    target_volume: Target volume slot.
    delete_original: Delete original after move.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete_original` | `boolean` | No | Delete Original |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | No | Storage |
| `target_vmid` | `integer` | No | Target Vmid |
| `target_volume` | `string` | No | Target Volume |
| `vmid` | `integer` | ✅ Yes | Vmid |
| `volume` | `string` | ✅ Yes | Volume |

### `key: reboot_container`
**Description**: Reboot a container.

Args:
    node: The node name.
    vmid: The container ID.
    timeout: Timeout in seconds.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: resize_container_disk`
**Description**: Resize a container disk/volume.

Args:
    node: The node name.
    vmid: The container ID.
    disk: Disk name (e.g. 'rootfs', 'mp0').
    size: New size or increment (e.g. '10G', '+2G').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `disk` | `string` | ✅ Yes | Disk |
| `node` | `string` | ✅ Yes | Node |
| `size` | `string` | ✅ Yes | Size |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: resume_container`
**Description**: Resume a suspended container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: rollback_container_snapshot`
**Description**: Rollback a container to a previous snapshot.

Args:
    node: The node name.
    vmid: The container ID.
    snapname: Snapshot name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: shutdown_container`
**Description**: Gracefully shut down a container.

Args:
    node: The node name.
    vmid: The container ID.
    timeout: Timeout in seconds before force stop.
    force_stop: Force stop after timeout.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force_stop` | `boolean` | No | Force Stop |
| `node` | `string` | ✅ Yes | Node |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: start_container`
**Description**: Start a container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: stop_container`
**Description**: Hard-stop a container (immediate, like power off).

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: suspend_container`
**Description**: Suspend (freeze) a container.

Args:
    node: The node name.
    vmid: The container ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: update_container_config`
**Description**: Update the configuration of an existing container.

Args:
    node: The node name.
    vmid: The container ID.
    hostname: Container hostname.
    memory: Memory in MB.
    swap: Swap in MB.
    cores: CPU cores.
    cpulimit: CPU limit (0 = unlimited).
    net0: Network config.
    nameserver: DNS nameserver.
    searchdomain: DNS search domain.
    onboot: Start on boot.
    description: Description.
    features: Comma-separated features.
    tags: Tags for the container.
    delete: Comma-separated list of settings to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cores` | `integer` | No | Cores |
| `cpulimit` | `number` | No | Cpulimit |
| `delete` | `string` | No | Delete |
| `description` | `string` | No | Description |
| `features` | `string` | No | Features |
| `hostname` | `string` | No | Hostname |
| `memory` | `integer` | No | Memory |
| `nameserver` | `string` | No | Nameserver |
| `net0` | `string` | No | Net0 |
| `node` | `string` | ✅ Yes | Node |
| `onboot` | `string` | No | Onboot |
| `searchdomain` | `string` | No | Searchdomain |
| `swap` | `integer` | No | Swap |
| `tags` | `string` | No | Tags |
| `vmid` | `integer` | ✅ Yes | Vmid |

## 🛠️ NODES Module

Total tools in category: **45**

### `key: bulk_start_node_vms`
**Description**: Bulk start VMs/containers on a node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `vms` | `string` | No | Comma-separated VMIDs/CTIDs to start |

### `key: bulk_stop_node_vms`
**Description**: Bulk stop VMs/containers on a node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `timeout` | `integer` | No | Timeout in seconds per guest |

### `key: create_node_network_interface`
**Description**: Create a network interface on a node.

Args:
    node: The node name.
    iface: Interface name (e.g. 'vmbr1').
    type: Interface type (bridge, bond, eth, alias, vlan, OVSBridge, OVSPort, OVSIntPort, OVSBond).
    address: IP address (CIDR notation or IP).
    netmask: Subnet mask.
    gateway: Default gateway.
    bridge_ports: Bridge ports (for bridge type).
    autostart: Whether to start on boot.
    comments: Comments for the interface.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `address` | `string` | No | Address |
| `autostart` | `boolean` | No | Autostart |
| `bridge_ports` | `string` | No | Bridge Ports |
| `comments` | `string` | No | Comments |
| `gateway` | `string` | No | Gateway |
| `iface` | `string` | ✅ Yes | Iface |
| `netmask` | `string` | No | Netmask |
| `node` | `string` | ✅ Yes | Node |
| `type` | `string` | ✅ Yes | Type |

### `key: download_appliance_template`
**Description**: Download an appliance template to local storage.

Args:
    node: The node name.
    storage: Target storage ID.
    template: Template name to download.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `template` | `string` | ✅ Yes | Template |

### `key: get_disk_smart`
**Description**: Get S.M.A.R.T. health data for a disk.

Args:
    node: The node name.
    disk: Disk device path (e.g. '/dev/sda').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `disk` | `string` | ✅ Yes | Disk |
| `node` | `string` | ✅ Yes | Node |

### `key: get_disk_smart`
**Description**: Get S.M.A.R.T. health attributes and status for a specific physical disk on a node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `disk` | `string` | ✅ Yes | Disk device path or name (e.g. /dev/sda or sda) |

### `key: get_node_aplinfo`
**Description**: List available appliance templates (LXC templates) that can be downloaded.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_apt_update`
**Description**: List available package updates on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_capabilities_qemu`
**Description**: Get QEMU capabilities for a node: supported CPU models, machine types, etc.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_config`
**Description**: Get the configuration of a node (description, wakeonlan, etc.).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_disks`
**Description**: List physical disks on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_dns`
**Description**: Get DNS settings for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_hardware_pci`
**Description**: List PCI hardware devices on a node (for passthrough).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_hardware_usb`
**Description**: List USB hardware devices on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_hosts`
**Description**: Get the /etc/hosts file content for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_journal`
**Description**: Read systemd journal entries from a node.

Args:
    node: The node name.
    lastentries: Max number of entries (default 50).
    since: Show entries since date/time.
    until: Show entries until date/time.
    startcursor: Start cursor for paging.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `lastentries` | `integer` | No | Lastentries |
| `node` | `string` | ✅ Yes | Node |
| `since` | `string` | No | Since |
| `startcursor` | `string` | No | Startcursor |
| `until` | `string` | No | Until |

### `key: get_node_netstat`
**Description**: Get network statistics for a node (per-interface traffic).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_network`
**Description**: Get network interface configuration for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_network_interface`
**Description**: Get details for a specific network interface.

Args:
    node: The node name.
    iface: Interface name (e.g. 'vmbr0', 'eth0').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `iface` | `string` | ✅ Yes | Iface |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_report`
**Description**: Generate a system report for a node (useful for diagnostics).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_status`
**Description**: Get detailed status of a specific node including CPU, memory, disk, uptime, and kernel info.

Args:
    node: The node name (e.g. 'pve1').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_storage_scan`
**Description**: Scan for available storage targets (NFS, CIFS, iSCSI, LVM, ZFS, PBS).

Args:
    node: The node name.
    scan_type: Type to scan: 'nfs', 'cifs', 'iscsi', 'lvm', 'lvmthin', 'zfs', 'pbs'.
    server: Server address (required for nfs, cifs, iscsi, pbs).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `scan_type` | `string` | ✅ Yes | Scan Type |
| `server` | `string` | No | Server |

### `key: get_node_subscription`
**Description**: Get subscription status for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_syslog`
**Description**: Read system log (syslog) entries from a node.

Args:
    node: The node name.
    limit: Max number of log lines to return (default 50).
    start: Start line number.
    since: Only show entries since this date (YYYY-MM-DD).
    until: Only show entries until this date (YYYY-MM-DD).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `limit` | `integer` | No | Limit |
| `node` | `string` | ✅ Yes | Node |
| `since` | `string` | No | Since |
| `start` | `integer` | No | Start |
| `until` | `string` | No | Until |

### `key: get_node_time`
**Description**: Get the current time and timezone of a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_node_version`
**Description**: Get Proxmox VE version information for a specific node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_task_log`
**Description**: Get log output of a specific task.

Args:
    node: The node name.
    upid: The task UPID string.
    limit: Max lines to return.
    start: Start line number.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `limit` | `integer` | No | Limit |
| `node` | `string` | ✅ Yes | Node |
| `start` | `integer` | No | Start |
| `upid` | `string` | ✅ Yes | Upid |

### `key: get_task_log`
**Description**: Get detailed log lines for a specific background task by UPID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `upid` | `string` | ✅ Yes | Task UPID |
| `start` | `integer` | No | Start line index |
| `limit` | `integer` | No | Max lines to return |

### `key: get_task_status`
**Description**: Get the status of a specific task by its UPID.

Args:
    node: The node name.
    upid: The task UPID string.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `upid` | `string` | ✅ Yes | Upid |

### `key: list_lvm_pools`
**Description**: List LVM volume groups on a node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |

### `key: list_lvmthin_pools`
**Description**: List LVM-Thin pools on a node.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |

### `key: list_node_disks`
**Description**: List physical disks on a node with health, size, model, serial, and wearout status.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `include_partitions` | `boolean` | No | Include partitions in disk list |

### `key: list_node_pci_devices`
**Description**: List PCI devices on a node (useful for GPU or network passthrough configuration).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `pci_class_blacklist` | `string` | No | Class blacklist filter |

### `key: list_node_services`
**Description**: List all system services on a node (pve, ssh, cron, etc.).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_node_tasks`
**Description**: List recent tasks on a node.

Args:
    node: The node name.
    limit: Max tasks to return (default 50).
    start: Offset for paging.
    vmid: Filter by VM ID (0 = all).
    typefilter: Filter by task type (e.g. 'qmstart', 'vzstart', 'vzcreate').
    statusfilter: Filter by status ('running', 'ok', 'error', etc.).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `limit` | `integer` | No | Limit |
| `node` | `string` | ✅ Yes | Node |
| `start` | `integer` | No | Start |
| `statusfilter` | `string` | No | Statusfilter |
| `typefilter` | `string` | No | Typefilter |
| `vmid` | `integer` | No | Vmid |

### `key: list_node_usb_devices`
**Description**: List USB devices attached to a node (useful for USB passthrough).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |

### `key: list_nodes`
**Description**: List all nodes in the Proxmox cluster with their status, CPU, memory, and uptime.

*No arguments required.*

### `key: list_zfs_pools`
**Description**: List ZFS storage pools on a node with status, health, size, and free space.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |

### `key: manage_node_service`
**Description**: Start, stop, restart, or reload a system service on a node.

Args:
    node: The node name.
    service: Service name (e.g. 'pvedaemon', 'pveproxy', 'ssh', 'cron', 'postfix').
    action: One of 'start', 'stop', 'restart', 'reload'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `action` | `string` | ✅ Yes | Action |
| `node` | `string` | ✅ Yes | Node |
| `service` | `string` | ✅ Yes | Service |

### `key: run_apt_update`
**Description**: Refresh the package index on a node (apt update).

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: startall_node`
**Description**: Start all VMs and containers on a node (respecting boot order).

Args:
    node: The node name.
    force: Force start even if already running.
    vms: Comma-separated list of VMIDs to start (empty = all).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force` | `boolean` | No | Force |
| `node` | `string` | ✅ Yes | Node |
| `vms` | `string` | No | Vms |

### `key: stop_node_task`
**Description**: Stop or cancel an active background task on a node using its UPID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | The node name |
| `upid` | `string` | ✅ Yes | Task UPID |

### `key: stop_task`
**Description**: Stop (abort) a running task.

Args:
    node: The node name.
    upid: The task UPID string.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `upid` | `string` | ✅ Yes | Upid |

### `key: stopall_node`
**Description**: Stop all VMs and containers on a node.

Args:
    node: The node name.
    vms: Comma-separated list of VMIDs to stop (empty = all).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vms` | `string` | No | Vms |

### `key: wakeonlan_node`
**Description**: Send a Wake-on-LAN magic packet to a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

## 🛠️ POOLS Module

Total tools in category: **14**

### `key: create_pool`
**Description**: Create a resource pool.

Args:
    poolid: Pool ID.
    comment: Description.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `poolid` | `string` | ✅ Yes | Poolid |

### `key: delete_pool`
**Description**: Delete a resource pool.

Args:
    poolid: Pool ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `poolid` | `string` | ✅ Yes | Poolid |

### `key: get_acme_account`
**Description**: Get ACME account details.

Args:
    name: Account name (default: 'default').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | No | Name |

### `key: get_acme_directories`
**Description**: List known ACME directory URLs.

*No arguments required.*

### `key: get_acme_plugin`
**Description**: Get ACME plugin configuration.

Args:
    id: Plugin ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | ✅ Yes | Id |

### `key: get_acme_tos`
**Description**: Get the ACME Terms of Service URL.

*No arguments required.*

### `key: get_node_certificates`
**Description**: Get certificate info for a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: get_pool`
**Description**: Get pool configuration and members.

Args:
    poolid: Pool ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `poolid` | `string` | ✅ Yes | Poolid |

### `key: list_acme_accounts`
**Description**: List ACME (Let's Encrypt) accounts.

*No arguments required.*

### `key: list_acme_plugins`
**Description**: List ACME DNS challenge plugins.

*No arguments required.*

### `key: list_pools`
**Description**: List all resource pools.

*No arguments required.*

### `key: order_node_certificate`
**Description**: Order/renew ACME certificate for a node.

Args:
    node: The node name.
    force: Force renewal even if not due.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force` | `boolean` | No | Force |
| `node` | `string` | ✅ Yes | Node |

### `key: register_acme_account`
**Description**: Register a new ACME account.

Args:
    contact: Contact email address.
    directory: ACME directory URL (empty = Let's Encrypt production).
    name: Account name.
    tos_url: Terms of service URL to accept.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `contact` | `string` | ✅ Yes | Contact |
| `directory` | `string` | No | Directory |
| `name` | `string` | No | Name |
| `tos_url` | `string` | No | Tos Url |

### `key: update_pool`
**Description**: Update a resource pool (add/remove members).

Args:
    poolid: Pool ID.
    comment: Description.
    vms: Comma-separated VMIDs to add/remove.
    storage: Comma-separated storage IDs to add/remove.
    delete: If true, remove the specified vms/storage from the pool instead of adding.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `comment` | `string` | No | Comment |
| `delete` | `boolean` | No | Delete |
| `poolid` | `string` | ✅ Yes | Poolid |
| `storage` | `string` | No | Storage |
| `vms` | `string` | No | Vms |

## 🛠️ QEMU Module

Total tools in category: **40**

### `key: clone_vm`
**Description**: Clone a VM to create a new one. Can be a full copy or linked clone.

Args:
    node: The source node name.
    vmid: The source VM ID.
    newid: The VMID for the new clone.
    name: Name for the clone.
    target: Target node for the clone (default: same node).
    full: Full clone (True) or linked clone (False).
    storage: Target storage for full clone.
    description: Description for the clone.
    pool: Resource pool.
    snapname: Snapshot name to clone from.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `description` | `string` | No | Description |
| `full` | `boolean` | No | Full |
| `name` | `string` | No | Name |
| `newid` | `integer` | ✅ Yes | Newid |
| `node` | `string` | ✅ Yes | Node |
| `pool` | `string` | No | Pool |
| `snapname` | `string` | No | Snapname |
| `storage` | `string` | No | Storage |
| `target` | `string` | No | Target |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: convert_vm_to_template`
**Description**: Convert a VM into a template (irreversible).

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_vm`
**Description**: Create a new QEMU virtual machine.

Args:
    node: The node name.
    vmid: The VM ID number.
    name: VM name.
    memory: Memory in MB (default 2048).
    cores: Number of CPU cores per socket (default 1).
    sockets: Number of CPU sockets (default 1).
    cpu: CPU type (default 'host').
    ostype: OS type: l26 (Linux 2.6+), win10, win11, wxp, other, etc.
    scsihw: SCSI controller: virtio-scsi-single, virtio-scsi-pci, lsi, megasas, pvscsi.
    scsi0: First SCSI disk (e.g. 'local-lvm:32' for 32GB on local-lvm).
    ide2: IDE device, often used for CD-ROM (e.g. 'local:iso/ubuntu.iso,media=cdrom').
    net0: Network device (e.g. 'virtio,bridge=vmbr0').
    boot: Boot order, for example scsi0 then ide2 then net0.
    bios: BIOS type: seabios, ovmf (UEFI).
    machine: Machine type (e.g. 'q35', 'i440fx').
    cdrom: CD-ROM ISO image path.
    agent: QEMU guest agent: '1' to enable, 'enabled=1,fstrim_cloned_disks=1'.
    start: Start the VM after creation.
    onboot: Start on host boot.
    description: VM description.
    pool: Resource pool to add the VM to.
    tags: Tags for the VM.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `agent` | `string` | No | Agent |
| `bios` | `string` | No | Bios |
| `boot` | `string` | No | Boot |
| `cdrom` | `string` | No | Cdrom |
| `cores` | `integer` | No | Cores |
| `cpu` | `string` | No | Cpu |
| `description` | `string` | No | Description |
| `ide2` | `string` | No | Ide2 |
| `machine` | `string` | No | Machine |
| `memory` | `integer` | No | Memory |
| `name` | `string` | No | Name |
| `net0` | `string` | No | Net0 |
| `node` | `string` | ✅ Yes | Node |
| `onboot` | `boolean` | No | Onboot |
| `ostype` | `string` | No | Ostype |
| `pool` | `string` | No | Pool |
| `scsi0` | `string` | No | Scsi0 |
| `scsihw` | `string` | No | Scsihw |
| `sockets` | `integer` | No | Sockets |
| `start` | `boolean` | No | Start |
| `tags` | `string` | No | Tags |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_vm_snapshot`
**Description**: Create a snapshot of a VM.

Args:
    node: The node name.
    vmid: The VM ID.
    snapname: Snapshot name.
    description: Snapshot description.
    vmstate: Include RAM state (for running VMs).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `description` | `string` | No | Description |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |
| `vmstate` | `boolean` | No | Vmstate |

### `key: delete_vm`
**Description**: Delete a VM. The VM must be stopped first.

Args:
    node: The node name.
    vmid: The VM ID.
    purge: Remove from replication, HA, backup jobs and ACLs too.
    destroy_unreferenced_disks: Also destroy unreferenced disks owned by the VM.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `destroy_unreferenced_disks` | `boolean` | No | Destroy Unreferenced Disks |
| `node` | `string` | ✅ Yes | Node |
| `purge` | `boolean` | No | Purge |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: delete_vm_snapshot`
**Description**: Delete a VM snapshot.

Args:
    node: The node name.
    vmid: The VM ID.
    snapname: Snapshot name to delete.
    force: Force delete even if snapshot is in use.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force` | `boolean` | No | Force |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: dump_vm_cloudinit`
**Description**: Dump the Cloud-Init generated config file (user-data, network-data, or meta-data).

Args:
    node: The node name.
    vmid: The VM ID.
    type: Config type: 'user', 'network', or 'meta'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `type` | `string` | No | Type |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_cloudinit`
**Description**: Get Cloud-Init configuration for a VM.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_config`
**Description**: Get the configuration of a VM.

Args:
    node: The node name.
    vmid: The VM ID.
    current: If True, return current (runtime) config. If False, return pending config.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `current` | `boolean` | No | Current |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_feature`
**Description**: Check if a specific feature is available/supported for a VM (e.g. snapshot, clone, copy).

Args:
    node: The node name.
    vmid: The VM ID.
    feature: Feature to check ('snapshot', 'clone', 'copy').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `feature` | `string` | ✅ Yes | Feature |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_pending`
**Description**: Get pending configuration changes for a VM (not yet applied).

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_rrddata`
**Description**: Get RRD statistics data for a VM (CPU, memory, disk, network over time).

Args:
    node: The node name.
    vmid: The VM ID.
    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `timeframe` | `string` | No | Timeframe |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_snapshot_config`
**Description**: Get the configuration stored in a VM snapshot.

Args:
    node: The node name.
    vmid: The VM ID.
    snapname: The snapshot name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_spiceproxy`
**Description**: Create a SPICE proxy connection for a VM console.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_status`
**Description**: Get the current runtime status of a VM (state, CPU, memory, disk, network, uptime).

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: get_vm_vncproxy`
**Description**: Create a VNC proxy connection ticket for a VM (for console access).

Args:
    node: The node name.
    vmid: The VM ID.
    websocket: Use WebSocket connection.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |
| `websocket` | `boolean` | No | Websocket |

### `key: list_vm_snapshots`
**Description**: List all snapshots of a VM.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: list_vms`
**Description**: List all QEMU virtual machines on a node with status, memory, CPU, and disk info.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: migrate_vm`
**Description**: Migrate a VM to another node in the cluster.

Args:
    node: The source node.
    vmid: The VM ID.
    target: Target node name.
    online: Live migration (True) or offline (False).
    with_local_disks: Migrate local disks as well.
    targetstorage: Target storage mapping for migration (e.g. 'local-lvm').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `online` | `boolean` | No | Online |
| `target` | `string` | ✅ Yes | Target |
| `targetstorage` | `string` | No | Targetstorage |
| `vmid` | `integer` | ✅ Yes | Vmid |
| `with_local_disks` | `boolean` | No | With Local Disks |

### `key: move_vm_disk`
**Description**: Move a VM disk to different storage or attach to another VM.

Args:
    node: The node name.
    vmid: The VM ID.
    disk: Source disk name (e.g. 'scsi0').
    storage: Target storage ID (for moving to different storage).
    target_vmid: Target VM ID (for moving disk to another VM).
    target_disk: Target disk slot on the target VM.
    delete_original: Delete the original disk after moving.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `delete_original` | `boolean` | No | Delete Original |
| `disk` | `string` | ✅ Yes | Disk |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | No | Storage |
| `target_disk` | `string` | No | Target Disk |
| `target_vmid` | `integer` | No | Target Vmid |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: reboot_vm`
**Description**: Reboot a VM via ACPI.

Args:
    node: The node name.
    vmid: The VM ID.
    timeout: Wait timeout in seconds.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: reset_vm`
**Description**: Hard reset a VM (like pressing the reset button).

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: resize_vm_disk`
**Description**: Resize a VM disk. Can only grow, not shrink.

Args:
    node: The node name.
    vmid: The VM ID.
    disk: Disk name (e.g. 'scsi0', 'virtio0', 'ide0').
    size: New size or size increment (e.g. '50G', '+10G').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `disk` | `string` | ✅ Yes | Disk |
| `node` | `string` | ✅ Yes | Node |
| `size` | `string` | ✅ Yes | Size |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: resume_vm`
**Description**: Resume a suspended/paused VM.

Args:
    node: The node name.
    vmid: The VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: rollback_vm_snapshot`
**Description**: Rollback a VM to a previous snapshot (current state will be lost).

Args:
    node: The node name.
    vmid: The VM ID.
    snapname: The snapshot name to rollback to.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `snapname` | `string` | ✅ Yes | Snapname |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: send_vm_key`
**Description**: Send a key event to a VM (e.g. ctrl-alt-del).

Args:
    node: The node name.
    vmid: The VM ID.
    key: Key combination (e.g. 'ctrl-alt-delete').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `key` | `string` | ✅ Yes | Key |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: send_vm_monitor_command`
**Description**: Send a QEMU monitor command to a VM (advanced/low-level).

Args:
    node: The node name.
    vmid: The VM ID.
    command: The QEMU monitor command.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `command` | `string` | ✅ Yes | Command |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: shutdown_vm`
**Description**: Gracefully shut down a VM via ACPI. Falls back to hard stop after timeout if force_stop is true.

Args:
    node: The node name.
    vmid: The VM ID.
    timeout: Timeout in seconds before force stop.
    force_stop: Force stop after timeout (default True).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `force_stop` | `boolean` | No | Force Stop |
| `node` | `string` | ✅ Yes | Node |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: start_vm`
**Description**: Start a VM.

Args:
    node: The node name.
    vmid: The VM ID.
    timeout: Timeout in seconds (0 = default).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: stop_vm`
**Description**: Hard-stop a VM (like pulling the power plug). Prefer shutdown_vm for graceful stop.

Args:
    node: The node name.
    vmid: The VM ID.
    timeout: Wait timeout in seconds.
    skiplock: Ignore locks (requires root).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `skiplock` | `boolean` | No | Skiplock |
| `timeout` | `integer` | No | Timeout |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: suspend_vm`
**Description**: Suspend a VM (pause execution or hibernate to disk).

Args:
    node: The node name.
    vmid: The VM ID.
    todisk: If True, hibernate to disk. If False, pause in RAM.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `todisk` | `boolean` | No | Todisk |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: update_vm_cloudinit`
**Description**: Set Cloud-Init parameters for a VM (user, password, SSH keys, network).

Args:
    node: The node name.
    vmid: The VM ID.
    ciuser: Cloud-Init user name.
    cipassword: Cloud-Init password.
    sshkeys: SSH public keys (URL-encoded, newline delimited).
    ipconfig0: IP config for first interface (e.g. 'ip=dhcp' or 'ip=10.0.0.5/24,gw=10.0.0.1').
    nameserver: DNS nameserver IP.
    searchdomain: DNS search domain.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `cipassword` | `string` | No | Cipassword |
| `ciuser` | `string` | No | Ciuser |
| `ipconfig0` | `string` | No | Ipconfig0 |
| `nameserver` | `string` | No | Nameserver |
| `node` | `string` | ✅ Yes | Node |
| `searchdomain` | `string` | No | Searchdomain |
| `sshkeys` | `string` | No | Sshkeys |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: update_vm_config`
**Description**: Update the configuration of an existing VM. Only provided parameters are changed.

Args:
    node: The node name.
    vmid: The VM ID.
    name: VM name.
    memory: Memory in MB.
    cores: CPU cores per socket.
    sockets: CPU sockets.
    cpu: CPU type.
    net0: Network config.
    description: Description.
    onboot: Start on boot.
    agent: Guest agent config.
    boot: Boot order.
    tags: Tags for the VM.
    hotplug: Hotplug features (disk, network, usb, memory, cpu).
    delete: Comma-separated list of settings to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `agent` | `string` | No | Agent |
| `boot` | `string` | No | Boot |
| `cores` | `integer` | No | Cores |
| `cpu` | `string` | No | Cpu |
| `delete` | `string` | No | Delete |
| `description` | `string` | No | Description |
| `hotplug` | `string` | No | Hotplug |
| `memory` | `integer` | No | Memory |
| `name` | `string` | No | Name |
| `net0` | `string` | No | Net0 |
| `node` | `string` | ✅ Yes | Node |
| `onboot` | `string` | No | Onboot |
| `sockets` | `integer` | No | Sockets |
| `tags` | `string` | No | Tags |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_exec`
**Description**: Execute a command inside a VM via the QEMU Guest Agent.

Args:
    node: The node name.
    vmid: The VM ID.
    command: The command to execute.
    input_data: Data to pass to stdin.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `command` | `string` | ✅ Yes | Command |
| `input_data` | `string` | No | Input Data |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_exec_status`
**Description**: Get the status/result of a command previously executed via the guest agent.

Args:
    node: The node name.
    vmid: The VM ID.
    pid: The PID returned by the exec call.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `pid` | `integer` | ✅ Yes | Pid |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_exec_sync`
**Description**: Synchronously execute a command inside a VM via QEMU Guest Agent, waiting for output and exit status.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node name |
| `vmid` | `integer` | ✅ Yes | VM ID |
| `command` | `string` | ✅ Yes | Command string or shell command |
| `input_data` | `string` | No | Stdin input data |
| `timeout_seconds` | `integer` | No | Timeout in seconds (default 30) |
| `use_shell` | `boolean` | No | Wrap in /bin/sh -c (default true) |

### `key: vm_agent_file_read`
**Description**: Read a file from inside a VM via the guest agent.

Args:
    node: The node name.
    vmid: The VM ID.
    file: Absolute file path inside the guest.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `file` | `string` | ✅ Yes | File |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_file_write`
**Description**: Write content to a file inside a VM via the guest agent.

Args:
    node: The node name.
    vmid: The VM ID.
    file: Absolute file path inside the guest.
    content: File content to write.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | ✅ Yes | Content |
| `file` | `string` | ✅ Yes | File |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_get_info`
**Description**: Get various system information from a VM via the guest agent.

Args:
    node: The node name.
    vmid: The VM ID.
    info_type: Info to retrieve: 'get-osinfo', 'get-host-name', 'get-time',
               'get-timezone', 'get-users', 'get-vcpus', 'get-fsinfo',
               'get-memory-blocks', 'get-memory-block-info', 'info',
               'network-get-interfaces'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `info_type` | `string` | No | Info Type |
| `node` | `string` | ✅ Yes | Node |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: vm_agent_set_password`
**Description**: Set a user password inside a VM via the guest agent.

Args:
    node: The node name.
    vmid: The VM ID.
    username: The username.
    password: The new password.
    crypted: If True, password is already encrypted.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `crypted` | `boolean` | No | Crypted |
| `node` | `string` | ✅ Yes | Node |
| `password` | `string` | ✅ Yes | Password |
| `username` | `string` | ✅ Yes | Username |
| `vmid` | `integer` | ✅ Yes | Vmid |

## 🛠️ SDN Module

Total tools in category: **17**

### `key: apply_sdn_changes`
**Description**: Apply pending SDN configuration changes to all nodes.

*No arguments required.*

### `key: create_sdn_subnet`
**Description**: Create a subnet for an SDN VNet.

Args:
    vnet: VNet ID.
    subnet: Subnet CIDR (e.g. '10.0.0.0/24').
    gateway: Gateway IP.
    snat: Enable SNAT.
    dnszoneprefix: DNS zone prefix.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `dnszoneprefix` | `string` | No | Dnszoneprefix |
| `gateway` | `string` | No | Gateway |
| `snat` | `boolean` | No | Snat |
| `subnet` | `string` | ✅ Yes | Subnet |
| `vnet` | `string` | ✅ Yes | Vnet |

### `key: create_sdn_vnet`
**Description**: Create an SDN VNet.

Args:
    vnet: VNet ID.
    zone: Zone ID.
    tag: VLAN tag.
    alias: Display alias.
    vlanaware: Enable VLAN-aware bridge.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `alias` | `string` | No | Alias |
| `tag` | `integer` | No | Tag |
| `vlanaware` | `boolean` | No | Vlanaware |
| `vnet` | `string` | ✅ Yes | Vnet |
| `zone` | `string` | ✅ Yes | Zone |

### `key: create_sdn_zone`
**Description**: Create an SDN zone.

Args:
    zone: Zone ID.
    type: Zone type: 'simple', 'vlan', 'qinq', 'vxlan', 'evpn'.
    nodes: Comma-separated node list.
    ipam: IPAM plugin name.
    dns: DNS plugin name.
    bridge: Bridge name.
    mtu: MTU.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `bridge` | `string` | No | Bridge |
| `dns` | `string` | No | Dns |
| `ipam` | `string` | No | Ipam |
| `mtu` | `integer` | No | Mtu |
| `nodes` | `string` | No | Nodes |
| `type` | `string` | ✅ Yes | Type |
| `zone` | `string` | ✅ Yes | Zone |

### `key: delete_sdn_vnet`
**Description**: Delete an SDN VNet.

Args:
    vnet: VNet ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vnet` | `string` | ✅ Yes | Vnet |

### `key: delete_sdn_zone`
**Description**: Delete an SDN zone.

Args:
    zone: Zone ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `zone` | `string` | ✅ Yes | Zone |

### `key: get_sdn_controller`
**Description**: Get SDN controller configuration.

Args:
    controller: Controller ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `controller` | `string` | ✅ Yes | Controller |

### `key: get_sdn_ipam`
**Description**: Get IPAM plugin configuration.

Args:
    ipam: IPAM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `ipam` | `string` | ✅ Yes | Ipam |

### `key: get_sdn_vnet`
**Description**: Get SDN VNet configuration.

Args:
    vnet: VNet ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vnet` | `string` | ✅ Yes | Vnet |

### `key: get_sdn_zone`
**Description**: Get SDN zone configuration.

Args:
    zone: Zone ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `zone` | `string` | ✅ Yes | Zone |

### `key: list_sdn_controllers`
**Description**: List SDN controllers (e.g. EVPN controller).

*No arguments required.*

### `key: list_sdn_dns`
**Description**: List SDN DNS plugins.

*No arguments required.*

### `key: list_sdn_ipams`
**Description**: List IPAM (IP Address Management) plugins.

*No arguments required.*

### `key: list_sdn_subnets`
**Description**: List subnets for an SDN VNet.

Args:
    vnet: VNet ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `vnet` | `string` | ✅ Yes | Vnet |

### `key: list_sdn_vnets`
**Description**: List SDN virtual networks (VNets).

*No arguments required.*

### `key: list_sdn_zones`
**Description**: List SDN zones.

*No arguments required.*

### `key: update_sdn_vnet`
**Description**: Update an SDN VNet.

Args:
    vnet: VNet ID.
    zone: Zone ID.
    tag: VLAN tag (-1 = don't change).
    alias: Display alias.
    delete: Comma-separated properties to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `alias` | `string` | No | Alias |
| `delete` | `string` | No | Delete |
| `tag` | `integer` | No | Tag |
| `vnet` | `string` | ✅ Yes | Vnet |
| `zone` | `string` | No | Zone |

## 🛠️ STORAGE Module

Total tools in category: **26**

### `key: allocate_storage_volume`
**Description**: Allocate a new disk volume in storage.

Args:
    node: The node name.
    storage: The storage ID.
    vmid: VM ID to associate with.
    filename: Volume name.
    size: Volume size (e.g. '10G').
    format: Disk format (raw, qcow2, vmdk). Auto-detected if empty.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `filename` | `string` | ✅ Yes | Filename |
| `format` | `string` | No | Format |
| `node` | `string` | ✅ Yes | Node |
| `size` | `string` | ✅ Yes | Size |
| `storage` | `string` | ✅ Yes | Storage |
| `vmid` | `integer` | ✅ Yes | Vmid |

### `key: create_directory_storage`
**Description**: Create a directory-based storage mount from a device.

Args:
    node: The node name.
    name: Storage name.
    device: Block device path.
    filesystem: Filesystem type (ext4, xfs).
    add_to_storage: Auto-add as Proxmox storage.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `add_to_storage` | `boolean` | No | Add To Storage |
| `device` | `string` | ✅ Yes | Device |
| `filesystem` | `string` | No | Filesystem |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |

### `key: create_lvm`
**Description**: Create a new LVM volume group on a device.

Args:
    node: The node name.
    name: VG name.
    device: Block device path (e.g. '/dev/sdb').
    add_to_storage: Auto-add as Proxmox storage.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `add_to_storage` | `boolean` | No | Add To Storage |
| `device` | `string` | ✅ Yes | Device |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |

### `key: create_lvmthin`
**Description**: Create a new LVM thin pool.

Args:
    node: The node name.
    name: Thin pool name.
    device: Block device path.
    add_to_storage: Auto-add as Proxmox storage.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `add_to_storage` | `boolean` | No | Add To Storage |
| `device` | `string` | ✅ Yes | Device |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |

### `key: create_storage`
**Description**: Create a new storage pool configuration.

Args:
    storage: Storage ID.
    type: Storage type: dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs.
    path: File system path (for dir, nfs mounts).
    server: Server IP/hostname (for nfs, cifs, iscsi, pbs, glusterfs, rbd, cephfs).
    export: NFS export path.
    vgname: LVM volume group name.
    thinpool: LVM thin pool name (for lvmthin).
    pool: Pool name (for Ceph RBD/CephFS, ZFS).
    portal: iSCSI portal.
    target: iSCSI target.
    datastore: PBS datastore name.
    content: Comma-separated content types (images, rootdir, vztmpl, iso, backup, snippets, import).
    nodes: Restrict storage to these nodes (comma-separated).
    shared: Mark as shared storage.
    disable: Create disabled.
    maxfiles: Max backup files (0 = unlimited).
    prune_backups: Backup retention policy.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | No | Content |
| `datastore` | `string` | No | Datastore |
| `disable` | `boolean` | No | Disable |
| `export` | `string` | No | Export |
| `maxfiles` | `integer` | No | Maxfiles |
| `nodes` | `string` | No | Nodes |
| `path` | `string` | No | Path |
| `pool` | `string` | No | Pool |
| `portal` | `string` | No | Portal |
| `prune_backups` | `string` | No | Prune Backups |
| `server` | `string` | No | Server |
| `shared` | `boolean` | No | Shared |
| `storage` | `string` | ✅ Yes | Storage |
| `target` | `string` | No | Target |
| `thinpool` | `string` | No | Thinpool |
| `type` | `string` | ✅ Yes | Type |
| `vgname` | `string` | No | Vgname |

### `key: create_zfs_pool`
**Description**: Create a new ZFS pool.

Args:
    node: The node name.
    name: Pool name.
    raidlevel: RAID level: single, mirror, raid10, raidz, raidz2, raidz3, draid, draid2, draid3.
    devices: Space-separated device paths (e.g. '/dev/sdb /dev/sdc').
    add_to_storage: Auto-add as Proxmox storage.
    ashift: ashift value (default 12).
    compression: Compression (on, off, lz4, zstd, etc.).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `add_to_storage` | `boolean` | No | Add To Storage |
| `ashift` | `integer` | No | Ashift |
| `compression` | `string` | No | Compression |
| `devices` | `string` | ✅ Yes | Devices |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |
| `raidlevel` | `string` | ✅ Yes | Raidlevel |

### `key: delete_storage`
**Description**: Delete a storage pool configuration (does not delete data on the backend).

Args:
    storage: The storage ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `storage` | `string` | ✅ Yes | Storage |

### `key: delete_storage_volume`
**Description**: Delete a volume from storage.

Args:
    node: The node name.
    storage: The storage ID.
    volume: The volume ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `volume` | `string` | ✅ Yes | Volume |

### `key: download_url_to_storage`
**Description**: Download a file from a URL directly to storage (ISO, template, etc.).

Args:
    node: The node name.
    storage: The storage ID.
    url: URL to download from.
    content: Content type: 'iso', 'vztmpl'.
    filename: Target filename.
    checksum: Expected checksum.
    checksum_algorithm: Checksum algorithm (sha256, sha512, md5).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `checksum` | `string` | No | Checksum |
| `checksum_algorithm` | `string` | No | Checksum Algorithm |
| `content` | `string` | ✅ Yes | Content |
| `filename` | `string` | ✅ Yes | Filename |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `url` | `string` | ✅ Yes | Url |

### `key: get_node_storage_status`
**Description**: Get usage status of a storage pool on a node (total, used, available).

Args:
    node: The node name.
    storage: The storage ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |

### `key: get_storage_config`
**Description**: Get configuration of a specific storage pool.

Args:
    storage: The storage ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `storage` | `string` | ✅ Yes | Storage |

### `key: get_storage_rrddata`
**Description**: Get RRD statistics for a storage pool (usage over time).

Args:
    node: The node name.
    storage: The storage ID.
    timeframe: Time range: 'hour', 'day', 'week', 'month', 'year'.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `timeframe` | `string` | No | Timeframe |

### `key: get_storage_volume_info`
**Description**: Get details about a specific volume in storage.

Args:
    node: The node name.
    storage: The storage ID.
    volume: The volume ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `volume` | `string` | ✅ Yes | Volume |

### `key: get_zfs_pool`
**Description**: Get details of a ZFS pool.

Args:
    node: The node name.
    name: ZFS pool name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | ✅ Yes | Name |
| `node` | `string` | ✅ Yes | Node |

### `key: initialize_gpt`
**Description**: Initialize a disk with GPT partition table (WARNING: destroys all data).

Args:
    node: The node name.
    disk: Disk device path (e.g. '/dev/sdb').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `disk` | `string` | ✅ Yes | Disk |
| `node` | `string` | ✅ Yes | Node |

### `key: list_directory_storage`
**Description**: List directory-based storage mounts on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_file_restore`
**Description**: List files in a backup volume for file-level restore (PBS backups).

Args:
    node: The node name.
    storage: The storage ID.
    volume: The backup volume ID.
    filepath: Path inside the backup to list (default '/').

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `filepath` | `string` | No | Filepath |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `volume` | `string` | ✅ Yes | Volume |

### `key: list_lvm_volumes`
**Description**: List LVM volume groups on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_lvmthin_pools`
**Description**: List LVM thin pools on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: list_node_storage`
**Description**: List storage pools available on a specific node with usage info.

Args:
    node: The node name.
    content: Filter by content type (images, rootdir, vztmpl, iso, backup).
    enabled: Only show enabled storage.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | No | Content |
| `enabled` | `boolean` | No | Enabled |
| `node` | `string` | ✅ Yes | Node |

### `key: list_storage`
**Description**: List all configured storage pools at the datacenter level.

Args:
    type: Filter by type (dir, lvm, lvmthin, zfspool, nfs, cifs, iscsi, rbd, cephfs, pbs, glusterfs, btrfs).
    enabled: Only show enabled storage (default True).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `enabled` | `boolean` | No | Enabled |
| `type` | `string` | No | Type |

### `key: list_storage_content`
**Description**: List content of a storage pool (disk images, ISOs, templates, backups).

Args:
    node: The node name.
    storage: The storage ID.
    content: Filter by type: 'images', 'rootdir', 'vztmpl', 'iso', 'backup', 'snippets'.
    vmid: Filter by VM ID.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | No | Content |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `vmid` | `integer` | No | Vmid |

### `key: list_zfs_pools`
**Description**: List ZFS pools on a node.

Args:
    node: The node name.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `node` | `string` | ✅ Yes | Node |

### `key: prune_storage_backups`
**Description**: Prune (delete) old backups from storage according to retention policy.

Args:
    node: The node name.
    storage: The storage ID.
    type: Guest type filter ('qemu' or 'lxc').
    vmid: Filter by VM ID.
    prune_backups: Retention spec (e.g. 'keep-last=3,keep-daily=7,keep-weekly=4').
    dry_run: If True, only simulate (default True for safety).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `dry_run` | `boolean` | No | Dry Run |
| `node` | `string` | ✅ Yes | Node |
| `prune_backups` | `string` | No | Prune Backups |
| `storage` | `string` | ✅ Yes | Storage |
| `type` | `string` | No | Type |
| `vmid` | `integer` | No | Vmid |

### `key: update_storage`
**Description**: Update an existing storage pool configuration.

Args:
    storage: The storage ID to update.
    content: Content types (images, rootdir, vztmpl, iso, backup, snippets, import).
    nodes: Allowed nodes (comma-separated).
    shared: Mark as shared.
    disable: Disable this storage.
    prune_backups: Backup retention policy.
    delete: Comma-separated list of settings to delete.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | No | Content |
| `delete` | `string` | No | Delete |
| `disable` | `string` | No | Disable |
| `nodes` | `string` | No | Nodes |
| `prune_backups` | `string` | No | Prune Backups |
| `shared` | `string` | No | Shared |
| `storage` | `string` | ✅ Yes | Storage |

### `key: upload_to_storage`
**Description**: Upload a file (ISO, template, etc.) to storage. Note: actual file upload must go through the HTTP API directly.

Args:
    node: The node name.
    storage: The storage ID.
    content: Content type: 'iso', 'vztmpl', 'snippets', 'import'.
    filename: Target filename.
    tmpfilename: Temporary filename for the upload.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `content` | `string` | ✅ Yes | Content |
| `filename` | `string` | ✅ Yes | Filename |
| `node` | `string` | ✅ Yes | Node |
| `storage` | `string` | ✅ Yes | Storage |
| `tmpfilename` | `string` | No | Tmpfilename |
