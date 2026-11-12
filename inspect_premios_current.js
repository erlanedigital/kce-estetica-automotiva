const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pIdx = content.indexOf('Prêmios');
console.log('Prêmios at:', pIdx);
console.log('Snippet:\n', content.substring(pIdx - 200, pIdx + 400));
