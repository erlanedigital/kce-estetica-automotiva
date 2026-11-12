const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar onde a tag footer começa
const fIdx = content.indexOf('l("footer"');
console.log('footer index:', fIdx);
console.log('Snippet before footer:\n', content.substring(fIdx - 400, fIdx + 200));
