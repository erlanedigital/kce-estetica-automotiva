const fs = require('fs');
const html = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const sIdx = html.indexOf('<script type="module">');
const eIdx = html.indexOf('</script>', sIdx);
const code = html.substring(sIdx + '<script type="module">'.length, eIdx);

fs.writeFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/temp_test.js', code, 'utf8');
console.log('Extracted code length:', code.length);
