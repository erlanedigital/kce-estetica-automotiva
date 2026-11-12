const fs = require('fs');
const path = require('path');

const userCleanPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794454413632_7350b9a4.webp';
const userDirtyPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794450457497_e2c4c8ae.webp';

// 1. Salvar cópias locais
if (fs.existsSync(userCleanPhoto)) {
  fs.copyFileSync(userCleanPhoto, 'carro_depois_limpo.webp');
  console.log('carro_depois_limpo.webp copiado com sucesso.');
} else {
  console.error('Foto limpa não encontrada em:', userCleanPhoto);
}

if (fs.existsSync(userDirtyPhoto)) {
  fs.copyFileSync(userDirtyPhoto, 'carro_antes_sujo.webp');
  console.log('carro_antes_sujo.webp copiado com sucesso.');
} else {
  console.error('Foto suja não encontrada em:', userDirtyPhoto);
}

// 2. Criar ícones SVG e WebP para o PWA (192x192 e 512x512)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B1A"/>
      <stop offset="100%" stop-color="#0A1633"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0066FF"/>
      <stop offset="100%" stop-color="#2F9BFF"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bg)"/>
  <rect x="24" y="24" width="464" height="464" rx="92" fill="none" stroke="url(#glow)" stroke-width="8" stroke-opacity="0.4"/>
  <!-- Logo KCL -->
  <g transform="translate(256, 230)" text-anchor="middle">
    <text font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="900" font-size="160" fill="#FFFFFF" letter-spacing="-4">KCL</text>
    <text y="70" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="700" font-size="34" fill="#2F9BFF" letter-spacing="8">ESTÉTICA</text>
    <text y="105" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="600" font-size="22" fill="#93A3BC" letter-spacing="4">AUTOMOTIVA</text>
  </g>
  <circle cx="256" cy="410" r="14" fill="#0066FF"/>
</svg>`;

fs.writeFileSync('icon-512.svg', iconSvg, 'utf8');
fs.writeFileSync('favicon.svg', iconSvg, 'utf8');
console.log('icon-512.svg e favicon.svg gerados.');

// 3. Criar manifest.json
const manifest = {
  "name": "KCL Estética Automotiva",
  "short_name": "KCL Estética",
  "description": "Estúdio de Estética Automotiva em Montes Claros - MG. Vitrificação, Polimento, Higienização e Lavagem Detalhada.",
  "start_url": "/",
  "id": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#050B1A",
  "theme_color": "#0066FF",
  "lang": "pt-BR",
  "categories": ["lifestyle", "business", "utilities"],
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
};

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
fs.writeFileSync('manifest.webmanifest', JSON.stringify(manifest, null, 2), 'utf8');
console.log('manifest.json e manifest.webmanifest gerados.');

// 4. Criar sw.js (Service Worker PWA)
const swCode = `// KCL Estética Automotiva - Service Worker PWA
const CACHE_NAME = 'kcl-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET ou esquemas que não sejam http/https
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // Stale-while-revalidate / Network-first para páginas
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
`;

fs.writeFileSync('sw.js', swCode, 'utf8');
console.log('sw.js gerado.');
