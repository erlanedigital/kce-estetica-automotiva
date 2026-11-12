const fs = require('fs');

const html = fs.readFileSync('dist/index.html', 'utf8');
const s6 = html.match(/<script[\s\S]*?<\/script>/gi)[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
const lines = s6.split('\n');

console.log('--- LINHAS 204 A 208 ---');
for (let i = 203; i <= 207; i++) {
  console.log(`Linha ${i + 1}:`);
  console.log(lines[i]);
}
