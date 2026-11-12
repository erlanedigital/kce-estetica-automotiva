const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const scripts = html.split('<script');
for (let i = 1; i < scripts.length; i++) {
  const parts = scripts[i].split('>');
  const tagAttrs = parts[0];
  const code = parts.slice(1).join('>').split('</script>')[0];
  if (tagAttrs.includes('application/json')) {
    console.log('Script ' + i + ' (JSON): Ignorado');
    continue;
  }
  try {
    new Function(code);
    console.log('Script ' + i + ' (<script' + tagAttrs + '>): OK');
  } catch(e) {
    console.log('Script ' + i + ' (<script' + tagAttrs + '>) ERRO: ' + e.message);
  }
}
