const fs = require('fs');
const vm = require('vm');

let chunk = fs.readFileSync('scratch/original_missing_chunk.js', 'utf8');

const partnerSeedStr = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let b=0;b<zn.length;b++)await w("records.create",{collection:"kce_partners",value:zn[b],idempotency_key:`partner-seed-${b}`});u=await w("records.list",{collection:"kce_partners"})}';
chunk = chunk.replace(partnerSeedStr, '');

const ptaskPrefix = 'let i=await w("records.list",{collection:"kce_partner_tasks"}),y=[';
const ptaskSuffix = 'let b=await w("records.list",{collection:"kce_partner_tasks"});X8(b?.records??[])}';
const ptaskStart = chunk.indexOf(ptaskPrefix);
const ptaskEnd = chunk.indexOf(ptaskSuffix, ptaskStart);
const fullPtaskSeed = chunk.substring(ptaskStart, ptaskEnd + ptaskSuffix.length);
chunk = chunk.replace(fullPtaskSeed, 'let i=await w("records.list",{collection:"kce_partner_tasks"});X8(i?.records??[])');

chunk = chunk.replace('owner:"Cadu"', 'owner:""');

const html = fs.readFileSync('index.html', 'utf8');
const brokenSpot = 'gn=H.useCallback(async()=>{try{let u=await w("records.list",{collection:"kce_partners"});/* partner seed disabled */:0';

const newHtml = html.replace(brokenSpot, chunk);

const scriptMatches = [...newHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
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
    if (err.message.includes("Unexpected identifier 'let'")) {
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

console.log('Error pos for let:', errorPos);
if (errorPos !== -1) {
  console.log('Context:\n', bigScript.substring(errorPos - 120, errorPos + 80));
}
