# Gothic 2 style lock

Ten dokument koryguje wcześniejsze prompty generatywne. Jest punktem
odniesienia przed następną generacją.

## To jest właściwy kierunek

- pełne, ciągłe 3D świata Gothic 2: prosta geometria sceny, ale normalne
  krawędzie i ciągły obraz, bez degradacji do pixel artu,
- naturalny rendering sceny z dostarczonych screenshotów, bez nakładania filtra
  retro, kompresji, scanlines ani celowego obniżania jakości,
- normalna proporcjonalna typografia fantasy/gothic, dokładnie w duchu
  dostarczonych ekranów, bez fontu bitmapowego, monospace ani DOS,
- czarne i półprzezroczyste panele nakładane na świat gry,
- cienkie, ciepłe złoto/brązowe linie w menu save/load,
- ciężkie kamienne lub metalowe ramy dla statusu i statystyk,
- chłodne, desaturowane światło świata, czernie, grafity, brudne brązy,
  szarości kamienia i bardzo oszczędne naturalne światło pochodni,
- miasteczka, lasy, ruiny, bruk, drewno, kamień i postacie z konkretnego
  świata Gothic 2,
- praktyczny, lekko toporny interfejs gry; bez współczesnego polishu.
- ton surowy, ciężki, niecukierkowy i lekko nieprzyjazny; gothic wynika z
  materiałów, cienia, proporcji i atmosfery, nie z fioletowego glowu.

## Tego nie używać

- pixel art i celowe pikselowanie obrazu,
- bitmap fonts, pixel fonts, monospace, DOS UI, CRT scanlines,
- stylizacja na 8-bit/16-bit,
- słowa retro, low-resolution, old PC screenshot i compressed rendering jako
  opis stylu generacji,
- nowoczesny premium dark ecommerce,
- luksusowe karty z cienkimi złotymi obrysami jako samodzielny język,
- neon cyberpunk, cukierkowe fantasy, fantasy concept art, glossy 3D, anime,
- nasycony fiolet, róż, czyste niebo, dekoracyjny glow i „ładny” magiczny
  klimat,
- przypadkowe nazwy, pseudo-logo albo tekst generowany przez model.

Nie opisujemy tego jako „retro vibe”. Referencją jest konkretny wizualny świat
Gothic 2 i jego UI, pokazany normalnie, bez filtra i bez stylizowania obrazu na
gorszą jakość.

## Referencje

Następne generacje mogą używać wyłącznie:

- oryginalnych screenshotów Gothic 2 dostarczonych w rozmowie,
- aktualnego mastera kompozycji
  `generated-directions/by-dot-for-you-gothic2-master-clean.png` — to jest
  zaakceptowany układ; usunięto z niego wyłącznie halucynowany napis `ZIAIA`,
- zaakceptowanego mastera
  generated-directions/gothic2-inventory-direction-v1.png,
- realnych assetów projektu, jeśli są potrzebne do pokazania ubrania.

Późniejsze wygenerowane widoki z tej serii nie są referencjami stylu. Mogą
pozostać w folderze jako historia eksperymentów, ale nie wolno ich podawać
modelowi jako input, dopóki nie zostaną osobno zaakceptowane.

W praktyce nowy widok zaczynamy od aktualnego mastera kompozycji, a dopiero
potem dokładamy konkretny realny asset produktu. Nie używamy jako referencji
pochodnych storefrontów, gridów ecommerce ani wcześniejszych odrzuconych
generacji.

## Brand lock

- Strona: BY DOT FOR YOU.
- DOT: ksywa/autorski podpis.
- YOU: główne logo/znak strony.
- Generator nie ma wymyślać nazwy ani logotypu. Jeśli tekst nie jest
  kontrolowany, pole ma zostać puste i będzie dodane w kodzie.

## Sposób dalszej pracy

Generujemy jeden widok na raz. Najpierw oddzielnie sprawdzamy:

1. świat i rendering 3D,
2. panel UI i materiał ramy,
3. postać/ubranie,
4. dopiero potem kompozycję konkretnego widoku strony.

Nie generujemy całej strony jako jednego obrazka. Najpierw powstaje mały,
kontrolowany wzorzec ramy, panelu i materiału. Dopiero zaakceptowany wzorzec
może zostać użyty przy realnym sklepie z ubraniami.

Prompt nie może żądać degradacji obrazu tylko dlatego, że referencja pochodzi
ze starej gry. Ma opisać świat, światło, materiały, UI i znaczenie widoku
osobno. Semantyka pozostaje sklepowa: normalna odzież, cena, rozmiar,
dostępność i CTA.

## Regression guard: shop view

Ostatnia próba sklepu odjechała w stronę premium dark ecommerce. Sama czerń,
brass i kamienna ramka nie są wystarczającym sygnałem Gothic 2.

Następny koncept sklepu musi zachować przede wszystkim:

- ciągłą scenę 3D Gothic 2 jako tło i przestrzeń widoku,
- duży czarny, półprzezroczysty panel nałożony na tę scenę,
- cienkie złote linie, asymetryczny układ listy i podglądu oraz dolny pasek
  podpowiedzi,
- formę inventory/inspekcji jednego ubrania zamiast współczesnego grida kart,
  sidebara, sortowania, koszyka i zewnętrznej ramy całej strony.

Do tego testu nie dołączamy screenshota aktualnego sklepu ani wcześniejszych
odrzuconych generacji. Aktualne screenshoty produktów służą wyłącznie do
zachowania realnego ubrania; Gothic 2 ma kontrolować kompozycję i relację UI
do świata. Logo `YOU` zostaje dodane później z prawdziwego assetu w kodzie.

## Motion and quality lock

Widoki mogą być filmowymi loopami, ale video nie jest celem samym w sobie.
Jeśli ruch obniża jakość, wybieramy wysokiej jakości klatkę i subtelne warstwy
ruchu zamiast słabego generowanego filmiku.

- ruch dotyczy świata: powolny drift kamery, mgła, drzewa, deszcz lub ogień;
- panel, typografia, logo, produkt i selekcja pozostają stabilne i czytelne;
- każdy statyczny koncept musi działać jako samodzielny kadr z intro, zanim
  dostanie loop video;
- projekt ma już obsługę MP4, ale obecny runtime współdzieli jeden testowy
  loop; docelowo sceny mogą dostać osobne loopy dopiero po weryfikacji jakości.
