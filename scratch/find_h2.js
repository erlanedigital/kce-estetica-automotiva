const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Find all h2 in the HTML or JSX
// Look for '\"h2\"' or '<h2'
let pos = 0;
const results = [];
while ((pos = c.indexOf('"h2"', pos)) !== -1) {
  results.push({ pos, snippet: c.substring(pos - 50, pos + 250) });
  pos += 4;
}

let pos2 = 0;
while ((pos2 = c.indexOf('<h2', pos2)) !== -1) {
  results.push({ pos: pos2, snippet: c.substring(pos2, pos2 + 250) });
  pos2 += 3;
}

console.log('Total h2 found:', results.length);
results.forEach((r, idx) => {
  console.log(`\n=== H2 #${idx + 1} at pos ${r.pos} ===`);
  console.log(r.snippet);
});
