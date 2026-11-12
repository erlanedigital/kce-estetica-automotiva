const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const s6Start = html.indexOf('<script type="module">');
const s6End = html.indexOf('</script>\r\n  <script>(function(){function m(a){');
const s6 = html.slice(s6Start + '<script type="module">'.length, s6End);

let idx = 0;
while ((idx = s6.toLowerCase().indexOf('</script', idx)) !== -1) {
  console.log('Encontrado </script em s6 no índice', idx, ':', JSON.stringify(s6.slice(Math.max(0, idx - 30), idx + 30)));
  idx += 8;
}
