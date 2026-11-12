const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// Vamos pesquisar se há alguma regra de css com nth-child(2) ou 2n ou delay
const regexCss = /(?:nth-child|service-card|\.card-round|reveal-delay-2)/gi;
let m;
while ((m = regexCss.exec(content)) !== null) {
    if (m.index < 100000) { // dentro dos styles
        console.log('Match at', m.index, ':', content.substring(Math.max(0, m.index - 40), m.index + 120).replace(/\s+/g, ' '));
    }
}
