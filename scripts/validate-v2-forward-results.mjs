import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resultsPath = join(root, "evals/v2-release-forward-results.json");
const reportPath = join(root, "evals/V2_RELEASE_FORWARD_TEST_REPORT.md");
const testValueResultsPath = join(root, "evals/test-value-forward-results.json");
const testValueReportPath = join(root, "evals/TEST_VALUE_FORWARD_TEST_REPORT.md");
const astraResultsPath = join(root, "evals/astra-forward-results.json");
const astraReportPath = join(root, "evals/ASTRA_FORWARD_TEST_REPORT.md");
const corpusPath = join(root, "evals/orchestrator-routing.jsonl");
const lockPath = join(root, "examples/fleet-ledger/skills-lock.json");
const failures = [];
const releaseSkillHash = "d3014eac60d4e010e452bf0f957e93109bdb9e83fe19b1f2cd8a59a4025f55aa";
const releaseCorpusHash = "45a4a517897f82c6771ecf441901810f1b1d762bf936516aaa80ef676909a0a6";
const historicalTestValueSkillHash = "098033543c8db314834de207afa8f1cb827f5d0e99cbf37423403218fafa2f21";
const historicalTestValueCorpusHash = "038ec57aaf7c683be890ffbbec6bcb7048cd0274588d97e4ca6a44c2afef1a1b";

function fail(message) {
  failures.push(message);
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function skillFolderHash(directory) {
  const files = (path) => readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(path, entry.name)) : [join(path, entry.name)]);
  const hash = createHash("sha256");
  for (const path of files(directory).sort((a, b) => relative(directory, a).localeCompare(relative(directory, b)))) {
    hash.update(relative(directory, path).split("\\").join("/"));
    hash.update(readFileSync(path));
  }
  return hash.digest("hex");
}

const results = JSON.parse(readFileSync(resultsPath, "utf8"));
const report = readFileSync(reportPath, "utf8");
const testValueResults = JSON.parse(readFileSync(testValueResultsPath, "utf8"));
const testValueReport = readFileSync(testValueReportPath, "utf8");
const lock = JSON.parse(readFileSync(lockPath, "utf8"));
const skillHash = skillFolderHash(join(root, "skills/kf-orchestrate-work"));
if (lock.skills?.["kf-orchestrate-work"]?.computedHash !== skillHash) {
  fail("Fixture lock does not match the current skill sources");
}
const corpusHash = sha256(corpusPath);

if (results.schemaVersion !== 1) fail("Forward results must use schemaVersion 1");
if (results.skillHash !== releaseSkillHash) fail("Release results skill hash changed");
if (results.corpusHash !== releaseCorpusHash) fail("Release results corpus hash changed");
if (!report.includes(results.skillHash) || !report.includes(results.corpusHash)) {
  fail("Forward report must name the exact skill and corpus hashes");
}

const expectedCases = [
  "setup-blocked-without-supermemory",
  "setup-ready-creates-bootstrap",
  "setup-malformed-marker",
  "supermemory-operation-unavailable",
  "evolution-no-regression-gate-missing",
  "bug-fix-cross-boundary-engineering",
];
const actualCases = (results.cases ?? []).map((entry) => entry.id);
if (JSON.stringify(actualCases) !== JSON.stringify(expectedCases)) {
  fail(`Forward results must contain exactly: ${expectedCases.join(", ")}`);
}
for (const entry of results.cases ?? []) {
  if (entry.passed !== true) fail(`${entry.id} is not recorded as passing`);
  for (const field of ["prompt", "isolation", "observation", "writeEvidence"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) {
      fail(`${entry.id} must record ${field}`);
    }
  }
  if (!report.includes(entry.id)) {
    fail(`Forward report does not reference ${entry.id}`);
  }
}

