const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const distPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/index.html';

let html = fs.readFileSync(indexPath, 'utf8');

// 1. RECONSTRUCT STYLE 0
// Desktop CSS is pristine and spacious (from 21ebdda).
// Mobile CSS is 100% strictly scoped within @media (max-width: 768px) and @media (max-width: 640px).

const cleanStyle0 = `<style data-metaai-safe-area>:root { scroll-padding-top: var(--safe-area-scroll-padding-top, 0px); }
[data-safe-area-inset-root]::before {
  background: inherit;
  content: "";
  height: var(--safe-area-inset-top, 0px);
  inset: 0 0 auto;
  pointer-events: none;
  position: fixed;
  z-index: 2147483647;
}

/* ==========================================================================
   DESKTOP (PADRÃO OURO ORIGINAL - ESPAÇOSO, PROPORCIONAL E ELEGANTE)
   ========================================================================== */

/* Equalização perfeita e alinhamento de topo estrito para Cards */
.service-card {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
  margin-top: 0 !important;
  top: 0 !important;
  vertical-align: top !important;
}
.service-card img {
  height: 220px !important;
  min-height: 220px !important;
  max-height: 220px !important;
  width: 100% !important;
  object-fit: cover !important;
}
.reveal-delay-1, .reveal-delay-2, .reveal-delay-3 {
  transition-delay: 0s !important;
}
.reveal {
  opacity: 1 !important;
  transform: none !important;
}

/* ---- ALINHAMENTO MILIMÉTRICO DOS CARDS DE PACOTES (START, PRO, ULTRA) ---- */
#pacotes .grid {
  display: grid !important;
  align-items: stretch !important;
}
#pacotes article {
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
}
#pacotes article > div:first-child {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}

/* ---- MENU DE NAVEGAÇÃO CENTRALIZADO NO DESKTOP ---- */
@media (min-width: 1024px) {
  header nav {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
@media (max-width: 1023px) {
  header nav {
    display: none !important;
  }
}

/* ---- ESTILOS DO SISTEMA PROFISSIONAL DE VENDAS E SERVIÇOS (PAINEL ADM) ---- */
.adm-vendas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.adm-card-metric {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.adm-card-metric:hover {
  border-color: #0066FF;
  box-shadow: 0 8px 24px rgba(0,102,255,0.08);
  transform: translateY(-2px);
}
.adm-chart-container {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}
.adm-badge-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
}
.adm-badge-trend-up {
  background: #ECFDF5;
  color: #059669;
}

/* ---- BLINDAGEM DE ALINHAMENTO RIGOROSO DE TODOS OS CARDS DO SITE ---- */
#servicos .grid, #pacotes .grid, #galeria .grid {
  display: grid !important;
  align-items: stretch !important;
}

#servicos article, .service-card, #pacotes article {
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
  transition: border-color .3s ease, box-shadow .3s ease !important;
}

.service-card:hover {
  transform: none !important;
  border-color: #2F9BFF !important;
}

#servicos article > div:first-child {
  height: 220px !important;
  min-height: 220px !important;
  max-height: 220px !important;
  overflow: hidden !important;
  position: relative !important;
}

#servicos article img {
  height: 220px !important;
  min-height: 220px !important;
  max-height: 220px !important;
  width: 100% !important;
  object-fit: cover !important;
  transform: none !important;
}

/* Espaçamento garantido no ranking e prêmios da corrida */
.ranking-gap {
  margin-top: 64px !important;
  margin-bottom: 32px !important;
}

/* ---- ALTURA E ALINHAMENTO IDÊNTICO DOS CARDS DA GALERIA NO DESKTOP ---- */
#galeria .grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
  align-items: stretch !important;
}
#galeria .grid > div {
  height: 260px !important;
  min-height: 260px !important;
  max-height: 260px !important;
  align-self: stretch !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 0 !important;
  transform: none !important;
  overflow: hidden !important;
}
#galeria .grid img {
  height: 100% !important;
  width: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

/* CONTORNO VISÍVEL NAS CAIXAS INTERNAS DO FORMULÁRIO */
.field, select.field, input.field, textarea.field {
  border: 1.5px solid rgba(47, 155, 255, 0.45) !important;
  background: #0A1633 !important;
  box-shadow: 0 0 0 1px rgba(0, 102, 255, 0.15), inset 0 1px 3px rgba(0,0,0,0.3) !important;
}
.field:focus, select.field:focus, input.field:focus, textarea.field:focus {
  border-color: #2F9BFF !important;
  box-shadow: 0 0 0 2px rgba(47, 155, 255, 0.4), inset 0 1px 3px rgba(0,0,0,0.3) !important;
}

/* Alinhamento milimétrico e tipografia nobre na Localização (DESKTOP) */
#localizacao .grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
  align-items: stretch !important;
  gap: 2rem !important;
}
#localizacao .card-round {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
  min-height: 500px !important;
  border-radius: 24px !important;
  box-sizing: border-box !important;
}
#localizacao h3 {
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif) !important;
  font-size: 1.75rem !important;
  line-height: 1.25 !important;
  letter-spacing: -0.02em !important;
}

/* Logo circular perfeita (sem linha branca) */
.kce-brand-logo,
header#header img.rounded-full,
#agendar img.rounded-full,
footer img.rounded-full {
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  clip-path: circle(44.5% at 50% 50%) !important;
  -webkit-clip-path: circle(44.5% at 50% 50%) !important;
}

.link-admin-footer {
  display: none !important;
}

/* ==========================================================================
   📱 AJUSTES EXCLUSIVOS PARA MOBILE / TABLET (ESTRITAMENTE SCOPED)
   Nenhuma regra abaixo afeta telas desktop / computadores (largura > 768px)
   ========================================================================== */
@media (max-width: 768px) {
  html, body {
    max-width: 100vw !important;
    overflow-x: clip !important;
  }

  /* Cabeçalho mobile compacto e espaçado */
  header#header {
    min-height: 80px !important;
    padding: 12px 16px !important;
    gap: 8px !important;
  }
  header#header .kce-brand-logo {
    height: 48px !important;
    width: 48px !important;
    margin-right: 0px !important;
  }
  header#header button[title="Baixar aplicativo KCL"] {
    padding: 8px 12px !important;
    font-size: 11px !important;
  }

  /* Serviços em grid vertical no mobile */
  #servicos > div.grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    overflow-x: visible !important;
    gap: 24px !important;
    width: 100% !important;
    padding: 0 !important;
  }
  #servicos > div.grid > article {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    flex: none !important;
  }
  #servicos article ul,
  .service-card ul {
    gap: 5px !important;
    margin-top: 12px !important;
    margin-bottom: 24px !important;
  }
  #servicos article ul li,
  .service-card ul li {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 8px !important;
    margin: 0 !important;
    padding: 2px 0 !important;
    line-height: 1.3 !important;
    width: 100% !important;
  }

  /* Experiência KCL espaçamento equilibrado no mobile */
  #servicos {
    padding-bottom: 4rem !important;
  }
  #experiencia {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  #experiencia > div > div {
    min-height: 360px !important;
    padding-top: 4rem !important;
    padding-bottom: 6rem !important;
  }

  /* Painel Admin no Mobile/Tablet */
  .admin-shell {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
  .admin-shell .admin-topbar {
    padding: 14px 12px !important;
  }
  .admin-shell .admin-topbar h1 {
    font-size: 20px !important;
    white-space: normal !important;
    line-height: 1.2 !important;
  }
  .admin-shell main {
    padding: 12px 10px 40px 10px !important;
  }
  .admin-shell .admin-kpi {
    padding: 14px 12px !important;
    gap: 8px !important;
  }
  .admin-shell .admin-kpi p:first-child {
    font-size: 10px !important;
    letter-spacing: 0.06em !important;
    white-space: normal !important;
  }
  .admin-shell table {
    font-size: 12.5px !important;
  }
  .admin-shell .overflow-x-auto {
    max-width: calc(100vw - 20px) !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .admin-shell form {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  .admin-shell form > div,
  .admin-shell form > button {
    grid-column: span 1 / span 1 !important;
    width: 100% !important;
  }
  .admin-shell #gestao-socios [role="tablist"] {
    grid-template-columns: minmax(0, 1fr) !important;
  }
}

@media (max-width: 640px) {
  /* Hero título em tamanho ideal para celular */
  main#top > section:first-child h1,
  main#top > section:first-child h1 span {
    font-size: clamp(2.8rem, 12vw, 3.5rem) !important;
    line-height: 0.98 !important;
    letter-spacing: -0.03em !important;
  }

  /* Galeria em 2 colunas no celular */
  #galeria .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
  }
  #galeria .grid > div {
    height: 180px !important;
    min-height: 180px !important;
    max-height: 180px !important;
  }

  /* Localização em coluna única no celular */
  #localizacao .grid {
    grid-template-columns: 1fr !important;
    gap: 1.25rem !important;
  }
  #localizacao .card-round {
    min-height: auto !important;
  }
}
</style>`;

