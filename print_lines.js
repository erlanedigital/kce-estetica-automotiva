const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>', s6Idx);
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

const lines = s6.split('\n');
console.log('Linhas 195 a 215:');
for (let i = 194; i < Math.min(lines.length, 215); i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
