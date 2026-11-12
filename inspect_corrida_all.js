const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const cIdx = content.indexOf('id:"corrida"');
console.log(content.substring(cIdx + 1500, cIdx + 4500));
