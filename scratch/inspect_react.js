const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchAll(regex, max = 5) {
  let match;
  let count = 0;
  while ((match = regex.exec(content)) !== null && count < max) {
    console.log(`Match at ${match.index}:`);
    console.log(content.substring(Math.max(0, match.index - 50), Math.min(content.length, match.index + 250)));
    console.log('-----------------------------');
    count++;
  }
}

console.log('--- AGENDAR ---');
searchAll(/id:\s*["']agendar["']/g);

console.log('--- PASSOS ---');
searchAll(/id:\s*["']passos["']/g);

console.log('--- LOCALIZACAO ---');
searchAll(/id:\s*["']localizacao["']/g);

console.log('--- EXPERIENCIA ---');
searchAll(/id:\s*["']experiencia["']/g);
