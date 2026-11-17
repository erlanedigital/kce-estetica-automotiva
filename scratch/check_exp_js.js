const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('Vf.current.getBoundingClientRect');
console.log('Scroll listener:\n', html.substring(pos - 100, pos + 400));
