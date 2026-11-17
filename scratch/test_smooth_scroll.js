const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('scratch/clean_base.html', 'utf8');

// Replace the buggy desktop scroll calculation with the smooth responsive calculation:
const oldCalc = 'if(window.innerWidth<=768){let start=window.innerHeight*0.78,span=Math.max(220,window.innerHeight*0.62);_7(Math.max(0,Math.min(1,(start-d.top)/span)))}else{let _=Math.max(1,d.height-window.innerHeight);_7(Math.max(0,Math.min(1,-d.top/_)))}}';
const newCalc = 'let winH=window.innerHeight;let start=winH*0.82;let span=Math.max(120,d.height+winH*0.35);let prog=(start-d.top)/span;_7(Math.max(0,Math.min(1,prog)))}';

if (html.includes(oldCalc)) {
  html = html.replace(oldCalc, newCalc);
  console.log('✓ Successfully updated scroll calculation for experience!');
} else {
  console.error('❌ oldCalc not found in clean_base.html');
}

// Also clean the remaining 2 minor seeds:
html = html.replace('specialty:"Martelinho de Ouro & Funilaria Artesanal"', 'specialty:"Reparos & Funilaria Artesanal"');
html = html.replace('["cadu","kayan","luiz"]', '["sócio","gestão","equipe"]');

// Check with Babel and new Function
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed the cleaned script with ZERO ERRORS!');
} catch (err) {
  console.error('Babel error:', err.message, err.loc);
  process.exit(1);
}

try {
  new Function(bigScript);
  console.log('🎉 new Function executed with ZERO ERRORS!');
} catch (err) {
  console.error('new Function error:', err);
  process.exit(1);
}

fs.writeFileSync('scratch/perfect_clean_index.html', html, 'utf8');
console.log('Saved to scratch/perfect_clean_index.html');
