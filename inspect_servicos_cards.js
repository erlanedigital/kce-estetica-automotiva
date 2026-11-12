const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const sIdx = 2015797;
console.log('--- SERVICOS CARDS SNIPPET ---');
console.log(content.substring(sIdx - 800, sIdx + 1200));
