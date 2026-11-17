const fs = require('fs');
const parser = require('@babel/parser');

const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('Testing full replacements...');

// 1. RANKING TOP 5
const oldRanking = 'children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCL"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))';
const newRanking = 'children:Bf.slice(0,5).map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCL"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))';
if (!html.includes(oldRanking)) throw new Error('Ranking target not found');
html = html.replace(oldRanking, newRanking);
console.log('1. Ranking OK');

// 2. PASSOS HEADING & TEXT
const oldPassosHeading = 'l("h2",{className:"font-display font-extrabold text-[32px] sm:text-3xl md:text-4xl leading-[1.14] tracking-tight mt-3 text-left lg:whitespace-nowrap kcl-section-h2",children:[r("span",{className:"block lg:inline whitespace-nowrap",children:"Três passos e "}),l("span",{className:"block lg:inline whitespace-nowrap",children:["zero ",r("span",{className:"font-elegant text-[#2F9BFF]",children:"estresse."})]})]})';
const newPassosHeading = 'l("h2",{className:"font-display font-extrabold text-[26px] sm:text-3xl md:text-[32px] leading-tight tracking-tight mt-3 text-left kcl-section-h2",children:[r("span",{className:"inline",children:"Três passos e "}),r("span",{className:"inline text-[#2F9BFF] font-elegant",children:"zero estresse."})]})';
if (!html.includes(oldPassosHeading)) throw new Error('Passos heading target not found');
html = html.replace(oldPassosHeading, newPassosHeading);
console.log('2. Passos heading OK');

// 3. AGENDAR LEFT SIDE BODY TEXT
const oldAgendarLeft = 'r("p",{className:"text-[15px] sm:text-[17px] text-[#93A3BC] mt-4 leading-relaxed text-center",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."}),\n      l("div",{className:"mt-6 sm:mt-7 space-y-3 text-xs sm:text-sm text-[#C8D0DA]",children:[\n        l("p",{className:"flex items-start gap-3",children:[r(nu,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:18}),l("span",{className:"leading-relaxed",children:["Próximo à Praça de Esportes • ",r("span",{className:"whitespace-nowrap font-semibold text-white",children:"Montes Claros - MG"})," • ",r("span",{className:"whitespace-nowrap",children:"Seg a sex 8h às 18h • Sáb 8h às 14h"})]})]}),\n        l("p",{className:"flex items-start gap-3",children:[r($u,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:18}),r("span",{className:"leading-relaxed",children:"Resposta média em até 15 minutos em horário comercial"})]}),\n        l("p",{className:"flex items-start gap-3",children:[r(Ml,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:18}),r("span",{className:"leading-relaxed",children:rn>0?`${rn} agendamento(s) salvo(s) neste espaço.`:"Seu agendamento fica salvo neste espaço."})]})';

const newAgendarLeft = 'r("p",{className:"text-[17px] sm:text-[19px] text-[#DCE6F5] mt-4 leading-relaxed text-center font-medium",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."}),\n      l("div",{className:"mt-7 sm:mt-8 space-y-4 text-sm sm:text-base text-[#E2E8F0]",children:[\n        l("p",{className:"flex items-start gap-3",children:[r(nu,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:20}),l("span",{className:"leading-relaxed",children:["Próximo à Praça de Esportes • ",r("span",{className:"whitespace-nowrap font-semibold text-white",children:"Montes Claros - MG"})," • ",r("span",{className:"whitespace-nowrap",children:"Seg a sex 8h às 18h • Sáb 8h às 14h"})]})]}),\n        l("p",{className:"flex items-start gap-3",children:[r($u,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:20}),r("span",{className:"leading-relaxed",children:"Resposta média em até 15 minutos em horário comercial"})]}),\n        l("p",{className:"flex items-start gap-3",children:[r(Ml,{className:"text-[#2F9BFF] shrink-0 mt-0.5",size:20}),r("span",{className:"leading-relaxed",children:rn>0?`${rn} agendamento(s) salvo(s) neste espaço.`:"Seu agendamento fica salvo neste espaço com total privacidade."})]})';

if (!html.includes('r("p",{className:"text-[15px] sm:text-[17px] text-[#93A3BC] mt-4 leading-relaxed text-center",children:"Escolha o serviço e receba a confirmação.')) {
  throw new Error('Agendar left target not found');
}
html = html.replace(oldAgendarLeft, newAgendarLeft);
console.log('3. Agendar left OK');

