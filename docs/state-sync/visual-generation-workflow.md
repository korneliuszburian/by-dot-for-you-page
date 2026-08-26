# Visual generation workflow

## Cel

Najpierw ustalamy kierunek artystyczny na podstawie odzyskanych inspiracji,
potem generujemy wizualne hipotezy końcowego stanu strony, a dopiero na końcu
przekładamy wybrany kierunek na layout, komponenty i kod.

## Brand lock

- Nazwa strony i systemu: BY DOT FOR YOU.
- DOT jest ksywą/autorskim podpisem twórcy.
- YOU jest głównym znakiem/logo strony i może być centralnym emblematem
  wizualnym.
- Generator nie może wymyślać zastępczych nazw marki, tytułów ani logotypów.
  Teksty typu ZIAIA, ARCHIVE lub przypadkowe nazwy z generacji są błędem i
  nie przechodzą do selekcji.
- W promptach, w których tekst jest istotny, używamy wyłącznie dokładnego
  tekstu BY DOT FOR YOU albo znaku YOU. Jeśli generator nie potrafi go
  wyrenderować poprawnie, lepiej zostawić pole bez tekstu niż wstawić
  halucynowaną nazwę.

Generowane obrazy są referencjami art direction, nie gotowymi screenshotami
produkcyjnymi. Nie będziemy wymagać od generatora poprawnego tekstu UI ani
traktować przypadkowego copy jako decyzji produktowej.

Pierwszy zaakceptowany kierunek jest zapisany jako
[Gothic 2 inventory direction v1](generated-directions/gothic2-inventory-direction-v1.png).
To jest aktualny wzorzec stylu: stary PC RPG, low-poly, brudny i ciemny świat,
kamienno-metalowe ramy, półprzezroczyste czarne panele, ciepła proporcjonalna
typografia,
bez współczesnego ecommerce polish.

Szczegółowa korekta stylu jest w [Gothic 2 style lock](gothic2-style-lock.md).
Nie opisujemy go jako pixel/retro vibe. To normalne ciągłe 3D, światło i UI
Gothic 2, użyte jako art direction dla sklepu z odzieżą.

## Pakiet źródłowy

Każdy prompt dostaje kontekst z tych materiałów:

