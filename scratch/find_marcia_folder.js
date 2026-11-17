const fs = require('fs');
const path = require('path');

const base = 'C:/Users/ERLANE/.gemini/antigravity/scratch';
const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory());

for (const d of dirs) {
  const p = path.join(base, d.name);
  try {
    const files = fs.readdirSync(p);
    for (const f of files) {
      if (f.endsWith('.html') || f.endsWith('.json') || f.endsWith('.js')) {
        const filePath = path.join(p, f);
        const stats = fs.statSync(filePath);
        if (stats.size < 5000000) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (/M[aá]rcia/i.test(content) || /im[oó]veis/i.test(content)) {
            console.log(`FOUND in folder: ${d.name} -> file: ${f}`);
            break;
          }
        }
      }
    }
  } catch (e) {}
}
