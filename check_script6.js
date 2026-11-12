const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Script 6 tag:');
if (scriptTags[5]) {
  console.log(scriptTags[5].slice(0, 300));
  if (scriptTags[5].includes('src=')) {
    console.log('Script 6 tem src!');
  }
}

// Vamos testar especificamente o script que contém o React App
scriptTags.forEach((s, idx) => {
  if (s.includes('ReactDOM') || s.includes('React.') || s.includes('admin-shell')) {
    console.log(`Script ${idx + 1} contém React. Testando sintaxe...`);
    const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      new Function(code);
      console.log(`Script ${idx + 1} é 100% VÁLIDO.`);
    } catch (e) {
      console.error(`ERRO DE SINTAXE NO SCRIPT ${idx + 1}:`, e.message);
    }
  }
});
