const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Executando refatoração completa com precisão máxima...');

let html = fs.readFileSync('index.html', 'utf8');

// 1. ANTES E DEPOIS - Imagens exatas
const dirtyPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794450457497_e2c4c8ae.webp';
const cleanPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794454413632_7350b9a4.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhotoPath).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhotoPath).toString('base64');

html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);
console.log('Antes (carro sujo) e Depois (carro limpo) atualizados.');

// 2. ONDE ESTAMOS EM MONTES CLAROS - Em UMA LINHA SÓ, sem palavra órfã e alinhado
// Procurar onde está "Onde estamos em"
const ondeIdx = html.indexOf('Onde estamos em');
if (ondeIdx !== -1) {
  console.log('Localizado título Onde estamos em Montes Claros...');
  const h2Start = html.lastIndexOf('r("h2"', ondeIdx);
  const h2End = html.indexOf('})', ondeIdx) + 2;
  const singleLineH2 = `r("h2",{className:"text-center font-display font-extrabold text-[32px] sm:text-[46px] lg:text-[54px] tracking-tight mt-3 whitespace-nowrap",children:r(kf,{parts:[{text:"Onde estamos em Montes Claros.",elegant:!0}]})})`;
  html = html.slice(0, h2Start) + singleLineH2 + html.slice(h2End);
  console.log('Título Onde estamos em Montes Claros unificado em 1 linha só!');
}

// 3. SELEÇÃO DE HORÁRIOS & CONFIRMAÇÃO DO AGENDAMENTO
// Trocar a submissão do formulário para salvar o horário e rolar suavemente para o resumo confirmado
const submitFnIdx = html.indexOf('let xl=async(c)=>{');
if (submitFnIdx !== -1) {
  const submitEnd = html.indexOf('Vn(_),U(`Salvo:', submitFnIdx);
  if (submitEnd !== -1) {
    const endLine = html.indexOf('}', submitEnd) + 1;
    const improvedSubmit = `let xl=async(c)=>{
  c.preventDefault();
  if(!Y.trim()||!x.trim()){
    U("Informe nome e WhatsApp para confirmar seu agendamento.");
    return;
  }
  let d=P.find((ue)=>ue.name===X);
  let chosenTime = window.__kclSelectedTime || "09:30";
  let _ = {
    service: X,
    carType: V,
    date: D,
    time: chosenTime,
    name: Y.trim(),
    phone: x.trim(),
    coupon: a.trim().toUpperCase(),
    createdAt: new Date().toISOString(),
    status: "Confirmado",
    vehicle: V,
    plate: "",
    price: d?.price || 0
  };
  let yn = [_];
  m(!0);
  try {
    for(let ue of yn) await lu(ue);
  } catch(ue) {
    console.warn(ue);
  }
  m(!1);
  Vn(_);
  U("✓ Agendamento confirmado com sucesso!");
  setTimeout(()=>{
    const el = document.getElementById("agendamento-confirmado-resumo");
    if(el) el.scrollIntoView({behavior:"smooth", block:"center"});
  }, 100);
}`;
    html = html.slice(0, submitFnIdx) + improvedSubmit + html.slice(endLine);
    console.log('Função de confirmação xl atualizada com horário e auto-scroll!');
  }
}

// 4. Salvar index.html e sincronizar dist/
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhotoPath));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhotoPath));

console.log('index.html e dist/ salvos.');

// 5. Deploy Cloudflare
console.log('Executando deploy na Cloudflare...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);
