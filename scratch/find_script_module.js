const fs = require('fs');
const html = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');
const idx = html.indexOf('<script type="module">');
console.log('Index:', idx);
console.log('Context:\n', html.substring(idx - 100, idx + 50));
