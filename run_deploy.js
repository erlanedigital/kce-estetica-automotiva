const { spawnSync } = require('child_process');

console.log('Iniciando deploy com wrangler...');
const res = spawnSync('npx.cmd', ['wrangler', 'deploy'], {
  cwd: __dirname,
  encoding: 'utf8',
  stdio: 'pipe'
});

console.log('--- STDOUT ---');
console.log(res.stdout);
console.log('--- STDERR ---');
console.log(res.stderr);
console.log('Código de saída:', res.status);
