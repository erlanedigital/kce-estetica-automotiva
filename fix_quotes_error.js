const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// O erro foi a injeção de `<br class="block">` dentro de uma string de JS que usou aspas duplas:
// "Rua Belo Horizonte, 80 — Bairro São José<br class="block">Montes Claros - MG"
// As aspas duplas de class="block" fecharam a string JS prematuramente!

html = html.replace(/<br class=\\"block\\">/g, '\\n');
html = html.replace(/<br class="block">/g, '\\n');

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Correção de aspas duplas aplicada!');
