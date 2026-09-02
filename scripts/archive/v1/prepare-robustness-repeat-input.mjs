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
import {
  fixtureBindingInstruction,
  highRiskCaseRefs,
  robustnessToolingHash,
} from "./robustness-eval-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = join(root, "evals/robustness-routing.jsonl");
const evalCases = readFileSync(corpusPath, "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));
const allBlindCases = blindCases(evalCases);
const selectedCases = evalCases.filter((entry, index) => highRiskCaseRefs.includes(allBlindCases[index].caseRef));
const selectedBlindCases = allBlindCases.filter((entry) => highRiskCaseRefs.includes(entry.caseRef));
const blind = {
  fixtureBinding: fixtureBindingInstruction,
  rubric: blindRubric,
  cases: selectedBlindCases,
};
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

process.stdout.write(`${JSON.stringify({
  suite: "routing-robustness-v2-high-risk-repeat",
  protocolVersion,
  skillSourceHash: skillSourceHash(root),
  corpusHash: sha256(canonicalJson(selectedCases)),
  fullCorpusHash: sha256(canonicalJson(evalCases)),
  blindInputHash: sha256(canonicalJson(blind)),
  toolingHash: robustnessToolingHash(root),
  ...blind,
}, null, 2)}\n`);
