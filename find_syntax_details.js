const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const s6 = scriptTags[5];
const code = s6.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

// Achar todas as ocorrências de Y==="visão"
let pos = 0;
while ((pos = code.indexOf('Y==="visão"', pos)) !== -1) {
  console.log('Ocorrência em:', pos);
  console.log(code.slice(pos, pos + 200));
  pos += 11;
}

// Vamos testar o erro com vm ou babylon/acorn se disponível, ou testar pedaços
const vm = require('vm');
try {
  new vm.Script(code);
} catch (e) {
  console.log('Linha/Coluna do erro:', e.stack.slice(0, 300));
}
