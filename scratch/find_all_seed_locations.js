const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

function findOccurrences(word) {
  const list = [];
  let pos = 0;
  while ((pos = orig.indexOf(word, pos)) !== -1) {
    list.push({
      pos,
      snippet: orig.substring(Math.max(0, pos - 50), Math.min(orig.length, pos + word.length + 50))
    });
    pos += word.length;
  }
  return list;
}

console.log('--- Carlos Eduardo ---');
console.log(findOccurrences('Carlos Eduardo'));

console.log('--- Martelinho de Ouro ---');
console.log(findOccurrences('Martelinho de Ouro'));

console.log('--- kce_seeded_team ---');
console.log(findOccurrences('kce_seeded_team'));
