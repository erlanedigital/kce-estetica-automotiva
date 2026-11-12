const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. Injetar a fonte Plus Jakarta Sans se não estiver
if (!html.includes('Plus+Jakarta+Sans')) {
  html = html.replace('</head>', `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">\n</head>`);
}

// 2. CSS global para aplicar a tipografia Plus Jakarta Sans em todo o painel ADM
const adminTypographyCss = `
<style>
  /* FORÇAR TIPOGRAFIA PLUS JAKARTA SANS EM TODO O PAINEL ADM */
  .admin-panel, #admin-modal, [class*="admin"], dialog, .fixed.inset-0.z-50, .fixed.inset-0.z-40,
  table.admin-table, thead.admin-table-head, tr.admin-row, .modal-admin {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
  }
  
  /* Retirar qualquer fonte serifada decorativa ou desarmônica dentro do Admin */
  .admin-panel *, [class*="admin"] *, dialog * {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
  }

  /* BOTÃO FLUTUANTE DISCRETO DE ACESSO AO ADMIN PARA NUNCA SUMIR */
  #kcl-admin-float-btn {
    position: fixed;
    bottom: 18px;
    left: 18px;
    z-index: 9999;
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
  #kcl-admin-float-btn:hover {
    background: #0066FF;
    color: #ffffff;
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(0,102,255,0.4);
  }

  /* SUB-BARRA DE NAVEGAÇÃO MOBILE PERFEITAMENTE ABAIXO DA LOGO */
  @media (max-width: 768px) {
    header#header {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }
    .kce-brand-logo {
      height: 48px !important;
      width: 48px !important;
    }
    /* Sub-barra horizontal de navegação sempre limpa e acessível */
    nav.mobile-subnav-bar {
      display: flex !important;
      overflow-x: auto !important;
      white-space: nowrap !important;
      gap: 8px !important;
      padding: 6px 12px !important;
      background: rgba(10, 22, 51, 0.85) !important;
      border-radius: 9999px !important;
      margin-top: 8px !important;
      border: 1px solid rgba(47, 155, 255, 0.2) !important;
    }
    nav.mobile-subnav-bar a {
      color: #C8D0DA !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      padding: 4px 10px !important;
      border-radius: 9999px !important;
      text-decoration: none !important;
    }
    nav.mobile-subnav-bar a:hover, nav.mobile-subnav-bar a:active {
      color: #ffffff !important;
      background: #0066FF !important;
    }
  }
</style>
`;

if (!html.includes('FORÇAR TIPOGRAFIA PLUS JAKARTA SANS EM TODO O PAINEL ADM')) {
  html = html.replace('</head>', adminTypographyCss + '\n</head>');
}

// 3. Adicionar o Botão Flutuante de Admin e o Link Direto no Footer
const adminFloatBtn = `
  <!-- BOTÃO FLUTUANTE DE ACESSO AO PAINEL ADM -->
  <button id="kcl-admin-float-btn" onclick="openAdminDirectly()" title="Painel de Gestão KCL" aria-label="Painel de Gestão KCL">
    ⚙️
  </button>
  <script>
    function openAdminDirectly() {
      // Tenta acionar a função interna do React de abrir modal, senão redireciona para /admin.html
      const logoBtn = document.querySelector('button[title*="abrir painel"]');
      if (logoBtn) {
        logoBtn.click();
      } else {
        window.location.href = '/admin.html';
      }
    }
  </script>
`;

if (!html.includes('kcl-admin-float-btn')) {
  html = html.replace('</body>', adminFloatBtn + '\n</body>');
}

// 4. Salvar os arquivos
fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Tipografia Plus Jakarta Sans e Botão de Acesso ao Admin integrados com sucesso!');
