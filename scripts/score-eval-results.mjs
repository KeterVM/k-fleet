import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evalHashes, scoreResults } from "./eval-corpus-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resultsPath = process.argv[2];
if (!resultsPath) {
  console.error("Usage: node scripts/score-eval-results.mjs <results.json>");
  process.exit(1);
}

const evalCases = readFileSync(join(root, "evals/harness-routing.jsonl"), "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));
const results = JSON.parse(readFileSync(resolve(resultsPath), "utf8"));
const failures = scoreResults(evalCases, results, evalHashes(root, evalCases));

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

const observationCount = results.runs.reduce((sum, run) => sum + run.observations.length, 0);
console.log(`Scored ${observationCount} observations across ${evalCases.length} cases.`);
