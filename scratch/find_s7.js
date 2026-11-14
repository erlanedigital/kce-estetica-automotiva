const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('function s7(');
console.log('function s7 at:', p);
console.log(html.substring(p, p + 2000));
