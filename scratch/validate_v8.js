const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
let errors = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  const code = match[1].trim();
  count++;
  if (!code) continue;

  try {
    new vm.Script(code);
    console.log(`Script #${count} [${code.length} bytes]: OK`);
  } catch (err) {
    errors++;
    console.error(`Script #${count} SYNTAX ERROR:`, err.message);
    const lines = code.split('\n');
    if (err.stack) {
      console.error(err.stack.split('\n').slice(0, 5).join('\n'));
    }
  }
}

console.log(`\nValidation complete: ${count} scripts checked, ${errors} syntax errors.`);
if (errors > 0) process.exit(1);
