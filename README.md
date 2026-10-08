# Salon DogMery Pet

Site static pentru salonul de toaletaj canin din Pitesti. Fara build.

Pagini: `index.html`, `servicii.html`, `despre-noi.html`, `galerie.html`, `contact.html`, `confidentialitate.html`, `404.html`.
Resurse: `style.css`, `script.js`, `img/`, `galerie.json`, `sitemap.xml`, `robots.txt`.

Google Analytics (`G-ZPYGVTJYLH`) se incarca doar dupa ce vizitatorul apasa 'Accept' (vezi `script.js`).
Harta Google se incarca doar la click.

Publicare: 'Settings' > 'Pages' > 'Deploy from a branch' > `main` / `/ (root)`.

## Adaugare poze in galerie (fara cod)

1. Deschide `https://andreear6.github.io/Salon-DogMery-Pet/editare-imagini.html`, alege pozele, scrie descrierea si apasa 'Descarca' la fiecare.
2. In GitHub: dosarul `img/galerie` > 'Add file' > 'Upload files' > 'Commit changes'.
3. Fisierul `galerie.json` > 'Edit' (creionul). Lipeste liniile copiate din pagina intre `[` si `]`. Intre doua poze trebuie o virgula. > 'Commit changes'.
4. Dupa 1-2 minute pozele apar in 'Galerie' > 'Din salon'.

Pentru a scoate o poza, sterge linia ei din `galerie.json`.
