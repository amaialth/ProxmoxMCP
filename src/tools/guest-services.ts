/**
 * guest-services.ts
 *
 * High-level tools for managing services and containers INSIDE VMs and LXC
 * containers via the QEMU Guest Agent or LXC agent. These tools wrap the
 * low-level vmAgentExecSync / lxcAgentExecSync functions and expose
 * purpose-built interfaces for Docker, Docker Compose, systemd, and arbitrary
 * shell commands so an AI agent does not need to know every CLI flag.
 *
 * Requirements (QEMU VMs):
 *   - qemu-guest-agent must be installed and running inside the VM
 *   - The VM config must have agent: enabled=1
 *
 * Requirements (LXC containers):
 *   - qemu-guest-agent must be installed inside the container
 *   - The LXC config must have features: nesting=1 (for Docker)
 *   - The container config must have agent: 1
 */

import { formatResponse } from '../proxmox/client.js';
import { vmAgentExecSync, lxcAgentExecSync, GuestExecOptions } from '../proxmox/guest-exec.js';
import { ProxmoxTool } from './types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeResult(res: Awaited<ReturnType<typeof vmAgentExecSync>>) {
  return formatResponse({
    exitcode: res.exitcode,
    timedOut: res.timedOut,
    stdout: res.stdout,
    stderr: res.stderr,
    success: res.exitcode === 0 && !res.timedOut,
  });
}

const vmBaseProps = {
  node: { type: 'string', description: 'Proxmox node name' },
  vmid: { type: 'integer', description: 'VM ID' },
};

const lxcBaseProps = {
  node: { type: 'string', description: 'Proxmox node name' },
  vmid: { type: 'integer', description: 'LXC container ID' },
};

const timeoutProp = {
  timeout_seconds: { type: 'integer', description: 'Command timeout in seconds (default 60)', default: 60 },
};

type ExecFn = (opts: GuestExecOptions) => ReturnType<typeof vmAgentExecSync>;

// ---------------------------------------------------------------------------
// Tool factory - produces Docker + service tools for vm_ and lxc_ prefixes
// ---------------------------------------------------------------------------

