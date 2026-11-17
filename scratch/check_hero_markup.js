const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const pos = html.lastIndexOf('hero-action-btn');
const heroPos = html.lastIndexOf('l("section"', pos);
console.log('Hero section start pos:', heroPos);
console.log(html.substring(heroPos, heroPos + 250));
