const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Procurar senha do painel
const passMatches = [];
const r = /(?:senha|password|DEFAULT_PASS|adminPass|LOGIN_PASS|pass\s*===)/gi;
let m;
while ((m = r.exec(content)) !== null) {
    console.log('Match at', m.index, ':', content.substring(Math.max(0, m.index - 40), Math.min(content.length, m.index + 120)).replace(/\s+/g, ' '));
}

// Procurar onde a validação de login ocorre
const loginMatch = content.match(/if\s*\([^)]*===[\s\S]{1,40}senha/i);
console.log('Login check:', loginMatch ? loginMatch[0] : 'not found');
