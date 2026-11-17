const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function showContext(str) {
  let idx = content.indexOf(str);
  if (idx !== -1) {
    console.log('=== CONTEXT OF: ' + str + ' ===');
    console.log(content.substring(idx - 150, idx + 350));
    console.log('\n');
  }
}

showContext('pcost-seed');
showContext('check-seed');
showContext('shift-seed');
showContext('svc-seed');
