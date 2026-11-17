const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"agendar"');
console.log(html.substring(pos, pos + 1800));
