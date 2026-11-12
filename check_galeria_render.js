const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const gIdx = content.indexOf('id:"galeria"');
console.log(content.slice(gIdx + 800, gIdx + 2200));

// E onde está no JSX a frase 'Três passos'
const stepIdx = content.indexOf('Três passos.');
if (stepIdx !== -1) {
  console.log('--- JSX TRÊS PASSOS ---');
  console.log(content.slice(stepIdx - 100, stepIdx + 300));
} else {
  // procurar 'passos' no JSX
  const s2 = content.indexOf('estresse.');
  console.log('JSX estresse:', content.slice(s2 - 150, s2 + 250));
}
