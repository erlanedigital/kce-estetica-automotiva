const fs = require('fs');
const c = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

let pos = 0;
while ((pos = c.indexOf('serviceWorker', pos)) !== -1) {
  console.log('SW registration pos:', pos);
  console.log(c.substring(pos - 50, pos + 250));
  pos += 13;
}
