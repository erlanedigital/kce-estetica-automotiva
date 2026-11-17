const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

function searchMatches(pattern, label) {
  console.log(`=== Matches for ${label} ===`);
  const regex = new RegExp(pattern, 'gi');
  let m;
  let count = 0;
  while ((m = regex.exec(html)) !== null && count < 5) {
    console.log(`Index ${m.index}:`);
    console.log(html.substring(Math.max(0, m.index - 50), Math.min(html.length, m.index + 200)));
    count++;
  }
}

searchMatches('passos', 'passos');
searchMatches('corrida', 'corrida');
searchMatches('localizacao', 'localizacao');
searchMatches('agendar', 'agendar');
