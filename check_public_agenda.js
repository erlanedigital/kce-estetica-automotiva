const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const agIdx = content.indexOf('id:"agendamento"');
console.log('Agendamento section idx:', agIdx);
if (agIdx !== -1) {
  console.log(content.slice(agIdx, agIdx + 3000));
}
