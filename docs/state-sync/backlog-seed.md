# Backlog Seed

## Ready Now

- Clear the low-risk dependency drift already identified in the version audit: `@astrojs/check`, `@astrojs/partytown`, `@astrojs/sitemap`, `react`, `react-dom`, `slugify`, `prettier`, and `tailwindcss` patch/minor updates.
- Remove the unused Vite remote-pattern imports called out by the build warning.
- Reconcile the audited runtime asset-path split for the live shell and commerce surfaces once the target path is confirmed.

## Needs Design Decisions

- Decide whether the route labels and route slugs should stay mixed across `shop`, `items`, `lookbook`, `photos`, and `collections`, or be normalized to one naming scheme.
- Decide whether `NOWA KOLEKCJA` should remain disabled and what `Wczytaj Kolekcje` should mean when it becomes active.
- Decide whether the homepage portal or void-like logo treatment is required shell language or optional art direction.
- Decide whether `/design-system` should remain a blank placeholder or become a real reference surface.

## Needs Research or Verification

- Verify the deployed availability of `/assets/videos/testing-video-02.mp4` and `/assets/videos/testing-video-poster-02.png` before changing any references.
- Verify the safe upgrade path for the higher-risk dependency buckets: `astro`, `@astrojs/react`, `tailwindcss` 4, `postcss-nesting` 14, `typescript` 6, and `three` / `@types/three`.
- Verify whether the `baseline-browser-mapping` and Browserslist age warnings are actionable project inputs or environment noise.
- Verify whether the parallel `astro:content` utilities are still intentionally inactive before touching the commerce data path.
