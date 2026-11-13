const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let sNum = 0;
while ((m = regex.exec(html)) !== null) {
  sNum++;
  const content = m[1];
  if (/m[eé]dico|cl[ií]nica/i.test(content)) {
    console.log(`Script ${sNum} contains match!`);
    const lines = content.split('\n');
    lines.forEach((l, lNum) => {
      if (/m[eé]dico|cl[ií]nica/i.test(l)) {
        console.log(`  Line ${lNum}: ${l.trim().slice(0, 140)}`);
      }
    });
  }
}
console.log('Search across all scripts complete.');
