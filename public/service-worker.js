const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/sonic.png',
  '/goku.png',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/css/main.css',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precargando recursos en caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y servir desde la caché
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Interceptando solicitud para:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Devuelve el recurso en caché si existe.
      }

      return fetch(event.request).then((networkResponse) => {
        // Si el recurso no está en la caché, lo descarga y lo almacena.
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando y limpiando caché antigua...');

  const cacheWhitelist = [CACHE_NAME]; // Mantener solo la caché actual.

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
