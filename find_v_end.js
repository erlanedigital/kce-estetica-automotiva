const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const vStart = content.indexOf('Y==="visão"&&l("div"');
console.log('vStart:', vStart);
if (vStart !== -1) {
  // procurar quais blocos Y=== aparecem depois
  const after = content.slice(vStart, vStart + 25000);
  const re = /Y===(\"[^\"]+\")/g;
  let m;
  while ((m = re.exec(after)) !== null) {
    console.log('Encontrado tab:', m[1], 'em offset:', m.index);
  }
}
