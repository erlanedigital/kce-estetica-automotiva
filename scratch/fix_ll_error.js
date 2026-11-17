const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (html.includes('children:ll("div"')) {
  html = html.replace('children:ll("div"', 'children:l("div"');
  console.log('✓ Fixed children:ll("div" -> children:l("div")');
} else {
  console.log('Target not found!');
}

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Files saved.');
