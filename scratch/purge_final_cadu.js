const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const p = html.indexOf('{name:"Cadu",role:"Gestão / Caixa"');
console.log('pos:', p);
if (p !== -1) {
  const pStart = html.lastIndexOf('if(!u?.records?.length)', p);
  const pEnd = html.indexOf(')))', p);
  console.log('Target snippet:', html.substring(pStart, pEnd + 3));
  html = html.substring(0, pStart) + '/* partner seed disabled */' + html.substring(pEnd + 3);
  fs.writeFileSync('index.html', html, 'utf8');
  fs.writeFileSync('dist/index.html', html, 'utf8');
  console.log('Purged final Cadu occurrence.');
}
