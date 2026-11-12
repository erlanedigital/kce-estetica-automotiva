const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar palavras chaves da sessão de antes e depois
const keywords = ['TRANSFORMAÇÃO', 'Antes', 'Depois', 'arraste', 'comparar', 'resultado', 'comparativo'];
keywords.forEach(k => {
    let idx = 0;
    while ((idx = content.indexOf(k, idx)) !== -1) {
        if (idx > 50000) {
            console.log(`Found "${k}" at ${idx}:`, content.substring(idx - 60, idx + 120).replace(/\s+/g, ' '));
        }
        idx += k.length;
    }
});
