const fs = require('fs');
const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8').replace(/\r\n/g, '\n');
const curr = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const origScript = [...orig.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].find(s => s[1].includes('createRoot('))[1];
const currScript = [...curr.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].find(s => s[1].includes('createRoot('))[1];

console.log('Orig normalized script length:', origScript.length);
console.log('Curr normalized script length:', currScript.length);

let i = 0;
while (i < origScript.length && i < currScript.length && origScript[i] === currScript[i]) {
  i++;
}
console.log('First real mismatch at index:', i);
console.log('Orig snippet at mismatch:\n', origScript.substring(i - 40, i + 100));
console.log('Curr snippet at mismatch:\n', currScript.substring(i - 40, i + 100));
