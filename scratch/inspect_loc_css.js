const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function search(str) {
  let idx = 0;
  while ((idx = content.indexOf(str, idx)) !== -1) {
    console.log(`Found "${str}" at ${idx}:`);
    console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 250)));
    console.log('-----------------------------');
    idx += str.length;
  }
}

search('#localizacao');
