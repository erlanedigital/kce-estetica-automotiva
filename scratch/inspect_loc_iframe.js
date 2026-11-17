const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const start = content.indexOf('Mapa KCL Estética Automotiva');
console.log(content.substring(start, start + 1000));
