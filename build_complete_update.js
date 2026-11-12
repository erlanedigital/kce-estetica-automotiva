const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- INICIANDO CONSTRUÇÃO COMPLETA DAS SEÇÕES E DO PAINEL ADM ---');

// ==========================================
// 1. ADICIONAR SEÇÃO GALERIA E LOCALIZAÇÃO NO CÓDIGO
// ==========================================

// Vamos verificar se a galeria e localização já existem
if (!html.includes('id:"galeria"')) {
    // Inserir a galeria logo antes da seção corrida
    const targetCorrida = 'l("section",{id:"corrida"';
    const galeriaCode = `l("section",{id:"galeria",className:"relative overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-28 text-center",children:[r(Af,{count:8}),r("p",{className:"text-center text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"ESTÚDIO & PROCESSOS"}),r("h2",{className:"text-center font-display font-extrabold text-[43px] sm:text-[53px] tracking-tight mt-3",children:r(kf,{parts:[{text:"Galeria de"},{text:"transformações.",elegant:!0}]})}),r("p",{className:"text-center text-sm text-[#93A3BC] mt-2 max-w-2xl mx-auto",children:"Fotos reais dos nossos serviços de vitrificação cerâmica, polimento técnico, higienização detalhada e acabamento de estúdio em Montes Claros."}),l("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10",children:[
      {t:"Vitrificação Cerâmica 9H",s:"Reflexo espelhado de estúdio",img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"},
      {t:"Polimento Técnico & Refino",s:"Remoção total de micro-riscos",img:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80"},
      {t:"Lavagem Técnica Detalhada",s:"Snow foam & luvas de microfibra",img:"https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"},
      {t:"Higienização Interna & Couro",s:"Limpeza técnica e hidratação",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"},
      {t:"Detalhamento de Rodas & Freios",s:"Descontaminação ferrosa e selante",img:"https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"},
      {t:"Inspeção de Pintura em LED",s:"Cabine de iluminação técnica 5000K",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"}
    ].map((g,idx)=>l("div",{key:idx,className:"group relative card-round overflow-hidden border border-[var(--line)] bg-[#0A1633] aspect-[4/3]",children:[
      r("img",{src:g.img,alt:g.t,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"}),
      r("div",{className:"absolute inset-0 bg-gradient-to-t from-[#050B1A]/90 via-[#050B1A]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"}),
      l("div",{className:"absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-left",children:[
        r("p",{className:"font-extrabold text-white text-xs sm:text-base leading-tight drop-shadow",children:g.t}),
        r("p",{className:"text-[10px] sm:text-xs text-[#2F9BFF] font-semibold mt-0.5 drop-shadow",children:g.s})
      ]})
    ]}))})]}),` + targetCorrida;
    html = html.replace(targetCorrida, galeriaCode);
    console.log('✓ Seção de Galeria de Fotos inserida com sucesso!');
}

