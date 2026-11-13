const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

function findSnippet(str) {
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(str, idx)) !== -1) {
    count++;
    console.log(`Found "${str}" at pos ${idx}`);
    console.log(html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 120)));
    console.log('---');
    idx += str.length;
    if (count > 5) break;
  }
  if (count === 0) console.log(`"${str}" NOT FOUND`);
}

console.log('=== Finding Lucas Oliveira ===');
findSnippet('Lucas Oliveira');

console.log('=== Finding ---- ===');
findSnippet('----');

console.log('=== Finding TOTAL GASTO ===');
findSnippet('TOTAL GASTO');

console.log('=== Finding Simular envio ===');
findSnippet('Simular envio');
