const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Ver o trecho completo da galeria
const gIdx = content.indexOf('id:"galeria"');
if (gIdx !== -1) {
  console.log('--- SEÇÃO GALERIA ---');
  console.log(content.slice(gIdx - 50, gIdx + 2000));
}

// Ver o trecho de "Três passos"
const tIdx = content.indexOf('Três passos');
if (tIdx !== -1) {
  console.log('--- TRÊS PASSOS ---');
  console.log(content.slice(tIdx - 200, tIdx + 400));
}
