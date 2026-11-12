const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const j7Idx = content.indexOf('j7=');
console.log('j7 snippet:\n', content.substring(j7Idx - 50, j7Idx + 600));

// E como o conteúdo das abas é renderizado
const renderTabsIdx = content.indexOf('Y==="visão"');
console.log('Render tabs snippet:\n', content.substring(renderTabsIdx - 50, renderTabsIdx + 2000));
