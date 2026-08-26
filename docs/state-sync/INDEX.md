# Project context index

Status: curated project context entrypoint
Updated: 2026-08-22

Read this file in full before planning, diagnosing, designing or implementing
work in this repository. It is the small routing layer for project knowledge.
Follow only the branch relevant to the task; do not preload every document in
docs/state-sync.

## Authority order

1. Source code, package scripts, dataset and the running local application.
2. The current documents listed below.
3. Historical working notes, only after their claims are re-verified.
4. Generated images are visual hypotheses, never implementation truth.

If a document conflicts with the repository or runtime, report the conflict
and prefer the current source/runtime evidence.

## Current source of truth

- [Current runtime audit](current-runtime-audit.md) — verified local build,
  routes, product counts, screenshots and known runtime risks.
- [Gothic 2 style lock](gothic2-style-lock.md) — current visual and commerce
  constraints. It defines the continuous 3D Gothic 2 reference, the dark
  non-sugary tone, the real-clothing-shop semantics and the BY DOT FOR YOU /
  DOT / YOU brand hierarchy.
- [Visual generation workflow](visual-generation-workflow.md) — when and how
  to use references and generated concepts; do not treat rejected concepts as
  style inputs.
- [Excalidraw recovery](excalidraw-recovery.md) — recovered board counts,
  image extraction, notes and design leads.
- The source Excalidraw board at the repository root and
  [contact sheet](excalidraw-contact-sheet.webp) preserve the recovered visual evidence
  without duplicating every embedded image as a separate file.

## Route by task

| Task branch | Read next |
| --- | --- |
| Runtime, routes, build or current UI state | current-runtime-audit.md, then source files under src/pages and src/components |
| Excalidraw, inspiration or lost assets | excalidraw-recovery.md and the extracted Excalidraw README |
| Visual direction or image generation | gothic2-style-lock.md and visual-generation-workflow.md; use only explicitly accepted references |
| Shared menu, frames, buttons or logo | src/components/MainMenu.astro, src/components/GothicFrame.astro, src/components/GothicButton.astro, src/components/Logo3D.astro, public/YOU_logo.png |
| Product/shop work | current-runtime-audit.md, public/dataset/output.json and src/utils/products-dataset.ts |
| Media paths or asset naming | assets-and-naming-audit.md, then verify against dist after build |
| Tokens and design-system contracts | design-system-audit.md, then verify current token/CSS files |
| Dependencies and upgrade planning | dependency-version-audit.md; re-run package checks because the note can age |
| Backlog, gaps or previous design decisions | excalidraw-gap-analysis.md, backlog-seed.md, cleanup-decisions.md |

## Generated directions

The folder generated-directions/ contains concept experiments. The accepted
master and any later accepted image must be named or linked explicitly before
being used as a reference. Unaccepted or rejected images remain history only.
The real product photos and public/YOU_logo.png are the preferred inputs for
store concepts.

## Historical or revalidation-required notes

These documents are useful context but are not current state by themselves:

- repo-map.md
- excalidraw-gap-analysis.md
- assets-and-naming-audit.md
- design-system-audit.md
- dependency-version-audit.md
- cleanup-decisions.md
- backlog-seed.md

The runtime audit supersedes older route/design-system claims where they
differ. Re-check all dependency, asset-path and implementation claims before
making a change based on them.

## Human entrypoint

For a compact human overview and local links, use [README.md](README.md).
For agent context, this INDEX.md is the required first read.
