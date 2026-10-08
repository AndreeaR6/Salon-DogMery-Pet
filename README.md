# Salon DogMery Pet

Site static pentru salonul de toaletaj canin din Pitesti. Fara build.

Pagini: `index.html`, `servicii.html`, `despre-noi.html`, `galerie.html`, `contact.html`, `confidentialitate.html`, `404.html`.
Resurse: `style.css`, `script.js`, `img/`, `galerie.json`, `sitemap.xml`, `robots.txt`.

Google Analytics (`G-ZPYGVTJYLH`) se incarca doar dupa ce vizitatorul apasa 'Accept' (vezi `script.js`).
Harta Google se incarca doar la click.

Publicare: 'Settings' > 'Pages' > 'Deploy from a branch' > `main` / `/ (root)`.

## Editare imagini direct pe site

Pagina: `https://andreear6.github.io/Salon-DogMery-Pet/editare-imagini.html` (nu e in meniu si nu e indexata).
Face commit-uri in acest repo prin API-ul GitHub, cu o cheie de acces (token) scurta, a ta.

Creare cheie (o singura data, 90 de zile):
1. GitHub > poza de profil > 'Settings' > 'Developer settings' > 'Personal access tokens' > 'Fine-grained tokens' > 'Generate new token'.
2. 'Token name': `site-salon`. 'Expiration': 90 days.
3. 'Repository access' > 'Only select repositories' > `Salon-DogMery-Pet`.
4. 'Permissions' > 'Repository permissions' > 'Contents' > 'Read and write'. Restul ramane 'No access'.
5. 'Generate token', copiaza cheia si lipeste-o in pagina, la 'Conectare'.

Cheia ramane doar in fereastra deschisa (sessionStorage) si dispare la inchidere. Cine are cheia poate scrie in acest repo pana expira, deci nu o da mai departe. O poti sterge oricand din 'Settings' > 'Developer settings'.

Ce poti face din pagina:
- Inlocuiesti bannerul, colajele si imaginea de distribuire.
- Adaugi, stergi poze din Galerie (se actualizeaza `galerie.json`).

Fiecare salvare apare pe site in 1-2 minute si lasa un commit in repo.
