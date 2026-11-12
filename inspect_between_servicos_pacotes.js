const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const servicosEnd = content.indexOf('id:"servicos"');
const pacotesStart = content.indexOf('id:"pacotes"');
console.log('Between servicos and pacotes snippet:\n', content.substring(servicosEnd + 1500, pacotesStart));
