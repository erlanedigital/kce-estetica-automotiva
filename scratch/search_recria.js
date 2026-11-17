const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchAll(term) {
  let idx = 0;
  let count = 0;
  while ((idx = content.toLowerCase().indexOf(term.toLowerCase(), idx)) !== -1) {
    console.log(`Found "${term}" at ${idx}:`);
    console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 150)));
    console.log('---');
    idx += term.length;
    count++;
    if (count > 20) break;
  }
  if (count === 0) console.log(`No occurrences of "${term}"`);
}

searchAll('recria');
searchAll('resetar');
searchAll('restaurar');
searchAll('mock');
searchAll('seed');
