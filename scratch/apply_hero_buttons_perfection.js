const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Locate the hero buttons in React markup
const targetStart = 'l("div",{className:"mt-7 flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-start",children:[';
const pos = html.indexOf(targetStart);
console.log('Target start found:', pos);

if (pos === -1) {
  console.error('ERROR: targetStart not found!');
  process.exit(1);
}

const targetEndStr = 'children:["Ver Serviços ",r(xu,{size:18})]})})]})';
const endPos = html.indexOf(targetEndStr, pos);
console.log('Target end found:', endPos);

if (endPos === -1) {
  console.error('ERROR: targetEndStr not found!');
  process.exit(1);
}

const fullOriginalBlock = html.substring(pos, endPos + targetEndStr.length);

// Replace with standardized and enlarged markup:
const replacementBlock = 'l("div",{className:"mt-8 flex flex-col sm:flex-row gap-3.5 items-center justify-center sm:justify-start w-full",children:[' +
  'r(G5,{className:"w-full sm:w-auto flex justify-center",children:l("a",{href:"#agendar",className:"hero-action-btn pill w-full sm:w-auto min-w-[230px] h-[58px] sm:h-[60px] px-8 py-4 font-extrabold text-[15.5px] sm:text-[16px] uppercase tracking-wider inline-flex items-center gap-2.5 justify-center text-center bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-xl shadow-[#0066FF]/40 hover:scale-[1.02] transition-all",children:[r(su,{size:20})," AGENDAR SERVIÇO"]})}),' +
  'r(G5,{className:"w-full sm:w-auto flex justify-center",children:l("a",{href:"#corrida",className:"hero-action-btn pill w-full sm:w-auto min-w-[230px] h-[58px] sm:h-[60px] px-8 py-4 font-extrabold text-[15.5px] sm:text-[16px] uppercase tracking-wider inline-flex items-center gap-2.5 justify-center text-center border-2 border-[#2F9BFF]/45 hover:border-[#2F9BFF] text-white bg-[#0A1633]/70 hover:bg-[#2F9BFF]/20 backdrop-blur-md shadow-lg transition-all",children:[r(et,{size:20})," JOGAR KCL GP"]})}),' +
  'r(G5,{className:"w-full sm:w-auto flex justify-center",children:l("a",{href:"#servicos",className:"hero-action-btn pill w-full sm:w-auto min-w-[230px] h-[58px] sm:h-[60px] px-8 py-4 font-extrabold text-[15.5px] sm:text-[16px] uppercase tracking-wider inline-flex items-center gap-2.5 justify-center text-center border-2 border-[#2F9BFF]/45 hover:border-[#2F9BFF] text-white bg-[#0A1633]/70 hover:bg-[#2F9BFF]/20 backdrop-blur-md shadow-lg transition-all",children:["VER SERVIÇOS ",r(xu,{size:20})]})})' +
']})';

html = html.replace(fullOriginalBlock, replacementBlock);
console.log('✓ Replaced hero buttons markup!');

// 2. Update CSS in <style id="kcl-user-perfection">
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
      max-height: 68px !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      margin-bottom: 16px !important;
    }
  }

  /* 2. PADRONIZAÇÃO TOTAL E AMPLIAÇÃO DOS 3 BOTÕES DO HERO */
  .hero-action-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    border-radius: 9999px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    box-sizing: border-box !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  /* No Mobile: largura 100% idêntica para todos os 3 botões, altura ampliada de 58px */
  @media (max-width: 640px) {
    div:has(> .hero-action-btn) {
      width: 100% !important;
      max-width: 320px !important;
      display: flex !important;
      justify-content: center !important;
      margin: 0 auto !important;
    }
    .hero-action-btn {
      width: 100% !important;
      max-width: 320px !important;
      min-width: 290px !important;
      min-height: 58px !important;
      height: 58px !important;
      font-size: 15.5px !important;
      padding: 0 1.5rem !important;
    }
  }

  /* No Desktop: largura mínima idêntica (230px), altura 60px, alinhados lado a lado */
  @media (min-width: 641px) {
    div:has(> .hero-action-btn) {
      width: auto !important;
      display: inline-flex !important;
    }
    .hero-action-btn {
      min-width: 230px !important;
      min-height: 60px !important;
      height: 60px !important;
      font-size: 16px !important;
      padding: 0 1.75rem !important;
    }
  }

  /* Cores, bordas e acabamento nobre padronizados */
  .hero-action-btn[href="#agendar"] {
    background: #0066FF !important;
    color: #FFFFFF !important;
    box-shadow: 0 8px 24px -4px rgba(0, 102, 255, 0.45) !important;
    border: 2px solid transparent !important;
  }
  .hero-action-btn[href="#agendar"]:hover {
    background: #0052CC !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 12px 28px -4px rgba(0, 102, 255, 0.6) !important;
  }

  .hero-action-btn[href="#corrida"],
  .hero-action-btn[href="#servicos"] {
    background: rgba(10, 22, 51, 0.65) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    border: 2px solid rgba(47, 155, 255, 0.45) !important;
    color: #FFFFFF !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
  }
  .hero-action-btn[href="#corrida"]:hover,
  .hero-action-btn[href="#servicos"]:hover {
    border-color: #2F9BFF !important;
    background: rgba(47, 155, 255, 0.2) !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 22px rgba(47, 155, 255, 0.25) !important;
  }

  /* 3. FAIXA MARQUEE: ESPAÇAMENTO EQUILIBRADO EM CIMA E EMBAIXO & ANIMAÇÃO CONTÍNUA */
  div:has(> .marquee-track),
  .marquee-container,
  [class*="bg-[#0A1633]"] {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  @media (min-width: 640px) {
    div:has(> .marquee-track),
    .marquee-container,
    [class*="bg-[#0A1633]"] {
      padding-top: 1.75rem !important;
      padding-bottom: 1.75rem !important;
    }
  }
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

  /* 4. EXPERIÊNCIA: REDUÇÃO DO ESPAÇO EM VOLTA (ZERO VAZIOS) */
  #experiencia,
  section[id*="experiencia"] {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }

  /* 5. ESPAÇAMENTO HARMÔNICO EM TODOS OS TÍTULOS E SUBTÍTULOS (DESKTOP) */
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

  /* 6. CARDS DE LOCALIZAÇÃO COM A MESMA ALTURA EXATA */
  #localizacao .grid > div,
  #localizacao .grid > article {
    min-height: 520px !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }

  /* 7. COLUNAS DO RODAPÉ (FOOTER) BALANCEADAS */
  @media (min-width: 1024px) {
    footer .grid,
    footer [class*="grid"] {
      grid-template-columns: 1.15fr 1.35fr 1.1fr !important;
      gap: 3.5rem !important;
    }
  }
</style>
`;

html = html.replace(/<style id="kcl-user-perfection">[\s\S]*?<\/style>/gi, '');
html = html.replace('</head>', perfectionStyle + '\n</head>');

// 3. Syntax Verification with Babel and V8
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed the script with ZERO ERRORS!');
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

// 4. Save
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('🎉 Successfully saved to index.html and dist/index.html!');
