const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const depIdx = content.indexOf('DEPOIMENTOS');
console.log('DEPOIMENTOS at:', depIdx);
console.log(content.substring(depIdx + 800, depIdx + 2000));
