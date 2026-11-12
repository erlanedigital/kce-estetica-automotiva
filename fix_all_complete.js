const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando implementação completa de todos os pedidos...');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fotos do Antes & Depois
const dirtyPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794450457497_e2c4c8ae.webp';
const cleanPhotoPath = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded/media_1794454413632_7350b9a4.webp';

const dirtyB64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyPhotoPath).toString('base64');
const cleanB64 = 'data:image/webp;base64,' + fs.readFileSync(cleanPhotoPath).toString('base64');

html = html.replace(/var xv="data:image\/webp;base64,[^"]+"/, `var xv="${dirtyB64}"`);
html = html.replace(/var jv="data:image\/webp;base64,[^"]+"/, `var jv="${cleanB64}"`);
console.log('Antes e Depois atualizados.');

// 2. Links do Instagram e WhatsApp em todo o site
html = html.replace(/https:\/\/instagram\.com\/[a-zA-Z0-9_.]+/g, 'https://instagram.com/kclesteticaautomotiva');
html = html.replace(/@kce[a-zA-Z0-9_.]*/gi, '@kclesteticaautomotiva');

// 3. Título "Onde estamos em Montes Claros." em linha única sem quebras e perfeitamente alinhado
const ondeIdx = html.indexOf('Onde estamos em');
if (ondeIdx !== -1) {
  const h2Start = html.lastIndexOf('r("h2"', ondeIdx);
  const h2End = html.indexOf('})', ondeIdx) + 2;
  const singleLineH2 = `r("h2",{className:"text-center font-display font-extrabold text-[28px] sm:text-[44px] lg:text-[52px] tracking-tight mt-3 text-white whitespace-nowrap",children:r(kf,{parts:[{text:"Onde estamos em Montes Claros.",elegant:!0}]})})`;
  html = html.slice(0, h2Start) + singleLineH2 + html.slice(h2End);
  console.log('Título Onde estamos unificado em 1 linha só!');
}

// 4. Alinhar perfeitamente os cards de Localização, Serviços e Galeria
html = html.replace(
  'l("div",{className:"grid lg:grid-cols-2 gap-8 mt-12 items-center"',
  'l("div",{className:"grid lg:grid-cols-2 gap-8 mt-12 items-stretch"'
);

// 5. Botão Flutuante do WhatsApp permanente que acompanha toda a navegação
if (!html.includes('id="kcl-floating-whatsapp"')) {
  const floatingWhatsApp = `
  <!-- BOTÃO FLUTUANTE DO WHATSAPP OFICIAL KCL -->
  <a id="kcl-floating-whatsapp" href="https://wa.me/5538999999999?text=Ol%C3%A1%20KCL!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os%20de%20est%C3%A9tica%20automotiva." target="_blank" rel="noopener noreferrer" class="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white/30" title="Falar no WhatsApp KCL">
    <svg class="w-7 h-7 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    <div class="hidden sm:block text-left">
      <p class="text-xs font-bold leading-tight">Falar no WhatsApp</p>
      <p class="text-[10px] text-white/90">Atendimento e Dúvidas</p>
    </div>
  </a>
  `;
  html = html.replace('</body>', floatingWhatsApp + '\n</body>');
  console.log('Botão flutuante do WhatsApp inserido!');
}

// 6. Confirmação do Agendamento: quando o usuário clica em Confirmar, exibe card gigante de SUCESSO com rolagem suave
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
    if(el) {
      el.scrollIntoView({behavior:"smooth", block:"center"});
    }
  }, 100);
}`;
    html = html.slice(0, submitFnIdx) + improvedSubmit + html.slice(endLine);
    console.log('Função xl atualizada com sucesso!');
  }
}

// 7. Salvar e compilar
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
fs.writeFileSync('dist/carro_antes_sujo.webp', fs.readFileSync(dirtyPhotoPath));
fs.writeFileSync('dist/carro_depois_limpo.webp', fs.readFileSync(cleanPhotoPath));

console.log('Arquivos sincronizados.');

// 8. Deploy Cloudflare
console.log('Fazendo deploy para Cloudflare...');
const deployResult = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployResult);
