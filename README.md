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
