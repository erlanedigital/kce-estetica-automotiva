const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('function s7()');
const end = html.indexOf('x5.createRoot', p);
const s7Code = html.substring(p, end);
const matches = [...s7Code.matchAll(/\bDf\b/g)];
console.log('Total Df in s7:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] at ${m.index}: ` + s7Code.substring(Math.max(0, m.index - 50), Math.min(s7Code.length, m.index + 80)));
});
