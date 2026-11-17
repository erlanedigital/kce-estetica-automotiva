const fs = require('fs');
const vm = require('vm');

let chunk = fs.readFileSync('scratch/original_missing_chunk.js', 'utf8');

// 1. Remove partner seed
const partnerSeedStr = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let b=0;b<zn.length;b++)await w("records.create",{collection:"kce_partners",value:zn[b],idempotency_key:`partner-seed-${b}`});u=await w("records.list",{collection:"kce_partners"})}';
if (!chunk.includes(partnerSeedStr)) {
  console.error('ERROR: partnerSeedStr not found in chunk!');
  process.exit(1);
}
chunk = chunk.replace(partnerSeedStr, '');

// 2. Remove partner tasks seed
const ptaskPrefix = 'let i=await w("records.list",{collection:"kce_partner_tasks"}),y=[';
const ptaskSuffix = 'let b=await w("records.list",{collection:"kce_partner_tasks"});X8(b?.records??[])}';
const ptaskStart = chunk.indexOf(ptaskPrefix);
const ptaskEnd = chunk.indexOf(ptaskSuffix, ptaskStart);
if (ptaskStart === -1 || ptaskEnd === -1) {
  console.error('ERROR: ptask seed not found in chunk!', ptaskStart, ptaskEnd);
  process.exit(1);
}
const fullPtaskSeed = chunk.substring(ptaskStart, ptaskEnd + ptaskSuffix.length);
// Note the semicolon at the end!
chunk = chunk.replace(fullPtaskSeed, 'let i=await w("records.list",{collection:"kce_partner_tasks"});X8(i?.records??[]);');

// 3. Replace Pu owner Cadu
chunk = chunk.replace('owner:"Cadu"', 'owner:""');

console.log('Modified chunk length:', chunk.length);

// Check if any seed names remain in chunk
console.log('Cadu remaining in chunk:', (chunk.match(/Cadu/gi) || []).length);
console.log('Kayan remaining in chunk:', (chunk.match(/Kayan/gi) || []).length);
console.log('Luiz remaining in chunk:', (chunk.match(/Luiz/gi) || []).length);

// Now let's test replacing in index.html
const html = fs.readFileSync('index.html', 'utf8');
const brokenSpot = 'gn=H.useCallback(async()=>{try{let u=await w("records.list",{collection:"kce_partners"});/* partner seed disabled */:0';
if (!html.includes(brokenSpot)) {
  console.error('ERROR: brokenSpot not found in index.html!');
  process.exit(1);
}

const newHtml = html.replace(brokenSpot, chunk);

// Extract the script tag and test with vm
const scriptMatches = [...newHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = null;
for (const s of scriptMatches) {
  if (s[1].includes('createRoot(')) {
    bigScript = s[1];
    break;
  }
}

try {
  new Function(bigScript);
  console.log('🎉🎉🎉 SUCCESS! Script compiles with zero syntax errors via new Function!');
  fs.writeFileSync('index.html', newHtml, 'utf8');
  if (fs.existsSync('dist/index.html')) {
    fs.writeFileSync('dist/index.html', newHtml, 'utf8');
  }
  console.log('Saved to index.html and dist/index.html');
} catch (err) {
  console.error('❌ Still has error:', err);
}
