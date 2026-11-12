const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Procurar onde aparecem "START", "PRO", "ULTRA" ou "Favorito da galera"
const favIdx = content.indexOf('Favorito da galera');
console.log('Index of "Favorito da galera":', favIdx);
if (favIdx !== -1) {
    console.log('Snippet around "Favorito da galera":\n', content.substring(favIdx - 300, favIdx + 400));
}

// Procurar "Antes e Depois" ou "Antes"
const regex = /(?:antes|depois|sujo|limpo|transforma)/gi;
let m;
const occurrences = [];
while ((m = regex.exec(content)) !== null) {
    if (m.index > 50000) { // ignorar polyfills iniciais
        occurrences.push({ word: m[0], idx: m.index });
    }
}
console.log('Occurrences after 50k:', occurrences.length);
occurrences.slice(0, 10).forEach(o => {
    console.log(o.word, 'at', o.idx, ':', content.substring(o.idx - 60, o.idx + 120).replace(/\s+/g, ' '));
});

// Procurar menu de navegação
const menuRegex = /(?:navega|header|<nav|navbar)/gi;
let mn;
const menuOccurrences = [];
while ((mn = menuRegex.exec(content)) !== null) {
    if (mn.index > 50000) {
        menuOccurrences.push({ word: mn[0], idx: mn.index });
    }
}
console.log('Menu occurrences after 50k:', menuOccurrences.length);
menuOccurrences.slice(0, 5).forEach(o => {
    console.log(o.word, 'at', o.idx, ':', content.substring(o.idx - 60, o.idx + 120).replace(/\s+/g, ' '));
});
