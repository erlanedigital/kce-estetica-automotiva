const fs = require('fs');

const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// 1. Inserir prêmios no aside
const asideTarget = 'l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5",children:[r("h3",{className:"font-bold text-[18px]",children:"Melhores voltas salvas"}),Bf.length===0?r("p",{className:"text-[15px] text-[#93A3BC] mt-2",children:"Nenhuma corrida salva ainda. Seja a primeira no pódio."}):r("ol",{className:"mt-3 grid gap-2 text-[15px]",children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCE"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))})]})';

const asideReplacement = asideTarget + ',l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';

let testHtml = content.replace(asideTarget, asideReplacement);

// 2. Remover o card antigo que estava após o ranking
const bottomOld = ',l("div",{style:{marginTop:"40px",marginBottom:"16px"},className:"card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 shadow-lg",children:[l("h3",{className:"font-bold flex items-center justify-center gap-2 text-center text-white",children:[r(fu,{size:17})," Prêmios"]}),l("ul",{className:"mx-auto mt-3 grid w-fit gap-2 text-sm text-[#F2F6FF]",children:[r("li",{children:"🥇 +300 pts = KCE15"}),r("li",{children:"🥈 +150 pts = KCE10"}),r("li",{children:"🥉 Abaixo disso = KCE5"})]})]})';

testHtml = testHtml.replace(bottomOld, '');

// 3. Centralizar AGENDAMENTO
const oldAgendar = 'r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})';
const newAgendar = 'r("p",{className:"text-center text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"AGENDAMENTO"})';
testHtml = testHtml.replace(oldAgendar, newAgendar);

// Testar sintaxe do Script 5
const scriptTags = testHtml.match(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);
let s5 = scriptTags[5].replace(/<\/?script[^>]*>/gi, '');
try {
    new Function(s5);
    console.log('✅ SINTAXE DO SCRIPT 5 PERFEITA!');
} catch(err) {
    console.error('❌ ERRO:', err.message);
}
