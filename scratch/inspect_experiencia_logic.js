const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function showAround(term, len = 1000) {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`=== FOUND: ${term} at ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 200), Math.min(content.length, idx + len)));
  }
}

showAround('Vf=H.useRef');
showAround('m5=');
showAround('id:"experiencia"');
