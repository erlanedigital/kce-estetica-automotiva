const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
while ((m = scriptRegex.exec(content)) !== null) {
    const attrs = m[1];
    const code = m[2];
    console.log(`Script ${count}: attrs="${attrs.trim()}", length=${code.length}`);
    if (!attrs.includes('json')) {
        try {
            new Function(code);
            console.log(`  -> Syntax OK`);
        } catch(e) {
            console.log(`  -> Syntax ERROR: ${e.message}`);
        }
    } else {
        try {
            JSON.parse(code);
            console.log(`  -> JSON OK`);
        } catch(e) {
            console.log(`  -> JSON ERROR: ${e.message}`);
        }
    }
    count++;
}