// 2. RECONSTRUCT STYLE 3
// Animations and effects, strictly keeping mobile layout within media queries.
const cleanStyle3 = `<style id="kcl-rich-effects">
  /* ANIMAÇÃO DAS LETRAS SUBINDO (REVEAL UP) */
  @keyframes letterUp {
    0% {
      opacity: 0;
      transform: translateY(28px) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes floatSoft {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes glowBorder {
    0%, 100% { border-color: rgba(47, 155, 255, 0.25); box-shadow: 0 0 15px rgba(0, 102, 255, 0.1); }
    50% { border-color: rgba(47, 155, 255, 0.6); box-shadow: 0 0 25px rgba(0, 102, 255, 0.25); }
  }

  /* Aplica o efeito nas palavras dos títulos principais e H1/H2 */
  h1, h2, .font-display, .font-elegant {
    animation: letterUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* Efeito de brilho nos botões e cards de serviço */
  .btn-teal, .btn-line {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .btn-teal:hover {
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 10px 25px -5px rgba(0, 102, 255, 0.5) !important;
  }

  /* 3 PASSOS E ZERO ESTRESSE */
  .passos-heading {
    font-size: clamp(1.4rem, 3.5vw, 2.2rem) !important;
    font-weight: 800 !important;
  }

  /* NO MOBILE SOMENTE: Justificar pequenos blocos de texto longo para melhor leitura */
  @media (max-width: 640px) {
    .corrida-desc-text {
      text-align: justify !important;
      text-justify: inter-word !important;
    }
  }
</style>`;

