import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { canonicalJson } from "./eval-corpus-support.mjs";

export const fixtureBindingInstruction =
  "Copy fixtureBindingHash byte-for-byte from .kf-eval-binding.json into the evaluator run. The opaque value binds the run to this anonymous fixture without revealing its catalog variant.";

export const highRiskCaseRefs = [
  "case-005",
  "case-006",
  "case-011",
  "case-012",
  "case-017",
  "case-018",
  "case-021",
  "case-022",
];

export const judgeProtocol = {
  version: 1,
  mode: "independent-post-hoc-read-only",
  stopping: "Judge whether the frozen observedStopping satisfies mustStopWhen without repairing the observation.",
  invariants: "Judge every hidden invariant in zero-based order against the exact frozen observation and its rationale.",
  evidence: "Provide concise case-specific evidence without copying hidden expected text verbatim.",
  binding: "Copy judgeInputHash, observationSetHash, expectedSetHash, and judgeToolingHash byte-for-byte from the frozen judge input.",
};

export const evaluationToolFiles = [
  "eval-corpus-support.mjs",
  "materialize-catalog-ablation.mjs",
  "prepare-robustness-input.mjs",
  "prepare-robustness-repeat-input.mjs",
  "robustness-eval-support.mjs",
  "validate-robustness-evals.mjs",
];

export const judgeToolFiles = [
  "eval-corpus-support.mjs",
  "prepare-robustness-judge-input.mjs",
  "robustness-eval-support.mjs",
];

export const scoringToolFiles = [
  "eval-corpus-support.mjs",
  "robustness-eval-support.mjs",
  "score-robustness-results.mjs",
];

function hashFiles(root, files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(join(root, "scripts", file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function robustnessToolingHash(root) {
  return hashFiles(root, evaluationToolFiles);
}

export function judgeToolingHash(root) {
  return hashFiles(root, judgeToolFiles);
}

export function scoringToolingHash(root) {
  return hashFiles(root, scoringToolFiles);
}

export function hashCanonical(value) {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

export function fixtureBindingHash({ catalogHash, skillTreeHash, skillSourceHash, toolingHash }) {
  return hashCanonical({
    schemaVersion: 1,
    suite: "anonymous-catalog-fixture-v1",
    catalogHash,
    skillTreeHash,
    skillSourceHash,
    toolingHash,
  });
}
