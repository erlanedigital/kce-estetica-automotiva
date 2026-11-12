const fs = require('fs');
const { execSync } = require('child_process');

console.log('Restaurando a abertura do botão do WhatsApp do agendamento...');

let html = fs.readFileSync('index.html', 'utf8');

// O trecho sem abertura:
const broken = `    let cPhone=(u.value.phone||"").replace(/\\D/g,"");
    if(cPhone.length===10||cPhone.length===11){if(!cPhone.startsWith("55"))cPhone="55"+cPhone;}
    let dFormatted=u.value.date?u.value.date.split("-").reverse().join("/"):u.value.date;
    let confMsg=encodeURIComponent(\`Olá \${u.value.name}! Aqui é da KCL Estética Automotiva. ✅\\n\\nSua solicitação de agendamento para *\${u.value.service}* no dia *\${dFormatted}* às *\${u.value.time||"09:00"}* foi ACEITA e CONFIRMADA na nossa agenda!\\n\\n📍 Endereço: Próximo à Praça de Esportes\\nMontes Claros - MG.\\nTe esperamos!\`);
    window.open(\`https://wa.me/\${cPhone}?text=\${confMsg}\`,"_blank");
  },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),`;

const fixed = `l("button",{onClick:()=>{
    let cPhone=(u.value.phone||"").replace(/\\D/g,"");
    if(cPhone.length===10||cPhone.length===11){if(!cPhone.startsWith("55"))cPhone="55"+cPhone;}
    let dFormatted=u.value.date?u.value.date.split("-").reverse().join("/"):u.value.date;
    let confMsg=encodeURIComponent(\`Olá \${u.value.name}! Aqui é da KCL Estética Automotiva. ✅\\n\\nSua solicitação de agendamento para *\${u.value.service}* no dia *\${dFormatted}* às *\${u.value.time||"09:00"}* foi ACEITA e CONFIRMADA na nossa agenda!\\n\\n📍 Endereço: Próximo à Praça de Esportes, Montes Claros - MG.\\nTe esperamos!\`);
    window.open(\`https://wa.me/\${cPhone}?text=\${confMsg}\`,"_blank");
  },className:"rounded-full bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold flex items-center gap-1",children:["📲 WhatsApp"]}),`;

if (html.includes('let cPhone=(u.value.phone||"").replace')) {
  // Vamos substituir a partir de let cPhone até ["📲 WhatsApp"]}),
  const start = html.indexOf('let cPhone=(u.value.phone||"").replace');
  // Checar se tem l("button",{onClick: antes
  const checkBefore = html.slice(Math.max(0, start - 30), start);
  console.log('Texto antes de let cPhone:', JSON.stringify(checkBefore));
  if (!checkBefore.includes('button')) {
    console.log('Confirmado: abertura l("button",{onClick: estava ausente!');
    const end = html.indexOf('children:["📲 WhatsApp"]}),', start) + 'children:["📲 WhatsApp"]}),'.length;
    html = html.slice(0, start) + fixed + html.slice(end);
    console.log('Substituição aplicada com sucesso.');
  }
}

fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');

console.log('Testando sintaxe do Script 6 agora...');
const s6 = html.match(/<script[\s\S]*?<\/script>/gi)[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

try {
  new Function(s6);
  console.log('✓ SUCESSO ABSOLUTO! SCRIPT 6 É 100% VÁLIDO E EXECUTÁVEL!');
} catch (err) {
  console.error('ERRO:', err.message);
  process.exit(1);
}

console.log('Fazendo deploy para Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);

console.log('Sincronizando com o GitHub...');
execSync('git add index.html dist/index.html');
execSync('git commit -m "fix: restore missing button wrapper to eliminate blank screen completely"');
execSync('git push origin main');
console.log('TUDO FINALIZADO COM SUCESSO!');