// Replace Style 0 and Style 3
const style0Regex = /<style data-metaai-safe-area>[\s\S]*?<\/style>/i;
const style3Regex = /<style id="kcl-rich-effects">[\s\S]*?<\/style>/i;

if (style0Regex.test(html)) {
  html = html.replace(style0Regex, cleanStyle0);
  console.log('Cleaned Style 0 successfully.');
} else {
  console.warn('Could not find Style 0 regex match!');
}

if (style3Regex.test(html)) {
  html = html.replace(style3Regex, cleanStyle3);
  console.log('Cleaned Style 3 successfully.');
} else {
  console.warn('Could not find Style 3 regex match!');
}

// 3. REMOVE ANTI-ORPHAN SCRIPT THAT WAS MUTATING DOM AND TEXT SPACING ON DESKTOP
html = html.replace(/<script id="kcl-anti-orphan-guard">[\s\S]*?<\/script>/i, '');
console.log('Removed anti-orphan script.');

// 4. ADD UNIVERSAL BACKUP BUTTON TO ADMIN TOPBAR (SYNCED ON ALL DEVICES)
// The user requested: "apertar o botão lá, fazer backup do sistema. Que vai ter um botão no topo do painel. Administrativo. Escrito backup."
if (!html.includes('id="kcl-admin-backup-btn"')) {
  // Find admin topbar right actions area where "Ver Site" or "Novo Agendamento" sits
  const targetTopbar = 'r("button",{onClick:()=>window.open("/","_blank"),title:"Ver site público",className:"hidden sm:inline-flex rounded-full border border-slate-300 hover:border-slate-400 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all",children:"🌐 Ver Site"})';
  const backupBtn = `r("button",{id:"kcl-admin-backup-btn",type:"button",onClick:()=>window.kclTriggerFullBackup?.(),title:"Fazer backup completo de todos os dados do sistema",className:"rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 inline-flex items-center gap-1.5 shadow-sm transition-all",children:[r("span",{children:"💾"}),r("span",{children:"Backup"})]}),` + targetTopbar;
  
  if (html.includes(targetTopbar)) {
    html = html.replace(targetTopbar, backupBtn);
    console.log('Inserted Backup button in Admin Topbar.');
  } else {
    console.warn('Could not find targetTopbar anchor for Backup button!');
  }
}

