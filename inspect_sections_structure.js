const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const sIdx = content.indexOf('id:"servicos"');
console.log('id:"servicos" at:', sIdx);
if (sIdx !== -1) {
    console.log(content.substring(sIdx - 300, sIdx + 400));
}

// Procurar onde o agendar termina e o rodapé começa
const aIdx = content.indexOf('id:"agendar"');
console.log('id:"agendar" at:', aIdx);
if (aIdx !== -1) {
    console.log(content.substring(aIdx + 2000, aIdx + 3500));
}
