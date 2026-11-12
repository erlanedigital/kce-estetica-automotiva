const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando aplicação dos ajustes refinados...');

let html = fs.readFileSync('index.html', 'utf8');

// 1. ANTES E DEPOIS - Fotos oficiais enviadas pela usuária
const dirtyPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456250201_ee4f4c1b.webp';
const cleanPhoto = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794456249769_95e152c2.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhoto).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhoto).toString('base64');

html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);

// 2. REMOVER O BANNER FLUTUANTE DO PWA
// Em vez de banner na tela toda, remove o banner fixo e mantém apenas suporte nativo e no menu
html = html.replace(/<!-- PWA INSTALL FLOATING BUTTON & BANNER -->[\s\S]*?<\/div>\s*<\/div>/g, '');
html = html.replace(/id="pwa-install-banner"[^>]*>[\s\S]*?<\/div>/g, '');

// Se já estiver em modo standalone (PWA instalado), esconde qualquer botão de instalação
const pwaHideScript = `
<script>
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    document.querySelectorAll('.pwa-install-trigger').forEach(el => el.style.display = 'none');
  }
</script>
`;
if (!html.includes('display-mode: standalone')) {
  html = html.replace('</body>', pwaHideScript + '\n</body>');
}

// 3. REMOVER QUALQUER REFERÊNCIA A "CLIMATIZADO" (mantendo Wi-Fi e Café Expresso)
html = html.replace(/•?\s*espaço climatizado/gi, '');
html = html.replace(/•?\s*ambiente climatizado/gi, '');
html = html.replace(/•?\s*sala climatizada/gi, '');
html = html.replace(/•?\s*climatizado/gi, '');

// 4. CORREÇÃO DO HEADER E SUB-MENU MOBILE (NUNCA FICAR EM CIMA DA LOGO)
const headerFixStyle = `
<style>
  /* Header mobile blindado contra sobreposição */
  @media (max-width: 768px) {
    header#header {
      position: sticky !important;
      top: 0 !important;
      z-index: 50 !important;
      padding-top: 0.75rem !important;
      padding-bottom: 0.75rem !important;
      background: #050B1A !important;
    }
    header .mobile-logo-row {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      width: 100% !important;
      position: relative !important;
      z-index: 10 !important;
    }
    /* Sub-menu mobile estritamente abaixo da logo com espaço generoso */
    header nav.mobile-subnav, header nav.overflow-x-auto, header .overflow-x-auto {
      display: flex !important;
      width: 100% !important;
      margin-top: 0.75rem !important;
      padding-top: 0.35rem !important;
      padding-bottom: 0.35rem !important;
      position: static !important;
      clear: both !important;
    }
    /* Corpo de textos justificado no mobile com boa legibilidade */
    p.lead, section p:not(.text-center):not(.pill):not(.badge) {
      text-align: justify !important;
      hyphens: auto !important;
    }
  }
  /* Prevenção universal de palavras órfãs */
  h1, h2, h3, h4, h5, h6, .font-display, .font-elegant {
    text-wrap: balance !important;
  }
  p, dl, dt, dd {
    text-wrap: pretty !important;
  }
</style>
`;
if (!html.includes('Header mobile blindado contra sobreposição')) {
  html = html.replace('</head>', headerFixStyle + '\n</head>');
}

// 5. ONDE ESTAMOS EM MONTES CLAROS EM 3 LINHAS NO MOBILE
html = html.replace(
  /r\("h2",\{className:"text-center font-display font-extrabold text-\[\d+px\][^\"]*",children:\[[^\]]+\]\}\)/g,
  `r("h2",{className:"text-center font-display font-extrabold text-[26px] sm:text-[38px] lg:text-[48px] leading-tight tracking-tight mt-3 text-white max-w-xs sm:max-w-none mx-auto",children:[
    r("span",{className:"block",children:"Onde estamos"}),
    r("span",{className:"block text-[#2F9BFF] font-elegant",children:"em Montes Claros."})
  ]})`
);

// 6. RODAPÉ: "Próximo à Praça de Esportes" em uma linha e "Montes Claros - MG" na de baixo
html = html.replace(
  /Próximo à Praça de Esportes[^\<]*Montes Claros - MG/gi,
  'Próximo à Praça de Esportes<br class="block">Montes Claros - MG'
);

// 7. Salvar e sincronizar dist/
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhoto));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhoto));

console.log('index.html e dist/ sincronizados com sucesso.');

// 8. Deploy Cloudflare
console.log('Executando deploy na Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);
