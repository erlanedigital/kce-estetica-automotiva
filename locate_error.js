const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>', s6Idx);
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

// Vamos encontrar onde está o erro usando o parser acorn ou esprima ou sintaxe simples
try {
  // Teste com Function retirando export/import se houver
  // Não tem imports porque é bundle montado
  new Function(s6);
} catch(e) {
  console.log('Error message:', e.message);
  console.log('Stack:', e.stack);
}
