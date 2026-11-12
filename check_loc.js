const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');
console.log('Found id:"localizacao":', content.includes('id:"localizacao"'));
console.log('Found Rua Belo Horizonte, 80:', content.includes('Rua Belo Horizonte, 80'));
console.log('Found @kclesteticaautomotiva:', content.includes('kclesteticaautomotiva'));