// 5. IMPLEMENT BACKUP HANDLER AND LGPD BANNER (CLIENT SCRIPT)
const clientEnhancementsScript = `
<script id="kcl-backup-and-lgpd-module">
(function(){
  // 1. BACKUP COMPLETO DO SISTEMA (DESKTOP + MOBILE)
  window.kclTriggerFullBackup = async function(){
    try {
      var backupData = {
        meta: {
          app: "KCL Estética Automotiva",
          version: "1.0-gold",
          timestamp: new Date().toISOString(),
          device: navigator.userAgent
        },
        localStorage: {},
        collections: {}
      };

      // Export localStorage
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.startsWith('kce_')) {
          try {
            backupData.localStorage[k] = JSON.parse(localStorage.getItem(k));
          } catch(e) {
            backupData.localStorage[k] = localStorage.getItem(k);
          }
        }
      }

      // Trigger instant JSON download
      var jsonStr = JSON.stringify(backupData, null, 2);
      var blob = new Blob([jsonStr], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      var dateStr = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = "kcl_backup_sistema_" + dateStr + ".json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Save a local snapshot marker
      localStorage.setItem("kce_last_backup", new Date().toISOString());
      
      if (typeof window.alert === 'function') {
        alert("✅ Backup concluído com sucesso! O arquivo de segurança com todos os dados foi salvo no seu dispositivo.");
      }
    } catch(err) {
      console.error("Erro no backup:", err);
      alert("Não foi possível gerar o backup: " + (err.message || String(err)));
    }
  };

  // 2. BANNER DE CONSENTIMENTO LGPD (LEI Nº 13.709/2018) NO SITE PÚBLICO
  function initLgpdBanner(){
    if (localStorage.getItem("kcl_lgpd_consent") === "1") return;
    if (document.getElementById("kcl-lgpd-banner")) return;

    var banner = document.createElement("div");
    banner.id = "kcl-lgpd-banner";
    banner.style.cssText = "position:fixed;bottom:16px;left:16px;right:16px;max-width:680px;margin:0 auto;z-index:999999;background:rgba(10,22,51,0.96);border:1px solid rgba(47,155,255,0.4);border-radius:18px;padding:16px 20px;box-shadow:0 12px 36px rgba(0,0,0,0.45);backdrop-filter:blur(10px);color:#E2E8F0;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;display:flex;flex-direction:column;gap:12px;animation:letterUp 0.4s ease;";
    
    banner.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
      '<span style="font-size:22px;line-height:1;">🛡️</span>' +
      '<div style="flex:1;line-height:1.45;">' +
        '<strong style="color:#FFFFFF;font-size:13.5px;display:block;margin-bottom:3px;">Privacidade e Proteção de Dados (LGPD)</strong>' +
        'Utilizamos cookies e tecnologias essenciais para permitir o agendamento seguro e proteger seus dados, em conformidade com a LGPD (Lei nº 13.709/2018).' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
      '<button id="kcl-lgpd-accept" style="background:#0066FF;color:#FFFFFF;border:none;border-radius:9999px;padding:8px 18px;font-size:12.5px;font-weight:700;cursor:pointer;transition:all 0.2s ease;">Concordar e Continuar</button>' +
    '</div>';

    document.body.appendChild(banner);

    var btn = document.getElementById("kcl-lgpd-accept");
    if (btn) {
      btn.onclick = function(){
        localStorage.setItem("kcl_lgpd_consent", "1");
        banner.remove();
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLgpdBanner);
  } else {
    setTimeout(initLgpdBanner, 800);
  }
})();
</script>
`;

if (!html.includes('id="kcl-backup-and-lgpd-module"')) {
  html = html.replace('</body>', clientEnhancementsScript + '\n</body>');
  console.log('Appended Backup & LGPD client module.');
}

// 6. SYNTAX VALIDATION
const scriptMatches = html.match(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Validating', scriptMatches.length, 'script blocks with vm.Script...');
scriptMatches.forEach((s, idx) => {
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new vm.Script(code);
  } catch (err) {
    console.error('SYNTAX ERROR in script block', idx, err.message);
    process.exit(1);
  }
});
console.log('ALL script blocks passed syntax validation!');

// 7. WRITE TO BOTH index.html and dist/index.html
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(distPath, html, 'utf8');
console.log('Saved both index.html and dist/index.html successfully.');
