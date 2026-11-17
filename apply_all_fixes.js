const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Original length:', html.length);

// 1. Update CURRENT_BUILD
html = html.replace(/kcl-build-20261116-v85-perfection/g, 'kcl-build-20261116-v95-golden-perfection');

// 2. Remove the conflicting desktop spacing rules that were crushing the respiro (lines 871-877)
const crushedRule = `main#top section p.tracking-\\[\\.3em\\],
  main#top section p[class*="tracking-"] {
    margin-bottom: 0.25rem !important;
  }
  main#top section h2 {
    margin-top: 0.35rem !important; /* reduz espaço vago entre eyebrow e título */
  }`;

// Or flexible replace of that block
html = html.replace(
  /main#top section p\.tracking-\\\[\\\.3em\\\],\s*main#top section p\[class\*="tracking-"\]\s*\{[^}]*\}\s*main#top section h2\s*\{[^}]*\}/g,
  `/* RESPIRO NOBRE ENTRE EYEBROW E TÍTULO */
  main#top section p[class*="tracking-"] {
    margin-bottom: 1.75rem !important;
  }
  main#top section h2 {
    margin-top: 1.5rem !important;
    margin-bottom: 2.75rem !important;
  }`
);

// 3. Update the global perfection CSS block at the end of the <style> tag
const perfectionOldBlockStart = '/* ==========================================================================\n   PERFEIÇÃO VISUAL ABSOLUTA: TÍTULOS UNIFICADOS, LOCALIZAÇÃO & AGENDAMENTO';
const perfectionIdx = html.indexOf('PERFEIÇÃO VISUAL ABSOLUTA: TÍTULOS UNIFICADOS');

console.log('Perfection block found at:', perfectionIdx);

