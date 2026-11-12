const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const vIdx = content.indexOf('Y==="visão"&&');
console.log('Y==="visão"&& idx:', vIdx);
if (vIdx !== -1) {
  console.log(content.slice(vIdx, vIdx + 4500));
}
