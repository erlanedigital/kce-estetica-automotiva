const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. Substituir com precisão cirúrgica dentro do bundle React
html = html.split('AGENDAR AVALIAÇÃO').join('AGENDAR SERVIÇO');
html = html.split('Agendar Avaliação').join('Agendar Serviço');
html = html.split('Agendar avaliação').join('Agendar serviço');
html = html.split('agendar avaliação').join('agendar serviço');

// 2. Incrementar a versão do Service Worker e do cache para forçar a atualização imediata no navegador
const vNow = 'v-' + Date.now();
html = html.replace(/kcl-cache-v[a-zA-Z0-9_\-]+/g, 'kcl-cache-' + vNow);

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

// Atualizar o sw.js com o timestamp novo
let sw = fs.readFileSync('dist/sw.js', 'utf8');
sw = sw.replace(/const CACHE_NAME = [^;]+;/, `const CACHE_NAME = 'kcl-cache-${vNow}';`);
fs.writeFileSync('dist/sw.js', sw, 'utf8');
fs.writeFileSync('sw.js', sw, 'utf8');

console.log('SUBSTITUIÇÃO E BUSTING CONCLUÍDOS COM SUCESSO!');
