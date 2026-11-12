const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const mvIdx = content.indexOf('Melhores voltas salvas');
console.log('Melhores voltas salvas index:', mvIdx);
console.log('Snippet:\n', content.substring(mvIdx - 300, mvIdx + 1200));
