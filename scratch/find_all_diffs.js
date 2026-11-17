const fs = require('fs');
const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8').replace(/\r\n/g, '\n');
const curr = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const origScript = [...orig.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].find(s => s[1].includes('createRoot('))[1];
const currScript = [...curr.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].find(s => s[1].includes('createRoot('))[1];

// Find chunks that differ
let oIdx = 0;
let cIdx = 0;
const diffs = [];

while (oIdx < origScript.length && cIdx < currScript.length) {
  if (origScript[oIdx] !== currScript[cIdx]) {
    let oStart = oIdx;
    let cStart = cIdx;
    // Find next common sync point (e.g. 30 matching chars)
    let syncFound = false;
    for (let testLen = 25; testLen <= 50; testLen += 5) {
      for (let forward = 1; forward < 20000; forward++) {
        if (cIdx + forward + testLen < currScript.length) {
          let probe = currScript.substr(cIdx + forward, testLen);
          let matchInOrig = origScript.indexOf(probe, oIdx);
          if (matchInOrig !== -1 && matchInOrig - oIdx < 30000) {
            diffs.push({
              origRange: [oStart, matchInOrig],
              currRange: [cStart, cIdx + forward],
              origSnippet: origScript.substring(oStart, Math.min(matchInOrig, oStart + 200)),
              currSnippet: currScript.substring(cStart, Math.min(cIdx + forward, cStart + 200)),
              origLen: matchInOrig - oStart,
              currLen: forward
            });
            oIdx = matchInOrig;
            cIdx = cIdx + forward;
            syncFound = true;
            break;
          }
        }
      }
      if (syncFound) break;
    }
    if (!syncFound) {
      console.log('No sync found from', oStart, cStart);
      break;
    }
  } else {
    oIdx++;
    cIdx++;
  }
}

console.log('Total diff regions found:', diffs.length);
diffs.forEach((d, idx) => {
  console.log(`\n--- Diff #${idx + 1} ---`);
  console.log(`Orig [len ${d.origLen}]: ${d.origSnippet.substring(0, 150)}...`);
  console.log(`Curr [len ${d.currLen}]: ${d.currSnippet.substring(0, 150)}...`);
});
