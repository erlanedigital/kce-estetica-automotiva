const fs = require('fs');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Replace Block 4
const b4_str = content.substring(
  content.indexOf("if(!localStorage.getItem('kce_seeded_feedback')"),
  content.indexOf("ue(an?.records??[])")
);
if (b4_str.length > 50) {
  content = content.replace(b4_str, "localStorage.setItem('kce_seeded_feedback','1');");
  console.log('Replaced Block 4 (feedback seed)!');
}

// Replace Block 3
const b3_str = content.substring(
  content.indexOf("if(!localStorage.getItem('kce_seeded_os')"),
  content.indexOf("jl(cn?.records??[])")
);
if (b3_str.length > 50) {
  content = content.replace(b3_str, "localStorage.setItem('kce_seeded_os','1');");
  console.log('Replaced Block 3 (os seed)!');
}

// Replace Block 2
const b2_str = content.substring(
  content.indexOf("if(!localStorage.getItem('kce_seeded_clients')"),
  content.indexOf("h(W?.records??[])")
);
if (b2_str.length > 50) {
  content = content.replace(b2_str, "localStorage.setItem('kce_seeded_clients','1');");
  console.log('Replaced Block 2 (clients seed)!');
}

// Replace Block 1
const b1_str = content.substring(
  content.indexOf("if(!localStorage.getItem('kce_seeded_bookings')"),
  content.indexOf("p((y?.records??[])")
);
if (b1_str.length > 50) {
  content = content.replace(b1_str, "localStorage.setItem('kce_seeded_bookings','1');");
  console.log('Replaced Block 1 (bookings seed)!');
}

// Replace placeholder with Guilherme
content = content.replace(
  'placeholder:"Ex.: Lavagem Técnica — ABC-1D23 • Guilherme"',
  'placeholder:"Ex.: Lavagem Técnica — ABC-1D23 • Cliente"'
);
console.log('Replaced Guilherme placeholder!');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Saved index.html successfully!');
