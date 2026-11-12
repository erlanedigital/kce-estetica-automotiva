const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar nth-child no CSS
const nthMatches = [];
const r = /nth-child|service-card/gi;
let m;
while ((m = r.exec(content)) !== null) {
    nthMatches.push({ m: m[0], idx: m.index });
}
console.log('nth-child matches:', nthMatches.length);
nthMatches.forEach(nm => {
    console.log(nm.m, 'at', nm.idx, ':', content.substring(Math.max(0, nm.idx - 60), nm.idx + 120).replace(/\s+/g, ' '));
});