if (testValueResults.schemaVersion !== 1) {
  fail("Test-value forward results must use schemaVersion 1");
}
if (testValueResults.skillHash !== historicalTestValueSkillHash) {
  fail("Historical test-value skill hash changed");
}
if (testValueResults.corpusHash !== historicalTestValueCorpusHash) {
  fail("Historical test-value corpus hash changed");
}
if (
  !testValueReport.includes(testValueResults.skillHash) ||
  !testValueReport.includes(testValueResults.corpusHash)
) {
  fail("Test-value forward report must name the exact skill and corpus hashes");
}
const expectedTestValueCases = ["method-tdd-by-risk", "method-no-low-value-ui-test"];
const actualTestValueCases = (testValueResults.cases ?? []).map((entry) => entry.id);
if (JSON.stringify(actualTestValueCases) !== JSON.stringify(expectedTestValueCases)) {
  fail(`Test-value forward results must contain exactly: ${expectedTestValueCases.join(", ")}`);
}
for (const entry of testValueResults.cases ?? []) {
  if (entry.passed !== true) fail(`${entry.id} is not recorded as passing`);
  for (const field of ["prompt", "isolation", "observation", "writeEvidence", "judgment"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) {
      fail(`${entry.id} must record ${field}`);
    }
  }
  if (!testValueReport.includes(entry.id)) {
    fail(`Test-value forward report does not reference ${entry.id}`);
  }
}

const astraResults = JSON.parse(readFileSync(astraResultsPath, "utf8"));
const astraReport = readFileSync(astraReportPath, "utf8");
const currentBindings = {
  skillHash,
  reviewerHash: sha256(join(root, ".codex/agents/kf-reviewer.toml")),
  corpusHash,
};
if (astraResults.schemaVersion !== 1) fail("Astra forward results must use schemaVersion 1");
for (const [field, expected] of Object.entries(currentBindings)) {
  if (astraResults[field] !== expected) fail(`Astra forward results have stale ${field}`);
  if (!astraReport.includes(expected)) fail(`Astra forward report must name ${field}`);
}
const expectedAstraCases = [
  "method-no-low-value-ui-test",
  "method-tdd-by-risk",
  "sequence-investigate-fix-verify",
  "route-investigation-only",
  "review-green-tests-uncovered-trigger",
  "memory-runtime-missing",
  "route-evolution-automatic-gate-failure",
  "refactor-unrelated-baseline-failure",
];
if (JSON.stringify((astraResults.cases ?? []).map((entry) => entry.id)) !== JSON.stringify(expectedAstraCases)) {
  fail(`Astra forward results must contain exactly: ${expectedAstraCases.join(", ")}`);
}
function validateAstraEntry(entry) {
  for (const field of ["prompt", "isolation", "observation", "writeEvidence", "judgment"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) fail(`${entry.id} must record ${field}`);
  }
  if (!astraReport.includes(entry.id)) fail(`Astra report does not reference ${entry.id}`);
  for (const prefix of ["evidence", "artifact"]) {
    const path = entry[`${prefix}Path`];
    if (typeof path !== "string" || !/^evals\/astra-forward\/[a-z0-9-]+\.(json|jsonl)$/.test(path)) {
      fail(`${entry.id} has invalid ${prefix}Path`);
      continue;
    }
    try {
      if (sha256(join(root, path)) !== entry[`${prefix}Hash`]) fail(`${entry.id} has stale ${prefix}Hash`);
    } catch {
      fail(`${entry.id} is missing ${prefix} evidence`);
    }
  }
}
for (const entry of astraResults.cases ?? []) {
  if (entry.passed !== true) fail(`${entry.id} is not recorded as passing`);
  validateAstraEntry(entry);
}

// Retain the failed explicit-override observation and its original-source control.
// Neither is evidence that the protected adoption gate passed.
const known = astraResults.knownFailures ?? [];
if (known.length !== 1 || known[0]?.id !== "route-evolution-gate-failure") {
  fail("Astra results must retain the explicit-override baseline limitation");
}
for (const entry of known) {
  if (entry.passed !== false) fail("Known evolution limitation must remain failed");
  validateAstraEntry(entry);
  if (entry.baseline?.skillHash !== historicalTestValueSkillHash || entry.baseline?.passed !== false) {
    fail("Known limitation must retain the failed original-source comparison");
  }
  if (entry.unchangedEvolutionHash !== sha256(join(root, "skills/kf-orchestrate-work/references/evolution.md"))) {
    fail("Evolution policy changed; reevaluate the known limitation");
  }
  if (entry.baseline) validateAstraEntry({ ...entry.baseline, id: entry.id });
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(
  `Validated ${expectedCases.length} historical K Fleet v2 release results and ` +
    `${expectedTestValueCases.length} historical test-value results and ` +
    `${expectedAstraCases.length} passing current source-bound Astra results; ` +
    `${known.length} known baseline failure retained (not a passing adoption gate).`,
);
