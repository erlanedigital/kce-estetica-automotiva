const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando integração visual do Aureon Sistemas no Painel ADM KCL...');

let html = fs.readFileSync('index.html', 'utf8');

// Localizar onde começa Y==="visão"&&l("div"
const vStart = html.indexOf('Y==="visão"&&l("div",{className:"grid gap-4"');
if (vStart === -1) {
  console.error('Ponto de inserção da visão não encontrado!');
  process.exit(1);
}

// O próximo bloco de aba é Y==="agendamentos"
const vEnd = html.indexOf('Y==="agendamentos"&&', vStart);
if (vEnd === -1) {
  console.error('Fechamento da visão não encontrado!');
  process.exit(1);
}

console.log('Bloco da visão localizado entre', vStart, 'e', vEnd);

// Novo componente Visão Geral no padrão executivo exato do Aureon Sistemas
const aureonDashboard = `Y==="visão"&&l("div",{className:"grid gap-5 font-sans",children:[

  /* 1. BARRA SUPERIOR DE PERÍODO NO ESTILO EXATO DO AUREON */
  l("div",{className:"flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC] border border-slate-300 rounded-[14px] px-4 py-2.5 text-xs text-slate-700 shadow-sm",children:[
    l("div",{className:"flex flex-wrap items-center gap-2",children:[
      r("span",{className:"font-black text-slate-800 tracking-wide",children:"Definir Período"}),
      r("span",{className:"text-slate-400",children:"|"}),
      r("span",{className:"font-bold text-slate-600",children:"De:"}),
      r("input",{type:"date",defaultValue:"2026-05-01",className:"bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 outline-none shadow-sm"}),
      r("span",{className:"font-bold text-slate-600",children:"Até:"}),
      r("input",{type:"date",defaultValue:"2026-05-31",className:"bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 outline-none shadow-sm"}),
      r("button",{className:"rounded bg-[#0066FF] hover:bg-[#0052CC] text-white px-3.5 py-1 font-bold shadow transition active:scale-95",children:"Filtrar"})
    ]}),
    r("span",{className:"text-[11px] text-slate-500 font-medium italic",children:"As informações abaixo são atualizadas em tempo real"})
  ]}),

  /* 2. OS CARDS COLORIDOS SUPERIORES DO AUREON (ROXO, VERDE, VERMELHO, AZUL) */
  l("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[
    // Card Roxo - Custos
    l("div",{className:"rounded-[18px] bg-[#6366F1] text-white p-5 shadow-lg flex items-center justify-between",children:[
      l("div",{children:[
        r("p",{className:"text-xs font-black uppercase tracking-wider text-indigo-100",children:"Custos"}),
        r("p",{className:"text-2xl sm:text-3xl font-black mt-1 tracking-tight",children:"R$ 280.965,03"}),
        r("p",{className:"text-[11px] text-indigo-200 mt-1 font-semibold",children:"Insumos, produtos & fixos"})
      ]}),
      r("span",{className:"text-4xl opacity-80",children:"🪙"})
    ]}),
    // Card Verde - Lucro Bruto
    l("div",{className:"rounded-[18px] bg-[#10B981] text-white p-5 shadow-lg flex items-center justify-between",children:[
      l("div",{children:[
        r("p",{className:"text-xs font-black uppercase tracking-wider text-emerald-100",children:"Lucro Bruto"}),
        r("p",{className:"text-2xl sm:text-3xl font-black mt-1 tracking-tight",children:"R$ 100.200,47"}),
        r("p",{className:"text-[11px] text-emerald-200 mt-1 font-semibold",children:"Margem operacional: 35.6%"})
      ]}),
      r("span",{className:"text-4xl opacity-80",children:"💰"})
    ]}),
    // Card Vermelho - Despesas
    l("div",{className:"rounded-[18px] bg-[#EF4444] text-white p-5 shadow-lg flex items-center justify-between",children:[
      l("div",{children:[
        r("p",{className:"text-xs font-black uppercase tracking-wider text-red-100",children:"Despesas"}),
        r("p",{className:"text-2xl sm:text-3xl font-black mt-1 tracking-tight",children:"R$ 64.120,00"}),
        r("p",{className:"text-[11px] text-red-200 mt-1 font-semibold",children:"Operacionais & manutenção"})
      ]}),
      r("span",{className:"text-4xl opacity-80",children:"📉"})
    ]}),
    // Card Azul - Faturamento Total
    l("div",{className:"rounded-[18px] bg-[#0066FF] text-white p-5 shadow-lg flex items-center justify-between",children:[
      l("div",{children:[
        r("p",{className:"text-xs font-black uppercase tracking-wider text-blue-100",children:"Faturamento"}),
        r("p",{className:"text-2xl sm:text-3xl font-black mt-1 tracking-tight",children:"R$ 381.165,50"}),
        r("p",{className:"text-[11px] text-blue-200 mt-1 font-semibold",children:"Ticket Médio: R$ 185,00"})
      ]}),
      r("span",{className:"text-4xl opacity-80",children:"📈"})
    ]})
  ]}),

  /* 3. SEÇÃO DO GRÁFICO PRINCIPAL COM PILLS DO AUREON SISTEMAS */
  l("div",{className:"rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm",children:[
    // Pills de seleção do tipo de visão do gráfico
    l("div",{className:"flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4",children:[
      l("div",{className:"flex flex-wrap items-center gap-2",children:[
        r("button",{className:"rounded-[8px] bg-[#F97316] text-white font-black text-xs px-4 py-2 shadow transition",children:"Faturamento"}),
        r("button",{className:"rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 transition",children:"Custos"}),
        r("button",{className:"rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 transition",children:"Despesas"}),
        r("button",{className:"rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 transition",children:"Lucro Bruto"}),
        r("button",{className:"rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 transition",children:"Lucro Líquido"})
      ]}),
      l("div",{className:"flex items-center gap-4 text-xs font-bold",children:[
        r("span",{className:"flex items-center gap-1.5 text-emerald-600 font-black",children:[r("span",{className:"h-3 w-3 rounded-full bg-emerald-500 inline-block"}),"● Valores (R$)"]}),
        r("span",{className:"flex items-center gap-1.5 text-blue-600 font-black",children:[r("span",{className:"h-3 w-3 rounded-full bg-blue-500 inline-block"}),"● Quantidades (Veículos)"]})
      ]})
    ]}),

    // Gráfico de Barras Verdes + Linha Azul idêntico à foto da Aureon
    l("div",{className:"relative w-full h-[280px] flex items-end justify-between gap-2.5 pt-8 pb-4 px-2",children:[
      r("div",{className:"absolute inset-x-0 top-12 border-b border-slate-100 border-dashed pointer-events-none"}),
      r("div",{className:"absolute inset-x-0 top-28 border-b border-slate-100 border-dashed pointer-events-none"}),
      r("div",{className:"absolute inset-x-0 top-44 border-b border-slate-100 border-dashed pointer-events-none"}),

      [
        {m:"Jan",val:"3.2k",qtd:120,h:45},
        {m:"Fev",val:"4.8k",qtd:180,h:60},
        {m:"Mar",val:"8.4k",qtd:4326,h:85,badge:"4326"},
        {m:"Abr",val:"12.6k",qtd:7646,h:100,badge:"7646"},
        {m:"Mai",val:"9.1k",qtd:3890,h:75},
        {m:"Jun",val:"4.2k",qtd:1053,h:50,badge:"1053"},
        {m:"Jul",val:"3.8k",qtd:950,h:40},
        {m:"Ago",val:"4.1k",qtd:1100,h:42},
        {m:"Set",val:"5.3k",qtd:1400,h:55},
        {m:"Out",val:"7.8k",qtd:2100,h:70},
        {m:"Nov",val:"10.4k",qtd:3200,h:90},
        {m:"Dez",val:"14.8k",qtd:4900,h:100}
      ].map((item,idx)=>l("div",{key:idx,className:"flex-1 flex flex-col items-center h-full justify-end relative group",children:[
        item.badge&&r("span",{className:"absolute -top-3 rounded bg-[#0066FF] text-white text-[10px] font-black px-2 py-0.5 shadow-md",children:item.badge}),
        r("div",{style:{height:item.h+"%"},className:"w-full max-w-[42px] rounded-t-[6px] bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-110 transition-all shadow-sm"}),
        r("span",{className:"text-[11px] font-bold text-slate-600 mt-2",children:item.m})
      ]}))
    ]})
  ]}),

  /* 4. SEÇÃO DE VENDAS: ALTERNÂNCIA ENTRE CARDS E TABELA (REQUISITO EXPLÍCITO AUREON) */
  l("div",{className:"rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm",children:[
    l("div",{className:"flex flex-wrap items-center justify-between gap-4 mb-5",children:[
      l("div",{children:[
        r("h3",{className:"text-lg font-black text-slate-900",children:"Gestão de Vendas & Ordens de Serviço"}),
        r("p",{className:"text-xs text-slate-500 font-medium",children:"Acompanhe as vendas de hoje, de ontem e controle o que falta receber."})
      ]}),
      l("div",{className:"flex items-center gap-2",children:[
        r("button",{onClick:()=>{const c=document.getElementById('kcl-sales-cards');const t=document.getElementById('kcl-sales-table');if(c&&t){c.style.display='grid';t.style.display='none';}},className:"rounded-lg border border-slate-300 hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition",children:[r("span",{children:"🗂️"})," Ver em Cards"]}),
        r("button",{onClick:()=>{const c=document.getElementById('kcl-sales-cards');const t=document.getElementById('kcl-sales-table');if(c&&t){c.style.display='none';t.style.display='block';}},className:"rounded-lg bg-[#0066FF] text-white px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow transition",children:[r("span",{children:"📋"})," Ver em Tabela"]})
      ]})
    ]}),

    // Visualização em CARDS (Vendas de Hoje / Vendas de Ontem)
    l("div",{id:"kcl-sales-cards",className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:[
      {title:"Vendas de Hoje",client:"Marcos Vinícius",service:"Vitrificação 9H + Polimento",val:"R$ 1.450,00",pay:"PIX (Recebido)",status:"Finalizado",badge:"bg-emerald-100 text-emerald-800"},
      {title:"Vendas de Hoje",client:"Ana Clara Santos",service:"Lavagem Técnica Detalhada",val:"R$ 180,00",pay:"Cartão Crédito (1x)",status:"Finalizado",badge:"bg-emerald-100 text-emerald-800"},
      {title:"Vendas de Hoje",client:"Rodrigo Silveira",service:"Higienização Interna & Couro",val:"R$ 380,00",pay:"A Receber",status:"Em Andamento",badge:"bg-amber-100 text-amber-800"},
      {title:"Vendas de Ontem",client:"Carlos Eduardo",service:"Descontaminação Ferrosa + Cera",val:"R$ 290,00",pay:"PIX (Recebido)",status:"Entregue",badge:"bg-blue-100 text-blue-800"},
      {title:"Vendas de Ontem",client:"Luciana Duarte",service:"Polimento Comercial Refino",val:"R$ 650,00",pay:"Cartão Débito",status:"Entregue",badge:"bg-blue-100 text-blue-800"},
      {title:"Vendas de Ontem",client:"Transportadora Norte",service:"Combo 3 Veículos Frotista",val:"R$ 980,00",pay:"Boleto (Falta Receber)",status:"Faturado",badge:"bg-purple-100 text-purple-800"}
    ].map((sale,idx)=>l("div",{key:idx,className:"rounded-[16px] border border-slate-200 bg-slate-50/70 p-4 hover:border-[#0066FF] transition-all shadow-sm",children:[
      l("div",{className:"flex justify-between items-center mb-2",children:[
        r("span",{className:"text-[11px] font-black text-slate-500 uppercase",children:sale.title}),
        r("span",{className:\`text-[10px] font-extrabold px-2 py-0.5 rounded-full \${sale.badge}\`,children:sale.status})
      ]}),
      r("h4",{className:"font-black text-slate-900 text-base",children:sale.client}),
      r("p",{className:"text-xs text-slate-600 mt-0.5",children:sale.service}),
      l("div",{className:"mt-3 pt-3 border-t border-slate-200 flex justify-between items-center",children:[
        l("div",{children:[
          r("p",{className:"text-[10px] text-slate-400 font-bold",children:"FORMA DE PAGAMENTO"}),
          r("p",{className:"text-xs font-extrabold text-slate-700",children:sale.pay})
        ]}),
        r("span",{className:"text-lg font-black text-[#0066FF]",children:sale.val})
      ]})
    ]}))}),

    // Visualização em TABELA
    l("div",{id:"kcl-sales-table",style:{display:"none"},className:"overflow-x-auto",children:[
      l("table",{className:"w-full text-left text-xs",children:[
        l("thead",{className:"bg-slate-100 text-slate-700 font-bold uppercase",children:l("tr",{children:[
          r("th",{className:"p-3",children:"Período"}),
          r("th",{className:"p-3",children:"Cliente"}),
          r("th",{className:"p-3",children:"Serviço"}),
          r("th",{className:"p-3",children:"Valor"}),
          r("th",{className:"p-3",children:"Pagamento"}),
          r("th",{className:"p-3",children:"Status"})
        ]})}),
        l("tbody",{className:"divide-y divide-slate-100 font-medium",children:[
          {dia:"Hoje",client:"Marcos Vinícius",service:"Vitrificação 9H + Polimento",val:"R$ 1.450,00",pay:"PIX",status:"Concluído"},
          {dia:"Hoje",client:"Ana Clara Santos",service:"Lavagem Técnica Detalhada",val:"R$ 180,00",pay:"Cartão",status:"Concluído"},
          {dia:"Hoje",client:"Rodrigo Silveira",service:"Higienização Interna",val:"R$ 380,00",pay:"A Receber",status:"Em Execução"},
          {dia:"Ontem",client:"Carlos Eduardo",service:"Descontaminação Ferrosa",val:"R$ 290,00",pay:"PIX",status:"Entregue"},
          {dia:"Ontem",client:"Luciana Duarte",service:"Polimento Comercial",val:"R$ 650,00",pay:"Débito",status:"Entregue"}
        ].map((row,i)=>l("tr",{key:i,className:"hover:bg-slate-50",children:[
          r("td",{className:"p-3 font-bold text-slate-800",children:row.dia}),
          r("td",{className:"p-3 font-semibold",children:row.client}),
          r("td",{className:"p-3 text-slate-600",children:row.service}),
          r("td",{className:"p-3 font-black text-emerald-600",children:row.val}),
          r("td",{className:"p-3",children:row.pay}),
          r("td",{className:"p-3 font-bold text-[#0066FF]",children:row.status})
        ]}))})
      ]})
    ]})
  ]}),

  /* 5. CARDS DOS PROFISSIONAIS / SÓCIOS RIGOROSAMENTE ALINHADOS */
  l("div",{className:"rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm",children:[
    r("h3",{className:"text-base font-black text-slate-900 mb-1",children:"Equipe & Produtividade no Pátio"}),
    r("p",{className:"text-xs text-slate-500 mb-4",children:"Acompanhamento de tarefas e ordens distribuídas por profissional."}),
    l("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[
      {name:"Cadu",role:"Especialista em Polimento & Vitrificação",done:12,pending:2},
      {name:"Kayan",role:"Responsável Técnico & Higienização Detalhada",done:15,pending:1},
      {name:"Luis",role:"Gestão Operacional, Pátio & Qualidade",done:18,pending:0}
    ].map((partner,i)=>l("div",{key:i,className:"rounded-[16px] border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between h-full hover:border-[#0066FF] transition-all shadow-sm",children:[
      l("div",{className:"flex items-center gap-3 mb-3",children:[
        r("span",{className:"h-10 w-10 rounded-full bg-[#0066FF] text-white font-black grid place-items-center text-sm shrink-0",children:partner.name[0]}),
        l("div",{className:"min-w-0",children:[
          r("h4",{className:"font-black text-slate-900 text-sm truncate",children:partner.name}),
          r("p",{className:"text-[11px] text-slate-500 font-medium truncate",children:partner.role})
        ]})
      ]}),
      l("div",{className:"pt-3 border-t border-slate-200 flex items-center justify-between text-xs",children:[
        r("span",{className:"font-bold text-emerald-600",children:\`✓ \${partner.done} concluídos\`}),
        r("span",{className:\`font-bold \${partner.pending>0?"text-amber-600":"text-slate-400"}\`,children:\`⏳ \${partner.pending} na fila\`})
      ]})
    ]}))})
  ]})

]}),\n`;

// Substituir o bloco antigo pelo novo
html = html.slice(0, vStart) + aureonDashboard + html.slice(vEnd);
console.log('Visão Geral do Aureon Sistemas integrada com sucesso no HTML!');

// Salvar no index.html e dist/index.html
fs.writeFileSync('index.html', html, 'utf8');
fs.copyFileSync('index.html', 'dist/index.html');
console.log('index.html e dist/index.html sincronizados.');

// Deploy Cloudflare
console.log('Publicando via wrangler deploy...');
const deployOut = execSync('cmd /c "npx wrangler deploy"', { encoding: 'utf8' });
console.log(deployOut);

// Git commit & push
console.log('Enviando para o GitHub...');
execSync('git add index.html dist/index.html');
execSync('git commit -m "feat: complete aureon sistemas dashboard integration in kcl admin panel"');
execSync('git push origin main');
console.log('Git push finalizado com sucesso!');
