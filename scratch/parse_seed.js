const fs = require('fs');
const text = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/scratch/seed_block.txt', 'utf8');

// Let's format or search every `let Q=` in text
let idx = 0;
while ((idx = text.indexOf('let Q=', idx)) !== -1) {
  console.log('--- Seed at index', idx);
  console.log(text.substring(idx - 80, idx + 250));
  idx += 10;
}
