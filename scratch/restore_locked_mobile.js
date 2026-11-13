const { execSync } = require('child_process');
const fs = require('fs');
const vm = require('vm');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const distPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/index.html';

// 1. Get exact index.html from commit c849b49 (the one the user approved and asked to blindar)
let html = execSync('git show c849b49:index.html', { 
  cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva', 
  maxBuffer: 50*1024*1024 
}).toString();

console.log('Restored base from c849b49 (size:', html.length, ')');

// 2. DESKTOP GRID RESTORATION (Galeria & Localização) in Style 0
// Restore desktop grid for Galeria and Localização so desktop is NOT a single column or collapsed
const desktopGridFix = `
/* ---- RESTAURAÇÃO DE GRID DESKTOP (GALERIA & LOCALIZAÇÃO) ---- */
@media (min-width: 769px) {
  #galeria .grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
    align-items: stretch !important;
  }
  #galeria .grid > div {
    height: 260px !important;
    min-height: 260px !important;
    max-height: 260px !important;
  }
  #localizacao .grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
    align-items: stretch !important;
    gap: 2rem !important;
  }
  #localizacao .card-round {
    min-height: 500px !important;
  }
}
`;

html = html.replace('</style>\n  <style>', desktopGridFix + '\n</style>\n  <style>');

// 3. ISOLATE TEXT JUSTIFY TO MOBILE ONLY (so desktop text is never stretched)
const globalJustifyTarget = `/* Justificar todos os corpos de texto descritivos do site */
main#top section p.leading-relaxed:not(.text-center),
main#top #servicos article p,
main#top .steps-cascade p,
main#top .corrida-desc-text,
main#top #agendar > div:first-child > p:not(:first-child),
main#top section article p.leading-relaxed,
footer p.leading-relaxed {
  text-align: justify !important;
  text-justify: inter-word !important;
  hyphens: auto !important;
}`;

const mobileOnlyJustify = `/* Justificar corpos de texto descritivos SOMENTE NO MOBILE */
@media (max-width: 768px) {
  main#top section p.leading-relaxed:not(.text-center),
  main#top #servicos article p,
  main#top .steps-cascade p,
  main#top .corrida-desc-text,
  main#top #agendar > div:first-child > p:not(:first-child),
  main#top section article p.leading-relaxed,
  footer p.leading-relaxed {
    text-align: justify !important;
    text-justify: inter-word !important;
    hyphens: auto !important;
  }
}`;

if (html.includes(globalJustifyTarget)) {
  html = html.replace(globalJustifyTarget, mobileOnlyJustify);
  console.log('Successfully scoped text-justify to mobile only!');
} else {
  console.warn('Could not find global justify target!');
}

// 4. KEYBOARD TYPING FIX (never block A, D, space in inputs/forms)
const keyTarget = `let c=(d)=>{if(d.key==="ArrowLeft"||d.key==="a"||d.key==="A")d.preventDefault(),Wf(-1);if(d.key==="ArrowRight"||d.key==="d"||d.key==="D")d.preventDefault(),Wf(1);if(d.key===" "){if(d.preventDefault(),!re.current.running&&!re.current.over)Lr()}};`;
const keyReplacement = `let c=(d)=>{let tg=(d.target&&d.target.tagName)?d.target.tagName.toLowerCase():"";if(tg==="input"||tg==="textarea"||tg==="select"||(d.target&&d.target.isContentEditable))return;if(d.key==="ArrowLeft"||d.key==="a"||d.key==="A"){if(re.current.running){d.preventDefault();Wf(-1)}}if(d.key==="ArrowRight"||d.key==="d"||d.key==="D"){if(re.current.running){d.preventDefault();Wf(1)}}if(d.key===" "){if(!re.current.running&&!re.current.over&&we.trim()){d.preventDefault();Lr()}}};`;

if (html.includes(keyTarget)) {
  html = html.replace(keyTarget, keyReplacement);
  console.log('Successfully applied keyboard fix!');
} else {
  console.warn('Could not find keyTarget in c849b49 HTML!');
}

