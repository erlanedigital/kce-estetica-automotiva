const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('--- Style #3 ---');
console.log(styles[2][1].substring(0, 1000));
