const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('Total file length:', content.length);

// 1. Procurar onde pacotes são renderizados
const scriptMatch = content.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
console.log('Script tags count:', scriptMatch ? scriptMatch.length : 0);

// Verificar ocorrências de pacotes
const idxPacotes = content.indexOf('id="pacotes"');
console.log('Index of id="pacotes":', idxPacotes);
if (idxPacotes !== -1) {
    console.log('Snippet around #pacotes:\n', content.substring(idxPacotes - 100, idxPacotes + 600));
}

// Procurar antes e depois
const idxAntes = content.indexOf('antes');
console.log('Index of "antes":', idxAntes);
const regexBeforeAfter = /resultado|antes|depois|before|after|slider/gi;
let match;
const matches = [];
while ((match = regexBeforeAfter.exec(content)) !== null) {
    matches.push({ text: match[0], index: match.index });
    if (matches.length > 20) break;
}
console.log('Matches count:', matches.length);
matches.slice(0, 5).forEach(m => {
    console.log('Snippet at', m.index, ':', content.substring(Math.max(0, m.index - 50), m.index + 100).replace(/\n/g, ' '));
});
