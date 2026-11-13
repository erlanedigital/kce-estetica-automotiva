const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. Título do banner azul: mudar "Painel Executivo de Vendas KCL" para "Painel Executivo de Serviços KCL"
html = html.replace('Painel Executivo de Vendas KCL', 'Painel Executivo de Serviços KCL');
console.log('✓ Título alterado para Painel Executivo de Serviços KCL');

// 2. Extrair o código de cada bloco dentro de Y==="visão"&&l("div",{className:"grid gap-4",children:[ ... ]})
// Bloco dos Sócios:
// l("section",{className:`${K} !p-3 sm:!p-4`,"aria-label":"Sócios — Minhas Tarefas",children:[ ... ]})
const sociosStart = html.indexOf('l("section",{className:`${K} !p-3 sm:!p-4`,"aria-label":"Sócios — Minhas Tarefas"');
const sociosEnd = html.indexOf('l("div",{className:"mb-6 grid gap-6",children:[', sociosStart);

if (sociosStart === -1 || sociosEnd === -1) {
  console.error('ERRO: Não encontrou os delimitadores da seção de sócios!');
  process.exit(1);
}

const sociosBlock = html.substring(sociosStart, sociosEnd); // includes the comma at the end? Let's check
console.log('sociosBlock preview:', sociosBlock.substring(0, 100), '... tail:', sociosBlock.substring(sociosBlock.length - 80));

// Bloco dos 6 KPIs:
const kpiStart = html.indexOf('r("div",{className:"grid sm:grid-cols-2 xl:grid-cols-3 gap-4",children:[{l:"Faturamento Hoje"');
const kpiEnd = html.indexOf('l("div",{className:"grid lg:grid-cols-[1.2fr_.8fr] gap-4"', kpiStart);
console.log('kpiStart:', kpiStart, 'kpiEnd:', kpiEnd);

// Bloco da grid (Faturamento 7 dias + Alertas estoque):
const grid7Start = kpiEnd;
const grid7End = html.indexOf('l("div",{className:K,children:[r("h2",{className:"font-bold",children:"Satisfação pós-venda"})', grid7Start);
console.log('grid7Start:', grid7Start, 'grid7End:', grid7End);

// Bloco Próximos agendamentos hoje:
const proxStart = html.indexOf('l("div",{className:K,children:[r("h2",{className:"font-bold",children:"Próximos agendamentos hoje"})');
const proxEnd = html.indexOf(']})]}),Y==="agendamentos"', proxStart);
console.log('proxStart:', proxStart, 'proxEnd:', proxEnd);

// Bloco Alerta de Estoque:
// l("div",{className:K,children:[r("h2",{className:"font-bold",children:"Alertas de estoque baixo"}),Tt.length===0? ... ]})
const estoqueStart = html.indexOf('l("div",{className:K,children:[r("h2",{className:"font-bold",children:"Alertas de estoque baixo"})');
// find closing of this div
const estoqueEnd = grid7End - 2; // right before ]}) of grid7
console.log('estoqueStart:', estoqueStart, 'estoqueEnd:', estoqueEnd);

// Bloco dos botões "+ Novo Agendamento" e "+ Novo Cliente"
const buttonsCode = 'l("div",{className:"flex flex-wrap gap-2.5",children:[l("button",{onClick:()=>{AA(null),ae({date:un(),time:"09:00",name:"",phone:"",vehicle:"Sedan",plate:"",service:"Lavagem Técnica",price:89,status:"Pendente"}),g("agendamentos"),Xu(!0)},className:"rounded-full bg-white text-[#0066FF] hover:bg-neutral-100 font-extrabold text-xs px-5 py-3 shadow transition-all flex items-center gap-2",children:[r("span",{children:"+"})," Novo Agendamento"]}),l("button",{onClick:()=>{g("clientes"),Ht(!0)},className:"rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-3 transition-all flex items-center gap-1.5",children:[r("span",{children:"+"})," Novo Cliente"]}),l("button",{onClick:()=>g("caixa"),className:"rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-3 transition-all flex items-center gap-1.5",children:[r("span",{children:"📊"})," DRE & RELATÓRIOS"]}),l("button",{onClick:()=>g("produção"),className:"rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-3 transition-all flex items-center gap-1.5",children:[r("span",{children:"🚗"})," PÁTIO EM TEMPO REAL"]})]})';

// Atualizar os botões do banner do Painel Executivo para ter "+ Novo Agendamento" e "+ Novo Cliente"
const oldBannerButtonsStart = html.indexOf('l("div",{className:"flex flex-wrap gap-2.5",children:[', sociosEnd);
const oldBannerButtonsEnd = html.indexOf(']})', oldBannerButtonsStart) + 3;
console.log('Old banner buttons:', html.substring(oldBannerButtonsStart, oldBannerButtonsEnd));

html = html.substring(0, oldBannerButtonsStart) + buttonsCode + html.substring(oldBannerButtonsEnd);
console.log('✓ Botões "+ Novo Agendamento" e "+ Novo Cliente" inseridos no Painel Executivo!');

// Salvar temporariamente para checagem
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Salvo intermediário.');
