const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const hdrIdx = content.indexOf('min-h-[64px] sm:min-h-[84px]');
console.log('Mobile menu snippet:\n', content.substring(hdrIdx + 1500, hdrIdx + 3000));
