/**
 * KCL Gestão Automotiva • Aureon OS
 * Lógica Completa, Reativa e Independente do Painel ADM
 */

// ESTADO GLOBAL DO SISTEMA
let state = {
  isAuth: localStorage.getItem('kcl_admin_logged') === 'true',
  currentTab: 'visao',
  currentMetric: 'faturamento',
  viewMode: 'cards', // 'cards' ou 'table'
  chartInstance: null,
  bookings: JSON.parse(localStorage.getItem('kcl_bookings')) || [
    { id: 1, name: "Marcos Vinicius", phone: "38999123456", vehicle: "Toyota Corolla • Prata", plate: "QNM-2024", service: "Lavagem Detalhada + Cera", price: 180, date: "2026-11-12", time: "09:30", status: "Pronto" },
    { id: 2, name: "Dra. Juliana Prado", phone: "38998765432", vehicle: "Jeep Compass • Preto", plate: "PZX-8910", service: "Vitrificação Cerâmica 9H", price: 1200, date: "2026-11-12", time: "11:00", status: "Em Lavagem" },
    { id: 3, name: "Rodrigo Alencar", phone: "38991223344", vehicle: "Honda Civic G10 • Azul", plate: "RTY-4455", service: "Polimento Técnico & Refino", price: 650, date: "2026-11-12", time: "14:00", status: "Pendente" },
    { id: 4, name: "Amanda Silveira", phone: "38992334455", vehicle: "VW Nivus • Cinza Moonstone", plate: "KCL-2026", service: "Higienização Interna + Couro", price: 350, date: "2026-11-11", time: "10:00", status: "Entregue" },
    { id: 5, name: "Carlos Eduardo", phone: "38993445566", vehicle: "BMW 320i • Branca", plate: "BMW-3200", service: "Tratamento Completo KCL", price: 1500, date: "2026-11-11", time: "15:30", status: "Entregue" }
  ],
  services: [
    { id: 1, name: "Lavagem Técnica Detalhada", price: 120, time: "1h 30m", desc: "Snow foam com pH neutro, luva de microfibra, limpeza de caixas de roda e secagem por ar quente." },
    { id: 2, name: "Polimento Técnico & Refino", price: 650, time: "6h 00m", desc: "Remoção de até 95% dos micro-riscos (swirls), restauração da profundidade da cor e brilho espelhado." },
    { id: 3, name: "Vitrificação Cerâmica 9H", price: 1200, time: "8h 00m", desc: "Proteção de pintura contra raios UV, fezes de pássaros e seiva de árvore por até 3 anos com laudo." },
    { id: 4, name: "Higienização Interna & Couro", price: 350, time: "3h 30m", desc: "Extração por sucção a quente em bancos, carpetes e teto, com hidratação acetinada do couro legítimo." },
    { id: 5, name: "Descontaminação Ferrosa de Rodas", price: 180, time: "1h 00m", desc: "Remoção química de fuligem de freio nas pinças e rodas, com aplicação de selante repelente de sujeira." }
  ],
  transactions: [
    { date: "12/11/2026", type: "entrada", desc: "Vitrificação Compass - Juliana", cat: "Serviço", val: 1200 },
    { date: "12/11/2026", type: "entrada", desc: "Lavagem Detalhada Corolla - Marcos", cat: "Serviço", val: 180 },
    { date: "12/11/2026", type: "saida", desc: "Composições Vonixx & Revelax", cat: "Insumos", val: 450 },
    { date: "11/11/2026", type: "entrada", desc: "Tratamento BMW 320i - Carlos", cat: "Serviço", val: 1500 },
    { date: "11/11/2026", type: "saida", desc: "Conta de Energia CEMIG", cat: "Fixas", val: 680 }
  ]
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initDates();
  renderAll();
});

