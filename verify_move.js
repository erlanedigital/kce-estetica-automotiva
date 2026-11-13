const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\ERLANE\\.gemini\\antigravity\\scratch\\kce-estetica-automotiva';
const distPath = path.join(projectDir, 'dist', 'index.html');
const content = fs.readFileSync(distPath, 'utf8');

const target = 'Y==="visão"&&';
const start = content.indexOf(target);
console.log('--- AT TOP OF VISÃO GERAL ---');
console.log(content.substring(start, start + 700));

// Count occurrences of 'Faturamento Hoje'
const matches = content.match(/Faturamento Hoje/g);
console.log('Total occurrences of "Faturamento Hoje" in index.html:', matches ? matches.length : 0);
