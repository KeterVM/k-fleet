import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = join(root, "evals/feedback-reporting.jsonl");
const reportPath = join(root, "evals/SKILL_USAGE_REPORT_EVAL_REPORT.md");
const failures = [];
const cases = [];
const ids = new Set();

function fail(message) {
  failures.push(message);
}

function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

if (!existsSync(corpusPath)) {
  fail(`Missing ${relative(root, corpusPath)}`);
} else {
  for (const [index, line] of readFileSync(corpusPath, "utf8").split("\n").entries()) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch (error) {
      fail(`${relative(root, corpusPath)}:${index + 1} is invalid JSON: ${error.message}`);
      continue;
    }

    cases.push(entry);
    const prefix = entry.id ?? `line ${index + 1}`;
    if (typeof entry.id !== "string" || !entry.id) fail(`${prefix} must have an id`);
    else if (ids.has(entry.id)) fail(`${prefix} is duplicated`);
    else ids.add(entry.id);
    if (typeof entry.prompt !== "string" || !entry.prompt) fail(`${prefix} must have a prompt`);

    const expected = entry.expected;
    if (!expected || typeof expected !== "object") {
      fail(`${prefix} must have expected results`);
      continue;
    }
    if (typeof expected.should_use_reporter !== "boolean") {
      fail(`${prefix} expected.should_use_reporter must be boolean`);
    }
    if (!["complete", "ongoing", "partial", "blocked", "unknown"].includes(expected.terminal_state)) {
      fail(`${prefix} has invalid terminal_state`);
    }
    if (typeof expected.write_scope !== "string" || !expected.write_scope) {
      fail(`${prefix} must define write_scope`);
    }
    if (!Array.isArray(expected.invariants) || !expected.invariants.length) {
      fail(`${prefix} must define observable invariants`);
    }
  }
}

for (const id of [
  "post-work-agent-feedback",
  "ordinary-task-summary",
  "ongoing-work-not-reportable",
  "unknown-provenance-report",
  "sanitized-file-report",
]) {
  if (!ids.has(id)) fail(`Feedback corpus does not cover ${id}`);
}

if (!cases.some((entry) => entry.expected?.should_use_reporter === true)) {
  fail("Feedback corpus must cover reporter activation");
}
if (!cases.some((entry) => entry.expected?.should_use_reporter === false)) {
  fail("Feedback corpus must cover reporter non-activation");
}
if (!cases.some((entry) => entry.expected?.write_scope === "one-requested-report-artifact")) {
  fail("Feedback corpus must cover report-only file writes");
}

if (!existsSync(reportPath)) {
  fail(`Missing ${relative(root, reportPath)}`);
} else {
  const report = readFileSync(reportPath, "utf8");
  const skillPath = join(root, "skills/kf-report-skill-usage/SKILL.md");
  const contractPath = join(root, "skills/kf-report-skill-usage/references/feedback-packet.md");
  const recordedSkillHash = report.match(/^Skill source SHA-256:\s*`([a-f0-9]{64})`\s*$/m)?.[1];
  const recordedContractHash = report.match(/^Packet contract SHA-256:\s*`([a-f0-9]{64})`\s*$/m)?.[1];
  if (recordedSkillHash !== sha256File(skillPath)) {
    fail(`${relative(root, reportPath)} is stale for the reporting skill source`);
  }
  if (recordedContractHash !== sha256File(contractPath)) {
    fail(`${relative(root, reportPath)} is stale for the packet contract`);
  }
  for (const boundary of [
    "ordinary-summary non-trigger",
    "unknown-provenance",
    "sanitization",
    "single-report-artifact",
  ]) {
    if (!report.includes(boundary)) {
      fail(`${relative(root, reportPath)} does not record ${boundary}`);
    }
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Linted ${cases.length} feedback-reporting cases; expectations were not executed.`);
