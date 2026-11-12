const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>', s6Idx);
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

// Binary search para encontrar a linha ou caractere com erro de sintaxe
// Dividimos em prefixos válidos
const lines = s6.split('\n');
console.log('Total lines:', lines.length);

let low = 1, high = lines.length;
// Como um prefixo incompleto quase sempre dá erro de sintaxe (como Unexpected end of input),
// vamos usar esprima ou acorn se disponível, ou inspecionar as linhas recentemente modificadas!

// Quais linhas foram modificadas?
// Sabemos que o erro foi em volta de `let cPhone` ou `Aureon` ou no componente admin!
lines.forEach((line, idx) => {
  if (line.includes('cPhone') || line.includes('Definir Per') || line.includes('lucroBruto') || line.includes('Lucro Bruto')) {
    console.log(`Candidate line ${idx + 1}: ${line.slice(0, 100)}...`);
  }
});
