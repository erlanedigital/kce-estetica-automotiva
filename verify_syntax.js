const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total de scripts:', scriptTags.length);

scriptTags.forEach((s, idx) => {
  if (s.includes('src=')) return;
  if (s.includes('application/json')) return;
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new Function(code);
    console.log(`Script ${idx + 1}: SINTAXE VÁLIDA (tamanho: ${code.length})`);
  } catch (err) {
    console.error(`ERRO NO SCRIPT ${idx + 1}:`, err.message);
  }
});
