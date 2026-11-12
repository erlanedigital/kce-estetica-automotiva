const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- INICIANDO IMPLEMENTAÇÃO COMPLETA KCE ---');

// 1. ESPAÇAMENTO DO CARD DE PRÊMIOS (IMAGEM ENVIADA PELO USUÁRIO)
const oldPremio = 'card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mb-2 shadow-lg';
const newPremio = 'card-round border border-[var(--line)] bg-[#0A1633] p-5 sm:p-6 mt-8 sm:mt-10 mb-2 shadow-lg';
if (html.includes(oldPremio)) {
    html = html.replace(oldPremio, newPremio);
    console.log('✓ 1. Espaçamento generoso (mt-8 sm:mt-10) no card de Prêmios aplicado!');
}

// 2. FOTOS DO ANTES E DEPOIS: CARRO REAL SUJO DE TERRA VS LIMPO BRILHANDO
const oldXv = 'var xv="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85";';
const newXv = 'var xv="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=85";';
if (html.includes(oldXv)) {
    html = html.replace(oldXv, newXv);
    console.log('✓ 2. Foto do ANTES atualizada para carro sujo de terra e barro real (photo-1517524008697-84bbe3c3fd98)!');
}

// Badges do Antes e Depois
if (html.includes('children:"ANTES"}')) {
    html = html.replace('children:"ANTES"}', 'children:"🔴 ANTES • SUJO DE TERRA & LAMA"}');
}
if (html.includes('children:"DEPOIS"}')) {
    html = html.replace('children:"DEPOIS"}', 'children:"🟢 DEPOIS • DETALHAMENTO & VITRIFICAÇÃO"}');
}
if (html.includes('children:"Poeira de estrada • marcas d\'água • pintura opaca"}')) {
    html = html.replace('children:"Poeira de estrada • marcas d\'água • pintura opaca"}', 'children:"Barro & terra pesada • poeira de estrada • pintura sem brilho"}');
}

// 3. ATUALIZAÇÃO DO ENDEREÇO OFICIAL NO FOOTER E DADOS
const addressRegex = /Rua[\s\w,.-]+Montes Claros/gi;
console.log('Address occurrences in html:', (html.match(addressRegex) || []).length);

// 4. CSS COMPLETO: ALINHAMENTO DE PACOTES, MENU CENTRALIZADO E DESIGN EXECUTIVO
const customCss = `
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

/* ---- MENU DE NAVEGAÇÃO CENTRALIZADO ---- */
header nav {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
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
`;

if (!html.includes('ALINHAMENTO MILIMÉTRICO DOS CARDS DE PACOTES')) {
    html = html.replace('</style>', customCss + '\n</style>');
    console.log('✓ 3. CSS de alinhamento dos pacotes, menu centralizado e design executivo adicionado!');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Gravado preliminarmente com sucesso.');
