const { execSync } = require('child_process');
const original = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

const pStartOrig = original.indexOf('try{let u=await w("records.list",{collection:"kce_partners"});');
const pEndOrig = original.indexOf(',F0=sf.length?sf.map', pStartOrig);
let originalChunk = original.substring(pStartOrig, pEndOrig);

const matches = [...originalChunk.matchAll(/Cadu/g)];
console.log('Occurrences of Cadu in originalChunk:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] at ${m.index}: ` + originalChunk.substring(Math.max(0, m.index - 50), Math.min(originalChunk.length, m.index + 50)));
});
