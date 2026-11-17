const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the markup of #kcl-floating-cta
const oldMarkupPos = html.indexOf('<!-- BOTÃO FLUTUANTE FIXO DE AGENDAR SERVIÇO -->');
if (oldMarkupPos !== -1) {
  const endMarkupPos = html.indexOf('</body>', oldMarkupPos);
  const newMarkup = `<!-- BOTÃO FLUTUANTE FIXO DE AGENDAR SERVIÇO (IDÊNTICO AO PADRÃO DA FOTO) -->
  <div id="kcl-floating-cta">
    <a href="#agendar" class="kcl-floating-cta-btn">
      AGENDAR SERVIÇO
    </a>
  </div>

`;
  html = html.substring(0, oldMarkupPos) + newMarkup + html.substring(endMarkupPos);
  console.log('✓ Updated HTML markup of #kcl-floating-cta');
} else {
  console.error('❌ oldMarkupPos not found');
  process.exit(1);
}

// 2. Add floating button perfection style in <style id="kcl-user-perfection">
const floatingCss = `
  /* =========================================================
     💎 BOTÃO FLUTUANTE DE AGENDAR SERVIÇO (100% IDÊNTICO À FOTO)
     ========================================================= */
  #kcl-floating-cta {
    position: fixed !important;
    bottom: 16px !important;
    right: 16px !important;
    z-index: 9999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    pointer-events: auto !important;
  }
  @media (min-width: 641px) {
    #kcl-floating-cta {
      bottom: 24px !important;
      right: 24px !important;
    }
  }

  #kcl-floating-cta a,
  .kcl-floating-cta-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    background: #0066FF !important;
    color: #FFFFFF !important;
    border-radius: 9999px !important;
    border: none !important;
    outline: none !important;
    min-height: 48px !important;
    height: 48px !important;
    padding: 0 1.6rem !important;
    font-size: 14.5px !important;
    font-weight: 800 !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    white-space: nowrap !important;
    box-shadow: 0 8px 24px -4px rgba(0, 102, 255, 0.45) !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    text-decoration: none !important;
  }

  #kcl-floating-cta a:hover,
  .kcl-floating-cta-btn:hover {
    background: #0052CC !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 12px 28px -4px rgba(0, 102, 255, 0.6) !important;
    color: #FFFFFF !important;
  }

  #kcl-floating-cta a:active,
  .kcl-floating-cta-btn:active {
    transform: translateY(0) scale(0.98) !important;
  }
`;

// Insert into kcl-user-perfection style tag
const perfectionStylePos = html.indexOf('</style>', html.indexOf('id="kcl-user-perfection"'));
if (perfectionStylePos !== -1) {
  html = html.substring(0, perfectionStylePos) + floatingCss + '\n' + html.substring(perfectionStylePos);
  console.log('✓ Injected floating button CSS into kcl-user-perfection');
} else {
  console.error('❌ kcl-user-perfection style not found');
  process.exit(1);
}

// 3. Syntax Verification with Babel and V8
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed the script with ZERO ERRORS!');
} catch (err) {
  console.error('❌ Babel error:', err.message);
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
