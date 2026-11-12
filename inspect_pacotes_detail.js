const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Vamos ver os 1000 caracteres antes e depois de `f2.map`
const f2Idx = content.indexOf('f2.map');
console.log('f2.map snippet:\n', content.substring(f2Idx - 300, f2Idx + 1200));

// E vamos ver styles.css
const stylesCss = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/styles.css', 'utf8');
console.log('\n--- styles.css length ---', stylesCss.length);
const pacotesInStyles = stylesCss.indexOf('pacotes');
console.log('pacotes in styles.css:', pacotesInStyles);
if (pacotesInStyles !== -1) {
    console.log(stylesCss.substring(pacotesInStyles - 100, pacotesInStyles + 400));
}
