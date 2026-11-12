const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar as abas do admin atual
const adminTabsMatch = content.match(/activeTab|tab\s*===\s*["']|aba\s*===\s*["']/gi);
console.log('Admin tab occurrences:', adminTabsMatch ? adminTabsMatch.length : 0);

// Encontrar onde o modal do Admin é aberto ou renderizado
const adminIdx = content.indexOf('Painel ADM');
console.log('Painel ADM idx:', adminIdx);
if (adminIdx !== -1) {
    console.log(content.substring(adminIdx - 200, adminIdx + 600));
}

// Procurar "admin-kpi" ou classes do admin
const kpiIdx = content.indexOf('admin-kpi');
console.log('admin-kpi idx:', kpiIdx);
if (kpiIdx !== -1) {
    console.log(content.substring(kpiIdx - 100, kpiIdx + 400));
}
