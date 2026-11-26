# cleanup-review

Reviews any text output before it ships (code and its comments, docs, PR and commit descriptions,
tickets, messages) for the residue of how it was made. A fresh-context subagent reads only the original
input and the output, never the plan, spec or working notes that produced it.

| Skill | What it does |
|---|---|
| `cleanup-review` | Flags orphaned terms, jargon where a thing's name belongs, stale text, ticket numbers and other pointers back to the source, author narration, restating, and leftovers from an abandoned approach, then gives a verdict. It reports and does not edit |

## Install

```
/plugin marketplace add karnyj/claude-plugins
/plugin install cleanup-review@yonatan-plugins
```
