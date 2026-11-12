const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando correção completa do agendamento, contraste e resumo...');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Corrigir o estado e gravação do horário no agendamento (xl)
// Trocar time:"09:00" para pegar window.__kclSelectedTime || "09:30"
html = html.replace('time:"09:00"', 'time:(window.__kclSelectedTime||"09:30")');

// 2. Corrigir a grade de horários disponíveis para ter contraste absoluto (fundo escuro #122044, texto branco #FFFFFF, borda nítida #2F9BFF)
const oldSlotSection = html.indexOf('HORÁRIOS DISPONÍVEIS NESTE DIA');
if (oldSlotSection !== -1) {
  console.log('Localizada seção de horários. Substituindo por componente com contraste AAA e reatividade...');
  // Vamos buscar todo o bloco em volta de newDateTimeSnippet
  const startSlot = html.lastIndexOf('l("div",{className:"sm:col-span-2 grid sm:grid-cols-2 gap-4"', oldSlotSection);
  const endSlot = html.indexOf('l("div",{children:[r("label",{className:"text-[11px] font-bold tracking-[.16em]",children:"NOME"}', oldSlotSection);

  if (startSlot !== -1 && endSlot !== -1) {
    const perfectSlots = `l("div",{className:"sm:col-span-2 grid sm:grid-cols-2 gap-4",children:[
  l("div",{children:[
    r("label",{className:"text-xs font-extrabold tracking-[.14em] text-white flex items-center gap-2 mb-1",children:[
      r("span",{children:"📅"})," DATA DO AGENDAMENTO"
    ]}),
    r("input",{type:"date",value:D,onChange:(c)=>I(c.target.value),className:"field mt-1 text-white bg-[#050B1A] border-2 border-[#2F9BFF]/40 focus:border-[#0066FF] text-base p-3 font-semibold"})
  ]}),
  l("div",{children:[
    r("label",{className:"text-xs font-extrabold tracking-[.14em] text-white flex items-center justify-between mb-1",children:[
      r("span",{className:"flex items-center gap-2",children:[r("span",{children:"⏰"})," HORÁRIO ESCOLHIDO"]}),
      r("span",{className:"text-xs text-[#2F9BFF] font-black",children:"Vaga Garantida"})
    ]}),
    r("select",{id:"kcl-time-select",value:window.__kclSelectedTime||"09:30",onChange:(c)=>{
      window.__kclSelectedTime=c.target.value;
      const display=document.getElementById("kcl-chosen-time-badge");
      if(display) display.innerText="Horário: " + c.target.value;
      const allBtns=document.querySelectorAll('.time-chip-btn');
      allBtns.forEach(b=>{
        if(b.getAttribute('data-time')===c.target.value){
          b.className="time-chip-btn pill px-4 py-2.5 text-sm font-black bg-[#0066FF] text-white border-2 border-white shadow-lg shadow-[#0066FF]/40 scale-105 transition-all flex items-center gap-1.5";
        }else{
          b.className="time-chip-btn pill px-4 py-2.5 text-sm font-bold bg-[#122044] text-[#DBE7FF] border border-[#2F9BFF]/40 hover:border-white transition-all flex items-center gap-1.5";
        }
      });
    },className:"field mt-1 text-white bg-[#050B1A] border-2 border-[#2F9BFF]/40 text-base p-3 font-bold",children:[
      r("option",{value:"08:00",className:"bg-[#0A1633] text-white py-2 font-bold"},"08:00 — Manhã"),
      r("option",{value:"09:30",className:"bg-[#0A1633] text-white py-2 font-bold"},"09:30 — Manhã"),
      r("option",{value:"11:00",className:"bg-[#0A1633] text-white py-2 font-bold"},"11:00 — Manhã"),
      r("option",{value:"13:30",className:"bg-[#0A1633] text-white py-2 font-bold"},"13:30 — Tarde"),
      r("option",{value:"15:00",className:"bg-[#0A1633] text-white py-2 font-bold"},"15:00 — Tarde"),
      r("option",{value:"16:30",className:"bg-[#0A1633] text-white py-2 font-bold"},"16:30 — Tarde"),
      r("option",{value:"17:30",className:"bg-[#0A1633] text-white py-2 font-bold"},"17:30 — Tarde")
    ]})
  ]})
]}),
l("div",{className:"sm:col-span-2 card-round bg-[#050B1A] border-2 border-[#2F9BFF]/30 p-4 mt-1",children:[
  l("div",{className:"flex flex-wrap items-center justify-between gap-2 mb-3",children:[
    r("p",{className:"text-xs font-black tracking-wider text-white flex items-center gap-2",children:[
      r("span",{className:"h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"}),
      "SELECIONE O HORÁRIO DISPONÍVEL:"
    ]}),
    r("span",{id:"kcl-chosen-time-badge",className:"text-xs font-extrabold text-[#2F9BFF] bg-[#122044] px-3 py-1 rounded-full border border-[#2F9BFF]/40",children:"Horário: " + (window.__kclSelectedTime||"09:30")})
  ]}),
  l("div",{className:"flex flex-wrap gap-2.5",children:[
    {h:"08:00",t:"Manhã"},
    {h:"09:30",t:"Manhã"},
    {h:"11:00",t:"Manhã"},
    {h:"13:30",t:"Tarde"},
    {h:"15:00",t:"Tarde"},
    {h:"16:30",t:"Tarde"},
    {h:"17:30",t:"Tarde"}
  ].map((slot)=>r("button",{
    key:slot.h,
    type:"button",
    "data-time":slot.h,
    onClick:()=>{
      window.__kclSelectedTime=slot.h;
      const sel=document.getElementById("kcl-time-select");
      if(sel){ sel.value=slot.h; sel.dispatchEvent(new Event('change',{bubbles:true})); }
      const display=document.getElementById("kcl-chosen-time-badge");
      if(display) display.innerText="Horário: " + slot.h;
      const allBtns=document.querySelectorAll('.time-chip-btn');
      allBtns.forEach(b=>{
        if(b.getAttribute('data-time')===slot.h){
          b.className="time-chip-btn pill px-4 py-2.5 text-sm font-black bg-[#0066FF] text-white border-2 border-white shadow-lg shadow-[#0066FF]/40 scale-105 transition-all flex items-center gap-1.5";
        }else{
          b.className="time-chip-btn pill px-4 py-2.5 text-sm font-bold bg-[#122044] text-[#DBE7FF] border border-[#2F9BFF]/40 hover:border-white transition-all flex items-center gap-1.5";
        }
      });
    },
    className:((window.__kclSelectedTime||"09:30")===slot.h)
      ?"time-chip-btn pill px-4 py-2.5 text-sm font-black bg-[#0066FF] text-white border-2 border-white shadow-lg shadow-[#0066FF]/40 scale-105 transition-all flex items-center gap-1.5"
      :"time-chip-btn pill px-4 py-2.5 text-sm font-bold bg-[#122044] text-[#DBE7FF] border border-[#2F9BFF]/40 hover:border-white transition-all flex items-center gap-1.5",
    children:[
      r("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),
      slot.h," ",r("span",{className:"text-[11px] opacity-80"},`(${slot.t})`)
    ]
  }))})
]}),
`;
    html = html.slice(0, startSlot) + perfectSlots + html.slice(endSlot);
    console.log('Bloco de horários com contraste e reatividade aplicado!');
  }
}

