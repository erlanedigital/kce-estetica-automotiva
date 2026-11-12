const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const scripts = html.split('<script');

function inspectScript(idx) {
  const parts = scripts[idx].split('>');
  const tag = parts[0];
  const code = parts.slice(1).join('>').split('</script>')[0];
  console.log(`=== SCRIPT ${idx} (${tag}) Length: ${code.length} ===`);
  try {
    new Function(code);
    console.log('Valid syntax!');
  } catch(e) {
    console.log('Error:', e.message);
    const lines = code.split('\n');
    const match = e.stack.match(/<anonymous>:(\d+):(\d+)/);
    if (match) {
      const line = parseInt(match[1]);
      console.log('At line ' + line + ':');
      for (let i = Math.max(0, line - 5); i < Math.min(lines.length, line + 5); i++) {
        console.log((i+1) + ': ' + lines[i]);
      }
    } else {
      console.log('Stack:', e.stack);
      console.log('First 500 chars:\n', code.slice(0, 500));
    }
  }
}

inspectScript(6);
inspectScript(7);
