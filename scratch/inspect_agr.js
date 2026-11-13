const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('agr-seed-');
console.log('pos:', pos);
console.log(c.substring(pos - 250, pos + 250));
