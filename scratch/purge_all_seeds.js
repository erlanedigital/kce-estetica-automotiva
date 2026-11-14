const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Purge 1: useState("Cadu")
html = html.replace(/\[qe,w8\]=H\.useState\("Cadu"\)/g, '[qe,w8]=H.useState("Equipe KCL")');
html = html.replace(/owner:"Cadu"/g, 'owner:"Equipe KCL"');
html = html.replace(/buyer:"Cadu"/g, 'buyer:"Equipe KCL"');
html = html.replace(/localStorage\.getItem\("kcl_active_operator"\)\|\|"Cadu"/g, 'localStorage.getItem("kcl_active_operator")||"Equipe KCL"');
html = html.replace(/buyers:\["Cadu","Kayan","Luiz","Caixa KCL"\]/g, 'buyers:["Equipe KCL","Caixa KCL"]');

// Purge 2: Martelinho fallback array
html = html.replace(/return\[\{id:"pt-1",name:"Martelinho de Ouro Express",specialty:"Martelinho de Ouro & Funilaria Artesanal",phone:"\(38\) 99945-1122",kclShare:30,totalVolume:4200,kclRevenue:1260,active:!0\}\]/g, 'return[]');

// Purge 3: Team seeding Q
html = html.replace(/localStorage\.setItem\("kce_seeded_team","1"\);let Q=\[\{name:"Carlos Eduardo - Cadu"[^\]]+\};await Promise\.all\(Q\.map\(async\(u\)=>await er\(u,"Ativo"\)\)\)/g, 'localStorage.setItem("kce_seeded_team","1")');

// Purge 4: Partners seeding zn
html = html.replace(/if\(!u\?\.records\?\.length\)\{let zn=\[\{name:"Cadu",role:"Gestão \/ Caixa"[^\]]+\};await Promise\.all\(zn\.map\(async\(\$\)=>await w\("records\.create",\{collection:"kce_partners",data:\$\}\)\)\)\}/g, 'if(!u?.records?.length){}');

// Purge 5: Tasks seeding y
html = html.replace(/let y=\[\{title:"Atendimento ao cliente",owner:"Cadu"[^\]]+\};await Promise\.all\(y\.map\(async\(\$\)=>await w\("records\.create",\{collection:"kce_tasks",data:\$\}\)\)\)/g, 'let y=[];');

// Purge 6: sf.length fallback
html = html.replace(/sf\.length\?sf\.map\(\(u\)=>u\.value\.name\):\["Cadu","Kayan","Luiz"\]/g, 'sf.length?sf.map((u)=>u.value.name):["Equipe KCL"]');

// Purge 7: Children map ["Cadu","Kayan","Luiz"]
html = html.replace(/children:\["Cadu","Kayan","Luiz"\]\.map\(\(u\)=>{/g, 'children:(sf.length?sf.map((u)=>u.value.name):["Equipe KCL"]).map((u)=>{');

// Purge 8: pRole
html = html.replace(/pRole=u==="Cadu"\?"Gestão \/ Caixa":u==="Kayan"\?"Operação \/ Lavagem":"Atendimento \/ Redes sociais"/g, 'pRole="Operação / Gestão"');

// Purge 9: Line 6919
html = html.replace(/children:"Cadu • Kayan • Luiz"/g, 'children:"Equipe KCL"');

// Purge 10: Line 8084
html = html.replace(/<p class="text-xs text-slate-500">Cadu, Kayan e Luiz • 33,33% cada • Sempre 2 sócios presentes na operação<\/p>/g, '<p class="text-xs text-slate-500">Equipe & Gestão KCL • Montes Claros</p>');

// Purge 11: Cleanup on load in index.html script
const cleanupSnippet = `
<script>
// ZERO SEED PURGE ON LOAD
try {
  ['kce_seeded_team', 'kce_seeded_partner', 'kce_partner_seed', 'kce_team', 'kce_partners'].forEach(k => {
    let v = localStorage.getItem(k);
    if (v && (v.includes('Carlos Eduardo') || v.includes('Cadu') || v.includes('Martelinho') || v.includes('Kayan') || v.includes('Luiz'))) {
      localStorage.removeItem(k);
    }
  });
} catch(e){}
</script>
`;

if (!html.includes('ZERO SEED PURGE ON LOAD')) {
  html = html.replace('</body>', cleanupSnippet + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Purged all seeds.');
