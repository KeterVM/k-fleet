import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson, expectedSkills } from "./eval-corpus-support.mjs";
import { robustnessToolingHash } from "./robustness-eval-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = join(root, "evals/robustness-routing.jsonl");
const candidatePath = join(root, "evals/catalog-description-candidate.json");
const failures = [];

function fail(message) {
  failures.push(message);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readJsonl(path) {
  const entries = [];
  if (!existsSync(path)) {
    fail(`Missing ${relative(root, path)}`);
    return entries;
  }
  for (const [index, line] of readFileSync(path, "utf8").split("\n").entries()) {
    if (!line.trim()) continue;
    try {
      entries.push(JSON.parse(line));
    } catch (error) {
      fail(`${relative(root, path)}:${index + 1} is invalid JSON: ${error.message}`);
    }
  }
  return entries;
}

function currentDescription(skill) {
  const source = readFileSync(join(root, "skills", skill, "SKILL.md"), "utf8");
  return source.match(/^description:\s*(.+)$/m)?.[1];
}

const cases = readJsonl(corpusPath);
const ids = new Set();
const locales = new Map();
const styles = new Map();
const primaryCounts = new Map();
const explicitSkillPattern = /\bkf[-_][a-z0-9-]+\b/i;
const authorityPattern = /\b(?:authorized|authorization|permission|read-only|must not|do not|don't|cannot|can't|not allowed)\b|(?:只读|权限|不得|不要|不能|不许)/i;
let authorityPrompts = 0;
let tddCases = 0;

for (const entry of cases) {
  const prefix = entry.id ?? "<missing id>";
  const keys = Object.keys(entry).sort();
  const expectedKeys = ["expected", "id", "locale", "mode", "prompt", "style"];
  if (canonicalJson(keys) !== canonicalJson(expectedKeys)) {
    fail(`${prefix} must contain exactly ${expectedKeys.join(", ")}`);
  }
  if (typeof entry.id !== "string" || !entry.id) fail(`${prefix} must have an id`);
  else if (ids.has(entry.id)) fail(`duplicate robustness id ${entry.id}`);
  else ids.add(entry.id);

  if (!["routing", "composition", "sequence"].includes(entry.mode)) {
    fail(`${prefix} has unsupported mode ${entry.mode}`);
  }
  if (!["en", "zh-CN"].includes(entry.locale)) fail(`${prefix} has unsupported locale ${entry.locale}`);
  else locales.set(entry.locale, (locales.get(entry.locale) ?? 0) + 1);
  if (!["terse", "messy", "mixed-intent"].includes(entry.style)) {
    fail(`${prefix} has unsupported style ${entry.style}`);
  } else styles.set(entry.style, (styles.get(entry.style) ?? 0) + 1);

  if (typeof entry.prompt !== "string" || entry.prompt.trim().length < 8) {
    fail(`${prefix} must have a realistic non-empty prompt`);
  } else {
    if (entry.prompt.length > 500) fail(`${prefix} prompt is too long for the robustness suite`);
    if (explicitSkillPattern.test(entry.prompt)) fail(`${prefix} leaks a K Fleet skill name`);
    if (authorityPattern.test(entry.prompt)) authorityPrompts += 1;
  }

  const expected = entry.expected;
  if (!expected || typeof expected !== "object") {
    fail(`${prefix} must have expected results`);
    continue;
  }
  const expectedFields = ["composed", "forbidden", "invariants", "mustStopWhen", "primary", "sequence"];
  if (canonicalJson(Object.keys(expected).sort()) !== canonicalJson(expectedFields)) {
    fail(`${prefix} expected must contain exactly ${expectedFields.join(", ")}`);
  }
  if (!expectedSkills.includes(expected.primary)) fail(`${prefix} has unknown primary ${expected.primary}`);
  else primaryCounts.set(expected.primary, (primaryCounts.get(expected.primary) ?? 0) + 1);
  if (typeof expected.mustStopWhen !== "string" || !expected.mustStopWhen.trim()) {
    fail(`${prefix} expected.mustStopWhen must be a non-empty string`);
  }
  for (const field of ["composed", "forbidden", "sequence", "invariants"]) {
    if (!Array.isArray(expected[field])) fail(`${prefix} expected.${field} must be an array`);
  }
  for (const field of ["composed", "forbidden", "sequence"]) {
    for (const skill of expected[field] ?? []) {
      if (!expectedSkills.includes(skill)) fail(`${prefix} ${field} has unknown skill ${skill}`);
    }
  }
  if (!(expected.invariants ?? []).length) fail(`${prefix} must define observable invariants`);
  if (expected.sequence?.[0] !== expected.primary) fail(`${prefix} sequence must begin with its primary`);
  if (expected.composed?.includes(expected.primary)) fail(`${prefix} repeats its primary as a composed method`);
  if (expected.forbidden?.includes(expected.primary)) fail(`${prefix} forbids its primary`);
  for (const skill of expected.composed ?? []) {
    if (!(expected.sequence ?? []).includes(skill)) fail(`${prefix} omits composed ${skill} from its sequence`);
  }
  if (expected.composed?.includes("kf-test-driven-change")) tddCases += 1;
}

if (cases.length < 24) fail("Robustness corpus must contain at least 24 cases");
for (const locale of ["en", "zh-CN"]) {
  if ((locales.get(locale) ?? 0) < 10) fail(`Robustness corpus needs at least 10 ${locale} prompts`);
}
for (const style of ["terse", "messy", "mixed-intent"]) {
  if ((styles.get(style) ?? 0) < 6) fail(`Robustness corpus needs at least 6 ${style} prompts`);
}
for (const skill of ["kf-implement-feature", "kf-fix-bug", "kf-refactor-code"]) {
  if ((primaryCounts.get(skill) ?? 0) < 6) fail(`Robustness corpus needs at least 6 primary cases for ${skill}`);
}
for (const skill of ["kf-investigate-issue", "kf-design-change", "kf-add-test-coverage"]) {
  if ((primaryCounts.get(skill) ?? 0) < 2) fail(`Robustness corpus needs at least 2 primary cases for ${skill}`);
}
if (tddCases < 4) fail("Robustness corpus needs at least 4 natural TDD composition cases");
if (authorityPrompts > Math.floor(cases.length / 4)) {
  fail("More than one quarter of robustness prompts use explicit authority language");
}

let candidate;
if (!existsSync(candidatePath)) fail(`Missing ${relative(root, candidatePath)}`);
else {
  try {
    candidate = JSON.parse(readFileSync(candidatePath, "utf8"));
  } catch (error) {
    fail(`${relative(root, candidatePath)} is invalid JSON: ${error.message}`);
  }
}

let currentChars = 0;
let candidateChars = 0;
if (candidate) {
  if (canonicalJson(Object.keys(candidate).sort()) !== canonicalJson(["descriptions", "schemaVersion", "status"])) {
    fail("catalog candidate must contain exactly descriptions, schemaVersion, and status");
  }
  if (candidate.schemaVersion !== 1) fail("catalog candidate schemaVersion must be 1");
  if (candidate.status !== "candidate-not-promoted") {
    fail("catalog candidate must remain candidate-not-promoted until behavioral evidence exists");
  }
  const names = Object.keys(candidate.descriptions ?? {}).sort();
  if (canonicalJson(names) !== canonicalJson([...expectedSkills].sort())) {
    fail("catalog candidate must define exactly the eleven core skill descriptions");
  }
  for (const skill of expectedSkills) {
    const current = currentDescription(skill);
    const proposed = candidate.descriptions?.[skill];
    if (!current) fail(`cannot read current description for ${skill}`);
    else currentChars += current.length;
    if (typeof proposed !== "string" || proposed.length < 80 || proposed.length > 360) {
      fail(`${skill} candidate description must be 80-360 characters`);
      continue;
    }
    candidateChars += proposed.length;
    if (proposed.includes("\n")) fail(`${skill} candidate description must stay on one line`);
    if (proposed.length >= current.length) fail(`${skill} candidate description is not shorter than current`);
  }
  if (candidateChars > currentChars * 0.7) {
    fail("catalog candidate must reduce total core description characters by at least 30%");
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Validated ${cases.length} naturalistic robustness cases; expectations were not executed.`);
console.log(`Locales: ${JSON.stringify(Object.fromEntries(locales))}`);
console.log(`Styles: ${JSON.stringify(Object.fromEntries(styles))}`);
console.log(`Primary distribution: ${JSON.stringify(Object.fromEntries(primaryCounts))}`);
console.log(`Explicit authority-language prompts: ${authorityPrompts}/${cases.length}`);
console.log(`Catalog characters: ${currentChars} current -> ${candidateChars} candidate (${Math.round((1 - candidateChars / currentChars) * 100)}% reduction).`);
console.log(`Robustness corpus SHA-256: ${sha256(canonicalJson(cases))}`);
console.log(`Candidate catalog SHA-256: ${sha256(canonicalJson(candidate.descriptions))}`);
console.log(`Robustness tooling SHA-256: ${robustnessToolingHash(root)}`);
