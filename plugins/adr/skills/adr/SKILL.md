---
name: adr
description: Use when writing an ADR (decision record) — a new one, an amendment, one that supersedes another, or a project's first set. Holds the rules for writing ADRs and the fresh-context reviews every draft gets. Triggers — "write an ADR", "record this decision", "make this an ADR", "set up ADRs for this project", "amend ADR-…", "supersede ADR-…", "does this need an ADR".
---

# Writing ADRs

An ADR records a decision and the principle behind it. People and agents read it before they change
what it covers, so it has to stay true for as long as the decision stands, with nobody maintaining it.

## What earns an ADR

An architecture decision with a real trade-off.

What doesn't:

- **A bug fix.** If the fix negates something an existing ADR says, see "Amending or superseding".
- **A list.** An ADR is about a concept, not a comprehensive list. It says what kind of thing belongs
  and why, with a few examples of the kind, never the full set of members.
- **A user story.** What the product does for a person: what they can do, what they get, and when.
  That is a product requirement, not architecture.
- **A UI/UX decision.** What a person sees and how they move through it: layout, wording, which
  control, the order of steps.

Product decisions can be changed at any time; an ADR would lock them in. To tell them apart: if the
alternatives are other things the product could do or show, not other ways to build it, it is a
product decision. When an architecture decision sits underneath a user story or a UI/UX request,
that decision alone can be the ADR. The product behaviour may appear in its Context as what called
for the decision; the ADR never decides or requires it.

## Writing rules

1. **The decision and the principle.** Not a how-to guide, a report or an essay. No narration, no
   fluff.
2. **Evergreen.** It stays true as the project grows and the code moves:
   - no code locations or line numbers anywhere, evidence lists included;
   - no counts, sizes, values of constants, lists of members or current defaults that go stale;
   - no "today" or "currently".

   Evergreen does not mean nameless. Name the class, method, field, command or document; leave out
   its path and line numbers. "The project's development guide" in place of `DEVELOPMENT.md` makes
   the reader guess.
3. **It stands on its own.** It does not point at other ADRs and has no "Related" list. The one
   exception is a direct relation, such as the ADR it supersedes. If it needs a fact that another
   ADR holds, it states the fact itself.
4. **It is not an audit log.** It states the rule, not the story of how the rule was reached:
   - no record of who said, asked or decided what, or when. A ruling of the user's is written as the
     rule itself, never as a quote of the user;
   - no stories of tickets or agent runs, no ticket lists, pending branches or PRs, commit dates or
     authors;
   - no notes on how the ADR was researched or the set was built.

   The dates in the Status line and in an amendment's heading are part of the format, not history.
5. **It is about this project alone.** No comparisons to other projects.
6. **It says exactly what was decided, at the strength it was decided.** Something ruled acceptable
   stays acceptable and does not become a requirement or a constraint. Something said tentatively
   is left out, or asked about, never recorded as decided. A flat ruling is written flat, with no
   caveat taken from the state of one machine or one case.
7. **No jargon or invented abstractions.** Use this project's names for things, and the user's. A
   generic word like "seam", "surface", "shape" or "escape valve" standing in for something that has
   a name is wrong.
8. **Nothing is invented.** No reason the sources don't give: where none is recorded, the ADR gives
   none. No imagined case written as a real one, no inference written as fact. When something
   unknown blocks a draft, ask the user.

## Amending or superseding

An ADR is not maintained to keep up with changes. When work touches what an ADR says:

- **It negates nothing the ADR says:** don't change the ADR at all.
- **It negates part of it:** append a small amendment at the end. The amendment only adds: nothing
  above it is edited, the Status line included. Where it overrides a statement above, it says which.
  It follows the same writing rules as the ADR.
- **It seriously reverses the decision:** write a new ADR that supersedes the old one. The new ADR
  names the one it supersedes. The old one's Status becomes `Superseded by ADR-NNNN`, as Nygard format
  has it; nothing else in it changes.

## Format

ADRs live in `docs/adr/`, one file per ADR, named `NNNN-<the-decision-in-a-few-words>.md` with the
next free number. They use Nygard format:

```markdown
# ADR-NNNN: <the decision, as one sentence>

## Status

Accepted (YYYY-MM-DD).

## Context

## Decision

## Consequences

**Easier:**

**Harder:**

## Alternatives considered

- **<the alternative>.** Not chosen: <why, as the sources give it>.
```

Each section holds only what the sources give. Leave out "Alternatives considered" when there are
none. An amendment is appended as `## Amendment (YYYY-MM-DD): <what it changes>`.

## The index

The project's `CLAUDE.md`, or its `AGENTS.md` where the project uses that instead, lists every ADR
that stands, one line each: the file name and what the ADR is about. The line names the subject, so a
reader can tell whether this is the ADR to open before the change they are about to make. It is an
index, not a summary: the file name already states the decision in a few words, and the ADR holds the
rest. For example:

```markdown
- `0003-each-tenant-gets-its-own-database-schema.md` — how one customer's data is kept apart from another's.
- `0007-background-work-runs-on-the-job-queue.md` — where work that happens outside a request runs.
- `0012-the-search-index-is-rebuilt-from-the-database.md` — where search data comes from and which copy is the source of truth.
```

A line never holds:

- what was decided: its terms, exceptions, lists or reasons;
- status, amendments, dates, "for now", open questions, or anything that happened to the ADR.

A line is written once. An amendment leaves it alone unless the amendment changes what the ADR is
about, and even then the line says only the new subject, never what the amendment says. When an ADR is
superseded, the new ADR's line takes the place of the old one's.

The index also says to read the relevant ADR before planning or changing what it covers.

No `@` on the entries. ADRs are read when relevant, not always on: always-on context must be concise
and always relevant, and full ADRs are not.

## Process

**A project's first set.** Get oriented, then suggest the candidate ADRs, leaving out anything
"What earns an ADR" excludes, and let the user choose, merge or drop them before drafting. In a new
project, `CLAUDE.md` (or `AGENTS.md`) and the ADRs come first, before other work. Once the set is
written, a fresh-context subagent reads the project and says what it understood; check that against
what the user said: it understood everything and didn't diverge.

**Each ADR or amendment:**

1. Check that it earns an ADR, or, for an amendment, that what it adds would: see "What earns an
   ADR". Being asked for an ADR doesn't make something one. If it's a user story, a UI/UX decision,
   a bug fix or a list, say so and don't write it.
2. Gather the sources: the code, the docs, and the user's own words. Ask the user about anything
   unknown that blocks the draft. If the ADR can't be written without inventing something, don't
   write it: ask the user.
3. Draft it. For a new ADR, also draft its index line, following "The index".
4. Review it with fresh-context subagents, one concern per subagent, on Sonnet:
   - **correctness against the sources:** every claim checked against the code and the user's words;
   - **these rules.**

   A subagent doesn't have this skill loaded: give it the draft's path, the draft index line, the
   path of this file, and the sources. Give the correctness reviewer the user's statements verbatim,
   so a rule that came from the user isn't flagged as unsourced.
5. Judge every finding yourself. Don't obey a review blindly. Reject a suggestion that replaces the
   user's own words, or that reopens something the user ruled.
6. A new ADR: add its line to the index. An amendment: leave the index alone, unless the amendment
   changes what the ADR is about.
