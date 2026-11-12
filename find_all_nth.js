const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const r = /:nth-child\(2\)|:nth-child\(odd\)|:nth-child\(even\)/gi;
let m;
while ((m = r.exec(content)) !== null) {
    console.log('nth-child at', m.index, ':', content.substring(m.index - 50, m.index + 100));
}
