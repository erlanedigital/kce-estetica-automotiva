const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. SERVICOS: aumentar fonte de SERVIÇOS e diminuir espaçamento entre frases
html = html.replace(
  'r("p",{className:"text-[17px] sm:text-[18px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"SERVIÇOS"})',
  'r("p",{className:"text-[20px] sm:text-[22px] tracking-[.32em] text-[#2F9BFF] font-extrabold uppercase",children:"SERVIÇOS"})'
);
html = html.replace(
  'max-w-[1120px] flex-col items-center justify-center gap-4 text-center reveal',
  'max-w-[1120px] flex-col items-center justify-center gap-2 sm:gap-2.5 text-center reveal'
);

// 2. Instruções de agendamento: confirmação via WhatsApp
html = html.replace(
  'children:"Escolha o serviço e receba a confirmação. Atendimento com hora marcada, sem fila."',
  'children:"Escolha o serviço e receba a confirmação via WhatsApp. Atendimento com hora marcada, sem fila."'
);

// 3. CSS adjustments for Experiência, Galeria, KCL GP, e Faixa Estreita
const customCss = `
  /* AJUSTES SOLICITADOS PELO USUÁRIO (KCL) */
  /* Faixa estreita com espaçamento externo preservado */
  .kcl-marquee-wrapper,
  div:has(> .marquee-track),
  div:has(> div.marquee-track) {
    padding-top: 0.3rem !important;
    padding-bottom: 0.3rem !important;
    margin-top: 5rem !important;
    margin-bottom: 5rem !important;
    box-sizing: border-box !important;
  }
  @media (min-width: 640px) {
    .kcl-marquee-wrapper,
    div:has(> .marquee-track),
    div:has(> div.marquee-track) {
      padding-top: 0.35rem !important;
      padding-bottom: 0.35rem !important;
      margin-top: 6rem !important;
      margin-bottom: 6rem !important;
    }
  }

  /* Experiência: diminuir fonte do título, reduzir espaçamento inferior e ampliar superior */
  #experiencia {
    padding-top: 5rem !important;
    padding-bottom: 2rem !important;
  }
  #experiencia h2,
  #experiencia h2.kcl-section-h2 {
    font-size: clamp(1.85rem, 4vw, 2.5rem) !important;
    line-height: 1.15 !important;
    letter-spacing: -0.02em !important;
    margin-top: 0.4rem !important;
    margin-bottom: 0.75rem !important;
  }
  @media (max-width: 640px) {
    #experiencia {
      padding-top: 3.5rem !important;
      padding-bottom: 1.5rem !important;
    }
    #experiencia h2,
    #experiencia h2.kcl-section-h2 {
      font-size: 1.95rem !important;
      line-height: 1.15 !important;
      margin-top: 0.3rem !important;
      margin-bottom: 0.5rem !important;
    }
  }

  /* Galeria de transformações: aumento suave da fonte */
  #galeria h2,
  #galeria h2.kcl-section-h2 {
    font-size: clamp(2.35rem, 5vw, 3.65rem) !important;
    letter-spacing: -0.025em !important;
  }

  /* KCL GP: título suavemente maior */
  #corrida h2,
  #corrida h2.kcl-section-h2 {
    font-size: clamp(2.25rem, 4.8vw, 3.45rem) !important;
    letter-spacing: -0.025em !important;
  }
</style>`;

html = html.replace('</style>', customCss);

fs.writeFileSync(filePath, html, 'utf8');

// Sync to dist
const distPath = path.join(__dirname, 'dist', 'index.html');
fs.copyFileSync(filePath, distPath);

console.log('KCL updated and synced to dist/index.html successfully!');
