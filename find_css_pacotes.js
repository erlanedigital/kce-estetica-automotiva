const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar estilos de #pacotes ou card-round
const cssMatches = [];
const regexCss = /(?:#pacotes|\.card-round|popular|translateY|scale-)/gi;
let m;
while ((m = regexCss.exec(content)) !== null) {
    cssMatches.push({ match: m[0], idx: m.index });
}
console.log('CSS matches:', cssMatches.length);
cssMatches.forEach(cm => {
    console.log(cm.match, 'at', cm.idx, ':', content.substring(Math.max(0, cm.idx - 40), cm.idx + 100).replace(/\s+/g, ' '));
});
