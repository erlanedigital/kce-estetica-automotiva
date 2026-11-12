const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando aplicação dos refinamentos solicitados...');

let html = fs.readFileSync('index.html', 'utf8');

// 1. ANTES E DEPOIS - Garantir fotos oficiais definitivas
const dirtyPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456250201_ee4f4c1b.webp';
const cleanPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456249769_95e152c2.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhoto).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhoto).toString('base64');

html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);

// 2. RETIRAR "espaço climatizado" ou "climatizado"
html = html.replace(/•?\s*espaço climatizado/gi, '');
html = html.replace(/•?\s*ambiente climatizado/gi, '');
html = html.replace(/•?\s*sala de espera climatizada/gi, '');
html = html.replace(/climatizado/gi, '');

// 3. ZERO PALAVRAS ÓRFÃS NO SITE TODO + TEXTO JUSTIFICADO NO MOBILE
// Adicionar regra no <style> para balanceamento tipográfico perfeito e prevenção de palavras órfãs
const styleAddition = `
  /* Prevenção universal de palavras órfãs e alinhamento mobile */
  h1, h2, h3, h4, h5, h6, .font-display, .font-elegant {
    text-wrap: balance !important;
  }
  p, dl, dt, dd {
    text-wrap: pretty !important;
  }
  @media (max-width: 640px) {
    p.lead, .prose p, section p:not(.text-center):not(.pill):not(.badge) {
      text-align: justify !important;
      hyphens: auto !important;
    }
    /* Menu mobile abaixo da logo, sem sobreposição */
    header {
      padding-bottom: 0.5rem !important;
    }
    header .mobile-subnav, header nav.overflow-x-auto {
      margin-top: 0.5rem !important;
      position: relative !important;
      top: 0 !important;
      clear: both !important;
    }
  }
`;
html = html.replace('</style>', styleAddition + '\n</style>');

// 4. "Onde estamos em Montes Claros" em 3 linhas perfeitas no mobile
// Linha 1: Onde estamos / Linha 2: em / Linha 3: Montes Claros
html = html.replace(
  /r\("h2",\{className:"text-center font-display[^\"]*",children:r\(kf,\{parts:\[\{text:"Onde estamos em Montes Claros\.",elegant:!0\}\]\}\)\}\)/g,
  `r("h2",{className:"text-center font-display font-extrabold text-[28px] sm:text-[42px] lg:text-[50px] leading-[1.15] tracking-tight mt-3 text-white max-w-sm sm:max-w-none mx-auto",children:[
    r("span",{className:"block",children:"Onde estamos"}),
    r("span",{className:"block text-[#2F9BFF] font-elegant",children:"em Montes Claros."})
  ]})`
);

// 5. RODAPÉ: "Próximo à Praça de Esportes" em uma linha e "Montes Claros - MG" na de baixo
html = html.replace(
  'Próximo à Praça de Esportes • Montes Claros - MG • Segunda a sábado, 8h às 18h',
  'Próximo à Praça de Esportes<br>Montes Claros - MG • Seg a Sáb, 8h às 18h'
);
html = html.replace(
  'Próximo à Praça de Esportes • Montes Claros - MG',
  'Próximo à Praça de Esportes<br>Montes Claros - MG'
);

// 6. GALERIA 100% RESPONSIVA SEM CORTAR PALAVRAS
// Garantir break-words e altura automática sem corte
html = html.replace(
  'className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 items-stretch"',
  'className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 items-stretch break-words"'
);

// 7. Salvar e sincronizar dist/
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhoto));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhoto));

console.log('index.html e dist/ atualizados com sucesso!');

// 8. Deploy Cloudflare
console.log('Executando deploy na Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);
