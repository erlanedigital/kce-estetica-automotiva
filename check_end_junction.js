const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const code = scriptTags[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

const endIdx = code.indexOf('Y==="agendamentos"');
console.log('--- ENTORNO DO FIM DO AUREON DASHBOARD ---');
console.log(code.slice(endIdx - 300, endIdx + 300));
