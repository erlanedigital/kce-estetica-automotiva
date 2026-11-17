const fs = require('fs');
const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptStart = html.indexOf('<script type="module">');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + '<script type="module">'.length, scriptEnd);

const pos = 2545123;
console.log('Context around pos in jsCode:');
console.log(jsCode.substring(pos - 100, pos + 100));
