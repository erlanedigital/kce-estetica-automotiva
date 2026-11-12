const { execSync } = require('child_process');

try {
  const diff = execSync('git log -p -S "corrida" -n 2 index.html', { encoding: 'utf8' });
  console.log('--- GIT LOG -S corrida ---');
  console.log(diff.slice(0, 3000));
} catch (e) {
  console.error(e);
}
