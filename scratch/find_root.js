const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('createRoot(');
console.log('createRoot at:', p);
console.log(html.substring(p - 300, p + 200));
