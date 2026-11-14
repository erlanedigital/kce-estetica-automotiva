const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('id:"experiencia"');
const slice = html.substring(p, p + 2000);
const matches = [...slice.matchAll(/\bDf\b/g)];
console.log('Matches for Df in experiencia:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] at ${m.index}: ` + slice.substring(Math.max(0, m.index - 60), Math.min(slice.length, m.index + 80)));
});
