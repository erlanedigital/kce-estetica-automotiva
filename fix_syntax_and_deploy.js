const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando correção do erro de sintaxe das aspas duplas...');

let html = fs.readFileSync('index.html', 'utf8');

// Corrigir o erro onde <br class="block"> foi injetado dentro de strings JS
html = html.replace(/<br class=\\"block\\">/g, '\\n');
html = html.replace(/<br class="block">/g, '\\n');

// Vamos verificar se o script agora é 100% válido
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');

console.log('Validando sintaxe do Script React...');
const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
let hasError = false;

scriptTags.forEach((s, idx) => {
  if (s.includes('application/json')) return;
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new Function(code);
    console.log(`Script ${idx + 1}: VÁLIDO ✓`);
  } catch (err) {
    console.error(`ERRO NO SCRIPT ${idx + 1}:`, err.message);
    hasError = true;
  }
});

if (hasError) {
  console.error('Ainda há erro de sintaxe!');
  process.exit(1);
}

console.log('TODOS OS SCRIPTS SÃO 100% VÁLIDOS! Fazendo deploy...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);

console.log('Enviando correção para o GitHub...');
execSync('git add index.html dist/index.html');
execSync('git commit -m "fix: resolve syntax error inside whatsapp template string and eliminate blank screen"');
execSync('git push origin main');
console.log('Sucesso total!');
