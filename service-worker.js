/* Service worker — Abogados DTA */
const CACHE_NAME = 'abogados-dta-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './scripts.js',
  './manifest.json',
  './assets/logo/dta-logo.jpg',
  './assets/logo/icon-192.png',
  './assets/logo/icon-512.png',
  './assets/logo/favicon-64.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const esLocal = url.origin === self.location.origin;

  if (esLocal && url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((resp) => {
          const copia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          return resp;
        }).catch(() => cached);
      })
    );
  } else {
    event.respondWith(
      fetch(request).then((resp) => {
        if (esLocal) {
          const copia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        }
        return resp;
      }).catch(() => caches.match(request))
    );
  }
});
