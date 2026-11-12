const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const start = content.indexOf('id:"agendar"');
console.log('--- SEÇÃO #agendar ---');
console.log(content.slice(start, start + 4000));
