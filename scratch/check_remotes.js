const fs = require('fs');
const { execSync } = require('child_process');

const base = 'C:/Users/ERLANE/.gemini/antigravity/scratch';
const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory());

for (const d of dirs) {
  const p = `${base}/${d.name}`;
  if (fs.existsSync(`${p}/.git`)) {
    try {
      const remote = execSync('git remote -v', { cwd: p, encoding: 'utf8' });
      console.log(`${d.name}: ${remote.trim().split('\n')[0]}`);
    } catch (e) {}
  }
}
