const https = require('https');

https.get('https://kcl.emia.workers.dev', res => {
  console.log('Status code https://kcl.emia.workers.dev:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Title in html:', (data.match(/<title>([^<]+)<\/title>/i) || [])[1]);
    console.log('Contains Rua Belo Horizonte 80:', data.includes('Rua Belo Horizonte, 80'));
    console.log('Contains @kclesteticaautomotiva:', data.includes('kclesteticaautomotiva'));
    console.log('Contains id="localizacao":', data.includes('id="localizacao"'));
  });
}).on('error', e => console.error('Error:', e.message));
