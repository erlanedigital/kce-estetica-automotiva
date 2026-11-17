const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchCss(str) {
  let idx = 0;
  while ((idx = content.indexOf(str, idx)) !== -1) {
    console.log(`Found "${str}" at ${idx}:`);
    console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 300)));
    console.log('-----------------------------');
    idx += str.length;
  }
}

searchCss('#passos');
searchCss('kcl-passos');
searchCss('passos-heading');
