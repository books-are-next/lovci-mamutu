/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-a29c643';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./index.html","./favicon.png","./lovci_mamutu_001.html","./lovci_mamutu_002.html","./lovci_mamutu_005.html","./lovci_mamutu_006.html","./lovci_mamutu_007.html","./lovci_mamutu_008.html","./lovci_mamutu_009.html","./lovci_mamutu_010.html","./lovci_mamutu_011.html","./lovci_mamutu_012.html","./lovci_mamutu_013.html","./lovci_mamutu_014.html","./lovci_mamutu_015.html","./lovci_mamutu_016.html","./lovci_mamutu_017.html","./lovci_mamutu_018.html","./lovci_mamutu_019.html","./lovci_mamutu_020.html","./lovci_mamutu_021.html","./lovci_mamutu_022.html","./lovci_mamutu_023.html","./lovci_mamutu_024.html","./lovci_mamutu_025.html","./lovci_mamutu_026.html","./lovci_mamutu_027.html","./lovci_mamutu_028.html","./lovci_mamutu_029.html","./lovci_mamutu_030.html","./lovci_mamutu_031.html","./lovci_mamutu_032.html","./lovci_mamutu_033.html","./lovci_mamutu_034.html","./lovci_mamutu_035.html","./lovci_mamutu_036.html","./lovci_mamutu_037.html","./lovci_mamutu_038.html","./lovci_mamutu_039.html","./lovci_mamutu_040.html","./lovci_mamutu_041.html","./lovci_mamutu_042.html","./lovci_mamutu_043.html","./lovci_mamutu_044.html","./manifest.json","./resources.html","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/index.xml","./resources/obalka_lovci_mamutu_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
