const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const idx = s.indexOf('id:"corrida"');
console.log(s.slice(idx, idx + 4000));
