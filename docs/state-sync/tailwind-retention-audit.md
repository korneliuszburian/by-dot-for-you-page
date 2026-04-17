# Tailwind Retention Audit

Generated from the repo state on `2026-04-17`.

## Decision

- Keep the current Tailwind 3 setup for now.
- Do not upgrade to Tailwind 4 in the current cleanup phase.
- Do not remove Tailwind yet, because it still carries part of the token bridge and a small set of live utility usage.
- Treat Tailwind as a shrinking compatibility layer, not as the target design-system foundation.

## What Tailwind Currently Does

- `src/css/global.css` imports:
  - `tailwindcss/base`
  - `tailwindcss/components`
  - `tailwindcss/utilities`
- `tailwind.config.mjs` converts design tokens into Tailwind config values and emits some CSS custom properties / utility helpers.
- `postcss.config.cjs` still runs `tailwindcss/nesting` and `tailwindcss`.

## Actual Usage Footprint

Tailwind-style utility classes are concentrated in a very small live surface area:

- `src/pages/shop.astro`
- `src/pages/shop/[slug].astro`
- `src/components/Logo3D.astro`

Examples include layout and loading helpers such as:

- `absolute`, `relative`, `flex`, `grid`, `inset-0`
- `w-8`, `h-8`, `z-10`
- `transition-opacity`, `duration-300`
- `border-2`, `rounded-full`, `animate-spin`

The rest of the repo already leans more heavily on component CSS, CUBE-style structure, and design-token files than on utility-first authoring.

## Interpretation

- Tailwind is not the primary design system here.
- It behaves more like a residual utility layer from the original boilerplate plus a token bridge.
- That means a Tailwind 4 migration would create tool churn before the repo has decided whether it even wants Tailwind long-term.

## Normalization Direction

- Freeze Tailwind on the current stable v3 line during cleanup.
- Avoid adding new Tailwind utility usage in new refactors.
- Migrate existing live utility usage into local component/page CSS as those surfaces are cleaned up.
- Only remove Tailwind after:
  - the remaining live utility classes are migrated
  - any token emission still needed from `tailwind.config.mjs` has a replacement
  - the build remains identical after removal
