const vm = require('vm');
const { execSync } = require('child_process');
const original = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

const pStartOrig = original.indexOf('try{let u=await w("records.list",{collection:"kce_partners"});');
const pEndOrig = original.indexOf(',F0=sf.length?sf.map', pStartOrig);
let cleanChunk = original.substring(pStartOrig, pEndOrig);

// Wrap in async function to test syntax
function testSyntax(chunk, label) {
  try {
    new vm.Script('async function test() {\n' + chunk + '\n}');
    console.log('✓ ' + label + ' SYNTAX OK!');
    return true;
  } catch (err) {
    console.error('❌ ' + label + ' ERROR:', err.message);
    return false;
  }
}

testSyntax(cleanChunk, 'originalChunk');

// Now let's test our modifications step by step:
// Step 1: Remove partner seed
cleanChunk = cleanChunk.replace(/if\(!u\?\.records\?\.length\)\{[\s\S]*?u=await w\("records\.list",\{collection:"kce_partners"\}\)\}/, '');
testSyntax(cleanChunk, 'after partner seed');

// Step 2: Remove partner tasks seed
cleanChunk = cleanChunk.replace(/if\(!i\?\.records\?\.length\)\{[\s\S]*?X8\(b\?\.records\?\?\[\]\)\}/, '');
testSyntax(cleanChunk, 'after tasks seed');

// Step 3: Remove costs seed
cleanChunk = cleanChunk.replace(/if\(!G\?\.records\?\.length\)\{[\s\S]*?h8\(b\?\.records\?\?\[\]\)\}else h8\(G\.records\);/, 'h8(G?.records??[]);');
testSyntax(cleanChunk, 'after costs seed');

// Step 4: Remove checklist seed
cleanChunk = cleanChunk.replace(/if\(!on\?\.records\?\.length\)\{[\s\S]*?c8\(b\?\.records\?\?\[\]\)\}else c8\(on\.records\)/, 'c8(on?.records??[]);');
testSyntax(cleanChunk, 'after checklist seed');
