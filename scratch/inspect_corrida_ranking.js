const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"corrida"');
console.log(html.substring(pos, pos + 4000));
