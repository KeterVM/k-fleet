import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  blindCases,
  blindRubric,
  canonicalJson,
  protocolVersion,
  skillSourceHash,
} from "./eval-corpus-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = join(root, "evals/robustness-routing.jsonl");
const evalCases = readFileSync(corpusPath, "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));
const blind = {
  rubric: blindRubric,
  cases: blindCases(evalCases),
};
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const toolingHash = (() => {
  const hash = createHash("sha256");
  for (const file of [
    "materialize-catalog-ablation.mjs",
    "prepare-robustness-input.mjs",
    "validate-robustness-evals.mjs",
  ]) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(join(root, "scripts", file)));
    hash.update("\0");
  }
  return hash.digest("hex");
})();

process.stdout.write(`${JSON.stringify({
  suite: "routing-robustness-v1",
  protocolVersion,
  skillSourceHash: skillSourceHash(root),
  corpusHash: sha256(canonicalJson(evalCases)),
  blindInputHash: sha256(canonicalJson(blind)),
  toolingHash,
  ...blind,
}, null, 2)}\n`);
