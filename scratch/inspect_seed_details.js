const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

[2308701, 2309862, 2313113, 2315202].forEach((pos, idx) => {
  console.log(`\n--- Block #${idx + 1} around pos ${pos} ---`);
  console.log(c.substring(pos - 120, pos + 500));
});
