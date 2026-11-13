const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

let pos = 0;
while (true) {
  let idx = s.indexOf('keydown', pos);
  if (idx === -1) break;
  console.log('=== MATCH AT', idx, '===');
  console.log(s.slice(Math.max(0, idx - 150), Math.min(s.length, idx + 350)));
  pos = idx + 7;
}
