const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const premioIdx = content.indexOf('Prêmios');
console.log('Prêmios index:', premioIdx);
if (premioIdx !== -1) {
    console.log(content.substring(premioIdx - 300, premioIdx + 500));
}

// Também procurar "Ranking salvo no banco"
const rankingIdx = content.indexOf('Ranking salvo no banco');
console.log('Ranking salvo index:', rankingIdx);
if (rankingIdx !== -1) {
    console.log(content.substring(rankingIdx - 200, rankingIdx + 400));
}
