const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const m16 = content.indexOf('.mt-16');
console.log('.mt-16 in CSS:', m16);
const sm24 = content.indexOf('.sm\\:mt-24');
console.log('.sm:mt-24 in CSS:', sm24);
