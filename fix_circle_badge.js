const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. CORRIGIR A BOLINHA AZUL DA LOGO NO RODAPÉ EXATAMENTE COMO ESTAVA ANTES:
// A imagem do banner grande da oficina que vazou e cobriu o texto veio da variável `bv`.
// A usuária quer: UMA BOLINHA COM A LOGO DA MESMA FORMA QUE ESTAVA A OUTRA (círculo azul redondo h-12 w-12 rounded-full bg-[#0066FF] com a escrita KCL dentro, ou uma bolinha com a logo sem banner gigante vazando).
// Vamos restaurar exatamente a bolinha original que funcionava perfeitamente e nunca quebrava o grid:
// r("span",{className:"h-12 w-12 rounded-full bg-[#0066FF] grid place-items-center font-extrabold text-sm tracking-widest shrink-0",children:"KCL"})
// e o texto ao lado:
// Linha de cima: ESTÉTICA AUTOMOTIVA
// Linha de baixo: MONTES CLAROS

const targetImg = /r\("img",\{src:bv,alt:"Logo Oficial KCL",className:"h-14 w-14 rounded-2xl object-cover shrink-0 ring-1 ring-white\/10"\}\)/g;
const correctBadge = `r("span",{className:"h-12 w-12 rounded-full bg-[#0066FF] grid place-items-center font-extrabold text-sm tracking-widest shrink-0 text-white shadow-md shadow-[#0066FF]/30",children:"KCL"})`;

html = html.replace(targetImg, correctBadge);

// Caso ainda exista alguma outra variação da img bv no footer:
html = html.replace(/r\("img",\{src:bv,alt:"Logo[^"]*",className:"[^"]*"\}\)/g, correctBadge);

// 2. TEXTO AO LADO DA BOLINHA:
// "ESTÉTICA AUTOMOTIVA" na linha de cima e "MONTES CLAROS" na linha de baixo, organizados perfeitamente
const oldSubText = `l("p",{className:"text-[10px] tracking-[.18em] text-[#93A3BC] leading-[1.35]",children:["ESTÉTICA",r("br",{}),"AUTOMOTIVA • MONTES CLAROS"]})`;
const newSubText = `l("p",{className:"text-[10px] tracking-[.18em] text-[#93A3BC] leading-[1.35]",children:[r("span",{className:"block text-white/90 font-bold",children:"ESTÉTICA AUTOMOTIVA"}),r("span",{className:"block text-[#2F9BFF] font-bold mt-0.5",children:"MONTES CLAROS"})]})`;

html = html.replace(oldSubText, newSubText);

// 3. ACESSO AO PAINEL ADM:
// Vamos adicionar uma rota/atalho direto visível e garantido para o ADM no rodapé e no menu:
// Um link discreto "Área Restrita / Painel ADM" no rodapé que abre o modal OU vai pra /admin.html
if (!html.includes('link-admin-footer')) {
  html = html.replace(
    'children:"© 2026 KCL • Montes Claros"',
    'children:["© 2026 KCL • Montes Claros • ", r("a",{href:"/admin.html",className:"hover:text-[#2F9BFF] underline transition link-admin-footer",children:"Painel ADM"})]'
  );
}

// 4. ATUALIZAR VERSÃO DE CACHE BUSTER PARA FORÇAR ATUALIZAÇÃO IMEDIATA NO PWA
const vBust = 'v' + Date.now();
html = html.replace(/kcl-cache-v[a-zA-Z0-9_\-]+/g, 'kcl-cache-' + vBust);

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

let sw = fs.readFileSync('dist/sw.js', 'utf8');
sw = sw.replace(/const CACHE_NAME = [^;]+;/, `const CACHE_NAME = 'kcl-cache-${vBust}';`);
fs.writeFileSync('dist/sw.js', sw, 'utf8');
fs.writeFileSync('sw.js', sw, 'utf8');

console.log('Bolinha restaurada com sucesso e cache atualizado!');
