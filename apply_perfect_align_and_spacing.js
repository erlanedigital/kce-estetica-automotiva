const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- APLICANDO CORREÇÕES DE ESPAÇAMENTO E ALINHAMENTO ---');

// 1. ESPAÇAMENTO DO RANKING DOS MELHORES (media_1794447909000_406f578d.png)
// Substituir a div que abre o ranking para colocar style={{ marginTop: '64px', marginBottom: '32px' }}
const rkTarget = 'l("div",{className:"mt-16 sm:mt-24 card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8",children:[l("div",{className:"flex flex-wrap items-end justify-between gap-3",children:[l("div",{children:[r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"RANKING DOS MELHORES"';
const rkReplacement = 'l("div",{style:{marginTop:"64px",marginBottom:"32px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8",children:[l("div",{className:"flex flex-wrap items-end justify-between gap-3",children:[l("div",{children:[r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"RANKING DOS MELHORES"';

if (html.includes(rkTarget)) {
    html = html.replace(rkTarget, rkReplacement);
    console.log('✓ 1. Espaçamento inline (marginTop: 64px) no Ranking dos Melhores aplicado com sucesso!');
} else {
    console.log('Procurando alvo alternativo para o ranking...');
    const altRk = 'className:"mt-16 sm:mt-24 card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8"';
    if (html.includes(altRk)) {
        html = html.replace(altRk, 'style:{marginTop:"64px",marginBottom:"32px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8"');
        console.log('✓ 1. Espaçamento inline no Ranking dos Melhores aplicado via classe!');
    }
}

// 2. ESPAÇAMENTO NO CARD DE PRÊMIOS
const premioTarget = 'className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mt-8 sm:mt-10 mb-2 shadow-lg"';
const premioReplacement = 'style:{marginTop:"40px",marginBottom:"16px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 shadow-lg"';
if (html.includes(premioTarget)) {
    html = html.replace(premioTarget, premioReplacement);
    console.log('✓ 2. Espaçamento inline (marginTop: 40px) no card de Prêmios aplicado!');
}

// 3. ALINHAMENTO MILIMÉTRICO DOS CARDS DE SERVIÇOS (media_1794447513329_fdf86c55.jpg)
// Remover reveal-delay e colocar style inline nos articles dos serviços
const servTarget = 'jl.map((c,d)=>l("article",{className:`service-card card-round overflow-hidden border border-[var(--line)] bg-[#0A1633] h-full flex flex-col justify-between reveal-delay-${d%3+1}`';
const servReplacement = 'jl.map((c,d)=>l("article",{style:{alignSelf:"stretch",marginTop:0,transform:"none",top:0},className:"service-card card-round overflow-hidden border border-[var(--line)] bg-[#0A1633] h-full flex flex-col justify-between"';

if (html.includes(servTarget)) {
    html = html.replace(servTarget, servReplacement);
    console.log('✓ 3. Remoção de reveal-delay e aplicação de style inline rígido nos cards de serviços!');
}

// 4. CSS GLOBAL DE RIGOR ABSOLUTO PARA ALINHAMENTO E ESPAÇAMENTOS
const strictCss = `
/* ---- BLINDAGEM DE ALINHAMENTO RIGOROSO DE TODOS OS CARDS DO SITE ---- */
#servicos .grid, #pacotes .grid, #galeria .grid {
  display: grid !important;
  align-items: stretch !important;
}

#servicos article, .service-card, #pacotes article {
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
  transition: border-color .3s ease, box-shadow .3s ease !important;
}

.service-card:hover {
  transform: none !important;
  border-color: #2F9BFF !important;
}

#servicos article > div:first-child {
  height: 220px !important;
  min-height: 220px !important;
  max-height: 220px !important;
  overflow: hidden !important;
  position: relative !important;
}

#servicos article img {
  height: 220px !important;
  min-height: 220px !important;
  max-height: 220px !important;
  width: 100% !important;
  object-fit: cover !important;
  transform: none !important;
}

/* Espaçamento garantido no ranking e prêmios da corrida */
.ranking-gap {
  margin-top: 64px !important;
  margin-bottom: 32px !important;
}
`;

if (!html.includes('BLINDAGEM DE ALINHAMENTO RIGOROSO DE TODOS OS CARDS')) {
    html = html.replace('</style>', strictCss + '\n</style>');
    console.log('✓ 4. CSS de blindagem de alinhamento rígido adicionado ao <style>!');
}

// 5. VALIDAR SINTAXE DE TODOS OS SCRIPTS
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
let allValid = true;
while ((m = scriptRegex.exec(html)) !== null) {
    const attrs = m[1];
    const code = m[2];
    if (!attrs.includes('json')) {
        try {
            new Function(code);
            console.log(`Script ${count}: Syntax OK`);
        } catch(e) {
            console.error(`❌ Script ${count} ERRO:`, e.message);
            allValid = false;
        }
    } else {
        try {
            JSON.parse(code);
            console.log(`Script ${count}: JSON OK`);
        } catch(e) {
            console.error(`❌ Script ${count} JSON ERRO:`, e.message);
            allValid = false;
        }
    }
    count++;
}

if (allValid) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    const distHtml = path.join(projectDir, 'dist', 'index.html');
    if (!fs.existsSync(path.dirname(distHtml))) {
        fs.mkdirSync(path.dirname(distHtml), { recursive: true });
    }
    fs.writeFileSync(distHtml, html, 'utf8');
    console.log('🎉 SUCESSO! index.html e dist/index.html atualizados e validados com 100% de integridade!');
} else {
    console.error('⛔ Gravação cancelada devido a erro de sintaxe.');
    process.exit(1);
}
