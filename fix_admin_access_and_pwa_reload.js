const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. Corrigir o botão flutuante e adicionar no header e rodapé links diretos claros pro ADM:
// Link direto para abrir o modal via click no botão oficial de painel OU abrir /admin.html
// Também garantir que o Service Worker force recarregamento imediato em QUALQUER dispositivo que abra

// Ajustar o script do botão flutuante para funcionar 100% de qualquer jeito
const oldBtnRegex = /<!-- BOTÃO FLUTUANTE DE ACESSO AO PAINEL ADM -->[\s\S]*?<\/script>/;
const fixedAdminBtn = `<!-- BOTÃO DIRETO DE ACESSO AO PAINEL ADM -->
<div id="kcl-admin-launcher" style="position:fixed;bottom:18px;left:18px;z-index:99999;display:flex;gap:8px;align-items:center;">
  <button onclick="triggerKclAdmin()" style="display:flex;align-items:center;gap:6px;background:#0066FF;color:#fff;border:none;padding:8px 14px;border-radius:999px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:12px;cursor:pointer;box-shadow:0 8px 24px rgba(0,102,255,0.4);letter-spacing:0.02em;">
    ⚙️ Painel ADM
  </button>
</div>
<script>
  function triggerKclAdmin() {
    var btn = document.querySelector('button[title*="abrir painel"]');
    if (btn) {
      btn.click();
    } else {
      window.location.href = '/admin.html';
    }
  }
</script>`;

if (html.includes('<!-- BOTÃO FLUTUANTE DE ACESSO AO PAINEL ADM -->')) {
  html = html.replace(oldBtnRegex, fixedAdminBtn);
} else if (!html.includes('id="kcl-admin-launcher"')) {
  html = html.replace('</body>', fixedAdminBtn + '\n</body>');
}

// 2. Garantir que QUALQUER celular que já tem o app instalado recarregue AUTOMATICAMENTE se o SW atualizar
const autoReloadScript = `
<script>
  // AUTO-UPDATE FORÇADO EM TODOS OS DISPOSITIVOS
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      window.location.reload();
    });
    navigator.serviceWorker.getRegistration().then(function(reg) {
      if (reg) {
        reg.update();
        setInterval(function() { reg.update(); }, 15000); // Checa a cada 15s
      }
    });
  }
</script>
`;

if (!html.includes('AUTO-UPDATE FORÇADO EM TODOS OS DISPOSITIVOS')) {
  html = html.replace('</body>', autoReloadScript + '\n</body>');
}

// 3. Atualizar versão de cache no HTML e sw.js
const vBust = 'v' + Date.now();
html = html.replace(/kcl-cache-v[a-zA-Z0-9_\-]+/g, 'kcl-cache-' + vBust);

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

// Atualizar sw.js
let sw = fs.readFileSync('dist/sw.js', 'utf8');
sw = sw.replace(/const CACHE_NAME = [^;]+;/, `const CACHE_NAME = 'kcl-cache-${vBust}';`);
fs.writeFileSync('dist/sw.js', sw, 'utf8');
fs.writeFileSync('sw.js', sw, 'utf8');

console.log('Admin trigger e auto-reload universal aplicados com sucesso! Versão:', vBust);
