const https = require('https');
https.get('https://kcl.emia.workers.dev', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = data.match(/CURRENT_BUILD\s*=\s*['"]([^'"]+)['"]/);
    console.log('Current build in live:', m ? m[1] : 'not found');
    console.log('AUTOAGENDAMENTO in live?', data.includes('AUTOAGENDAMENTO'));
    console.log('Reserve seu horario in live?', data.includes('Reserve seu'));
    console.log('Length:', data.length);
  });
});
