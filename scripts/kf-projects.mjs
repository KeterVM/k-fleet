#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, parse, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targetSkillPath = ".agents/skills/kf-orchestrate-work/SKILL.md";
const sleepSkillPath = ".agents/skills/skillopt-sleep/SKILL.md";
const kFleetSource = process.env.KFLEET_SKILL_SOURCE || "KeterVM/k-fleet";
const skillOptSource =
  process.env.SKILLOPT_SKILL_SOURCE ||
  "https://github.com/microsoft/SkillOpt/tree/main/plugins/codex/skills";
const stateRoot = process.env.KFLEET_STATE_DIR || join(homedir(), ".k-fleet");
const registryPath = join(stateRoot, "projects.json");
const sleepConfigPath =
  process.env.SKILLOPT_SLEEP_CONFIG ||
  join(homedir(), ".skillopt-sleep", "config.json");
const sleepActions = new Set([
  "status",
  "harvest",
  "dry-run",
  "run",
  "adopt",
  "schedule",
  "unschedule",
]);

function usage() {
  return [
    "K Fleet multi-project manager",
    "",
    "Usage:",
    "  node scripts/kf-projects.mjs bootstrap --skillopt-repo PATH PROJECT...",
    "  node scripts/kf-projects.mjs register PROJECT...",
    "  node scripts/kf-projects.mjs unregister PROJECT...",
    "  node scripts/kf-projects.mjs list",
    "  node scripts/kf-projects.mjs configure [--skillopt-repo PATH]",
    "  node scripts/kf-projects.mjs install [--all | PROJECT...]",
    "  node scripts/kf-projects.mjs upgrade [--all | PROJECT...]",
    "  node scripts/kf-projects.mjs status [--all | PROJECT...]",
    "  node scripts/kf-projects.mjs sleep ACTION [--all | PROJECT...] [-- EXTRA_ARGS...]",
    "",
    "Examples:",
    "  node scripts/kf-projects.mjs bootstrap --skillopt-repo /opt/SkillOpt ~/src/api ~/src/web",
    "  node scripts/kf-projects.mjs upgrade --all",
    "  node scripts/kf-projects.mjs sleep dry-run --all -- --backend mock",
    "  node scripts/kf-projects.mjs sleep run ~/src/api -- --backend codex --max-tasks 3",
    "",
    "Registry: " + registryPath,
    "SkillOpt-Sleep config: " + sleepConfigPath,
  ].join("\n");
}

function fail(message) {
  throw new Error(message);
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail("Cannot parse " + path + ": " + error.message);
  }
}

function writeJson(path, value, backup = false) {
  mkdirSync(dirname(path), { recursive: true });
  if (backup && existsSync(path)) copyFileSync(path, path + ".bak");
  const temporary = path + ".tmp-" + process.pid;
  writeFileSync(temporary, JSON.stringify(value, null, 2) + "\n", { mode: 0o600 });
  renameSync(temporary, path);
}

function loadRegistry() {
  const data = readJson(registryPath, { version: 1, projects: [] });
  if (data.version !== 1 || !Array.isArray(data.projects)) {
    fail(registryPath + " must contain version 1 and a projects array");
  }
  return data;
}

function normalizeProject(path) {
  const candidate = resolve(path);
  if (!existsSync(candidate) || !statSync(candidate).isDirectory()) {
    fail("Project directory does not exist: " + candidate);
  }
  const canonical = realpathSync(candidate);
  if (canonical === parse(canonical).root || canonical === realpathSync(homedir())) {
    fail("Refusing broad project directory: " + canonical);
  }
  return canonical;
}

function unique(values) {
  return [...new Set(values)];
}

function saveRegistry(registry) {
  registry.projects = unique(registry.projects).sort();
  writeJson(registryPath, registry);
}

export function mergeSkillOptConfig(existing = {}) {
  return {
    ...existing,
    evolve_memory: false,
    evolve_skill: true,
    transcript_source: "codex",
    target_skill_path: targetSkillPath,
    gate_mode: "on",
    gate_no_regression: true,
  };
}

