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

function testPrefix(n) {
  const code = bigScript.substring(0, n);
  try {
    new vm.Script(code);
    return false;
  } catch (err) {
    if (err.message.includes("Missing initializer in destructuring declaration")) {
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
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log('Missing initializer error pos:', errorPos);
if (errorPos !== -1) {
  console.log('Error context:\n', bigScript.substring(errorPos - 120, errorPos + 80));
}
