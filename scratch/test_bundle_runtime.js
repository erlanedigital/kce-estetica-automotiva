const fs = require('fs');
const path = require('path');

const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptStart = html.indexOf('<script type="module">');
const scriptEnd = html.indexOf('</script>', scriptStart);
const jsCode = html.substring(scriptStart + '<script type="module">'.length, scriptEnd);

console.log('Testing jsCode in Node V8 context...');
try {
  // Test function compilation
  new Function('window', 'document', 'localStorage', 'fetch', 'setTimeout', 'setInterval', 'requestAnimationFrame', 'cancelAnimationFrame', jsCode);
  console.log('V8 syntax & function compilation SUCCESSFUL! Zero syntax/compilation errors.');
} catch (e) {
  console.error('V8 compilation error:', e);
  process.exit(1);
}
