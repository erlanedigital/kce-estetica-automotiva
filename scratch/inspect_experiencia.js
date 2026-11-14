const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('id:"experiencia"');
console.log('Position:', pos);
if (pos !== -1) {
  console.log(html.substring(pos - 150, pos + 2500));
}
