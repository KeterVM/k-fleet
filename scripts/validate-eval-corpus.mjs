import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evalHashes,
  expectedSkills,
  protocolVersion,
  rawObservationHash,
  resultsHash,
  scoreResults,
} from "./eval-corpus-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
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
for (const skill of expectedSkills.filter((skill) => ![
  "kf-delegate-subtask",
  "kf-test-driven-change",
].includes(skill))) {
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
for (const id of [
  "coverage-authorized-correction-reentry",
  "coverage-correction-blocked",
  "coverage-feature-correction-reentry",
]) {
  if (!ids.has(id)) fail(`Harness evals do not cover ${id}`);
}
for (const [id, sequence] of Object.entries({
  "verify-repair-reverify": ["kf-verify-change", "kf-fix-bug", "kf-verify-change"],
  "verify-feature-reverify": ["kf-verify-change", "kf-implement-feature", "kf-verify-change"],
  "verify-refactor-reverify": ["kf-verify-change", "kf-refactor-code", "kf-verify-change"],
  "verify-design-decision-boundary": ["kf-verify-change", "kf-design-change"],
  "investigate-feature-verify": ["kf-investigate-issue", "kf-implement-feature", "kf-verify-change"],
  "investigate-refactor-verify": ["kf-investigate-issue", "kf-refactor-code", "kf-verify-change"],
  "verify-correction-blocked": ["kf-verify-change", "kf-fix-bug"],
})) {
  const entry = evalCases.find((candidate) => candidate.id === id);
  if (!entry) {
    fail(`Harness evals do not cover ${id}`);
  } else if (JSON.stringify(entry.expected?.sequence) !== JSON.stringify(sequence)) {
    fail(`${id} does not preserve its required owner and re-entry sequence`);
  }
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
if (!evalCases.some((entry) => entry.id === "direct-authorized-policy"
  && entry.expected?.primary === "kf-maintain-context"
  && (entry.expected?.forbidden ?? []).includes("kf-learn-from-evidence"))) {
  fail("Harness evals do not route direct authorized policy to context maintenance");
}
if (!evalCases.some((entry) => entry.id === "durable-rule-then-feature"
  && entry.expected?.primary === "kf-maintain-context"
  && JSON.stringify(entry.expected?.sequence) === JSON.stringify([
    "kf-maintain-context",
    "kf-implement-feature",
  ]))) {
  fail("Harness evals do not preserve direct policy placement before the later feature outcome");
}
if (!evalCases.some((entry) => entry.id === "repeated-independent-learning-signal"
  && entry.expected?.primary === "kf-learn-from-evidence"
  && (entry.expected?.forbidden ?? []).includes("kf-maintain-context"))) {
  fail("Harness evals do not stop unauthorized learning before Context persistence");
}
if (!evalCases.some((entry) => JSON.stringify(entry.expected?.sequence) === JSON.stringify([
  "kf-learn-from-evidence",
  "kf-maintain-context",
  "kf-learn-from-evidence",
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
  "kf-learn-from-evidence",
]))) {
  fail("Harness evals do not cover the full design-to-context closure sequence");
}

for (const id of [
  "investigation-instrumentation-no-correction",
  "coverage-mismatch-no-correction",
  "design-then-implement",
  "current-task-correction-no-learning",
  "direct-authorized-policy",
  "learning-context-owner-unavailable",
  "learning-context-owner-resume",
  "learning-defect-persistence-owner",
  "learning-feature-persistence-owner",
  "learning-refactor-persistence-owner",
  "learning-regression-evidence-owner",
  "learning-documentation-parent-owner-unavailable",
  "delegate-hard-review-quality-first",
  "delegate-efficient-worker-then-review",
  "delegate-read-parallel-write-serial",
]) {
  if (!ids.has(id)) fail(`Harness evals do not cover trigger boundary ${id}`);
}

const hashes = evalHashes(root, evalCases);
const sourceHash = hashes.skillSourceHash;
const currentResultsPath = join(root, "evals/current-results.json");
let currentResultsDigest;
let currentRawObservationDigest;
if (!existsSync(currentResultsPath)) {
  fail(`Missing ${relative(root, currentResultsPath)}`);
} else {
  try {
    const results = JSON.parse(read(currentResultsPath));
    currentResultsDigest = resultsHash(results);
    currentRawObservationDigest = rawObservationHash(results.runs ?? []);
    for (const resultFailure of scoreResults(evalCases, results, hashes)) {
      fail(`${relative(root, currentResultsPath)}: ${resultFailure}`);
    }
  } catch (error) {
    fail(`${relative(root, currentResultsPath)} is invalid: ${error.message}`);
  }
}

function validateEvidenceMetadata(evidence, path) {
  const recordedSourceHash = evidence.match(/^Skill source SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  const recordedCorpusHash = evidence.match(/^Eval corpus SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  const recordedBlindHash = evidence.match(/^Blind input SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  const recordedToolingHash = evidence.match(/^Eval tooling SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  const recordedRawObservationHash = evidence.match(/^Raw observation SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  const recordedProtocol = Number(evidence.match(/^Eval protocol version:\s*`([0-9]+)`$/m)?.[1]);
  const recordedResultsHash = evidence.match(/^Results SHA-256:\s*`([a-f0-9]{64})`$/m)?.[1];
  if (!recordedSourceHash) fail(`${relative(root, path)} must record Skill source SHA-256`);
  else if (recordedSourceHash !== hashes.skillSourceHash) fail(`${relative(root, path)} is stale for the current skill sources`);
  if (!recordedCorpusHash) fail(`${relative(root, path)} must record Eval corpus SHA-256`);
  else if (recordedCorpusHash !== hashes.corpusHash) fail(`${relative(root, path)} is stale for the current eval corpus`);
  if (!recordedBlindHash) fail(`${relative(root, path)} must record Blind input SHA-256`);
  else if (recordedBlindHash !== hashes.blindInputHash) fail(`${relative(root, path)} is stale for the current blind inputs`);
  if (!recordedToolingHash) fail(`${relative(root, path)} must record Eval tooling SHA-256`);
  else if (recordedToolingHash !== hashes.toolingHash) fail(`${relative(root, path)} is stale for the current eval tooling`);
  if (!recordedRawObservationHash) fail(`${relative(root, path)} must record Raw observation SHA-256`);
  else if (recordedRawObservationHash !== currentRawObservationDigest) fail(`${relative(root, path)} is stale for current raw observations`);
  if (recordedProtocol !== protocolVersion) fail(`${relative(root, path)} must record eval protocol version ${protocolVersion}`);
  if (!recordedResultsHash) fail(`${relative(root, path)} must record Results SHA-256`);
  else if (recordedResultsHash !== currentResultsDigest) fail(`${relative(root, path)} is stale for current structured results`);
}

const currentEvidencePath = join(root, "evals/TRIGGER_BOUNDARY_EVAL_REPORT.md");
if (!existsSync(currentEvidencePath)) {
  fail(`Missing ${relative(root, currentEvidencePath)}`);
} else {
  const evidence = read(currentEvidencePath);
  validateEvidenceMetadata(evidence, currentEvidencePath);
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
  validateEvidenceMetadata(evidence, closureEvidencePath);
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
console.log(`Current eval corpus SHA-256: ${hashes.corpusHash}`);
console.log(`Current blind input SHA-256: ${hashes.blindInputHash}`);
console.log(`Eval protocol version: ${protocolVersion}`);
