const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const matches = [];
let idx = 0;
while ((idx = content.indexOf('admin-shell', idx)) !== -1) {
    if (idx > 100000) {
        matches.push(idx);
    }
    idx += 11;
}
console.log('admin-shell in JS count:', matches.length);
matches.forEach(i => {
    console.log('Snippet at', i, ':\n', content.substring(i - 200, i + 800));
});
