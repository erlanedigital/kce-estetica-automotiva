const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Let's inspect where Guilherme appears
const positions = [];
let pos = 0;
while ((pos = content.indexOf('Guilherme', pos)) !== -1) {
  positions.push(pos);
  pos += 9;
}

positions.forEach((p, idx) => {
  console.log(`\n=== Guilherme #${idx + 1} at ${p} ===`);
  console.log(content.substring(p - 150, p + 200));
});
