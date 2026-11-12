const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const slice = content.slice(2081671, 2120000);

// Identificar as abas do admin
const tabRegex = /Y==="([^"]+)"/g;
let m;
const tabs = [];
while ((m = tabRegex.exec(slice)) !== null) {
  if (!tabs.includes(m[1])) tabs.push(m[1]);
}
console.log('Abas encontradas:', tabs);

// Trecho da primeira aba (visão geral)
const vgIdx = slice.indexOf('Y==="visão geral"');
const vgIdx2 = slice.indexOf('Y==="visao geral"');
const vIdx = vgIdx !== -1 ? vgIdx : vgIdx2;
console.log('Visão geral idx:', vIdx);
if (vIdx !== -1) {
  console.log(slice.slice(vIdx, vIdx + 3000));
}
