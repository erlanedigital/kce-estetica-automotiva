const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Forçar .rise-line a não quebrar (nowrapGroups: !0) ou CSS whitespace-nowrap incondicional
// Vejamos a chamada kf em Onde estamos:
// Atual:
// r("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[46px] tracking-tight mt-3 whitespace-normal sm:whitespace-nowrap",children:r(kf,{parts:[{text:"Onde estamos em "},{text:"Montes Claros.",elegant:!0}]})})

const oldH2 = 'r("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[46px] tracking-tight mt-3 whitespace-normal sm:whitespace-nowrap",children:r(kf,{parts:[{text:"Onde estamos em "},{text:"Montes Claros.",elegant:!0}]})})';

// Passar nowrapGroups: !0 para kf e classes rígidas:
const newH2 = 'r("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight mt-3 whitespace-nowrap",children:r(kf,{nowrapGroups:!0,className:"whitespace-nowrap",parts:[{text:"Onde estamos em "},{text:"Montes Claros.",elegant:!0}]})})';

if (html.includes(oldH2)) {
  html = html.replace(oldH2, newH2);
  console.log('✓ H2 Onde estamos substituído com nowrapGroups: !0 e whitespace-nowrap!');
} else {
  console.log('Tentando replace regex...');
  const m = html.match(/r\("h2",\{className:"font-display font-extrabold[^"]*mt-3[^"]*",children:r\(kf,\{parts:\[\{text:"Onde estamos em "\},\{text:"Montes Claros\."[^}]*\}\]\}\)\}\)/);
  if (m) {
    html = html.replace(m[0], newH2);
    console.log('✓ H2 Onde estamos substituído via regex!');
  }
}

// Injetar regra CSS global para .rise-line dentro de h2 não quebrar quando for título de uma linha
const titleNowrapCss = `
  /* TÍTULOS DE LINHA ÚNICA SEM QUEBRA DE LINHA OU PALAVRA ÓRFÃ */
  h2.whitespace-nowrap .rise-line,
  h2.whitespace-nowrap .rise-title,
  .whitespace-nowrap .rise-line {
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
  }
`;

if (html.includes('</style>')) {
  html = html.replace('</style>', titleNowrapCss + '\n</style>');
  console.log('✓ CSS de nowrap rígido injetado!');
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Salvo com sucesso.');
