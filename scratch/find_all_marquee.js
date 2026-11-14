const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/marquee/gi)];
console.log('Total occurrences of marquee:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] at ${m.index}: ` + html.substring(Math.max(0, m.index - 40), Math.min(html.length, m.index + 80)));
});
