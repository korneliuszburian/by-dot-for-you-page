# Cleanup Decisions

Generated from the repo state on `2026-04-17`.

## Runtime Data

- `public/dataset/output.json` stays the canonical runtime source for commerce.
- `src/content/products/*` stays in the repo, but as an incomplete parallel layer, not the active source of truth.
- Runtime commerce access is centralized in `src/utils/products-dataset.ts`.

Why:

- JSON-backed runtime already powers `/shop` and `/shop/[slug]`.
- The content collection is behind by `19` products.
- The content schema is not in parity with the live dataset shape.

## Content Migration Path

If the repo later wants to move to Astro content collections, the safe order is:

1. schema parity
2. importer/sync step from `output.json`
3. parity verification
4. shadow mode against live runtime output
5. cutover

No partial cutover should happen before those steps exist.

## Route Ownership

- `/shop` is the canonical product listing.
- `/items` is a legacy alias and redirects to `/shop`.
- `/collections` should become a collection loader/index surface, not a second shop grid.
- Preferred collection handoff: `/collections -> /shop?collection=<name>`.

This keeps one canonical product-list owner.

## Homepage Direction

- Homepage/menu remains the visual reference surface.
- It is not the first rebuild target.
- Portal / void-like logo treatment is optional shell language, not a mandatory system-wide pattern.

Other surfaces should harmonize with the homepage without copying its composition literally.

## Tailwind

- Tailwind stays temporarily on the current v3 line.
- No Tailwind 4 upgrade in the current cleanup phase.
- Tailwind is treated as a shrinking compatibility layer, not as the target design-system foundation.

Practical rule:

- do not add new Tailwind utility usage
- migrate remaining usage into local CSS during normal refactors
- only remove Tailwind after the live utility footprint reaches zero and token emission has a replacement
