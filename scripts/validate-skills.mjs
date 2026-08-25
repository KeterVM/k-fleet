import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const expectedSkills = [
  "kf-add-test-coverage",
  "kf-delegate-specialist",
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
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.name === ".git" || entry.name === ".agents") return [];
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

const skillRoot = join(root, "skills");
const actualSkills = readdirSync(skillRoot)
  .filter((name) => statSync(join(skillRoot, name)).isDirectory())
  .sort();

if (JSON.stringify(actualSkills) !== JSON.stringify(expectedSkills)) {
  fail(`Expected skills ${expectedSkills.join(", ")}; found ${actualSkills.join(", ")}`);
}

const readme = read(join(root, "README.md"));
for (const skill of expectedSkills) {
  const path = join(skillRoot, skill, "SKILL.md");
  if (!existsSync(path)) {
    fail(`Missing ${relative(root, path)}`);
    continue;
  }

  const content = read(path);
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail(`${relative(root, path)} has invalid frontmatter`);
    continue;
  }

  const fields = Object.fromEntries(
    frontmatter[1].split("\n").map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
  const keys = Object.keys(fields).sort();
  if (JSON.stringify(keys) !== JSON.stringify(["description", "name"])) {
    fail(`${relative(root, path)} frontmatter must contain only name and description`);
  }
  if (fields.name !== skill) fail(`${relative(root, path)} name must match its directory`);
  if (!fields.description) fail(`${relative(root, path)} must have a description`);
  if (!readme.includes(`\`${skill}\``)) fail(`README.md does not document ${skill}`);
}

const lock = JSON.parse(read(join(root, "examples/fleet-ledger/skills-lock.json")));
const lockedSkills = Object.keys(lock.skills ?? {}).sort();
if (JSON.stringify(lockedSkills) !== JSON.stringify(expectedSkills)) {
  fail(`skills-lock.json does not contain exactly the expected source skills`);
}

const installedSkillRoot = join(root, "examples/fleet-ledger/.agents/skills");
if (existsSync(installedSkillRoot)) {
  for (const skill of expectedSkills) {
    const sourcePath = join(skillRoot, skill, "SKILL.md");
    const installedPath = join(installedSkillRoot, skill, "SKILL.md");
    if (!existsSync(installedPath)) {
      fail(`Installed example is missing ${relative(root, installedPath)}`);
      continue;
    }
    if (read(sourcePath) !== read(installedPath)) {
      fail(`Installed example is stale for ${skill}; rerun bunx skills add`);
    }
  }
}

const evalPath = join(root, "evals/harness-routing.jsonl");
if (!existsSync(evalPath)) {
  fail(`Missing ${relative(root, evalPath)}`);
} else {
  const evalCases = [];
  const ids = new Set();
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

  const modes = new Set(evalCases.map((entry) => entry.mode));
  for (const mode of ["routing", "composition", "sequence", "handoff", "learning", "delegation"]) {
    if (!modes.has(mode)) fail(`Harness evals do not cover ${mode}`);
  }
  const primarySkills = new Set(evalCases.map((entry) => entry.expected?.primary));
  for (const skill of expectedSkills.filter((skill) => skill !== "kf-test-driven-change")) {
    if (!primarySkills.has(skill)) fail(`Harness evals do not route a primary case to ${skill}`);
  }
  if (!evalCases.some((entry) => entry.expected?.composed?.includes("kf-test-driven-change"))) {
    fail("Harness evals do not cover TDD composition");
  }
  if (!evalCases.some((entry) => {
    const sequence = entry.expected?.sequence ?? [];
    return sequence.length >= 3
      && sequence[0] === "kf-verify-change"
      && sequence.at(-1) === "kf-verify-change";
  })) {
    fail("Harness evals do not cover correction followed by re-verification");
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
  if (!evalCases.some((entry) => JSON.stringify(entry.expected?.sequence) === JSON.stringify([
    "kf-design-change",
    "kf-implement-feature",
    "kf-verify-change",
    "kf-fix-bug",
    "kf-verify-change",
    "kf-learn-from-evidence",
  ]))) {
    fail("Harness evals do not cover the full design-to-learning closure sequence");
  }
}

const placeholderPattern = /\b(?:TODO|TBD|PLACEHOLDER)\b|\[insert\b/i;
for (const path of markdownFiles(root)) {
  const content = read(path);
  if (placeholderPattern.test(content)) fail(`${relative(root, path)} contains a placeholder`);

  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].split("#", 1)[0];
    if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
    const resolved = resolve(dirname(path), decodeURIComponent(target));
    if (!existsSync(resolved)) {
      fail(`${relative(root, path)} links to missing ${target}`);
    }
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Validated ${expectedSkills.length} K Fleet skills and repository documentation.`);
