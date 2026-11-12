const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const mobileCss = `
/* ---- OTIMIZAÇÃO MOBILE ULTRA-FLUIDA ---- */
@media (max-width: 640px) {
  #galeria .grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  #galeria .grid > div {
    height: 240px !important;
    min-height: 240px !important;
  }
}
`;

if (!html.includes('OTIMIZAÇÃO MOBILE ULTRA-FLUIDA')) {
    html = html.replace('</style>', mobileCss + '\n</style>');
}

// Validar sintaxe
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
    fs.writeFileSync(distHtml, html, 'utf8');
    console.log('✓ index.html e dist/index.html atualizados e validados com sucesso!');
} else {
    process.exit(1);
}
