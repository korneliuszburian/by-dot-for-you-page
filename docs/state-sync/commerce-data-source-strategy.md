# Commerce Data Source Strategy

Generated from the repo state on `2026-04-17`.

## Decision

- Keep `public/dataset/output.json` as the canonical runtime source for commerce surfaces.
- Keep `src/content/products/*` and `src/utils/products-content.ts` in the repo for now, but treat them as an incomplete parallel layer, not the active source of truth.
- Do not remove the smaller content dataset during cleanup. It may represent an earlier migration attempt or editorial draft set.

## Evidence

- Active runtime pages already depend on `public/dataset/output.json`:
  - `src/pages/shop.astro`
  - `src/pages/shop/[slug].astro`
- The runtime dataset currently contains `46` products.
- The content collection currently contains `27` markdown entries, so it is missing `19` products relative to the live runtime dataset.
- The content schema in `src/content/config.ts` does not match the live dataset shape:
  - `website_des` is typed as `string` in content, but is an array in `output.json`
  - `care_instruction` and measurement fields used by the product detail page are not modeled in the content schema
- No generator, sync script, or migration pipeline exists to keep the content collection in parity with `output.json`.

## Current Normalization

- Runtime commerce access is now centralized in `src/utils/products-dataset.ts`.
- `shop` and `shop/[slug]` both consume that shared helper instead of importing `output.json` separately.
- This keeps the larger dataset canonical without deleting the partial content layer.

## Future Direction

- If the project later wants Astro content collections as the long-term source, first build a real importer/sync step that:
  - reaches full product parity
  - matches the live runtime schema
  - preserves image-path normalization
  - proves route output stays identical before cutover
- Until that exists, all commerce cleanup should assume `public/dataset/output.json` is the source of truth.
