# Audyt aktualnego stanu strony

Data audytu: 2026-08-22  
Środowisko: lokalny Astro dev server w WSL, http://localhost:4321/

## Weryfikacja

- npm run build — zaliczone.
- Astro check: 36 plików, 0 błędów, 0 ostrzeżeń, 0 hintów.
- Build statyczny: 53 strony, w tym 46 stron szczegółów produktów.
- HTTP smoke test: /, /shop, /items, /lookbook, /photos, /collections i
  /design-system zwracają 200.
- Dataset: 46 rekordów produktów.
- Sklep po przewinięciu całej strony załadował 46/46 obrazów.

## Widoki

| Trasa | Stan teraz | Co faktycznie działa |
| --- | --- | --- |
| / | aktywny shell | Menu główne, globalne tło wideo i wejście do sekcji |
| /shop | aktywny | Grid 46 produktów, filtry dostępności/kategorii/kolekcji |
| /shop/[slug] | aktywny | 46 stron szczegółowych, galeria, dane produktu i stan sprzedaży |
| /items | alias | Meta refresh i canonical do /shop, noindex |
| /collections | aktywny loader | Lista kolekcji z przejściem do filtrowanego /shop |
| /lookbook | shell | Układ i tło, brak właściwej zawartości lookbooka |
| /photos | shell | Układ i tło, brak właściwego strumienia zdjęć |
| /design-system | aktywny | Komponenty, tokeny i decyzje systemowe |

## Dane sklepu

- 19 produktów jest dostępnych, 27 niedostępnych.
- Kategorie: PANTS — 45, BAG — 1.
- Kolekcje: ANARCHY — 11, OG — 12, ONE PEACE — 6, RUSTY OIL — 15,
  SANDY OIL — 2.
- Przykładowy sprawdzony detail:
  /shop/one-peace-pants-1 — One Peace Pants, rozmiar L, 100% Cotton,
  1 of 1, 250 ZŁ, SOLD OUT.

## Zrzuty stanu

- [Home — desktop](screenshots/current-site/home-desktop.png)
- [Home — mobile](screenshots/current-site/home-mobile.png)
- [Shop — desktop, po załadowaniu całego gridu](screenshots/current-site/shop-desktop.png)
- [Shop — mobile](screenshots/current-site/shop-mobile.png)
- [Product detail — desktop](screenshots/current-site/product-desktop.png)

Screenshoty są lokalnym dowodem renderu w dev runtime, nie dowodem wdrożenia
produkcyjnego.

## Obserwacje i ryzyka

- W headless Chrome WebGL nie tworzy kontekstu dla Three.js/llvmpipe, więc
  homepage pokazuje fallback tekstowy Failed to summon. To ograniczenie tego
  środowiska testowego; nie potwierdza awarii w zwykłej przeglądarce z WebGL.
- W devtools pojawił się pojedynczy request toolbaru Astro zakończony 504;
  nie był to błąd aplikacyjnej trasy.
- W wygenerowanym dist/ nie ma ścieżki dist/assets/videos/testing-video-02.mp4,
  ale istnieje odpowiadający jej asset z hashem w dist/_astro/. To wymaga
  osobnego sprawdzenia kontraktu ścieżek mediów przy deploymencie.
- /lookbook i /photos są największą luką względem odzyskanych inspiracji:
  board opisuje je jako osobne doświadczenia, a obecnie są tylko pustymi
  shellami.
- Istniejący docs/current-views-catalog.md jest starszym snapshotem i nie
  powinien być traktowany jako aktualny audyt; ten plik opisuje stan na
  2026-04-17.
