const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const agIdx = content.indexOf('id:"agendar"');
console.log('agendar index:', agIdx);
console.log('Snippet:\n', content.substring(agIdx, agIdx + 1200));
