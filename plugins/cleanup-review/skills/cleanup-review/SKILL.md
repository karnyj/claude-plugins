---
name: cleanup-review
description: Use to strip the residue of how a piece of text was made out of it before it ships — any text output, not only code: code and its comments, docs, PR and commit descriptions, tickets, messages. A fresh-context review of the output against ONLY its original input (the user's own words — in a conversation, only the user's messages — plus any source the user treats as verified from before the work began), hunting orphaned terms (names traceable only to a plan or an agent's working notes), jargon or abstraction used where the thing's real name belongs ("surface" for the checkout page), stale text, ticket numbers and other pointers back to the ticket or conversation the request came from, author narration, text that restates what is already there, and leftovers from an approach the output no longer takes. Triggers: "run the cleanup review", "cleanup review this". NOT a correctness, architecture, or spec-compliance review.
---

# Cleanup review

A **fresh-context** reviewer that reads *only the original input* + the output under review — **never**
what was produced on the way to the output: the plan, the spec, working notes, the agent's side of the
conversation that built it. That way stale vocabulary can't enter its context already legitimized as "something someone
asked for" (the whole point of the fresh context: the working material is where the stale references
were born). So it is always a new agent, never one that took part in making the output.

**The original input** is the user's own words, plus any source the user treats as verified that predates
the work — the ticket or document they handed over as the requirements. Nothing an agent produced along
the way counts, not even a plan or spec the user approved: it may have been generated from the input with
terms the user never read closely, and comparing against it would legitimize exactly what this review
hunts. When it isn't clear which sources predate the work, ask before running the review.

When the input is a conversation, it is only what the user said, verbatim, with every agent turn left out
— including the ones the user answered with "ok". The user asks for "a static page about space planes",
the agent shows a plan for a site about SSTOs, and the user says "ok". The reviewer gets the two user
messages and never the plan, so "SSTO" in the output traces to no source and can be flagged.

## What it hunts

- **Orphaned terms** — names and concepts in the output that trace only to the plan or an agent's working
  notes, with no grounding in the original input or in the real vocabulary of what the output belongs to
  (the codebase, the product, the reader's own terms). Build scaffolding vocabulary (slice / increment /
  track / chunk and any synonym) is always orphaned: it organizes the work of making the output and is
  never a concept of the thing itself, so it must not surface in shipped code, comments, docs, or
  PR/commit descriptions. Where the output needs a real name, it uses the domain's vocabulary or the
  original input's.
- **Jargon and abstraction where the name of the thing belongs** — a generic word standing in for
  something that already has a name: "surface" for the checkout page. If a thing has a name or a term, or
  can be accurately described in a few plain words, that is what the sentence, the comment or the
  identifier says. Distinct from an orphaned term: the word here is ordinary English — often the plan's
  own shorthand — and the defect is not that it's invented but that it hides a named thing and leaves the
  reader guessing which one is meant. The fix is the name. An umbrella word survives only where the output
  genuinely treats several named things uniformly *and* the domain already has a name for that grouping.
- **Stale text** — comments, docs or prose describing things that no longer exist (renamed, removed,
  restructured) and now only mislead the reader.
- **Ticket numbers and other pointers back to the source** — explicit references to where the
  requirements came from: a ticket number in a code comment, "per the spec", "as discussed", "as you
  asked". Drop the pointer; keep the prose if it's useful. A pointer stays only where the medium's own
  convention calls for it, such as a ticket number in a PR title or commit message.
- **Author narration** — text written for the context it was made in instead of for its reader: the author
  narrating its own work ("added/changed/moved this", "now uses X instead of Y", "kept for backwards
  compat with the old version" where nothing remembers an old version), checklisting what's done ("✓
  handles the empty case", "all three cases covered"), or pointing at things **not** done ("TODO in a
  later phase", "will be wired up when the backend lands", "out of scope for now").
- **Restating** — text that says again what is already plainly said where the reader is looking: a comment
  that paraphrases the code beneath it, a paragraph that repeats the one above it, carrying no reason or
  context of its own.
- **Leftovers from an abandoned path** — anything authored for an approach the output no longer takes: a
  schema or data migration, a config entry, a flag, a caveat or a section about an option that was
  dropped.

The narration and restating categories share one test: the reader the text is for, coming to it cold, with
no knowledge of how it was made. For a code comment or a doc, that reader comes months later. The text
must explain the thing **as it stands** — simply and concisely, in plain language: why it's this way,
what's non-obvious, the constraint or upstream quirk forcing it — never what is already said, never the
process that produced it. Deleting the text is usually the fix; rewrite it only when a real, durable *why*
is buried in it, and a genuine future-work note belongs in a ticket, not in the output. A PR description
or commit message is read by someone who needs to know what changed, so "adds X" is its content, not
narration; the story of how the change was reached still is.

## Running it

A fresh-context subagent on **Sonnet**, medium effort. One pass, no convergence loop.

Hand it the original input, the output under review (a diff, files, or the text itself), and the path of
this file, whose "What it hunts" section is its brief — nothing else. The user's own words go in verbatim:
a summary of them would be written in the very vocabulary under review. It reads the context the output
lives in freely — the surrounding codebase, the rest of the document, the project's docs — that's how an
invented term is told apart from a real domain one. That never extends to the working material that
produced the output, even where it sits in the same repo. It reports; it does not edit.

**Output:** severity-tagged findings, each with its location (`file:line`, or the quoted passage when the
text isn't in a file) and a concrete fix, and a verdict — `APPROVE` / `APPROVE-WITH-FIXES` /
`REQUEST-CHANGES`.

## The caller's part

Whoever ran the review adjudicates each finding for correctness. A *correct* finding is **not** optional polish — fix it, and
re-confirm before the output moves on.
