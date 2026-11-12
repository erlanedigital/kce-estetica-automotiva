const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const esqIdx = 2035549;
console.log('--- AROUND ESQUERDA TO RANKING ---');
console.log(content.substring(esqIdx, esqIdx + 3000));
