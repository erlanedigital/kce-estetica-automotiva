const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=85"
];

let checked = 0;
urls.forEach(u => {
  https.get(u, res => {
    console.log(u.split('?')[0].replace('https://images.unsplash.com/', ''), '-> status:', res.statusCode);
    checked++;
    if (checked === urls.length) process.exit(0);
  }).on('error', e => {
    console.log(u, 'error:', e.message);
    checked++;
    if (checked === urls.length) process.exit(0);
  });
});
