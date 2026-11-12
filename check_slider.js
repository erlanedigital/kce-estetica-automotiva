const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Procurar as tags de imagem do carro sujo e limpo
const sujoIdx = content.indexOf('carro_antes_sujo');
console.log('carro_antes_sujo idx:', sujoIdx);
if (sujoIdx !== -1) {
  console.log(content.slice(sujoIdx - 400, sujoIdx + 1200));
}
