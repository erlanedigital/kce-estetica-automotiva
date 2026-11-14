const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. HEADER: REDUZIR ALTURA E DEIXAR ESPAÇO PEQUENO ENTRE CABEÇALHO E INÍCIO DA PÁGINA
html = html.replace(
  'className:"px-1.5 sm:px-6 lg:px-10 pt-2 sm:pt-4",children:[l("header",{id:"header",style:{maxWidth:"1540px"},className:"kcl-wide-container relative z-10 mx-auto flex min-h-[68px] sm:min-h-[86px] w-full items-center justify-between gap-3 sm:gap-6 px-4 py-2 sm:px-7 sm:py-3',
  'className:"px-1.5 sm:px-6 lg:px-10 pt-3 sm:pt-4 pb-2.5 sm:pb-3",children:[l("header",{id:"header",style:{maxWidth:"1540px"},className:"kcl-wide-container relative z-10 mx-auto flex min-h-[56px] sm:min-h-[64px] w-full items-center justify-between gap-3 sm:gap-6 px-4 py-1.5 sm:px-6 sm:py-2'
);

// 2. ZERO SEED TOTAL: TEAM SEED
const teamSeedTarget = 'if(!localStorage.getItem("kce_seeded_team")&&!G?.records?.length){localStorage.setItem("kce_seeded_team","1");let Q=[{name:"Carlos Eduardo - Cadu",role:"Sócio / Gestão & Caixa",status:"Ativo",phone:"(38) 9812-2276",createdAt:new Date().toISOString()},{name:"Luiz Fernando",role:"Sócio / Produção & Detalhamento",status:"Ativo",phone:"(38) 99912-3344",createdAt:new Date().toISOString()},{name:"Kayan",role:"Sócio / Operação & Estoque",status:"Ativo",phone:"(38) 99833-2211",createdAt:new Date().toISOString()}];for(let S=0;S<Q.length;S++)await w("records.create",{collection:"kce_team",value:Q[S],idempotency_key:`team-seed-${S}-${Q[S].name}`.replace(/[^a-zA-Z0-9-_]/g,"-")});G=await w("records.list",{collection:"kce_team"})}';
if (html.includes(teamSeedTarget)) {
  html = html.replace(teamSeedTarget, '/* auto-seed disabled */');
  console.log('✓ Team seed purged.');
} else {
  console.log('Team seed exact target not found, using regex.');
  html = html.replace(/if\(!localStorage\.getItem\("kce_seeded_team"\)&&!G\?\.records\?\.length\)\{localStorage\.setItem\("kce_seeded_team","1"\);let Q=\[\{name:"Carlos Eduardo - Cadu"[^}]+;G=await w\("records\.list",\{collection:"kce_team"\}\)\}/, '/* auto-seed disabled */');
}

// 3. ZERO SEED TOTAL: PARTNERS SEED
const partnerSeedTarget = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.34,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let S=0;S<zn.length;S++)await w("records.create",{collection:"kce_partners",value:zn[S],idempotency_key:`partner-seed-${S}-${zn[S].name}`.replace(/[^a-zA-Z0-9-_]/g,"-")});u=await w("records.list",{collection:"kce_partners"})}';
if (html.includes(partnerSeedTarget)) {
  html = html.replace(partnerSeedTarget, '/* partner auto-seed disabled */');
  console.log('✓ Partner seed purged.');
} else {
  console.log('Partner seed exact target not found, using regex.');
  html = html.replace(/if\(!u\?\.records\?\.length\)\{let zn=\[\{name:"Cadu",role:"Gestão \/ Caixa"[^}]+;u=await w\("records\.list",\{collection:"kce_partners"\}\)\}/, '/* partner auto-seed disabled */');
}

// 4. ZERO SEED TOTAL: MARTELINHO FALLBACK
const martelinhoTarget = 'catch{}return[{id:"pt-1",name:"Martelinho de Ouro Express",specialty:"Martelinho de Ouro & Funilaria Artesanal",phone:"(38) 99945-1122",kclShare:30,totalValue:850,kclReceivable:255,dueDay:10,status:"A Receber"},{id:"pt-2",name:"Studio Insulfilm & PPF MOC",specialty:"Películas Window Blue & PPF",phone:"(38) 99812-4455",kclShare:25,totalValue:1200,kclReceivable:300,dueDay:15,status:"Pendente"}]';
if (html.includes(martelinhoTarget)) {
  html = html.replace(martelinhoTarget, 'catch{}return[]');
  console.log('✓ Martelinho fallback purged.');
}

// 5. CSS REFINEMENT PARA CABEÇALHO, MARQUEE, EXPERIÊNCIA E SEÇÕES
const headerCss = `
header#header {
  min-height: 56px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  margin-bottom: 8px !important;
}
@media (min-width: 1024px) {
  header#header {
    min-height: 64px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    margin-bottom: 12px !important;
  }
}
`;

if (!html.includes('header#header {\n  min-height: 56px !important;')) {
  html = html.replace('</style>', headerCss + '\n</style>');
}

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Applied final perfection.');
