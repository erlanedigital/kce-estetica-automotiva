const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const rkIdx = content.indexOf('RANKING DOS MELHORES');
console.log('RANKING DOS MELHORES index:', rkIdx);
console.log(content.substring(rkIdx - 400, rkIdx + 300));
