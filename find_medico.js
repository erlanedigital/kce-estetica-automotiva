const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const matches = [];
const r = /m[eé]dic/gi;
let m;
while ((m = r.exec(content)) !== null) {
    matches.push(m.index);
}
console.log('Matches for medic in index.html:', matches.length);
matches.forEach(idx => {
    console.log('at', idx, ':', content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 150)).replace(/\s+/g, ' '));
});

// E vamos ver todo o texto da seção corrida (o minijogo)
const cIdx = content.indexOf('id:"corrida"');
console.log('\n--- SECTION CORRIDA SNIPPET ---');
console.log(content.substring(cIdx, cIdx + 2500));
