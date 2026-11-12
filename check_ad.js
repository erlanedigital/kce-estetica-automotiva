const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const adIdx = content.indexOf('antes-depois');
const adIdx2 = content.indexOf('Comparar antes');
console.log('Antes e depois idx:', adIdx, adIdx2);
const start = adIdx !== -1 ? adIdx : adIdx2;
console.log(content.slice(start - 200, start + 1200));
