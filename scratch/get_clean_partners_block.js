const { execSync } = require('child_process');
const original = execSync('git show 064c6c5:index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const pStart = original.indexOf('try{let u=await w("records.list",{collection:"kce_partners"});');
const pEnd = original.indexOf(',F0=sf.length?sf.map', pStart);

console.log('Original chunk to restore (length: ' + (pEnd - pStart) + '):');
const originalChunk = original.substring(pStart, pEnd);
console.log(originalChunk.substring(0, 300));
console.log('...');
console.log(originalChunk.substring(originalChunk.length - 300));
