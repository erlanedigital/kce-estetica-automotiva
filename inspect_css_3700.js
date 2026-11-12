const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

console.log('--- CSS SNIPPET at 3700-4500 ---');
console.log(content.substring(3600, 4500));