// AUTENTICAÇÃO
function initAuth() {
  const authScreen = document.getElementById('authScreen');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (state.isAuth) {
    authScreen.classList.add('hidden');
  } else {
    authScreen.classList.remove('hidden');
  }

  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value.trim();

    if ((email === 'admin@kcl.com' || email === 'admin@kce.com') && (pass === 'kcl1234' || pass === 'kce1234' || pass === 'admin123')) {
      state.isAuth = true;
      localStorage.setItem('kcl_admin_logged', 'true');
      authScreen.classList.add('hidden');
      renderAll();
    } else {
      loginError.textContent = 'E-mail ou senha incorretos.';
      loginError.classList.remove('hidden');
    }
  };
}

function logout() {
  state.isAuth = false;
  localStorage.removeItem('kcl_admin_logged');
  document.getElementById('authScreen').classList.remove('hidden');
}

// DEFINIR PERÍODO
function initDates() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const fmt = (d) => d.toISOString().split('T')[0];
  document.getElementById('dateStart').value = fmt(firstDay);
  document.getElementById('dateEnd').value = fmt(today);
}

function applyDateFilter() {
  renderMetrics();
  renderChart();
}

// NAVEGAÇÃO DE ABAS
window.setTab = function(tabName) {
  state.currentTab = tabName;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById('tab-' + tabName)?.classList.remove('hidden');

  // Atualiza classes dos botões desktop
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.className = 'tab-btn px-4 py-2 rounded-xl text-xs font-bold transition text-slate-600 hover:text-slate-900';
  });
  const activeBtn = document.getElementById('tabBtn-' + tabName);
  if (activeBtn) activeBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs font-bold transition bg-white text-blue-600 shadow-sm';

  if (tabName === 'visao') {
    setTimeout(renderChart, 50);
  }
};

// ALTERNÂNCIA DE MÉTRICA NO GRÁFICO (PILLS)
window.setMetricFilter = function(metric) {
  state.currentMetric = metric;
  document.querySelectorAll('.metric-pill').forEach(btn => {
    btn.className = 'metric-pill px-3 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900';
  });
  event.target.className = 'metric-pill px-3 py-1 rounded-lg text-xs font-bold transition bg-white text-blue-600 shadow-sm';
  renderChart();
};

// ALTERNÂNCIA DE MODO DE VISÃO DE VENDAS
window.setViewMode = function(mode) {
  state.viewMode = mode;
  const cards = document.getElementById('vendasCardsView');
  const table = document.getElementById('vendasTableView');
  const btnC = document.getElementById('btnViewCards');
  const btnT = document.getElementById('btnViewTable');

  if (mode === 'cards') {
    cards.classList.remove('hidden');
    table.classList.add('hidden');
    btnC.className = 'px-3 py-1 rounded-lg text-xs font-bold transition bg-white text-slate-900 shadow-sm';
    btnT.className = 'px-3 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900';
  } else {
    cards.classList.add('hidden');
    table.classList.remove('hidden');
    btnT.className = 'px-3 py-1 rounded-lg text-xs font-bold transition bg-white text-slate-900 shadow-sm';
    btnC.className = 'px-3 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900';
  }
};

// RENDERIZAÇÃO GERAL
function renderAll() {
  renderMetrics();
  renderChart();
  renderSales();
  renderBookings();
  renderServices();
  renderTransactions();
}

// MÉTRICAS SUPERIORES (AUREON)
function renderMetrics() {
  const fat = state.bookings.reduce((acc, b) => acc + (b.price || 0), 0);
  const custos = Math.round(fat * 0.22);
  const desp = 1500;
  const lucro = fat - custos;

  const fMoeda = (v) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('statFaturamento').textContent = fMoeda(fat);
  document.getElementById('statCustos').textContent = fMoeda(custos);
  document.getElementById('statDespesas').textContent = fMoeda(desp);
  document.getElementById('statLucroBruto').textContent = fMoeda(lucro);
}

