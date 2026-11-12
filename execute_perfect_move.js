const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Inserir prêmios no aside (logo abaixo de Melhores voltas salvas)
const asideTarget = 'l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5",children:[r("h3",{className:"font-bold text-[18px]",children:"Melhores voltas salvas"}),Bf.length===0?r("p",{className:"text-[15px] text-[#93A3BC] mt-2",children:"Nenhuma corrida salva ainda. Seja a primeira no pódio."}):r("ol",{className:"mt-3 grid gap-2 text-[15px]",children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCE"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))})]})';

const asideReplacement = asideTarget + ',l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';

html = html.replace(asideTarget, asideReplacement);

// 2. Remover o card antigo que estava após o ranking
const bottomOld = ',l("div",{style:{marginTop:"40px",marginBottom:"16px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';

html = html.replace(bottomOld, '');

// 3. Centralizar AGENDAMENTO
const oldAgendar = 'r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})';
const newAgendar = 'r("p",{className:"text-center text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})';
html = html.replace(oldAgendar, newAgendar);

// Também centralizar o H2 do agendamento
const oldH2 = 'l("h2",{className:"font-display font-extrabold text-5xl sm:text-7xl tracking-tight mt-3",children:["Reserve seu",r("br",{}),r("span",{className:"font-elegant text-[#2F9BFF]",children:"horário"})]})';
const newH2 = 'l("h2",{className:"font-display font-extrabold text-5xl sm:text-7xl tracking-tight mt-3 text-center",children:["Reserve seu",r("br",{}),r("span",{className:"font-elegant text-[#2F9BFF]",children:"horário"})]})';
if (html.includes(oldH2)) {
    html = html.replace(oldH2, newH2);
    console.log('✓ H2 de agendamento centralizado!');
}

// E o parágrafo
const oldP = 'r("p",{className:"text-[17px] text-[#93A3BC] mt-4 leading-relaxed",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."})';
const newP = 'r("p",{className:"text-[17px] text-[#93A3BC] mt-4 leading-relaxed text-center",children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."})';
if (html.includes(oldP)) {
    html = html.replace(oldP, newP);
    console.log('✓ Parágrafo de agendamento centralizado!');
}

// 4. Validar sintaxe de todos os scripts
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