// 4. ZERO SEED / ZERO RECRIAR
// A) pcost-seed
const oldPcost = 'for(let an=0;an<zn.length;an++)await w("records.create",{collection:"kce_product_costs",value:zn[an],idempotency_key:`pcost-seed-${an}-${zn[an].name}`.replace(/[^a-zA-Z0-9-_]/g,"-")});let b=await w("records.list",{collection:"kce_product_costs"});h8(b?.records??[])';
const newPcost = '/* auto-seed disabled */h8([])';
if (html.includes(oldPcost)) {
  html = html.replace(oldPcost, newPcost);
  console.log('4A. Pcost seed disabled');
}

// B) check-seed
const oldCheck = 'await w("records.create",{collection:"kce_daily_checklist",value:{label:zn[an],done:!1,date:un(),createdAt:new Date().toISOString()},idempotency_key:`check-seed-${an}`});let b=await w("records.list",{collection:"kce_daily_checklist"});c8(b?.records??[])';
const newCheck = '/* auto-seed disabled */c8([])';
if (html.includes(oldCheck)) {
  html = html.replace(oldCheck, newCheck);
  console.log('4B. Checklist seed disabled');
}

// C) shift-seed
const oldShift = 'for(let on=0;on<G.length;on++)await w("records.create",{collection:"kce_shifts",value:G[on],idempotency_key:`shift-seed-${on}-${G[on].day}`});let cn=await w("records.list",{collection:"kce_shifts"});V8(cn?.records??[])';
const newShift = '/* auto-seed disabled */V8([])';
if (html.includes(oldShift)) {
  html = html.replace(oldShift, newShift);
  console.log('4C. Shift seed disabled');
}

// 5. EXPERIENCIA KCL (REMOVE 300vh VOID & ANIMATE CAR SMOOTHLY)
const oldExp = 'r("section",{id:"experiencia",className:"scroll-mt-24",children:r("div",{ref:Vf,className:"relative",style:{height:"300vh"},children:l("div",{className:"sticky top-0 h-[100svh] overflow-hidden flex items-center",style:{top:"var(--safe-area-inset-top)"},children:[r("div",{className:"absolute inset-0 transition-colors duration-500",style:{background:`linear-gradient(120deg, #050B1A, ${Nf>0.15&&Nf<0.85?"#0A1633":"#050B1A"} 70%, #050B1A)`}}),r(Af,{count:8}),l("div",{className:"relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-center",children:[r("p",{className:"text-[11px] tracking-[.32em] text-[#2F9BFF] font-bold",children:"EXPERIÊNCIA KCL"}),l("h2",{className:"font-display font-extrabold leading-[1.04] mt-5 tracking-[-0.03em] text-[38px] sm:text-[78px] text-center mx-auto kcl-section-h2",children:[r("span",{className:"block sm:inline whitespace-nowrap",children:m5[Df].split(" ").slice(0,2).join(" ")+" "}),r("span",{className:"block sm:inline font-elegant text-[#2F9BFF] whitespace-nowrap",children:m5[Df].split(" ").slice(2).join(" ")||"KCL"})]}),r("div",{className:"mt-8 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto",children:r("div",{className:"h-full bg-[#2F9BFF] rounded-full",style:{width:`${Nf*100}%`}})}),l("p",{className:"mt-3 text-[11px] tracking-[.22em] text-[#93A3BC]",children:[Math.round(Nf*100),"% DO PERCURSO"]})]}),r("div",{className:"absolute left-0 right-0 top-[68%] pointer-events-none",style:{transform:`translateX(${-15+Nf*115}%)`},children:l("div",{className:"relative w-[280px] sm:w-[380px] mx-0",children:[r("div",{className:"h-[10px] rounded-full bg-gradient-to-r from-transparent via-[#2F9BFF] to-white blur-[1px]"}),l("div",{className:"mt-2 mx-auto w-[220px] sm:w-[300px] h-[52px] rounded-[26px] bg-gradient-to-r from-[#0066FF] to-[#2F9BFF] shadow-[0_18px_50px_rgba(0,102,255,.45)] relative",children:[r("span",{className:"absolute left-6 top-2 w-16 h-5 rounded-full bg-[#050B1A]/70"}),r("span",{className:"absolute right-6 top-2 w-16 h-5 rounded-full bg-[#050B1A]/70"})]}),l("div",{className:"flex justify-between px-4 mt-1",children:[r("span",{className:"w-9 h-9 rounded-full bg-[#050B1A] border-4 border-[#C8D0DA]"}),r("span",{className:"w-9 h-9 rounded-full bg-[#050B1A] border-4 border-[#C8D0DA]"})]})]})})]})})})';

