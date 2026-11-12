const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

console.log('Includes Praca de Esportes:', html.includes('Praça de Esportes'));
console.log('Includes Montes Claros:', html.includes('Montes Claros'));
console.log('Includes Onde estamos:', html.includes('Onde estamos') || html.includes('ONDE ESTAMOS'));
console.log('Includes Agendar Servico:', html.includes('Agendar Serviço'));
console.log('Includes Agendar Avaliacao:', html.includes('Agendar Avaliação'));

// Vamos achar a seção de localização / contato
let pos = html.indexOf('Praça de Esportes');
while (pos !== -1) {
  console.log('--- Ocorrência em', pos, '---');
  console.log(html.slice(Math.max(0, pos - 150), pos + 150));
  pos = html.indexOf('Praça de Esportes', pos + 1);
}
