const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Let's examine the exact code between pos 2306000 and 2318000
const start = 2306500;
const end = 2318500;
fs.writeFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/scratch/seed_block.txt', c.substring(start, end));
console.log('Written seed_block.txt with length:', end - start);
