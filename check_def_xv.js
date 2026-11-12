const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const xvIdx = content.indexOf('xv=');
const jvIdx = content.indexOf('jv=');
console.log('xv idx:', xvIdx, 'jv idx:', jvIdx);
if (xvIdx !== -1) {
  console.log(content.slice(xvIdx - 100, xvIdx + 300));
}
if (jvIdx !== -1) {
  console.log(content.slice(jvIdx - 100, jvIdx + 300));
}
