const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const dreIdx = 2378400;
console.log('--- DRE CONTEXT AT 2378400 ---');
console.log(s.slice(dreIdx - 400, dreIdx + 500));
