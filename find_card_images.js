const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar todas as seções que têm grid de 3 cards com fotos
const photoMatches = [];
const regexImg = /https:\/\/images\.unsplash\.com\/[^"'\s]+/gi;
let m;
while ((m = regexImg.exec(content)) !== null) {
    photoMatches.push({ url: m[0], idx: m.index });
}
console.log('Total Unsplash images found:', photoMatches.length);
photoMatches.forEach((pm, i) => {
    console.log(`[${i}] ${pm.url.substring(0, 75)}... at ${pm.idx}`);
    console.log('   Snippet context:', content.substring(Math.max(0, pm.idx - 120), Math.min(content.length, pm.idx + 180)).replace(/\s+/g, ' '));
});
