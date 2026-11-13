const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. RODAPÉ: Substituir o círculo azul com texto "KCL" pela imagem oficial da logo `bv`
// Estava: r("span",{className:"h-12 w-12 rounded-full bg-[#0066FF] grid place-items-center font-extrabold text-sm tracking-widest shrink-0",children:"KCL"})
// e o texto com "ESTÉTICA" e "AUTOMOTIVA • MONTES CLAROS"
// Ajustar para imagem da logo oficial + "ESTÉTICA AUTOMOTIVA" em cima e "MONTES CLAROS" embaixo!

const oldFooterLogo = `r("span",{className:"h-12 w-12 rounded-full bg-[#0066FF] grid place-items-center font-extrabold text-sm tracking-widest shrink-0",children:"KCL"}),l("div",{children:[r("p",{className:"font-extrabold tracking-wide text-lg",children:"KCL"}),l("p",{className:"text-[10px] tracking-[.18em] text-[#93A3BC] leading-[1.35]",children:["ESTÉTICA",r("br",{}),"AUTOMOTIVA • MONTES CLAROS"]})`;

const newFooterLogo = `r("img",{src:bv,alt:"Logo Oficial KCL",className:"h-14 w-14 rounded-2xl object-cover shrink-0 ring-1 ring-white/10"}),l("div",{children:[r("p",{className:"font-extrabold tracking-wide text-lg text-white",children:"KCL"}),l("p",{className:"text-[11px] tracking-[.15em] text-[#93A3BC] leading-tight font-semibold",children:[r("span",{className:"block text-white/90",children:"ESTÉTICA AUTOMOTIVA"}),r("span",{className:"block text-[#2F9BFF] mt-0.5",children:"MONTES CLAROS"})]})]`;

if (html.includes(oldFooterLogo)) {
  html = html.replace(oldFooterLogo, newFooterLogo);
  console.log('Logo e textos do rodapé substituídos perfeitamente!');
} else {
  // Substitui os textos de ESTÉTICA AUTOMOTIVA / MONTES CLAROS no rodapé
  html = html.replace(
    'children:["ESTÉTICA",r("br",{}),"AUTOMOTIVA • MONTES CLAROS"]',
    'children:[r("span",{className:"block text-white/90 font-bold",children:"ESTÉTICA AUTOMOTIVA"}),r("span",{className:"block text-[#2F9BFF] font-bold mt-0.5",children:"MONTES CLAROS"})]'
  );
  html = html.replace(
    'r("span",{className:"h-12 w-12 rounded-full bg-[#0066FF] grid place-items-center font-extrabold text-sm tracking-widest shrink-0",children:"KCL"})',
    'r("img",{src:bv,alt:"Logo Oficial KCL",className:"h-14 w-14 rounded-2xl object-cover shrink-0 ring-1 ring-white/10"})'
  );
  console.log('Substituição granular do rodapé realizada!');
}

// 2. Incrementar cache do Service Worker
const vNow = 'v-' + Date.now();
html = html.replace(/kcl-cache-v[a-zA-Z0-9_\-]+/g, 'kcl-cache-' + vNow);

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

let sw = fs.readFileSync('dist/sw.js', 'utf8');
sw = sw.replace(/const CACHE_NAME = [^;]+;/, `const CACHE_NAME = 'kcl-cache-${vNow}';`);
fs.writeFileSync('dist/sw.js', sw, 'utf8');
fs.writeFileSync('sw.js', sw, 'utf8');

console.log('Tudo concluído!');
