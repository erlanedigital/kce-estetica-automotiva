const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>', s6Idx);
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

const lines = s6.split('\n');
console.log('Linha 198 a 201 detalhado:');
for (let i = 197; i <= 201; i++) {
  console.log(`[L${i+1}] ${lines[i].slice(lines[i].length - 300)}`);
}
