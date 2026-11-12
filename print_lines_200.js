const fs = require('fs');

const html = fs.readFileSync('dist/index.html', 'utf8');
const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const s6 = scriptTags[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

const lines = s6.split('\n');
console.log('Total de linhas:', lines.length);

for (let i = 190; i <= 215; i++) {
  console.log(`L${i + 1}: ${lines[i]}`);
}