const newExp = 'r("section",{id:"experiencia",className:"scroll-mt-24 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full box-border",children:l("div",{ref:Vf,className:"relative overflow-hidden card-round border border-[var(--line)] bg-[#071126] p-6 sm:p-10 text-center min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-2xl",children:[r("div",{className:"absolute inset-0 transition-colors duration-500",style:{background:`linear-gradient(120deg, #050B1A, ${Nf>0.15&&Nf<0.85?"#0A1633":"#050B1A"} 70%, #050B1A)`}}),r(Af,{count:8}),l("div",{className:"relative max-w-4xl mx-auto w-full text-center z-10",children:[r("p",{className:"text-[12px] tracking-[.32em] text-[#2F9BFF] font-bold uppercase",children:"EXPERIÊNCIA KCL"}),l("h2",{className:"font-display font-extrabold leading-[1.08] mt-3 tracking-[-0.03em] text-[32px] sm:text-[56px] text-center mx-auto kcl-section-h2",children:[r("span",{className:"block sm:inline whitespace-nowrap",children:m5[Df].split(" ").slice(0,2).join(" ")+" "}),r("span",{className:"block sm:inline font-elegant text-[#2F9BFF] whitespace-nowrap",children:m5[Df].split(" ").slice(2).join(" ")||"KCL"})]}),r("div",{className:"mt-6 h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto shadow-inner",children:r("div",{className:"h-full bg-gradient-to-r from-[#0066FF] to-[#2F9BFF] rounded-full transition-all duration-300",style:{width:`${Math.max(4, Math.round(Nf*100))}%`}})}),l("p",{className:"mt-2.5 text-[12px] font-bold tracking-[.22em] text-[#93A3BC]",children:[Math.round(Nf*100),"% DO PERCURSO"]})]}),l("div",{className:"relative w-full h-[100px] overflow-hidden my-4 pointer-events-none z-10",children:[r("div",{className:"absolute left-0 right-0 bottom-3 h-[2px] bg-gradient-to-r from-transparent via-[#2F9BFF]/40 to-transparent"}),r("div",{className:"absolute top-0 pointer-events-none transition-transform duration-100 ease-out",style:{left:`${Math.min(92, Math.max(0, -10 + Nf * 105))}%`},children:l("div",{className:"relative w-[220px] sm:w-[260px]",children:[r("div",{className:"h-[6px] rounded-full bg-gradient-to-r from-transparent via-[#2F9BFF] to-white blur-[1px]"}),l("div",{className:"mt-1 mx-auto w-[180px] sm:w-[220px] h-[40px] rounded-[20px] bg-gradient-to-r from-[#0066FF] to-[#2F9BFF] shadow-[0_12px_36px_rgba(0,102,255,.55)] relative",children:[r("span",{className:"absolute left-5 top-1.5 w-12 h-4 rounded-full bg-[#050B1A]/70"}),r("span",{className:"absolute right-5 top-1.5 w-12 h-4 rounded-full bg-[#050B1A]/70"})]}),l("div",{className:"flex justify-between px-3 mt-1",children:[r("span",{className:"w-7 h-7 rounded-full bg-[#050B1A] border-4 border-[#C8D0DA]"}),r("span",{className:"w-7 h-7 rounded-full bg-[#050B1A] border-4 border-[#C8D0DA]"})]})]})})]})]})})';

if (!html.includes(oldExp)) throw new Error('Experiencia target not found');
html = html.replace(oldExp, newExp);
console.log('5. Experiencia section markup OK');

// Add smooth auto-drive loop to Nf
const oldScrollEffect = 'if(e(window.scrollY),Vf.current){let d=Vf.current.getBoundingClientRect();let winH=window.innerHeight;let start=winH*0.82;let span=Math.max(120,d.height+winH*0.35);let prog=(start-d.top)/span;_7(Math.max(0,Math.min(1,prog)))}};return c(),window.addEventListener("scroll",c,{passive:!0}),()=>window.removeEventListener("scroll",c)},[]),';

const newScrollEffect = 'if(e(window.scrollY),Vf.current){let d=Vf.current.getBoundingClientRect();let winH=window.innerHeight;let prog=(winH*0.9-d.top)/Math.max(100,d.height+winH*0.8);_7(Math.max(0,Math.min(1,prog)))}};return c(),window.addEventListener("scroll",c,{passive:!0}),()=>{window.removeEventListener("scroll",c)}},[]),H.useEffect(()=>{let step=0;let iv=setInterval(()=>{step=(step+1)%100;_7(step/100)},75);return()=>clearInterval(iv)},[]),';