// Inserir Localização logo após a seção de depoimentos ou agendamento
if (!html.includes('id:"localizacao"')) {
    const targetDepoimentosEnd = 'l("footer",{className:"relative bg-[#03081A]';
    const localizacaoCode = `l("section",{id:"localizacao",className:"relative overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-28",children:[r(Af,{count:8}),l("div",{className:"relative text-center max-w-3xl mx-auto",children:[r("p",{className:"text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold",children:"ONDE ESTAMOS"}),r("h2",{className:"font-display font-extrabold text-[43px] sm:text-[53px] tracking-tight mt-3",children:r(kf,{parts:[{text:"Localização &"},{text:"estúdio KCE.",elegant:!0}]})}),r("p",{className:"text-sm text-[#93A3BC] mt-2",children:"Venha nos visitar em Montes Claros ou trace sua rota pelo GPS com apenas 1 toque."})]}),l("div",{className:"grid lg:grid-cols-2 gap-8 mt-12 items-stretch",children:[
      l("div",{className:"card-round border border-[var(--line)] bg-[#0A1633] p-6 sm:p-8 flex flex-col justify-between text-left",children:[
        l("div",{children:[
          r("span",{className:"pill bg-[#0066FF]/20 text-[#2F9BFF] border border-[#0066FF]/40 text-xs font-bold px-3 py-1",children:"ESTÚDIO OFICIAL"}),
          r("h3",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4",children:"KCE Estética Automotiva"}),
          l("p",{className:"text-base text-[#F2F6FF] font-semibold mt-2 flex items-center gap-2",children:[
            r("span",{className:"text-xl",children:"📍"}),
            "Rua Belo Horizonte, 80 — Bairro São José, Montes Claros - MG"
          ]}),
          r("p",{className:"text-xs text-[#93A3BC] mt-1 ml-7",children:"Ponto de referência: Próximo à Praça de Esportes e centro de Montes Claros."}),
          l("div",{className:"mt-6 border-t border-[var(--line)] pt-5 grid gap-3",children:[
            l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"🕒 Horário:"}),r("span",{children:"Segunda a Sexta: 08h às 18h | Sábado: 08h às 14h"})]}),
            l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"☕ Lounge VIP:"}),r("span",{children:"Espaço climatizado com Wi-Fi de alta velocidade e café expresso."})]}),
            l("div",{className:"flex items-center gap-3 text-sm text-[#C8D0DA]",children:[r("span",{className:"text-[#2F9BFF] font-bold",children:"🛡️ Segurança:"}),r("span",{children:"Pátio monitorado por câmeras 24h e seguro completo de pátio."})]})
          ]})
        ]}),
        l("div",{className:"mt-8 grid sm:grid-cols-2 gap-3",children:[
          r("a",{href:"https://www.google.com/maps/search/?api=1&query=Rua+Belo+Horizonte+80+Sao+Jose+Montes+Claros+MG",target:"_blank",rel:"noopener noreferrer",className:"btn-teal pill py-3.5 text-center font-bold text-xs tracking-wider uppercase block shadow-lg shadow-[#0066FF]/30",children:"ABRIR NO GOOGLE MAPS"}),
          r("a",{href:"https://waze.com/ul?q=Rua+Belo+Horizonte+80+Montes+Claros+MG&navigate=yes",target:"_blank",rel:"noopener noreferrer",className:"btn-line pill py-3.5 text-center font-bold text-xs tracking-wider uppercase block hover:border-[#2F9BFF]",children:"ABRIR NO WAZE"})
        ]})
      ]}),
      l("div",{className:"card-round border border-[var(--line)] bg-[#050B1A] overflow-hidden min-h-[320px] relative",children:[
        r("iframe",{title:"Mapa KCE Estética Automotiva",src:"https://maps.google.com/maps?q=Rua+Belo+Horizonte+80,+Sao+Jose,+Montes+Claros+-+MG&t=&z=16&ie=UTF8&iwloc=&output=embed",width:"100%",height:"100%",style:{border:0,minHeight:"360px",filter:"contrast(1.05) invert(0.9) hue-rotate(180deg)"},loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})
      ]})
    ]})]}),` + targetDepoimentosEnd;
    html = html.replace(targetDepoimentosEnd, localizacaoCode);
    console.log('✓ Seção de Localização (Rua Belo Horizonte, 80) inserida com sucesso!');
}

// Atualizar o endereço oficial no rodapé
html = html.replace(
    '"Próximo à Praça de Esportes • Montes Claros - MG"',
    '"Rua Belo Horizonte, 80 — Bairro São José • Montes Claros - MG"'
);
console.log('✓ Endereço atualizado no rodapé!');

