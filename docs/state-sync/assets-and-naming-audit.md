# Assets and Naming Audit

## Folder Reality

- `assets/` is the source asset tree.
- `public/` is the shipped public asset tree; files here are copied to the site root in `dist/`.
- `dist/` is the build output and shows what the browser actually receives.
- Current source inventory shows both media and graphics under `assets/`, including:
  - `assets/videos/testing-video-02.mp4`
  - `assets/videos/testing-video-poster-02.png`
  - `assets/graphics/frame/frame-01.png`
  - `assets/graphics/buttons/Button 1/...`
- Current public inventory shows shipped root assets under `public/`, including:
  - `public/dataset/output.json`
  - `public/dataset/database/...`
  - `public/logo-3d.glb`
  - `public/glass-like-logo-1.glb`
  - `public/placeholder.webp`

## Runtime Risks

- `src/layouts/Layout.astro`, `src/components/MainMenu.astro`, and `src/pages/shop/[slug].astro` all emit HTML with absolute `/assets/videos/testing-video-02.mp4` and `/assets/videos/testing-video-poster-02.png` references.
- `dist/` does not contain `/assets/videos/testing-video-02.mp4`; the built HTML still points at that path.
- Build output is not uniform: button graphics and the poster image are emitted through the asset pipeline into hashed `dist/_astro/...` files, while the frame asset still appears in generated HTML as `/assets/graphics/frame/frame-01.png`.
- This creates a runtime split: CSS-backed assets resolve through the build pipeline, while the video/poster URLs depend on a real `/assets/...` runtime path.

## Naming Problems

- `assets/graphics/buttons/` mixes folder styles:
  - `Button 1`, `Button 2`, `Button 3`, `Button 4`, `Button 5`, `Button 6`
  - `Button - Template.png`
  - nested `source/` files with `ChatGPT Image ...` names
- `assets/graphics/frame/` and `assets/graphics/frames/` both exist, which splits similar frame artwork across two folder names.
- Frame files mix casing and separators:
  - `frame-01.png`
  - `frame-02.png`
  - `frame-03.png`
  - `frame-04.png`
  - `Frame-1.png`
  - `Frame-2.png`
  - `Frame-3.png`
  - `frame-07.png`
- Video files also mix naming styles:
  - `testing-video.mp4`
  - `testing-video-01.mp4`
  - `testing-video-02.mp4`
  - `testing-video-poster.png`
  - `testing-video-poster-01.png`
  - `testing-video-poster-02.png`
  - `well_but_our_brand_name_is_BY.mp4`
- Route naming is mixed across the app:
  - source file names use English route slugs such as `shop`, `lookbook`, `photos`, `collections`, `design-system`
  - menu labels are Polish, including `WCZYTAJ KOLEKCJE`, `PRZEDMIOTY`, and `ZDJĘCIA`
  - `MainMenu` points to `/items`, while the primary commerce listing is `/shop`

## Normalization Direction

- Keep `assets/`, `public/`, and `dist/` separate in the documentation and in future work.
- Normalize naming in place before any file moves:
  - choose one convention for frames, buttons, and video/poster names
  - remove folder duplication between `frame/` and `frames/`
  - align route labels, route paths, and component names where they describe the same surface
- Treat the `/assets/videos/...` HTML references as a runtime asset-path problem to resolve in a later implementation pass, not in this audit.
