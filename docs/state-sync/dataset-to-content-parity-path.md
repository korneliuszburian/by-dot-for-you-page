# Dataset-to-Content Parity Path

Generated from the repo state on `2026-04-17`.

## Goal

Define the safe path from `public/dataset/output.json` to Astro content collections without breaking the live commerce flow.

## Current Constraint

- Runtime commerce already depends on `public/dataset/output.json`.
- `src/content/products/*` is incomplete and currently behind by `19` products.
- The current content schema is not in parity with the runtime dataset.

## Required Phases

### 1. Schema Parity

Update `src/content/config.ts` so the content collection can represent the full runtime shape, including:

- `website_des` as a list
- `care_instruction`
- measurement fields used on PDP
- any additional runtime fields that are currently read from `output.json`

No route cutover should happen before schema parity exists.

### 2. Importer / Sync Step

Create a dedicated sync script that:

- reads `public/dataset/output.json`
- writes or updates `src/content/products/*.md`
- preserves stable slugs
- keeps image references normalized consistently
- does not delete files silently

This should be explicit project tooling, not a one-off migration command.

### 3. Verification Layer

Before any cutover, add automated checks for:

- product-count parity
- slug parity
- field parity for every product
- image-path parity after normalization
- identical `getStaticPaths()` output for the commerce routes

### 4. Shadow Mode

Run the content layer in parallel first:

- keep runtime on `output.json`
- compare content-derived output against the live JSON-derived output
- fix mismatches until the diff is empty

### 5. Cutover

Only after the previous phases pass:

- switch the shared runtime helper from JSON-backed data to content-backed data
- rebuild all commerce routes
- verify route output and PDP rendering stay unchanged

## Non-Goals For Now

- No deletion of `public/dataset/output.json`
- No deletion of `src/content/products/*`
- No partial cutover where listing and PDP read different sources

## Recommendation

Treat this as a future migration project, not as part of the current cleanup pass. The current cleanup should keep normalizing around the JSON-backed runtime while preserving the content layer for later parity work.
