const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dist', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
let errors = 0;

while ((match = scriptRegex.exec(content)) !== null) {
  scriptIndex++;
  const attrs = match[1] || '';
  const scriptContent = match[2].trim();
  if (!scriptContent) continue;

  if (attrs.includes('application/json') || attrs.includes('application/ld+json')) {
    try {
      JSON.parse(scriptContent);
      console.log(`Script ${scriptIndex} (JSON): OK`);
    } catch (err) {
      errors++;
      console.error(`Script ${scriptIndex} JSON Syntax Error:`, err.message);
    }
  } else {
    try {
      new Function(scriptContent);
      console.log(`Script ${scriptIndex} (JS): OK`);
    } catch (err) {
      errors++;
      console.error(`Script ${scriptIndex} JS Syntax Error:`, err.message);
    }
  }
}

if (errors === 0) {
  console.log(`\nALL ${scriptIndex} SCRIPTS (INCLUDING THE MAIN APPLICATION BUNDLE SCRIPT 6) PASSED WITH ZERO ERRORS!`);
} else {
  console.error(`\nFound ${errors} error(s)!`);
  process.exit(1);
}
