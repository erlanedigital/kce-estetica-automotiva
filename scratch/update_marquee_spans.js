const fs = require('fs');
const babel = require('@babel/parser');

let html = fs.readFileSync('index.html', 'utf8');

const targetStr = 'bg-[#0A1633] py-3.5",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[';
const pos = html.indexOf(targetStr);
console.log('Target found at:', pos);

if (pos !== -1) {
  const endPos = html.indexOf(']})})', pos);
  console.log('End found at:', endPos);
  
  // Create 6 repeated spans with non-breaking space
  const singleSpan = 'r("span",{className:"pr-8 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "})';
  const repeatedSpans = [singleSpan, singleSpan, singleSpan, singleSpan, singleSpan, singleSpan].join(',');
  
  const replacement = 'bg-[#0A1633] py-6 sm:py-7",children:l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[' + repeatedSpans + ']})';
  
  html = html.substring(0, pos) + replacement + html.substring(endPos + 4);
  console.log('✓ Successfully replaced marquee in index.html');
}

// Validate script with Babel and new Function
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed successfully with ZERO ERRORS!');
} catch (err) {
  console.error('❌ Babel error:', err.message, err.loc);
  process.exit(1);
}

try {
  new Function(bigScript);
  console.log('🎉 new Function executed successfully with ZERO ERRORS!');
} catch (err) {
  console.error('❌ new Function error:', err);
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Saved to index.html and dist/index.html');
