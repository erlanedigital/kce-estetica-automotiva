const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const xvMatch = content.match(/(?:const|var|let)\s+xv\s*=\s*[^;]+;/);
console.log('xv:', xvMatch ? xvMatch[0] : 'not found');

const jvMatch = content.match(/(?:const|var|let)\s+jv\s*=\s*[^;]+;/);
console.log('jv:', jvMatch ? jvMatch[0] : 'not found');
