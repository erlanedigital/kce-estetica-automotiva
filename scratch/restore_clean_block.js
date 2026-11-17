const fs = require('fs');
const vm = require('vm');
const { execSync } = require('child_process');

let html = fs.readFileSync('index.html', 'utf8');
const original = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

// 1. Extract original chunk from 064c6c5
const pStartOrig = original.indexOf('try{let u=await w("records.list",{collection:"kce_partners"});');
const pEndOrig = original.indexOf(',F0=sf.length?sf.map', pStartOrig);
let cleanChunk = original.substring(pStartOrig, pEndOrig);

console.log('Original chunk length:', cleanChunk.length);

// 2. Clean seeds inside cleanChunk cleanly without altering structure:
// A. Partner seed
const partSeedTarget = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let b=0;b<zn.length;b++)await w("records.create",{collection:"kce_partners",value:zn[b],idempotency_key:`partner-seed-${b}`});u=await w("records.list",{collection:"kce_partners"})}';
if (cleanChunk.includes(partSeedTarget)) {
  cleanChunk = cleanChunk.replace(partSeedTarget, '/* partner auto-seed disabled */');
  console.log('✓ Cleaned partner seed in chunk.');
}

// B. Partner tasks seed
const taskSeedTarget = cleanChunk.substring(
  cleanChunk.indexOf('if(!i?.records?.length){for(let b=0;b<y.length'),
  cleanChunk.indexOf('let zn=await w("records.list",{collection:"kce_partner_tasks"});X8(zn?.records??[])}else{')
);
// Replace tasks seed with simple no-op:
cleanChunk = cleanChunk.replace(/let i=await w\("records\.list",\{collection:"kce_partner_tasks"\}\),y=\[\{title:"Atendimento ao cliente"[^}]+;X8\(b\?\.records\?\?\[\]\)\}/, 'let i=await w("records.list",{collection:"kce_partner_tasks"});X8(i?.records??[])');

// C. Product costs seed
cleanChunk = cleanChunk.replace(/if\(!G\?\.records\?\.length\)\{let zn=\[\{name:"Shampoo Neutro"[^}]+;h8\(b\?\.records\?\?\[\]\)\}else h8\(G\.records\);/, 'h8(G?.records??[]);');

// D. Checklist seed
cleanChunk = cleanChunk.replace(/if\(!on\?\.records\?\.length\)\{let zn=\["Energia ligada"[^}]+;c8\(b\?\.records\?\?\[\]\)\}else c8\(on\.records\)/, 'c8(on?.records??[]);');

// E. Replace hardcoded "Cadu", "Kayan", "Luiz" in cleanChunk
cleanChunk = cleanChunk.replace(/children:\["Cadu","Kayan","Luiz"\]/g, 'children:(sf.length?sf.map(m=>m.value.name):["Equipe KCL"])');
cleanChunk = cleanChunk.replace(/"Cadu • Kayan • Luiz"/g, '"Equipe KCL"');
cleanChunk = cleanChunk.replace(/"Cadu"/g, '"Equipe KCL"');

// 3. Find corrupted chunk in current index.html
const pStartCurrent = html.indexOf('try{let u=await w("records.list",{collection:"kce_partners"});');
const pEndCurrent = html.indexOf(',F0=sf.length?sf.map', pStartCurrent);

console.log('Replacing corrupted slice in index.html from', pStartCurrent, 'to', pEndCurrent);
html = html.substring(0, pStartCurrent) + cleanChunk + html.substring(pEndCurrent);

// 4. Also verify children:ll("div"
if (html.includes('children:ll("div"')) {
  html = html.replace('children:ll("div"', 'children:l("div"');
  console.log('✓ Fixed children:ll("div" -> children:l("div")');
}

// 5. Test if script parses cleanly!
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = null;
for (const s of scriptMatches) {
  if (s[1].includes('createRoot(')) {
    bigScript = s[1];
    break;
  }
}

try {
  new vm.Script(bigScript, { filename: 'bundle.js' });
  console.log('🎉 SUCCESS! Entire React bundle parses with ZERO SYNTAX ERRORS!');
  
  fs.writeFileSync('index.html', html, 'utf8');
  fs.writeFileSync('dist/index.html', html, 'utf8');
  console.log('Saved index.html and dist/index.html successfully.');
} catch (err) {
  console.error('❌ Still syntax error:', err.message);
  console.error(err.stack);
}
