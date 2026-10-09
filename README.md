# Salon DogMery Pet

Site static pentru salonul de toaletaj canin din Pitesti. Fara build.

Pagini: `index.html`, `servicii.html`, `despre-noi.html`, `galerie.html`, `contact.html`, `confidentialitate.html`, `404.html`.
Resurse: `style.css`, `script.js`, `img/`, `galerie.json`, `sitemap.xml`, `robots.txt`.

Google Analytics (`G-ZPYGVTJYLH`) se incarca doar dupa ce vizitatorul apasa 'Accept' (vezi `script.js`).
Harta Google se incarca doar la click.

Publicare: 'Settings' > 'Pages' > 'Deploy from a branch' > `main` / `/ (root)`.

## Adaugare poze in galerie

1. Micsoreaza pozele (max 1200 px pe latura lunga) si salveaza-le ca `.webp` in `img/galerie/`.
2. Adauga cate o linie in `galerie.json`, de forma `{"src": "img/galerie/nume.webp", "alt": "descriere scurta", "w": 900, "h": 1200}`, cu virgula intre ele.
3. Dupa 1-2 minute apar in 'Galerie' > 'Din salon'. Pentru a scoate o poza, sterge linia ei.

## Clipuri video in galerie

In Pages CMS, 'Clipuri video': pentru fiecare clip se completeaza fie linkul complet TikTok / Facebook / Instagram, fie un fisier mp4 sau webm (sub 25 MB, pentru incarcare din browser). Datele sunt in `_data/video.yml`, fisierele in `video/`.
Clipurile de pe retele se incarca doar cand vizitatorul apasa 'Vezi clipul' (vezi `script.js`). Lista goala ascunde sectiunea.
Bifele din `_data/video.yml`: `contact` (clipul apare si pe Contact) si `peste_tot` (apare pe pagina principala, Servicii, Despre noi si Contact). In Galerie apar mereu toate clipurile. Logica este in `_includes/clipuri.html`; fiecare pagina il apeleaza cu `clip_pagina`.

## Alte texte editabile din Pages CMS

- 'Recenzii (Ce spun clientii)': `_data/recenzii.yml` (nota, numar, luna, link, lista de recenzii). Lista goala ascunde sectiunea.
- 'Campanie (Secret Santa)': `_data/campanie.yml` (bifa `afisata` o ascunde de pe pagina principala si 'Despre noi').
- 'Intrebari frecvente': `_data/faq.yml`. In raspuns, `[preturi]` si `[telefon]` se completeaza automat. Aceleasi intrebari ajung si in datele structurate pentru Google (JSON-LD). Pagina principala arata doar intrebarile bifate, 'Servicii' le arata pe toate.
- Meta descrierea din `despre-noi.html` mentioneaza Secret Santa si nu se schimba automat.
- 'Pagina principala': `_data/acasa.yml` (titlul mare si textul de sub el).
- 'Despre noi': `_data/despre.yml` (povestea si 'Ce ne ghideaza'; pictogramele se pun automat, in ordine: inima, scut, steluta, cadou, laba, bifa).
- 'Reguli de citit inainte de programare': `_data/reguli.yml`, afisate pe 'Servicii' si 'Contact' (`_includes/reguli.html`).
- In `{{ }}` nu se pun acolade in textele din cod: Jekyll (GitHub Pages) le citeste gresit si build-ul esueaza.
- 'Imagini principale': `_data/imagini.yml` (banner, colaje, poza din 'Despre noi'). Pozele noi se incarca in `img/site/`. Dimensiunile nu se mai scriu in cod; pagina se potriveste singura.
- 'Culori site': `_data/culori.yml`. Se scriu cu `#` si cod hex (ex. `#e6399b`). Valorile invalide sunt ignorate si ramane culoarea din `style.css`. Se aplica prin `_includes/culori.html`, pus in `<head>` dupa `style.css`.
- Culorile fixe din `style.css` care nu sunt in lista (alb, verdele WhatsApp, umbre) nu se schimba din panou.
- 'Pagina principala' (`_data/acasa.yml`) are acum si 'Ce face salonul' si 'Cum decurge o programare' (in text, `[telefon]` se inlocuieste cu numarul curent).
- 'Telefon si program' (`_data/salon.yml`) are acum si adresa, linkurile catre Facebook/Instagram/TikTok si textul din subsol. Adresa si linkurile apar in toate paginile.
- Nu se schimba automat din panou: meta descrierile si datele structurate pentru Google (JSON-LD, inclusiv adresa si `streetAddress`), titlurile de sectiune din restul paginilor, textele butoanelor.


## Sectiuni mutabile si culori
Paginile Principala, Servicii si Despre noi citesc lista `sectiuni` (`_data/acasa.yml`, `_data/pagina_servicii.yml`, `_data/despre.yml`). Ordinea din lista = ordinea pe pagina; o sectiune scoasa din lista nu se mai afiseaza.
Fiecare sectiune are `fundal_alt`, `culoare_fundal` si `culoare_titlu` (hex valid, altfel ignorata). Tipuri comune: `poza_mare`, `text`, `valori`, `campanie`, `clipuri` (`_includes/bloc-comun.html`); stilul se calculeaza in `_includes/stil-bloc.html`; butoanele in `_includes/butoane-edit.html`.
Atentie: lista `sectiuni` goala = pagina fara continut intre antet si butonul final.
