const fs = require('fs');
const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

let pos = 0;
while ((pos = html.indexOf('<script', pos)) !== -1) {
  let endTag = html.indexOf('</script>', pos);
  console.log('Script tag at', pos, 'to', endTag, 'snippet:', html.substring(pos, pos + 50));
  pos = endTag + 9;
}
