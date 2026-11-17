const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
styles.forEach((s, idx) => {
  const idMatch = s[0].match(/id="([^"]+)"/);
  console.log('Style #' + (idx+1) + ' length:', s[0].length, 'id:', idMatch ? idMatch[1] : 'none');
});
