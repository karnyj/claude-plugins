---
name: commit-message
description: Write a clear git commit message for the staged changes. Use when the user asks for a commit message, or asks to commit without giving one.
---

# Commit message

1. Run `git diff --staged` to see what is being committed. If nothing is staged, say so and stop.
2. Write a subject line in the imperative mood ("Add", "Fix", "Remove"), at most 72 characters, no trailing period.
3. If the change is not obvious from the subject, add a blank line and a short body explaining *why* the change was made, wrapped at 72 characters.
4. Follow any convention the repository already uses (check `git log --oneline -20`), such as Conventional Commits prefixes.
