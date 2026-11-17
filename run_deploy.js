const { execSync } = require('child_process');

console.log('Iniciando deploy com wrangler...');
try {
  const output = execSync('npx wrangler deploy', {
    cwd: __dirname,
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('--- STDOUT ---');
  console.log(output);
} catch (err) {
  console.log('--- ERROR ---');
  console.log(err.stdout);
  console.log(err.stderr);
}
