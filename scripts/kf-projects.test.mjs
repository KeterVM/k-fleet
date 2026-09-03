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
} from "./kf-projects.mjs";

test("config preserves unrelated values and enforces K Fleet boundaries", () => {
  assert.deepEqual(mergeSkillOptConfig({ model: "custom", evolve_memory: true }), {
    model: "custom",
    evolve_memory: false,
    evolve_skill: true,
    transcript_source: "codex",
    target_skill_path: ".agents/skills/kf-orchestrate-work/SKILL.md",
    gate_mode: "on",
    gate_no_regression: true,
  });
});

test("sleep arguments bind the target to the selected project", () => {
  assert.deepEqual(
    buildSleepArgs("run", "/work/api", ["--backend", "codex"]),
    [
      "run",
      "--project",
      "/work/api",
      "--source",
      "codex",
      "--target-skill-path",
      ".agents/skills/kf-orchestrate-work/SKILL.md",
      "--backend",
      "codex",
    ],
  );
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
    ".agents/skills/kf-orchestrate-work/SKILL.md",
  );
  assert.equal(readFileSync(log, "utf8").trim().split("\n").length, 4);
  for (const project of projects) {
    assert.equal(
      existsSync(join(project, ".codex", "agents", "kf-reviewer.toml")),
      true,
    );
  }
});
