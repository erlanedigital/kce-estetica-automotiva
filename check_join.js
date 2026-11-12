const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

// O script 6 e 7 foram separados incorretamente por um "</script>" que fazia parte de uma string dentro do código React!
// Observe o início de Script 7: "<\/script>",n=n.removeChild(n.firstChild))...
// Isso significa que dentro do código existia algo como "<script ... <\/script>" que foi cortado por </script>!

console.log('Verificando a junção entre Script 6 e 7...');
// Vamos ver o que tem no final do Script 6 e começo do Script 7 no html bruto
const pos = html.indexOf('<\/script>",n=n.removeChild');
console.log('Posição encontrada:', pos);
if (pos !== -1) {
  console.log('Trecho ao redor:', html.slice(pos - 50, pos + 50));
}
