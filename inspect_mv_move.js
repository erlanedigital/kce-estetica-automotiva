const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const mIdx = content.indexOf('Melhores voltas salvas');
console.log('--- AROUND MELHORES VOLTAS SALVAS ---');
console.log(content.substring(mIdx - 100, mIdx + 1500));
