const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const beforeAfterIdx = content.indexOf('ANTES & DEPOIS');
console.log(content.substring(beforeAfterIdx + 1800, beforeAfterIdx + 3000));
