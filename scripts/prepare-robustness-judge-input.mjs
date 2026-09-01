import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { protocolVersion } from "./eval-corpus-support.mjs";
import {
  hashCanonical,
  judgeProtocol,
  judgeToolingHash,
} from "./robustness-eval-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const matrixRoot = option("--matrix-root");
const evaluatorModel = option("--evaluator-model");
const runIds = (option("--runs") ?? "").split(",").filter(Boolean);
if (!matrixRoot || !evaluatorModel || !runIds.length) {
  console.error("Usage: node scripts/prepare-robustness-judge-input.mjs --matrix-root <directory> --evaluator-model <model> --runs <id,id,...>");
  process.exit(1);
}

const evalCases = readFileSync(join(root, "evals", "robustness-routing.jsonl"), "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));
const casesByRef = new Map(evalCases.map((entry, index) => [
  `case-${String(index + 1).padStart(3, "0")}`,
  entry,
]));
const runs = runIds.map((runId) => JSON.parse(readFileSync(join(resolve(matrixRoot), "raw", `${runId}.json`), "utf8")));
for (const run of runs) {
  if (run.model !== evaluatorModel) throw new Error(`${run.runId} model does not match ${evaluatorModel}`);
}
const observations = runs.flatMap((run) => run.observations.map((observation) => ({
  runId: run.runId,
  observationContentHash: hashCanonical(observation),
  observation,
})));
const caseRefs = [...new Set(observations.map((entry) => entry.observation.caseRef))];
const expectations = caseRefs.map((caseRef) => {
  const entry = casesByRef.get(caseRef);
  if (!entry) throw new Error(`Unknown ${caseRef}`);
  return {
    caseRef,
    mustStopWhen: entry.expected.mustStopWhen,
    invariants: entry.expected.invariants,
  };
});
const bindings = {
  evaluatorModel,
  judgeProtocolHash: hashCanonical(judgeProtocol),
  judgeToolingHash: judgeToolingHash(root),
  observationSetHash: hashCanonical(observations),
  expectedSetHash: hashCanonical(expectations),
};
const judgeInputHash = hashCanonical({
  protocolVersion,
  judgeProtocol,
  ...bindings,
  observations,
  expectations,
});

process.stdout.write(`${JSON.stringify({
  suite: "routing-robustness-judge-v1",
  protocolVersion,
  judgeInputHash,
  ...bindings,
  judgeProtocol,
  observations,
  expectations,
}, null, 2)}\n`);
