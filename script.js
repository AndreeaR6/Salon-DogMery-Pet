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
      var toMins = function (v) { var p = String(v || '').split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1] || '0', 10); };
      var fmt = function (v) { var p = String(v).split(':'); return parseInt(p[0], 10) + ':' + (p[1] || '00'); };
      var ds = badge.dataset;
      var openMins = null, closeMins = null, closeTxt = '';
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) > -1) { openMins = toMins(ds.lvDe); closeMins = toMins(ds.lvPana); closeTxt = fmt(ds.lvPana); }
      else if (day === 'Sat') { openMins = toMins(ds.saDe); closeMins = toMins(ds.saPana); closeTxt = fmt(ds.saPana); }
      if (closeMins && mins >= openMins && mins < closeMins) {
        badge.classList.add('is-open');
        badge.textContent = 'Deschis acum, pana la ' + closeTxt;
      } else {
        badge.textContent = 'Inchis acum. Program: ' + (ds.program || '');
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

  /* ---------- clipuri video incorporate (se incarca doar la click) ---------- */
  function addScript(src, onload) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (onload) s.onload = onload;
    document.body.appendChild(s);
    return s;
  }
  function loadClip(fig) {
    var type = fig.getAttribute('data-clip');
    var url = fig.getAttribute('data-url');
    var host = document.createElement('div');
    host.className = 'clip-embed';
    if (type === 'tiktok') {
      var bq = document.createElement('blockquote');
      bq.className = 'tiktok-embed';
      bq.setAttribute('cite', url);
      bq.setAttribute('data-video-id', fig.getAttribute('data-id'));
      bq.style.maxWidth = '605px';
      bq.style.minWidth = '280px';
      bq.appendChild(document.createElement('section'));
      host.appendChild(bq);
    } else if (type === 'instagram') {
      var ig = document.createElement('blockquote');
      ig.className = 'instagram-media';
      ig.setAttribute('data-instgrm-permalink', url);
      ig.setAttribute('data-instgrm-version', '14');
      ig.style.width = '100%';
      ig.style.maxWidth = '540px';
      host.appendChild(ig);
    } else if (type === 'facebook') {
      if (!document.getElementById('fb-root')) {
        var root = document.createElement('div');
        root.id = 'fb-root';
        document.body.appendChild(root);
      }
      var fb = document.createElement('div');
      fb.className = 'fb-video';
      fb.setAttribute('data-href', url);
      fb.setAttribute('data-allowfullscreen', 'true');
      fb.setAttribute('data-width', '500');
      host.appendChild(fb);
    } else {
      return;
    }
    var a = document.createElement('p');
    a.className = 'clip-open';
    var link = document.createElement('a');
    link.href = url;
    link.rel = 'noopener';
    link.textContent = 'Deschide pe ' + (type === 'tiktok' ? 'TikTok' : type === 'instagram' ? 'Instagram' : 'Facebook');
    a.appendChild(link);
    fig.innerHTML = '';
    fig.appendChild(host);
    fig.appendChild(a);
    if (type === 'tiktok') {
      var old = document.getElementById('tiktok-embed-js');
      if (old) old.parentNode.removeChild(old);
      addScript('https://www.tiktok.com/embed.js').id = 'tiktok-embed-js';
    } else if (type === 'instagram') {
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      else addScript('https://www.instagram.com/embed.js', function () {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      });
    } else if (type === 'facebook') {
      if (window.FB && window.FB.XFBML) window.FB.XFBML.parse(host);
      else addScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2');
    }
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-clip-load]') : null;
    if (!btn) return;
    var fig = btn.closest('[data-clip]');
    if (fig) loadClip(fig);
  });

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
