const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('Original index.html length:', html.length);

// 1. ESPAÇAMENTO DO CARD DE PRÊMIOS
// Substituir a div do card de prêmios para incluir mt-6 sm:mt-8
const premioTarget = 'r("p",{className:"mt-4 text-[14px] text-[#93A3BC]",children:"Ranking salvo no banco do app (kce_gp_scores)."})]}),l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mb-2 shadow-lg"';
const premioReplacement = 'r("p",{className:"mt-4 text-[14px] text-[#93A3BC]",children:"Ranking salvo no banco do app (kce_gp_scores)."})]}),l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mt-6 sm:mt-8 mb-2 shadow-lg"';

if (html.includes(premioTarget)) {
    html = html.replace(premioTarget, premioReplacement);
    console.log('✓ Espaçamento do card de prêmios aplicado com sucesso!');
} else {
    console.log('⚠ Não encontrou exatamente o target de prêmios, procurando similar...');
    const pSub = 'card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mb-2 shadow-lg';
    if (html.includes(pSub)) {
        html = html.replace(pSub, 'card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mt-6 sm:mt-8 mb-2 shadow-lg');
        console.log('✓ Substituído via classe!');
    }
}

// 2. FOTOS DO ANTES E DEPOIS: Carro sujo de terra real vs Carro limpo e brilhando
// xv = carro sujo de terra / barro
// jv = carro limpo brilhando
const xvTarget = 'var xv="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85";';
const xvReplacement = 'var xv="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=85";';

if (html.includes(xvTarget)) {
    html = html.replace(xvTarget, xvReplacement);
    console.log('✓ Imagem do ANTES atualizada para carro sujo de terra real (photo-1517524008697-84bbe3c3fd98)!');
}

// E atualizar as legendas do antes e depois no componente do slider
const sliderDescTarget = 'children:"Poeira de estrada • marcas d\'água • pintura opaca"}';
const sliderDescReplacement = 'children:"Barro & terra pesada • poeira de estrada • pintura sem brilho"}';
if (html.includes(sliderDescTarget)) {
    html = html.replace(sliderDescTarget, sliderDescReplacement);
    console.log('✓ Legenda do antes atualizada!');
}

const sliderBadgeTarget = 'children:"ANTES"}';
const sliderBadgeReplacement = 'children:"🔴 ANTES • SUJO DE TERRA"}';
if (html.includes(sliderBadgeTarget)) {
    html = html.replace(sliderBadgeTarget, sliderBadgeReplacement);
    console.log('✓ Badge do antes atualizada!');
}

const sliderDepoisBadge = 'children:"DEPOIS"}';
const sliderDepoisReplacement = 'children:"🟢 DEPOIS • LIMPO & BRILHANDO"}';
if (html.includes(sliderDepoisBadge)) {
    html = html.replace(sliderDepoisBadge, sliderDepoisReplacement);
    console.log('✓ Badge do depois atualizada!');
}

// 3. CSS PARA ALINHAMENTO PERFEITO DOS PACOTES
const pacotesCss = `
/* ---- ALINHAMENTO MILIMÉTRICO DOS CARDS DE PACOTES (START, PRO, ULTRA) ---- */
#pacotes .grid {
  display: grid !important;
  align-items: stretch !important;
}
#pacotes article {
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
}
#pacotes article > div:first-child {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}
`;

if (!html.includes('ALINHAMENTO MILIMÉTRICO DOS CARDS DE PACOTES')) {
    html = html.replace('</style>', pacotesCss + '\n</style>');
    console.log('✓ CSS de alinhamento dos pacotes injetado no <style>!');
}

// 4. TESTAR SE A SINTAXE DO SCRIPT JS CONTINUA 100% VÁLIDA
const scriptTags = html.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
let syntaxOk = true;
if (scriptTags) {
    for (let i = 0; i < scriptTags.length; i++) {
        const scriptCode = scriptTags[i].replace(/<\/?script[\s\S]*?>/gi, '');
        try {
            new Function(scriptCode);
        } catch(err) {
            console.error(`ERRO DE SINTAXE NO SCRIPT ${i}:`, err.message);
            syntaxOk = false;
        }
    }
}

if (syntaxOk) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    const distHtml = path.join(projectDir, 'dist', 'index.html');
    if (fs.existsSync(path.dirname(distHtml))) {
        fs.writeFileSync(distHtml, html, 'utf8');
    }
    console.log('✓ Arquivos index.html e dist/index.html atualizados com sucesso e sintaxe validada!');
} else {
    console.error('❌ Abortado devido a erro de sintaxe.');
    process.exit(1);
}
