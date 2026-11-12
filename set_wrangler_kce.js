const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';

// Salvar temporariamente wrangler para kce e fazer deploy de redirect
const wranglerPath = path.join(projectDir, 'wrangler.jsonc');
let wContent = fs.readFileSync(wranglerPath, 'utf8');
let wKce = wContent.replace('"name": "kcl"', '"name": "kce"');
fs.writeFileSync(wranglerPath, wKce, 'utf8');
console.log('wrangler set to kce temporarily');
