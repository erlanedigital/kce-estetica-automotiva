const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const s6 = html.match(/<script[\s\S]*?<\/script>/gi)[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
const lines = s6.split('\n');

for (let i = 200; i <= 210; i++) {
  console.log(`L${i + 1}: ${JSON.stringify(lines[i])}`);
}
