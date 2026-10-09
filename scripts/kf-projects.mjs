#!/usr/bin/env node

import {
  copyFileSync,
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  readlinkSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, parse, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kFleetSkills = [
  "kf-setup",
  "kf-discover-product",
  "kf-define-requirements",
  "kf-design-experience",
  "kf-design-codebase",
  "kf-implement",
  "kf-write-tests",
  "kf-verify",
  "kf-release-product",
  "kf-operate-product",
  "kf-evaluate-product",
  "kf-codify-practices",
];
// Skills are copied from this package into .agents/skills (Codex) and linked
// from .claude/skills (Claude Code).
const skillSourceRoot = join(repositoryRoot, "skills");
const reviewerFiles = [
  join(".codex", "agents", "kf-reviewer.toml"),
  join(".claude", "agents", "kf-reviewer.md"),
];
const retiredSkills = [
  "kf-orchestrate-work",
  "kf-design",
  "kf-investigate",
  "skillopt-sleep",
  "kf-evolve-skills",
];
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
  for (const file of reviewerFiles) {
    const source = join(repositoryRoot, file);
    const destination = join(project, file);
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
}

function skillPaths(project, skill) {
  return [
    join(project, ".agents", "skills", skill, "SKILL.md"),
    join(project, ".claude", "skills", skill, "SKILL.md"),
  ];
}

function checkSkillSources() {
  for (const skill of kFleetSkills) {
    const source = join(skillSourceRoot, skill, "SKILL.md");
    if (!existsSync(source)) fail("Skill source not found: " + source);
  }
}

function linksTo(link, target) {
  try {
    return lstatSync(link).isSymbolicLink() &&
      resolve(dirname(link), readlinkSync(link)) === target;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function addKFleetSkills(project, skills) {
  for (const skill of skills) {
    // Stage the copy beside the destination so a failed copy leaves the old one.
    const canonical = join(project, ".agents", "skills", skill);
    const staging = canonical + ".tmp-" + process.pid;
    mkdirSync(dirname(canonical), { recursive: true });
    rmSync(staging, { recursive: true, force: true });
    cpSync(join(skillSourceRoot, skill), staging, { recursive: true });
    rmSync(canonical, { recursive: true, force: true });
    renameSync(staging, canonical);

    const link = join(project, ".claude", "skills", skill);
    if (!linksTo(link, canonical)) {
      rmSync(link, { recursive: true, force: true });
      mkdirSync(dirname(link), { recursive: true });
      try {
        symlinkSync(relative(dirname(link), canonical), link, "dir");
      } catch (error) {
        // Windows without symlink permission: keep a copy instead.
        if (error.code !== "EPERM") throw error;
        cpSync(canonical, link, { recursive: true });
      }
    }
    console.log("Installed skill: " + canonical);
  }
}

function installedRetiredSkills(project) {
  return retiredSkills.filter((skill) =>
    existsSync(join(project, ".agents", "skills", skill, "SKILL.md")));
}

function removeRetiredSkills(project) {
  for (const skill of retiredSkills) {
    const canonical = join(project, ".agents", "skills", skill);
    rmSync(canonical, { recursive: true, force: true });
    // Remove only the Claude Code link that points at the canonical copy.
    const link = join(project, ".claude", "skills", skill);
    if (linksTo(link, canonical)) rmSync(link);
  }
}

function releaseSkillsLock(project) {
  // Earlier versions installed through the skills CLI. Drop its K Fleet entries
  // so `skills update` does not replace the copies this CLI manages.
  const lockPath = join(project, "skills-lock.json");
  const lock = readJson(lockPath, null);
  if (!lock?.skills) return;
  const entries = [...kFleetSkills, ...retiredSkills]
    .filter((skill) => Object.hasOwn(lock.skills, skill));
  if (!entries.length) return;
  for (const skill of entries) delete lock.skills[skill];
  const onlyLockFields = Object.keys(lock).every((key) => ["version", "skills"].includes(key));
  if (onlyLockFields && Object.keys(lock.skills).length === 0) rmSync(lockPath);
  else writeJson(lockPath, lock);
  console.log("Released K Fleet entries from " + lockPath);
}

function installProject(project) {
  // Refresh the catalog during cutover; otherwise preserve current entries.
  const locked = readJson(join(project, "skills-lock.json"), {})?.skills ?? {};
  const migrating = installedRetiredSkills(project).length > 0 ||
    retiredSkills.some((skill) => Object.hasOwn(locked, skill));
  const missing = kFleetSkills.filter((skill) =>
    !skillPaths(project, skill).every((path) => existsSync(path)));
  addKFleetSkills(project, migrating ? kFleetSkills : missing);
  removeRetiredSkills(project);
  releaseSkillsLock(project);
  if (!migrating && missing.length < kFleetSkills.length) {
    console.log("Existing K Fleet skills preserved; use update to refresh them: " + project);
  }
  installReviewer(project);
}

function upgradeProject(project) {
  // Install replacements successfully before removing exact retired names.
  addKFleetSkills(project, kFleetSkills);
  removeRetiredSkills(project);
  releaseSkillsLock(project);
  installReviewer(project);
}

function printStatus(project) {
  const checks = [
    ...kFleetSkills.flatMap((skill) => skillPaths(project, skill).map((path) => [skill, path])),
    ...reviewerFiles.map((file) => ["reviewer", join(project, file)]),
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
  if (command !== "status") checkSkillSources();
  if (command === "bootstrap" || command === "install") {
    for (const project of projects) installProject(project);
    registry.projects.push(...projects);
    saveRegistry(registry);
    console.log("To initialize project reminders, explicitly request kf-setup in Codex (CLI/IDE: $kf-setup). Installation does not run setup or edit AGENTS.md. If installed skills do not appear, restart Codex.");
    return;
  }
  for (const project of projects) {
    if (command === "status") printStatus(project);
    else upgradeProject(project);
  }
  if (command !== "status") console.log("To refresh project reminders, explicitly request kf-setup in Codex (CLI/IDE: $kf-setup); update does not edit AGENTS.md. If updated skills do not appear, restart Codex.");
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
