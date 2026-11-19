/**
 * Regenerates docs/TOOLS_REFERENCE.md from the live tool registry.
 * Run with: bun run docs
 */
import { writeFileSync } from 'node:fs';
import { allTools, annotationsFor, toInputSchema } from '../src/mcp/registry.js';
import { VERSION } from '../src/version.js';

const MODULE_TITLES: Record<string, string> = {
  access: 'Access (users, groups, roles, tokens, ACLs)',
  backup: 'Backup',
  cluster: 'Cluster',
  firewall: 'Firewall',
  ha: 'High Availability',
  lxc: 'LXC containers',
  nodes: 'Nodes',
  pools: 'Pools & ACME',
  qemu: 'QEMU virtual machines',
  sdn: 'Software-defined networking',
  storage: 'Storage',
  'guest-services': 'Guest services (inside VMs via the QEMU guest agent)',
};

const order = Object.keys(MODULE_TITLES);
const modules = [...new Set(allTools.map((t) => t.module))].sort((a, b) => order.indexOf(a) - order.indexOf(b));

/** Split "Summary\n\nArgs:\n    name: text\n\nNotes" docstrings into parts. */
function parseDescription(description: string): { summary: string; args: Record<string, string>; notes: string } {
  const [head, rest] = description.split(/\n\s*Args:\s*\n/);
  const args: Record<string, string> = {};
  const noteLines: string[] = [];
  if (rest !== undefined) {
    let current: string | null = null;
    for (const line of rest.split('\n')) {
      const m = line.match(/^ {2,8}([A-Za-z0-9_-]+): ?(.*)$/);
      if (m && !line.startsWith('            ')) {
        current = m[1];
        args[current] = m[2].trim();
      } else if (current && /^\s{6,}\S/.test(line)) {
        args[current] += ' ' + line.trim();
      } else if (line.trim() === '') {
        current = null;
      } else {
        current = null;
        noteLines.push(line.trim());
      }
    }
  }
  return { summary: head.trim(), args, notes: noteLines.join(' ').trim() };
}

function anchor(module: string): string {
  return `module-${module}`;
}

function cell(text: unknown): string {
  return String(text ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function badge(name: string): string {
  const a = annotationsFor(allTools.find((t) => t.name === name)!);
  if (a.readOnlyHint) return '🟢 read-only';
  return a.destructiveHint ? '🔴 destructive' : '🟡 write';
}

const lines: string[] = [];
lines.push('# Proxmox MCP Tools Reference');
lines.push('');
lines.push(`> Generated from the tool registry for **v${VERSION}** by \`bun run docs\`. Do not edit by hand.`);
lines.push('');
lines.push(`**${allTools.length} tools** in ${modules.length} modules.`);
lines.push('');
lines.push('Legend: 🟢 read-only (safe to auto-approve) · 🟡 write, additive (creates/starts things) · 🔴 destructive (deletes, stops, overwrites or runs arbitrary commands).');
lines.push('');
lines.push('Hide write tools with `PROXMOX_READ_ONLY=true`, or limit modules with `PROXMOX_MODULES=qemu,nodes,...`.');
lines.push('');
lines.push('## Contents');
lines.push('');
lines.push('| Module | Tools | 🟢 | 🟡 | 🔴 |');
lines.push('| :--- | ---: | ---: | ---: | ---: |');
for (const m of modules) {
  const tools = allTools.filter((t) => t.module === m);
  const ro = tools.filter((t) => annotationsFor(t).readOnlyHint).length;
  const de = tools.filter((t) => !annotationsFor(t).readOnlyHint && annotationsFor(t).destructiveHint).length;
  lines.push(`| [\`${m}\` — ${MODULE_TITLES[m] ?? m}](#${anchor(m)}) | ${tools.length} | ${ro} | ${tools.length - ro - de} | ${de} |`);
}
lines.push('');

for (const m of modules) {
  const tools = allTools.filter((t) => t.module === m).sort((a, b) => a.name.localeCompare(b.name));
  lines.push('---');
  lines.push('');
  lines.push(`<a id="${anchor(m)}"></a>`);
  lines.push(`## \`${m}\` — ${MODULE_TITLES[m] ?? m} (${tools.length})`);
  lines.push('');
  for (const t of tools) {
    const schema = toInputSchema(t);
    lines.push(`### \`${t.name}\``);
    lines.push('');
    lines.push(`${badge(t.name)}`);
    lines.push('');
    const { summary, args, notes } = parseDescription(t.description);
    lines.push(summary);
    lines.push('');
    if (notes) {
      lines.push(notes);
      lines.push('');
    }
    const props = Object.entries<any>(schema.properties);
    if (props.length === 0) {
      lines.push('_No parameters._');
    } else {
      lines.push('| Parameter | Type | Required | Default | Description |');
      lines.push('| :--- | :--- | :---: | :--- | :--- |');
      for (const [key, p] of props.sort(([a], [b]) => {
        const ra = schema.required.includes(a) ? 0 : 1;
        const rb = schema.required.includes(b) ? 0 : 1;
        return ra - rb || a.localeCompare(b);
      })) {
        const type = p.enum ? `${p.type ?? 'string'} (${p.enum.join(' \\| ')})` : p.type ?? 'any';
        const def = p.default === undefined ? '' : `\`${cell(JSON.stringify(p.default))}\``;
        lines.push(`| \`${key}\` | \`${cell(type)}\` | ${schema.required.includes(key) ? '✅' : ''} | ${def} | ${cell(p.description || args[key] || '')} |`);
      }
    }
    lines.push('');
  }
}

writeFileSync(new URL('../docs/TOOLS_REFERENCE.md', import.meta.url), lines.join('\n'));
console.error(`Wrote docs/TOOLS_REFERENCE.md (${allTools.length} tools).`);
