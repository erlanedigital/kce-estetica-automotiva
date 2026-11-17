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

// Bisect by slicing bigScript from 0 to N and testing if syntax error changes from "unexpected end of input" to "unexpected token"
// Better: check using esprima, acorn, or acorn-loose, or just parse line by line
// Or using a simple bracket/scope scanner or Node's Babel/eval
// Let's find with an iterative search:
let lines = bigScript.split('\n');
console.log('Total lines in bigScript:', lines.length);

for (let i = 1; i <= lines.length; i++) {
  const codeChunk = lines.slice(0, i).join('\n');
  try {
    new vm.Script(codeChunk);
  } catch (err) {
    if (err.message.includes("Unexpected token ':'")) {
      console.log('Error found when including line:', i);
      console.log('Line content:', lines[i-1].substring(0, 150));
      // Now find where in line i-1
      const lineStr = lines[i-1];
      for (let j = 0; j < lineStr.length; j++) {
        if (lineStr[j] === ':') {
          console.log('Found colon at pos', j, 'context:', lineStr.substring(Math.max(0, j - 40), Math.min(lineStr.length, j + 40)));
        }
      }
      break;
    }
  }
}
