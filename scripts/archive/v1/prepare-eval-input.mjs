import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { blindCases, blindRubric, evalHashes, protocolVersion } from "./eval-corpus-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const evalCases = readFileSync(join(root, "evals/harness-routing.jsonl"), "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));

process.stdout.write(`${JSON.stringify({
  protocolVersion,
  ...evalHashes(root, evalCases),
  rubric: blindRubric,
  cases: blindCases(evalCases),
}, null, 2)}\n`);
