const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 25 --oneline', { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva' }).toString().split('\n');
console.log('Recent commits:\n', commits.slice(0, 15).join('\n'));

// Let's see how "Sente o brilho" was styled in earlier commits
['05e5fe8', '709272e', '861c74b', '29349d6', '5ae03c6', 'da804b5', '7275d37', 'c849b49', 'cf8b9a1'].forEach(c => {
  try {
    const file = execSync(`git show ${c}:index.html`, { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva', maxBuffer: 50*1024*1024 }).toString();
    
    // Find Sente o brilho
    const idx = file.indexOf('Sente o brilho');
    console.log(`Commit ${c} - Sente o brilho snippet:`);
    if (idx !== -1) {
      console.log(file.slice(idx - 100, idx + 150));
    } else {
      console.log('Not found by exact string');
    }

    // Find espuma
    const idxEspuma = file.indexOf('espuma');
    console.log(`Commit ${c} - Espuma snippet:`);
    if (idxEspuma !== -1) {
      console.log(file.slice(idxEspuma - 50, idxEspuma + 100));
    }
  } catch(e) {
    console.log(`Error checking commit ${c}:`, e.message);
  }
});
