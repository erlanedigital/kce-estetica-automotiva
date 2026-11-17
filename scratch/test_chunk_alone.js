const vm = require('vm');
const fs = require('fs');

let chunk = fs.readFileSync('scratch/original_missing_chunk.js', 'utf8');

const partnerSeedStr = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let b=0;b<zn.length;b++)await w("records.create",{collection:"kce_partners",value:zn[b],idempotency_key:`partner-seed-${b}`});u=await w("records.list",{collection:"kce_partners"})}';
chunk = chunk.replace(partnerSeedStr, '');

const ptaskPrefix = 'let i=await w("records.list",{collection:"kce_partner_tasks"}),y=[';
const ptaskSuffix = 'let b=await w("records.list",{collection:"kce_partner_tasks"});X8(b?.records??[])}';
const ptaskStart = chunk.indexOf(ptaskPrefix);
const ptaskEnd = chunk.indexOf(ptaskSuffix, ptaskStart);
const fullPtaskSeed = chunk.substring(ptaskStart, ptaskEnd + ptaskSuffix.length);
chunk = chunk.replace(fullPtaskSeed, 'let i=await w("records.list",{collection:"kce_partner_tasks"});X8(i?.records??[]);');

chunk = chunk.replace('owner:"Cadu"', 'owner:""');

// Note that chunk was inside a component: `gn=H.useCallback(async()=>{try{let u=...` up to `...:0` before `,F0=`
// What wrapped chunk in the original?
// In original, chunk started with: `gn=H.useCallback(async()=>{...`
// And ended with: `...M0=nn.ticket>0?Math.max(0,Math.ceil((Pf-F8)/Number(nn.ticket||80))):0`
// which was followed by `,F0=sf.length?...`
console.log('Chunk length:', chunk.length);

// Let's test if chunk inside a dummy function wrapper parses:
try {
  new Function('let H,w,sf,n0,X8,a8,z8,vu,ot,y8,e0,h8,f0,c8,V,Er,T,M,rA,je,Pu,N0,qe,Pf,Ir,nn,zA,li,Lf,F8,U0,C0,pA,Q8,M0; let ' + chunk);
  console.log('Chunk wrapper parses!');
} catch (e) {
  console.log('Chunk error:', e.message);
}
