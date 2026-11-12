const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Procurar onde tem "Agendar" ou botões de agendamento
const re = /Agendar/gi;
let m;
let matches = [];
while ((m = re.exec(content)) !== null) {
  matches.push({ idx: m.index, snippet: content.slice(Math.max(0, m.index - 50), m.index + 120).replace(/\n/g, ' ') });
  if (matches.length > 15) break;
}
matches.forEach((item, i) => console.log(i, item.idx, item.snippet));
