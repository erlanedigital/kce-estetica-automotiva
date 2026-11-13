const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('Original length:', content.length);

// 1. Aumentar e destacar a frase "Aguarde confirmação no seu WhatsApp."
// Localizar onde C&&r("p",{className:...children:"📲 Aguarde confirmação no seu WhatsApp."}) ou similar está
const phraseTargetRegex = /C&&r\("p",\{className:"[^"]*",children:"📲?\s*Aguarde confirmação no seu WhatsApp\."\}\)/;
if (phraseTargetRegex.test(content)) {
  console.log('Found phrase target regex!');
  content = content.replace(
    phraseTargetRegex,
    'C&&l("div",{className:"mt-5 text-center p-4 sm:p-5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)] flex flex-col items-center justify-center gap-1.5 animate-pulse",children:[r("span",{className:"text-lg sm:text-2xl font-black text-emerald-300 tracking-wide flex items-center justify-center gap-2",children:"📲 Aguarde confirmação no seu WhatsApp."}),r("span",{className:"text-xs sm:text-sm font-semibold text-emerald-200/90",children:"Nossa equipe entrará em contato para confirmar o dia e horário."})]})'
  );
} else {
  console.error('Could not match phraseTargetRegex!');
}

// 2. Padronização rigorosa dos títulos H2 no desktop
// Adicionar classe kcl-section-h2 nos 10 H2s principais
const h2Replacements = [
  // 1. Serviços
  {
    from: 'r("h2",{className:"mx-auto w-full max-w-[1120px] font-display font-extrabold leading-[1.18] tracking-tight text-[clamp(1.78rem,5.5vw,3.78rem)]"',
    to: 'r("h2",{className:"mx-auto w-full max-w-[1120px] font-display font-extrabold leading-[1.18] tracking-tight text-[clamp(1.78rem,5.5vw,3.78rem)] kcl-section-h2"'
  },
  // 2. Experiência KCL
  {
    from: 'l("h2",{className:"font-display font-extrabold leading-[1.04] mt-5 tracking-[-0.03em] text-[38px] sm:text-[78px] lg:text-[90px] text-center mx-auto"',
    to: 'l("h2",{className:"font-display font-extrabold leading-[1.04] mt-5 tracking-[-0.03em] text-[38px] sm:text-[78px] text-center mx-auto kcl-section-h2"'
  },
  // 3. Três passos
  {
    from: 'l("h2",{className:"font-display font-extrabold text-[32px] sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] leading-[1.14] tracking-tight mt-3 text-left sm:whitespace-nowrap"',
    to: 'l("h2",{className:"font-display font-extrabold text-[32px] sm:text-3xl md:text-4xl leading-[1.14] tracking-tight mt-3 text-left sm:whitespace-nowrap kcl-section-h2"'
  },
  // 4. Pacotes
  {
    from: 'l("h2",{className:"relative text-center font-display font-extrabold text-[31px] sm:text-[56px] tracking-tight mt-3 whitespace-nowrap mx-auto"',
    to: 'l("h2",{className:"relative text-center font-display font-extrabold text-[31px] sm:text-[56px] tracking-tight mt-3 whitespace-nowrap mx-auto kcl-section-h2"'
  },
  // 5. Antes & Depois
  {
    from: 'l("h2",{className:"font-display font-extrabold text-[25px] sm:text-[46px] lg:text-[56px] leading-[1.08] tracking-tight mt-5 mb-6 whitespace-nowrap text-center mx-auto"',
    to: 'l("h2",{className:"font-display font-extrabold text-[25px] sm:text-[46px] leading-[1.08] tracking-tight mt-5 mb-6 whitespace-nowrap text-center mx-auto kcl-section-h2"'
  },
  // 6. Estúdio & Processos
  {
    from: 'l("h2",{className:"text-center font-display font-extrabold text-[36px] sm:text-[53px] leading-[1.12] tracking-tight mt-3 mx-auto w-full flex flex-col sm:flex-row items-center justify-center sm:gap-3"',
    to: 'l("h2",{className:"text-center font-display font-extrabold text-[36px] sm:text-[53px] leading-[1.12] tracking-tight mt-3 mx-auto w-full flex flex-col sm:flex-row items-center justify-center sm:gap-3 kcl-section-h2"'
  },
  // 7. Minigame
  {
    from: 'l("h2",{className:"font-display font-extrabold text-[30px] sm:text-[60px] leading-[1.15] tracking-tight mt-3 text-center"',
    to: 'l("h2",{className:"font-display font-extrabold text-[30px] sm:text-[60px] leading-[1.15] tracking-tight mt-3 text-center kcl-section-h2"'
  },
  // 8. Agendamento
  {
    from: 'l("h2",{className:"font-display font-extrabold text-[32px] sm:text-6xl tracking-tight mt-3 text-center whitespace-nowrap"',
    to: 'l("h2",{className:"font-display font-extrabold text-[32px] sm:text-6xl tracking-tight mt-3 text-center whitespace-nowrap kcl-section-h2"'
  },
  // 9. Depoimentos
  {
    from: 'l("h2",{className:"text-center font-display font-extrabold text-[29px] sm:text-[53px] tracking-tight mt-3 whitespace-nowrap mx-auto"',
    to: 'l("h2",{className:"text-center font-display font-extrabold text-[29px] sm:text-[53px] tracking-tight mt-3 whitespace-nowrap mx-auto kcl-section-h2"'
  },
  // 10. Localização
  {
    from: 'l("h2",{className:"text-center font-display font-extrabold text-[34px] sm:text-[53px] leading-[1.12] tracking-tight mt-3 mx-auto w-full flex flex-col sm:flex-row items-center justify-center sm:gap-3"',
    to: 'l("h2",{className:"text-center font-display font-extrabold text-[34px] sm:text-[53px] leading-[1.12] tracking-tight mt-3 mx-auto w-full flex flex-col sm:flex-row items-center justify-center sm:gap-3 kcl-section-h2"'
  }
];

h2Replacements.forEach((rep, i) => {
  if (content.includes(rep.from)) {
    content = content.replace(rep.from, rep.to);
    console.log(`H2 #${i + 1} updated with kcl-section-h2!`);
  } else {
    console.warn(`H2 #${i + 1} NOT found!`);
  }
});

// Adicionar a regra CSS estrita para desktop
const cssRule = `
@media (min-width: 1024px) {
  /* PADRONIZAÇÃO RIGOROSA DE TÍTULOS DE SEÇÃO NO DESKTOP */
  .kcl-section-h2,
  #servicos h2,
  #passos h2,
  .steps-cascade-wrapper h2,
  #pacotes h2,
  #galeria h2,
  #processos h2,
  #corrida h2,
  #agendar h2,
  #depoimentos h2,
  #localizacao h2 {
    font-size: 2.75rem !important; /* 44px uniforme em todas as seções */
    line-height: 1.15 !important;
    font-weight: 800 !important;
    letter-spacing: -0.025em !important;
  }
  .kcl-section-h2 span,
  #servicos h2 span,
  #galeria h2 span,
  #corrida h2 span,
  #localizacao h2 span,
  #agendar h2 span {
    font-size: inherit !important;
  }
}
`;

if (!content.includes('PADRONIZAÇÃO RIGOROSA DE TÍTULOS DE SEÇÃO NO DESKTOP')) {
  content = content.replace('</style>', cssRule + '\n</style>');
  console.log('CSS rule injected into style tag!');
}

// 3. Eliminar auto-seeding de clientes e mock data
// Substituir blocos de criação de sementes fakes por operações vazias
// kce_bookings
content = content.replace(
  /if\(!localStorage\.getItem\('kce_seeded_bookings'\)&&!y\?\.records\?\.length\)\{localStorage\.setItem\('kce_seeded_bookings','1'\);let Q=\[\{service:"Lavagem Técnica"[\s\S]*?idempotency_key:`booking-seed-\$\{S\}-\$\{u\}`\}\);y=await w\("records\.list",\{collection:"kce_bookings"\}\)\}\}/,
  'localStorage.setItem("kce_seeded_bookings","1");/* auto-seed disabled */'
);

