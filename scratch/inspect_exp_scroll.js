const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"experiencia"');
// Look backwards for Vf
const codeBefore = html.substring(pos - 4000, pos);
console.log(codeBefore);
