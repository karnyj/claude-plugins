# adr

Writes ADRs (architecture decision records) in Nygard format under `docs/adr/`, and keeps the ADR
index in the project's `CLAUDE.md` or `AGENTS.md`.

| Skill | What it does |
|---|---|
| `adr` | Decides whether something earns an ADR, drafts it under the writing rules, amends or supersedes existing ADRs, and reviews every draft with fresh-context subagents |

## Install

```
/plugin marketplace add karnyj/claude-plugins
/plugin install adr@yonatan-plugins
```
