const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('scratch/perfect_clean_index.html', 'utf8');

// 1. Marquee container padding update: py-3.5 -> py-6 sm:py-7
const oldMarquee = 'r-[var(--line)] bg-[#0A1633] py-3.5",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[r("span",{className:"pr-4 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-4 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "})]})';

const newMarquee = 'r-[var(--line)] bg-[#0A1633] py-6 sm:py-7",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "})]})';

if (html.includes(oldMarquee)) {
  html = html.replace(oldMarquee, newMarquee);
  console.log('✓ Successfully updated marquee with py-6 sm:py-7 and 6 seamless spans!');
} else {
  console.log('Searching for marquee substring...');
  const mPos = html.indexOf('marquee-track');
  console.log('Around marquee:', html.substring(mPos - 80, mPos + 250));
}

// 2. Injected CSS for all layout requirements
const perfectionStyle = `
<style id="kcl-user-perfection">
  /* =========================================================
     🌟 KCL ESTÉTICA AUTOMOTIVA - LAYOUT & PERFORMANCE PERFECTION
     ========================================================= */

  /* 1. CABEÇALHO COM ALTURA REDUZIDA E RESPIRO PEQUENO ANTES DO INÍCIO DA PÁGINA */
  header, #header, [role="banner"] {
    min-height: 56px !important;
    max-height: 64px !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  @media (min-width: 1024px) {
    header, #header, [role="banner"] {
      min-height: 60px !important;
      max-height: 66px !important;
      margin-bottom: 14px !important;
    }
  }

  /* 2. FAIXA MARQUEE: ESPAÇAMENTO EQUILIBRADO & ANIMAÇÃO CONTÍNUA */
  @keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  .marquee-track {
    display: flex !important;
    width: max-content !important;
    will-change: transform !important;
    animation: marquee 24s linear infinite !important;
  }
  .marquee-track:hover {
    animation-play-state: paused !important;
  }

  /* 3. EXPERIÊNCIA: REDUÇÃO DO ESPAÇO EM VOLTA (ZERO VAZIOS) */
  #experiencia,
  section[id*="experiencia"] {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }

  /* 4. ESPAÇAMENTO HARMÔNICO EM TODOS OS TÍTULOS E SUBTÍTULOS (DESKTOP) */
  @media (min-width: 1024px) {
    section header p:first-child,
    section .section-tag,
    section [class*="tracking-widest"] {
      margin-bottom: 0.85rem !important;
    }
    section header h2,
    section h2 {
      margin-bottom: 1.15rem !important;
      line-height: 1.15 !important;
    }
    section header p:last-child,
    section h2 + p {
      margin-bottom: 2.75rem !important;
      line-height: 1.6 !important;
    }
  }

  /* 5. CARDS DE LOCALIZAÇÃO COM A MESMA ALTURA EXATA */
  #localizacao .grid > div,
  #localizacao .grid > article {
    min-height: 520px !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }

  /* 6. COLUNAS DO RODAPÉ (FOOTER) BALANCEADAS */
  @media (min-width: 1024px) {
    footer .grid,
    footer [class*="grid"] {
      grid-template-columns: 1.15fr 1.35fr 1.1fr !important;
      gap: 3.5rem !important;
    }
  }
</style>
`;

// Remove any existing kcl-user-perfection style to avoid duplicates
html = html.replace(/<style id="kcl-user-perfection">[\s\S]*?<\/style>/gi, '');

// Insert right before </head>
html = html.replace('</head>', perfectionStyle + '\n</head>');

// 3. Validate syntax
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed successfully with ZERO ERRORS!');
} catch (err) {
  console.error('❌ Babel error:', err.message, err.loc);
  process.exit(1);
}

try {
  new Function(bigScript);
  console.log('🎉 new Function executed successfully with ZERO ERRORS!');
} catch (err) {
  console.error('❌ new Function error:', err);
  process.exit(1);
}

// 4. Save to index.html and dist/index.html
fs.writeFileSync('index.html', html, 'utf8');
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
fs.writeFileSync('dist/index.html', html, 'utf8');

console.log('🎉 Complete! File written to index.html and dist/index.html!');
