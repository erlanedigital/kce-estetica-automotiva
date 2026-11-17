const https = require('https');

const domains = [
  'marciaimoveis.emia.workers.dev',
  'marcenimoveis.emia.workers.dev',
  'marcia-imoveis.emia.workers.dev',
  'marcen-imoveis.emia.workers.dev',
  'marciaimoveis.com.br',
  'marcenimoveis.com.br'
];

async function check() {
  for (const d of domains) {
    try {
      const res = await fetch(`https://${d}`);
      console.log(`URL https://${d} -> Status: ${res.status}`);
      if (res.status === 200) {
        const text = await res.text();
        console.log(`Title for ${d}:`, text.match(/<title>([^<]+)<\/title>/i)?.[1]);
      }
    } catch (e) {
      console.log(`URL https://${d} -> Error: ${e.message}`);
    }
  }
}

check();