function makeDockerTools(
  prefix: 'vm' | 'lxc',
  baseProps: Record<string, unknown>,
  execFn: ExecFn,
): ProxmoxTool[] {
  const label = prefix === 'vm' ? 'VM' : 'LXC container';
  const agentNote =
    prefix === 'vm'
      ? 'Requires qemu-guest-agent running inside the VM and agent: enabled=1 in VM config.'
      : 'Requires qemu-guest-agent inside the container, agent: 1 in CT config, and features: nesting=1 for Docker.';

  async function exec(args: Record<string, any>, cmd: string, defaultTimeout = 60) {
    const opts: GuestExecOptions = {
      node: String(args.node),
      vmid: Number(args.vmid),
      command: cmd,
      useShell: true,
      timeoutSeconds: args.timeout_seconds ?? defaultTimeout,
    };
    return execFn(opts);
  }

  return [
    {
      name: `${prefix}_docker_ps`,
      description: `List Docker containers inside a ${label} via the guest agent. ${agentNote}\n\nReturns container ID, image, status, names, and ports.`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          all: { type: 'boolean', description: 'Include stopped containers (default true)', default: true },
          ...timeoutProp,
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const all = args.all !== false ? '-a' : '';
        const res = await exec(args, `docker ps ${all} --format '{{json .}}'`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ containers: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_images`,
      description: `List Docker images inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: { type: 'object', properties: { ...baseProps, ...timeoutProp }, required: ['node', 'vmid'] },
      execute: async (args) => {
        const res = await exec(args, `docker images --format '{{json .}}'`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ images: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_pull`,
      description: `Pull a Docker image inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          image: { type: 'string', description: 'Docker image (e.g. nginx:latest)' },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 300 for large images)', default: 300 },
        },
        required: ['node', 'vmid', 'image'],
      },
      execute: async (args) => makeResult(await exec(args, `docker pull ${JSON.stringify(String(args.image))}`, 300)),
    },
    {
      name: `${prefix}_docker_run`,
      description: `Run a Docker container inside a ${label}. ${agentNote}\n\nArgs:\n    image: Docker image (e.g. nginx:latest)\n    name: Container name\n    detach: Run in background (default true)\n    ports: Port mappings comma-separated e.g. "8080:80,443:443"\n    env: Env vars comma-separated e.g. "KEY=val,FOO=bar"\n    volumes: Volume mounts comma-separated e.g. "/data:/app"\n    network: Docker network name\n    restart: Restart policy (no, always, unless-stopped, on-failure)\n    extra_args: Additional docker run flags`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          image: { type: 'string', description: 'Docker image to run' },
          name: { type: 'string', description: 'Container name' },
          detach: { type: 'boolean', description: 'Run in background (default true)', default: true },
          ports: { type: 'string', description: 'Port mappings comma-separated (e.g. "8080:80,443:443")' },
          env: { type: 'string', description: 'Env vars comma-separated (e.g. "KEY=val,FOO=bar")' },
          volumes: { type: 'string', description: 'Volume mounts comma-separated (e.g. "/data:/app")' },
          network: { type: 'string', description: 'Docker network name' },
          restart: { type: 'string', description: 'Restart policy: no, always, unless-stopped, on-failure' },
          extra_args: { type: 'string', description: 'Additional docker run flags' },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'image'],
      },
      execute: async (args) => {
        const parts = ['docker run'];
        if (args.detach !== false) parts.push('-d');
        if (args.name) parts.push(`--name ${JSON.stringify(String(args.name))}`);
        if (args.restart) parts.push(`--restart ${args.restart}`);
        if (args.network) parts.push(`--network ${args.network}`);
        if (args.ports) {
          for (const p of String(args.ports).split(',').map((s: string) => s.trim()).filter(Boolean)) parts.push(`-p ${p}`);
        }
        if (args.env) {
          for (const e of String(args.env).split(',').map((s: string) => s.trim()).filter(Boolean)) parts.push(`-e ${JSON.stringify(e)}`);
        }
        if (args.volumes) {
          for (const v of String(args.volumes).split(',').map((s: string) => s.trim()).filter(Boolean)) parts.push(`-v ${v}`);
        }
        if (args.extra_args) parts.push(String(args.extra_args));
        parts.push(JSON.stringify(String(args.image)));
        return makeResult(await exec(args, parts.join(' ')));
      },
    },
    {
      name: `${prefix}_docker_stop`,
      description: `Stop Docker containers inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          containers: { type: 'string', description: 'Container name(s) or ID(s), space-separated' },
          timeout: { type: 'integer', description: 'Seconds before SIGKILL (default 10)', default: 10 },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'containers'],
      },
      execute: async (args) => makeResult(await exec(args, `docker stop -t ${args.timeout ?? 10} ${args.containers}`)),
    },
    {
      name: `${prefix}_docker_start`,
      description: `Start stopped Docker containers inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: { ...baseProps, containers: { type: 'string', description: 'Container name(s) or ID(s), space-separated' }, ...timeoutProp },
        required: ['node', 'vmid', 'containers'],
      },
      execute: async (args) => makeResult(await exec(args, `docker start ${args.containers}`)),
    },
    {
      name: `${prefix}_docker_restart`,
      description: `Restart Docker containers inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: { ...baseProps, containers: { type: 'string', description: 'Container name(s) or ID(s), space-separated' }, ...timeoutProp },
        required: ['node', 'vmid', 'containers'],
      },
      execute: async (args) => makeResult(await exec(args, `docker restart ${args.containers}`)),
    },
    {
      name: `${prefix}_docker_rm`,
      description: `Remove Docker containers inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          containers: { type: 'string', description: 'Container name(s) or ID(s), space-separated' },
          force: { type: 'boolean', description: 'Force removal of running containers', default: false },
          volumes: { type: 'boolean', description: 'Remove anonymous volumes', default: false },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'containers'],
      },
      execute: async (args) => {
        const flags = [args.force ? '-f' : '', args.volumes ? '-v' : ''].filter(Boolean).join(' ');
        return makeResult(await exec(args, `docker rm ${flags} ${args.containers}`));
      },
    },
    {
      name: `${prefix}_docker_rmi`,
      description: `Remove Docker images inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          images: { type: 'string', description: 'Image name(s) or ID(s), space-separated' },
          force: { type: 'boolean', description: 'Force removal', default: false },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'images'],
      },
      execute: async (args) => makeResult(await exec(args, `docker rmi ${args.force ? '-f' : ''} ${args.images}`)),
    },
    {
      name: `${prefix}_docker_exec`,
      description: `Execute a command inside a running Docker container within a ${label}. ${agentNote}\n\nNests: Proxmox guest agent -> docker exec -> your command.`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          container: { type: 'string', description: 'Docker container name or ID' },
          command: { type: 'string', description: 'Command to run inside the container' },
          user: { type: 'string', description: 'User to run as (e.g. root)' },
          workdir: { type: 'string', description: 'Working directory inside the container' },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'container', 'command'],
      },
      execute: async (args) => {
        const flags = [
          args.user ? `-u ${JSON.stringify(String(args.user))}` : '',
          args.workdir ? `-w ${JSON.stringify(String(args.workdir))}` : '',
        ].filter(Boolean).join(' ');
        const cmd = `docker exec ${flags} ${JSON.stringify(String(args.container))} /bin/sh -c ${JSON.stringify(String(args.command))}`;
        return makeResult(await exec(args, cmd));
      },
    },
    {
      name: `${prefix}_docker_logs`,
      description: `Get logs from a Docker container inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          container: { type: 'string', description: 'Container name or ID' },
          tail: { type: 'integer', description: 'Log lines from end (default 100)', default: 100 },
          since: { type: 'string', description: 'Show logs since (e.g. "1h", "2024-01-01")' },
          timestamps: { type: 'boolean', description: 'Show timestamps', default: false },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'container'],
      },
      execute: async (args) => {
        const flags = [
          `--tail ${args.tail ?? 100}`,
          args.since ? `--since ${JSON.stringify(String(args.since))}` : '',
          args.timestamps ? '--timestamps' : '',
        ].filter(Boolean).join(' ');
        return makeResult(await exec(args, `docker logs ${flags} ${JSON.stringify(String(args.container))} 2>&1`));
      },
    },
    {
      name: `${prefix}_docker_inspect`,
      description: `Inspect Docker objects (container, image, network, volume) inside a ${label}. Returns JSON. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          objects: { type: 'string', description: 'Object name(s)/ID(s), space-separated' },
          type: { type: 'string', description: 'Object type: container, image, network, volume', default: 'container' },
          format: { type: 'string', description: 'Go template format string (optional)' },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'objects'],
      },
      execute: async (args) => {
        const typeFlag = args.type ? `--type ${args.type}` : '';
        const formatFlag = args.format ? `--format ${JSON.stringify(String(args.format))}` : '';
        const res = await exec(args, `docker inspect ${typeFlag} ${formatFlag} ${args.objects}`);
        try {
          return formatResponse({ data: JSON.parse(res.stdout), stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_stats`,
      description: `Get CPU/memory/IO usage stats for Docker containers inside a ${label} (single snapshot). ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          containers: { type: 'string', description: 'Container name(s)/ID(s), leave empty for all' },
          ...timeoutProp,
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const targets = args.containers ? String(args.containers) : '';
        const res = await exec(args, `docker stats --no-stream --format '{{json .}}' ${targets}`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ stats: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_network_ls`,
      description: `List Docker networks inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: { type: 'object', properties: { ...baseProps, ...timeoutProp }, required: ['node', 'vmid'] },
      execute: async (args) => {
        const res = await exec(args, `docker network ls --format '{{json .}}'`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ networks: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_volume_ls`,
      description: `List Docker volumes inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: { type: 'object', properties: { ...baseProps, ...timeoutProp }, required: ['node', 'vmid'] },
      execute: async (args) => {
        const res = await exec(args, `docker volume ls --format '{{json .}}'`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ volumes: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_system_prune`,
      description: `Remove unused Docker data inside a ${label} (stopped containers, dangling images, unused networks). ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          all: { type: 'boolean', description: 'Remove all unused images (not just dangling)', default: false },
          volumes: { type: 'boolean', description: 'Also prune volumes', default: false },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 120)', default: 120 },
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const flags = ['-f', args.all ? '-a' : '', args.volumes ? '--volumes' : ''].filter(Boolean).join(' ');
        return makeResult(await exec(args, `docker system prune ${flags}`, 120));
      },
    },
    {
      name: `${prefix}_docker_compose_up`,
      description: `Run docker compose up inside a ${label}. ${agentNote}\n\nArgs:\n    project_dir: Directory containing docker-compose.yml\n    compose_file: Custom compose file path\n    services: Services to bring up (space-separated, default all)\n    detach: Run in background (default true)\n    build: Rebuild images before starting\n    pull: Pull latest images first`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory with docker-compose.yml' },
          compose_file: { type: 'string', description: 'Custom docker-compose.yml path' },
          services: { type: 'string', description: 'Services to start (space-separated, default all)' },
          detach: { type: 'boolean', description: 'Run in background (default true)', default: true },
          build: { type: 'boolean', description: 'Build images before starting', default: false },
          pull: { type: 'boolean', description: 'Pull latest images', default: false },
          env_file: { type: 'string', description: '.env file path inside the guest' },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 300)', default: 300 },
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const composeFlags = [
          args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '',
          args.env_file ? `--env-file ${JSON.stringify(String(args.env_file))}` : '',
        ].filter(Boolean).join(' ');
        const upFlags = [
          args.detach !== false ? '-d' : '',
          args.build ? '--build' : '',
          args.pull ? '--pull always' : '',
        ].filter(Boolean).join(' ');
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        const services = args.services ? ` ${args.services}` : '';
        return makeResult(await exec(args, `${cdPart}docker compose ${composeFlags} up ${upFlags}${services}`, 300));
      },
    },
    {
      name: `${prefix}_docker_compose_down`,
      description: `Run docker compose down inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory' },
          compose_file: { type: 'string', description: 'docker-compose.yml path' },
          volumes: { type: 'boolean', description: 'Remove named volumes', default: false },
          remove_orphans: { type: 'boolean', description: 'Remove orphaned containers', default: false },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 120)', default: 120 },
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const composeFlags = args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '';
        const downFlags = [args.volumes ? '-v' : '', args.remove_orphans ? '--remove-orphans' : ''].filter(Boolean).join(' ');
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        return makeResult(await exec(args, `${cdPart}docker compose ${composeFlags} down ${downFlags}`, 120));
      },
    },
    {
      name: `${prefix}_docker_compose_logs`,
      description: `Get logs from Docker Compose services inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory' },
          compose_file: { type: 'string', description: 'docker-compose.yml path' },
          services: { type: 'string', description: 'Service(s) to get logs for (default all)' },
          tail: { type: 'integer', description: 'Lines from end (default 100)', default: 100 },
          timestamps: { type: 'boolean', description: 'Include timestamps', default: false },
          ...timeoutProp,
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const composeFlags = args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '';
        const logFlags = [`--tail ${args.tail ?? 100}`, args.timestamps ? '--timestamps' : '', '--no-color'].filter(Boolean).join(' ');
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        const services = args.services ? ` ${args.services}` : '';
        return makeResult(await exec(args, `${cdPart}docker compose ${composeFlags} logs ${logFlags}${services} 2>&1`));
      },
    },
    {
      name: `${prefix}_docker_compose_ps`,
      description: `List containers in a Docker Compose project inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory' },
          compose_file: { type: 'string', description: 'docker-compose.yml path' },
          ...timeoutProp,
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const flags = args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '';
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        const res = await exec(args, `${cdPart}docker compose ${flags} ps --format json`);
        try {
          const lines = res.stdout.split('\n').map((l: string) => l.trim()).filter(Boolean).map((l: string) => JSON.parse(l));
          return formatResponse({ services: lines, stderr: res.stderr, exitcode: res.exitcode });
        } catch { return makeResult(res); }
      },
    },
    {
      name: `${prefix}_docker_compose_pull`,
      description: `Pull latest images for Docker Compose services inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory' },
          compose_file: { type: 'string', description: 'docker-compose.yml path' },
          services: { type: 'string', description: 'Services to pull (default all)' },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 300)', default: 300 },
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const flags = args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '';
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        const services = args.services ? ` ${args.services}` : '';
        return makeResult(await exec(args, `${cdPart}docker compose ${flags} pull${services}`, 300));
      },
    },
    {
      name: `${prefix}_docker_compose_restart`,
      description: `Restart Docker Compose services inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          project_dir: { type: 'string', description: 'Working directory' },
          compose_file: { type: 'string', description: 'docker-compose.yml path' },
          services: { type: 'string', description: 'Services to restart (default all)' },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 120)', default: 120 },
        },
        required: ['node', 'vmid'],
      },
      execute: async (args) => {
        const flags = args.compose_file ? `-f ${JSON.stringify(String(args.compose_file))}` : '';
        const cdPart = args.project_dir ? `cd ${JSON.stringify(String(args.project_dir))} && ` : '';
        const services = args.services ? ` ${args.services}` : '';
        return makeResult(await exec(args, `${cdPart}docker compose ${flags} restart${services}`, 120));
      },
    },
    {
      name: `${prefix}_service_status`,
      description: `Check status of a systemd service inside a ${label}. ${agentNote}\n\nReturns active/sub state and recent journal entries.`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          service: { type: 'string', description: 'Service name (e.g. nginx, docker, mysql)' },
          journal_lines: { type: 'integer', description: 'Journal log lines to include (default 20)', default: 20 },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'service'],
      },
      execute: async (args) => {
        const svc = String(args.service).endsWith('.service') ? args.service : `${args.service}.service`;
        const lines = args.journal_lines ?? 20;
        const cmd = `systemctl status ${JSON.stringify(svc)} --no-pager -l 2>&1; echo '--- JOURNAL ---'; journalctl -u ${JSON.stringify(svc)} --no-pager -n ${lines} --output=short-precise 2>&1`;
        return makeResult(await exec(args, cmd));
      },
    },
    {
      name: `${prefix}_service_manage`,
      description: `Manage a systemd service inside a ${label} (start, stop, restart, enable, disable, reload). ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          service: { type: 'string', description: 'Service name (e.g. nginx, docker)' },
          action: {
            type: 'string',
            description: 'Action: start, stop, restart, reload, enable, disable, mask, unmask',
            enum: ['start', 'stop', 'restart', 'reload', 'enable', 'disable', 'mask', 'unmask'],
          },
          ...timeoutProp,
        },
        required: ['node', 'vmid', 'service', 'action'],
      },
      execute: async (args) => {
        const valid = ['start', 'stop', 'restart', 'reload', 'enable', 'disable', 'mask', 'unmask'];
        if (!valid.includes(String(args.action))) {
          return formatResponse({ error: `Invalid action "${args.action}". Must be one of: ${valid.join(', ')}` });
        }
        return makeResult(await exec(args, `systemctl ${args.action} ${JSON.stringify(String(args.service))}`));
      },
    },
    {
      name: `${prefix}_run_shell`,
      description: `Execute an arbitrary shell command inside a ${label} via the guest agent. ${agentNote}\n\nCommand is wrapped in /bin/sh -c. Both stdout and stderr are returned synchronously.`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          command: { type: 'string', description: 'Shell command to execute' },
          input_data: { type: 'string', description: 'Data to pass to stdin' },
          timeout_seconds: { type: 'integer', description: 'Timeout in seconds (default 60)', default: 60 },
        },
        required: ['node', 'vmid', 'command'],
      },
      execute: async (args) => {
        const opts: GuestExecOptions = {
          node: String(args.node),
          vmid: Number(args.vmid),
          command: String(args.command),
          inputData: args.input_data ? String(args.input_data) : undefined,
          useShell: true,
          timeoutSeconds: args.timeout_seconds ?? 60,
        };
        return makeResult(await execFn(opts));
      },
    },
    {
      name: `${prefix}_package_install`,
      description: `Install packages inside a ${label} using apt-get (Debian/Ubuntu). ${agentNote}`,
      module: 'guest-services',
      parameters: {
        type: 'object',
        properties: {
          ...baseProps,
          packages: { type: 'string', description: 'Space-separated package names (e.g. "nginx curl git")' },
          update_first: { type: 'boolean', description: 'Run apt-get update first (default true)', default: true },
          timeout_seconds: { type: 'integer', description: 'Timeout (default 300)', default: 300 },
        },
        required: ['node', 'vmid', 'packages'],
      },
      execute: async (args) => {
        const updatePart = args.update_first !== false ? 'DEBIAN_FRONTEND=noninteractive apt-get update -qq && ' : '';
        const cmd = `${updatePart}DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${args.packages} 2>&1`;
        return makeResult(await exec(args, cmd, 300));
      },
    },
    {
      name: `${prefix}_system_info`,
      description: `Get OS, CPU, memory, disk, network and uptime info from inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: { type: 'object', properties: { ...baseProps, ...timeoutProp }, required: ['node', 'vmid'] },
      execute: async (args) => {
        const cmd = [
          'echo "=== OS ===" && cat /etc/os-release 2>/dev/null || uname -a',
          'echo "=== HOSTNAME ===" && hostname -f 2>/dev/null || hostname',
          'echo "=== UPTIME ===" && uptime',
          'echo "=== CPU ===" && nproc && grep "model name" /proc/cpuinfo | head -1',
          'echo "=== MEMORY ===" && free -h',
          'echo "=== DISK ===" && df -h --output=source,size,used,avail,pcent,target 2>/dev/null | head -20',
          'echo "=== NETWORK ===" && ip -brief addr show 2>/dev/null || ifconfig 2>/dev/null | head -30',
          'echo "=== KERNEL ===" && uname -r',
        ].join('; ');
        return makeResult(await exec(args, cmd));
      },
    },
    {
      name: `${prefix}_docker_info`,
      description: `Get Docker daemon version and config info from inside a ${label}. ${agentNote}`,
      module: 'guest-services',
      parameters: { type: 'object', properties: { ...baseProps, ...timeoutProp }, required: ['node', 'vmid'] },
      execute: async (args) => makeResult(await exec(args, 'docker version --format json 2>&1; echo "---"; docker info --format json 2>&1', 30)),
    },
  ] satisfies ProxmoxTool[];
}

// ---------------------------------------------------------------------------
// Instantiate for QEMU VMs and LXC containers
// ---------------------------------------------------------------------------

const vmGuestTools = makeDockerTools('vm', vmBaseProps, vmAgentExecSync);
const lxcGuestTools = makeDockerTools('lxc', lxcBaseProps, lxcAgentExecSync);

export const guestServicesTools: ProxmoxTool[] = [
  ...vmGuestTools,
  ...lxcGuestTools,
];
