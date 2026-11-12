const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const rMatches = [];
const r = /reveal-delay|\.service-card/gi;
let m;
while ((m = r.exec(content)) !== null) {
    rMatches.push({ m: m[0], idx: m.index });
}
console.log('Matches:', rMatches);
rMatches.forEach(rm => {
    console.log(rm.m, 'at', rm.idx, ':', content.substring(Math.max(0, rm.idx - 60), rm.idx + 120).replace(/\s+/g, ' '));
});
