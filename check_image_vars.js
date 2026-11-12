const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
const nextScriptEnd = html.indexOf('</script>\r\n  <script>(function(){function m(a){');
const s6 = html.slice(s6Idx + s6Tag.length, nextScriptEnd);

// Procurar onde estão xv e jv (as fotos do antes e depois)
const m = s6.match(/src:([a-zA-Z0-9_$]+),alt:"Carro sujo/);
if (m) {
  console.log('Var antes:', m[1]);
  const varBefore = m[1];
  const idx = s6.indexOf(`var ${varBefore}=`);
  if (idx !== -1) {
    console.log(s6.slice(idx, idx + 80));
  }
}

const m2 = s6.match(/src:([a-zA-Z0-9_$]+),alt:"O mesmo carro/);
if (m2) {
  console.log('Var depois:', m2[1]);
  const varAfter = m2[1];
  const idx2 = s6.indexOf(`var ${varAfter}=`);
  if (idx2 !== -1) {
    console.log(s6.slice(idx2, idx2 + 80));
  }
}
