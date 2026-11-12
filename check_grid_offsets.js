const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar no index.html qualquer ocorrência de classes tipo "md:mt", "lg:mt", "translate", "top-", "pt-", "mt-"
const matches = [];
const r = /(?:md:mt|lg:mt|translate-y|pt-|mt-)/gi;
let m;
while ((m = r.exec(content)) !== null) {
    if (m.index < 100000) {
        matches.push({ m: m[0], idx: m.index });
    }
}
console.log('Matches in css:', matches.length);
matches.slice(0, 30).forEach(x => {
    console.log(x.m, 'at', x.idx, ':', content.substring(x.idx - 20, x.idx + 60).replace(/\s+/g, ' '));
});
