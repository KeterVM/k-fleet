#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, parse, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kFleetSkills = [
  "kf-orchestrate-work",
  "kf-define-requirements",
  "kf-design-codebase",
  "kf-implement",
  "kf-write-tests",
  "kf-verify",
  "kf-evolve-skills",
];
const retiredSkills = ["kf-design", "kf-investigate", "skillopt-sleep"];
const kFleetSource = process.env.KFLEET_SKILL_SOURCE || "KeterVM/k-fleet";
const stateRoot = process.env.KFLEET_STATE_DIR || join(homedir(), ".k-fleet");
const registryPath = join(stateRoot, "projects.json");
function usage() {
  return [
    "K Fleet multi-project manager",
    "",
    "Usage:",
    "  npx k-fleet install [--all | PROJECT...]",
    "  npx k-fleet update [--all | PROJECT...]",
    "  npx k-fleet status [--all | PROJECT...]",
    "  npx k-fleet register PROJECT...",
    "  npx k-fleet unregister PROJECT...",
    "  npx k-fleet list",
    "",
    "Examples:",
    "  npx k-fleet install",
    "  npx k-fleet install ~/src/api ~/src/web",
    "  npx k-fleet update --all",
    "",
    "Registry: " + registryPath,
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

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
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

function selectProjects(args, registry) {
  const all = args.includes("--all");
  const paths = args.filter((arg) => arg !== "--all");
  if (all && paths.length) fail("Use --all or explicit project paths, not both");
  const selected = all
    ? registry.projects.map(normalizeProject)
    : paths.length
      ? paths.map(normalizeProject)
      : [normalizeProject(process.cwd())];
  if (selected.length === 0) fail("No projects selected; register projects first");
  return unique(selected);
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

function addKFleetSkills(project, skills) {
  run(
    "npx",
    ["--yes", "skills", "add", kFleetSource, "--agent", "codex", "--skill", ...skills, "--yes"],
    { cwd: project },
  );
}

function installedRetiredSkills(project) {
  return retiredSkills.filter((skill) =>
    existsSync(join(project, ".agents", "skills", skill, "SKILL.md")));
}

function removeRetiredSkills(project) {
  // Codex discovers these canonical directories directly. The upstream remove
  // command can leave both canonical copies and local-source lock entries behind.
  const lockPath = join(project, "skills-lock.json");
  const lock = readJson(lockPath, null);
  for (const skill of retiredSkills) {
    rmSync(join(project, ".agents", "skills", skill), { recursive: true, force: true });
  }
  if (lock?.skills && retiredSkills.some((skill) => Object.hasOwn(lock.skills, skill))) {
    for (const skill of retiredSkills) delete lock.skills[skill];
    writeJson(lockPath, lock);
  }
}

function installProject(project) {
  // Refresh existing coordinators during cutover so they cannot retain routes
  // to the retired methods. Otherwise install preserves existing current entries.
  const locked = readJson(join(project, "skills-lock.json"), {})?.skills ?? {};
  const migrating = installedRetiredSkills(project).length > 0 ||
    retiredSkills.some((skill) => Object.hasOwn(locked, skill));
  const missing = kFleetSkills.filter((skill) =>
    !existsSync(join(project, ".agents", "skills", skill, "SKILL.md")));
  if (migrating || missing.length) addKFleetSkills(project, migrating ? kFleetSkills : missing);
  removeRetiredSkills(project);
  if (!migrating && missing.length < kFleetSkills.length) {
    console.log("Existing K Fleet skills preserved; use update to refresh them: " + project);
  }
  installReviewer(project);
}

function upgradeProject(project) {
  // Install replacements successfully before removing exact retired names.
  addKFleetSkills(project, kFleetSkills);
  removeRetiredSkills(project);
  installReviewer(project);
}

function printStatus(project) {
  const checks = [
    ...kFleetSkills.map((skill) => [skill, join(project, ".agents", "skills", skill, "SKILL.md")]),
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
  const [command, ...args] = argv;
  if (!command || ["help", "--help", "-h"].includes(command)) {
    console.log(usage());
    return;
  }
  const commands = ["register", "unregister", "list", "bootstrap", "install", "upgrade", "update", "status"];
  if (!commands.includes(command)) fail("Unknown command: " + command + "\n\n" + usage());
  const allowAll = ["bootstrap", "install", "upgrade", "update", "status"].includes(command);
  for (const arg of args) {
    if (arg.startsWith("-") && !(allowAll && arg === "--all")) fail("Unknown option: " + arg);
  }
  const registry = loadRegistry();
  if (command === "register") {
    registerProjects(registry, args);
    console.log("Registered " + args.length + " project(s).");
    return;
  }
  if (command === "unregister") {
    unregisterProjects(registry, args);
    console.log("Unregistered " + args.length + " project(s).");
    return;
  }
  if (command === "list") {
    if (args.length) fail("list does not accept project arguments");
    if (!registry.projects.length) console.log("No registered projects.");
    else registry.projects.forEach((project) => console.log(project));
    return;
  }

  const projects = selectProjects(args, registry);
  if (command === "bootstrap" || command === "install") {
    for (const project of projects) installProject(project);
    registry.projects.push(...projects);
    saveRegistry(registry);
    console.log("Restart Codex, then run /kf-orchestrate-work setup in each project.");
    return;
  }
  for (const project of projects) {
    if (command === "status") printStatus(project);
    else upgradeProject(project);
  }
  if (command !== "status") console.log("Restart Codex so new or updated skills are discovered.");
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
const invokedRealPath =
  invokedPath && existsSync(invokedPath) ? realpathSync(invokedPath) : invokedPath;
if (invokedRealPath === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error("ERROR: " + error.message);
    process.exitCode = 1;
  }
}
