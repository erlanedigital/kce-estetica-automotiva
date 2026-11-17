const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

const pos1 = orig.indexOf('kce_seeded_team');
console.log('pos1:', pos1);
console.log(orig.substring(pos1 - 40, pos1 + 250));

const pos2 = orig.indexOf('Martelinho de Ouro Express');
console.log('pos2:', pos2);
console.log(orig.substring(pos2 - 100, pos2 + 100));
