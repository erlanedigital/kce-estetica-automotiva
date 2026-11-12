const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('--- 1. REMOVENDO FRASE DO GPS ---');
const phraseRegex = /r\("p",\{className:"text-sm text-\[#93A3BC\] mt-2",children:"Venha nos visitar no bairro São José ou trace sua rota pelo GPS com apenas 1 clique\."\}\),?/g;
if (phraseRegex.test(html)) {
  html = html.replace(phraseRegex, '');
  console.log('Frase do GPS removida com sucesso!');
} else {
  // Busca alternativa
  const rawIdx = html.indexOf('Venha nos visitar no bairro São José');
  if (rawIdx !== -1) {
    const start = html.lastIndexOf('r("p"', rawIdx);
    const end = html.indexOf('})', rawIdx) + 2;
    html = html.slice(0, start) + html.slice(end + 1); // remove também a vírgula
    console.log('Frase do GPS removida via substring.');
  }
}

console.log('--- 2. ADICIONANDO SELEÇÃO DE HORÁRIOS DISPONÍVEIS NO AGENDAMENTO ---');
// Vamos ver o trecho de DATA no form
const dataFieldSnippet = 'l("div",{children:[r("label",{className:"text-[11px] font-bold tracking-[.16em]",children:"DATA"}),r("input",{type:"date",value:D,onChange:(c)=>I(c.target.value),className:"field mt-2"})]})';

// Vamos adicionar a grade de horários disponíveis
const horáriosDisponíveis = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30', '17:30'];

// Vamos substituir o campo de data e adicionar a grade de horários disponíveis
const newDateTimeSnippet = `l("div",{className:"sm:col-span-2 grid sm:grid-cols-2 gap-4",children:[
  l("div",{children:[
    r("label",{className:"text-[11px] font-bold tracking-[.16em] text-white flex items-center gap-1.5",children:[
      r("span",{children:"📅"})," DATA PREFERIDA"
    ]}),
    r("input",{type:"date",value:D,onChange:(c)=>I(c.target.value),className:"field mt-2"})
  ]}),
  l("div",{children:[
    r("label",{className:"text-[11px] font-bold tracking-[.16em] text-white flex items-center justify-between",children:[
      r("span",{children:"⏰ HORÁRIO DISPONÍVEL"}),
      r("span",{className:"text-[10px] text-[#2F9BFF] font-bold",children:"Hora marcada"})
    ]}),
    r("select",{value:typeof selectedHour!=="undefined"?selectedHour:(window.__kclSelectedTime||"09:30"),onChange:(c)=>{window.__kclSelectedTime=c.target.value;if(typeof setSelectedHour==="function")setSelectedHour(c.target.value);else if(typeof setTime==="function")setTime(c.target.value);},className:"field mt-2",children:[
      r("option",{value:"08:00"},"08:00 — Disponível (Manhã)"),
      r("option",{value:"09:30"},"09:30 — Disponível (Manhã)"),
      r("option",{value:"11:00"},"11:00 — Disponível (Manhã)"),
      r("option",{value:"13:30"},"13:30 — Disponível (Tarde)"),
      r("option",{value:"15:00"},"15:00 — Disponível (Tarde)"),
      r("option",{value:"16:30"},"16:30 — Disponível (Tarde)"),
      r("option",{value:"17:30"},"17:30 — Disponível (Fim de tarde)")
    ]})
  ]})
]}),
l("div",{className:"sm:col-span-2",children:[
  r("p",{className:"text-[11px] font-bold tracking-wide text-[#93A3BC] mb-2",children:"HORÁRIOS DISPONÍVEIS NESTE DIA (CLIQUE PARA SELECIONAR):"}),
  l("div",{className:"flex flex-wrap gap-2",children:[
    {h:"08:00",p:"Manhã"},
    {h:"09:30",p:"Manhã"},
    {h:"11:00",p:"Manhã"},
    {h:"13:30",p:"Tarde"},
    {h:"15:00",p:"Tarde"},
    {h:"16:30",p:"Tarde"},
    {h:"17:30",p:"Tarde"}
  ].map((slot)=>r("button",{key:slot.h,type:"button",onClick:()=>{
    window.__kclSelectedTime=slot.h;
    const sel=document.querySelector('#agendar select:not([name]):not([id])')||document.querySelector('#agendar select');
    const inputs=document.querySelectorAll('#agendar select');
    inputs.forEach(s=>{if(s.innerHTML.includes(slot.h)){s.value=slot.h;s.dispatchEvent(new Event('change',{bubbles:true}));}});
    const btns=document.querySelectorAll('.time-slot-pill');
    btns.forEach(b=>{b.classList.remove('bg-[#0066FF]','text-white','border-[#0066FF]');b.classList.add('bg-[#050B1A]','text-[#93A3BC]','border-[var(--line)]');});
    event.currentTarget.classList.remove('bg-[#050B1A]','text-[#93A3BC]','border-[var(--line)]');
    event.currentTarget.classList.add('bg-[#0066FF]','text-white','border-[#0066FF]');
  },className:"time-slot-pill pill px-3.5 py-2 text-xs font-bold border border-[var(--line)] bg-[#050B1A] hover:border-[#0066FF] hover:text-white transition flex items-center gap-1.5",children:[
    r("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),
    slot.h," • ",r("span",{className:"text-[10px] opacity-75"},slot.p)
  ]}))})
]})`;

if (html.includes(dataFieldSnippet)) {
  html = html.replace(dataFieldSnippet, newDateTimeSnippet);
  console.log('Grade de horários disponíveis inserida com sucesso no agendamento!');
} else {
  console.log('Snippet de data não encontrado exatamente. Procurando padrão...');
  const dateRegex = /l\("div",\{children:\[r\("label",\{className:"text-\[11px\] font-bold tracking-\[\.16em\]",children:"DATA"\}\),r\("input",\{type:"date",value:D,onChange:\(c\)=>I\(c\.target\.value\),className:"field mt-2"\}\)\]\}\)/;
  if (dateRegex.test(html)) {
    html = html.replace(dateRegex, newDateTimeSnippet);
    console.log('Grade de horários inserida via regex!');
  }
}

// 3. Salvar alterações
fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html atualizado.');

// 4. Copiar para dist/
fs.copyFileSync(indexPath, path.join(__dirname, 'dist', 'index.html'));
console.log('dist/index.html sincronizado.');
