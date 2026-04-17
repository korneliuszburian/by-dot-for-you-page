# Excalidraw Gap Analysis

Source: `docs/excalidraw-extract/bez-tytulu-2026-04-17-1004/`

This file classifies only themes that are visible in the extracted Excalidraw context.

## Built

- Homepage / menu shell: `/` renders `MainMenu` inside the shared `Layout`, with the framed menu, rotating 3D logo, and the core navigation surface shown in the board.
- Shop listing: `/shop` is live and covers the item-grid theme from the board with availability and category filtering, product cards, and links into detail pages.
- Product detail: `/shop/[slug]` is live and covers the item detail theme from the board with hero imagery, thumbnails, measurements, fabric data, and a contact CTA.

## Partial

- Lookbook: the board calls for a brand-photo / lookbook surface, but `/lookbook` is currently only a stub shell.
- Photos: the board calls for an artistic photo stream, but `/photos` is currently only a stub shell.
- Collections flow: the board mentions `Nowa Kolekcja` and `Wczytaj Kolekcje`, but `/collections` is only a stub and the load-collection flow is not implemented.
- Product presentation details: the board references photo preview, item info, and a generated size-chart treatment; the live detail page covers the theme, but the exact visual treatment is not aligned from the audited docs alone.

## Missing

- `For You` / movement section: the board describes a separate narrative or cutscene-style section, and there is no active route or implementation for it.
- A dedicated lookbook layout: the board implies a true gallery composition, not just a placeholder page.
- A dedicated photos layout: the board implies a flowing image-led section, not just a placeholder page.
- A collection browser / portfolio surface: the board describes a collection-like archive for past items, and the current `/collections` route does not provide it.
- A published design-system page: `/design-system` exists, but the audited route is blank.

## Needs Decisions

- Route and label mapping: whether the board names should stay as `Shop`, `Items`, `Lookbook`, `Photos`, and `Collections`, or be consolidated against the current `/shop`-first implementation.
- Collection intent: whether `Nowa Kolekcja` remains disabled, and what `Wczytaj Kolekcje` is supposed to load when it becomes active.
- Visual direction: whether the portal / void-like treatment around the logo is required for the homepage shell, or remains an optional enhancement.
- Content hierarchy: whether the board’s emphasis should stay on the shop/product core first, or shift weight toward lookbook and photo-led surfaces after the core is stable.
