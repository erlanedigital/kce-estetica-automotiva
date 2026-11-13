const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('EXPERIÊNCIA KCL');
console.log('Pos:', pos);
console.log(c.substring(pos - 400, pos + 400));
