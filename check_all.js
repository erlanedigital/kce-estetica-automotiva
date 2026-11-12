const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// 1. Procurar onde tem palavra com "médic" ou "doutor"
const matches = [];
let idx = 0;
while (true) {
  const m = content.toLowerCase().indexOf('médic', idx);
  if (m === -1) break;
  matches.push(content.slice(Math.max(0, m - 80), m + 80));
  idx = m + 5;
}
console.log('Matches médice:', matches);

// 2. Procurar no minijogo a descrição e os elementos visuais
const corridaIdx = content.indexOf('id:"corrida"');
console.log('--- MINIJOGO CORRIDA ---');
console.log(content.slice(corridaIdx, corridaIdx + 1500));

// 3. Olhar a galeria: o usuário mandou print dos 3 cards da galeria com o texto:
// "Fotos reais dos nossos serviços de vitrificação cerâmica, polimento técnico, higienização detalhada e acabamento de estúdio em Montes Claros."
// E no mobile os cards ou imagens estão com problemas de altura ou cortando.
const galeriaIdx = content.indexOf('Fotos reais dos nossos serviços');
console.log('--- GALERIA / SERVIÇOS ---');
if (galeriaIdx !== -1) {
  console.log(content.slice(galeriaIdx - 200, galeriaIdx + 2000));
}
