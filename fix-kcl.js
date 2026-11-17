const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix Tarefas a fazer form to be strictly on the same line
const taskFormIdx = html.indexOf('Tarefas a fazer');
if (taskFormIdx !== -1) {
  const formStart = html.indexOf('l("form"', taskFormIdx);
  const formEnd = html.indexOf('})]', formStart);
  if (formStart !== -1 && formEnd !== -1) {
    const originalForm = html.substring(formStart, formEnd + 3);
    const replacementForm = 'l("form",{onSubmit:N0,className:"flex items-center gap-2 mt-4 w-full",children:[r("input",{value:je.title,onChange:(y)=>Pu({...je,title:y.target.value}),placeholder:"Nova tarefa…",className:`${O} !py-2 !px-3 flex-1 min-w-0 text-xs sm:text-sm`}),r("input",{type:"date",value:je.date,onChange:(y)=>Pu({...je,date:y.target.value}),className:`${O} !py-2 !px-2 w-[145px] shrink-0 text-xs sm:text-sm`}),r("button",{disabled:j,className:`${s} !py-2 !px-3.5 shrink-0 text-xs sm:text-sm font-bold`,children:j?"Salvando…":"+ Adicionar"})]})';
    html = html.replace(originalForm, replacementForm);
    console.log('Task form replaced successfully!');
  }
}

// 2. Allow deleting / zeroing pro-labore and fix save when !u?.id
const savePartnerOld = 'onSubmit:async(on)=>{if(on.preventDefault(),!u?.id)return;';
const savePartnerNew = 'onSubmit:async(on)=>{on.preventDefault();M(!0);try{if(u?.id){await w("records.replace",{collection:"kce_partners",id:u.id,value:{...u.value,role:W.role,prolabore:Number(W.prolabore||0),paid:Number(W.paid||0)}});}else{await w("records.create",{collection:"kce_partners",value:{name:qe,role:W.role,share:Number(i.share||33.33),prolabore:Number(W.prolabore||0),paid:Number(W.paid||0)}});}T(`${qe} atualizado e salvo.`);await gn();}catch(zn){T(`Erro: ${zn.message||zn}`);}M(!1);return;';

if (html.includes(savePartnerOld)) {
  html = html.replace(savePartnerOld, savePartnerNew);
  console.log('Partner save handler updated!');
}

const saveBtnOld = 'r("button",{disabled:j,className:s,children:j?"Salvando…":`Salvar ${qe}`})';
const saveBtnNew = 'l("div",{className:"flex items-center gap-2 mt-2",children:[r("button",{type:"submit",disabled:j,className:s,children:j?"Salvando…":`Salvar ${qe}`}),r("button",{type:"button",onClick:async()=>{J({prolabore:0,paid:0});if(u?.id){await w("records.replace",{collection:"kce_partners",id:u.id,value:{...u.value,prolabore:0,paid:0}});}T(`Pró-labore de ${qe} zerado/apagado com sucesso!`);await gn();},className:"px-4 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors",children:"🗑️ Apagar Pró-labore"})]})';

if (html.includes(saveBtnOld)) {
  html = html.replace(saveBtnOld, saveBtnNew);
  console.log('Partner save button & delete button added!');
}

fs.writeFileSync(filePath, html, 'utf8');

// Sync to dist
const distPath = path.join(__dirname, 'dist', 'index.html');
fs.copyFileSync(filePath, distPath);

console.log('KCL updated and synced to dist successfully!');
