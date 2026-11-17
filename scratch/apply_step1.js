const fs = require('fs');
const parser = require('@babel/parser');

const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('Original html length:', html.length);

// 1. RANKING: Slice to top 5 only
const oldRanking = 'children:Bf.map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCL"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))';
const newRanking = 'children:Bf.slice(0,5).map((c,d)=>l("li",{className:"flex justify-between gap-2",children:[l("span",{children:[d+1,"º • ",c.name||"Jogador KCL"," • ",c.score," pts"]}),l("span",{className:"text-[#93A3BC]",children:[c.laps," voltas"]})]},d))';

if (!html.includes(oldRanking)) {
  console.error('ERROR: oldRanking not found!');
  process.exit(1);
}
html = html.replace(oldRanking, newRanking);
console.log('1. Ranking top 5 updated!');

// Also in the admin if there is another place:
// Let's check if there are other Bf.map
let bfCount = (html.match(/Bf\.map/g) || []).length;
console.log('Remaining Bf.map count:', bfCount);

fs.writeFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/scratch/step1_ranking.txt', 'OK');
