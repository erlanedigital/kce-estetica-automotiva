const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const matches = [];
const r = /service-card|\#servicos|\.reveal-delay/gi;
let m;
while ((m = r.exec(content)) !== null) {
    matches.push(m.index);
}
console.log('Matches:', matches.length);
matches.forEach(idx => {
    console.log('--- at', idx, '---');
    console.log(content.substring(Math.max(0, idx - 100), idx + 200).replace(/\s+/g, ' '));
});
