const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Replace kce_agreements seed block
const agrPos = content.indexOf('agr-seed-');
if (agrPos !== -1) {
  const agrStart = content.lastIndexOf('if(!localStorage.getItem(\'kce_seeded_agreements\')', agrPos);
  const agrEnd = content.indexOf('yn(zn?.records??[]);', agrPos);
  if (agrStart !== -1 && agrEnd !== -1) {
    const agrBlock = content.substring(agrStart, agrEnd);
    content = content.replace(agrBlock, "localStorage.setItem('kce_seeded_agreements','1');");
    console.log('Cleaned kce_agreements seed block!');
  }
}

// Ensure kce_team does not reseed if user deleted
const teamPos = content.indexOf('team-seed-');
if (teamPos !== -1) {
  const teamStart = content.lastIndexOf('if(!G?.records?.length)', teamPos);
  if (teamStart !== -1) {
    content = content.replace('if(!G?.records?.length){let Q=[{name:"Carlos Eduardo', 'if(!localStorage.getItem("kce_seeded_team")&&!G?.records?.length){localStorage.setItem("kce_seeded_team","1");let Q=[{name:"Carlos Eduardo');
    console.log('Added guard to kce_team seed block!');
  }
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Saved index.html successfully!');
