// Nome do cache
const CACHE_NAME = 'receitas-pwa-v1';
// Lista de arquivos para cache
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icone-192.png',
  './icone-512.png',
  './manifest.json'
  // inclua também outras imagens, se desejar
];

// Instalação do Service Worker
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Fazendo cache dos arquivos');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Removendo cache antigo', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Busca de dados
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});
