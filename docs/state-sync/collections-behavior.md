# Collections Behavior

Generated from the repo state on `2026-04-17`.

## Decision

- Keep `/shop` as the canonical product listing surface.
- Define `/collections` as a collection loader/index surface, not as a second shop.
- Treat `Wczytaj Kolekcje` as “browse existing collections”.
- Keep `Nowa Kolekcja` disabled for now.

## Source Signals

- Excalidraw explicitly separates `Wczytaj Kolekcje` from `Przedmioty`.
- Excalidraw also says:
  - `Sklep/przedmioty to jest to samo wiec zostaje jeden guzik tylko`
  - `Nowa kolekcja jak i zdjecia narazie OFF`
- The live runtime dataset already contains a stable `collection` field.

Current collection counts in `public/dataset/output.json`:

- `Rusty Oil`: `15`
- `OG`: `12`
- `Anarchy`: `11`
- `One Peace`: `6`
- `Sandy Oil`: `2`

## Product Meaning

- `/collections` should show collection entries derived from the live dataset.
- Each entry should summarize:
  - collection name
  - product count
  - optional preview artwork later
- Selecting a collection should hand off into the canonical commerce listing, filtered to that collection.

## Routing Direction

- Keep `/collections` as the entry/index route.
- Do not create a parallel product grid there.
- Preferred handoff:
  - `/collections` -> `/shop?collection=<name>`
- This preserves one canonical product-listing owner: `/shop`.

## Non-Goals For Now

- No `Nowa Kolekcja` implementation yet
- No second independent listing UI under `/collections`
- No collection-detail storytelling route until the artistic direction is clearer

## Follow-Up Implementation

- Add collection filtering support to the shared shop listing.
- Implement `/collections` as a loader/index page that links into that filter state.
