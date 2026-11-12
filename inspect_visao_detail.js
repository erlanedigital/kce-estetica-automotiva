const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const vIdx = 1891538;
console.log(content.substring(vIdx + 1000, vIdx + 3000));
