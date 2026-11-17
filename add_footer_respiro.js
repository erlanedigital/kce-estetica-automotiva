const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update CURRENT_BUILD to v100
html = html.replace(/kcl-build-20261116-v95-golden-perfection/g, 'kcl-build-20261116-v100-perfection');

// 2. Add specific rule for respiro above the footer (rodapé)
const footerRespiroCSS = `
/* ==========================================================================
   RESPIRO GENEROSO ACIMA DO RODAPÉ & FINAL DE PÁGINA
   ========================================================================== */
#localizacao {
  padding-bottom: 6rem !important;
  margin-bottom: 3rem !important;
}

footer,
footer.kcl-footer,
footer#footer {
  margin-top: 6rem !important; /* RESPIRO AMPLO ACIMA DO RODAPÉ */
  padding-top: 5rem !important;
  padding-bottom: 5rem !important;
  border-top: 1px solid rgba(47, 155, 255, 0.18) !important;
  position: relative !important;
  z-index: 10 !important;
}
`;

// Insert footerRespiroCSS before </style>
html = html.replace('</style>', footerRespiroCSS + '\n</style>');

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/index.html', html, 'utf8');

console.log('Updated index.html and dist/index.html with footer respiro and build v100!');
