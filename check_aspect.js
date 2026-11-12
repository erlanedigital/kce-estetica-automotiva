const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const hasAspect = content.indexOf('aspect-[4/3]');
console.log('aspect in html:', hasAspect);
const hasAspectCss = content.indexOf('.aspect-');
console.log('aspect in css:', hasAspectCss);