// 3. Corrigir o Resumo do Agendamento (aumentar fonte, adicionar horário e botão WhatsApp de confirmação direta)
const oldResumo = 'r("p",{className:"font-extrabold text-xl",children:"Agendamento salvo ✓"})';
const resumoIdx = html.indexOf(oldResumo);
if (resumoIdx !== -1) {
  console.log('Localizado resumo do agendamento. Reformulando com fonte grande, horário e botão WhatsApp...');
  const cardStart = html.lastIndexOf('C&&l("div"', resumoIdx);
  const cardEnd = html.indexOf(']})]})]}),l("section"', resumoIdx);

  if (cardStart !== -1 && cardEnd !== -1) {
    const newResumo = `C&&l("div",{id:"agendamento-confirmado-resumo",className:"mt-6 bg-[#050B1A] border-2 border-[#0066FF] card-round p-6 sm:p-8 shadow-2xl shadow-[#0066FF]/25 animate-fadeIn",children:[
  l("div",{className:"flex items-center gap-3 border-b border-[#1E293B] pb-4",children:[
    r("span",{className:"h-12 w-12 rounded-full bg-emerald-500 text-white grid place-items-center text-2xl font-black shrink-0",children:"✓"}),
    l("div",{children:[
      r("p",{className:"font-extrabold text-2xl sm:text-3xl text-white tracking-tight",children:"Agendamento Confirmado!"}),
      r("p",{className:"text-base text-[#2F9BFF] font-bold mt-0.5",children:"Seu horário está reservado com exclusividade na KCL Estética."})
    ]})
  ]}),
  l("dl",{className:"mt-6 grid gap-3.5 text-base sm:text-lg",children:[
    l("div",{className:"flex justify-between items-center gap-4 py-2 border-b border-[#1E293B]/60",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"Serviço Escolhido"}),
      r("dd",{className:"font-black text-white text-right text-lg sm:text-xl",children:C.service})
    ]}),
    l("div",{className:"flex justify-between items-center gap-4 py-2 border-b border-[#1E293B]/60",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"Data Marcada"}),
      r("dd",{className:"font-black text-[#2F9BFF] text-lg sm:text-xl",children:new Date(C.date+"T12:00:00").toLocaleDateString("pt-BR")})
    ]}),
    l("div",{className:"flex justify-between items-center gap-4 py-2 border-b border-[#1E293B]/60",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"Horário Reservado"}),
      r("dd",{className:"font-black text-emerald-400 text-xl sm:text-2xl bg-[#122044] px-3.5 py-1 rounded-xl border border-emerald-500/40",children:C.time || window.__kclSelectedTime || "09:30"})
    ]}),
    l("div",{className:"flex justify-between items-center gap-4 py-2 border-b border-[#1E293B]/60",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"Cliente"}),
      r("dd",{className:"font-bold text-white",children:C.name})
    ]}),
    l("div",{className:"flex justify-between items-center gap-4 py-2 border-b border-[#1E293B]/60",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"WhatsApp"}),
      r("dd",{className:"font-bold text-white",children:C.phone})
    ]}),
    l("div",{className:"flex justify-between items-center gap-4 py-2",children:[
      r("dt",{className:"text-[#93A3BC] font-semibold",children:"Tipo de Veículo"}),
      r("dd",{className:"font-bold text-white",children:C.carType || C.vehicle})
    ]})
  ]}),
  l("div",{className:"mt-6 pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row gap-3",children:[
    r("a",{
      href:\`https://wa.me/5538999999999?text=\${encodeURIComponent("Olá KCL! Acabei de agendar pelo site:\\n• Serviço: " + C.service + "\\n• Data: " + new Date(C.date+"T12:00:00").toLocaleDateString("pt-BR") + "\\n• Horário: " + (C.time||window.__kclSelectedTime||"09:30") + "\\n• Nome: " + C.name)}\`,
      target:"_blank",
      rel:"noopener noreferrer",
      className:"w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-center py-4 px-6 text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2",
      children:[r("span",{children:"📲"})," Enviar Comprovante no WhatsApp"]
    })
  ]})
]})`;
    html = html.slice(0, cardStart) + newResumo + html.slice(cardEnd);
    console.log('Resumo ampliado com horário e botão WhatsApp inserido!');
  }
}

// 4. Salvar e compilar
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
console.log('index.html e dist/index.html atualizados com sucesso!');

// 5. Deploy Cloudflare
console.log('Fazendo deploy para Cloudflare...');
const out = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(out);
