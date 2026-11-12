const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

// Parse real dos scripts respeitando <script ...> ... </script>
let pos = 0;
let scriptNum = 1;
while ((pos = html.indexOf('<script', pos)) !== -1) {
  const openEnd = html.indexOf('>', pos);
  const tagHeader = html.slice(pos, openEnd + 1);
  const closeIdx = html.indexOf('</script>', openEnd);
  if (closeIdx === -1) {
    console.log(`Script ${scriptNum} (${tagHeader}): SEM FECHAMENTO!`);
    break;
  }
  const code = html.slice(openEnd + 1, closeIdx);
  if (tagHeader.includes('application/json')) {
    console.log(`Script ${scriptNum} (${tagHeader}): JSON (Length: ${code.length})`);
  } else {
    try {
      new Function(code);
      console.log(`Script ${scriptNum} (${tagHeader}): OK (Length: ${code.length})`);
    } catch(e) {
      console.log(`Script ${scriptNum} (${tagHeader}) ERRO: ${e.message} (Length: ${code.length})`);
    }
  }
  scriptNum++;
  pos = closeIdx + '</script>'.length;
}
