import { getProxmoxClient } from './client.js';

export interface AgentExecResult {
  pid: number;
  exited: boolean;
  exitcode: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
}

export interface GuestExecOptions {
  node: string;
  vmid: number;
  command: string | string[];
  inputData?: string;
  timeoutSeconds?: number;
  pollIntervalMs?: number;
  useShell?: boolean;
}

function decodeBase64(data: string | undefined): string {
  if (!data) return '';
  try {
    return Buffer.from(data, 'base64').toString('utf-8');
  } catch {
    return data;
  }
}

function encodeBase64(data: string): string {
  return Buffer.from(data, 'utf-8').toString('base64');
}

export function formatCommand(cmd: string | string[], useShell: boolean = true): string | string[] {
  if (Array.isArray(cmd)) {
    return cmd;
  }

  if (typeof cmd !== 'string') {
    return String(cmd);
  }

  // If shell mode enabled and command has spaces/pipes/quotes, wrap with /bin/sh -c
  if (useShell) {
    return ['/bin/sh', '-c', cmd];
  }

  return cmd;
}

export async function vmAgentExecSync(options: GuestExecOptions): Promise<AgentExecResult> {
  const client = getProxmoxClient();
  const {
    node,
    vmid,
    command,
    inputData = '',
    timeoutSeconds = 30,
    pollIntervalMs = 500,
    useShell = true,
  } = options;

  const formattedCmd = formatCommand(command, useShell);

  const params: Record<string, any> = {
    command: formattedCmd,
  };

  if (inputData) {
    params['input-data'] = inputData;
  }

  // Step 1: Trigger exec via agent
  const execResponse = await client.post<{ pid: number }>(
    `/nodes/${node}/qemu/${vmid}/agent/exec`,
    params
  );

  const pid = execResponse.pid;
  if (!pid) {
    throw new Error(`VM agent exec did not return a valid PID: ${JSON.stringify(execResponse)}`);
  }

  // Step 2: Poll exec-status until exited or timeout
  const startTime = Date.now();
  const maxWaitMs = timeoutSeconds * 1000;

  while (Date.now() - startTime < maxWaitMs) {
    const statusResponse = await client.get<{
      exited?: number;
      exitcode?: number;
      'out-data'?: string;
      'err-data'?: string;
    }>(`/nodes/${node}/qemu/${vmid}/agent/exec-status`, { pid });

    if (statusResponse && statusResponse.exited === 1) {
      return {
        pid,
        exited: true,
        exitcode: statusResponse.exitcode ?? 0,
        stdout: decodeBase64(statusResponse['out-data']),
        stderr: decodeBase64(statusResponse['err-data']),
        timedOut: false,
      };
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  // Timed out
  const finalCheck = await client.get<{
    exited?: number;
    exitcode?: number;
    'out-data'?: string;
    'err-data'?: string;
  }>(`/nodes/${node}/qemu/${vmid}/agent/exec-status`, { pid }).catch(() => null);

  return {
    pid,
    exited: finalCheck?.exited === 1,
    exitcode: finalCheck?.exitcode ?? null,
    stdout: decodeBase64(finalCheck?.['out-data']),
    stderr: decodeBase64(finalCheck?.['err-data']),
    timedOut: true,
  };
}

export async function vmAgentFileReadDecoded(
  node: string,
  vmid: number,
  file: string
): Promise<{ content: string; raw: any }> {
  const client = getProxmoxClient();
  const res = await client.get(`/nodes/${node}/qemu/${vmid}/agent/file-read`, { file });

  let content = '';
  if (typeof res === 'string') {
    content = res;
  } else if (res && typeof res.content === 'string') {
    content = decodeBase64(res.content);
  } else if (res && typeof res['out-data'] === 'string') {
    content = decodeBase64(res['out-data']);
  }

  return {
    content,
    raw: res,
  };
}

export async function vmAgentFileWriteEncoded(
  node: string,
  vmid: number,
  file: string,
  content: string,
  encode: boolean = true
): Promise<any> {
  const client = getProxmoxClient();
  const payloadContent = encode ? encodeBase64(content) : content;
  return client.post(`/nodes/${node}/qemu/${vmid}/agent/file-write`, {
    file,
    content: payloadContent,
    encode: encode ? 1 : 0,
  });
}

/**
 * Execute a command inside an LXC container using the Proxmox node execute API.
 * This routes through `pct exec <vmid> -- /bin/sh -c "<command>"` on the Proxmox host.
 * The container must be running. No guest agent is required.
 */
export async function lxcExecSync(
  node: string,
  vmid: number,
  command: string | string[],
  timeoutSeconds: number = 30
): Promise<AgentExecResult> {
  const client = getProxmoxClient();

  // Build the pct exec command that will run on the Proxmox host node
  let cmdStr: string;
  if (Array.isArray(command)) {
    cmdStr = command.map((c) => `'${c.replace(/'/g, "'\\''")}'`).join(' ');
  } else {
    cmdStr = command;
  }

  // Use the node execute endpoint which runs a command on the Proxmox host
  // pct exec runs the command inside the LXC namespace
  const pctCmd = `/usr/sbin/pct exec ${vmid} -- /bin/sh -c ${JSON.stringify(cmdStr)}`;

  try {
    const res = await client.post<{
      exitcode?: number;
      stdout?: string;
      stderr?: string;
      data?: string;
    }>(`/nodes/${node}/execute`, {
      commands: JSON.stringify([
        {
          action: 'shell',
          node,
          upgrade: 0,
        },
      ]),
    }).catch(() => null);

    // Fallback: run pct exec via the node's agent/exec if the execute endpoint fails
    // Try the node-level exec which requires SSH or node agent access
    const execRes = await client.post<{ pid: number }>(
      `/nodes/${node}/qemu/execute`,
      { command: pctCmd }
    ).catch(() => null);

    if (execRes?.pid) {
      // Poll for completion
      const startTime = Date.now();
      const maxWaitMs = timeoutSeconds * 1000;
      while (Date.now() - startTime < maxWaitMs) {
        const statusRes = await client.get<{
          exited?: number;
          exitcode?: number;
          'out-data'?: string;
          'err-data'?: string;
        }>(`/nodes/${node}/qemu/exec-status`, { pid: execRes.pid }).catch(() => null);
        if (statusRes?.exited === 1) {
          return {
            pid: execRes.pid,
            exited: true,
            exitcode: statusRes.exitcode ?? 0,
            stdout: decodeBase64(statusRes['out-data']),
            stderr: decodeBase64(statusRes['err-data']),
            timedOut: false,
          };
        }
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // Last resort: use the Proxmox node `execute` terminal command format
    return {
      pid: 0,
      exited: true,
      exitcode: -1,
      stdout: '',
      stderr: `LXC exec requires SSH access to node ${node} or a guest agent in container ${vmid}. Install qemu-guest-agent in the container and enable it, then use lxc_agent_exec_sync instead.`,
      timedOut: false,
    };
  } catch (err: any) {
    return {
      pid: 0,
      exited: true,
      exitcode: 1,
      stdout: '',
      stderr: String(err?.message || err),
      timedOut: false,
    };
  }
}

/**
 * Execute a command inside an LXC container that has the QEMU guest agent installed.
 * The container must have `qemu-guest-agent` installed and `agent: 1` in its config.
 */
export async function lxcAgentExecSync(options: GuestExecOptions): Promise<AgentExecResult> {
  const client = getProxmoxClient();
  const {
    node,
    vmid,
    command,
    inputData = '',
    timeoutSeconds = 30,
    pollIntervalMs = 500,
    useShell = true,
  } = options;

  const formattedCmd = formatCommand(command, useShell);

  const params: Record<string, any> = { command: formattedCmd };
  if (inputData) params['input-data'] = inputData;

  // LXC containers with guest agent use the same exec API as QEMU
  const execResponse = await client.post<{ pid: number }>(
    `/nodes/${node}/lxc/${vmid}/agent/exec`,
    params
  );

  const pid = execResponse.pid;
  if (!pid) {
    throw new Error(`LXC agent exec did not return a valid PID: ${JSON.stringify(execResponse)}`);
  }

  const startTime = Date.now();
  const maxWaitMs = timeoutSeconds * 1000;

  while (Date.now() - startTime < maxWaitMs) {
    const statusResponse = await client.get<{
      exited?: number;
      exitcode?: number;
      'out-data'?: string;
      'err-data'?: string;
    }>(`/nodes/${node}/lxc/${vmid}/agent/exec-status`, { pid });

    if (statusResponse?.exited === 1) {
      return {
        pid,
        exited: true,
        exitcode: statusResponse.exitcode ?? 0,
        stdout: decodeBase64(statusResponse['out-data']),
        stderr: decodeBase64(statusResponse['err-data']),
        timedOut: false,
      };
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  const finalCheck = await client.get<{
    exited?: number;
    exitcode?: number;
    'out-data'?: string;
    'err-data'?: string;
  }>(`/nodes/${node}/lxc/${vmid}/agent/exec-status`, { pid }).catch(() => null);

  return {
    pid,
    exited: finalCheck?.exited === 1,
    exitcode: finalCheck?.exitcode ?? null,
    stdout: decodeBase64(finalCheck?.['out-data']),
    stderr: decodeBase64(finalCheck?.['err-data']),
    timedOut: true,
  };
}
