const fs = require('fs');
const vm = require('vm');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const distPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/index.html';

let html = fs.readFileSync(indexPath, 'utf8');

// Replace topbar buttons with Backup button + Sincronizar (and clean up duplicate Novo Agendamento / Novo Cliente in topbar)
const target = `children:[r("span",{children:"🔄"}),"Sincronizar"]}),l("button",{onClick:()=>{AA(null),ae({date:un(),time:"09:00",name:"",phone:"",vehicle:"Sedan",plate:"",service:"Lavagem Técnica",price:89,status:"Pendente"}),g("agendamentos"),Xu(!0)},className:\`\${s} justify-center !py-2.5 !px-3\`,children:[r(bn,{size:14})," Novo Agendamento"]}),l("button",{onClick:()=>{g("clientes"),Ht(!0)},className:\`\${ln} justify-center !py-2 !px-3\`,children:[r(bn,{size:14})," Novo Cliente"]})]})]}`;

const replacement = `children:[r("span",{children:"🔄"}),"Sincronizar"]}),l("button",{onClick:()=>window.kclTriggerFullBackup?.(),title:"Fazer backup completo de todos os dados do sistema",className:"rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-center gap-1.5 shadow-sm transition-all",children:[r("span",{children:"💾"}),"Backup"]})]})]}`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  console.log('Successfully inserted Backup button into admin topbar!');
} else {
  console.warn('Target for admin topbar not found!');
}

// Active operator on partner click
const targetClick = 'onClick:()=>{\n        w8(u);';
const replClick = 'onClick:()=>{\n        w8(u);try{localStorage.setItem("kce_active_operator",u)}catch(e){}';
if (html.includes(targetClick)) {
  html = html.replace(targetClick, replClick);
  console.log('Successfully linked active operator persistence to partner click!');
}

// Syntax validation
const scriptMatches = html.match(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Validating', scriptMatches.length, 'script blocks with vm.Script...');
scriptMatches.forEach((s, idx) => {
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new vm.Script(code);
  } catch (err) {
    console.error('SYNTAX ERROR in script block', idx, err.message);
    process.exit(1);
  }
});
console.log('ALL script blocks passed syntax validation!');

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(distPath, html, 'utf8');
console.log('Updated index.html and dist/index.html');
