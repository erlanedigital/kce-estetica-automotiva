const fs = require('fs');
const html = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');
const p = html.indexOf('"localizacao"');
console.log('Pos:', p);
let start = html.lastIndexOf('section', p);
console.log('Section start:', start);
console.log(html.substring(start - 20, start + 3000));
