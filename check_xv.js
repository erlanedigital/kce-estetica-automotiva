const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

console.log('--- ENTORNO DE 2270768 ---');
console.log(content.slice(2270000, 2272800));
