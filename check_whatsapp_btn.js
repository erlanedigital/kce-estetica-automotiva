const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const phrase = 'className:"rounded-full bg-blue-600 hover:bg-blue-700';
const idx = html.indexOf(phrase);
console.log('Idx da frase:', idx);
if (idx !== -1) {
  console.log('--- ENTORNO DO ERRO ---');
  console.log(html.slice(idx - 200, idx + 300));
}
