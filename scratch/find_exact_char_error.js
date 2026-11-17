const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('index.html', 'utf8');

const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = null;
for (const s of scriptMatches) {
  if (s[1].includes('createRoot(')) {
    bigScript = s[1];
    break;
  }
}

// Bisect bigScript character by character
let start = 0;
let end = bigScript.length;

// Helper to check if code up to index N has the ':' error
function testPrefix(n) {
  const code = bigScript.substring(0, n);
  try {
    new vm.Script(code);
    return false; // Valid or incomplete
  } catch (err) {
    if (err.message.includes("Unexpected token ':'")) {
      return true;
    }
    return false;
  }
}

let left = 0;
let right = bigScript.length;
let errorPos = -1;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  if (testPrefix(mid)) {
    errorPos = mid;
    right = mid - 1; // Try to find earlier
  } else {
    left = mid + 1;
  }
}

console.log('Exact error pos:', errorPos);
if (errorPos !== -1) {
  console.log('Error context:\n', bigScript.substring(errorPos - 120, errorPos + 80));
}
