const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

function findSection(id) {
  const target = `id:"${id}"`;
  const pos = html.indexOf(target);
  console.log(`\n=================== ${target} (pos: ${pos}) ===================`);
  if (pos !== -1) {
    console.log(html.substring(pos, pos + 1000));
  }
}

findSection('passos');
findSection('corrida');
findSection('localizacao');
findSection('agendar');
