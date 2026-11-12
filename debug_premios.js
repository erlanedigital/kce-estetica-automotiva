const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pIdx = content.indexOf('Prêmios');
console.log('Snippet around Prêmios:\n', content.substring(pIdx - 300, pIdx + 300));