const newPerfectionCSS = `/* ==========================================================================
   PERFEIÇÃO VISUAL ABSOLUTA: TÍTULOS UNIFICADOS, LOCALIZAÇÃO, EXPERIÊNCIA & AGENDAMENTO
   ========================================================================== */

/* 1. TÍTULOS DE TODAS AS SEÇÕES RIGOROSAMENTE PADRONIZADOS E COM RESPIRO AMPLO */
/* (Exatamente como o padrão ouro 'O resultado fala por si.') */
section p.tracking-\\[\\.3em\\],
section p.tracking-\\[\\.25em\\],
section p[class*="tracking-"],
main#top section p[class*="tracking-"],
.kcl-eyebrow {
  font-size: 13px !important;
  letter-spacing: 0.3em !important;
  text-transform: uppercase !important;
  font-weight: 700 !important;
  color: #2F9BFF !important;
  margin-top: 0 !important;
  margin-bottom: 1.75rem !important; /* ~28px de respiro evidente abaixo do subtítulo */
  display: block !important;
  text-align: center !important;
}

.kcl-section-h2,
#servicos h2,
#passos h2,
#galeria h2,
#pacotes h2,
#corrida h2,
#agendar h2,
#depoimentos h2,
#localizacao h2 {
  font-family: var(--font-display, "Playfair Display", Georgia, serif) !important;
  font-size: clamp(2rem, 4.4vw, 3.25rem) !important;
  line-height: 1.15 !important;
  font-weight: 800 !important;
  letter-spacing: -0.025em !important;
  margin-top: 1.5rem !important; /* Respiro acima do H2 */
  margin-bottom: 3.25rem !important; /* Respiro abaixo do H2 */
  text-align: center !important;
}

.kcl-section-h2 span,
#servicos h2 span,
#passos h2 span,
#galeria h2 span,
#pacotes h2 span,
#corrida h2 span,
#agendar h2 span,
#depoimentos h2 span,
#localizacao h2 span {
  font-size: inherit !important;
}

/* RESPIRO AMPLO ACIMA E ABAIXO DE CADA SEÇÃO */
#servicos {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#passos {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#galeria {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#pacotes {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#corrida {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#agendar {
  padding-top: 6.5rem !important;
  padding-bottom: 6.5rem !important;
}
#depoimentos {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
#localizacao {
  padding-top: 7rem !important; /* RESPIRO GENEROSO ACIMA DE ONDE ESTAMOS */
  padding-bottom: 7rem !important;
}

/* 2. EXPERIÊNCIA KCL: AS FRASES FICAM NO MESMO LUGAR E O CARRINHO ANDA EMBAIXO */
#experiencia {
  position: relative !important;
  padding-top: 4rem !important;
  padding-bottom: 4rem !important;
}
#experiencia-stage {
  height: 85vh !important;
  min-height: 540px !important;
  max-height: 680px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  position: sticky !important;
  top: 0 !important;
  overflow: hidden !important;
}
#experiencia-text-box {
  position: relative !important;
  z-index: 10 !important;
  width: 100% !important;
  max-width: 900px !important;
  margin: 0 auto !important;
  text-align: center !important;
  padding: 0 1rem !important;
}
#experiencia-h2 {
  min-height: 120px !important; /* Mantém a frase rigorosamente no mesmo lugar sem oscilar */
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  margin-top: 1.25rem !important;
  margin-bottom: 1.5rem !important;
}
#experiencia-car-track {
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 2.5rem !important; /* CARRINHO RIGOROSAMENTE EMBAIXO, ZERO SOBREPOSIÇÃO */
  z-index: 20 !important;
  pointer-events: none !important;
}

/* 3. LOCALIZAÇÃO: ALINHAMENTO E ALTURA RIGOROSAMENTE IGUAIS DOS 2 CARDS */
#localizacao-main-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 2rem !important;
  align-items: stretch !important;
  margin-top: 3.5rem !important;
}
@media (min-width: 1024px) {
  #localizacao-main-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 2.5rem !important;
  }
}
#localizacao-main-grid > div {
  margin-top: 0 !important;
  height: 100% !important;
  min-height: 620px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  border-radius: 24px !important;
  box-sizing: border-box !important;
}
#localizacao-main-grid iframe {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  flex: 1 1 auto !important;
  display: block !important;
  border-radius: 24px !important;
  margin: 0 !important;
}

/* 4. INFORMAÇÕES DE LOCALIZAÇÃO ESTRITAMENTE EM UMA ÚNICA COLUNA COM RESPIRO */
#localizacao-info-col,
#localizacao-main-grid .flex-col {
  display: flex !important;
  flex-direction: column !important;
  grid-template-columns: none !important;
  gap: 1.35rem !important; /* Respiro amplo entre cada frase/informação */
}
#localizacao-info-col > p,
#localizacao-main-grid .flex-col > p {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.6 !important;
  width: 100% !important;
  display: block !important;
}

/* 5. ITENS DO AGENDAMENTO COM RESPIRO NOBRE ENTRE CADA LINHA */
#agendar-details-list,
#agendar .space-y-7 {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.85rem !important; /* Espaçamento bem maior e confortável entre os 3 itens */
  margin-top: 2.25rem !important;
  margin-bottom: 2.25rem !important;
}
#agendar-details-list > p,
#agendar-details-list > div,
#agendar .space-y-7 > p,
#agendar .space-y-7 > div {
  margin: 0 !important;
  padding: 0 !important;
}

/* 6. FAIXA MARQUEE SLIM COM RESPIRO GENEROSO ACIMA E ABAIXO */
.marquee-container,
.marquee-wrapper,
[class*="marquee"] {
  margin-top: 5rem !important;
  margin-bottom: 5rem !important;
}
`;

if (perfectionIdx !== -1) {
  const endStyleIdx = html.indexOf('</style>', perfectionIdx);
  if (endStyleIdx !== -1) {
    html = html.substring(0, perfectionIdx) + newPerfectionCSS + '\n' + html.substring(endStyleIdx);
    console.log('Replaced perfection CSS block successfully!');
  }
}

