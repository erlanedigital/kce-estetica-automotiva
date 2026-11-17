const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p = html.indexOf('ll(');
console.log('Found ll( at:', p);
if (p !== -1) {
  console.log(html.substring(p - 80, p + 120));
}
