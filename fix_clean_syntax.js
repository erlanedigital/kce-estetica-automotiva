const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Trecho problemático atual:
/*
[L199]   u.value.status==="Pendente"?r("button",{onClick:async()=>{
[L200]     await er(u,"Confirmado");
[L201]     l("button",{onClick:()=>{
[L202]     let cPhone=(u.value.phone||"").replace(/\D/g,"");
...
[L206]     window.open(`https://wa.me/${cPhone}?text=${confMsg}`,"_blank");
[L207]   },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),
*/

// O botão original de aceitar agendamento era:
// u.value.status==="Pendente"?r("button",{onClick:()=>void er(u,"Confirmado"),className:"rounded-full bg-emerald-600 text-white px-2.5 py-1 text-xs font-bold",children:"Aceitar"}):null,
// seguido do botão do WhatsApp:
// l("button",{onClick:()=>{
//   let cPhone=(u.value.phone||"").replace(/\D/g,"");
//   if(cPhone.length===10||cPhone.length===11){if(!cPhone.startsWith("55"))cPhone="55"+cPhone;}
//   let dFormatted=u.value.date?u.value.date.split("-").reverse().join("/"):u.value.date;
//   let confMsg=encodeURIComponent(`Olá ${u.value.name}! Aqui é da KCL Estética Automotiva. ✅\n\nSua solicitação de agendamento para *${u.value.service}* no dia *${dFormatted}* às *${u.value.time||"09:00"}* foi ACEITA e CONFIRMADA na nossa agenda!\n\n📍 Endereço: Próximo à Praça de Esportes, Montes Claros - MG.\nTe esperamos!`);
//   window.open(`https://wa.me/${cPhone}?text=${confMsg}`,"_blank");
// },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),

const target = `  u.value.status==="Pendente"?r("button",{onClick:async()=>{
    await er(u,"Confirmado");
    l("button",{onClick:()=>{
    let cPhone=(u.value.phone||"").replace(/\\D/g,"");
    if(cPhone.length===10||cPhone.length===11){if(!cPhone.startsWith("55"))cPhone="55"+cPhone;}
    let dFormatted=u.value.date?u.value.date.split("-").reverse().join("/"):u.value.date;
    let confMsg=encodeURIComponent(\`Olá \${u.value.name}! Aqui é da KCL Estética Automotiva. ✅\\n\\nSua solicitação de agendamento para *\${u.value.service}* no dia *\${dFormatted}* às *\${u.value.time||"09:00"}* foi ACEITA e CONFIRMADA na nossa agenda!\\n\\n📍 Endereço: Próximo à Praça de Esportes, Montes Claros - MG.\\nTe esperamos!\`);
    window.open(\`https://wa.me/\${cPhone}?text=\${confMsg}\`,"_blank");
  },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),`;

const replacement = `  u.value.status==="Pendente"?r("button",{onClick:()=>void er(u,"Confirmado"),className:"rounded-full bg-emerald-600 text-white px-2.5 py-1 text-xs font-bold",children:"Aceitar"}):null,
  l("button",{onClick:()=>{
    let cPhone=(u.value.phone||"").replace(/\\D/g,"");
    if(cPhone.length===10||cPhone.length===11){if(!cPhone.startsWith("55"))cPhone="55"+cPhone;}
    let dFormatted=u.value.date?u.value.date.split("-").reverse().join("/"):u.value.date;
    let confMsg=encodeURIComponent(\`Olá \${u.value.name}! Aqui é da KCL Estética Automotiva. ✅\\n\\nSua solicitação de agendamento para *\${u.value.service}* no dia *\${dFormatted}* às *\${u.value.time||"09:00"}* foi ACEITA e CONFIRMADA na nossa agenda!\\n\\n📍 Endereço: Próximo à Praça de Esportes, Montes Claros - MG.\\nTe esperamos!\`);
    window.open(\`https://wa.me/\${cPhone}?text=\${confMsg}\`,"_blank");
  },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),`;

console.log('Target exists in html?', html.includes(target));

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('dist/index.html', html, 'utf8');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Substituição perfeita!');
} else {
  // Vamos buscar por regex flexível
  console.log('Tentando busca flexível...');
  const startIdx = html.indexOf('u.value.status==="Pendente"?r("button"');
  const endIdx = html.indexOf('children:["📲 WhatsApp"]}),', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    const fullEndIdx = endIdx + 'children:["📲 WhatsApp"]}),'.length;
    console.log('Encontrado trecho:', html.slice(startIdx, fullEndIdx));
    html = html.slice(0, startIdx) + replacement + html.slice(fullEndIdx);
    fs.writeFileSync('dist/index.html', html, 'utf8');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Substituído com sucesso via range!');
  }
}
