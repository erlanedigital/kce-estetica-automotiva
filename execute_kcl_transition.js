const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';

// ==========================================
// 1. ATUALIZAR WRANGLER.JSONC
// ==========================================
const wranglerPath = path.join(projectDir, 'wrangler.jsonc');
let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
wranglerContent = wranglerContent.replace('"name": "kce"', '"name": "kcl"');
fs.writeFileSync(wranglerPath, wranglerContent, 'utf8');
console.log('✓ wrangler.jsonc atualizado para "name": "kcl"!');

// ==========================================
// 2. ATUALIZAR SRC/WORKER.JS
// ==========================================
const workerPath = path.join(projectDir, 'src', 'worker.js');
let workerContent = fs.readFileSync(workerPath, 'utf8');
workerContent = workerContent.replace(/KCE/g, 'KCL');
workerContent = workerContent.replace(/kce\.emia\.workers\.dev/g, 'kcl.emia.workers.dev');
workerContent = workerContent.replace(/kce-estetica-automotiva/g, 'kcl-estetica-automotiva');
fs.writeFileSync(workerPath, workerContent, 'utf8');
console.log('✓ src/worker.js atualizado para KCL e kcl.emia.workers.dev!');

// ==========================================
// 3. ATUALIZAR INDEX.HTML
// ==========================================
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// A. INSERIR A SEÇÃO ID="LOCALIZACAO" SE AINDA NÃO EXISTE
if (!html.includes('id:"localizacao"')) {
    const footerTarget = 'l("footer",{className:"relative overflow-hidden border-t border-[var(--line)] bg-[#03081A] pb-8"';
    
    const localizacaoSection = `l("section",{id:"localizacao",className:"relative overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-28",children:[
      r(Af,{count:8}),
      l("div",{className:"relative text-center max-w-3xl mx-auto",children:[
        r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold uppercase",children:"LOCALIZAÇÃO & ESTÚDIO OFICIAL"}),
        r("h2",{className:"font-display font-extrabold text-[43px] sm:text-[53px] tracking-tight mt-3",children:r(kf,{parts:[{text:"Onde estamos em"},{text:"Montes Claros.",elegant:!0}]})}),
        r("p",{className:"text-sm text-[#93A3BC] mt-2",children:"Venha nos visitar no bairro São José ou trace sua rota pelo GPS com apenas 1 clique."})
      ]}),
      l("div",{className:"grid lg:grid-cols-2 gap-8 mt-12 items-stretch",children:[
        l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8 flex flex-col justify-between text-left",children:[
          l("div",{children:[
            r("span",{className:"pill bg-[#0066FF]/20 text-[#2F9BFF] border border-[#0066FF]/40 text-xs font-bold px-3 py-1 uppercase",children:"ESTÚDIO KCL"}),
            r("h3",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4",children:"KCL Estética Automotiva"}),
            l("p",{className:"text-base text-[#F2F6FF] font-bold mt-2 flex items-center gap-2",children:[
              r("span",{className:"text-xl",children:"📍"}),
              "Rua Belo Horizonte, 80 — Bairro São José, Montes Claros - MG"
            ]}),
            r("p",{className:"text-xs text-[#93A3BC] mt-1 ml-7",children:"Ponto de referência: Próximo à Praça de Esportes e centro de Montes Claros."}),
            l("div",{className:"mt-6 border-t border-[var(--line)] pt-5 grid gap-3",children:[
              l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"🕒 Horário:"}),r("span",{children:"Segunda a Sexta: 08h às 18h | Sábado: 08h às 14h"})]}),
              l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"📸 Instagram:"}),r("a",{href:"https://instagram.com/kclesteticaautomotiva",target:"_blank",rel:"noopener noreferrer",className:"text-[#2F9BFF] hover:underline font-semibold",children:"@kclesteticaautomotiva"})]}),
              l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"☕ Lounge VIP:"}),r("span",{children:"Espaço climatizado com Wi-Fi de alta velocidade e café expresso."})]}),
              l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"🛡️ Segurança:"}),r("span",{children:"Pátio monitorado por câmeras 24h e seguro completo de pátio."})]})
            ]})
          ]}),
          l("div",{className:"mt-8 grid sm:grid-cols-2 gap-3",children:[
            r("a",{href:"https://www.google.com/maps/search/?api=1&query=Rua+Belo+Horizonte+80+Sao+Jose+Montes+Claros+MG",target:"_blank",rel:"noopener noreferrer",className:"btn-teal pill py-3.5 text-center font-bold text-xs tracking-wider uppercase block shadow-lg shadow-[#0066FF]/30",children:"ABRIR NO GOOGLE MAPS"}),
            r("a",{href:"https://waze.com/ul?q=Rua+Belo+Horizonte+80+Montes+Claros+MG&navigate=yes",target:"_blank",rel:"noopener noreferrer",className:"btn-line pill py-3.5 text-center font-bold text-xs tracking-wider uppercase block hover:border-[#2F9BFF]",children:"ABRIR NO WAZE"})
          ]})
        ]}),
        l("div",{className:"card-round border border-[var(--line)] bg-[#050B1A] overflow-hidden min-h-[360px] relative shadow-lg",children:[
          r("iframe",{title:"Mapa KCL Estética Automotiva - Rua Belo Horizonte 80",src:"https://maps.google.com/maps?q=Rua+Belo+Horizonte+80,+Sao+Jose,+Montes+Claros+-+MG&t=&z=16&ie=UTF8&iwloc=&output=embed",width:"100%",height:"100%",style:{border:0,minHeight:"360px",filter:"contrast(1.05) invert(0.9) hue-rotate(180deg)"},loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})
        ]})
      ]})
    ]}),` + footerTarget;

    if (html.includes(footerTarget)) {
        html = html.replace(footerTarget, localizacaoSection);
        console.log('✓ Seção de Localização com mapa inserida antes do rodapé!');
    } else {
        console.log('⚠ Não encontrou footerTarget exato!');
    }
}

