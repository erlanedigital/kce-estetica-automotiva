const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"corrida"');
console.log(html.substring(pos + 3800, pos + 7500));
