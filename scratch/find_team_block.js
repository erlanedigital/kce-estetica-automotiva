const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const pos = c.indexOf('team-seed-');
console.log('pos:', pos);
const start = c.lastIndexOf('let G=await w("records.list",{collection:"kce_team"});', pos);
const end = c.indexOf('Vn(G?.records??[]);', pos);
console.log('team block:');
console.log(c.substring(start, end));
