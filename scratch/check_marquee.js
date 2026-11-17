const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p = html.indexOf('.marquee-track');
console.log('CSS:\n', html.substring(p - 150, p + 450));

const p2 = html.indexOf('marquee-track font-bold');
console.log('Markup:\n', html.substring(p2 - 100, p2 + 350));