// 5. BACKUP BUTTON IN ADMIN TOPBAR & LGPD BANNER
const adminTopbarTarget = `children:[r("span",{children:"🔄"}),"Sincronizar"]}),l("button",{onClick:()=>{AA(null),ae({date:un(),time:"09:00",name:"",phone:"",vehicle:"Sedan",plate:"",service:"Lavagem Técnica",price:89,status:"Pendente"}),g("agendamentos"),Xu(!0)},className:\`\${s} justify-center !py-2.5 !px-3\`,children:[r(bn,{size:14})," Novo Agendamento"]}),l("button",{onClick:()=>{g("clientes"),Ht(!0)},className:\`\${ln} justify-center !py-2 !px-3\`,children:[r(bn,{size:14})," Novo Cliente"]})]})]}`;
const adminTopbarRepl = `children:[r("span",{children:"🔄"}),"Sincronizar"]}),l("button",{onClick:()=>window.kclTriggerFullBackup?.(),title:"Fazer backup completo de todos os dados do sistema",className:"rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-center gap-1.5 shadow-sm transition-all",children:[r("span",{children:"💾"}),"Backup"]})]})]}`;

if (html.includes(adminTopbarTarget)) {
  html = html.replace(adminTopbarTarget, adminTopbarRepl);
  console.log('Successfully inserted Backup button into admin topbar!');
}

// Client enhancements module (Backup & LGPD)
const clientModule = `
<script id="kcl-backup-and-lgpd-module">
(function(){
  // 1. BACKUP COMPLETO DO SISTEMA
  window.kclTriggerFullBackup = async function(){
    try {
      var backupData = {
        meta: {
          app: "KCL Estética Automotiva",
          version: "1.0-gold-locked",
          timestamp: new Date().toISOString(),
          device: navigator.userAgent
        },
        localStorage: {}
      };
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
      localStorage.setItem("kce_last_backup", new Date().toISOString());
      alert("✅ Backup concluído com sucesso! Arquivo de segurança salvo.");
    } catch(err) {
      alert("Não foi possível gerar o backup: " + (err.message || String(err)));
    }
  };

  // 2. BANNER LGPD NO SITE PÚBLICO
  function initLgpdBanner(){
    if (localStorage.getItem("kcl_lgpd_consent") === "1") return;
    if (document.getElementById("kcl-lgpd-banner")) return;

    var banner = document.createElement("div");
    banner.id = "kcl-lgpd-banner";
    banner.style.cssText = "position:fixed;bottom:16px;left:16px;right:16px;max-width:680px;margin:0 auto;z-index:999999;background:rgba(10,22,51,0.96);border:1px solid rgba(47,155,255,0.4);border-radius:18px;padding:16px 20px;box-shadow:0 12px 36px rgba(0,0,0,0.45);backdrop-filter:blur(10px);color:#E2E8F0;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;display:flex;flex-direction:column;gap:12px;";
    
    banner.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
      '<span style="font-size:22px;line-height:1;">🛡️</span>' +
      '<div style="flex:1;line-height:1.45;">' +
        '<strong style="color:#FFFFFF;font-size:13.5px;display:block;margin-bottom:3px;">Privacidade e Proteção de Dados (LGPD)</strong>' +
        'Utilizamos cookies e tecnologias essenciais para garantir o agendamento seguro e proteger seus dados, em conformidade com a LGPD (Lei nº 13.709/2018).' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
      '<button id="kcl-lgpd-accept" style="background:#0066FF;color:#FFFFFF;border:none;border-radius:9999px;padding:8px 18px;font-size:12.5px;font-weight:700;cursor:pointer;">Concordar e Continuar</button>' +
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
  html = html.replace('</body>', clientModule + '\n</body>');
  console.log('Appended clientModule.');
}

// 6. BUMP SERVICE WORKER VERSION
html = html.replace(/kcl-pwa-v\d+/g, 'kcl-pwa-v58');

// 7. VALIDATE SYNTAX
const scriptMatches = html.match(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Validating', scriptMatches.length, 'scripts with vm.Script...');
scriptMatches.forEach((s, idx) => {
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new vm.Script(code);
  } catch(err) {
    console.error('SYNTAX ERROR in script', idx, err.message);
    process.exit(1);
  }
});
console.log('ALL SCRIPTS VALID!');

// 8. WRITE OUT
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(distPath, html, 'utf8');

['C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/sw.js', 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/sw.js'].forEach(f => {
  if (fs.existsSync(f)) {
    let sw = fs.readFileSync(f, 'utf8');
    sw = sw.replace(/kcl-pwa-v\d+/g, 'kcl-pwa-v58');
    fs.writeFileSync(f, sw, 'utf8');
    console.log('Bumped SW to v58 in', f);
  }
});

console.log('SUCCESS! Restored c849b49 with full desktop grid and mobile locked isolation.');
