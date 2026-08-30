import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const protocolVersion = 2;

export const expectedSkills = [
  "kf-add-test-coverage",
  "kf-delegate-subtask",
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

export const blindRubric = {
  observedPrimary: "The first substantive workflow entered from the request. Later substantive owners belong in observedSequence, not observedComposed.",
  observedComposed: "Only reusable method skills composed inside the primary workflow; sequential correction, verification, persistence, and re-entry owners belong only in observedSequence.",
  observedSequence: "Every workflow and method phase in execution order, including returns to an owner for closeout.",
  observedStopping: "The final ready, complete, incomplete, blocked, indeterminate, proposal-only, or authority-boundary state and why it stops there.",
  rationale: "Original evidence from the prompt and current Skill contracts; do not infer meaning from the anonymous caseRef.",
};

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function skillSourceHash(root) {
  const hash = createHash("sha256");
  for (const skill of expectedSkills) {
    hash.update(`${skill}\0`);
    hash.update(readFileSync(join(root, "skills", skill, "SKILL.md"), "utf8"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function toolingHash(root) {
  const hash = createHash("sha256");
  for (const file of [
    "eval-corpus-support.mjs",
    "prepare-eval-input.mjs",
    "score-eval-results.mjs",
    "validate-eval-corpus.mjs",
  ]) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(join(root, "scripts", file), "utf8"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function caseRef(index) {
  return `case-${String(index + 1).padStart(3, "0")}`;
}

export function blindCases(evalCases) {
  return evalCases.map(({ prompt }, index) => ({ caseRef: caseRef(index), prompt }));
}

export function evalHashes(root, evalCases) {
  return {
    skillSourceHash: skillSourceHash(root),
    toolingHash: toolingHash(root),
    corpusHash: sha256(canonicalJson(evalCases)),
    blindInputHash: sha256(canonicalJson({ rubric: blindRubric, cases: blindCases(evalCases) })),
  };
}

function sameArray(actual, expected) {
  return canonicalJson(actual) === canonicalJson(expected);
}

function phaseSequence(sequence) {
  return (sequence ?? []).filter((value, index, values) => index === 0 || value !== values[index - 1]);
}

export function rawObservationHash(runs) {
  return sha256(canonicalJson(runs));
}

export function resultsHash(results) {
  return sha256(canonicalJson(results));
}

export function scoreResults(evalCases, results, hashes) {
  const failures = [];
  const entriesByRef = new Map(evalCases.map((entry, index) => [caseRef(index), entry]));
  const observations = new Map();
  const runIds = new Set();
  const requiredRepeatIds = new Set([
    "delegate-explicit-specialist",
    "delegate-hard-review-quality-first",
    "delegate-efficient-worker-then-review",
    "verify-feature-reverify",
    "verify-refactor-reverify",
    "coverage-feature-correction-reentry",
    "authorized-learning-context-persistence",
    "full-closure-sequence",
    "learning-context-owner-resume",
    "monorepo-read-only-delegation",
  ]);

  if (results.protocolVersion !== protocolVersion) {
    failures.push(`results protocolVersion must be ${protocolVersion}`);
  }
  for (const [field, value] of Object.entries(hashes)) {
    if (results[field] !== value) failures.push(`results ${field} is stale`);
  }
  if (!Array.isArray(results.runs) || !results.runs.length) {
    failures.push("results must contain at least one run");
    return failures;
  }
  if (results.rawObservationHash !== rawObservationHash(results.runs)) {
    failures.push("results rawObservationHash does not match frozen runs");
  }

  for (const [runIndex, run] of results.runs.entries()) {
    const prefix = `run ${run.runId ?? runIndex + 1}`;
    if (typeof run.runId !== "string" || !run.runId) failures.push(`${prefix} must name runId`);
    else if (runIds.has(run.runId)) failures.push(`${prefix} duplicates runId`);
    else runIds.add(run.runId);
    if (typeof run.model !== "string" || !run.model) failures.push(`${prefix} must name model`);
    if (typeof run.reasoningConfig !== "string" || !run.reasoningConfig) {
      failures.push(`${prefix} must record reasoningConfig`);
    }
    if (run.blindInputHash !== hashes.blindInputHash) {
      failures.push(`${prefix} must record the current blindInputHash`);
    }
    if (run.evaluatorMode !== "independent-blind-read-only") {
      failures.push(`${prefix} must use independent-blind-read-only evaluatorMode`);
    }
    if (!Array.isArray(run.observations) || !run.observations.length) {
      failures.push(`${prefix} must contain case observations`);
      continue;
    }

    for (const observation of run.observations) {
      const entry = entriesByRef.get(observation.caseRef);
      const casePrefix = `${prefix} ${observation.caseRef ?? "<missing>"}`;
      if (!entry) {
        failures.push(`${casePrefix} is not a current blind case`);
        continue;
      }
      const expected = entry.expected;
      const key = `${run.runId}\0${observation.caseRef}`;
      if (observations.has(key)) failures.push(`${casePrefix} is duplicated in one run`);
      observations.set(key, observation);

      if (observation.observedPrimary !== expected.primary) {
        failures.push(`${casePrefix} primary mismatch`);
      }
      if (!sameArray(observation.observedComposed, expected.composed)) {
        failures.push(`${casePrefix} composed mismatch`);
      }
      if (!sameArray(phaseSequence(observation.observedSequence), expected.sequence)) {
        failures.push(`${casePrefix} sequence mismatch`);
      }
      const observedSkills = new Set([
        observation.observedPrimary,
        ...(observation.observedComposed ?? []),
        ...(observation.observedSequence ?? []),
      ]);
      for (const forbidden of expected.forbidden) {
        if (observedSkills.has(forbidden)) failures.push(`${casePrefix} observed forbidden ${forbidden}`);
      }
      if (observation.mutationObserved !== false) {
        failures.push(`${casePrefix} must report mutationObserved false`);
      }
      if (observation.contaminationObserved !== false) {
        failures.push(`${casePrefix} must report contaminationObserved false`);
      }
      if (typeof observation.observedStopping !== "string" || !observation.observedStopping.trim()) {
        failures.push(`${casePrefix} must record observedStopping`);
      }
      if (typeof observation.rationale !== "string" || !observation.rationale.trim()) {
        failures.push(`${casePrefix} must preserve blind rationale`);
      }
    }
  }

  for (const [ref, entry] of entriesByRef) {
    const matchingRuns = results.runs.filter((run) =>
      (run.observations ?? []).some((observation) => observation.caseRef === ref));
    if (!matchingRuns.length) failures.push(`results do not cover ${ref}`);
    if (requiredRepeatIds.has(entry.id) && matchingRuns.length < 2) {
      failures.push(`${ref} requires observations from at least two independent runs`);
    }
  }

  if (!Array.isArray(results.judgeRuns) || !results.judgeRuns.length) {
    failures.push("results must contain post-hoc judgeRuns");
    return failures;
  }
  const judgeRunIds = new Set();
  const judgmentsByRef = new Map();
  for (const [judgeIndex, judgeRun] of results.judgeRuns.entries()) {
    const prefix = `judge ${judgeRun.judgeRunId ?? judgeIndex + 1}`;
    if (typeof judgeRun.judgeRunId !== "string" || !judgeRun.judgeRunId) {
      failures.push(`${prefix} must name judgeRunId`);
    } else if (judgeRunIds.has(judgeRun.judgeRunId)) {
      failures.push(`${prefix} duplicates judgeRunId`);
    } else judgeRunIds.add(judgeRun.judgeRunId);
    if (typeof judgeRun.model !== "string" || !judgeRun.model) failures.push(`${prefix} must name model`);
    if (typeof judgeRun.reasoningConfig !== "string" || !judgeRun.reasoningConfig) {
      failures.push(`${prefix} must record reasoningConfig`);
    }
    if (judgeRun.evaluatorMode !== "independent-post-hoc-read-only") {
      failures.push(`${prefix} must use independent-post-hoc-read-only evaluatorMode`);
    }
    for (const judgment of judgeRun.judgments ?? []) {
      const entry = entriesByRef.get(judgment.caseRef);
      const judgmentPrefix = `${prefix} ${judgment.caseRef ?? "<missing>"}`;
      if (!entry) {
        failures.push(`${judgmentPrefix} is not a current blind case`);
        continue;
      }
      if (judgmentsByRef.has(judgment.caseRef)) {
        failures.push(`${judgmentPrefix} has more than one canonical judgment`);
      } else judgmentsByRef.set(judgment.caseRef, judgment);
      const matchingRunIds = results.runs
        .filter((run) => (run.observations ?? []).some((observation) =>
          observation.caseRef === judgment.caseRef))
        .map((run) => run.runId)
        .sort();
      const citedRunIds = [...(judgment.observationRunIds ?? [])].sort();
      if (!sameArray(citedRunIds, matchingRunIds)) {
        failures.push(`${judgmentPrefix} must cite every and only runs that observed this case`);
      }
      if (judgment.stoppingPass !== true
        || typeof judgment.stoppingEvidence !== "string" || !judgment.stoppingEvidence.trim()) {
        failures.push(`${judgmentPrefix} must score stopping with evidence`);
      }
      if (!Array.isArray(judgment.invariants)
        || judgment.invariants.length !== entry.expected.invariants.length) {
        failures.push(`${judgmentPrefix} must score every invariant`);
      } else {
        for (const [index, invariant] of judgment.invariants.entries()) {
          const expectedText = entry.expected.invariants[index];
          if (invariant.index !== index || invariant.pass !== true
            || typeof invariant.evidence !== "string" || !invariant.evidence.trim()) {
            failures.push(`${judgmentPrefix} invariant ${index} needs pass=true and evidence`);
          } else if (invariant.evidence.includes(expectedText)) {
            failures.push(`${judgmentPrefix} invariant ${index} repeats hidden expected text`);
          }
        }
      }
    }
  }
  for (const ref of entriesByRef.keys()) {
    if (!judgmentsByRef.has(ref)) failures.push(`judge results do not cover ${ref}`);
  }
  return failures;
}
