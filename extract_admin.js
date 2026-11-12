const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const adminStart = 1855126;
console.log('Admin Component snippet:\n', content.substring(adminStart - 1000, adminStart + 4000));
