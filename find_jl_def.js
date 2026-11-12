const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const matches = [];
const regex = /\bjl\s*=/g;
let m;
while ((m = regex.exec(content)) !== null) {
    matches.push(m.index);
}
console.log('jl= occurrences:', matches.length);
matches.forEach(idx => {
    console.log('at', idx, ':', content.substring(idx - 50, idx + 200).replace(/\s+/g, ' '));
});
