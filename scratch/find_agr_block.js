const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('agr-seed-');
const start = c.lastIndexOf('let zn=await w("records.list",{collection:"kce_agreements"});', pos);
const end = c.indexOf('yn(zn?.records??[]);', pos);
console.log('agr block:');
console.log(c.substring(start, end));