// GRÁFICO MISTO CHART.JS (AUREON SISTEMAS)
function renderChart() {
  const ctx = document.getElementById('aureonChart');
  if (!ctx) return;

  if (state.chartInstance) {
    state.chartInstance.destroy();
  }

  const labels = ['01/11', '03/11', '05/11', '07/11', '09/11', '11/11', '12/11'];
  
  let barData = [850, 1200, 950, 1600, 1400, 1850, 1380];
  let barColor = 'rgba(16, 185, 129, 0.85)'; // Verde padrão Aureon
  let labelName = 'Faturamento (R$)';

  if (state.currentMetric === 'custos') {
    barData = barData.map(v => Math.round(v * 0.25));
    barColor = 'rgba(126, 34, 206, 0.85)'; // Roxo
    labelName = 'Custos Operacionais (R$)';
  } else if (state.currentMetric === 'despesas') {
    barData = [250, 250, 250, 250, 250, 250, 250];
    barColor = 'rgba(225, 29, 72, 0.85)'; // Vermelho
    labelName = 'Despesas Rateadas (R$)';
  } else if (state.currentMetric === 'lucro') {
    barData = barData.map(v => Math.round(v * 0.75));
    barColor = 'rgba(13, 148, 136, 0.85)'; // Teal
    labelName = 'Lucro Bruto (R$)';
  }

  const lineData = [3, 5, 4, 7, 6, 8, 5]; // Veículos atendidos

  state.chartInstance = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Veículos Atendidos',
          data: lineData,
          borderColor: '#0284C7',
          backgroundColor: '#0284C7',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#0284C7',
          pointBorderWidth: 2,
          yAxisID: 'y1',
          tension: 0.3
        },
        {
          type: 'bar',
          label: labelName,
          data: barData,
          backgroundColor: barColor,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { font: { family: "'Plus Jakarta Sans'", size: 11, weight: '700' }, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: '#0F172A',
          titleFont: { family: "'Plus Jakarta Sans'", weight: '800' },
          bodyFont: { family: "'Plus Jakarta Sans'" },
          padding: 10,
          cornerRadius: 10
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' } } },
        y: {
          position: 'left',
          grid: { color: '#F1F5F9' },
          ticks: { font: { size: 10 }, callback: v => 'R$ ' + v }
        },
        y1: {
          position: 'right',
          grid: { display: false },
          ticks: { font: { size: 10 }, stepSize: 2 }
        }
      }
    }
  });
}

