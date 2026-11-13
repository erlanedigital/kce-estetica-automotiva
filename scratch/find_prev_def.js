const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

let pos = 0;
while (true) {
  let idx = s.indexOf('.preventDefault()', pos);
  if (idx === -1) break;
  // check if it's related to keydown or key
  const context = s.slice(Math.max(0, idx - 80), Math.min(s.length, idx + 80));
  if (context.includes('key') || context.includes('Arrow') || context.includes('d.key') || context.includes('ev.key')) {
    console.log('=== PREVENT DEFAULT ON KEY AT', idx, '===');
    console.log(context);
  }
  pos = idx + 17;
}
