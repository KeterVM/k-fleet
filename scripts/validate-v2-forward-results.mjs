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
const featureResultsPath = join(root, "evals/feature-method-forward-results.json");
const featureReportPath = join(root, "evals/FEATURE_METHOD_FORWARD_TEST_REPORT.md");
const disclosureResultsPath = join(root, "evals/progressive-disclosure-forward-results.json");
const disclosureReportPath = join(root, "evals/PROGRESSIVE_DISCLOSURE_FORWARD_TEST_REPORT.md");
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
const historicalAstraBindings = {
  skillHash: "8abee45b827290dae583ff1099f14d0d243f0f53f9075794ec063968e27acad9",
  reviewerHash: "4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb",
  corpusHash: "119027f456409d9f269b42bcd7e24d61b13a2eed395f5e18af2bda6e2431076a",
};
if (astraResults.schemaVersion !== 1) fail("Astra forward results must use schemaVersion 1");
for (const [field, expected] of Object.entries(historicalAstraBindings)) {
  if (astraResults[field] !== expected) fail(`Historical Astra forward results changed ${field}`);
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
  // This observation predates the explicit exclusion of K Fleet from SkillOpt.
  // Preserve its original binding; it is not evidence for the current policy.
  if (entry.unchangedEvolutionHash !== "747333df1a8cca359efca848292e6c2a78562304429175a9ff21151ad308841a") {
    fail("Historical evolution policy binding changed");
  }
  if (entry.baseline) validateAstraEntry({ ...entry.baseline, id: entry.id });
}

const historicalFeatureBindings = {
  skillHash: "5a6a60dc7d5b72c027334d0dcc25147762ad09266fe63e6bdda726f8410ff811",
  reviewerHash: "4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb",
  corpusHash: "b59226ea1a5d12121faa498eaec8b4551a8db931b9e3c68d7b4ecdb68c611913",
};
const expectedFeatureCases = [
  "implementation-module-conventions",
  "implementation-supporting-lifecycle",
  "implementation-bounded-presentation",
  "design-cross-layer-sharing",
];
const expectedDisclosureCases = [...expectedFeatureCases, "verification-local-contract"];

function validateTargetedRun(label, resultsPath, reportPath, bindings, ids, evidenceDirectory, waivedCaseId = null) {
  const results = JSON.parse(readFileSync(resultsPath, "utf8"));
  const report = readFileSync(reportPath, "utf8");
  if (results.schemaVersion !== 1) fail(`${label} results must use schemaVersion 1`);
  for (const [field, expected] of Object.entries(bindings)) {
    if (results[field] !== expected) fail(`${label} results have stale ${field}`);
    if (!report.includes(expected)) fail(`${label} report must name ${field}`);
  }
  if (JSON.stringify((results.cases ?? []).map((entry) => entry.id)) !== JSON.stringify(ids)) {
    fail(`${label} results must contain exactly: ${ids.join(", ")}`);
  }
  function validateEntry(entry, expectedSkillHash) {
    if (entry.id === waivedCaseId) {
      if (entry.passed !== false || entry.status !== "blocked") {
        fail(`${entry.id} must retain its blocked, non-passing observation`);
      }
    } else if (entry.passed !== true) fail(`${entry.id} is not recorded as passing`);
    for (const field of ["prompt", "isolation", "observation", "writeEvidence", "judgment"]) {
      if (typeof entry[field] !== "string" || !entry[field].trim()) fail(`${entry.id} must record ${field}`);
    }
    if (!report.includes(entry.id)) fail(`${label} report does not reference ${entry.id}`);
    for (const prefix of ["evidence", "artifact"]) {
      const path = entry[`${prefix}Path`];
      const directory = `${evidenceDirectory}/`;
      if (typeof path !== "string" || !path.startsWith(directory) ||
          !/^[a-z0-9-]+\.json$/.test(path.slice(directory.length))) {
        fail(`${entry.id} has invalid ${prefix}Path`);
        continue;
      }
      try {
        if (sha256(join(root, path)) !== entry[`${prefix}Hash`]) fail(`${entry.id} has stale ${prefix}Hash`);
        const record = JSON.parse(readFileSync(join(root, path), "utf8"));
        if (record.caseId !== entry.id) fail(`${entry.id} has mismatched ${prefix} caseId`);
        if (prefix === "artifact" && record.skillHash !== expectedSkillHash) {
          fail(`${entry.id} artifact was produced with different skill sources`);
        }
      } catch {
        fail(`${entry.id} has missing or invalid ${prefix} evidence`);
      }
    }
  }
  for (const entry of results.cases ?? []) validateEntry(entry, bindings.skillHash);
  return { results, report, validateEntry };
}

