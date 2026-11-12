const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const gIdx = content.indexOf('id:"galeria"');
console.log('galeria index:', gIdx);
console.log('Snippet:\n', content.substring(gIdx, gIdx + 2000));
