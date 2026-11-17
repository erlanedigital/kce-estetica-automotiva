const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function printRange(start, length, title) {
  console.log('==============================');
  console.log('=== ' + title + ' ===');
  console.log('==============================');
  console.log(content.substring(start, start + length));
  console.log('\n');
}

printRange(2665900, 500, 'RANKING Bf.map');
printRange(2647800, 1500, 'PASSOS');
printRange(2668400, 1500, 'AGENDAR LEFT SIDE');
printRange(2679200, 1800, 'LOCALIZACAO CARDS');
printRange(2645600, 1500, 'EXPERIENCIA SENTE A ESPUMA');
