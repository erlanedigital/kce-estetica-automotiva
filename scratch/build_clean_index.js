const { execSync } = require('child_process');
const fs = require('fs');
const babel = require('@babel/parser');

// 1. Get original pristine 064c6c5:index.html
let html = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

// Team auto-seed
const teamPrefix = 'if(!localStorage.getItem("kce_seeded_team")&&!G?.records?.length){';
const teamPos = html.indexOf(teamPrefix);
if (teamPos !== -1) {
  const teamEnd = html.indexOf('G=await w("records.list",{collection:"kce_team"})}', teamPos);
  if (teamEnd !== -1) {
    const fullTeamSeed = html.substring(teamPos, teamEnd + 'G=await w("records.list",{collection:"kce_team"})}'.length);
    html = html.replace(fullTeamSeed, '');
    console.log('✓ Replaced team seed');
  }
}

// Partner initial seed
const partnerSeedOriginal = 'if(!u?.records?.length){let zn=[{name:"Cadu",role:"Gestão / Caixa",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Kayan",role:"Operação / Lavagem",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()},{name:"Luiz",role:"Atendimento / Redes sociais",share:33.33,prolabore:4000,paid:0,createdAt:new Date().toISOString()}];for(let b=0;b<zn.length;b++)await w("records.create",{collection:"kce_partners",value:zn[b],idempotency_key:`partner-seed-${b}`});u=await w("records.list",{collection:"kce_partners"})}';
if (html.includes(partnerSeedOriginal)) {
  html = html.replace(partnerSeedOriginal, '');
  console.log('✓ Replaced partnerSeedOriginal');
}

// Partner tasks initial seed
const ptaskPrefix = 'let i=await w("records.list",{collection:"kce_partner_tasks"}),y=[';
const ptaskSuffix = 'let b=await w("records.list",{collection:"kce_partner_tasks"});X8(b?.records??[])}';
const ptaskStart = html.indexOf(ptaskPrefix);
const ptaskEnd = html.indexOf(ptaskSuffix, ptaskStart);
if (ptaskStart !== -1 && ptaskEnd !== -1) {
  const fullPtaskSeed = html.substring(ptaskStart, ptaskEnd + ptaskSuffix.length);
  html = html.replace(fullPtaskSeed, 'let i=await w("records.list",{collection:"kce_partner_tasks"});X8(i?.records??[]);');
  console.log('✓ Replaced ptask seed cleanly');
}

// Partner mock list fallback
const mockPartnerPrefix = 'try{let p=JSON.parse(localStorage.getItem("kcl_partnerships_list")||"null");if(Array.isArray(p)&&p.length)return p}catch{}return[';
const mockPartnerPos = html.indexOf(mockPartnerPrefix);
if (mockPartnerPos !== -1) {
  const mockPartnerEnd = html.indexOf(']}),[', mockPartnerPos);
  if (mockPartnerEnd !== -1) {
    const fullMockPartner = html.substring(mockPartnerPos, mockPartnerEnd + 1);
    html = html.replace(fullMockPartner, 'try{let p=JSON.parse(localStorage.getItem("kcl_partnerships_list")||"null");if(Array.isArray(p)&&p.length)return p}catch{}return[]');
    console.log('✓ Replaced mockPartner list');
  }
}

// Clean remaining literal seed names
html = html.replaceAll('"Carlos Eduardo - Cadu"', '"Equipe KCL"');
html = html.replaceAll('Carlos Eduardo - Cadu', 'Equipe KCL');
html = html.replaceAll('["Cadu","Kayan","Luiz"]', '["Equipe KCL"]');
html = html.replaceAll('"Cadu, Kayan e Luiz"', '"Equipe KCL"');
html = html.replaceAll('Cadu, Kayan e Luiz', 'Equipe KCL');
html = html.replaceAll('Cadu • Kayan • Luiz', 'Equipe KCL');
html = html.replaceAll('Cadu + Kayan', 'Plantão 1');
html = html.replaceAll('Kayan + Luiz', 'Plantão 2');
html = html.replaceAll('Luiz + Cadu', 'Plantão 1');
html = html.replaceAll('Cadu + Luiz', 'Plantão 2');
html = html.replaceAll('"Cadu"', '"Equipe KCL"');
html = html.replaceAll('owner:"Cadu"', 'owner:""');
html = html.replaceAll('Martelinho de Ouro Express', 'Parceiro Especializado');
html = html.replaceAll('Martelinho de Ouro, Insulfilm, PPF, Tapeçaria', 'PPF, Insulfilm, Tapeçaria, Serviços Especializados');
html = html.replaceAll('Martelinho, Insulfilm, PPF', 'PPF, Insulfilm, Tapeçaria');

// Validate script with Babel and new Function
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
const bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Babel parsed the cleaned script with ZERO ERRORS!');
} catch (err) {
  console.error('Babel error:', err.message, err.loc);
  process.exit(1);
}

try {
  new Function(bigScript);
  console.log('🎉 new Function executed with ZERO ERRORS!');
} catch (err) {
  console.error('new Function error:', err);
  process.exit(1);
}

fs.writeFileSync('scratch/clean_base.html', html, 'utf8');
console.log('Saved to scratch/clean_base.html');