- właściwy [room Excalidraw](https://excalidraw.com/#room=404b8bf2dde233e10263,b6Ak8S96YmN1PMFwEmdAgA),
- [kontakt sheet](excalidraw-contact-sheet.webp),
- [29 unikalnych odzyskanych obrazów](../excalidraw-extract/bez-tytulu-2026-04-17-1004/images/),
- [odzyskany tekst i pozycje elementów](excalidraw-recovery.md),
- [screenshoty aktualnej strony](screenshots/current-site/),
- [audyt aktualnego runtime](current-runtime-audit.md).

Plik Excalidraw jest źródłem notatek i układu, natomiast do generatora
dołączamy obrazy jako osobne referencje. Dzięki temu można kontrolować, które
inspiracje wpływają na konkretną hipotezę.

## Kolejność generowania

### 1. Szerokie kierunki

Najpierw generujemy trzy niezależne warianty, bez kodowania i bez
przywiązywania się do jednego layoutu:

- Gothic Portal — portal/void, obracające się logo, rama i menu jako obiekt.
- Inventory Commerce — sklep jak ekwipunek z gry, ale z czytelną prezentacją
  ceny, dostępności i zdjęć odzieży.
- Ruined Editorial — ciężki, gotycki magazyn/lookbook z bardziej artystycznym
  strumieniem zdjęć.

Każdy wariant powinien dostać ten sam zestaw pytań: jak wygląda wejście,
przejście do sklepu, karta produktu i doświadczenie zdjęciowe.

### 2. Kluczowe widoki wybranego kierunku

Po wyborze jednego kierunku generujemy osobne referencje dla:

1. homepage/menu,
2. katalogu produktów,
3. detailu produktu,
4. lookbooka,
5. photos/art stream,
6. kolekcji lub narracyjnej sekcji For You.

To pozwala ocenić system jako całość, a nie zachwycić się jednym hero
obrazem, który nie skaluje się na sklep.

### 3. Selekcja i kontrakt

Do każdego widoku zapisujemy:

- co zachowujemy z inspiracji,
- co jest tylko atmosferą,
- co musi być użyteczne w sklepie,
- jakie elementy są zakazane lub zbyt podobne do konkretnego źródła,
- jakie wymiary, stany i breakpointy trzeba później odtworzyć w kodzie.

Dopiero ten kontrakt staje się wejściem do implementacji.

## Zasada dołączania assetów

W pierwszym, szerokim promptcie używamy kontakt sheetu oraz pełnego pakietu
odzyskanych obrazów jako mapy inspiracji. W kolejnych promptach grupujemy
referencje według roli:

- portal, rama, logo, tło i atmosfera,
- game UI, inventory i karty przedmiotów,
- ubrania, sylwetki i zdjęcia produktowe,
- lookbook, fotografia i kompozycje editorial,
- proporcje, cropy i detale interfejsu.

Nie dokładamy bezmyślnie wszystkich obrazów do każdego promptu. Pełny pakiet
ma zachować szerokość kierunku, a grupy mają utrzymać czytelny sygnał podczas
projektowania konkretnego widoku. Przy każdym wywołaniu zapisujemy listę
załączonych plików i numer wariantu.

## Wspólne ograniczenia art direction

Kierunek powinien utrzymać:

- gothic / dark fantasy bez generycznego cyberpunku,
- czerń, grafit, kość, przygaszony brass/rust i kontrolowany ember accent,
- atmosferę portalu, kamienia, metalu, starego artefaktu i ekwipunku,
- mocny obiektowy charakter ram, przycisków i kart,
- czytelność nazwy produktu, ceny, dostępności, rozmiaru i CTA,
- oryginalną kompozycję BY DOT FOR YOU, bez kopiowania konkretnego logo,
  interfejsu gry lub pojedynczej marki.
- poprawną hierarchię BY DOT FOR YOU / DOT / YOU; żadnych losowych nazw
  wygenerowanych przez model.

## Menu i ramy

Istniejące menu jest dobrym fundamentem i nie wymaga wymyślania od nowa.
Kolejne referencje mają traktować je jako bazowy układ do lekkiego
doprawienia, a nie jako pustą kartę:

- zachowujemy jego hierarchię i prostotę,
- normalizujemy rodzinę ramek, narożników, obrysów i stanów aktywnych,
- ujednolicamy materiał ramek: kamień/metal, cienki obrys, ciemne
  półprzezroczyste wnętrze,
- rozróżniamy ramę menu, ramę karty przedmiotu i ramę informacji, ale w jednym
  systemie,
- logo YOU dostaje własny, powtarzalny sposób prezentacji,
- gothic character ma wynikać z materiału, typografii, kontrastu i świata,
  nie z przypadkowego przeładowania ornamentem.

Do promptów dodajemy negatywny kontekst: generic SaaS dashboard, clean
minimalist ecommerce, neon cyberpunk, pastel lifestyle brand, przypadkowa
czytelna typografia, przeładowanie ornamentem, nieczytelne ceny i CTA,
kopiowanie konkretnej marki lub istniejącego game UI.

## Bazowy szablon promptu

~~~text
Create an original visual direction reference for BY DOT FOR YOU, a gothic
clothing and artifact-oriented fashion project.

Target view: [homepage / shop / product detail / lookbook / photos / For You].
Direction: [Gothic Portal / Inventory Commerce / Ruined Editorial].

Use the attached references as art-direction evidence. Preserve their shared
visual language — [selected traits] — but do not copy any logo, game UI,
character, brand, or exact composition.

The result should communicate [user journey and emotional goal], with a
clear hierarchy for [product name, price, availability, CTA or navigation].
Keep it original, premium, dark, tactile, gothic, and usable as a web
experience. Show [specific layout or scene], with enough negative space to
evaluate structure and responsive cropping.

Avoid: generic SaaS, clean white ecommerce, neon cyberpunk, pastel lifestyle,
unreadable UI, fake brand names, copied logos, copied game interfaces,
excessive ornament that destroys hierarchy.

This is a concept reference for art direction, not final production UI.
~~~

## Pierwsze prompty do wygenerowania

### A. Gothic Portal — homepage

~~~text
Create an original art-direction board for the BY DOT FOR YOU homepage.
Show a dark gothic portal/void as the central stage, with a restrained
rotating 3D emblem suspended inside it, an ornate but functional frame, and a
small set of navigation actions orbiting or anchoring the portal. The visual
language should combine gothic architecture, worn stone, dark metal, bone,
brass, rust and a controlled ember glow. It must feel like entering an
artifact archive or a secret fashion world, not like a game loading screen.

Use all attached Excalidraw inspiration assets as a broad reference map, then
unify them into one original direction. Keep the layout legible enough that
the relationship between home, shop, lookbook, photos and collections can be
understood. No copied logos, no recognizable game UI, no fake readable copy.
Concept reference sheet, cinematic web composition, strong hierarchy,
responsive-minded negative space.
~~~

### B. Inventory Commerce — shop

~~~text
Create an original visual direction reference for the BY DOT FOR YOU shop.
Design a gothic inventory/archive interface for real clothing products:
product cards should feel like collectible artifacts, while product name,
price, availability, size and the primary action remain immediately readable.
Use dark charcoal and graphite surfaces, bone typography, muted brass or
rusted-gold borders, restrained ember accents, tactile frames and subtle
game-inventory cues without copying any existing game interface.

Use the attached clothing, inventory and UI-inspired Excalidraw assets as
references. Show a believable responsive product grid with available and sold
out items, filters, collection context and a clear path to product detail.
Original composition, premium gothic fashion, no neon cyberpunk, no generic
SaaS dashboard, no copied logos or exact game screens. This is an art
direction concept, so prioritize structure, material and hierarchy over
perfect UI text.
~~~

### C. Ruined Editorial — lookbook and photos

~~~text
Create an original art-direction board for two connected BY DOT FOR YOU
surfaces: a curated lookbook and an artistic photos stream. Combine gothic
editorial fashion photography, ruined architectural atmosphere, archival
contact-sheet energy and deliberate asymmetry. The lookbook should feel
selected and iconic; the photos stream should feel looser, more chronological
and alive. Maintain one coherent visual system through frames, crop rules,
spacing, typography and transitions.

Use the attached photography and gothic inspiration assets as references, but
do not reproduce any recognizable image, person, brand, logo or exact layout.
Show how the two surfaces differ while still belonging to the same site.
Dark tactile palette, bone and rust accents, strong image-led composition,
clear navigation, original premium art direction. Avoid generic fashion
lookbook, clean Pinterest collage, neon cyberpunk and unreadable ornament.
~~~

### D. Product detail — artifact card

~~~text
Create an original visual direction reference for a BY DOT FOR YOU product
detail page. Present one handmade clothing item as a rare gothic artifact:
large image or image stage, supporting gallery, item name, price, availability,
size selection, material/specification and a clear contact or purchase action.
Use a dark portal/archive environment with worn stone, metal, bone, brass and
controlled ember light, while keeping all commerce information visually
dominant and usable.

Use the attached product photography, item-card and inventory-inspired
references. Preserve the feeling of a game item inspection screen only at the
level of mood and hierarchy; do not copy any game UI, logo, character or
brand. Original web composition, tactile frames, strong information
hierarchy, desktop and mobile-aware cropping. Avoid clutter, illegible text,
generic ecommerce, neon cyberpunk and decorative elements that obscure the
product.
~~~

## Kryterium wyboru

Nie wybieramy wariantu tylko dlatego, że ma najlepszy pojedynczy obraz.
Wygrywa kierunek, który równocześnie:

- zachowuje gothic character i odróżnialność marki,
- działa dla homepage, katalogu i produktu,
- pozwala rozróżnić lookbook od photos,
- nie ukrywa informacji zakupowych,
- daje się odtworzyć przez istniejące komponenty, asset pipeline i responsive
  layout,
- ma jasną odpowiedź na odzyskane motywy portalu, inventory i artefaktu.