// kce_clients
content = content.replace(
  /if\(!localStorage\.getItem\('kce_seeded_clients'\)&&!W\?\.records\?\.length\)\{localStorage\.setItem\('kce_seeded_clients','1'\);let Q=\[\{name:"Guilherme Almeida"[\s\S]*?idempotency_key:`client-seed-\$\{S\}-\$\{Q\[S\]\.plate\}`\}\);W=await w\("records\.list",\{collection:"kce_clients"\}\)\}\}/,
  'localStorage.setItem("kce_seeded_clients","1");/* auto-seed disabled */'
);

// kce_stock
content = content.replace(
  /let J=await w\("records\.list",\{collection:"kce_stock"\}\);if\(!J\?\.records\?\.length\)\{let Q=\[\{name:"Shampoo Neutro"[\s\S]*?replace\(\/\[\^a-zA-Z0-9-_\]\/g,"-"\)\}\);J=await w\("records\.list",\{collection:"kce_stock"\}\)\}/,
  'let J=await w("records.list",{collection:"kce_stock"});/* auto-seed disabled */'
);

// kce_finance
content = content.replace(
  /let fn=await w\("records\.list",\{collection:"kce_finance"\}\);if\(!fn\?\.records\?\.length\)\{let Q=\[\{date:u,description:"Lavagem Técnica — Guilherme Almeida"[\s\S]*?idempotency_key:`fin-seed-\$\{S\}-\$\{u\}`\}\);fn=await w\("records\.list",\{collection:"kce_finance"\}\)\}/,
  'let fn=await w("records.list",{collection:"kce_finance"});/* auto-seed disabled */'
);

