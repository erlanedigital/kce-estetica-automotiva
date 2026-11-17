const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function searchAll(pattern) {
  let match;
  while ((match = pattern.exec(content)) !== null) {
    console.log(`Matched at ${match.index}:`);
    console.log(content.substring(Math.max(0, match.index - 50), Math.min(content.length, match.index + 150)));
    console.log('---');
  }
}

searchAll(/\bDf\b/g);
