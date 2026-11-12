const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// 1. Achar onde tem fotos de Antes e Depois
const re = /https:\/\/images\.unsplash\.com\/photo-1601362840469-51e4d8d58785/g;
let m;
let count = 0;
while ((m = re.exec(content)) !== null) {
  count++;
  console.log(`Match ${count} at ${m.index}:`);
  console.log(content.slice(Math.max(0, m.index - 200), m.index + 400));
}

// Procurar se há outra ocorrência de antes e depois na página pública
const re2 = /antes/gi;
const publicMatches = [];
let idx = 0;
while ((idx = content.indexOf('antes', idx)) !== -1) {
  if (idx < 150000) { // trecho HTML / CSS inicial
    // ignore
  } else {
    const snippet = content.slice(Math.max(0, idx - 50), idx + 100);
    if (snippet.includes('depois') || snippet.includes('Depois') || snippet.includes('img') || snippet.includes('slider')) {
      console.log('Public antes/depois at ' + idx + ': ' + snippet.replace(/\n/g, ' '));
    }
  }
  idx += 5;
}
