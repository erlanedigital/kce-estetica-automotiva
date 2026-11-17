const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchAround(term) {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`=== FOUND: ${term} at ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
  }
}

searchAround('Df=');
searchAround('Df =');
searchAround('[Df');
