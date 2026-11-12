const fs = require('fs');

const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Vamos ver a junção do aside
const asideIdx = content.indexOf('Melhores voltas salvas');
console.log('Aside snippet:\n', content.substring(asideIdx - 100, asideIdx + 600));
