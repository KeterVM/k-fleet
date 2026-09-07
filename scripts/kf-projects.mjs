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
import { basename, dirname, isAbsolute, join, parse, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kFleetSkills = [
  "kf-orchestrate-work",
  "kf-define-requirements",
  "kf-design-codebase",
  "kf-implement",
  "kf-write-tests",
  "kf-verify",
];
const retiredSkills = ["kf-design", "kf-investigate"];
const sleepSkillPath = ".agents/skills/skillopt-sleep/SKILL.md";
const kFleetSource = process.env.KFLEET_SKILL_SOURCE || "KeterVM/k-fleet";
const skillOptSource =
  process.env.SKILLOPT_SKILL_SOURCE ||
  "https://github.com/microsoft/SkillOpt/tree/main/plugins/codex/skills";
const skillOptGitSource =
  process.env.SKILLOPT_GIT_SOURCE || "https://github.com/microsoft/SkillOpt.git";
const stateRoot = process.env.KFLEET_STATE_DIR || join(homedir(), ".k-fleet");
const defaultSkillOptRepo = join(stateRoot, "SkillOpt");
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
    "  npx k-fleet install [--skillopt-repo PATH] [--all | PROJECT...]",
    "  npx k-fleet update [--skillopt-repo PATH] [--all | PROJECT...]",
    "  npx k-fleet status [--all | PROJECT...]",
    "  npx k-fleet sleep ACTION [--all | PROJECT...] [-- EXTRA_ARGS...]",
    "  npx k-fleet register PROJECT...",
    "  npx k-fleet unregister PROJECT...",
    "  npx k-fleet list",
    "  npx k-fleet configure [--skillopt-repo PATH] [--target-skill-path PATH]",
    "",
    "Examples:",
    "  npx k-fleet install",
    "  npx k-fleet install ~/src/api ~/src/web",
    "  npx k-fleet update --all",
    "  npx k-fleet configure --target-skill-path .agents/skills/my-skill/SKILL.md",
    "  npx k-fleet sleep dry-run --all -- --backend mock",
    "  npx k-fleet sleep run ~/src/api -- --backend codex --max-tasks 3",
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
  const target = typeof existing.target_skill_path === "string" &&
    !protectedSkillPath(existing.target_skill_path)
    ? existing.target_skill_path : "";
  return {
    ...existing,
    evolve_memory: false,
    evolve_skill: Boolean(target) && existing.evolve_skill !== false,
    transcript_source: "codex",
    target_skill_path: target,
    multi_skill_fanout: false,
    multi_skill_report: false,
    auto_adopt: false,
    gate_mode: "on",
    gate_no_regression: true,
  };
}

function protectedSkillPath(path) {
  return path.split(/[\\/]/).some((part) => /^kf-/i.test(part));
}

