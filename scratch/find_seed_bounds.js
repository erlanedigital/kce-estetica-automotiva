const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Block 1: kce_bookings
const b1_start = c.indexOf("if(!localStorage.getItem('kce_seeded_bookings')", 2305000);
const b1_end = c.indexOf("p((y?.records??[])", b1_start);
console.log('Block 1:', b1_start, b1_end);
console.log(c.substring(b1_start, b1_end));

// Block 2: kce_clients
const b2_start = c.indexOf("if(!localStorage.getItem('kce_seeded_clients')", 2308000);
const b2_end = c.indexOf("h(W?.records??[])", b2_start);
console.log('\nBlock 2:', b2_start, b2_end);
console.log(c.substring(b2_start, b2_end));

// Block 3: kce_os
const b3_start = c.indexOf("if(!localStorage.getItem('kce_seeded_os')", 2311000);
const b3_end = c.indexOf("jl(cn?.records??[])", b3_start);
console.log('\nBlock 3:', b3_start, b3_end);
console.log(c.substring(b3_start, b3_end));

// Block 4: kce_feedback
const b4_start = c.indexOf("if(!localStorage.getItem('kce_seeded_feedback')", 2313000);
const b4_end = c.indexOf("ue(an?.records??[])", b4_start);
console.log('\nBlock 4:', b4_start, b4_end);
console.log(c.substring(b4_start, b4_end));
