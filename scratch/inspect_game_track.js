const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Search for canvas and corrida
const idx = s.indexOf('canvas');
console.log('Canvas at:', idx);
if (idx !== -1) {
  console.log(s.slice(idx - 150, idx + 400));
}

// Search for game-clean or #corrida
const corridaIdx = s.indexOf('id:"corrida"');
console.log('Corrida at:', corridaIdx);
if (corridaIdx !== -1) {
  console.log(s.slice(corridaIdx - 100, corridaIdx + 800));
}
