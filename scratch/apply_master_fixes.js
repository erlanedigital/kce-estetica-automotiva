const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

console.log('Original index.html size:', html.length);

// =========================================================
// 1. ZERO SEED TOTAL (NUNCA INVENTAR OU MANTER MOCK DATA)
// =========================================================

// A. Eliminar auto-seed de time
html = html.replace(
  /localStorage\.setItem\("kce_seeded_team","1"\);let Q=\[\{name:"Carlos Eduardo - Cadu"[^\]]+\];await Promise\.all\(Q\.map\(async\(u\)=>await er\(u,"Ativo"\)\)\)/g,
  'localStorage.setItem("kce_seeded_team","1")'
);

// B. Fallback de operador em produção
html = html.replace(
  /cn=C\[0\]\?\.value\.name\|\|"Carlos Eduardo - Cadu"/g,
  'cn=C[0]?.value.name||"Equipe KCL"'
);

// C. Substituir ocorrências hardcoded no admin e socios
html = html.replace(/children:"Cadu, Kayan e Luiz"/g, 'children:"Equipe KCL"');
html = html.replace(
  /children:"Cadu, Kayan e Luiz • 33,33% cada • Sempre 2 sócios presentes na operação"/g,
  'children:"Sócios & Gestão KCL • Sempre 2 sócios presentes na operação"'
);
html = html.replace(
  /let pRole=u==="Cadu"\?"Gestão \/ Caixa":u==="Kayan"\?"Operação \/ Lavagem":"Atendimento \/ Redes sociais";/g,
  'let pRole="Operação / Gestão";'
);
html = html.replace(
  /children:"Atualmente os 3 sócios \(Cadu, Kayan e Luiz\) não recebem comissão individual por lavagem — eles dividem o Lucro Líquido igualmente por 3 \(33,33% para cada um\)\."/g,
  'children:"Divisão de resultados e lucros operacionais da KCL Estética Automotiva."'
);
html = html.replace(
  /children:\["Cadu","Kayan","Luiz"\]\.map\(\(socio\)=>l\("div",\{key:socio,/g,
  'children:(C.filter(m=>((m?.value?.role||"").toLowerCase().includes("sócio"))).length>0?C.filter(m=>((m?.value?.role||"").toLowerCase().includes("sócio"))).map(m=>m.value.name):["Sócio 1","Sócio 2"]).map((socio)=>l("div",{key:socio,'
);
html = html.replace(
  /\["cadu","kayan","luiz"\]\.some\(\(s\)=>u\.member\.value\.name\.toLowerCase\(\)\.includes\(s\)\)/g,
  'false'
);

// D. Martelinho de Ouro -> Termos profissionais neutros
html = html.replace(/Ex: Martelinho de Ouro Express/g, 'Ex: Parceiro Especializado');
html = html.replace(/Ex: Martelinho, Insulfilm, PPF/g, 'Ex: PPF, Insulfilm, Tapeçaria');
html = html.replace(/Martelinho de Ouro, Insulfilm, PPF, Tapeçaria/g, 'PPF, Insulfilm, Tapeçaria, Serviços Especializados');

// E. Escala semanal hardcoded de socios -> Termos neutros
html = html.replace(/Manhã: Cadu \+ Kayan/g, 'Manhã: Plantão 1');
html = html.replace(/Tarde: Kayan \+ Luiz/g, 'Tarde: Plantão 2');
html = html.replace(/Manhã: Luiz \+ Cadu/g, 'Manhã: Plantão 1');
html = html.replace(/Tarde: Cadu \+ Kayan/g, 'Tarde: Plantão 2');
html = html.replace(/Manhã: Kayan \+ Luiz/g, 'Manhã: Plantão 1');
html = html.replace(/Tarde: Luiz \+ Cadu/g, 'Tarde: Plantão 2');
html = html.replace(/Tarde: Cadu \+ Luiz/g, 'Tarde: Plantão 2');

// =========================================================
// 2. FAIXA MARQUEE (EFEITO COM ESPAÇO PROPORCIONAL ACIMA E EMBAIXO)
// =========================================================
// py-3.5 -> py-6 sm:py-7 com margin vertical equilibrada
html = html.replace(
  'className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-3.5"',
  'className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-6 sm:py-7 my-2 sm:my-3"'
);

// =========================================================
// 3. SEÇÃO EXPERIÊNCIA (REDUZIR ESPAÇO EM VOLTA E EFEITO FLUIDO)
// =========================================================
// Altura do container de scroll reduzida de 300vh para 220vh para o efeito responder com agilidade
html = html.replace('style:{height:"300vh"}', 'style:{height:"220vh"}');

// Altura do sticky viewport no desktop ajustada para 72svh com min-height de 460px (sem voids gigantes)
html = html.replace(
  'className:"sticky top-0 h-[100svh] overflow-hidden flex items-center"',
  'className:"sticky top-0 h-[72svh] sm:h-[75svh] min-h-[460px] max-h-[580px] overflow-hidden flex items-center"'
);

// Posição do carrinho ajustada para top-[71%]
html = html.replace('top-[68%] pointer-events-none', 'top-[71%] pointer-events-none');


// =========================================================
// 4. CSS: BLINDAGEM DE TODAS AS SEÇÕES, TÍTULOS, SUBTÍTULOS, CARDS E RODAPÉ
// =========================================================

const p1 = html.indexOf('DIMINUIR O ESPAÇO VAGO ACIMA DAS FRASES');
const pStart = html.lastIndexOf('@media (min-width: 1024px)', p1);
const p2 = html.indexOf('kcl-cta-desktop-text', pStart);
const pEnd = html.indexOf('}', html.indexOf('}', p2 + 1) + 1);

const newCssBlock = `@media (min-width: 1024px) {
  /* =========================================================
     HARMONIA PERFEITA DE DESIGN SYSTEM: TÍTULOS E SUBTÍTULOS NO DESKTOP
     ========================================================= */

  /* 1. SEÇÕES: RESPIRO EQUILIBRADO E ELEGANTE */
  main#top section:not(#experiencia) {
    padding-top: 4.75rem !important;
    padding-bottom: 4.75rem !important;
  }

  /* 2. TAG / EYEBROW SUPERIOR: DISTÂNCIA ELEGANTE DO H2 */
  main#top section p.tracking-\\[\\.3em\\],
  main#top section p.tracking-\\[\\.25em\\],
  main#top section p.tracking-\\[\\.35em\\],
  main#top section p.tracking-\\[\\.32em\\],
  main#top section p.tracking-\\[\\.28em\\],
  main#top section p.tracking-\\[\\.38em\\],
  main#top section p[class*="tracking-"] {
    margin-bottom: 0.85rem !important;
    font-size: 13px !important;
    letter-spacing: 0.32em !important;
    line-height: 1.3 !important;
  }

  /* 3. TÍTULOS H2 PADRONIZADOS */
  .kcl-section-h2,
  #galeria h2,
  #processos h2,
  #agendar h2,
  #depoimentos h2,
  #localizacao h2 {
    font-size: 2.75rem !important;
    line-height: 1.16 !important;
    font-weight: 800 !important;
    letter-spacing: -0.025em !important;
    margin-top: 0 !important;
    margin-bottom: 1.15rem !important;
  }
  .kcl-section-h2 span,
  #galeria h2 span,
  #localizacao h2 span,
  #agendar h2 span {
    font-size: inherit !important;
  }

  /* 4. SUBTÍTULOS E TEXTOS EXPLICATIVOS ABAIXO DO H2 */
  #servicos .reveal > p:last-child,
  #servicos p.text-\\[\\#93A3BC\\],
  #passos p.text-\\[\\#93A3BC\\],
  #pacotes p.text-\\[\\#93A3BC\\],
  #antes-depois p.text-\\[\\#93A3BC\\],
  .corrida-desc-text,
  #agendar .min-w-0 > p.text-\\[\\#93A3BC\\],
  #depoimentos p.text-\\[\\#93A3BC\\],
  #localizacao p.text-\\[\\#93A3BC\\] {
    margin-top: 0 !important;
    margin-bottom: 2.75rem !important;
    line-height: 1.7 !important;
    font-size: 16.5px !important;
  }

  /* 5. TÍTULO SERVIÇOS: EM UMA ÚNICA LINHA NO DESKTOP */
  #servicos h2 br {
    display: none !important;
  }
  #servicos h2 .rise-title {
    display: inline-flex !important;
    align-items: baseline !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
    gap: 0.32em !important;
    font-size: 3.35rem !important; /* ~54px suave e impactante */
    line-height: 1.15 !important;
  }
  #servicos h2 .rise-line {
    display: inline-flex !important;
    align-items: baseline !important;
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
  }

  /* 6. EXPERIÊNCIA KCL: ESPAÇO EM VOLTA REDUZIDO E EFEITO COMPACTO NO DESKTOP */
  #experiencia {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  #experiencia p.text-\\[\\#2F9BFF\\].font-bold,
  #experiencia p.tracking-\\[\\.32em\\] {
    font-size: 13px !important;
    letter-spacing: 0.32em !important;
    margin-bottom: 0.75rem !important;
  }
  #experiencia h2,
  #experiencia h2.kcl-section-h2 {
    font-size: 2.85rem !important; /* refinado, elegante e equilibrado */
    line-height: 1.18 !important;
    letter-spacing: -0.02em !important;
    white-space: nowrap !important;
    margin-top: 0 !important;
    margin-bottom: 1.25rem !important;
  }
  #experiencia h2 span {
    font-size: inherit !important;
    display: inline !important;
    white-space: nowrap !important;
  }
  #experiencia .max-w-md {
    margin-top: 1.25rem !important;
    margin-bottom: 0.65rem !important;
    max-width: 440px !important;
  }
  #experiencia p.tracking-\\[\\.22em\\] {
    margin-top: 0.65rem !important;
    font-size: 12px !important;
    letter-spacing: 0.25em !important;
  }

  /* 7. TRÊS PASSOS E ZERO ESTRESSE: EM UMA ÚNICA LINHA NO DESKTOP */
  #passos h2,
  .kcl-passos-section h2 {
    white-space: nowrap !important;
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: baseline !important;
    font-size: 3.25rem !important;
    line-height: 1.15 !important;
    letter-spacing: -0.025em !important;
    margin-top: 0 !important;
    margin-bottom: 1.15rem !important;
  }
  #passos h2 span,
  .kcl-passos-section h2 span {
    font-size: inherit !important;
    display: inline !important;
    white-space: nowrap !important;
  }

  /* 8. PACOTES: TÍTULO EM UMA ÚNICA LINHA NO DESKTOP */
  #pacotes h2,
  #pacotes h2.kcl-section-h2 {
    font-size: 3.65rem !important;
    line-height: 1.12 !important;
    font-weight: 800 !important;
    letter-spacing: -0.025em !important;
    white-space: nowrap !important;
    margin-top: 0 !important;
    margin-bottom: 1.15rem !important;
  }
  #pacotes h2 span {
    font-size: inherit !important;
  }
  #pacotes .grid.md\\:grid-cols-3 {
    margin-top: 3rem !important;
    gap: 2rem !important;
  }

  /* 9. ANTES & DEPOIS: TÍTULO EM UMA ÚNICA LINHA NO DESKTOP */
  #antes-depois h2,
  .kcl-antes-depois-h2,
  section:has(input[aria-label="Comparar antes e depois"]) h2 {
    font-size: 3.65rem !important;
    line-height: 1.12 !important;
    white-space: nowrap !important;
    margin-top: 0 !important;
    margin-bottom: 1.15rem !important;
  }
  section:has(input[aria-label="Comparar antes e depois"]) h2 span {
    font-size: inherit !important;
  }

  /* 10. MINIGAME KCL GP: TÍTULO E DESCRIÇÃO EM 2 LINHAS NO DESKTOP */
  #corrida h2,
  #corrida h2.kcl-section-h2 {
    font-size: 3.65rem !important;
    line-height: 1.15 !important;
    font-weight: 800 !important;
    letter-spacing: -0.025em !important;
    margin-top: 0 !important;
    margin-bottom: 1.15rem !important;
  }
  #corrida h2 span {
    font-size: inherit !important;
  }
  .corrida-desc-text,
  #corrida .corrida-desc-text {
    max-width: 980px !important;
    font-size: 1.15rem !important;
    line-height: 1.75 !important;
    text-align: center !important;
    text-wrap: balance !important;
    margin-top: 0 !important;
    margin-bottom: 2.5rem !important;
  }

  /* 11. LOCALIZAÇÃO: CARDS COM A EXATA MESMA ALTURA NO DESKTOP */
  #localizacao .grid.lg\\:grid-cols-2 {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    align-items: stretch !important;
    gap: 2rem !important;
  }
  #localizacao .grid.lg\\:grid-cols-2 > div,
  #localizacao .card-round {
    height: 100% !important;
    min-height: 520px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    box-sizing: border-box !important;
  }
  #localizacao iframe {
    height: 100% !important;
    min-height: 100% !important;
    flex: 1 1 auto !important;
    display: block !important;
  }

  /* 12. RODAPÉ: ESPAÇAMENTO HARMÔNICO DAS COLUNAS NO DESKTOP */
  footer .grid.md\\:grid-cols-3 {
    display: grid !important;
    grid-template-columns: 1.15fr 1.35fr 1.1fr !important;
    gap: 3.5rem !important;
    align-items: start !important;
    justify-content: space-between !important;
  }

  /* 13. BOTÃO AGENDAR SERVIÇO DO CANTO INFERIOR NO DESKTOP */
  #kcl-floating-cta a.kcl-desktop-floating-cta {
    position: relative !important;
    overflow: hidden !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: none !important;
    border-radius: 9999px !important;
    background: linear-gradient(135deg, #0066FF, #1A7DFF) !important;
    color: #F2F6FF !important;
    padding: 12px 24px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    box-shadow: 0 4px 20px rgba(0, 102, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
    gap: 0 !important;
    transition: all 0.3s ease !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  #kcl-floating-cta a.kcl-desktop-floating-cta:hover {
    box-shadow: 0 6px 28px rgba(47, 155, 255, 0.6), 0 0 20px rgba(0, 102, 255, 0.4) !important;
    transform: translateY(-1px) scale(1.01) !important;
  }
  #kcl-floating-cta a.kcl-desktop-floating-cta::after {
    content: "" !important;
    position: absolute !important;
    top: -50% !important;
    left: -60% !important;
    width: 40% !important;
    height: 200% !important;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent) !important;
    transform: rotate(25deg) !important;
    pointer-events: none !important;
    transition: left 0.6s ease !important;
  }
  #kcl-floating-cta a.kcl-desktop-floating-cta:hover::after {
    left: 120% !important;
  }
  #kcl-floating-cta .kcl-cta-mobile-pulse {
    display: none !important;
  }
  #kcl-floating-cta .kcl-cta-mobile-text {
    display: none !important;
  }
  #kcl-floating-cta .kcl-cta-desktop-text {
    display: inline !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #F2F6FF !important;
    letter-spacing: normal !important;
  }
}`;

html = html.substring(0, pStart) + newCssBlock + html.substring(pEnd + 1);
console.log('Successfully replaced desktop CSS block.');

// Salvar em index.html e dist/index.html
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');

console.log('Saved index.html and dist/index.html. New size:', html.length);
