import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const expectedSkills = [
  "kf-add-test-coverage",
  "kf-delegate-specialist",
  "kf-design-change",
  "kf-fix-bug",
  "kf-implement-feature",
  "kf-investigate-issue",
  "kf-learn-from-evidence",
  "kf-maintain-context",
  "kf-refactor-code",
  "kf-test-driven-change",
  "kf-verify-change",
];
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function skillSourceHash() {
  const hash = createHash("sha256");
  for (const skill of expectedSkills) {
    hash.update(`${skill}\0`);
    hash.update(read(join(root, "skills", skill, "SKILL.md")));
    hash.update("\0");
  }
  return hash.digest("hex");
}

const evalPath = join(root, "evals/harness-routing.jsonl");
const evalCases = [];
const ids = new Set();

if (!existsSync(evalPath)) {
  fail(`Missing ${relative(root, evalPath)}`);
} else {
  for (const [index, line] of read(evalPath).split("\n").entries()) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch (error) {
      fail(`${relative(root, evalPath)}:${index + 1} is invalid JSON: ${error.message}`);
      continue;
    }

    evalCases.push(entry);
    if (typeof entry.id !== "string" || !entry.id) {
      fail(`${relative(root, evalPath)}:${index + 1} must have an id`);
    } else if (ids.has(entry.id)) {
      fail(`${relative(root, evalPath)} has duplicate id ${entry.id}`);
    } else {
      ids.add(entry.id);
    }
    if (typeof entry.mode !== "string" || !entry.mode) {
      fail(`${entry.id ?? `line ${index + 1}`} must have a mode`);
    }
    if (typeof entry.prompt !== "string" || !entry.prompt) {
      fail(`${entry.id ?? `line ${index + 1}`} must have a prompt`);
    }

    const expected = entry.expected;
    if (!expected || typeof expected !== "object") {
      fail(`${entry.id ?? `line ${index + 1}`} must have expected results`);
      continue;
    }
    if (!expectedSkills.includes(expected.primary)) {
      fail(`${entry.id} has unknown primary skill ${expected.primary}`);
    }
    for (const field of ["composed", "forbidden", "sequence", "invariants"]) {
      if (!Array.isArray(expected[field])) fail(`${entry.id} expected.${field} must be an array`);
    }
    for (const field of ["composed", "forbidden", "sequence"]) {
      for (const skill of expected[field] ?? []) {
        if (!expectedSkills.includes(skill)) fail(`${entry.id} ${field} has unknown skill ${skill}`);
      }
    }
    if (!(expected.invariants ?? []).length) fail(`${entry.id} must define observable invariants`);
    if ((expected.composed ?? []).includes(expected.primary)) {
      fail(`${entry.id} repeats its primary skill as a composed method`);
    }
    if ((expected.forbidden ?? []).includes(expected.primary)) {
      fail(`${entry.id} forbids its primary skill`);
    }
  }
}

const modes = new Set(evalCases.map((entry) => entry.mode));
for (const mode of ["routing", "composition", "sequence", "handoff", "learning", "delegation"]) {
  if (!modes.has(mode)) fail(`Harness evals do not cover ${mode}`);
}

const primarySkills = new Set(evalCases.map((entry) => entry.expected?.primary));
for (const skill of expectedSkills.filter((skill) => skill !== "kf-test-driven-change")) {
  if (!primarySkills.has(skill)) fail(`Harness evals do not route a primary case to ${skill}`);
}

