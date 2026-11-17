const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('1. Passos heading:');
const pPassos = html.indexOf('passos-heading');
if (pPassos !== -1) {
  console.log(html.substring(pPassos - 100, pPassos + 300));
}
const pPassosText = html.indexOf('Zero Estresse');
const pPassosText2 = html.indexOf('Zero Stress');
console.log('Zero Estresse pos:', pPassosText, 'Zero Stress pos:', pPassosText2);
if (pPassosText !== -1) console.log(html.substring(pPassosText - 50, pPassosText + 150));
if (pPassosText2 !== -1) console.log(html.substring(pPassosText2 - 50, pPassosText2 + 150));

console.log('\n2. Ranking KCL GP:');
const pScores = html.indexOf('kce_scores');
const pLeader = html.indexOf('kce_ranking');
console.log('kce_scores:', pScores, 'kce_ranking:', pLeader);
if (pScores !== -1) {
  console.log(html.substring(pScores - 100, pScores + 400));
}

console.log('\n3. Agendar text beside form:');
const pReserve = html.indexOf('Reserve seu horário');
console.log('Reserve seu horário pos:', pReserve);
if (pReserve !== -1) {
  console.log(html.substring(pReserve - 100, pReserve + 600));
}