// 4. Now let's update Experiência KCL in the JSX so that:
// - the sticky container has id="experiencia-stage"
// - the text container has id="experiencia-text-box"
// - the h2 has id="experiencia-h2"
// - the car track has id="experiencia-car-track" and is positioned bottom-8 sm:bottom-12
const expOldStr = `l("div",{className:"sticky top-0 h-[75svh] min-h-[460px] max-h-[600px] overflow-hidden flex items-center justify-center",style:{top:"var(--safe-area-inset-top)"},children:[r("div",{className:"absolute inset-0 transition-colors duration-500",style:{background:\`linear-gradient(120deg, #050B1A, \${Nf>0.15&&Nf<0.85?"#0A1633":"#050B1A"} 70%, #050B1A)\`}}),r(Af,{count:8}),l("div",{className:"relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-center",children:[r("p",{className:"text-[17px] sm:text-[18px] tracking-[.3em] text-[#2F9BFF] font-bold uppercase",children:"EXPERIÊNCIA KCL"}),l("h2",{className:"font-display font-extrabold text-[25px] sm:text-[46px] leading-[1.08] tracking-tight mt-5 mb-6 text-center mx-auto kcl-section-h2",children:[r("span",{className:"block sm:inline whitespace-nowrap",children:m5[Df].split(" ").slice(0,2).join(" ")+" "}),r("span",{className:"block sm:inline font-elegant text-[#2F9BFF] whitespace-nowrap",children:m5[Df].split(" ").slice(2).join(" ")||"KCL"})]}),r("div",{className:"mt-8 h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto shadow-inner",children:r("div",{className:"h-full bg-gradient-to-r from-[#0066FF] to-[#2F9BFF] rounded-full",style:{width:\`\${Nf*100}%\`}})}),l("p",{className:"mt-3 text-[12px] font-bold tracking-[.22em] text-[#93A3BC]",children:[Math.round(Nf*100),"% DO PERCURSO"]})]}),r("div",{className:"absolute left-0 right-0 top-[71%] pointer-events-none",style:{transform:\`translateX(\${-15+Nf*115}%)\`},children:`;

const expNewStr = `l("div",{id:"experiencia-stage",className:"sticky top-0 h-[85vh] min-h-[540px] max-h-[680px] overflow-hidden flex flex-col items-center justify-center relative",style:{top:"var(--safe-area-inset-top)"},children:[r("div",{className:"absolute inset-0 transition-colors duration-500",style:{background:\`linear-gradient(120deg, #050B1A, \${Nf>0.15&&Nf<0.85?"#0A1633":"#050B1A"} 70%, #050B1A)\`}}),r(Af,{count:8}),l("div",{id:"experiencia-text-box",className:"relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-center z-10",children:[r("p",{className:"text-[14px] sm:text-[15px] tracking-[.3em] text-[#2F9BFF] font-bold uppercase",children:"EXPERIÊNCIA KCL"}),l("h2",{id:"experiencia-h2",className:"font-display font-extrabold text-[28px] sm:text-[48px] leading-[1.08] tracking-tight mt-5 mb-6 text-center mx-auto kcl-section-h2",children:[r("span",{className:"block sm:inline whitespace-nowrap",children:m5[Df].split(" ").slice(0,2).join(" ")+" "}),r("span",{className:"block sm:inline font-elegant text-[#2F9BFF] whitespace-nowrap",children:m5[Df].split(" ").slice(2).join(" ")||"KCL"})]}),r("div",{className:"mt-6 h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto shadow-inner",children:r("div",{className:"h-full bg-gradient-to-r from-[#0066FF] to-[#2F9BFF] rounded-full",style:{width:\`\${Nf*100}%\`}})}),l("p",{className:"mt-3 text-[12px] font-bold tracking-[.22em] text-[#93A3BC]",children:[Math.round(Nf*100),"% DO PERCURSO"]})]}),r("div",{id:"experiencia-car-track",className:"absolute left-0 right-0 bottom-8 sm:bottom-12 pointer-events-none z-20",style:{transform:\`translateX(\${-15+Nf*115}%)\`},children:`;

