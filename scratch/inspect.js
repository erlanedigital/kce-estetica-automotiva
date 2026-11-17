const fs = require('fs');
const path = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const content = fs.readFileSync(path, 'utf8');

function findSnippet(query, len = 300) {
  const idx = content.indexOf(query);
  if (idx === -1) {
    console.log('NOT FOUND:', query);
    return;
  }
  console.log('=== FOUND:', query, 'at idx', idx, '===');
  console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + len)));
}

findSnippet('Bf.map');
findSnippet('Reserve seu horário');
findSnippet('Três passos');
findSnippet('localizacao');
findSnippet('experiencia');
findSnippet('kcl-user-perfection');
