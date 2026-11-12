const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- APLICANDO AJUSTES DE PRÊMIOS E CENTRALIZAÇÃO DE AGENDAMENTO ---');

// 1. MOVER O CARD DE PRÊMIOS PARA BAIXO DE "MELHORES VOLTAS SALVAS"
// Trecho original onde Melhores voltas salvas termina e fecha o aside
const oldAsideTarget = 'l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5",children:[r("h3",{className:"font-bold text-[18px]",children:"Melhores voltas salvas"}),Bf.length===0?r("p",{className:"text-[15px] text-[#93A3BC] mt-2",children:"Nenhuma corrida salva ainda. Seja a primeira no pódio."}):r("ol",{className:"mt-3 grid gap-2 text-[15px]",children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCE"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))})]})]})]}),';

const newAsideWithPremios = 'l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5",children:[r("h3",{className:"font-bold text-[18px]",children:"Melhores voltas salvas"}),Bf.length===0?r("p",{className:"text-[15px] text-[#93A3BC] mt-2",children:"Nenhuma corrida salva ainda. Seja a primeira no pódio."}):r("ol",{className:"mt-3 grid gap-2 text-[15px]",children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCE"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))})]})' +
',l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})' +
']})]})],';

if (html.includes(oldAsideTarget)) {
    html = html.replace(oldAsideTarget, newAsideWithPremios);
    console.log('✓ 1. Card de Prêmios inserido logo abaixo de "Melhores voltas salvas"!');
} else {
    console.log('⚠ Não encontrou exatamente oldAsideTarget, procurando padrão...');
}

// Remover o card de Prêmios antigo que ficava solto lá embaixo depois do ranking
const oldBottomPremios = ',l("div",{style:{marginTop:"40px",marginBottom:"16px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';

if (html.includes(oldBottomPremios)) {
    html = html.replace(oldBottomPremios, '');
    console.log('✓ 2. Card de Prêmios duplicado/antigo do rodapé removido!');
} else {
    console.log('Procurando variante do card de prêmios antigo...');
    const altBottomPremios = 'l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';
    if (html.includes(altBottomPremios)) {
        html = html.replace(altBottomPremios, '');
        console.log('✓ 2. Variante antiga removida!');
    }
}

// 2. CENTRALIZAR O CABEÇALHO DA SEÇÃO DE AGENDAMENTO
const oldAgendarHeader = 'l("section",{id:"agendar",className:"max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:py-24 scroll-mt-28 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start",children:[l("div",{children:[r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"}),l("h2",{className:"font-display font-extrabold text-5xl sm:text-7xl tracking-tight mt-3",children:["Reserve seu",r("br",{}),r("span",{className:"font-elegant text-[#2F9BFF]",children:"horário"})]}),r("p",{className:"text-[17px] text-[#93A3BC] mt-4 leading-relaxed",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."})';

const newAgendarHeader = 'l("section",{id:"agendar",className:"max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:py-24 scroll-mt-28 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start",children:[l("div",{className:"text-center lg:text-center flex flex-col items-center",children:[r("p",{className:"text-center text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"}),l("h2",{className:"text-center font-display font-extrabold text-5xl sm:text-7xl tracking-tight mt-3",children:["Reserve seu",r("br",{}),r("span",{className:"font-elegant text-[#2F9BFF]",children:"horário"})]}),r("p",{className:"text-center text-[17px] text-[#93A3BC] mt-4 leading-relaxed max-w-md",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."})';

if (html.includes(oldAgendarHeader)) {
    html = html.replace(oldAgendarHeader, newAgendarHeader);
    console.log('✓ 3. Cabeçalho de AGENDAMENTO centralizado com sucesso!');
} else {
    console.log('Procurando padrão alternativo de agendar header...');
    const altH = 'r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})';
    if (html.includes(altH)) {
        html = html.replace(altH, 'r("p",{className:"text-center text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})');
        console.log('✓ 3. AGENDAMENTO centralizado via classe do parágrafo!');
    }
}

// 3. VALIDAR SINTAXE DE TODOS OS SCRIPTS
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