export function buildSleepArgs(action, project, extra = []) {
  return [
    action,
    "--project",
    project,
    "--source",
    "codex",
    "--target-skill-path",
    targetSkillPath,
    ...extra,
  ];
}

function run(command, args, options = {}) {
  const workingDirectory = options.cwd || process.cwd();
  console.log("\n> (" + workingDirectory + ") " + [command, ...args].join(" "));
  const result = spawnSync(command, args, {
    cwd: workingDirectory,
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) fail(command + " failed to start: " + result.error.message);
  if (result.status !== 0) fail(command + " exited with status " + result.status);
}

function splitPassthrough(args) {
  const separator = args.indexOf("--");
  if (separator === -1) return { manager: args, extra: [] };
  return {
    manager: args.slice(0, separator),
    extra: args.slice(separator + 1),
  };
}

function takeOption(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) fail(name + " requires a value");
  args.splice(index, 2);
  return value;
}

export function selectProjects(args, registry, options = {}) {
  const allowAll = options.allowAll !== false;
  const all = args.includes("--all");
  const paths = args.filter((arg) => arg !== "--all");
  if (all && paths.length) fail("Use --all or explicit project paths, not both");
  if (all && !allowAll) fail("This action requires explicit project paths");
  if (!allowAll && paths.length === 0) {
    fail("This action requires explicit project paths");
  }
  const selected =
    all || paths.length === 0 ? registry.projects : paths.map(normalizeProject);
  if (selected.length === 0) fail("No projects selected; register projects first");
  return unique(selected);
}

function configure(registry, requestedRepo) {
  const repo = requestedRepo
    ? normalizeProject(requestedRepo)
    : process.env.SKILLOPT_SLEEP_REPO || registry.skilloptRepo;
  if (!repo) fail("Set --skillopt-repo PATH or SKILLOPT_SLEEP_REPO first");
  const runner = join(repo, "plugins", "run-sleep.sh");
  if (!existsSync(runner)) fail("SkillOpt-Sleep runner not found: " + runner);

  writeJson(
    sleepConfigPath,
    mergeSkillOptConfig(readJson(sleepConfigPath, {})),
    true,
  );
  registry.skilloptRepo = repo;
  saveRegistry(registry);
  console.log("Configured SkillOpt-Sleep: " + sleepConfigPath);
  console.log("SkillOpt checkout: " + repo);
}

function installReviewer(project) {
  const source = join(repositoryRoot, ".codex", "agents", "kf-reviewer.toml");
  const destination = join(project, ".codex", "agents", "kf-reviewer.toml");
  if (!existsSync(source)) fail("Reviewer source not found: " + source);
  mkdirSync(dirname(destination), { recursive: true });
  if (
    existsSync(destination) &&
    readFileSync(destination, "utf8") !== readFileSync(source, "utf8")
  ) {
    copyFileSync(destination, destination + ".bak");
  }
  copyFileSync(source, destination);
  console.log("Installed reviewer: " + destination);
}

function installProject(project) {
  if (existsSync(join(project, targetSkillPath))) {
    console.log("K Fleet skill already installed; use upgrade: " + project);
  } else {
    run(
      "bunx",
      [
        "skills",
        "add",
        kFleetSource,
        "--agent",
        "codex",
        "--skill",
        "kf-orchestrate-work",
        "--yes",
      ],
      { cwd: project },
    );
  }
  if (existsSync(join(project, sleepSkillPath))) {
    console.log("SkillOpt-Sleep skill already installed; use upgrade: " + project);
  } else {
    run(
      "bunx",
      [
        "skills",
        "add",
        skillOptSource,
        "--agent",
        "codex",
        "--skill",
        "skillopt-sleep",
        "--yes",
      ],
      { cwd: project },
    );
  }
  installReviewer(project);
}

function backupUpgradeTarget(project) {
  const source = join(project, targetSkillPath);
  if (!existsSync(source)) return;
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const destination = join(
    project,
    ".skillopt-sleep",
    "backups",
    "kf-projects-upgrade-" + stamp,
    "kf-orchestrate-work",
    "SKILL.md",
  );
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(source, destination);
  console.log("Backed up current K Fleet skill: " + destination);
}