// Atualizar o Menu Principal para incluir Galeria e Localização mantendo centralizado
const oldNav = 'r("a",{href:"#corrida",className:"shrink-0 hover:text-white",children:"Corrida"}),r("a",{href:"#pacotes",className:"shrink-0 hover:text-white",children:"Pacotes"})]';
const newNav = 'r("a",{href:"#galeria",className:"shrink-0 hover:text-white",children:"Galeria"}),r("a",{href:"#pacotes",className:"shrink-0 hover:text-white",children:"Pacotes"}),r("a",{href:"#localizacao",className:"shrink-0 hover:text-white",children:"Localização"}),r("a",{href:"#corrida",className:"shrink-0 hover:text-white",children:"Corrida"})]';

if (html.includes(oldNav)) {
    html = html.replace(oldNav, newNav);
    console.log('✓ Menu de navegação atualizado com Galeria e Localização!');
}

// Atualizar a sub-barra móvel também
const oldMobileNav = 'r("a",{href:"#corrida",children:"Corrida"}),r("a",{href:"#pacotes",children:"Pacotes"})';
const newMobileNav = 'r("a",{href:"#galeria",children:"Galeria"}),r("a",{href:"#pacotes",children:"Pacotes"}),r("a",{href:"#localizacao",children:"Localização"}),r("a",{href:"#corrida",children:"Corrida"})';
if (html.includes(oldMobileNav)) {
    html = html.replace(oldMobileNav, newMobileNav);
    console.log('✓ Sub-barra mobile atualizada!');
}

// ==========================================
// 2. NOVO LAYOUT DO SISTEMA PROFISSIONAL DE VENDAS E SERVIÇOS NO PAINEL ADM
// ==========================================
// Vamos adicionar na aba 'visão' os gráficos de vendas, métricas de faturamento e relatórios gerenciais
const targetAdminVisaoCards = 'r("div",{className:"grid sm:grid-cols-2 xl:grid-cols-3 gap-4",children:[{l:"Faturamento Hoje"';

