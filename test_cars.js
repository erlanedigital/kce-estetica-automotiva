const https = require('https');

const testIds = [
  "photo-1517524008697-84bbe3c3fd98", // land rover / 4x4 muddy
  "photo-1549399542-7e3f8b79c341", // car wash foam
  "photo-1601362840469-51e4d8d58785", // dirty car / detailing
  "photo-1507136566006-cfc505b114fc", // land rover defender clean
  "photo-1533473359331-0135ef1b58bf", // suv clean shiny
  "photo-1542282088-72c9c27ed0cd", // audi clean
  "photo-1605559424843-9e4c228bf1c2", // mercedes shiny
  "photo-1525609004556-c46c7d6cf023" // sport car clean
];

testIds.forEach(id => {
  const u = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;
  https.get(u, res => {
    console.log(id, 'status:', res.statusCode);
  }).on('error', e => console.log(id, 'err', e.message));
});
