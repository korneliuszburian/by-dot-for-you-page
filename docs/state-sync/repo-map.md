# Repo Map

## Active Production Surfaces

- `/` from `src/pages/index.astro`
  - Renders `MainMenu` inside `Layout`.
  - This is the current visual reference surface for the site.
- `/shop` from `src/pages/shop.astro`
  - Active commerce listing surface.
  - Reads product data from `public/dataset/output.json`.
- `/shop/[slug]` from `src/pages/shop/[slug].astro`
  - Active commerce detail surface.
  - Generates static product routes from `public/dataset/output.json`.

## Placeholder Routes

- `/items` from `src/pages/items.astro`
- `/lookbook` from `src/pages/lookbook.astro`
- `/photos` from `src/pages/photos.astro`
- `/collections` from `src/pages/collections.astro`
- `/design-system` from `src/pages/design-system.astro`

These routes exist in the route inventory, but they are not active commerce surfaces.

## Shared Shell

- `src/layouts/Layout.astro`
  - Shared page shell for the site.
  - Injects global CSS and `ClientRouter`.
  - Renders the full-page background video on every route.
  - Defines shared product transition keyframes.
- Shared visual components used across live surfaces:
  - `src/components/MainMenu.astro`
  - `src/components/Logo3D.astro`
  - `src/components/GothicButton.astro`
  - `src/components/GothicFrame.astro`

## Data Sources

- Active input for static commerce page generation:
  - `public/dataset/output.json`
  - Imported when building `/shop` and `/shop/[slug]`
- Shared asset source locations used by the shell and menu:
  - `assets/videos/...`
  - `assets/graphics/...`

## Parallel / Inactive Runtime Systems

- Astro content collections are defined in `src/content/config.ts`.
- `src/utils/products-content.ts` is built around `astro:content` helpers.
- These collection-based utilities exist in parallel, but they are not the active runtime path for the commerce views.

## Current Routing Notes

- `MainMenu` is the homepage navigation surface and visual reference point.
- Menu targets currently include `/collections`, `/shop`, `/items`, `/lookbook`, and `/photos`.
- `NOWA KOLEKCJA` is present in the menu but disabled.
- The live commerce path is `Home -> /shop -> /shop/[slug]`.
