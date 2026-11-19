import { getProxmoxClient } from './client.js';

export interface AgentExecResult {
  pid: number;
  exited: boolean;
  exitcode: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  /** True when the guest agent truncated stdout or stderr (output too large). */
  truncated?: boolean;
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

interface ExecStatusResponse {
  exited?: number | boolean;
  exitcode?: number;
  signal?: number;
  'out-data'?: string;
  'err-data'?: string;
  'out-truncated'?: number | boolean;
  'err-truncated'?: number | boolean;
}

/**
 * Proxmox VE already base64-decodes the guest agent's `out-data` / `err-data`
 * (and `agent/file-read` content) before returning them over the REST API, so
 * these values are plain text. They must NOT be decoded again: doing so turns
 * readable output into binary garbage.
 */
export function guestText(data: unknown): string {
  if (data === undefined || data === null) return '';
  return typeof data === 'string' ? data : String(data);
}

export function formatCommand(cmd: string | string[], useShell: boolean = true): string | string[] {
  if (Array.isArray(cmd)) {
    return cmd;
  }

  if (typeof cmd !== 'string') {
    return String(cmd);
  }

  // Wrap string commands in /bin/sh -c so pipes, redirects and quotes work.
  if (useShell) {
    return ['/bin/sh', '-c', cmd];
  }

  return cmd;
}

function toResult(pid: number, status: ExecStatusResponse | null, timedOut: boolean): AgentExecResult {
  const exited = status?.exited === 1 || status?.exited === true;
  const truncated = Boolean(status?.['out-truncated']) || Boolean(status?.['err-truncated']);
  return {
    pid,
    exited,
    exitcode: exited ? status?.exitcode ?? (status?.signal !== undefined ? 128 + status.signal : 0) : null,
    stdout: guestText(status?.['out-data']),
    stderr: guestText(status?.['err-data']),
    timedOut,
    ...(truncated ? { truncated: true } : {}),
  };
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

  const params: Record<string, any> = {
    command: formatCommand(command, useShell),
  };

  if (inputData) {
    params['input-data'] = inputData;
  }

  // Step 1: start the command via the guest agent
  const execResponse = await client.post<{ pid: number }>(
    `/nodes/${encodeURIComponent(node)}/qemu/${vmid}/agent/exec`,
    params
  );

  const pid = execResponse?.pid;
  if (!pid) {
    throw new Error(`VM agent exec did not return a valid PID: ${JSON.stringify(execResponse)}`);
  }

  // Step 2: poll exec-status until the command exits or we time out
  const statusPath = `/nodes/${encodeURIComponent(node)}/qemu/${vmid}/agent/exec-status`;
  const deadline = Date.now() + timeoutSeconds * 1000;

  while (Date.now() < deadline) {
    const status = await client.get<ExecStatusResponse>(statusPath, { pid });
    if (status && (status.exited === 1 || status.exited === true)) {
      return toResult(pid, status, false);
    }
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  const finalCheck = await client.get<ExecStatusResponse>(statusPath, { pid }).catch(() => null);
  const finished = finalCheck?.exited === 1 || finalCheck?.exited === true;
  return toResult(pid, finalCheck, !finished);
}

export async function vmAgentFileReadDecoded(
  node: string,
  vmid: number,
  file: string
): Promise<{ content: string; truncated: boolean; raw: any }> {
  const client = getProxmoxClient();
  const res = await client.get(`/nodes/${encodeURIComponent(node)}/qemu/${vmid}/agent/file-read`, { file });

  let content = '';
  if (typeof res === 'string') {
    content = res;
  } else if (res && typeof res.content === 'string') {
    content = guestText(res.content);
  }

  return {
    content,
    truncated: Boolean(res?.truncated),
    raw: res,
  };
}

/**
 * Write a file inside a VM.
 *
 * Proxmox's `encode` flag (default 1) means "Proxmox will base64-encode the
 * content for the agent", so plain text must be sent with encode=1. Only pass
 * `contentIsBase64 = true` when `content` is already base64 (e.g. binary data);
 * it is then forwarded with encode=0.
 */
export async function vmAgentFileWriteEncoded(
  node: string,
  vmid: number,
  file: string,
  content: string,
  contentIsBase64: boolean = false
): Promise<any> {
  const client = getProxmoxClient();
  return client.post(`/nodes/${encodeURIComponent(node)}/qemu/${vmid}/agent/file-write`, {
    file,
    content,
    encode: contentIsBase64 ? 0 : 1,
  });
}
