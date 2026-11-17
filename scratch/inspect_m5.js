const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

let idx = 0;
while ((idx = content.indexOf('m5[', idx)) !== -1) {
  console.log(`Found m5[ at ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
  idx += 3;
}