if (!evalCases.some((entry) => entry.expected?.composed?.includes("kf-test-driven-change"))) {
  fail("Harness evals do not cover TDD composition");
}
for (const id of [
  "tdd-red-does-not-own-architecture",
  "tdd-no-credible-seam",
  "tdd-valid-production-abstraction",
  "tdd-test-conflicts-with-accepted-design",
]) {
  if (!ids.has(id)) fail(`Harness evals do not cover ${id}`);
}
if (!evalCases.some((entry) => {
  const sequence = entry.expected?.sequence ?? [];
  return sequence.length >= 3
    && sequence[0] === "kf-verify-change"
    && sequence.at(-1) === "kf-verify-change";
})) {
  fail("Harness evals do not cover correction followed by re-verification");
}
if (!evalCases.some((entry) => {
  const sequence = entry.expected?.sequence ?? [];
  return sequence[0] === "kf-investigate-issue"
    && sequence.includes("kf-fix-bug")
    && sequence.at(-1) === "kf-verify-change";
})) {
  fail("Harness evals do not cover investigation, correction, and verification");
}
if (!evalCases.some((entry) => entry.expected?.primary === "kf-maintain-context"
  && (entry.expected?.forbidden ?? []).includes("kf-learn-from-evidence")
  && (entry.expected?.invariants ?? []).some((value) => value.includes("no new behavioral policy")))) {
  fail("Harness evals do not separate context facts from new behavioral policy");
}
if (!evalCases.some((entry) => entry.id === "durable-rule-then-feature"
  && entry.expected?.primary === "kf-maintain-context"
  && (entry.expected?.forbidden ?? []).includes("kf-learn-from-evidence"))) {
  fail("Harness evals do not route direct authorized policy to context maintenance");
}
if (!evalCases.some((entry) => entry.id === "repeated-independent-learning-signal"
  && entry.expected?.primary === "kf-learn-from-evidence"
  && (entry.expected?.forbidden ?? []).includes("kf-maintain-context"))) {
  fail("Harness evals do not stop unauthorized learning before Context persistence");
}
if (!evalCases.some((entry) => JSON.stringify(entry.expected?.sequence) === JSON.stringify([
  "kf-learn-from-evidence",
  "kf-maintain-context",
]))) {
  fail("Harness evals do not cover authorized learning-to-Context persistence");
}
if (!evalCases.some((entry) => JSON.stringify(entry.expected?.sequence) === JSON.stringify([
  "kf-design-change",
  "kf-implement-feature",
  "kf-verify-change",
  "kf-fix-bug",
  "kf-verify-change",
  "kf-learn-from-evidence",
  "kf-maintain-context",
]))) {
  fail("Harness evals do not cover the full design-to-context closure sequence");
}

for (const id of [
  "investigation-instrumentation-no-correction",
  "coverage-mismatch-no-correction",
  "design-then-implement",
  "current-task-correction-no-learning",
]) {
  if (!ids.has(id)) fail(`Harness evals do not cover trigger boundary ${id}`);
}

const sourceHash = skillSourceHash();
const currentEvidencePath = join(root, "evals/TRIGGER_BOUNDARY_EVAL_REPORT.md");
if (!existsSync(currentEvidencePath)) {
  fail(`Missing ${relative(root, currentEvidencePath)}`);
} else {
  const evidence = read(currentEvidencePath);
  const recordedHash = evidence.match(/^Skill source SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  if (!recordedHash) {
    fail(`${relative(root, currentEvidencePath)} must record Skill source SHA-256`);
  } else if (recordedHash !== sourceHash) {
    fail(`${relative(root, currentEvidencePath)} is stale for the current skill sources`);
  }
  if (!/^Evaluator mode:\s*independent, blind, read-only$/m.test(evidence)) {
    fail(`${relative(root, currentEvidencePath)} must record independent blind read-only evaluation`);
  }
  if (!/^Repository base:\s*`[a-f0-9]{40}`/m.test(evidence)) {
    fail(`${relative(root, currentEvidencePath)} must record the repository base revision`);
  }
  for (const id of [
    "investigation-instrumentation-no-correction",
    "coverage-mismatch-no-correction",
    "design-then-implement",
    "current-task-correction-no-learning",
  ]) {
    if (!evidence.includes(`\`${id}\``)) {
      fail(`${relative(root, currentEvidencePath)} does not record evaluated case ${id}`);
    }
  }
}

const closureEvidencePath = join(root, "evals/CLOSURE_EVAL_REPORT.md");
if (!existsSync(closureEvidencePath)) {
  fail(`Missing ${relative(root, closureEvidencePath)}`);
} else {
  const evidence = read(closureEvidencePath);
  const recordedHash = evidence.match(/^Skill source SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  if (!recordedHash) {
    fail(`${relative(root, closureEvidencePath)} must record Skill source SHA-256`);
  } else if (recordedHash !== sourceHash) {
    fail(`${relative(root, closureEvidencePath)} is stale for the current skill sources`);
  }
  if (!/^Evaluator mode:\s*independent, blind, read-only$/m.test(evidence)) {
    fail(`${relative(root, closureEvidencePath)} must record independent blind read-only evaluation`);
  }
  if (!/^Repository base:\s*`[a-f0-9]{40}`/m.test(evidence)) {
    fail(`${relative(root, closureEvidencePath)} must record the repository base revision`);
  }
  for (const id of [
    "full-closure-sequence",
    "repeated-independent-learning-signal",
    "authorized-learning-context-persistence",
    "direct-authorized-policy",
    "learning-context-owner-unavailable",
  ]) {
    if (!evidence.includes(`\`${id}\``)) {
      fail(`${relative(root, closureEvidencePath)} does not record evaluated case ${id}`);
    }
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Linted ${evalCases.length} harness eval cases; expectations were not executed.`);
console.log(`Current skill source SHA-256: ${sourceHash}`);
