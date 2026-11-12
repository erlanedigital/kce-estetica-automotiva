const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>', s6Idx);
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

console.log('Tamanho real do módulo React:', s6.length);

const vm = require('vm');
try {
  new vm.SourceTextModule(s6);
  console.log('SourceTextModule parse: SUCESSO COMPLETO!');
} catch (e) {
  console.log('Module Error:', e);
}
