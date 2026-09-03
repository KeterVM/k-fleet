import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = join(root, "evals/orchestrator-routing.jsonl");
const routes = new Set([
  "setup",
  "design",
  "implementation",
  "bug-fix",
  "investigation",
  "refactor",
  "testing",
  "verification",
  "context",
  "feedback",
  "evolution",
]);
const methods = new Set(["tdd", "delegation"]);
const failures = [];
const cases = [];
const ids = new Set();

function fail(message) {
  failures.push(message);
}

if (!existsSync(corpusPath)) {
  fail(`Missing ${relative(root, corpusPath)}`);
} else {
  for (const [index, line] of readFileSync(corpusPath, "utf8").split("\n").entries()) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch (error) {
      fail(`${relative(root, corpusPath)}:${index + 1} is invalid JSON: ${error.message}`);
      continue;
    }
    cases.push(entry);
    const prefix = entry.id ?? `line ${index + 1}`;
    if (JSON.stringify(Object.keys(entry).sort()) !== JSON.stringify(["expected", "id", "prompt"])) {
      fail(`${prefix} must contain exactly expected, id, and prompt`);
    }
    if (typeof entry.id !== "string" || !entry.id) fail(`${prefix} must have an id`);
    else if (ids.has(entry.id)) fail(`${prefix} is duplicated`);
    else ids.add(entry.id);
    if (typeof entry.prompt !== "string" || entry.prompt.trim().length < 8) {
      fail(`${prefix} must have a realistic prompt`);
    }
    const expected = entry.expected;
    if (!expected || typeof expected !== "object") {
      fail(`${prefix} must have expected results`);
      continue;
    }
    const expectedKeys = ["invariants", "methods", "route", "sequence", "stopping"];
    if (JSON.stringify(Object.keys(expected).sort()) !== JSON.stringify(expectedKeys)) {
      fail(`${prefix} expected must contain exactly ${expectedKeys.join(", ")}`);
    }
    if (!routes.has(expected.route)) fail(`${prefix} has unknown route ${expected.route}`);
    if (!Array.isArray(expected.methods)) fail(`${prefix} expected.methods must be an array`);
    for (const method of expected.methods ?? []) {
      if (!methods.has(method)) fail(`${prefix} has unknown method ${method}`);
    }
    if (!Array.isArray(expected.sequence) || expected.sequence[0] !== expected.route) {
      fail(`${prefix} sequence must begin with its route`);
    }
    for (const route of expected.sequence ?? []) {
      if (!routes.has(route)) fail(`${prefix} sequence has unknown route ${route}`);
    }
    if (typeof expected.stopping !== "string" || !expected.stopping) {
      fail(`${prefix} must define stopping`);
    }
    if (!Array.isArray(expected.invariants) || !expected.invariants.length) {
      fail(`${prefix} must define observable invariants`);
    }
  }
}

if (cases.length < 24) fail("Orchestrator corpus must contain at least 24 cases");
for (const route of routes) {
  if (!cases.some((entry) => entry.expected?.route === route)) {
    fail(`Orchestrator corpus does not cover ${route}`);
  }
}
for (const method of methods) {
  if (!cases.some((entry) => entry.expected?.methods?.includes(method))) {
    fail(`Orchestrator corpus does not cover ${method}`);
  }
}
for (const id of [
  "setup-create-agents",
  "setup-preserve-agents",
  "setup-memory-not-ready",
  "memory-source-wins",
  "memory-cross-project-isolation",
  "memory-inference-not-policy",
  "memory-runtime-missing",
  "memory-terminal-episode",
  "route-evolution-auto-adopt",
  "route-evolution-gate-failure",
  "method-no-overlapping-writes",
  "method-no-low-value-ui-test",
  "bug-fix-cross-boundary-engineering",
]) {
  if (!ids.has(id)) fail(`Orchestrator corpus does not cover ${id}`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Linted ${cases.length} K Fleet orchestration cases; expectations were not executed.`);
console.log(`Routes: ${[...routes].join(", ")}`);
console.log(`Methods: ${[...methods].join(", ")}`);
