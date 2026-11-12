const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const galeriaMatch = content.match(/id:"galeria"[\s\S]*?id:"corrida"/i);
console.log('Galeria code:\n', galeriaMatch ? galeriaMatch[0] : 'not found');