// B. CORRIGIR ALTURA E ALINHAMENTO DOS CARDS DA GALERIA
// Substituir a renderização dos cards da galeria para forçar height: 260px e objectFit: cover
const oldGaleriaMap = '].map((g,idx)=>l("div",{key:idx,className:"group relative card-round overflow-hidden border border-[var(--line)] bg-[#0A1633] aspect-[4/3]",children:[';
const newGaleriaMap = '].map((g,idx)=>l("div",{key:idx,style:{height:"260px",minHeight:"260px",maxHeight:"260px",alignSelf:"stretch",marginTop:0,transform:"none"},className:"group relative card-round overflow-hidden border border-[var(--line)] bg-[#0A1633]",children:[';

if (html.includes(oldGaleriaMap)) {
    html = html.replace(oldGaleriaMap, newGaleriaMap);
    console.log('✓ Cards da galeria atualizados com altura fixa rígida de 260px!');
}

// C. MUDANÇA GLOBAL DE KCE PARA KCL E INSTAGRAM
console.log('Realizando substituições de marca KCE -> KCL...');

// Substituir domínio
html = html.replace(/kce\.emia\.workers\.dev/g, 'kcl.emia.workers.dev');

// Substituir Instagram
html = html.replace(/@kce\.estetica/g, '@kclesteticaautomotiva');
html = html.replace(/instagram\.com\/kce\.estetica/g, 'instagram.com/kclesteticaautomotiva');
html = html.replace(/@kceestetica/g, '@kclesteticaautomotiva');

// Substituir cupons do jogo
html = html.replace(/KCE15/g, 'KCL15');
html = html.replace(/KCE10/g, 'KCL10');
html = html.replace(/KCE5/g, 'KCL5');

// Substituir textos visuais de KCE
html = html.replace(/KCE Estética Automotiva/g, 'KCL Estética Automotiva');
html = html.replace(/KCE GP/g, 'KCL GP');
html = html.replace(/Logo KCE/g, 'Logo KCL');
html = html.replace(/Equipe KCE/g, 'Equipe KCL');
html = html.replace(/admin@kce\.com/g, 'admin@kcl.com');
html = html.replace(/Lava-jato KCE/g, 'Lava-jato KCL');
html = html.replace(/Vitrificação KCE/g, 'Vitrificação KCL');
html = html.replace(/detalhamento KCE/g, 'detalhamento KCL');
html = html.replace(/KCE — abrir painel/g, 'KCL — abrir painel');

// Substituir strings nos componentes JSX: children:"KCE" -> children:"KCL"
html = html.replace(/children:"KCE"/g, 'children:"KCL"');

// Substituir no <title>
html = html.replace(/KCE/g, 'KCL');

// CSS adicional para forçar rigorosamente altura idêntica na galeria
const galleryStrictCss = `
/* ---- ALTURA E ALINHAMENTO IDÊNTICO DOS CARDS DA GALERIA ---- */
#galeria .grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
  align-items: stretch !important;
}
#galeria .grid > div {
  height: 260px !important;
  min-height: 260px !important;
  max-height: 260px !important;
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
  overflow: hidden !important;
}
#galeria .grid img {
  height: 100% !important;
  width: 100% !important;
  object-fit: cover !important;
  display: block !important;
}
`;

if (!html.includes('ALTURA E ALINHAMENTO IDÊNTICO DOS CARDS DA GALERIA')) {
    html = html.replace('</style>', galleryStrictCss + '\n</style>');
    console.log('✓ CSS de alinhamento rígido da Galeria injetado!');
}

// D. VALIDAR SINTAXE DE TODOS OS SCRIPTS
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
let allValid = true;
while ((m = scriptRegex.exec(html)) !== null) {
    const attrs = m[1];
    const code = m[2];
    if (!attrs.includes('json')) {
        try {
            new Function(code);
            console.log(`Script ${count}: Syntax OK`);
        } catch(e) {
            console.error(`❌ Script ${count} ERRO:`, e.message);
            allValid = false;
        }
    } else {
        try {
            JSON.parse(code);
            console.log(`Script ${count}: JSON OK`);
        } catch(e) {
            console.error(`❌ Script ${count} JSON ERRO:`, e.message);
            allValid = false;
        }
    }
    count++;
}

if (allValid) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    const distHtml = path.join(projectDir, 'dist', 'index.html');
    if (!fs.existsSync(path.dirname(distHtml))) {
        fs.mkdirSync(path.dirname(distHtml), { recursive: true });
    }
    fs.writeFileSync(distHtml, html, 'utf8');
    console.log('🎉 SUCESSO TOTAL! Transição completa para KCL (kcl.emia.workers.dev), Mapa e Galeria 100% alinhada!');
} else {
    console.error('⛔ Gravação cancelada devido a erro de sintaxe.');
    process.exit(1);
}
