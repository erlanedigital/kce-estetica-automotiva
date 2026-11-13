const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts:', scripts.length);
for (let i = 0; i < scripts.length; i++) {
  const s = scripts[i];
  const preview = s.substring(0, 100).replace(/\r?\n/g, ' ');
  console.log('Script ' + (i + 1) + ' (len: ' + s.length + '): ' + preview);
}
