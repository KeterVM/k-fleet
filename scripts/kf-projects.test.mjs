import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildSleepArgs,
  mergeSkillOptConfig,
  selectProjects,
  validateSleepTarget,
} from "./kf-projects.mjs";

test("update refreshes the Codex SkillOpt source without creating skill backups", () => {
  const root = mkdtempSync(join(tmpdir(), "kf-update-"));
  const project = join(root, "project");
  const repo = join(root, "SkillOpt");
  const bin = join(root, "bin");
  const log = join(root, "commands.log");
  const target = join(project, ".agents/skills/kf-orchestrate-work/SKILL.md");
  for (const dir of [dirname(target), join(repo, "plugins"), join(repo, ".git"), bin]) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(target, "installed skill\n");
  writeFileSync(join(repo, "plugins/run-sleep.sh"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(bin, "git"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(bin, "npx"), `#!/bin/sh
printf '%s|%s\\n' "$PWD" "$*" >> "$KFLEET_TEST_LOG"
case "$*" in
  *"update"*"skillopt-sleep"*) exit 42 ;;
esac
`);
  for (const name of ["git", "npx"]) chmodSync(join(bin, name), 0o755);
  const result = spawnSync(process.execPath, [
    join(dirname(fileURLToPath(import.meta.url)), "kf-projects.mjs"),
    "update", "--skillopt-repo", repo, project,
  ], {
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: bin + ":" + process.env.PATH,
      KFLEET_STATE_DIR: join(root, "state"),
      SKILLOPT_SLEEP_CONFIG: join(root, "config.json"),
      SKILLOPT_SKILL_SOURCE: "https://github.com/microsoft/SkillOpt/tree/main/plugins/codex/skills",
      KFLEET_TEST_LOG: log,
    },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(readFileSync(log, "utf8").trim().split("\n"), [
    `${realpathSync(project)}|--yes skills update kf-orchestrate-work --project --yes`,
    `${realpathSync(project)}|--yes skills add https://github.com/microsoft/SkillOpt/tree/main/plugins/codex/skills --agent codex --skill skillopt-sleep --yes`,
  ]);
  assert.equal(existsSync(join(project, ".skillopt-sleep/backups")), false);
  assert.doesNotMatch(result.stdout, /Backed up current K Fleet skill/);
  assert.equal(existsSync(join(project, ".codex/agents/kf-reviewer.toml")), true);
});

test("config preserves unrelated values and enforces K Fleet boundaries", () => {
  assert.deepEqual(mergeSkillOptConfig({ model: "custom", evolve_memory: true }), {
    model: "custom",
    evolve_memory: false,
    evolve_skill: false,
    transcript_source: "codex",
    target_skill_path: "",
    multi_skill_fanout: false,
    multi_skill_report: false,
    auto_adopt: false,
    gate_mode: "on",
    gate_no_regression: true,
  });
});

test("sleep arguments bind the target to the selected project", () => {
  const project = realpathSync(mkdtempSync(join(tmpdir(), "kf-target-")));
  const target = join(project, "my-skill/SKILL.md");
  mkdirSync(dirname(target));
  writeFileSync(target, "---\nname: my-skill\n---\nAllowed skill\n");
  assert.deepEqual(
    buildSleepArgs("run", project, ["--backend", "codex"], "my-skill/SKILL.md"),
    [
      "run",
      "--project",
      project,
      "--source",
      "codex",
      "--target-skill-path",
      target,
      "--backend",
      "codex",
    ],
  );
});

test("old K Fleet targets are disabled while explicitly named other skills are retained", () => {
  const old = mergeSkillOptConfig({ target_skill_path: ".agents/skills/kf-orchestrate-work/SKILL.md", evolve_skill: true });
  assert.equal(old.target_skill_path, "");
  assert.equal(old.evolve_skill, false);
  const selected = mergeSkillOptConfig({ target_skill_path: ".agents/skills/my-skill/SKILL.md" });
  assert.equal(selected.evolve_skill, true);
  assert.equal(selected.target_skill_path, ".agents/skills/my-skill/SKILL.md");
  assert.equal(mergeSkillOptConfig({ ...selected, evolve_skill: false }).evolve_skill, false);
});

test("configure opts in to a validated target and refuses a protected replacement without writes", () => {
  const root = mkdtempSync(join(tmpdir(), "kf-configure-"));
  const project = join(root, "project");
  const repo = join(root, "SkillOpt");
  const configPath = join(root, "config.json");
  for (const dir of [join(project, "my-skill"), join(project, "kf-example"), join(repo, "plugins")]) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(join(project, "my-skill/SKILL.md"), "---\nname: my-skill\n---\n");
  writeFileSync(join(project, "kf-example/SKILL.md"), "---\nname: kf-example\n---\n");
  writeFileSync(join(repo, "plugins/run-sleep.sh"), "#!/bin/sh\nexit 99\n");
  writeFileSync(configPath, JSON.stringify({ model: "custom", evolve_skill: false, target_skill_path: "" }));
  const env = { ...process.env, KFLEET_STATE_DIR: join(root, "state"), SKILLOPT_SLEEP_CONFIG: configPath };
  const invoke = (target) => spawnSync(process.execPath, [
    join(dirname(fileURLToPath(import.meta.url)), "kf-projects.mjs"),
    "configure", "--skillopt-repo", repo, "--target-skill-path", target,
  ], { cwd: project, env, encoding: "utf8" });
  const allowed = invoke("my-skill/SKILL.md");
  assert.equal(allowed.status, 0, allowed.stderr);
  const saved = readFileSync(configPath, "utf8");
  const config = JSON.parse(saved);
  assert.equal(config.target_skill_path, "my-skill/SKILL.md");
  assert.equal(config.evolve_skill, true);
  assert.equal(config.model, "custom");
  assert.equal(config.auto_adopt, false);
  const rejected = invoke("kf-example/SKILL.md");
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /non-kf-/);
  assert.equal(readFileSync(configPath, "utf8"), saved);
});

test("sleep refuses a legacy K Fleet target before executing the upstream runner", () => {
  const root = mkdtempSync(join(tmpdir(), "kf-refusal-"));
  const configPath = join(root, "config.json");
  const original = JSON.stringify({ evolve_skill: true, target_skill_path: ".agents/skills/kf-orchestrate-work/SKILL.md" });
  writeFileSync(configPath, original);
  const result = spawnSync(process.execPath, [
    join(dirname(fileURLToPath(import.meta.url)), "kf-projects.mjs"), "sleep", "run", root,
  ], {
    encoding: "utf8",
    env: { ...process.env, KFLEET_STATE_DIR: join(root, "state"), SKILLOPT_SLEEP_CONFIG: configPath, SKILLOPT_SLEEP_REPO: join(root, "missing-runner") },
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /non-kf-/);
  assert.doesNotMatch(result.stderr, /runner not found/);
  assert.equal(readFileSync(configPath, "utf8"), original);
});

test("optimization rejects protected names, symlinks, outside paths and absent targets", () => {
  const project = mkdtempSync(join(tmpdir(), "kf-protected-"));
  const protectedDir = join(project, "kf-example");
  mkdirSync(protectedDir);
  writeFileSync(join(protectedDir, "SKILL.md"), "---\nname: kf-example\n---\n");
  symlinkSync(protectedDir, join(project, "alias"));
  mkdirSync(join(project, "renamed"));
  writeFileSync(join(project, "renamed/SKILL.md"), "---\nname: 'kf-example'\n---\n");
  for (const path of ["", "kf-example/SKILL.md", "alias/SKILL.md", "renamed/SKILL.md"]) {
    assert.throws(() => validateSleepTarget(project, path), /non-kf-/);
  }
  const outside = mkdtempSync(join(tmpdir(), "other-skill-"));
  writeFileSync(join(outside, "SKILL.md"), "---\nname: other-skill\n---\n");
  assert.throws(() => validateSleepTarget(project, join(outside, "SKILL.md")), /inside the selected project/);
  assert.throws(() => buildSleepArgs("run", project), /explicitly configured/);
});

test("unbound adoption, scheduling and passthrough overrides fail before runner invocation", () => {
  for (const action of ["adopt", "schedule"]) {
    assert.throws(() => buildSleepArgs(action, "/unused"), /upstream does not bind/);
  }
  for (const extra of [["--target-skill-path=x"], ["--project", "/other"], ["--scope=all"],
    ["--auto-adopt"], ["--auto"], ["--skill-root=x"], ["--source=claude"], ["--all"]]) {
    assert.throws(() => buildSleepArgs("status", "/unused", extra), /Unsupported/);
  }
  assert.deepEqual(buildSleepArgs("status", "/project"), ["status", "--project", "/project", "--source", "codex"]);
});

test("bulk adoption requires explicit project paths", () => {
  assert.throws(
    () =>
      selectProjects([], { projects: ["/work/api", "/work/web"] }, {
        allowAll: false,
      }),
    /requires explicit project paths/,
  );
  assert.throws(
    () =>
      selectProjects(["--all"], { projects: ["/work/api", "/work/web"] }, {
        allowAll: false,
      }),
    /requires explicit project paths/,
  );
});

test("npm bin symlink invokes the CLI", () => {
  const root = mkdtempSync(join(tmpdir(), "kf-bin-"));
  const source = join(dirname(fileURLToPath(import.meta.url)), "kf-projects.mjs");
  const bin = join(root, "k-fleet");
  symlinkSync(source, bin);
  const result = spawnSync(bin, ["help"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /npx k-fleet install/);
});

test("install prepares SkillOpt and every selected project", () => {
  const root = mkdtempSync(join(tmpdir(), "kf-projects-"));
  const state = join(root, "state");
  const sleepConfig = join(root, "sleep", "config.json");
  const skillOpt = join(state, "SkillOpt");
  const runner = join(skillOpt, "plugins", "run-sleep.sh");
  const fakeBin = join(root, "bin");
  const npx = join(fakeBin, "npx");
  const git = join(fakeBin, "git");
  const log = join(root, "npx.log");
  const projects = [join(root, "api"), join(root, "web")];

  mkdirSync(fakeBin, { recursive: true });
  for (const project of projects) mkdirSync(project, { recursive: true });
  writeFileSync(
    npx,
    "#!/bin/sh\nprintf '%s|%s\\n' \"$PWD\" \"$*\" >> \"$KFLEET_TEST_LOG\"\n",
  );
  writeFileSync(
    git,
    "#!/bin/sh\nfor last do :; done\nmkdir -p \"$last/plugins\"\nprintf '#!/bin/sh\\nexit 0\\n' > \"$last/plugins/run-sleep.sh\"\n",
  );
  chmodSync(npx, 0o755);
  chmodSync(git, 0o755);

  const env = {
    ...process.env,
    PATH: fakeBin + ":" + process.env.PATH,
    KFLEET_STATE_DIR: state,
    SKILLOPT_SLEEP_CONFIG: sleepConfig,
    KFLEET_TEST_LOG: log,
  };
  delete env.SKILLOPT_SLEEP_REPO;

  const result = spawnSync(
    process.execPath,
    [
      join(dirname(fileURLToPath(import.meta.url)), "kf-projects.mjs"),
      "install",
      ...projects,
    ],
    {
      encoding: "utf8",
      env,
    },
  );

  assert.equal(result.status, 0, result.stderr);
  const registry = JSON.parse(readFileSync(join(state, "projects.json"), "utf8"));
  assert.deepEqual(
    registry.projects,
    projects.map((project) => realpathSync(project)),
  );
  assert.equal(registry.skilloptRepo, realpathSync(skillOpt));
  assert.equal(existsSync(runner), true);
  const config = JSON.parse(readFileSync(sleepConfig, "utf8"));
  assert.equal(
    config.target_skill_path,
    "",
  );
  assert.equal(readFileSync(log, "utf8").trim().split("\n").length, 4);
  for (const project of projects) {
    assert.equal(
      existsSync(join(project, ".codex", "agents", "kf-reviewer.toml")),
      true,
    );
  }
});
