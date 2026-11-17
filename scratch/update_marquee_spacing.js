const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Locate and update React markup for marquee
const targetOld = 'r("div",{className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-3.5",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[';
const pos = html.indexOf(targetOld);
console.log('Target old found at:', pos);

if (pos === -1) {
  console.error('ERROR: targetOld not found in index.html!');
  process.exit(1);
}

const targetNew = 'r("div",{className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-7 sm:py-9 my-3 sm:my-5 kcl-marquee-wrapper",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13.5px] sm:text-[14px] text-[#C8D0DA]",children:[';

html = html.replace(targetOld, targetNew);
console.log('✓ Successfully updated React markup for marquee');

// 2. Update CSS in <style id="kcl-user-perfection">
const oldCssBlockPrefix = '/* 3. FAIXA MARQUEE:';
const oldCssPos = html.indexOf(oldCssBlockPrefix);
const oldCssEnd = html.indexOf('/* 4. EXPERIÊNCIA:', oldCssPos);

if (oldCssPos !== -1 && oldCssEnd !== -1) {
  const newCssBlock = `/* 3. FAIXA MARQUEE: ESPAÇO AMPLIADO ACIMA E ABAIXO (INTERNO E EXTERNO) */
  .kcl-marquee-wrapper,
  div:has(> .marquee-track),
  div:has(> div.marquee-track) {
    padding-top: 1.75rem !important;
    padding-bottom: 1.75rem !important;
    margin-top: 0.75rem !important;
    margin-bottom: 0.75rem !important;
    box-sizing: border-box !important;
  }
  @media (min-width: 640px) {
    .kcl-marquee-wrapper,
    div:has(> .marquee-track),
    div:has(> div.marquee-track) {
      padding-top: 2.25rem !important;
      padding-bottom: 2.25rem !important;
      margin-top: 1.25rem !important;
      margin-bottom: 1.25rem !important;
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

  `;

  html = html.substring(0, oldCssPos) + newCssBlock + html.substring(oldCssEnd);
  console.log('✓ Successfully updated CSS in kcl-user-perfection');
} else {
  console.error('ERROR: oldCssPos or oldCssEnd not found!');
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
