const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = null;
for (const s of scriptMatches) {
  if (s[1].includes('createRoot(')) {
    bigScript = s[1];
    break;
  }
}

// Bisect to find the exact line / location of the syntax error
let low = 0;
let high = bigScript.length;

// Let's test binary search of syntax error by appending closing brackets
// Or let's test using node's vm module to get line and column!
const vm = require('vm');
try {
  new vm.Script(bigScript, { filename: 'bundle.js' });
} catch (err) {
  console.log('VM Error:', err.message);
  console.log('Stack:', err.stack);
}