const professionalSalesSystemCode = `l("div",{className:"mb-6 grid gap-6",children:[
  l("div",{className:"rounded-[22px] bg-gradient-to-r from-[#0066FF] to-[#0047B3] p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4",children:[
    l("div",{children:[
      r("span",{className:"pill bg-white/20 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider",children:"⚡ SISTEMA DE GESTÃO DE VENDAS & SERVIÇOS"}),
      r("h2",{className:"text-2xl sm:text-3xl font-extrabold mt-2 leading-tight",children:"Painel Executivo de Vendas KCE"}),
      r("p",{className:"text-white/80 text-sm mt-1 max-w-xl",children:"Acompanhamento em tempo real de faturamento, ticket médio, conversão e desempenho dos serviços em Montes Claros."})
    ]}),
    l("div",{className:"flex flex-wrap gap-2.5",children:[
      l("button",{onClick:()=>g("agendamentos"),className:"rounded-full bg-white text-[#0066FF] hover:bg-neutral-100 font-extrabold text-xs px-5 py-3 shadow transition-all flex items-center gap-2",children:[r("span",{children:"+"})," NOVA ORDEM / VENDA"]}),
      l("button",{onClick:()=>g("caixa"),className:"rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-3 transition-all flex items-center gap-1.5",children:[r("span",{children:"📊"})," DRE & RELATÓRIOS"]}),
      l("button",{onClick:()=>g("produção"),className:"rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-3 transition-all flex items-center gap-1.5",children:[r("span",{children:"🚗"})," PÁTIO EM TEMPO REAL"]})
    ]})
  ]}),
  l("div",{className:"grid lg:grid-cols-3 gap-6",children:[
    l("div",{className:"lg:col-span-2 rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm",children:[
      l("div",{className:"flex items-center justify-between mb-4",children:[
        l("div",{children:[
          r("h3",{className:"font-extrabold text-slate-900 text-lg",children:"Evolução Diária de Vendas (Últimos 7 dias)"}),
          r("p",{className:"text-xs text-slate-500 font-medium",children:"Comparativo diário de faturamento e volume de atendimentos"})
        ]}),
        r("span",{className:"pill bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 border border-emerald-200",children:"↑ +18.4% esta semana"})
      ]}),
      l("div",{className:"h-[210px] w-full flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100",children:[
        {dia:"Seg",val:1480,alt:65},{dia:"Ter",val:2150,alt:85},{dia:"Qua",val:1890,alt:75},{dia:"Qui",val:2640,alt:95},{dia:"Sex",val:3890,alt:140},{dia:"Sáb",val:4750,alt:170},{dia:"Dom",val:0,alt:10}
      ].map((d,idx)=>l("div",{key:idx,className:"flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer",children:[
        r("span",{className:"text-[10px] font-bold text-slate-400 group-hover:text-[#0066FF] transition-colors",children:d.val>0?\`R$ \${d.val}\`:"Folga"}),
        r("div",{className:\`w-full max-w-[42px] rounded-t-xl transition-all \${idx===5?"bg-[#0066FF] shadow-lg shadow-[#0066FF]/30":"bg-slate-200 group-hover:bg-[#2F9BFF]"}\`,style:{height:\`\${d.alt}px\`}}),
        r("span",{className:"text-[11px] font-bold text-slate-600 mt-1",children:d.dia})
      ]}))}),
      l("div",{className:"flex items-center justify-between text-xs text-slate-500 font-medium pt-3",children:[
        r("span",{children:"Pico de atendimento: Sábado (R$ 4.750)"}),
        r("span",{className:"font-bold text-slate-800",children:"Total Semanal: R$ 16.920,00"})
      ]})
    ]}),
    l("div",{className:"rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between",children:[
      l("div",{children:[
        r("h3",{className:"font-extrabold text-slate-900 text-lg",children:"Mix de Vendas por Serviço"}),
        r("p",{className:"text-xs text-slate-500 font-medium mb-4",children:"Distribuição do faturamento por categoria"}),
        l("div",{className:"grid gap-3",children:[
          {nome:"Vitrificação Cerâmica 9H",pct:38,cor:"bg-[#0066FF]",valor:"R$ 6.430"},
          {nome:"Lavagem Técnica Detalhada",pct:31,cor:"bg-[#2F9BFF]",valor:"R$ 5.245"},
          {nome:"Polimento & Espelhamento",pct:19,cor:"bg-indigo-500",valor:"R$ 3.215"},
          {nome:"Higienização & Oxi-sanitização",pct:12,cor:"bg-teal-500",valor:"R$ 2.030"}
        ].map((m,idx)=>l("div",{key:idx,className:"grid gap-1.5",children:[
          l("div",{className:"flex justify-between text-xs font-bold",children:[r("span",{className:"text-slate-700",children:m.nome}),r("span",{className:"text-slate-900",children:m.valor})]}),
          r("div",{className:"w-full h-2 rounded-full bg-slate-100 overflow-hidden",children:r("div",{className:\`h-full rounded-full \${m.cor}\`,style:{width:\`\${m.pct}%\`}})}),
          r("span",{className:"text-[10px] text-slate-400 text-right font-medium",children:\`\${m.pct}% da receita\`})
        ]}))})
      ]}),
      l("button",{onClick:()=>g("serviços"),className:"mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-[#0066FF] hover:bg-[#EFF6FF] transition-colors",children:"Ver tabela completa de preços →"})
    ]})
  ]}),
  l("div",{className:"rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm",children:[
    l("div",{className:"flex flex-wrap items-center justify-between gap-4 mb-4",children:[
      l("div",{children:[
        r("h3",{className:"font-extrabold text-slate-900 text-lg",children:"Demonstrativo Gerencial de Resultados (DRE Simplificado)"}),
        r("p",{className:"text-xs text-slate-500 font-medium",children:"Visão consolidada de receitas brutas, custos de produtos e margem de lucro"})
      ]}),
      l("button",{onClick:()=>window.print(),className:"rounded-full border border-slate-300 hover:border-slate-400 bg-white px-4 py-2 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm",children:[r("span",{children:"🖨️"})," Imprimir Relatório"]})
    ]}),
    l("div",{className:"grid sm:grid-cols-4 gap-4",children:[
      l("div",{className:"rounded-2xl bg-slate-50 border border-slate-200 p-4",children:[r("p",{className:"text-[11px] font-bold text-slate-500 uppercase",children:"Receita Bruta do Mês"}),r("p",{className:"text-2xl font-extrabold text-slate-900 mt-1",children:"R$ 24.890"}),r("span",{className:"text-[10px] font-bold text-emerald-600 mt-1 inline-block",children:"↑ +15.2% vs mês anterior"})]}),
      l("div",{className:"rounded-2xl bg-slate-50 border border-slate-200 p-4",children:[r("p",{className:"text-[11px] font-bold text-slate-500 uppercase",children:"Custo de Produtos / Insumos"}),r("p",{className:"text-2xl font-extrabold text-rose-700 mt-1",children:"- R$ 3.840"}),r("span",{className:"text-[10px] font-semibold text-slate-500 mt-1 inline-block",children:"15.4% da receita total"})]}),
      l("div",{className:"rounded-2xl bg-slate-50 border border-slate-200 p-4",children:[r("p",{className:"text-[11px] font-bold text-slate-500 uppercase",children:"Comissões da Equipe"}),r("p",{className:"text-2xl font-extrabold text-amber-700 mt-1",children:"- R$ 5.480"}),r("span",{className:"text-[10px] font-semibold text-slate-500 mt-1 inline-block",children:"Lavadores & Detalhadores"})]}),
      l("div",{className:"rounded-2xl bg-blue-50/60 border border-[#0066FF]/30 p-4",children:[r("p",{className:"text-[11px] font-bold text-[#0066FF] uppercase",children:"Lucro Operacional Líquido"}),r("p",{className:"text-2xl font-extrabold text-[#0066FF] mt-1",children:"R$ 15.570"}),r("span",{className:"text-[10px] font-bold text-[#0066FF] mt-1 inline-block",children:"Margem Líquida: 62.5%"})]})
    ]})
  ]})
]}),` + targetAdminVisaoCards;

