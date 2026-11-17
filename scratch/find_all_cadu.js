const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

function findOccurrences(word) {
  const list = [];
  let pos = 0;
  while ((pos = orig.indexOf(word, pos)) !== -1) {
    list.push({
      pos,
      snippet: orig.substring(Math.max(0, pos - 40), Math.min(orig.length, pos + word.length + 40))
    });
    pos += word.length;
  }
  return list;
}

const caduList = findOccurrences('Cadu');
console.log('Total Cadu:', caduList.length);
caduList.forEach((c, idx) => {
  console.log(`#${idx + 1} pos ${c.pos}: ${JSON.stringify(c.snippet)}`);
});
