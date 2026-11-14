const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('id:"header"');
console.log(html.substring(p + 3800, p + 5000));
