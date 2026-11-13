const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('Sente o brilho');
console.log('Hero H1 pos:', pos);
console.log(c.substring(pos - 150, pos + 250));
