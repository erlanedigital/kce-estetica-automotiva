const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const idx = content.indexOf('Arraste para comparar');
console.log('Arraste para comparar snippet:\n', content.substring(idx - 600, idx + 1800));
