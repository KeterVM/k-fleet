import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resultsPath = join(root, "evals/v2-release-forward-results.json");
const reportPath = join(root, "evals/V2_RELEASE_FORWARD_TEST_REPORT.md");
const corpusPath = join(root, "evals/orchestrator-routing.jsonl");
const lockPath = join(root, "examples/fleet-ledger/skills-lock.json");
const failures = [];

function fail(message) {
  failures.push(message);
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const results = JSON.parse(readFileSync(resultsPath, "utf8"));
const report = readFileSync(reportPath, "utf8");
const lock = JSON.parse(readFileSync(lockPath, "utf8"));
const skillHash = lock.skills?.["kf-orchestrate-work"]?.computedHash;
const corpusHash = sha256(corpusPath);

if (results.schemaVersion !== 1) fail("Forward results must use schemaVersion 1");
if (results.skillHash !== skillHash) fail("Forward results do not match the current skill hash");
if (results.corpusHash !== corpusHash) fail("Forward results do not match the current corpus hash");
if (!report.includes(results.skillHash) || !report.includes(results.corpusHash)) {
  fail("Forward report must name the exact skill and corpus hashes");
}

const expectedCases = [
  "setup-create-bootstrap-only",
  "setup-malformed-marker",
  "supermemory-operation-unavailable",
  "evolution-no-regression-gate-missing",
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

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Validated ${expectedCases.length} source-bound K Fleet v2 release forward results.`);
