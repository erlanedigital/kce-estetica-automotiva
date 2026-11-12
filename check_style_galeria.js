const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const styleBlock = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
if (styleBlock) {
    const css = styleBlock[1];
    // Procurar qualquer ocorrência de "aspect-" ou "grid-cols" ou "group"
    const r = /aspect|grid-cols-3|galeria/gi;
    let m;
    while ((m = r.exec(css)) !== null) {
        console.log('Match at', m.index, ':', css.substring(Math.max(0, m.index - 50), m.index + 100).replace(/\s+/g, ' '));
    }
}
