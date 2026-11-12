const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// 1. Procurar frase do GPS
const phrase = 'Venha nos visitar no bairro São José';
const idx = content.indexOf(phrase);
console.log('GPS frase idx:', idx);
if (idx !== -1) {
  console.log('--- ENTORNO GPS ---');
  console.log(content.slice(idx - 120, idx + phrase.length + 120));
}

// 2. Procurar o form de agendamento do cliente
const formIdx = content.indexOf('HORÁRIO');
const formIdx2 = content.indexOf('horario');
const formIdx3 = content.indexOf('DATA');
console.log('Form indices:', formIdx, formIdx2, formIdx3);
if (formIdx !== -1) {
  console.log('--- ENTORNO HORÁRIO ---');
  console.log(content.slice(formIdx - 200, formIdx + 800));
}
