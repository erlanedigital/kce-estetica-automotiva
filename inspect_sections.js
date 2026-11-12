const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('--- PACOTES DETAIL ---');
const favIdx = content.indexOf('Favorito da galera');
console.log(content.substring(favIdx - 1200, favIdx + 800));

console.log('\n--- HEADER DETAIL ---');
const hdrIdx = content.indexOf('min-h-[64px] sm:min-h-[84px]');
console.log(content.substring(hdrIdx - 200, hdrIdx + 1200));

console.log('\n--- ANTES / DEPOIS DETAIL ---');
// Procurar "Antes" na home page
const bIdx = content.indexOf('sujo de terra');
console.log('sujo de terra index:', bIdx);
if (bIdx !== -1) {
    console.log(content.substring(bIdx - 300, bIdx + 600));
} else {
    // procurar outros termos de antes/depois na home
    const sliderIdx = content.indexOf('slider');
    console.log('slider index:', sliderIdx);
    const splitIdx = content.indexOf('50%');
    console.log('50% index:', splitIdx);
}
