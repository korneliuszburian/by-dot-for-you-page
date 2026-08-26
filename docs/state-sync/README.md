# BY DOT FOR YOU — state sync

To jest punkt startowy do dalszego planowania projektu. Zebrane są tu dwa
źródła prawdy:

1. odzyskane inspiracje i notatki z właściwego boarda Excalidraw,
2. aktualny, sprawdzony stan lokalnej strony.

Agentowy punkt wejścia: [INDEX.md](INDEX.md). Ten plik routuje dokumentację i
oznacza, które materiały są aktualne, warunkowe albo historyczne.

## Materiały

- [Odzyskane inspiracje z Excalidraw](excalidraw-recovery.md)
- [Audyt aktualnego runtime strony](current-runtime-audit.md)
- [Kontakt sheet inspiracji](excalidraw-contact-sheet.webp)
- [Wybrany kierunek Gothic 2 — v1](generated-directions/gothic2-inventory-direction-v1.png)
- [Widok ekwipunku](generated-directions/gothic2-inventory-view-v1.png)
- [Widok statusu i specyfikacji](generated-directions/gothic2-status-view-v1.png)
- [Scena retro-gothic girl / lookbook](generated-directions/gothic2-gothic-woman-scene-v1.png)
- [Archiwum lookbooka](generated-directions/gothic2-lookbook-archive-v1.png)
- [Detail produktu / artefaktu](generated-directions/gothic2-product-detail-v1.png)
- [Pełna ekstrakcja Excalidraw](../excalidraw-extract/bez-tytulu-2026-04-17-1004/README.md)
- [Surowy plik boarda](../../Bez%20tytu%C5%82u-2026-04-17-1004.excalidraw)

W tym samym folderze są też wcześniejsze materiały robocze: mapa repo,
analiza luk względem Excalidraw, audyt assetów, design systemu, zależności,
decyzji cleanupu i zalążek backlogu. Traktuj je jako kontekst historyczny;
aktualny stan runtime jest opisany w current-runtime-audit.md.

## Szybki dostęp lokalny

- Strona: http://localhost:4321/
- Sklep: http://localhost:4321/shop
- Kolekcje: http://localhost:4321/collections
- Design system: http://localhost:4321/design-system
- Oryginalny board: https://excalidraw.com/#room=404b8bf2dde233e10263,b6Ak8S96YmN1PMFwEmdAgA
- Board załadowany z lokalnego pliku: https://excalidraw.com/#url=http%3A%2F%2Flocalhost%3A4322%2FBez%2520tytu%25C5%2582u-2026-04-17-1004.excalidraw

Ostatni link działa, gdy lokalny serwer źródła na porcie 4322 jest uruchomiony.
Oryginalny link room jest właściwym, współdzielonym boardem.

## Najkrótszy obraz sytuacji

- Materiał z boarda nie przepadł: lokalny plik zawiera 266 elementów.
- Z niego wyodrębniono 33 użycia obrazów, reprezentujące 29 unikalnych
  osadzonych plików.
- Sklep jest działającym rdzeniem: 46 produktów i 46 wygenerowanych stron
  szczegółowych.
- /lookbook i /photos są obecnie pustymi shellami, a /items jest aliasem
  przekierowującym do /shop.
- Runtime i build przechodzą lokalnie; szczegóły oraz ograniczenia są w audycie.
