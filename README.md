# claude-plugins

My personal Claude Code plugin marketplace. It is not listed anywhere in Claude Code; only people who add this repo with `/plugin marketplace add` see it. Put skills, slash commands, agents, hooks and MCP servers here once, then install them in any project.

## Use it

In Claude Code (any project):

```
/plugin marketplace add karnyj/claude-plugins
/plugin install example-skills@yonatan-plugins
```

Or from a terminal:

```bash
claude plugin marketplace add karnyj/claude-plugins
```

To have a project offer these plugins to everyone who works in it, add this to that project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "yonatan-plugins": {
      "source": { "source": "github", "repo": "karnyj/claude-plugins" }
    }
  },
  "enabledPlugins": {
    "example-skills@yonatan-plugins": true
  }
}
```

Get updates with `/plugin marketplace update yonatan-plugins`.

## Layout

```
.claude-plugin/marketplace.json   # catalog of every plugin in this repo
plugins/
  <plugin-name>/
    .claude-plugin/plugin.json    # plugin manifest
    skills/<skill-name>/SKILL.md  # skills (optional)
    commands/*.md                 # slash commands (optional)
    agents/*.md                   # subagents (optional)
    hooks/hooks.json              # hooks (optional)
    .mcp.json                     # MCP servers (optional)
```

## Plugins

| Plugin | Description |
|---|---|
| [example-skills](plugins/example-skills) | Example plugin with a `commit-message` skill |
| [adr](plugins/adr) | Writes ADRs (architecture decision records) that stay true without upkeep, with fresh-context reviews of every draft |
| [cleanup-review](plugins/cleanup-review) | Reviews any text output for the residue of how it was made, with a fresh-context reviewer that sees only the original input |

## Add your own

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests from anyone are welcome.

## License

[MIT](LICENSE)
