const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const locIdx = content.indexOf('id:"localizacao"');
console.log('id:"localizacao" index:', locIdx);
if (locIdx !== -1) {
    console.log(content.substring(locIdx - 100, locIdx + 800));
}
