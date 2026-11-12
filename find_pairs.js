const https = require('https');

// Procurar imagens no Unsplash com query "dirty car mud" ou "car mud"
async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results ? json.results.map(r => ({ id: r.id, alt: r.alt_description, url: r.urls.regular })) : []);
        } catch(e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

(async () => {
  const dirty = await searchUnsplash('dirty car mud');
  console.log('--- DIRTY CARS ---');
  dirty.forEach(d => console.log(d.id, '|', d.alt, '|', d.url));

  const wash = await searchUnsplash('car detailing clean');
  console.log('\n--- CLEAN CARS ---');
  wash.forEach(w => console.log(w.id, '|', w.alt, '|', w.url));
})();
