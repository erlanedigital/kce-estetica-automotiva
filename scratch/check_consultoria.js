const fs = require('fs');

const folders = ['consultoriapatrimonialfi', 'consultoriapatrimonialhe', 'consultoriapatrimonialap', 'seupatrimonionobrasil'];

for (const f of folders) {
  const p = `C:/Users/ERLANE/.gemini/antigravity/scratch/${f}/index.html`;
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const hasMarcia = /M[aá]rcia/i.test(content);
    console.log(`=== ${f} ===`);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');
    console.log('H1:', h1Match ? h1Match[1] : 'none');
    console.log('Mentions Marcia:', hasMarcia);
  }
}
