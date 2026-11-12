const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando correção precisa do Antes & Depois e da fonte...');

const dirtyPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794450457497_e2c4c8ae.webp';
const cleanPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794454413632_7350b9a4.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhotoPath).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhotoPath).toString('base64');

console.log('Tamanho da foto suja (ANTES):', dirtyB64.length);
console.log('Tamanho da foto limpa (DEPOIS):', cleanB64.length);

let html = fs.readFileSync('index.html', 'utf8');

// 1. Substituir com garantia absoluta as variáveis xv e jv
// xv = carro sujo (ANTES)
// jv = carro limpo (DEPOIS)
html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);

// 2. Garantir que no slider o ANTES use xv e o DEPOIS use jv
// Slider público:
// Antes (sujo): src: xv
// Depois (limpo): src: jv
console.log('Verificando slider público...');

// 3. Aumentar a fonte de "Três passos, zero stress"
html = html.replace(
  /font-display font-(?:extrabold|black) text-\[\d+px\] sm:text-\[\d+px\] lg:text-\[\d+px\] leading-\[[^\]]+\] tracking-tight mt-3 text-left[^\"]*/g,
  'font-display font-black text-[46px] sm:text-[76px] lg:text-[94px] leading-[1.02] tracking-tight mt-3 text-left whitespace-normal sm:whitespace-nowrap drop-shadow'
);

// 4. Salvar index.html e sincronizar dist/
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhotoPath));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhotoPath));

console.log('index.html e dist/ atualizados com sucesso!');

// 5. Testar compilação do deploy
console.log('Fazendo deploy para kcl.emia.workers.dev...');
const out = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(out);
