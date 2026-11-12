const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

// Como test_scripts.js faz:
// const scripts = html.split('<script');
// const parts = scripts[i].split('>');
// const tagAttrs = parts[0];
// const code = parts.slice(1).join('>').split('</script>')[0];

// Se houver um "</script>" LITERAL DENTRO DE UMA STRING JS (ex: html.indexOf("</script>") ou similar dentro do bundle React),
// o split('</script>')[0] vai truncar o código no meio da string!
// Por isso Script 6 termina prematuramente e Script 7 começa com o resto da string: <\/script>",n=n.removeChild...

console.log('Verificando se o bundle React contém "</script>" dentro de strings...');
const s6Start = html.indexOf('<script type="module">');
const s6End = html.indexOf('</script>\r\n  <script>(function(){function m(a){');
console.log('s6Start:', s6Start, 's6End:', s6End);

const realS6 = html.slice(s6Start + '<script type="module">'.length, s6End);
console.log('Tamanho real do script type="module":', realS6.length);

try {
  new Function(realS6);
  console.log('REAL SCRIPT TYPE="MODULE": 100% VÁLIDO E PERFEITO!');
} catch (e) {
  console.log('Erro no realS6:', e.message);
}
