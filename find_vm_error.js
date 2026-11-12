const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('dist/index.html', 'utf8');
const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const s6 = scriptTags[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

try {
  new vm.Script(s6, { filename: 'bundle.js' });
  console.log('Script é válido!');
} catch (err) {
  console.log('ERRO:', err.message);
  console.log('STACK:', err.stack);
}
