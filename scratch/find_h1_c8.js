const { execSync } = require('child_process');
const htmlC8 = execSync('git show c849b49:index.html', { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva', maxBuffer: 50*1024*1024 }).toString();

const h1Idx = htmlC8.indexOf('parts:[{text:');
console.log('parts:[{text: idx:', h1Idx);
if (h1Idx !== -1) {
  console.log(htmlC8.slice(h1Idx - 50, h1Idx + 400));
}

const mainIdx = htmlC8.indexOf('id:"top"');
console.log('main id=top idx:', mainIdx);
if (mainIdx !== -1) {
  console.log(htmlC8.slice(mainIdx, mainIdx + 1200));
}
