const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar as seções da página principal
const beforeAfterIdx = content.indexOf('ANTES & DEPOIS');
console.log('ANTES & DEPOIS at:', beforeAfterIdx);
console.log(content.substring(beforeAfterIdx + 1200, beforeAfterIdx + 2200));