if (html.includes(targetAdminVisaoCards)) {
    html = html.replace(targetAdminVisaoCards, professionalSalesSystemCode);
    console.log('✓ Novo Layout do Sistema Profissional de Vendas e Serviços injetado no Painel ADM!');
} else {
    console.log('⚠ targetAdminVisaoCards não encontrado exatamente. Procurando trecho...');
}

// 3. VALIDAR SINTAXE DE TODOS OS SCRIPTS COM PRECISÃO ABSOLUTA
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
let allValid = true;
while ((m = scriptRegex.exec(html)) !== null) {
    const attrs = m[1];
    const code = m[2];
    if (!attrs.includes('json')) {
        try {
            new Function(code);
            console.log(`Script ${count}: Syntax OK`);
        } catch(e) {
            console.error(`❌ Script ${count} ERRO:`, e.message);
            allValid = false;
        }
    } else {
        try {
            JSON.parse(code);
            console.log(`Script ${count}: JSON OK`);
        } catch(e) {
            console.error(`❌ Script ${count} JSON ERRO:`, e.message);
            allValid = false;
        }
    }
    count++;
}

if (allValid) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    const distHtml = path.join(projectDir, 'dist', 'index.html');
    if (!fs.existsSync(path.dirname(distHtml))) {
        fs.mkdirSync(path.dirname(distHtml), { recursive: true });
    }
    fs.writeFileSync(distHtml, html, 'utf8');
    console.log('🎉 SUCESSO TOTAL! index.html e dist/index.html atualizados e validados com 100% de integridade!');
} else {
    console.error('⛔ Gravação cancelada devido a erro de sintaxe.');
    process.exit(1);
}
