const fs = require('fs');
const parser = require('@babel/parser');

const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptStart = html.indexOf('<script type="module">');
const scriptEnd = html.indexOf('</script>', scriptStart);
console.log('Script module from', scriptStart, 'to', scriptEnd);

const jsCode = html.substring(scriptStart + '<script type="module">'.length, scriptEnd);
console.log('jsCode length:', jsCode.length);

try {
  parser.parse(jsCode, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('Original jsCode parses successfully with Babel!');
} catch (e) {
  console.error('Original jsCode parse error:', e.message, 'at pos:', e.pos);
}
