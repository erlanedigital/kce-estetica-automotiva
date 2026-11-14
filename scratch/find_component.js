const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('id:"experiencia"');
const fnIdx = html.lastIndexOf('function ', p);
console.log('Function starts at:', fnIdx, 'experiencia at:', p);
console.log(html.substring(fnIdx, fnIdx + 800));
