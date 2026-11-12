const fs = require('fs');
const path = require('path');

const wranglerPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/wrangler.jsonc';
let c = fs.readFileSync(wranglerPath, 'utf8');
c = c.replace('"name": "kce"', '"name": "kcl"');
fs.writeFileSync(wranglerPath, c, 'utf8');
console.log('wrangler.jsonc restored to "name": "kcl":', c.includes('"name": "kcl"'));
