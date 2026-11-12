// KCL Estética Automotiva - Service Worker PWA (Auto-Updating)
const CACHE_NAME = 'kcl-cache-v3-' + Date.now();

self.addEventListener('install', (event) => {
  // Força o Service Worker a ativar imediatamente sem esperar fechar abas
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Limpa imediatamente caches antigos
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // NETWORK-FIRST ABSOLUTO PARA O HTML (GARANTE VERSÃO MAIS RECENTE SEMPRE)
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Para outros assets: Network primeiro com fallback em cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
