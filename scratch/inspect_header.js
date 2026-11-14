const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('header#header');
console.log('header#header CSS:', p !== -1 ? html.substring(p - 100, p + 500) : 'not found');

const p2 = html.indexOf('id:"header"');
console.log('id:"header" markup:', p2 !== -1 ? html.substring(p2 - 100, p2 + 500) : 'not found');
