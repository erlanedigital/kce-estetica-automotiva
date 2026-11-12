const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando atualização completa e definitiva...');

const dirtyPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456250201_ee4f4c1b.webp';
const cleanPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456249769_95e152c2.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhoto).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhoto).toString('base64');

console.log('Foto suja (ANTES) lida:', dirtyB64.length, 'bytes');
console.log('Foto limpa (DEPOIS) lida:', cleanB64.length, 'bytes');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Substituir com precisão no código as variáveis xv (Antes) e jv (Depois)
html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);

// 2. Ajustar o texto do rodapé para:
// Linha 1: ESTÉTICA AUTOMOTIVA
// Linha 2: MONTES CLAROS - MG
html = html.replace(
  '["ESTÉTICA",r("br",{}),"AUTOMOTIVA • MONTES CLAROS"]',
  '["ESTÉTICA AUTOMOTIVA",r("br",{}),"MONTES CLAROS - MG"]'
);
html = html.replace(
  'children:["ESTÉTICA",r("br",{}),"AUTOMOTIVA • MONTES CLAROS"]',
  'children:["ESTÉTICA AUTOMOTIVA",r("br",{}),"MONTES CLAROS - MG"]'
);

// 3. Centralizar o menu de navegação do topo entre a logo e o botão Agendar
// Header: flex items-center justify-between -> colocar nav com mx-auto flex-1 justify-center
html = html.replace(
  'className:"hidden md:flex items-center gap-6 text-[15px] font-medium"',
  'className:"hidden md:flex flex-1 justify-center items-center gap-8 text-[15px] font-semibold tracking-wide mx-auto"'
);

// 4. Salvar arquivos e sincronizar dist/
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhoto));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhoto));

console.log('Sincronização com dist/ concluída!');

// 5. Deploy no Cloudflare Worker
console.log('Executando deploy na Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);
