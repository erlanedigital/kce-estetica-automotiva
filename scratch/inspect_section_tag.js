const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('EXPERIÊNCIA KCL');
console.log(c.substring(pos - 300, pos));
