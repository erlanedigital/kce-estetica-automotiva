const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

const targetRule = `  @media (max-width: 768px) {
    #servicos .grid {
      display: flex !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      gap: 16px !important;
      padding-bottom: 20px !important;
      padding-left: 4px !important;
      padding-right: 4px !important;
      scroll-behavior: smooth !important;
    }
    #servicos .grid > * {
      flex: 0 0 85% !important;
      scroll-snap-align: center !important;
      min-width: 280px !important;
    }
  }`;

const replacementRule = `  /* TODOS OS SERVIÇOS 100% VISÍVEIS NO MOBILE (GRID VERTICAL LIMPO E COMPLETO) */
  @media (max-width: 768px) {
    #servicos .grid {
      display: grid !important;
      grid-template-columns: 1fr !important;
      overflow-x: visible !important;
      gap: 24px !important;
      width: 100% !important;
      padding: 0 !important;
    }
    #servicos .grid > * {
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      flex: none !important;
      margin-bottom: 0 !important;
    }
  }`;

if (html.includes(targetRule)) {
  html = html.replace(targetRule, replacementRule);
  console.log('Successfully replaced carousel with full vertical grid on mobile!');
} else {
  console.log('Target rule not found with exact whitespace, trying normalized replacement');
  const start = html.indexOf('/* SCROLL SUAVE NOS CARDS DE SERVIÇOS */');
  const end = html.indexOf('/* 3 PASSOS E ZERO ESTRESSE', start);
  if (start !== -1 && end !== -1) {
    const chunk = html.substring(start, end);
    html = html.replace(chunk, `/* TODOS OS SERVIÇOS 100% VISÍVEIS NO MOBILE (GRID VERTICAL COMPLETO) */
  @media (max-width: 768px) {
    #servicos .grid {
      display: grid !important;
      grid-template-columns: 1fr !important;
      overflow-x: visible !important;
      gap: 24px !important;
      width: 100% !important;
      padding: 0 !important;
    }
    #servicos .grid > * {
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      flex: none !important;
    }
  }\n  `);
    console.log('Replaced chunk successfully!');
  }
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Done!');
