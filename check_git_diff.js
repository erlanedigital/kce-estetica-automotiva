const { execSync } = require('child_process');

try {
  const diff = execSync('git diff HEAD~3 HEAD -- index.html', { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva' }).toString();
  console.log('Diff length:', diff.length);
  // Procurar trechos que mudaram em corrida
  const lines = diff.split('\n');
  const relevant = lines.filter(l => l.includes('corrida') || l.includes('Prêmios') || l.includes('pts') || l.includes('KCE') || l.includes('KCL') || l.includes('médic') || l.includes('medico'));
  console.log('Relevant diff lines count:', relevant.length);
  relevant.forEach(r => console.log(r));
} catch(e) {
  console.error(e.message);
}
