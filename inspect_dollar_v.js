const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const vIdx = content.indexOf('var $v=');
console.log('$v snippet:\n', content.substring(vIdx, vIdx + 2000));
