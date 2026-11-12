const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Listar todas as seções principais da home page
const sectionMatches = [];
const r = /<section\b[^>]*id=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = r.exec(content)) !== null) {
    sectionMatches.push({ id: m[1], idx: m.index });
}
console.log('Sections with id in HTML:', sectionMatches);

// Procurar seções sem id ou com l("section", {id:...
const r2 = /l\("section",\s*\{[^}]*id:\s*["']([^"']+)["']/gi;
let m2;
while ((m2 = r2.exec(content)) !== null) {
    console.log('React section with id:', m2[1], 'at', m2.index);
}
