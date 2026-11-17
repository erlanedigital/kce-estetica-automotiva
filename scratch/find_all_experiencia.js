const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of "experiencia" in html
let pos = 0;
while ((pos = html.indexOf('experiencia', pos)) !== -1) {
  console.log('Pos:', pos);
  console.log(html.substring(Math.max(0, pos - 80), Math.min(html.length, pos + 250)));
  console.log('--------------------------------------------------');
  pos += 11;
}
