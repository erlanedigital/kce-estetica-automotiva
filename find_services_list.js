const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar onde P é inicializado ou onde estão os serviços padrão
const sMatch = content.indexOf('Lavagem Técnica');
console.log('Lavagem Técnica at:', sMatch);
console.log(content.substring(sMatch - 200, sMatch + 800));
