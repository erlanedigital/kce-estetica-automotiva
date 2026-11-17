const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

const pos1 = orig.indexOf('kce_seeded_team');
console.log('kce_seeded_team snippet:\n', orig.substring(pos1 - 60, pos1 + 500));

const pos2 = orig.indexOf('Martelinho de Ouro Express');
console.log('\nMartelinho snippet:\n', orig.substring(pos2 - 60, pos2 + 400));
