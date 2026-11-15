// Checks the marketplace manifest and every local plugin it lists.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${path}: ${e.message}`);
    return null;
  }
}

function checkSkills(pluginName, dir) {
  const skillsDir = join(dir, "skills");
  if (!existsSync(skillsDir)) return;
  for (const s of readdirSync(skillsDir)) {
    if (!statSync(join(skillsDir, s)).isDirectory()) continue;
    const skillPath = join(skillsDir, s, "SKILL.md");
    if (!existsSync(skillPath)) {
      errors.push(`${pluginName}/skills/${s}: missing SKILL.md`);
      continue;
    }
    const fm = readFileSync(skillPath, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) errors.push(`${pluginName}/skills/${s}/SKILL.md: missing frontmatter`);
    else if (!/^description:\s*\S/m.test(fm[1]))
      errors.push(`${pluginName}/skills/${s}/SKILL.md: frontmatter needs a description`);
  }
}

const market = readJson(join(root, ".claude-plugin", "marketplace.json"));
if (market) {
  if (!market.name) errors.push("marketplace.json: missing name");
  if (!market.owner?.name) errors.push("marketplace.json: missing owner.name");
  if (!Array.isArray(market.plugins)) errors.push("marketplace.json: plugins must be an array");

  const seen = new Set();
  const listedDirs = new Set();
  for (const p of market.plugins ?? []) {
    const where = `marketplace.json plugin "${p.name}"`;
    if (!p.name || !NAME.test(p.name)) errors.push(`${where}: name must be lowercase-hyphenated`);
    if (seen.has(p.name)) errors.push(`${where}: duplicate name`);
    seen.add(p.name);
    if (!p.description) errors.push(`${where}: missing description`);
    if (typeof p.source !== "string") continue; // remote sources (github, git url) are not checked

    const dir = resolve(root, p.source);
    listedDirs.add(dir);
    if (!existsSync(dir)) {
      errors.push(`${where}: source ${p.source} does not exist`);
      continue;
    }
    const manifestPath = join(dir, ".claude-plugin", "plugin.json");
    if (!existsSync(manifestPath)) {
      errors.push(`${where}: missing ${p.source}/.claude-plugin/plugin.json`);
      continue;
    }
    const manifest = readJson(manifestPath);
    if (!manifest) continue;
    if (manifest.name !== p.name)
      errors.push(`${where}: plugin.json name "${manifest.name}" does not match`);
    if (p.version && manifest.version && p.version !== manifest.version)
      errors.push(`${where}: version ${p.version} differs from plugin.json ${manifest.version}`);
    checkSkills(p.name, dir);
  }

  const pluginsDir = join(root, "plugins");
  if (existsSync(pluginsDir)) {
    for (const d of readdirSync(pluginsDir)) {
      const full = resolve(pluginsDir, d);
      if (statSync(full).isDirectory() && !listedDirs.has(full))
        errors.push(`plugins/${d} is not listed in marketplace.json`);
    }
  }
}

if (errors.length) {
  console.error("Validation failed:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`OK: ${market.plugins.length} plugin(s) valid`);
