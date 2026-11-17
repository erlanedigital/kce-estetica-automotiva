const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const brokenSpot = '/* partner seed disabled */:0';
const pos = html.indexOf(brokenSpot);
console.log('In index.html around brokenSpot:');
console.log(html.substring(pos - 100, pos + brokenSpot.length + 100));