export function validateSleepTarget(project, target) {
  if (!target) {
    fail("SkillOpt requires an explicitly configured non-kf-* SKILL.md target");
  }
  const root = realpathSync(project);
  if (protectedSkillPath(relative(root, resolve(root, target)))) {
    fail("SkillOpt requires an explicitly configured non-kf-* SKILL.md target");
  }
  const path = realpathSync(resolve(root, target));
  const local = relative(root, path);
  if (local.startsWith("..") || isAbsolute(local) || protectedSkillPath(local) ||
      basename(path) !== "SKILL.md" || !statSync(path).isFile()) {
    fail("SkillOpt target must be a non-kf-* SKILL.md inside the selected project");
  }
  const frontmatter = readFileSync(path, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const name = frontmatter?.[1].match(/^name:\s*["']?([a-zA-Z0-9_-]+)["']?\s*$/m)?.[1];
  if (!name || /^kf-/i.test(name)) {
    fail("SkillOpt target must declare a non-kf-* skill name");
  }
  return path;
}

export function buildSleepArgs(action, project, extra = [], target = "") {
  // Upstream adoption uses staging destinations, and scheduling drops target args.
  // Neither action currently preserves this CLI's target boundary.
  if (["adopt", "schedule"].includes(action)) {
    fail("SkillOpt " + action + " is unavailable: upstream does not bind it to the validated target");
  }
  const valueOptions = new Set(["--backend", "--model", "--max-tasks", "--max-sessions",
    "--lookback-hours", "--edit-budget", "--tasks-file", "--preferences", "--codex-path"]);
  const flagOptions = new Set(["--json", "--progress"]);
  for (let index = 0; index < extra.length; index++) {
    const [option, inline] = extra[index].split(/=(.*)/s);
    if (flagOptions.has(option) && inline === undefined) continue;
    if (!valueOptions.has(option)) {
      fail("Unsupported SkillOpt passthrough option: " + option);
    }
    const value = inline === undefined ? extra[++index] : inline;
    if (!value || value.startsWith("--")) fail("Missing value for " + option);
  }
  const selected = ["run", "dry-run"].includes(action)
    ? validateSleepTarget(project, target) : null;
  return [
    action,
    "--project",
    project,
    "--source",
    "codex",
    ...(selected ? ["--target-skill-path", selected] : []),
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
  const selected = all
    ? registry.projects
    : paths.length
      ? paths.map(normalizeProject)
      : [normalizeProject(process.cwd())];
  if (selected.length === 0) fail("No projects selected; register projects first");
  return unique(selected);
}

function resolveSkillOptRepo(registry, requestedRepo, options = {}) {
  const selected =
    requestedRepo ||
    process.env.SKILLOPT_SLEEP_REPO ||
    registry.skilloptRepo ||
    defaultSkillOptRepo;
  const repo = resolve(selected);
  const runner = join(repo, "plugins", "run-sleep.sh");
  if (!existsSync(runner)) {
    if (!options.install) fail("SkillOpt-Sleep runner not found: " + runner);
    mkdirSync(dirname(repo), { recursive: true });
    run("git", ["clone", "--depth", "1", skillOptGitSource, repo]);
  } else if (options.update) {
    if (!existsSync(join(repo, ".git"))) {
      fail("Cannot update a non-Git SkillOpt checkout: " + repo);
    }
    run("git", ["-C", repo, "pull", "--ff-only"]);
  }
  if (!existsSync(runner)) fail("SkillOpt-Sleep runner not found: " + runner);
  return realpathSync(repo);
}

function configure(registry, requestedRepo, options = {}) {
  const existing = readJson(sleepConfigPath, {});
  if (options.target !== undefined) {
    validateSleepTarget(process.cwd(), options.target);
    existing.target_skill_path = options.target;
    existing.evolve_skill = true;
  }
  const repo = resolveSkillOptRepo(registry, requestedRepo, options);

  writeJson(
    sleepConfigPath,
    mergeSkillOptConfig(existing),
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
  if (existsSync(join(project, sleepSkillPath))) {
    console.log("SkillOpt-Sleep skill already installed; use update: " + project);
  } else {
    run(
      "npx",
      [
        "--yes",
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

function upgradeProject(project) {
  // Install replacements successfully before removing exact retired names.
  addKFleetSkills(project, kFleetSkills);
  removeRetiredSkills(project);
  // Repository-wide update treats SkillOpt's platform variants as ambiguous.
  // Refresh from the same Codex-specific source used during installation.
  run(
    "npx",
    [
      "--yes",
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
  installReviewer(project);
}

function getRunner(registry) {
  const repo =
    process.env.SKILLOPT_SLEEP_REPO ||
    registry.skilloptRepo ||
    defaultSkillOptRepo;
  const runner = join(repo, "plugins", "run-sleep.sh");
  if (!existsSync(runner)) fail("SkillOpt-Sleep runner not found: " + runner);
  return runner;
}

function printStatus(project) {
  const checks = [
    ...kFleetSkills.map((skill) => [skill, join(project, ".agents", "skills", skill, "SKILL.md")]),
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
    const target = takeOption(args, "--target-skill-path");
    if (args.length) fail("Unexpected configure arguments: " + args.join(" "));
    configure(registry, repo, { install: true, ...(target ? { target } : {}) });
    return;
  }
  if (command === "bootstrap" || command === "install") {
    const args = [...manager];
    const repo = takeOption(args, "--skillopt-repo");
    const projects = selectProjects(args, registry);
    registry.projects.push(...projects);
    saveRegistry(registry);
    configure(registry, repo, { install: true });
    for (const project of projects) installProject(project);
    console.log(
      "Restart Codex, then run /kf-orchestrate-work setup in each project.",
    );
    return;
  }
  if (["upgrade", "update", "status"].includes(command)) {
    const args = [...manager];
    const repo = takeOption(args, "--skillopt-repo");
    const projects = selectProjects(args, registry);
    if (command === "upgrade" || command === "update") {
      configure(registry, repo, { install: true, update: true });
    } else if (repo) {
      fail("--skillopt-repo is only supported by install, update, and configure");
    }
    for (const project of projects) {
      if (command === "upgrade" || command === "update") upgradeProject(project);
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
    const config = readJson(sleepConfigPath, {});
    const commands = projects.map((project) =>
      buildSleepArgs(action, project, extra, config.target_skill_path));
    if (["run", "dry-run"].includes(action)) {
      if (config.evolve_skill !== true) {
        fail("Configure an explicit non-kf-* target to enable SkillOpt optimization");
      }
      const safe = mergeSkillOptConfig(config);
      for (const key of ["evolve_memory", "evolve_skill", "auto_adopt",
        "multi_skill_fanout", "multi_skill_report", "gate_mode", "gate_no_regression"]) {
        if (config[key] !== safe[key]) {
          fail("Run k-fleet configure with a non-kf-* --target-skill-path before optimization");
        }
      }
      // Upstream reads only its home config; do not validate one file and run another.
      if (resolve(sleepConfigPath) !== join(homedir(), ".skillopt-sleep", "config.json")) {
        fail("SkillOpt runtime requires the default home config path");
      }
    }
    const runner = getRunner(registry);
    for (const [index, project] of projects.entries()) {
      run("bash", [runner, ...commands[index]], {
        cwd: project,
      });
    }
    return;
  }

  fail("Unknown command: " + command + "\n\n" + usage());
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
