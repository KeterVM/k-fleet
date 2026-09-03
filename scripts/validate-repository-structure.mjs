import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const coreSkills = ["kf-orchestrate-work"];
const expectedSkills = [...coreSkills];
const companionAgents = ["kf_reviewer"];
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
    if (entry.name === ".git" || entry.name === ".agents" || entry.name === "archive") return [];
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

function skillFolderHash(directory) {
  const hash = createHash("sha256");
  for (const path of regularFiles(directory).sort((a, b) =>
    relative(directory, a).localeCompare(relative(directory, b)))) {
    hash.update(relative(directory, path).split("\\").join("/"));
    hash.update(readFileSync(path));
  }
  return hash.digest("hex");
}

const skillRoot = join(root, "skills");
const actualSkills = readdirSync(skillRoot)
  .filter((name) => statSync(join(skillRoot, name)).isDirectory())
  .sort();

if (JSON.stringify(actualSkills) !== JSON.stringify(expectedSkills)) {
  fail(`Expected skills ${expectedSkills.join(", ")}; found ${actualSkills.join(", ")}`);
}

const readme = read(join(root, "README.md"));
const packageManifest = JSON.parse(read(join(root, "package.json")));
if (packageManifest.name !== "k-fleet") fail("package.json name must be k-fleet");
if (packageManifest.type !== "module") fail("package.json type must be module");
if (packageManifest.bin?.["k-fleet"] !== "scripts/kf-projects.mjs") {
  fail("package.json must expose scripts/kf-projects.mjs as the k-fleet executable");
}
for (const required of [
  ".codex/agents/kf-reviewer.toml",
  "scripts/kf-projects.mjs",
  "LICENSE",
  "NOTICE",
  "README.md",
]) {
  if (!packageManifest.files?.includes(required)) {
    fail(`package.json files must include ${required}`);
  }
}
for (const required of ["scripts/kf-projects.mjs", "scripts/kf-projects.test.mjs"]) {
  if (!existsSync(join(root, required))) fail(`Missing ${required}`);
  if (!readme.includes(required)) fail(`README.md does not document ${required}`);
}
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
for (const skill of expectedSkills) {
  const recordedHash = lock.skills?.[skill]?.computedHash;
  const actualHash = skillFolderHash(join(skillRoot, skill));
  if (recordedHash !== actualHash) {
    fail(`skills-lock.json has a stale computedHash for ${skill}; rerun bunx skills add`);
  }
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

const agentRoot = join(root, ".codex/agents");
const fixtureAgentRoot = join(root, "examples/fleet-ledger/.codex/agents");
const expectedAgentFiles = companionAgents.map((name) => `${name.replaceAll("_", "-")}.toml`).sort();
const actualAgentFiles = existsSync(agentRoot)
  ? readdirSync(agentRoot).filter((name) => name.endsWith(".toml")).sort()
  : [];
const actualFixtureAgentFiles = existsSync(fixtureAgentRoot)
  ? readdirSync(fixtureAgentRoot).filter((name) => name.endsWith(".toml")).sort()
  : [];
if (JSON.stringify(actualAgentFiles) !== JSON.stringify(expectedAgentFiles)) {
  fail(`Expected companion agents ${expectedAgentFiles.join(", ")}; found ${actualAgentFiles.join(", ")}`);
}
if (JSON.stringify(actualFixtureAgentFiles) !== JSON.stringify(expectedAgentFiles)) {
  fail(`Expected fixture companion agents ${expectedAgentFiles.join(", ")}; found ${actualFixtureAgentFiles.join(", ")}`);
}

function companionAgentToml(content, path) {
  const requiredFields = ["name", "description", "sandbox_mode", "developer_instructions"];
  const instructionMarker = 'developer_instructions = """';
  const instructionIndex = content.indexOf(instructionMarker);
  const assignmentScope = instructionIndex >= 0
    ? `${content.slice(0, instructionIndex)}developer_instructions =`
    : content;
  const assignments = [...assignmentScope.matchAll(/^([A-Za-z_][A-Za-z0-9_]*)\s*=/gm)]
    .map((match) => match[1]);
  for (const field of requiredFields) {
    const count = assignments.filter((candidate) => candidate === field).length;
    if (count !== 1) fail(`${relative(root, path)} must assign ${field} exactly once`);
  }
  for (const field of assignments) {
    if (!requiredFields.includes(field)) fail(`${relative(root, path)} has unsupported field ${field}`);
  }
  if ((content.match(/"""/g) ?? []).length !== 2) {
    fail(`${relative(root, path)} must have exactly one multiline TOML string`);
  }
  if (!/^name = "[^"\r\n]+"\ndescription = "[^"\r\n]+"\nsandbox_mode = "read-only"\ndeveloper_instructions = """\n[\s\S]+\n"""\n?$/.test(content)) {
    fail(`${relative(root, path)} must use the canonical companion-agent TOML shape`);
  }
  return {
    name: content.match(/^name = "([^"\r\n]+)"$/m)?.[1],
    description: content.match(/^description = "([^"\r\n]+)"$/m)?.[1],
    sandboxMode: content.match(/^sandbox_mode = "([^"\r\n]+)"$/m)?.[1],
  };
}

for (const [index, file] of expectedAgentFiles.entries()) {
  const sourcePath = join(agentRoot, file);
  const fixturePath = join(fixtureAgentRoot, file);
  if (!existsSync(sourcePath)) {
    fail(`Missing ${relative(root, sourcePath)}`);
    continue;
  }

  const content = read(sourcePath);
  const expectedName = companionAgents[index];
  const parsed = companionAgentToml(content, sourcePath);
  if (parsed.name !== expectedName) {
    fail(`${relative(root, sourcePath)} name must be ${expectedName}`);
  }
  if (!parsed.description) {
    fail(`${relative(root, sourcePath)} must have a description`);
  }
  if (parsed.sandboxMode !== "read-only") {
    fail(`${relative(root, sourcePath)} must remain read-only`);
  }
  if (!readme.includes(`\`${expectedName}\``)) {
    fail(`README.md does not document companion agent ${expectedName}`);
  }
  if (!existsSync(fixturePath)) {
    fail(`Fixture is missing ${relative(root, fixturePath)}`);
  } else if (content !== read(fixturePath)) {
    fail(`Fixture companion agent is stale for ${file}`);
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
  `Validated packaging and repository structure for ${coreSkills.length} K Fleet orchestrator skill and ${companionAgents.length} companion agent.`,
);
