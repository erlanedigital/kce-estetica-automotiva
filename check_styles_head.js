const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar se tem algum css com "article" ou "border-[#0066FF]" ou similar
const matches = [];
const r = /border-\[#0066FF\]|card-round|f2|popular/gi;
let m;
while ((m = r.exec(content)) !== null) {
    if (m.index < 100000) { // dentro do style
        matches.push({ m: m[0], idx: m.index });
    }
}
console.log('Matches in style head:', matches);

// Vamos pesquisar todas as ocorrências de "items-stretch" ou "-mt-" ou "transform" no style
const r2 = /-mt-|-top-|translateY|grid-cols-3/gi;
let m2;
while ((m2 = r2.exec(content)) !== null) {
    if (m2.index < 100000) {
        console.log('Style snippet:', content.substring(m2.index - 30, m2.index + 80).replace(/\s+/g, ' '));
    }
}
