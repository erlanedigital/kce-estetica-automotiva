const https = require('https');

https.get('https://kcl.emia.workers.dev', res => {
  console.log('HTTP Status:', res.statusCode);
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Length:', d.length);
    console.log('Includes localizacao:', d.includes('localizacao'));
    console.log('Includes Belo Horizonte:', d.includes('Belo Horizonte'));
    console.log('Includes kclesteticaautomotiva:', d.includes('kclesteticaautomotiva'));
  });
});