if (!html.includes(oldScrollEffect)) throw new Error('Scroll effect target not found');
html = html.replace(oldScrollEffect, newScrollEffect);
console.log('5B. Experiencia auto-drive animation timer OK');

// 6. FAIXA MARQUEE MARKUP & CSS
const oldMarquee = 'className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-7 sm:py-9 my-3 sm:my-5 kcl-marquee-wrapper"';
const newMarquee = 'className:"overflow-hidden border-y border-[var(--line)] bg-[#0A1633] py-3.5 my-8 sm:my-10 kcl-marquee-wrapper"';
if (html.includes(oldMarquee)) {
  html = html.replace(oldMarquee, newMarquee);
  console.log('6. Marquee markup OK');
}

// 7. CSS RULES FOR PERFECTION (PASSOS, MARQUEE, LOCALIZACAO CARDS EQUAL HEIGHT)
const lastStyleIdx = html.indexOf('</style>\n\n</head>');

const cssInjections = `
/* =========================================================
   🎯 REFINAMENTOS SOLICITADOS PELO USUÁRIO (PERFEIÇÃO ABSOLUTA)
   ========================================================= */

/* 1. FAIXA MARQUEE: RESPIRO EXTERNO ACIMA E ABAIXO COM ALTURA SLIM ORIGINAL */
.kcl-marquee-wrapper {
  padding-top: 0.85rem !important;
  padding-bottom: 0.85rem !important;
  margin-top: 2rem !important;
  margin-bottom: 2.25rem !important;
  box-sizing: border-box !important;
}
@media (min-width: 640px) {
  .kcl-marquee-wrapper {
    padding-top: 0.95rem !important;
    padding-bottom: 0.95rem !important;
    margin-top: 2.5rem !important;
    margin-bottom: 2.75rem !important;
  }
}

/* 2. TRÊS PASSOS E ZERO ESTRESSE: ENCAIXE 100% PERFEITO DENTRO DO BLOCO */
#passos h2,
.kcl-passos-section h2 {
  white-space: normal !important;
  display: block !important;
  font-size: clamp(1.65rem, 2.5vw, 2.2rem) !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em !important;
  margin-top: 0.5rem !important;
  max-width: 100% !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
}
#passos h2 span,
.kcl-passos-section h2 span {
  font-size: inherit !important;
  display: inline !important;
  white-space: normal !important;
}

/* 3. LOCALIZAÇÃO: AMBOS OS CARDS COM EXATAMENTE O MESMO TAMANHO */
#localizacao .grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 1.5rem !important;
  align-items: stretch !important;
}
@media (min-width: 1024px) {
  #localizacao .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 2rem !important;
  }
}
#localizacao .grid > div,
#localizacao .grid > article,
#localizacao .card-round {
  min-height: 560px !important;
  height: 560px !important;
  max-height: 560px !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  box-sizing: border-box !important;
  border-radius: 24px !important;
  overflow: hidden !important;
}
#localizacao iframe {
  height: 100% !important;
  min-height: 100% !important;
  width: 100% !important;
  flex: 1 1 auto !important;
  display: block !important;
  border-radius: 20px !important;
}
@media (max-width: 768px) {
  #localizacao .grid > div,
  #localizacao .grid > article,
  #localizacao .card-round {
    min-height: 500px !important;
    height: 500px !important;
    max-height: 500px !important;
  }
}

/* 4. AGENDAR: CORPO DO TEXTO LATERAL EXPANDIDO COM LEITURA NOBRE */
#agendar .leading-relaxed {
  font-size: 1.05rem !important;
  line-height: 1.65 !important;
}
`;

if (lastStyleIdx !== -1) {
  html = html.substring(0, lastStyleIdx) + cssInjections + '\n' + html.substring(lastStyleIdx);
  console.log('7. CSS injections OK');
} else {
  throw new Error('Last style index not found');
}

// Validate with Babel parser
console.log('Validating JS syntax with Babel parser...');
const scriptStart = html.indexOf('<script type="module">');
const scriptEnd = html.indexOf('</script>', scriptStart);
const jsCode = html.substring(scriptStart + '<script type="module">'.length, scriptEnd);

parser.parse(jsCode, {
  sourceType: 'module',
  plugins: ['jsx']
});
console.log('Babel parsing SUCCESSFUL! Zero syntax errors.');

// Save updated html
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully wrote updated index.html!');
