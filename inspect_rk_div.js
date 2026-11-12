const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const rkIdx = content.indexOf('RANKING DOS MELHORES');
console.log('Snippet:\n', content.substring(rkIdx - 200, rkIdx + 400));
