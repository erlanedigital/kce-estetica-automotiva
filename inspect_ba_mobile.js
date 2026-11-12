const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const baIdx = content.indexOf('ANTES & DEPOIS');
console.log('--- ANTES & DEPOIS CONTAINER ---');
console.log(content.substring(baIdx - 100, baIdx + 1200));
