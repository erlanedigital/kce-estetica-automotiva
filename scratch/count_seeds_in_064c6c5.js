const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

const targets = ['Carlos Eduardo', 'Cadu', 'Martelinho de Ouro', 'kce_seeded_team'];
for (const t of targets) {
  let count = (orig.match(new RegExp(t, 'g')) || []).length;
  console.log(`"${t}": ${count} occurrences`);
}
