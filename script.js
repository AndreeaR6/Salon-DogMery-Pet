(function () {
  'use strict';

  /* ---------- meniu mobil ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- deschis acum (ora Romaniei) ---------- */
  var badge = document.querySelector('[data-open-now]');
  if (badge) {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Bucharest', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; return ''; };
      var day = get('weekday');
      var mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
      var openMins = 9 * 60, closeMins = null;
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) > -1) closeMins = 17 * 60;
      else if (day === 'Sat') closeMins = 14 * 60;
      if (closeMins && mins >= openMins && mins < closeMins) {
        badge.classList.add('is-open');
        badge.textContent = 'Deschis acum, pana la ' + (closeMins === 17 * 60 ? '17:00' : '14:00');
      } else {
        badge.textContent = 'Inchis acum. Program: Luni-Vineri 9:00-17:00, Sambata 9:00-14:00';
      }
    } catch (err) { /* ramane textul implicit */ }
  }

  /* ---------- galerie din galerie.json ---------- */
  var gal = document.getElementById('gallery');
  if (gal && window.fetch) {
    fetch('galerie.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (!d || !d.poze || !d.poze.length) return;
      d.poze.forEach(function (p) {
        if (!p || typeof p.src !== 'string' || !/^img\/galerie\/[\w.-]+$/.test(p.src)) return;
        var fig = document.createElement('figure');
        var im = document.createElement('img');
        im.src = p.src; im.alt = p.alt || 'Poza din Salon DogMery Pet'; im.loading = 'lazy'; im.width = +p.w || 800; im.height = +p.h || 600;
        fig.appendChild(im);
        if (p.legenda) { var c = document.createElement('figcaption'); c.textContent = p.legenda; fig.appendChild(c); }
        gal.appendChild(fig);
      });
      if (gal.children.length) document.getElementById('poze').hidden = false;
    }).catch(function () { /* galeria ramane ascunsa */ });
  }

  /* ---------- harta (se incarca doar la click) ---------- */
  var mapBtn = document.querySelector('[data-load-map]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var box = mapBtn.closest('.map-box');
      var f = document.createElement('iframe');
      f.title = 'Harta Salon DogMery Pet';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = 'https://maps.google.com/maps?q=44.864672,24.86939&z=16&output=embed';
      box.innerHTML = '';
      box.appendChild(f);
    });
  }

  /* ---------- cookie-uri + Google Analytics (doar dupa acord) ---------- */
  var GA_ID = 'G-ZPYGVTJYLH', KEY = 'dmp-consent';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
  });

  function loadGA() {
    if (window.__dmpGa) return;
    window.__dmpGa = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* ignorat */ } }

  var banner = document.getElementById('consent');
  function show() { if (banner) { banner.hidden = false; } }
  function hide() { if (banner) { banner.hidden = true; } }

  var saved = read();
  if (saved === 'granted') loadGA();
  else if (saved !== 'denied') show();

  var yes = document.querySelector('[data-consent-yes]');
  var no = document.querySelector('[data-consent-no]');
  if (yes) yes.addEventListener('click', function () { write('granted'); hide(); loadGA(); });
  if (no) no.addEventListener('click', function () { write('denied'); hide(); });

  var reopen = document.querySelectorAll('[data-consent-open]');
  for (var i = 0; i < reopen.length; i++) reopen[i].addEventListener('click', show);
})();
