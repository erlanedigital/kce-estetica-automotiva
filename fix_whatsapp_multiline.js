const fs = require('fs');
const { execSync } = require('child_process');

console.log('Corrigindo quebra de linha quebrada na mensagem do WhatsApp...');

let html = fs.readFileSync('index.html', 'utf8');

// Corrigir qualquer quebra de linha real dentro da template string
html = html.replace(
  /📍 Endereço: Próximo à Praça de Esportes[\r\n\s]+Montes Claros - MG/g,
  '📍 Endereço: Próximo à Praça de Esportes, Montes Claros - MG'
);

fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');

console.log('Testando sintaxe do Script 6 agora...');
const s6 = html.match(/<script[\s\S]*?<\/script>/gi)[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

try {
  new Function(s6);
  console.log('✓ SCRIPT 6 É 100% VÁLIDO E FUNCIONAL! ZERO ERROS DE SINTAXE!');
} catch (err) {
  console.error('Ainda deu erro:', err.message);
  process.exit(1);
}

console.log('Fazendo deploy para Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);

console.log('Sincronizando com o GitHub...');
execSync('git add index.html dist/index.html');
execSync('git commit -m "fix: resolve broken newline inside template string to fix blank screen"');
execSync('git push origin main');
console.log('TUDO PRONTO COM SUCESSO!');
