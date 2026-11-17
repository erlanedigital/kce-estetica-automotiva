const { execSync } = require('child_process');
const original = execSync('git show 064c6c5:index.html', {
  cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva',
  maxBuffer: 15 * 1024 * 1024
}).toString('utf8');

const p = original.indexOf('collection:"kce_partners"');
console.log(original.substring(p - 100, p + 2500));
