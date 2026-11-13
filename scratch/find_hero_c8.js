const { execSync } = require('child_process');
const htmlC8 = execSync('git show c849b49:index.html', { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva', maxBuffer: 50*1024*1024 }).toString();

// Search for hero title in c849b49
const heroIdx = htmlC8.indexOf('Sente');
console.log('Hero idx:', heroIdx);
if (heroIdx !== -1) {
  console.log(htmlC8.slice(heroIdx - 150, heroIdx + 300));
} else {
  // search for section top
  const topIdx = htmlC8.indexOf('id="top"');
  console.log(htmlC8.slice(topIdx, topIdx + 800));
}
