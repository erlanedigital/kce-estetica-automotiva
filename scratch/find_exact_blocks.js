const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p1 = html.indexOf('Martelinho de Ouro Express');
console.log('=== p1 ===\n', html.substring(p1 - 30, p1 + 250));

const p2 = html.indexOf('Carlos Eduardo - Cadu');
console.log('=== p2 ===\n', html.substring(p2 - 50, p2 + 250));

const p3 = html.indexOf('{name:"Cadu",role:"Gestão / Caixa"');
console.log('=== p3 ===\n', html.substring(p3 - 30, p3 + 250));
