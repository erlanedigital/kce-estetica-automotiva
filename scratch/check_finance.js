const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function findFinancialDefaults() {
  const matches = content.match(/\[\{[^\]]*?(?:entrada|sa[ií]da|receita|despesa|valor|lucro|faturamento)[^\]]*?\}\]/gi);
  if (matches) {
    console.log('Found matches:', matches.length);
    for (let i = 0; i < Math.min(5, matches.length); i++) {
      console.log(`Match ${i}:`, matches[i].substring(0, 150));
    }
  }
}

findFinancialDefaults();

// Let's also search for finance initial state
let idx = 0;
while ((idx = content.indexOf('kce_finance', idx)) !== -1) {
  console.log('kce_finance at', idx, ':', content.substring(idx - 50, idx + 200));
  idx += 11;
}
