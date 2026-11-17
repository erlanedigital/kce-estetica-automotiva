const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const expIdx = content.indexOf('id:"experiencia"');
console.log(content.substring(expIdx - 3000, expIdx));
