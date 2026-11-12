const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const s6 = scriptTags[5];
const code = s6.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

// Vamos isolar a região do erro
// O aureonDashboard foi inserido em volta de Y==="visão"
const vIdx = code.indexOf('Y==="visão"');
console.log('vIdx:', vIdx);
if (vIdx !== -1) {
  const snippet = code.slice(vIdx, vIdx + 4000);
  console.log('Snippet inserido:');
  console.log(snippet.slice(0, 500));
  console.log('...');
  console.log(snippet.slice(snippet.length - 500));
}
