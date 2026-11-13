const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

const pos = html.indexOf('header nav {');
console.log('Found header nav { at:', pos);
console.log(html.substring(pos - 100, pos + 250));

const target = html.substring(pos - 45, pos + 185);
console.log('Target to replace:');
console.log(JSON.stringify(target));