// kce_os
content = content.replace(
  /if\(!localStorage\.getItem\('kce_seeded_os'\)&&!cn\?\.records\?\.length\)\{localStorage\.setItem\('kce_seeded_os','1'\);let Q=\[\{number:"#KCL-001"[\s\S]*?idempotency_key:`os-seed-\$\{S\}-\$\{Q\[S\]\.number\}`\}\);cn=await w\("records\.list",\{collection:"kce_os"\}\)\}\}/,
  'localStorage.setItem("kce_seeded_os","1");/* auto-seed disabled */'
);

// kce_members
content = content.replace(
  /let on=await w\("records\.list",\{collection:"kce_members"\}\);if\(!on\?\.records\?\.length\)\{let Q=\[\{name:"Marina Souza"[\s\S]*?idempotency_key:`member-seed-\$\{S\}-\$\{Q\[S\]\.plate\}`\}\);on=await w\("records\.list",\{collection:"kce_members"\}\)\}/,
  'let on=await w("records.list",{collection:"kce_members"});/* auto-seed disabled */'
);

// kce_agreements
content = content.replace(
  /if\(!localStorage\.getItem\('kce_seeded_agreements'\)&&!zn\?\.records\?\.length\)\{localStorage\.setItem\('kce_seeded_agreements','1'\);let Q=\[\{company:"Empresa ABC"[\s\S]*?replace\(\/\[\^a-zA-Z0-9-_\]\/g,"-"\)\}\);zn=await w\("records\.list",\{collection:"kce_agreements"\}\)\}\}/,
  'localStorage.setItem("kce_seeded_agreements","1");/* auto-seed disabled */'
);

// kce_payables
content = content.replace(
  /let b=await w\("records\.list",\{collection:"kce_payables"\}\);if\(!b\?\.records\?\.length\)\{let Q=\[\{description:"Aluguel do ponto"[\s\S]*?idempotency_key:`pay-seed-\$\{S\}-\$\{u\}`\}\);b=await w\("records\.list",\{collection:"kce_payables"\}\)\}/,
  'let b=await w("records.list",{collection:"kce_payables"});/* auto-seed disabled */'
);

// kce_feedback
content = content.replace(
  /if\(!localStorage\.getItem\('kce_seeded_feedback'\)&&!an\?\.records\?\.length\)\{localStorage\.setItem\('kce_seeded_feedback','1'\);let Q=\[\{client:"Marina Souza"[\s\S]*?replace\(\/\[\^a-zA-Z0-9-_\]\/g,"-"\)\}\);an=await w\("records\.list",\{collection:"kce_feedback"\}\)\}\}/,
  'localStorage.setItem("kce_seeded_feedback","1");/* auto-seed disabled */'
);

// 4. Injeção de script de atualização forçada no <head>
const forceUpdateScript = `
<script>
  // ATUALIZAÇÃO FORÇADA DE CACHE & SERVICE WORKER
  (function(){
    var CURRENT_BUILD = 'kcl-build-20261113-v67';
    if (localStorage.getItem('kcl_last_build') !== CURRENT_BUILD) {
      localStorage.setItem('kcl_last_build', CURRENT_BUILD);
      if ('caches' in window) {
        caches.keys().then(function(keys){
          keys.forEach(function(k){ caches.delete(k); });
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(regs){
          regs.forEach(function(r){ r.unregister(); });
        });
      }
    }
  })();
</script>
`;

if (!content.includes('kcl-build-20261113-v67')) {
  content = content.replace('<head>', '<head>\n' + forceUpdateScript);
  console.log('Force update script injected into head!');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Applied successfully! New length:', content.length);
