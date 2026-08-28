import { createHash, randomUUID } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const experimentRoot = join(root, "evals/bounded-quality");
const fixtureRoot = join(root, "examples/fleet-ledger");
const scenarioPath = join(experimentRoot, "artifact-scenarios.json");
const casesPath = join(experimentRoot, "cases.jsonl");
const candidatePath = join(experimentRoot, "candidate/SKILL.md");
const qualityContractPath = join(
  experimentRoot,
  "protocols/quality-contract.md",
);
const taskBundleName = ".bq-task.md";

function fail(message) {
  throw new Error(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function json(path) {
  return JSON.parse(read(path));
}

function files(directory, prefix = "") {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      if ([".git", "node_modules"].includes(entry.name)) return [];
      const absolute = join(directory, entry.name);
      const name = prefix ? `${prefix}/${entry.name}` : entry.name;
      return entry.isDirectory() ? files(absolute, name) : [name];
    });
}

function fileDigest(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function textDigest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function treeDigest(directory) {
  const hash = createHash("sha256");
  for (const path of files(directory)) {
    hash.update(path);
    hash.update("\0");
    hash.update(readFileSync(join(directory, path)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function copyFixture(destination) {
  cpSync(fixtureRoot, destination, {
    recursive: true,
    filter: (source) => {
      const path = relative(fixtureRoot, source);
      if (!path) return true;
      if (path.split("/").includes(".agents")) return false;
      // Historical scenario and test reports disclose earlier solutions. Keep only
      // effective project guidance so executor arms see code, tests, and policy—not
      // answer-bearing evaluation artifacts.
      if (source.endsWith(".md") && basename(source) !== "AGENTS.md") return false;
      return true;
    },
  });
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: options.capture === false ? "inherit" : "pipe",
  });
}

function applySeed(scenario, destination, checkOnly = false) {
  if (!scenario.seedPatch) return;
  const patch = join(experimentRoot, scenario.seedPatch);
  const args = ["apply"];
  if (checkOnly) args.push("--check");
  args.push(patch);
  const result = run("git", args, { cwd: destination });
  if (result.status !== 0) {
    fail(
      `Cannot ${checkOnly ? "check" : "apply"} ${scenario.seedPatch}: ${result.stderr.trim()}`,
    );
  }
}

function loadScenarios() {
  const document = json(scenarioPath);
  if (document.protocolVersion !== 2) fail("Unsupported experiment protocol");
  if (JSON.stringify(document.arms) !== JSON.stringify(["A", "B", "C"])) {
    fail("Experiment arms must be A, B, C");
  }
  if (!Array.isArray(document.scenarios) || document.scenarios.length !== 4) {
    fail("Exactly four artifact scenario families are required");
  }
  return document.scenarios;
}

function validate() {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const candidate = read(candidatePath);
  const frontmatter = candidate.match(/^---\n([\s\S]*?)\n---\n/);
  check(frontmatter, "Candidate skill has invalid frontmatter");
  if (frontmatter) {
    const fields = Object.fromEntries(
      frontmatter[1]
        .split("\n")
        .map((line) => [line.slice(0, line.indexOf(":")), line.slice(line.indexOf(":") + 1).trim()]),
    );
    check(
      JSON.stringify(Object.keys(fields).sort()) ===
        JSON.stringify(["description", "name"]),
      "Candidate frontmatter must contain only name and description",
    );
    check(
      fields.name === "kf-bounded-quality-execution",
      "Candidate name must be kf-bounded-quality-execution",
    );
  }

  const cases = read(casesPath)
    .trim()
    .split("\n")
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        failures.push(`cases.jsonl:${index + 1}: ${error.message}`);
        return null;
      }
    })
    .filter(Boolean);
  check(cases.length >= 8, "At least eight quality-contract cases are required");
  const caseIds = new Set();
  for (const entry of cases) {
    check(!caseIds.has(entry.id), `Duplicate case id ${entry.id}`);
    caseIds.add(entry.id);
    check(entry.mode === "quality", `${entry.id} must use quality mode`);
    check(Boolean(entry.prompt), `${entry.id} must define a prompt`);
    for (const field of ["composed", "forbidden", "sequence", "invariants"]) {
      check(Array.isArray(entry.expected?.[field]), `${entry.id} expected.${field} must be an array`);
    }
    check(
      (entry.expected?.invariants ?? []).length >= 4,
      `${entry.id} must define at least four artifact invariants`,
    );
  }

  const scenarios = loadScenarios();
  const families = new Set(scenarios.map((scenario) => scenario.family));
  for (const family of ["feature", "bug", "refactor", "test-only"]) {
    check(families.has(family), `Missing ${family} artifact scenario`);
  }

  for (const scenario of scenarios) {
    check(Boolean(scenario.prompt), `${scenario.id} must define a prompt`);
    check(
      Boolean(scenario.primarySkill) && existsSync(join(root, scenario.primarySkill)),
      `${scenario.id} must define an existing primary skill`,
    );
    check(
      Array.isArray(scenario.allowedPaths) && scenario.allowedPaths.length > 0,
      `${scenario.id} must define allowed paths`,
    );
    const hidden = join(experimentRoot, scenario.hiddenTest ?? "");
    check(existsSync(hidden), `${scenario.id} hidden test is missing`);
    if (existsSync(hidden)) {
      const syntax = run(process.execPath, ["--check", hidden]);
      check(syntax.status === 0, `${scenario.id} hidden test has invalid syntax`);
    }
    if (scenario.seedPatch) {
      const patch = join(experimentRoot, scenario.seedPatch);
      check(existsSync(patch), `${scenario.id} seed patch is missing`);
      if (existsSync(patch)) {
        const temp = mkdtempSync(join(tmpdir(), "k-fleet-bq-check-"));
        try {
          copyFixture(temp);
          try {
            applySeed(scenario, temp, true);
          } catch (error) {
            failures.push(error.message);
          }
        } finally {
          rmSync(temp, { recursive: true, force: true });
        }
      }
    }
  }
  check(existsSync(qualityContractPath), "Quality contract is missing");

  const cleanFixture = mkdtempSync(join(tmpdir(), "k-fleet-bq-clean-"));
  try {
    copyFixture(cleanFixture);
    const leakedDocuments = files(cleanFixture).filter(
      (path) => path.endsWith(".md") && basename(path) !== "AGENTS.md",
    );
    check(
      leakedDocuments.length === 0,
      `Prepared fixture leaks answer-bearing documents: ${leakedDocuments.join(", ")}`,
    );
  } finally {
    rmSync(cleanFixture, { recursive: true, force: true });
  }

  if (failures.length) {
    for (const message of failures) console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(
    `Validated ${cases.length} quality cases and ${scenarios.length} artifact scenarios; no runs were executed.`,
  );
}

function scenarioById(id) {
  const scenario = loadScenarios().find((entry) => entry.id === id);
  if (!scenario) fail(`Unknown scenario ${id}`);
  return scenario;
}

function executorBundle(scenario, arm) {
  const sections = [
    "# Anonymous Implementation Task",
    "",
    "## User request",
    "",
    scenario.prompt,
    "",
    "## Primary workflow",
    "",
    read(join(root, scenario.primarySkill)).trim(),
  ];
  if (["B", "C"].includes(arm)) {
    sections.push(
      "",
      "## Artifact quality contract",
      "",
      read(qualityContractPath).trim(),
    );
  }
  if (arm === "C") {
    sections.push(
      "",
      "## Optional bounded execution method",
      "",
      read(candidatePath).trim(),
    );
  }
  return `${sections.join("\n")}\n`;
}

function prepare(id, arm, destinationArgument) {
  if (!["A", "B", "C"].includes(arm)) {
    fail("Arm must be A, B, or C");
  }
  const scenario = scenarioById(id);
  const destination = resolve(destinationArgument);
  const baseline = `${destination}.bq-baseline`;
  const sidecar = `${destination}.bq-run.json`;
  for (const path of [destination, baseline, sidecar]) {
    if (existsSync(path)) fail(`Refusing to overwrite ${path}`);
  }

  copyFixture(destination);
  copyFixture(baseline);
  applySeed(scenario, destination);
  applySeed(scenario, baseline);
  const taskBundle = executorBundle(scenario, arm);
  writeFileSync(join(destination, taskBundleName), taskBundle);
  writeFileSync(join(baseline, taskBundleName), taskBundle);
  const baseTreeHash = treeDigest(destination);
  const runnerHash = fileDigest(fileURLToPath(import.meta.url));
  const hiddenTestHash = fileDigest(join(experimentRoot, scenario.hiddenTest));
  writeFileSync(
    sidecar,
    `${JSON.stringify(
      {
        protocolVersion: 2,
        runId: randomUUID(),
        scenarioId: scenario.id,
        family: scenario.family,
        arm,
        workspace: destination,
        baseline,
        baseTreeHash,
        runnerHash,
        scenarioSpecHash: fileDigest(scenarioPath),
        hiddenTestHash,
        taskBundleHash: textDigest(taskBundle),
        primarySkillHash: fileDigest(join(root, scenario.primarySkill)),
        qualityContractHash: ["B", "C"].includes(arm)
          ? fileDigest(qualityContractPath)
          : null,
        candidateSkillHash: arm === "C" ? fileDigest(candidatePath) : null,
        prompt: scenario.prompt,
        allowedPaths: scenario.allowedPaths,
        preparedAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Prepared anonymous ${scenario.family} fixture at ${destination}`);
  console.log(`Executor bundle: ${join(destination, taskBundleName)}`);
  console.log("Run the executor with that workspace as its only readable root.");
}

function changedFiles(baseline, workspace) {
  const before = new Map(
    files(baseline).map((path) => [path, fileDigest(join(baseline, path))]),
  );
  const after = new Map(
    files(workspace).map((path) => [path, fileDigest(join(workspace, path))]),
  );
  return [...new Set([...before.keys(), ...after.keys()])]
    .sort()
    .filter((path) => before.get(path) !== after.get(path));
}

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function positiveMatchDelta(baseline, workspace, paths, pattern) {
  return paths.reduce((total, path) => {
    const beforePath = join(baseline, path);
    const afterPath = join(workspace, path);
    const before = existsSync(beforePath) ? countMatches(read(beforePath), pattern) : 0;
    const after = existsSync(afterPath) ? countMatches(read(afterPath), pattern) : 0;
    return total + Math.max(0, after - before);
  }, 0);
}

function score(destinationArgument) {
  const destination = resolve(destinationArgument);
  const sidecarPath = `${destination}.bq-run.json`;
  if (!existsSync(sidecarPath)) fail(`Missing ${sidecarPath}`);
  const sidecar = json(sidecarPath);
  if (sidecar.protocolVersion !== 2) fail("Unsupported run sidecar protocol");
  if (resolve(sidecar.workspace) !== destination) fail("Run sidecar workspace mismatch");
  const expectedBaseline = resolve(`${destination}.bq-baseline`);
  if (resolve(sidecar.baseline) !== expectedBaseline) fail("Run sidecar baseline mismatch");
  if (!existsSync(expectedBaseline)) fail(`Missing ${expectedBaseline}`);
  if (treeDigest(expectedBaseline) !== sidecar.baseTreeHash) {
    fail("Baseline tree does not match the prepared baseTreeHash");
  }
  const scenario = scenarioById(sidecar.scenarioId);
  if (sidecar.family !== scenario.family) fail("Run sidecar family mismatch");
  if (!["A", "B", "C"].includes(sidecar.arm)) fail("Run sidecar arm is invalid");
  if (typeof sidecar.runId !== "string" || !sidecar.runId) {
    fail("Run sidecar runId is missing");
  }
  if (JSON.stringify(sidecar.allowedPaths) !== JSON.stringify(scenario.allowedPaths)) {
    fail("Run sidecar allowed paths do not match the scenario");
  }
  const hiddenSource = join(experimentRoot, scenario.hiddenTest);
  const expectedTaskBundleHash = textDigest(executorBundle(scenario, sidecar.arm));
  if (sidecar.taskBundleHash !== expectedTaskBundleHash) {
    fail("Prepared executor bundle does not match the declared arm");
  }
  if (sidecar.arm === "A") {
    if (sidecar.qualityContractHash !== null || sidecar.candidateSkillHash !== null) {
      fail("Arm A must not bind a quality or candidate protocol");
    }
  } else if (sidecar.arm === "B") {
    if (!sidecar.qualityContractHash || sidecar.candidateSkillHash !== null) {
      fail("Arm B must bind only the quality contract");
    }
  } else if (!sidecar.qualityContractHash || !sidecar.candidateSkillHash) {
    fail("Arm C must bind the quality contract and candidate skill");
  }
  const identityChecks = [
    [sidecar.runnerHash, fileDigest(fileURLToPath(import.meta.url)), "runner"],
    [sidecar.scenarioSpecHash, fileDigest(scenarioPath), "scenario specification"],
    [sidecar.hiddenTestHash, fileDigest(hiddenSource), "hidden test"],
    [
      sidecar.primarySkillHash,
      fileDigest(join(root, scenario.primarySkill)),
      "primary skill",
    ],
    [
      sidecar.taskBundleHash,
      fileDigest(join(destination, taskBundleName)),
      "executor bundle",
    ],
    [
      sidecar.taskBundleHash,
      fileDigest(join(expectedBaseline, taskBundleName)),
      "baseline executor bundle",
    ],
  ];
  if (["B", "C"].includes(sidecar.arm)) {
    identityChecks.push([
      sidecar.qualityContractHash,
      fileDigest(qualityContractPath),
      "quality contract",
    ]);
  }
  if (sidecar.arm === "C") {
    identityChecks.push([
      sidecar.candidateSkillHash,
      fileDigest(candidatePath),
      "candidate skill",
    ]);
  }
  for (const [prepared, current, label] of identityChecks) {
    if (prepared !== current) fail(`Prepared ${label} identity has drifted`);
  }
  const hiddenDestination = join(
    destination,
    "test",
    `bounded-quality-${basename(scenario.hiddenTest)}`,
  );
  if (existsSync(hiddenDestination)) fail(`Hidden-test path already exists: ${hiddenDestination}`);
  const frozenTreeHash = treeDigest(destination);
  let testResult;
  try {
    cpSync(hiddenSource, hiddenDestination);
    testResult = run(process.execPath, ["--test"], { cwd: destination });
  } finally {
    if (existsSync(hiddenDestination)) unlinkSync(hiddenDestination);
  }
  if (treeDigest(destination) !== frozenTreeHash) {
    fail("Hidden-test execution mutated the frozen executor artifact");
  }

  const changed = changedFiles(sidecar.baseline, destination);
  const unexpected = changed.filter(
    (path) => !scenario.allowedPaths.includes(path),
  );
  const beforeFiles = new Set(files(sidecar.baseline));
  const newFiles = changed.filter(
    (path) => !beforeFiles.has(path) && existsSync(join(destination, path)),
  );
  const packageChanged = changed.includes("package.json");
  const result = {
    protocolVersion: 2,
    runId: sidecar.runId,
    scenarioId: scenario.id,
    family: scenario.family,
    arm: sidecar.arm,
    baseTreeHash: sidecar.baseTreeHash,
    finalTreeHash: frozenTreeHash,
    runnerHash: sidecar.runnerHash,
    scenarioSpecHash: sidecar.scenarioSpecHash,
    hiddenTestHash: sidecar.hiddenTestHash,
    taskBundleHash: sidecar.taskBundleHash,
    primarySkillHash: sidecar.primarySkillHash,
    qualityContractHash: sidecar.qualityContractHash,
    candidateSkillHash: sidecar.candidateSkillHash,
    hiddenTestsPassed: testResult.status === 0,
    hiddenTestExitCode: testResult.status,
    hiddenTestSummary: `${testResult.stdout}${testResult.stderr}`
      .split("\n")
      .filter((line) => /^(# (tests|pass|fail)|not ok|ok )/.test(line))
      .slice(-20),
    changedFiles: changed,
    unexpectedChangedFiles: unexpected,
    unexpectedChangedFileCount: unexpected.length,
    newProductionFileCount: newFiles.filter((path) => path.startsWith("src/")).length,
    dependencyOrManifestDelta: packageChanged,
    newPublicExportSignals: positiveMatchDelta(
      sidecar.baseline,
      destination,
      changed,
      /^export\s/gm,
    ),
    newClassOrInterfaceSignals: positiveMatchDelta(
      sidecar.baseline,
      destination,
      changed,
      /\b(?:class|interface)\s+[A-Z][A-Za-z0-9_]*/g,
    ),
    productionFilesChangedForTestOnlyCase:
      scenario.family === "test-only"
        ? changed.filter((path) => path.startsWith("src/"))
        : [],
    scoredAt: new Date().toISOString(),
  };
  result.resultEvidenceHash = textDigest(JSON.stringify(result));
  const resultPath = `${destination}.bq-result.json`;
  writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `${scenario.id} arm ${sidecar.arm}: hidden=${result.hiddenTestsPassed ? "pass" : "fail"}, changed=${changed.length}, unexpected=${unexpected.length}`,
  );
  console.log(`Result: ${resultPath}`);
  if (!result.hiddenTestsPassed) process.exitCode = 1;
}

function summarize(paths) {
  if (!paths.length) fail("summarize requires result JSON files");
  const results = paths.map((path) => json(resolve(path)));
  const runIds = new Set();
  for (const result of results) {
    if (result.protocolVersion !== 2) fail("Cannot summarize a non-v2 result");
    if (typeof result.runId !== "string" || !result.runId) {
      fail("Result runId is missing");
    }
    if (runIds.has(result.runId)) fail(`Duplicate runId ${result.runId}`);
    runIds.add(result.runId);
    const evidence = { ...result };
    delete evidence.resultEvidenceHash;
    if (result.resultEvidenceHash !== textDigest(JSON.stringify(evidence))) {
      fail(`Result evidence hash mismatch for run ${result.runId}`);
    }
    const scenario = scenarioById(result.scenarioId);
    if (result.family !== scenario.family) {
      fail(`Result family mismatch for run ${result.runId}`);
    }
    if (!["A", "B", "C"].includes(result.arm)) {
      fail(`Result arm is invalid for run ${result.runId}`);
    }
    if (result.taskBundleHash !== textDigest(executorBundle(scenario, result.arm))) {
      fail(`Result task bundle does not match its arm for run ${result.runId}`);
    }
    if (result.primarySkillHash !== fileDigest(join(root, scenario.primarySkill))) {
      fail(`Result primary-skill identity has drifted for run ${result.runId}`);
    }
    const expectedQualityHash = ["B", "C"].includes(result.arm)
      ? fileDigest(qualityContractPath)
      : null;
    const expectedCandidateHash = result.arm === "C" ? fileDigest(candidatePath) : null;
    if (result.qualityContractHash !== expectedQualityHash) {
      fail(`Result quality-contract identity mismatches its arm for run ${result.runId}`);
    }
    if (result.candidateSkillHash !== expectedCandidateHash) {
      fail(`Result candidate identity mismatches its arm for run ${result.runId}`);
    }
    if (result.runnerHash !== fileDigest(fileURLToPath(import.meta.url))) {
      fail(`Result runner identity has drifted for run ${result.runId}`);
    }
    if (result.scenarioSpecHash !== fileDigest(scenarioPath)) {
      fail(`Result scenario identity has drifted for run ${result.runId}`);
    }
    if (result.hiddenTestHash !== fileDigest(join(experimentRoot, scenario.hiddenTest))) {
      fail(`Result hidden-test identity has drifted for run ${result.runId}`);
    }
  }
  const groups = new Map();
  for (const result of results) {
    const key = `${result.arm}:${result.family}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(result);
  }
  for (const [key, entries] of [...groups.entries()].sort()) {
    const passed = entries.filter((entry) => entry.hiddenTestsPassed).length;
    const unexpected = entries.reduce(
      (total, entry) => total + entry.unexpectedChangedFileCount,
      0,
    );
    console.log(
      `${key} runs=${entries.length} hidden=${passed}/${entries.length} unexpectedFiles=${unexpected}`,
    );
  }
}

const [command = "validate", ...args] = process.argv.slice(2);

try {
  if (command === "validate") validate();
  else if (command === "prepare") {
    if (args.length !== 3) fail("prepare requires <scenario> <arm> <destination>");
    prepare(args[0], args[1], args[2]);
  } else if (command === "score") {
    if (args.length !== 1) fail("score requires <workspace>");
    score(args[0]);
  } else if (command === "summarize") summarize(args);
  else fail(`Unknown command ${command}`);
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
}
