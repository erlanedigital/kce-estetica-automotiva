const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const vIdx = content.indexOf('Y==="visão"&&');
console.log('Y==="visão"&& at:', vIdx);
if (vIdx !== -1) {
    console.log(content.substring(vIdx, vIdx + 2000));
} else {
    // procurar onde visão renderiza o conteúdo
    const vMatch = content.match(/Y===["']visão["']\s*\?/gi);
    console.log('Matches:', vMatch);
}
