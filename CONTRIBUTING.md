# Contributing

Anyone can add a plugin or improve an existing one by opening a pull request.

## Add a new plugin

1. Fork this repo and create a branch.
2. Copy `plugins/example-skills` to `plugins/<your-plugin-name>` (lowercase, hyphens).
3. Edit `plugins/<your-plugin-name>/.claude-plugin/plugin.json`: set `name` (must match the folder), `description`, `version` and `author`.
4. Add your content:
   - **Skill:** `skills/<skill-name>/SKILL.md` with `name` and `description` frontmatter. The description decides when Claude uses the skill, so say what it does and when to use it.
   - **Slash command:** `commands/<command>.md`
   - **Subagent:** `agents/<agent>.md`
   - **Hooks:** `hooks/hooks.json`
   - **MCP servers:** `.mcp.json`
5. Add an entry to `plugins` in `.claude-plugin/marketplace.json`:
   ```json
   {
     "name": "your-plugin-name",
     "source": "./plugins/your-plugin-name",
     "description": "One line on what it does",
     "version": "1.0.0",
     "author": { "name": "Your Name" }
   }
   ```
6. Add a row to the Plugins table in `README.md`.
7. Test locally, then open a PR.

## Test locally

From a clone of your fork:

```bash
node scripts/validate.mjs
```

```bash
claude plugin validate .
```

Then in Claude Code:

```
/plugin marketplace add ./path/to/your/clone
/plugin install your-plugin-name@yonatan-plugins
```

CI runs `node scripts/validate.mjs` on every PR.

## Changing an existing plugin

Bump its `version` in both `plugin.json` and `marketplace.json` so users get the update.

## Rules

- No secrets, API keys or personal data.
- Hooks and MCP servers run code on users' machines: keep them small and readable, and explain in the PR what they execute.
- One plugin per PR where possible.
