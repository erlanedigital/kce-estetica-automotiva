const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const klpIdx = content.indexOf('KLP-2198');
console.log('KLP-2198 idx:', klpIdx);
if (klpIdx !== -1) {
  console.log(content.slice(klpIdx - 300, klpIdx + 500));
}

// E onde está o slider de antes e depois na página pública?
const sliderMatches = content.match(/.{0,80}(?:Antes|Depois).{0,80}/gi) || [];
console.log('--- SLIDER MATCHES (total: ' + sliderMatches.length + ') ---');
sliderMatches.slice(0, 10).forEach(m => console.log(m.trim()));
