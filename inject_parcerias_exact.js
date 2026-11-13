const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. INJETAR A ABA PARCERIAS EM j7
const targetJ7 = `{k:"convênios",l:"Convênios & Frotas",icon:ju},`;
const newJ7 = `{k:"convênios",l:"Convênios & Frotas",icon:ju},{k:"parcerias",l:"Parcerias & Espaço",icon:ju},`;

if (html.includes(targetJ7) && !html.includes('{k:"parcerias"')) {
  html = html.replace(targetJ7, newJ7);
  console.log('1. Aba Parcerias adicionada à lista j7!');
}

// 2. INJETAR O BLOCO DA ABA PARCERIAS LOGO ANTES DE Y==="caixa"
const targetCaixa = `]},u.id))})]}),Y==="caixa"&&`;
const parceriasBlock = `]},u.id))})]}),Y==="parcerias"&&l("div",{className:"grid gap-4",children:[
  l("div",{className:"rounded-[22px] bg-gradient-to-r from-[#0066FF] to-[#0A2540] p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4",children:[
    l("div",{children:[
      r("span",{className:"pill bg-white/20 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider",children:"🤝 PARCERIAS & USO DO ESPAÇO KCL"}),
      r("h2",{className:"text-2xl sm:text-3xl font-extrabold mt-2 leading-tight",children:"Gestão de Prestadores & Terceirizados"}),
      r("p",{className:"text-white/80 text-sm mt-1 max-w-xl",children:"Cadastre parceiros terceirizados que utilizam a infraestrutura da KCL para realizar serviços (Martelinho, PPF, Tapeçaria, etc.) e controle automaticamente a divisão de faturamento e comissões."})
    ]}),
    l("button",{onClick:()=>void window.kclOpenNewPartnerModal?.(),className:"rounded-full bg-white text-[#0066FF] hover:bg-neutral-100 font-extrabold text-xs px-5 py-3 shadow transition-all flex items-center gap-2",children:[r("span",{children:"+"})," NOVA PARCERIA"]})
  ]}),
  r("div",{id:"kcl-partners-container",className:"grid gap-4",children:l("div",{className:"p-6 text-center text-sm text-slate-500 rounded-2xl bg-white border border-slate-200",children:"Carregando parceiros..."})})
]}),Y==="caixa"&&`;

if (html.includes(targetCaixa) && !html.includes('Y==="parcerias"')) {
  html = html.replace(targetCaixa, parceriasBlock);
  console.log('2. Bloco JSX da aba Parcerias injetado!');
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved to dist/index.html and index.html!');
