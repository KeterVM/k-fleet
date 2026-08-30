import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const coreSkills = [
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
const feedbackSkills = ["kf-report-skill-usage"];
const expectedSkills = [...coreSkills, ...feedbackSkills].sort();
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

function regularFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return regularFiles(path);
    return [path];
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
  fail("skills-lock.json does not contain exactly the expected source skills");
}

const installedSkillRoot = join(root, "examples/fleet-ledger/.agents/skills");
if (existsSync(installedSkillRoot)) {
  for (const skill of expectedSkills) {
    const sourceDirectory = join(skillRoot, skill);
    const installedDirectory = join(installedSkillRoot, skill);
    if (!existsSync(installedDirectory)) {
      fail(`Installed example is missing ${relative(root, installedDirectory)}`);
      continue;
    }

    const sourceFiles = regularFiles(sourceDirectory)
      .map((path) => relative(sourceDirectory, path))
      .sort();
    const installedFiles = regularFiles(installedDirectory)
      .map((path) => relative(installedDirectory, path))
      .sort();
    if (JSON.stringify(sourceFiles) !== JSON.stringify(installedFiles)) {
      fail(`Installed example has a stale file inventory for ${skill}; rerun bunx skills add`);
      continue;
    }
    for (const file of sourceFiles) {
      if (read(join(sourceDirectory, file)) !== read(join(installedDirectory, file))) {
        fail(`Installed example is stale for ${skill}/${file}; rerun bunx skills add`);
      }
    }
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

console.log(
  `Validated packaging and repository structure for ${coreSkills.length} core K Fleet skills and ${feedbackSkills.length} feedback skill.`,
);
