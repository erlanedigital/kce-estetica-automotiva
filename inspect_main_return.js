const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar onde estão as seções no retorno principal
const mainIdx = content.indexOf('l("main",{id:"topo"');
console.log('main id="topo" at:', mainIdx);
if (mainIdx !== -1) {
    console.log(content.substring(mainIdx, mainIdx + 1500));
}
