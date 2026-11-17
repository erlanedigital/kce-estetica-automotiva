const fs = require('fs');

const htmlPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const targetScript = `    var CURRENT_BUILD = 'kcl-build-20261113-v67';`;
const newScript = `    var CURRENT_BUILD = 'kcl-build-20261114-v70-clean';
    // Limpeza forçada de dados fictícios em qualquer perfil/navegador antigo
    try {
      var wipeKey = 'kcl_storage_cleaned_v70';
      if (localStorage.getItem(wipeKey) !== '1') {
        var mockCollections = [
          'kce_rec_kce_finance',
          'kce_rec_kce_bookings',
          'kce_rec_kce_clients',
          'kce_rec_kce_stock',
          'kce_rec_kce_os',
          'kce_rec_kce_shifts',
          'kce_rec_kce_product_costs',
          'kce_rec_kce_night_parking',
          'kce_rec_kce_payables',
          'kce_rec_kce_feedback',
          'kce_rec_kce_agreements',
          'kce_rec_kce_members'
        ];
        mockCollections.forEach(function(k) {
          localStorage.removeItem(k);
        });
        localStorage.setItem(wipeKey, '1');
      }
    } catch(e) {}`;

if (!html.includes(targetScript)) {
  console.error('Target script not found');
  process.exit(1);
}

html = html.replace(targetScript, newScript);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated cache-buster and storage cleaner in index.html!');
