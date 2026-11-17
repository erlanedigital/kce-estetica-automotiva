const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"experiencia"');
console.log('Markup of experiencia:\n', html.substring(pos, pos + 2500));
