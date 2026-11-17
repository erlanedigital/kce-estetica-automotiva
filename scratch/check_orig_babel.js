const fs = require('fs');
const { execSync } = require('child_process');
const babel = require('@babel/parser');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');
const scriptMatches = [...orig.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  babel.parse(bigScript, { sourceType: 'script', plugins: ['jsx'] });
  console.log('🎉 Original 064c6c5 parsed successfully with Babel!');
} catch (err) {
  console.error('Original parse error:', err.message);
  console.error('Line:', err.loc?.line, 'Col:', err.loc?.column, 'Pos:', err.pos);
}
