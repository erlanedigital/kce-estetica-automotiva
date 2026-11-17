const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/\bll\(/g)];
console.log('Matches for word ll(:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] at ${m.index}: ` + html.substring(Math.max(0, m.index - 50), Math.min(html.length, m.index + 80)));
});

// Also check children:ll(
const p2 = html.indexOf('children:ll(');
console.log('children:ll( at:', p2);
if (p2 !== -1) {
  console.log(html.substring(p2 - 50, p2 + 100));
}
