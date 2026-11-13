const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const rIdx = c.indexOf('collection:"kce_bookings"');
console.log('rIdx:', rIdx);
console.log(c.substring(rIdx - 200, rIdx + 100));

// Find w definition
const wMatch = c.match(/let\s+w\s*=\s*async|const\s+w\s*=\s*async|function\s+w\s*\(/);
if (wMatch) {
  console.log('wMatch:', wMatch.index);
  console.log(c.substring(wMatch.index - 50, wMatch.index + 350));
}
