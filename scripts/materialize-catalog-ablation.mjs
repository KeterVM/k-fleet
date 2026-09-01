import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson, expectedSkills, skillSourceHash } from "./eval-corpus-support.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const variant = option("--variant");
const output = option("--output");

if (!new Set(["current", "candidate"]).has(variant) || !output) {
  console.error("Usage: node scripts/materialize-catalog-ablation.mjs --variant current|candidate --output <new-directory>");
  process.exit(1);
}

const destination = resolve(output);
const manifestPath = `${destination}.catalog-manifest.json`;
if (destination === root || destination.startsWith(`${join(root, "skills")}/`)) {
  console.error("Output must be an isolated directory outside the canonical skills tree.");
  process.exit(1);
}
if (existsSync(destination)) {
  console.error(`Output already exists: ${destination}`);
  process.exit(1);
}
if (existsSync(manifestPath)) {
  console.error(`Manifest already exists: ${manifestPath}`);
  process.exit(1);
}

const currentDescriptions = {};
for (const skill of expectedSkills) {
  const source = readFileSync(join(root, "skills", skill, "SKILL.md"), "utf8");
  currentDescriptions[skill] = source.match(/^description:\s*(.+)$/m)?.[1];
  if (!currentDescriptions[skill]) throw new Error(`Could not read current description for ${skill}`);
}
const candidate = JSON.parse(readFileSync(join(root, "evals/catalog-description-candidate.json"), "utf8"));
const descriptions = variant === "candidate" ? candidate.descriptions : currentDescriptions;
for (const skill of expectedSkills) {
  if (typeof descriptions?.[skill] !== "string" || descriptions[skill].includes("\n")) {
    throw new Error(`Invalid ${variant} description for ${skill}`);
  }
}

mkdirSync(destination, { recursive: true });
for (const skill of expectedSkills) {
  const sourceDirectory = join(root, "skills", skill);
  const targetDirectory = join(destination, skill);
  cpSync(sourceDirectory, targetDirectory, { recursive: true, errorOnExist: true });
  if (variant === "candidate") {
    const entryPath = join(targetDirectory, "SKILL.md");
    const source = readFileSync(entryPath, "utf8");
    const updated = source.replace(/^description:\s*.+$/m, `description: ${descriptions[skill]}`);
    if (updated === source) throw new Error(`Could not replace description for ${skill}`);
    writeFileSync(entryPath, updated);
  }
}

function treeHash(directory) {
  const hash = createHash("sha256");
  const visit = (current) => {
    for (const name of readdirSync(current).sort()) {
      const path = join(current, name);
      if (statSync(path).isDirectory()) visit(path);
      else {
        hash.update(`${relative(directory, path)}\0`);
        hash.update(readFileSync(path));
        hash.update("\0");
      }
    }
  };
  visit(directory);
  return hash.digest("hex");
}

const catalogHash = createHash("sha256").update(canonicalJson(descriptions)).digest("hex");
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
const manifest = {
  schemaVersion: 1,
  suite: "catalog-description-ablation-v1",
  variant,
  canonicalSkillSourceHash: skillSourceHash(root),
  catalogHash,
  toolingHash,
  materializedTreeHash: treeHash(destination),
  skills: expectedSkills,
};
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Materialized ${variant} catalog fixture with ${expectedSkills.length} skills at ${destination}`);
console.log(`Wrote maintainer manifest outside the fixture at ${manifestPath}`);
console.log(`Catalog SHA-256: ${catalogHash}`);
console.log(`Fixture tree SHA-256: ${manifest.materializedTreeHash}`);