validateTargetedRun("Historical feature-method", featureResultsPath, featureReportPath,
  historicalFeatureBindings, expectedFeatureCases, "evals/feature-method-forward");
const historicalDisclosureBindings = {
  skillHash: "f36755783ee5dac0b5560287d25e938b1873d87682abbd4598b61b9a1bd27a47",
  reviewerHash: "4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb",
  corpusHash: "78d1fd2ed5a707a9a7a44d72eb51b3e1c9dd51cee6e63d83c3d81d470b55935e",
};
const disclosure = validateTargetedRun("Historical progressive-disclosure", disclosureResultsPath,
  disclosureReportPath, historicalDisclosureBindings, expectedDisclosureCases, "evals/progressive-disclosure-forward",
  "implementation-module-conventions");
// A one-release user decision permits shipping with this missing observation.
// It never turns the blocked evaluation into a passing behavioral result.
const waiver = disclosure.results.releaseWaiver;
if (disclosure.results.status !== "incomplete-release-authorized" ||
    waiver?.version !== "2.1.1" || waiver?.caseId !== "implementation-module-conventions" ||
    waiver?.skillHash !== "f36755783ee5dac0b5560287d25e938b1873d87682abbd4598b61b9a1bd27a47" ||
    waiver?.corpusHash !== "78d1fd2ed5a707a9a7a44d72eb51b3e1c9dd51cee6e63d83c3d81d470b55935e" ||
    waiver?.authorization !== "没事 可以都commit和 push 然后release" ||
    !disclosure.report.includes("Release 2.1.1 authorized with one blocked observation")) {
  fail("Progressive-disclosure release waiver must retain its exact user decision and source bindings");
}
const controls = disclosure.results.controls ?? [];
if (controls.length !== 1 || controls[0]?.id !== "baseline-bounded-presentation") {
  fail("Progressive-disclosure results must retain the original-source presentation control");
}
for (const entry of controls) {
  for (const [field, expected] of Object.entries(historicalFeatureBindings)) {
    if (entry[field] !== expected) fail(`${entry.id} changed its original ${field}`);
    if (!disclosure.report.includes(expected)) fail(`Progressive-disclosure report must name control ${field}`);
  }
  disclosure.validateEntry(entry, historicalFeatureBindings.skillHash);
}

const exclusion = JSON.parse(readFileSync(join(root, "evals/skillopt-exclusion-forward-results.json"), "utf8"));
if (exclusion.schemaVersion !== 1) fail("Exclusion forward results must use schemaVersion 1");
for (const [field, expected] of Object.entries({
  ...currentBindings,
  cliHash: sha256(join(root, "scripts/kf-projects.mjs")),
})) {
  if (exclusion[field] !== expected) fail(`Exclusion forward results have stale ${field}`);
}
for (const field of ["method", "isolation", "writeEvidence", "limitations"]) {
  if (typeof exclusion[field] !== "string" || !exclusion[field].trim()) {
    fail(`Exclusion forward results must record ${field}`);
  }
}
const exclusionIds = ["route-evolution-auto-adopt", "route-evolution-stage"];
if (JSON.stringify(exclusion.cases?.map((entry) => entry.id)) !== JSON.stringify(exclusionIds)) {
  fail("Exclusion forward results must contain protected and allowed target scenarios");
}
const corpus = readFileSync(corpusPath, "utf8").trim().split("\n").map(JSON.parse);
for (const entry of exclusion.cases ?? []) {
  if (entry.prompt !== corpus.find((item) => item.id === entry.id)?.prompt) {
    fail(`${entry.id} exclusion prompt does not match the bound corpus`);
  }
  for (const field of ["rawResponse", "judgment"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) fail(`${entry.id} must record ${field}`);
  }
  if (entry.passed !== true) fail(`${entry.id} exclusion decision did not pass`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(
  `Validated ${expectedCases.length} historical K Fleet v2 release results and ` +
    `${expectedTestValueCases.length} historical test-value results and ` +
    `${expectedAstraCases.length} passing historical Astra results and ` +
    `${expectedFeatureCases.length} historical feature-method results and ` +
    `${expectedDisclosureCases.length - 1} passing historical progressive-disclosure results, 1 blocked observation with a historical release waiver, and ${controls.length} original-source control; ` +
    `${known.length} known baseline failure retained (not a passing adoption gate); ` +
    `${exclusionIds.length} current SkillOpt exclusion decision scenarios.`,
);
