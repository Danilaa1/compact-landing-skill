#!/usr/bin/env node
import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const skillName = "compact-landing";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "skills", skillName);
const home = process.env.HOME || process.env.USERPROFILE;
const useColor = process.env.NO_COLOR === undefined && process.stdout.isTTY !== false;

const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  amber: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

function paint(value, tone) {
  if (!useColor) return value;
  return `${color[tone]}${value}${color.reset}`;
}

function label(value, tone = "cyan") {
  return paint(value, tone);
}

const agentTargets = {
  codex: {
    user: () => join(home, ".agents", "skills", skillName),
    workspace: () => join(process.cwd(), ".agents", "skills", skillName),
  },
  claude: {
    user: () => join(home, ".claude", "skills", skillName),
    workspace: () => join(process.cwd(), ".claude", "skills", skillName),
  },
  cursor: {
    user: () => join(home, ".cursor", "skills", skillName),
    workspace: () => join(process.cwd(), ".cursor", "skills", skillName),
  },
  gemini: {
    user: () => join(home, ".gemini", "skills", skillName),
    workspace: () => join(process.cwd(), ".gemini", "skills", skillName),
  },
};

const aliases = {
  all: Object.keys(agentTargets),
  codex: ["codex"],
  claude: ["claude"],
  "claude-code": ["claude"],
  cursor: ["cursor"],
  gemini: ["gemini"],
};

function help() {
  console.log(`${paint("compact-landing", "bold")}

Usage:
  compact-landing install
  compact-landing install --all
  compact-landing install --agent codex,claude,cursor,gemini
  compact-landing install --scope workspace --all

Options:
  install               Ask which agent targets to install for.
  --all                 Install for every supported agent.
  --agent <list>        Comma list: codex, claude, cursor, gemini.
  --scope <scope>       user or workspace. Default: user.
  --dry-run             Print target paths without writing.
  --force               Replace existing installs. Default: true.
  --no-force            Leave existing installs untouched.
`);
}

function parseArgs(argv) {
  const opts = {
    command: argv[0],
    agents: [],
    scope: "user",
    dryRun: false,
    force: true,
  };

  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") opts.command = "help";
    else if (arg === "--all") opts.agents = aliases.all;
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--force") opts.force = true;
    else if (arg === "--no-force") opts.force = false;
    else if (arg === "--scope") opts.scope = argv[++index];
    else if (arg.startsWith("--scope=")) opts.scope = arg.slice("--scope=".length);
    else if (arg === "--agent") opts.agents = expandAgents(argv[++index]);
    else if (arg.startsWith("--agent=")) opts.agents = expandAgents(arg.slice("--agent=".length));
    else throw new Error(`Unknown option: ${arg}`);
  }

  if (opts.command === undefined) opts.command = "help";
  if (!["help", "install"].includes(opts.command)) {
    throw new Error(`Unknown command: ${opts.command}`);
  }
  if (!["user", "workspace"].includes(opts.scope)) {
    throw new Error(`Invalid scope: ${opts.scope}. Use user or workspace.`);
  }

  return opts;
}

function expandAgents(value = "") {
  const names = value.split(",").map((item) => item.trim()).filter(Boolean);
  const expanded = new Set();

  for (const name of names) {
    const mapped = aliases[name];
    if (!mapped) throw new Error(`Unsupported agent: ${name}`);
    for (const agent of mapped) expanded.add(agent);
  }

  return [...expanded];
}

async function selectAgents() {
  const choices = [
    ["1", "all", "All agents", "Codex + Claude Code + Cursor + Gemini"],
    ["2", "codex", "Codex", "~/.agents/skills"],
    ["3", "claude", "Claude Code", "~/.claude/skills"],
    ["4", "cursor", "Cursor", "~/.cursor/skills"],
    ["5", "gemini", "Gemini", "~/.gemini/skills"],
  ];

  console.log("");
  console.log(`${paint("compact-landing", "bold")} ${paint("installer", "dim")}`);
  console.log(paint("Install the skill into native agent folders.", "dim"));
  console.log("");

  for (const [key, , name, hint] of choices) {
    const keyText = paint(` ${key} `, "blue");
    console.log(`  ${keyText} ${paint(name.padEnd(12), "bold")} ${paint(hint, "dim")}`);
  }
  console.log("");

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let answer = "";
  try {
    answer = await rl.question(`${label("?")} Agent target ${paint("[1/all]", "dim")}: `);
  } finally {
    rl.close();
  }

  const selected = answer.trim() || "all";
  const tokens = selected.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  const values = tokens.map((token) => choices.find(([key, name]) => token === key || token === name)?.[1] ?? token);

  if (values.includes("all")) return aliases.all;
  return expandAgents(values.join(","));
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function installSkill(target, { dryRun, force }) {
  const files = ["SKILL.md", "references", "agents"];

  if (dryRun) {
    console.log(`${label("dry")} ${skillName} ${paint("->", "dim")} ${paint(target, "dim")}`);
    return;
  }

  if ((await exists(target)) && !force) {
    console.log(`${label("skip", "amber")} existing ${paint(target, "dim")}`);
    return;
  }

  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });

  for (const file of files) {
    await cp(join(root, file), join(target, file), { recursive: true });
  }

  console.log(`${label("ok", "green")} installed ${skillName} ${paint("->", "dim")} ${paint(target, "dim")}`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.command === "help") {
    help();
    return;
  }

  if (!home && opts.scope === "user") {
    throw new Error("Cannot resolve home directory for user-scope install.");
  }

  if (opts.agents.length === 0) {
    opts.agents = await selectAgents();
  }

  console.log("");
  console.log(`${paint("scope", "dim")} ${opts.scope}${opts.dryRun ? ` ${paint("dry run", "amber")}` : ""}`);

  const seenTargets = new Set();

  for (const agent of opts.agents) {
    const target = agentTargets[agent][opts.scope]();

    if (seenTargets.has(target)) {
      console.log(`${label("same", "amber")} ${agent} already covered ${paint(target, "dim")}`);
      continue;
    }

    seenTargets.add(target);
    await installSkill(target, opts);
  }
}

main().catch((error) => {
  console.error(`${label("error", "red")} ${error.message}`);
  process.exit(1);
});
