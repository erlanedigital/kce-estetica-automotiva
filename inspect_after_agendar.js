const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const agendarEnd = content.indexOf('id:"agendar"');
console.log('Snippet after agendar:\n', content.substring(agendarEnd + 3000, agendarEnd + 5500));
