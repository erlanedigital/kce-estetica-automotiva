const { execSync } = require('child_process');

const orig = execSync('git show 064c6c5:index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');
const scriptMatches = [...orig.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
let bigScript = scriptMatches.find(s => s[1].includes('createRoot('))[1];

try {
  new Function(bigScript);
  console.log('🎉 064c6c5 runs with new Function perfectly with ZERO errors!');
} catch (err) {
  console.error('Error in 064c6c5:', err);
}