// RENDERIZAÇÃO DE VENDAS (CARDS & TABELA)
function renderSales() {
  const cardsContainer = document.getElementById('vendasCardsView');
  const tableContainer = document.getElementById('vendasTableBody');

  cardsContainer.innerHTML = '';
  tableContainer.innerHTML = '';

  state.bookings.forEach(b => {
    // Card
    const card = document.createElement('div');
    card.className = 'p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition space-y-2';
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">${b.date} • ${b.time}</span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-0.5">${b.name}</h4>
          <p class="text-xs text-slate-500 font-medium">${b.vehicle} • <strong class="text-slate-700">${b.plate}</strong></p>
        </div>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Pronto' || b.status === 'Entregue' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}">${b.status}</span>
      </div>
      <div class="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
        <span class="text-slate-600 font-semibold">${b.service}</span>
        <strong class="text-slate-900 font-extrabold">R$ ${b.price.toFixed(2)}</strong>
      </div>
    `;
    cardsContainer.appendChild(card);

    // Linha de Tabela
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition';
    tr.innerHTML = `
      <td class="p-3.5 text-slate-500 font-semibold">${b.date} às ${b.time}</td>
      <td class="p-3.5 font-bold text-slate-900">${b.name}</td>
      <td class="p-3.5 text-slate-600">${b.vehicle} • <strong class="text-slate-800">${b.plate}</strong></td>
      <td class="p-3.5 text-slate-600">${b.service}</td>
      <td class="p-3.5 font-extrabold text-slate-900">R$ ${b.price.toFixed(2)}</td>
      <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Pronto' || b.status === 'Entregue' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}">${b.status}</span></td>
      <td class="p-3.5 text-right">
        <button onclick="sendWhatsappConfirmation('${b.phone}', '${b.name}', '${b.service}', '${b.date}', '${b.time}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition shadow-sm">
          WhatsApp 📲
        </button>
      </td>
    `;
    tableContainer.appendChild(tr);
  });
}

// RENDERIZAÇÃO DE AGENDAMENTOS
function renderBookings() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition';
    tr.innerHTML = `
      <td class="p-3.5 font-semibold text-slate-500">${b.date} • ${b.time}</td>
      <td class="p-3.5">
        <strong class="block text-slate-900">${b.name}</strong>
        <span class="text-slate-400 text-[11px]">${b.phone}</span>
      </td>
      <td class="p-3.5 text-slate-600">${b.vehicle} • <strong>${b.plate}</strong></td>
      <td class="p-3.5 font-medium text-slate-700">${b.service}</td>
      <td class="p-3.5 font-extrabold text-slate-900">R$ ${b.price.toFixed(2)}</td>
      <td class="p-3.5">
        <select onchange="updateBookingStatus(${b.id}, this.value)" class="text-xs bg-slate-100 font-bold rounded-lg px-2 py-1 border border-slate-200 outline-none">
          <option ${b.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
          <option ${b.status === 'Em Lavagem' ? 'selected' : ''}>Em Lavagem</option>
          <option ${b.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
          <option ${b.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
        </select>
      </td>
      <td class="p-3.5 text-right">
        <button onclick="sendWhatsappConfirmation('${b.phone}', '${b.name}', '${b.service}', '${b.date}', '${b.time}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm">
          Confirmar no Zap
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.updateBookingStatus = function(id, status) {
  const item = state.bookings.find(b => b.id === id);
  if (item) {
    item.status = status;
    localStorage.setItem('kcl_bookings', JSON.stringify(state.bookings));
    renderAll();
  }
};

window.sendWhatsappConfirmation = function(phone, name, service, date, time) {
  let cleanPhone = (phone || '').replace(/\D/g, '');
  if (cleanPhone.length === 10 || cleanPhone.length === 11) {
    if (!cleanPhone.startsWith('55')) cleanPhone = '55' + cleanPhone;
  }
  const dFmt = date.split('-').reverse().join('/');
  const msg = encodeURIComponent(`Olá ${name}! Aqui é da KCL Estética Automotiva. ✅\n\nConfirmamos seu agendamento para o serviço *${service}* no dia *${dFmt}* às *${time}*.\n\n📍 Local: Próximo à Praça de Esportes, Montes Claros - MG.\nAguardamos você!`);
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
};

// RENDERIZAÇÃO DE SERVIÇOS
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3';
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="font-extrabold text-base text-slate-900">${s.name}</h3>
        <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">${s.time}</span>
      </div>
      <p class="text-xs text-slate-500 leading-relaxed">${s.desc}</p>
      <div class="pt-3 border-t border-slate-100 flex justify-between items-center">
        <span class="text-xs text-slate-400 font-semibold">Valor do serviço</span>
        <strong class="text-lg font-black text-slate-900">R$ ${s.price.toFixed(2)}</strong>
      </div>
    `;
    grid.appendChild(card);
  });
}

// RENDERIZAÇÃO FINANCEIRA
function renderTransactions() {
  const tbody = document.getElementById('transactionsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.transactions.forEach(t => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition';
    tr.innerHTML = `
      <td class="p-3.5 text-slate-500 font-semibold">${t.date}</td>
      <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${t.type === 'entrada' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">${t.type.toUpperCase()}</span></td>
      <td class="p-3.5 font-bold text-slate-800">${t.desc}</td>
      <td class="p-3.5 text-slate-500 font-medium">${t.cat}</td>
      <td class="p-3.5 text-right font-black ${t.type === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}">
        ${t.type === 'entrada' ? '+ ' : '- '}R$ ${t.val.toFixed(2)}
      </td>
    `;
    tbody.appendChild(tr);
  });
}
