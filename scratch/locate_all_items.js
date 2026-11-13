const fs = require('fs');
const s = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

// 1. Search for hero buttons
const heroBtnIdx = s.indexOf('Jogar KCL GP');
console.log('Hero button idx:', heroBtnIdx);
if (heroBtnIdx !== -1) {
  console.log('--- HERO BUTTONS CONTEXT ---');
  console.log(s.slice(heroBtnIdx - 200, heroBtnIdx + 400));
}

// 2. Search for ranking text in minigame
const rankTxtIdx = s.indexOf('banco');
console.log('Search for banco:');
let pos = 0;
while (true) {
  let idx = s.indexOf('banco', pos);
  if (idx === -1) break;
  if (idx > 2600000) {
    console.log('--- BANCO AT', idx, '---');
    console.log(s.slice(idx - 100, idx + 200));
  }
  pos = idx + 5;
}

// 3. Search for TV button in admin
const tvIdx = s.indexOf('Painel de TV');
console.log('Painel de TV idx:', tvIdx);
if (tvIdx !== -1) {
  console.log('--- PAINEL DE TV CONTEXT ---');
  console.log(s.slice(tvIdx - 150, tvIdx + 200));
}

// 4. Search for executive buttons (DRE, Relatórios, Novo Agendamento) in admin
const dreIdx = s.indexOf('DRE');
console.log('Search for DRE:');
pos = 0;
while (true) {
  let idx = s.indexOf('DRE', pos);
  if (idx === -1) break;
  if (idx > 2300000) {
    console.log('--- DRE AT', idx, '---');
    console.log(s.slice(idx - 80, idx + 150));
  }
  pos = idx + 3;
}
