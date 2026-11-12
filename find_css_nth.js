const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar no <style> qualquer seletor com :nth-child(2) ou :nth-child(odd) ou similar
const styleBlock = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
if (styleBlock) {
    const css = styleBlock[1];
    const lines = css.split('\n');
    lines.forEach((l, idx) => {
        if (l.includes('nth-child') || l.includes('translateY') || l.includes('aspect') || l.includes('galeria') || l.includes('mt-') || l.includes('top:')) {
            console.log(`CSS line ${idx}:`, l.trim());
        }
    });
}
