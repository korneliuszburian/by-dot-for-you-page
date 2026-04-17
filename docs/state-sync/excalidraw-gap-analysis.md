# Excalidraw Gap Analysis

Source: `docs/excalidraw-extract/bez-tytulu-2026-04-17-1004/`

This file classifies only themes that are visible in the extracted Excalidraw context.

## Built

- Homepage / menu shell: `/` renders `MainMenu` inside the shared `Layout`, with the framed menu, rotating 3D logo, and the core navigation surface shown in the board.
- Shop listing: `/shop` is live and covers the item-grid theme from the board with availability and category filtering, product cards, and links into detail pages.
- Product detail: `/shop/[slug]` is live and covers the item detail theme from the board with hero imagery, thumbnails, measurements, fabric data, and a contact CTA.

## Partial

- `/items`: the board names `Przedmioty`, and the repo has a stub route, but the route is not implemented beyond the shared shell.
- Lookbook: the board calls for a brand-photo / lookbook surface, but `/lookbook` is currently only a stub shell.
- Photos: the board calls for an artistic photo stream, but `/photos` is currently only a stub shell.
- Collections flow: the board mentions `Nowa Kolekcja` and `Wczytaj Kolekcje`, but `/collections` is only a stub and the load-collection flow is not implemented.
- Product presentation details: the board references photo preview, item info, and a size-chart image treatment; the live product detail page does not show a dedicated size-chart graphic in the audited docs.

## Missing

- `For You` / movement section: the board describes a separate narrative or cutscene-style section, and there is no active route or implementation for it.
- An implemented design-system page or surface: `/design-system` exists locally, but the audited route is blank.

## Needs Decisions

- Route and label mapping: whether the board names should stay as `Shop`, `Items`, `Lookbook`, `Photos`, and `Collections`, or be consolidated against the current `/shop`-first implementation.
- Collection intent: whether `Nowa Kolekcja` remains disabled, and what `Wczytaj Kolekcje` is supposed to load when it becomes active.
- Visual direction: whether the portal / void-like treatment around the logo is required for the homepage shell, or remains an optional enhancement.
- Content hierarchy: whether the board’s emphasis should stay on the shop/product core first, or shift weight toward lookbook and photo-led surfaces after the core is stable.
