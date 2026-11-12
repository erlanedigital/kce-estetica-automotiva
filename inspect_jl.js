const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const sIdx = content.indexOf('photo-1520340356584-f9917d1eea6f');
console.log('Index:', sIdx);
console.log('Snippet:\n', content.substring(sIdx - 400, sIdx + 1200));

// E vamos ver onde a lista jl é definida!
const jlIdx = content.indexOf('jl=[');
if (jlIdx !== -1) {
    console.log('jl definition:\n', content.substring(jlIdx, jlIdx + 800));
} else {
    const jlMatch = content.match(/var\s+jl\s*=\s*\[|let\s+jl\s*=\s*\[|const\s+jl\s*=\s*\[/);
    console.log('jl match:', jlMatch);
}
