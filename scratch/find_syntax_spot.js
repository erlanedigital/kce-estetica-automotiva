const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p = html.indexOf('pb-12 mx-auto w-full",children:[');
console.log('Found p at:', p);
if (p !== -1) {
  console.log(html.substring(p, p + 1000));
}
