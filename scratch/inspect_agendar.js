const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const start = content.indexOf('id:"agendar"');
console.log(content.substring(start, start + 3000));
