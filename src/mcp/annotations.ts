/**
 * MCP tool annotations (https://modelcontextprotocol.io/specification) let
 * clients decide which tools can run without a confirmation prompt.
 *
 *  - readOnlyHint:    the tool does not change anything.
 *  - destructiveHint: the tool may delete data, interrupt running workloads or
 *                     overwrite configuration (only meaningful when not read-only).
 *  - idempotentHint:  calling it again with the same arguments has no extra effect.
 *
 * Classification is name-based because every tool follows a verb_object naming
 * scheme. Unknown write tools default to destructive so clients stay cautious.
 */

export interface ToolAnnotations {
  title: string;
  readOnlyHint: boolean;
  destructiveHint: boolean;
  idempotentHint: boolean;
  openWorldHint: boolean;
}

/** Guest-agent tools that only inspect the guest. They still need write API access (agent exec is a POST). */
const GUEST_READ_TOOLS = new Set([
  'vm_agent_exec_status',
  'vm_agent_file_read',
  'vm_agent_get_info',
  'vm_agent_ping',
  'vm_docker_ps',
  'vm_docker_images',
  'vm_docker_logs',
  'vm_docker_inspect',
  'vm_docker_stats',
  'vm_docker_network_ls',
  'vm_docker_volume_ls',
  'vm_docker_info',
  'vm_docker_compose_logs',
  'vm_docker_compose_ps',
  'vm_service_status',
  'vm_system_info',
]);

/** Tools that read but must call a POST endpoint (e.g. to mint a console ticket). */
const POST_READ_TOOLS = new Set(['get_vm_vncproxy', 'get_vm_spiceproxy']);

/** Write tools that only add things and never remove, stop or overwrite. */
const ADDITIVE_PREFIXES = [
  'create_',
  'add_',
  'start_',
  'startall_',
  'bulk_start_',
  'clone_',
  'download_',
  'upload_',
  'allocate_',
  'register_',
  'order_',
  'resume_',
  'wakeonlan_',
  'run_apt_update',
  'test_notification_target',
  'vm_docker_pull',
  'vm_docker_start',
];

/** Write tools that are safe to repeat. */
const IDEMPOTENT_WRITE_PREFIXES = [
  'start_',
  'startall_',
  'bulk_start_',
  'stop_',
  'stopall_',
  'bulk_stop_',
  'shutdown_',
  'bulk_shutdown_',
  'suspend_',
  'resume_',
  'set_',
  'update_',
  'run_apt_update',
  'vm_docker_pull',
  'vm_docker_start',
  'vm_docker_stop',
  'vm_service_manage',
  'vm_docker_compose_up',
  'vm_docker_compose_down',
];

const READ_PREFIXES = ['get_', 'list_', 'dump_'];

function startsWithAny(name: string, prefixes: string[]): boolean {
  return prefixes.some((p) => name === p || name.startsWith(p));
}

export function isReadOnlyTool(name: string): boolean {
  return GUEST_READ_TOOLS.has(name) || POST_READ_TOOLS.has(name) || startsWithAny(name, READ_PREFIXES);
}

/**
 * True when the tool needs a non-GET Proxmox API call even though it does not
 * change anything, so it is blocked by PROXMOX_READ_ONLY.
 */
export function needsWriteAccess(name: string): boolean {
  if (GUEST_READ_TOOLS.has(name) || POST_READ_TOOLS.has(name)) return true;
  return !isReadOnlyTool(name);
}

export function titleFromName(name: string): string {
  const special: Record<string, string> = {
    vm: 'VM', lxc: 'LXC', ha: 'HA', sdn: 'SDN', acl: 'ACL', tfa: 'TFA', acme: 'ACME', dns: 'DNS',
    pci: 'PCI', usb: 'USB', zfs: 'ZFS', lvm: 'LVM', lvmthin: 'LVM-thin', gpt: 'GPT', ipset: 'IP set',
    ipsets: 'IP sets', vnet: 'VNet', vnets: 'VNets', ipam: 'IPAM', ipams: 'IPAMs', rrddata: 'RRD data',
    vzdump: 'vzdump', smart: 'SMART', vmid: 'VMID', mds: 'MDS', osd: 'OSD', osds: 'OSDs', fs: 'FS',
    vncproxy: 'VNC proxy', spiceproxy: 'SPICE proxy', cloudinit: 'cloud-init', apt: 'APT', ps: 'ps',
    ls: 'ls', rm: 'rm', rmi: 'rmi', api: 'API', crush: 'CRUSH', ceph: 'Ceph', mcp: 'MCP',
  };
  const words = name.split('_').map((w) => special[w] ?? w);
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function getToolAnnotations(name: string): ToolAnnotations {
  const readOnly = isReadOnlyTool(name);
  const destructive = readOnly ? false : !startsWithAny(name, ADDITIVE_PREFIXES);
  const idempotent = readOnly || startsWithAny(name, IDEMPOTENT_WRITE_PREFIXES);

  return {
    title: titleFromName(name),
    readOnlyHint: readOnly,
    destructiveHint: destructive,
    idempotentHint: idempotent,
    // Every tool talks to a single, known Proxmox cluster.
    openWorldHint: false,
  };
}
