const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchAll(regex) {
  let m;
  while ((m = regex.exec(content)) !== null) {
    console.log(`Matched ${m[0]} at ${m.index}:`);
    console.log(content.substring(Math.max(0, m.index - 50), Math.min(content.length, m.index + 200)));
    console.log('---------------------------');
  }
}

console.log('--- RECRIA / SEED ---');
searchAll(/seed/gi);
searchAll(/recria/gi);
searchAll(/kce_seeded/gi);
