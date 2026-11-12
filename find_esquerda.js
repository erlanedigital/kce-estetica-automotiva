const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const esqIdx = content.indexOf('Esquerda');
console.log('Esquerda index:', esqIdx);
console.log(content.substring(esqIdx - 300, esqIdx + 500));
