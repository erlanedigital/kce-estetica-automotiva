const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// 1. Onde está "Três passos, zero estresse" ou similar?
const idxPassos = content.indexOf('Três');
const idxPassos2 = content.indexOf('passos');
console.log('Passos idx:', idxPassos, idxPassos2);
if (idxPassos !== -1) {
  console.log('--- TRECHO TRÊS PASSOS ---');
  console.log(content.slice(idxPassos - 50, idxPassos + 300));
}

// 2. Galeria:
const galeriaIdx = content.indexOf('Fotos reais dos nossos serviços');
if (galeriaIdx !== -1) {
  console.log('--- GALERIA ---');
  console.log(content.slice(galeriaIdx - 50, galeriaIdx + 500));
}

// 3. Minijogo corrida:
const corridaIdx = content.indexOf('id:"corrida"');
if (corridaIdx !== -1) {
  console.log('--- CORRIDA ---');
  console.log(content.slice(corridaIdx - 50, corridaIdx + 600));
}