function upgradeProject(project) {
  backupUpgradeTarget(project);
  run(
    "bunx",
    [
      "skills",
      "update",
      "kf-orchestrate-work",
      "skillopt-sleep",
      "--project",
      "--yes",
    ],
    { cwd: project },
  );
  installReviewer(project);
}

function getRunner(registry) {
  const repo = process.env.SKILLOPT_SLEEP_REPO || registry.skilloptRepo;
  if (!repo) fail("SkillOpt checkout is not configured; run configure or bootstrap");
  const runner = join(repo, "plugins", "run-sleep.sh");
  if (!existsSync(runner)) fail("SkillOpt-Sleep runner not found: " + runner);
  return runner;
}

function printStatus(project) {
  const checks = [
    ["K Fleet skill", join(project, targetSkillPath)],
    ["SkillOpt-Sleep skill", join(project, sleepSkillPath)],
    ["skills lock", join(project, "skills-lock.json")],
    ["reviewer", join(project, ".codex", "agents", "kf-reviewer.toml")],
  ];
  console.log("\n" + project);
  for (const [label, path] of checks) {
    const state = existsSync(path) ? "OK" : "MISSING";
    console.log("  " + state + "  " + label + ": " + relative(project, path));
  }
}

function registerProjects(registry, paths) {
  if (!paths.length) fail("Provide at least one project directory");
  registry.projects.push(...paths.map(normalizeProject));
  saveRegistry(registry);
}

function unregisterProjects(registry, paths) {
  if (!paths.length) fail("Provide at least one project directory");
  const removals = new Set(paths.map((path) => resolve(path)));
  registry.projects = registry.projects.filter(
    (project) => !removals.has(project),
  );
  saveRegistry(registry);
}

function main(argv) {
  const [command, ...rawArgs] = argv;
  if (!command || ["help", "--help", "-h"].includes(command)) {
    console.log(usage());
    return;
  }

  const registry = loadRegistry();
  const { manager, extra } = splitPassthrough(rawArgs);

  if (command === "register") {
    registerProjects(registry, manager);
    console.log("Registered " + manager.length + " project(s).");
    return;
  }
  if (command === "unregister") {
    unregisterProjects(registry, manager);
    console.log("Unregistered " + manager.length + " project(s).");
    return;
  }
  if (command === "list") {
    if (!registry.projects.length) console.log("No registered projects.");
    else registry.projects.forEach((project) => console.log(project));
    return;
  }
  if (command === "configure") {
    const args = [...manager];
    const repo = takeOption(args, "--skillopt-repo");
    if (args.length) fail("Unexpected configure arguments: " + args.join(" "));
    configure(registry, repo);
    return;
  }
  if (command === "bootstrap") {
    const args = [...manager];
    const repo = takeOption(args, "--skillopt-repo");
    registerProjects(registry, args);
    configure(registry, repo);
    for (const project of args.map(normalizeProject)) installProject(project);
    console.log(
      "Restart Codex, then run /kf-orchestrate-work setup in each project.",
    );
    return;
  }
  if (["install", "upgrade", "status"].includes(command)) {
    const projects = selectProjects(manager, registry);
    for (const project of projects) {
      if (command === "install") installProject(project);
      else if (command === "upgrade") upgradeProject(project);
      else printStatus(project);
    }
    if (command !== "status") {
      console.log("Restart Codex so new or updated skills are discovered.");
    }
    return;
  }
  if (command === "sleep") {
    const [action, ...selection] = manager;
    if (!sleepActions.has(action)) {
      fail("Unknown sleep action: " + (action || "(missing)"));
    }
    const projects = selectProjects(selection, registry, {
      allowAll: action !== "adopt",
    });
    const runner = getRunner(registry);
    for (const project of projects) {
      run("bash", [runner, ...buildSleepArgs(action, project, extra)], {
        cwd: project,
      });
    }
    return;
  }

  fail("Unknown command: " + command + "\n\n" + usage());
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error("ERROR: " + error.message);
    process.exitCode = 1;
  }
}