if (html.includes(expOldStr)) {
  html = html.replace(expOldStr, expNewStr);
  console.log('Replaced Experiencia KCL JSX successfully!');
} else {
  console.log('Could not find exact expOldStr, searching with regex...');
  const expRegex = /l\("div",\{className:"sticky top-0 h-\[75svh\][^"]*",style:\{top:"var\(--safe-area-inset-top\)"\},children:\[r\("div",\{className:"absolute inset-0 transition-colors duration-500",style:\{background:`linear-gradient\(120deg, #050B1A, \$\{Nf>0\.15&&Nf<0\.85\?"#0A1633":"#050B1A"\} 70%, #050B1A\)`\}\}\),r\(Af,\{count:8\}\),l\("div",\{className:"relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-center",children:\[r\("p",\{className:"text-\[17px\] sm:text-\[18px\] tracking-\[\.3em\] text-\[#2F9BFF\] font-bold uppercase",children:"EXPERIÊNCIA KCL"\}\),l\("h2",\{className:"font-display font-extrabold text-\[25px\] sm:text-\[46px\] leading-\[1\.08\] tracking-tight mt-5 mb-6 text-center mx-auto kcl-section-h2",children:\[r\("span",\{className:"block sm:inline whitespace-nowrap",children:m5\[Df\]\.split\(" "\)\.slice\(0,2\)\.join\(" "\)\+" "\}\),r\("span",\{className:"block sm:inline font-elegant text-\[#2F9BFF\] whitespace-nowrap",children:m5\[Df\]\.split\(" "\)\.slice\(2\)\.join\(" "\)\|\|"KCL"\}\)\]\}\),r\("div",\{className:"mt-8 h-2 bg-white\/10 rounded-full overflow-hidden max-w-md mx-auto shadow-inner",children:r\("div",\{className:"h-full bg-gradient-to-r from-\[#0066FF\] to-\[#2F9BFF\] rounded-full",style:\{width:`\$\{Nf\*100\}%`\}\}\)\}\),l\("p",\{className:"mt-3 text-\[12px\] font-bold tracking-\[\.22em\] text-\[#93A3BC\]",children:\[Math\.round\(Nf\*100\),"% DO PERCURSO"\]\}\)\]\}\),r\("div",\{className:"absolute left-0 right-0 top-\[71%\] pointer-events-none",style:\{transform:`translateX\(\$\{-15\+Nf\*115\}%\)`\},children:/;
  
  if (expRegex.test(html)) {
    html = html.replace(expRegex, expNewStr);
    console.log('Replaced Experiencia KCL JSX via regex successfully!');
  } else {
    console.log('Regex also did not match, let us inspect what is there.');
  }
}

// 5. Check #agendar spacing and ID in JSX
const agendarOldList = `l("div",{className:"mt-8 sm:mt-10 space-y-7 text-sm sm:text-base text-[#E2E8F0]",children:[`;
const agendarNewList = `l("div",{id:"agendar-details-list",className:"mt-8 sm:mt-10 space-y-7 text-sm sm:text-base text-[#E2E8F0]",children:[`;
if (html.includes(agendarOldList)) {
  html = html.replace(agendarOldList, agendarNewList);
  console.log('Added id="agendar-details-list" to agendar list!');
}

// 6. Check #localizacao list in JSX
const locOldList = `l("div",{className:"mt-6 border-t border-[var(--line)] pt-6 flex flex-col gap-5 leading-relaxed min-w-0",children:[`;
const locNewList = `l("div",{id:"localizacao-info-col",className:"mt-6 border-t border-[var(--line)] pt-6 flex flex-col gap-5 leading-relaxed min-w-0 w-full",children:[`;
if (html.includes(locOldList)) {
  html = html.replace(locOldList, locNewList);
  console.log('Added id="localizacao-info-col" to localizacao list!');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated index.html, new length:', html.length);
