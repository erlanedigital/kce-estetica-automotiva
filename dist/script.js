/**
 * KCE Estética Automotiva - Lava-jato Premium Montes Claros - MG
 * Script Principal: SPA Reativa, Autoagendamento, Painel ERP, Minigame KCE GP e LocalStorage
 */

// ==================== 1. BANCO DE DADOS LOCAL (LOCALSTORAGE) ====================
const DB_PREFIX = 'kce_data_';

const initialServices = [
  { id: 'svc-1', name: 'Lavagem Técnica', price: 89, time: '60 min', tag: 'MAIS PEDIDO', desc: 'Espuma, dois baldes e luva de microfibra. Limpeza profunda sem arranhões.', active: true },
  { id: 'svc-2', name: 'Lavagem Premium com Espuma', price: 129, time: '90 min', tag: 'PREMIUM', desc: 'Espuma densa Snow Foam, luva de cordeiro e aplicação de Cera Protetora SiO2.', active: true },
  { id: 'svc-3', name: 'Higienização Completa', price: 249, time: '2 a 3 horas', tag: 'RECOMENDADO', desc: 'Aspiração profunda, vapor quente desinfetante, bancos, teto, carpetes e revitalização UV.', active: true },
  { id: 'svc-4', name: 'Polimento Técnico', price: 499, time: '4 a 6 horas', tag: 'SIGNATURE', desc: 'Medição de verniz, corte, refino e lustro. Eliminação de micro riscos e brilho espelhado.', active: true },
  { id: 'svc-5', name: 'Vitrificação Cerâmica 9H', price: 899, time: '1 a 2 dias', tag: 'ALTA PROTEÇÃO', desc: 'Camada de coating cerâmico 9H com extrema repelência a água e proteção por até 3 anos.', active: true },
  { id: 'svc-6', name: 'Rodas & Pneus', price: 89, time: '60 min', tag: 'ESPECIALIDADE', desc: 'Descontaminação ferrosa pesada de pinças e rodas, com pretinho de longa duração.', active: true }
];

const initialBookings = [
  {
    id: 'KCE-101',
    name: 'Guilherme Almeida',
    phone: '(38) 99912-3456',
    service: 'Higienização Completa',
    carType: 'SUV / Crossover',
    vehicle: 'Toyota Corolla Cross • Prata',
    plate: 'ABC-1D23',
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    price: 249,
    status: 'Agendado', // Agendado, Em Lavagem, Pronto, Entregue, Pendente Aprovação
    coupon: 'KCE10',
    createdAt: new Date().toISOString()
  },
  {
    id: 'KCE-102',
    name: 'Mariana Castro',
    phone: '(38) 99876-5432',
    service: 'Lavagem Premium com Espuma',
    carType: 'Sedan / Médio',
    vehicle: 'Honda Civic • Preto',
    plate: 'KCE-7890',
    date: new Date().toISOString().split('T')[0],
    time: '13:30',
    price: 129,
    status: 'Em Lavagem',
    coupon: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'KCE-103',
    name: 'Lucas Ferreira',
    phone: '(38) 99123-9988',
    service: 'Higienização Completa',
    carType: 'Hatch / Pequeno',
    vehicle: 'VW Polo • Cinza',
    plate: 'MOC-4B52',
    date: new Date().toISOString().split('T')[0],
    time: '15:00',
    price: 249,
    status: 'Pendente Aprovação', // Solicitação do site aguardando aceite do sócio
    coupon: 'KCE15',
    createdAt: new Date().toISOString()
  }
];

const initialStock = [
  { name: 'Shampoo Snow Foam pH Neutro', qty: 15, unit: 'L', min: 5 },
  { name: 'Cera Líquida de Carnaúba & SiO2', qty: 6, unit: 'L', min: 4 },
  { name: 'Composto Polidor Corte Pesado', qty: 4, unit: 'Frascos', min: 2 },
  { name: 'Flanelas de Microfibra 40x40', qty: 28, unit: 'un', min: 10 },
  { name: 'Descontaminante Ferroso Rodas', qty: 8, unit: 'L', min: 3 },
  { name: 'Vitrificador Cerâmico 9H 50ml', qty: 3, unit: 'Kits', min: 2 }
];

const initialPartners = [
  { name: 'Luiz (Operação & Pátio)', prolabore: 2500, share: 33.33 },
  { name: 'Sócio 2 (Comercial & Clientes)', prolabore: 2500, share: 33.33 },
  { name: 'Sócio 3 (Financeiro & Insumos)', prolabore: 2500, share: 33.34 }
];

// Helper Storage
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(DB_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Inicializar Dados se vazios
let services = getStorage('services', initialServices);
let bookings = getStorage('bookings', initialBookings);
let stock = getStorage('stock', initialStock);
let partners = getStorage('partners', initialPartners);
let scores = getStorage('scores', [
  { name: 'Piloto KCE', score: 320, laps: 4, drops: 18, coupon: 'KCE15' },
  { name: 'Marcos MOC', score: 240, laps: 3, drops: 12, coupon: 'KCE10' },
  { name: 'Carla Silva', score: 160, laps: 2, drops: 8, coupon: 'KCE10' }
]);

// Estado Local
let selectedServiceForBooking = 'Higienização Completa';
let selectedCarTypeForBooking = 'SUV / Crossover';
let currentAdminTab = 'visao';
let loginAttempts = Number(localStorage.getItem('kce_login_attempts') || 0);
let loginLockedUntil = Number(localStorage.getItem('kce_login_locked') || 0);

// ==================== 2. NOTIFICAÇÕES (TOASTS) ====================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-[#0066FF] border-blue-400' : 'bg-red-600 border-red-400';
  toast.className = `${bg} text-white px-5 py-3 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==================== 3. MODAL DE AUTOAGENDAMENTO DO CLIENTE ====================
window.openBookingModal = function(preselectedService = null) {
  const modal = document.getElementById('bookingModal');
  const successBox = document.getElementById('bookingSuccessBox');
  const form = document.getElementById('bookingForm');
  
  if (!modal || !form) return;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  successBox.classList.add('hidden');
  form.classList.remove('hidden');

  // Renderizar opções de serviços
  const listContainer = document.getElementById('bookingServiceList');
  if (listContainer) {
    listContainer.innerHTML = services.map(s => {
      const isSelected = preselectedService ? s.name === preselectedService : s.name === selectedServiceForBooking;
      if (isSelected) selectedServiceForBooking = s.name;
      return `
        <label class="service-radio-item p-3 rounded-2xl border ${isSelected ? 'border-[#00E5FF] bg-[#0066FF]/20' : 'border-white/10 bg-white/5'} flex items-center justify-between cursor-pointer hover:border-[#0066FF] transition-all">
          <div class="flex items-center gap-2.5">
            <input type="radio" name="selectedSvc" value="${escapeHTML(s.name)}" ${isSelected ? 'checked' : ''} 
                   onchange="window.selectServiceRadio('${escapeHTML(s.name)}')" class="accent-[#00E5FF]">
            <div>
              <p class="text-xs font-bold text-white">${escapeHTML(s.name)}</p>
              <p class="text-[10px] text-slate-400">${escapeHTML(s.time)}</p>
            </div>
          </div>
          <span class="text-xs font-black text-[#00E5FF]">R$ ${s.price}</span>
        </label>
      `;
    }).join('');
  }

  // Set default date to today or tomorrow
  const dateInput = document.getElementById('bookingDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  if (window.lucide) window.lucide.createIcons();
};

window.closeBookingModal = function() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
};

window.selectServiceRadio = function(svcName) {
  selectedServiceForBooking = svcName;
  document.querySelectorAll('.service-radio-item').forEach(item => {
    const radio = item.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      item.classList.add('border-[#00E5FF]', 'bg-[#0066FF]/20');
      item.classList.remove('border-white/10', 'bg-white/5');
    } else {
      item.classList.remove('border-[#00E5FF]', 'bg-[#0066FF]/20');
      item.classList.add('border-white/10', 'bg-white/5');
    }
  });
};

window.selectCarType = function(type) {
  selectedCarTypeForBooking = type;
  document.querySelectorAll('.car-type-btn').forEach(btn => {
    if (btn.innerText.includes(type.split(' ')[0])) {
      btn.className = 'car-type-btn p-2.5 rounded-2xl border-2 border-[#00E5FF] bg-[#0066FF]/20 text-center text-xs font-bold cursor-pointer';
    } else {
      btn.className = 'car-type-btn p-2.5 rounded-2xl border border-white/15 bg-white/5 hover:border-[#0066FF] text-center text-xs font-semibold cursor-pointer';
    }
  });
};

// Envio do Formulário de Autoagendamento
window.handleBookingSubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById('bookingClientName').value.trim();
  const phone = document.getElementById('bookingClientPhone').value.trim();
  const vehicle = document.getElementById('bookingClientVehicle').value.trim() || `${selectedCarTypeForBooking}`;
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const coupon = document.getElementById('bookingClientCoupon').value.trim().toUpperCase();

  if (!name || !phone || !date || !time) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Preço base do serviço
  const serviceObj = services.find(s => s.name === selectedServiceForBooking);
  let finalPrice = serviceObj ? serviceObj.price : 129;
  if (coupon === 'KCE15') finalPrice = Math.round(finalPrice * 0.85);
  else if (coupon === 'KCE10') finalPrice = Math.round(finalPrice * 0.90);
  else if (coupon === 'KCE5') finalPrice = Math.round(finalPrice * 0.95);

  const newBooking = {
    id: `KCE-${Date.now().toString().slice(-4)}`,
    name,
    phone,
    service: selectedServiceForBooking,
    carType: selectedCarTypeForBooking,
    vehicle,
    plate: vehicle.includes('•') ? vehicle.split('•')[1].trim() : 'A confirmar',
    date,
    time,
    price: finalPrice,
    status: 'Pendente Aprovação', // Vai direto para o sócio aceitar
    coupon,
    createdAt: new Date().toISOString()
  };

  // Salvar no banco
  bookings.unshift(newBooking);
  setStorage('bookings', bookings);

  // Atualizar visual do modal de sucesso
  document.getElementById('bookingForm').classList.add('hidden');
  const successBox = document.getElementById('bookingSuccessBox');
  successBox.classList.remove('hidden');

  document.getElementById('bookedServiceSummary').innerText = newBooking.service;
  document.getElementById('bookedDateSummary').innerText = `${formatDateBR(date)} às ${time}`;

  // Link para mandar cópia no WhatsApp oficial
  const msgWhatsapp = encodeURIComponent(
    `Olá KCE Estética Automotiva! 👋 Acabei de fazer um autoagendamento pelo site:\n\n` +
    `👤 Cliente: ${name}\n` +
    `🚗 Veículo: ${vehicle}\n` +
    `✨ Serviço: ${selectedServiceForBooking}\n` +
    `📅 Data/Hora: ${formatDateBR(date)} às ${time}\n` +
    (coupon ? `🎟️ Cupom: ${coupon} (R$ ${finalPrice})\n` : '') +
    `\nAguardando a confirmação de vocês! Obrigado.`
  );
  document.getElementById('btnSendWhatsappCopy').href = `https://wa.me/5538999990000?text=${msgWhatsapp}`;

  updatePendingBadge();
  showToast(`Solicitação de ${name} enviada! Notificando equipe KCE.`);
};

// ==================== 4. PAINEL ADMIN: APROVAÇÃO DE AGENDAMENTO (SOLICITADO) ====================
// Botão para o Sócio Aceitar a Solicitação do Cliente
window.acceptBooking = function(bookingId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  // 1. Move para a agenda oficial
  booking.status = 'Agendado';
  setStorage('bookings', bookings);

  // 2. Monta mensagem oficial de confirmação com localização na Praça de Esportes
  const confirmMsg = encodeURIComponent(
    `Olá ${booking.name}! 👋\n\n` +
    `Aqui é da equipe da *KCE Estética Automotiva*!\n` +
    `Seu agendamento foi *CONFIRMADO* com sucesso em nossa agenda oficial do pátio: ✅\n\n` +
    `✨ *Serviço:* ${booking.service}\n` +
    `🚗 *Veículo:* ${booking.vehicle}\n` +
    `📅 *Data:* ${formatDateBR(booking.date)}\n` +
    `⏰ *Horário:* ${booking.time}\n` +
    `💰 *Valor:* R$ ${booking.price}\n\n` +
    `📍 *Localização:* Região Central, bem próximo à Praça de Esportes de Montes Claros - MG.\n` +
    `Como chegar: https://maps.google.com/?q=Praca+de+Esportes+Montes+Claros+MG\n\n` +
    `Qualquer dúvida ou ajuste, estamos à disposição. Te aguardamos com o padrão KCE!`
  );

  // 3. Limpa caracteres do telefone e abre WhatsApp Web/App
  const cleanPhone = booking.phone.replace(/\D/g, '');
  const phoneFormatted = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${phoneFormatted}?text=${confirmMsg}`;

  // Abre o WhatsApp para envio imediato ao cliente
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  // Atualiza painel
  updatePendingBadge();
  renderAdminTabContent();
  showToast(`Agendamento de ${booking.name} confirmado e WhatsApp aberto!`);
};

// Alterar Status no Pátio (Kanban)
window.updateBookingStatus = function(bookingId, newStatus) {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  booking.status = newStatus;
  setStorage('bookings', bookings);

  if (newStatus === 'Pronto') {
    // Sugerir aviso de carro pronto no WhatsApp
    if (confirm(`O veículo de ${booking.name} está PRONTO! Deseja enviar aviso de retirada no WhatsApp?`)) {
      window.notifyCarReady(bookingId);
    }
  }

  renderAdminTabContent();
  showToast(`Status atualizado para: ${newStatus}`);
};

// Notificar Carro Pronto
window.notifyCarReady = function(bookingId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const msg = encodeURIComponent(
    `Olá ${booking.name}! 🚗✨\n\n` +
    `Seu veículo (*${booking.vehicle}*) já está *PRONTO* e impecável aqui na KCE Estética Automotiva!\n\n` +
    `Pode vir retirar quando quiser. Estamos funcionando até as 18h próximo à Praça de Esportes.\n` +
    `Aguardamos você!`
  );

  const cleanPhone = booking.phone.replace(/\D/g, '');
  const phoneFormatted = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
  window.open(`https://wa.me/${phoneFormatted}?text=${msg}`, '_blank');
};

// Contador de Novas Solicitações
function updatePendingBadge() {
  const pending = bookings.filter(b => b.status === 'Pendente Aprovação').length;
  const badge = document.getElementById('pendingBadgeCount');
  if (badge) {
    badge.innerText = pending;
    if (pending > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// ==================== 5. AUTENTICAÇÃO DO PAINEL ADMIN ====================
window.openAdminLoginModal = function() {
  const modal = document.getElementById('adminLoginModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeAdminLoginModal = function() {
  const modal = document.getElementById('adminLoginModal');
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
};

window.togglePasswordVisibility = function() {
  const input = document.getElementById('adminPassword');
  if (input) input.type = input.type === 'password' ? 'text' : 'password';
};

window.handleAdminLogin = function(e) {
  e.preventDefault();

  const now = Date.now();
  if (now < loginLockedUntil) {
    const mins = Math.ceil((loginLockedUntil - now) / 60000);
    showLoginError(`Painel bloqueado por segurança. Tente novamente em ${mins} minuto(s).`);
    return;
  }

  const email = document.getElementById('adminEmail').value.trim();
  const pass = document.getElementById('adminPassword').value.trim();

  // Credenciais seguras
  if (email === 'admin@kce.com' && pass === 'kce1234') {
    loginAttempts = 0;
    localStorage.removeItem('kce_login_attempts');
    localStorage.removeItem('kce_login_locked');
    
    closeAdminLoginModal();
    openAdminPanel();
    showToast('Login realizado com sucesso! Bem-vindo à KCE.');
  } else {
    loginAttempts++;
    localStorage.setItem('kce_login_attempts', loginAttempts);

    if (loginAttempts >= 5) {
      loginLockedUntil = now + (15 * 60 * 1000);
      localStorage.setItem('kce_login_locked', loginLockedUntil);
      showLoginError('5 tentativas incorretas. Painel bloqueado por 15 minutos.');
    } else {
      showLoginError(`Senha incorreta. Tentativa ${loginAttempts} de 5.`);
    }
  }
};

function showLoginError(msg) {
  const errBox = document.getElementById('adminLoginError');
  if (errBox) {
    errBox.innerText = msg;
    errBox.classList.remove('hidden');
  }
}

window.openAdminPanel = function() {
  const shell = document.getElementById('adminPanelShell');
  if (shell) {
    shell.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updatePendingBadge();
    renderAdminTabContent();
  }
};

window.closeAdminPanel = function() {
  const shell = document.getElementById('adminPanelShell');
  if (shell) {
    shell.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// Alternar Abas do Painel
window.switchAdminTab = function(tabName) {
  currentAdminTab = tabName;

  // Atualizar visual dos botões
  document.querySelectorAll('[id^="tab-btn-"]').forEach(btn => {
    btn.classList.remove('admin-nav-active');
  });

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('admin-nav-active');

  renderAdminTabContent();
};

// ==================== 6. RENDERIZAÇÃO DOS MÓDULOS DO PAINEL ====================
function renderAdminTabContent() {
  const container = document.getElementById('adminTabContent');
  const title = document.getElementById('adminCurrentTabTitle');
  const sub = document.getElementById('adminCurrentTabSub');
  if (!container) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === todayStr);
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.price || 0), 0);

  // Atualiza mini cards do topo da sidebar
  const revEl = document.getElementById('adminTodayTotal');
  const carsEl = document.getElementById('adminTodayCars');
  if (revEl) revEl.innerText = formatMoney(todayRevenue);
  if (carsEl) carsEl.innerText = `${todayBookings.length} veículo(s) agendados hoje`;

  // Render por aba
  switch (currentAdminTab) {
    case 'solicitacoes':
      title.innerText = 'Central de Novas Solicitações';
      sub.innerText = 'Solicitações de clientes feitas pelo site aguardando confirmação do sócio';
      renderSolicitacoesTab(container);
      break;

    case 'visao':
      title.innerText = 'Visão Geral & KPIs';
      sub.innerText = 'Painel executivo com faturamento diário, ocupação do pátio e metas';
      renderVisaoTab(container, todayRevenue, todayBookings);
      break;

    case 'patio':
      title.innerText = 'Pátio / Kanban de Produção';
      sub.innerText = 'Acompanhamento do fluxo de lavagem e controle de tempo real';
      renderPatioTab(container);
      break;

    case 'agendamentos':
      title.innerText = 'Agenda Completa de Clientes';
      sub.innerText = 'Visualização diária, semanal e filtro de agendamentos';
      renderAgendamentosTab(container);
      break;

    case 'ordens':
      title.innerText = 'Ordem de Serviço (OS) & Avarias 360°';
      sub.innerText = 'Checklist de entrada para proteger o estabelecimento de reclamações';
      renderOrdensTab(container);
      break;

    case 'socios':
      title.innerText = 'Gestão — 3 Sócios KCE';
      sub.innerText = 'Divisão igualitária de lucros, pró-labore, custos operacionais e DRE';
      renderSociosTab(container);
      break;

    case 'caixa':
      title.innerText = 'Fluxo de Caixa & DRE';
      sub.innerText = 'Entradas Pix, Cartão, Dinheiro e controle diário';
      renderCaixaTab(container);
      break;

    case 'clientes':
      title.innerText = 'Clientes & Veículos (CRM)';
      sub.innerText = 'Cadastro, histórico de lavagens e placa dos clientes';
      renderClientesTab(container);
      break;

    case 'estoque':
      title.innerText = 'Estoque de Insumos & Produtos';
      sub.innerText = 'Shampoos, ceras, compostos e alerta de reposição';
      renderEstoqueTab(container);
      break;

    case 'whatsapp':
      title.innerText = 'WhatsApp & Pós-Venda Automático';
      sub.innerText = 'Disparo de mensagens formatadas com 1 clique';
      renderWhatsappTab(container);
      break;

    case 'tv':
      title.innerText = 'Painel de TV (Recepção / Pátio)';
      sub.innerText = 'Modo tela cheia com carros em lavagem para a recepção';
      renderTvTab(container);
      break;

    case 'configuracoes':
      title.innerText = 'Configurações & Backup de Dados';
      sub.innerText = 'Dados cadastrais, segurança e exportação completa em JSON';
      renderConfiguracoesTab(container);
      break;

    default:
      renderVisaoTab(container, todayRevenue, todayBookings);
  }

  if (window.lucide) window.lucide.createIcons();
}

// 6.1 Aba Novas Solicitações
function renderSolicitacoesTab(container) {
  const pendings = bookings.filter(b => b.status === 'Pendente Aprovação');

  if (pendings.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center rounded-3xl bg-white border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="check-check" class="w-8 h-8"></i>
        </div>
        <h4 class="text-xl font-bold text-slate-800">Tudo em dia!</h4>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Nenhuma nova solicitação pendente no momento. Assim que um cliente agendar no site, ele aparecerá aqui com aviso sonoro.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-800">
        <span class="font-bold flex items-center gap-2">
          <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i>
          Você tem ${pendings.length} solicitação(ões) aguardando aceite.
        </span>
        <span>Clique em "Aceitar" para adicionar à agenda e enviar o WhatsApp de confirmação.</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${pendings.map(p => `
          <div class="p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-start justify-between">
                <div>
                  <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">NOVO PEDIDO DO SITE</span>
                  <h4 class="text-lg font-black text-slate-900 mt-2">${escapeHTML(p.name)}</h4>
                  <p class="text-xs text-slate-500 font-semibold">${escapeHTML(p.phone)}</p>
                </div>
                <span class="text-xl font-black text-[#0066FF]">R$ ${p.price}</span>
              </div>

              <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p><b>✨ Serviço:</b> <span class="text-slate-800 font-bold">${escapeHTML(p.service)}</span></p>
                <p><b>🚗 Veículo:</b> ${escapeHTML(p.vehicle)} (${escapeHTML(p.carType)})</p>
                <p><b>📅 Data Solicitada:</b> ${formatDateBR(p.date)} às <b>${escapeHTML(p.time)}</b></p>
                ${p.coupon ? `<p><b>🎟️ Cupom KCE:</b> <span class="text-amber-600 font-bold">${escapeHTML(p.coupon)}</span></p>` : ''}
              </div>
            </div>

            <div class="flex gap-2.5 pt-2">
              <button onclick="window.acceptBooking('${p.id}')" 
                      class="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
                <i data-lucide="check-circle" class="w-4 h-4"></i> Aceitar & Confirmar no WhatsApp
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6.2 Aba Visão Geral
function renderVisaoTab(container, revenue, todayList) {
  const pendingCount = bookings.filter(b => b.status === 'Pendente Aprovação').length;

  container.innerHTML = `
    <div class="space-y-8">
      
      <!-- Alerta de Solicitações Pendentes -->
      ${pendingCount > 0 ? `
        <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between shadow-lg cursor-pointer" onclick="window.switchAdminTab('solicitacoes')">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-full bg-white/20 text-white"><i data-lucide="bell" class="w-6 h-6"></i></span>
            <div>
              <h4 class="font-bold text-base">Você tem ${pendingCount} novo(s) autoagendamento(s) do site!</h4>
              <p class="text-xs text-white/90">Clique para aceitar e enviar a confirmação de horário no WhatsApp.</p>
            </div>
          </div>
          <button class="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow">Ver Pedidos</button>
        </div>
      ` : ''}

      <!-- Grid de KPIs Executivos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div class="admin-kpi">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Faturamento Hoje</span>
          <p class="text-3xl font-black text-slate-900">${formatMoney(revenue)}</p>
          <span class="text-xs text-emerald-600 font-semibold mt-2 inline-flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +18% vs semana anterior
          </span>
        </div>

        <div class="admin-kpi">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Veículos Agendados</span>
          <p class="text-3xl font-black text-[#0066FF]">${todayList.length}</p>
          <span class="text-xs text-slate-500 mt-2 block">Capacidade diária: 12 vagas</span>
        </div>

        <div class="admin-kpi">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Carros em Lavagem</span>
          <p class="text-3xl font-black text-amber-500">
            ${bookings.filter(b => b.status === 'Em Lavagem').length}
          </p>
          <span class="text-xs text-slate-500 mt-2 block">Tempo médio: 55 min</span>
        </div>

        <div class="admin-kpi">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Prontos para Retirada</span>
          <p class="text-3xl font-black text-emerald-600">
            ${bookings.filter(b => b.status === 'Pronto').length}
          </p>
          <span class="text-xs text-slate-500 mt-2 block">Avisar cliente no WhatsApp</span>
        </div>

      </div>

      <!-- Tabela dos Veículos do Dia -->
      <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 class="font-black text-lg text-slate-900">Veículos do Pátio Hoje</h4>
            <p class="text-xs text-slate-500">Montes Claros • Próximo à Praça de Esportes</p>
          </div>
          <button onclick="window.switchAdminTab('patio')" class="text-xs font-bold text-[#0066FF] hover:underline">
            Ver Kanban Completo →
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th class="p-4">Horário</th>
                <th class="p-4">Cliente</th>
                <th class="p-4">Veículo</th>
                <th class="p-4">Serviço</th>
                <th class="p-4">Valor</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${bookings.slice(0, 6).map(b => `
                <tr class="hover:bg-slate-50">
                  <td class="p-4 font-bold text-slate-900">${b.time}</td>
                  <td class="p-4">
                    <p class="font-bold text-slate-800">${escapeHTML(b.name)}</p>
                    <p class="text-[11px] text-slate-400">${escapeHTML(b.phone)}</p>
                  </td>
                  <td class="p-4">${escapeHTML(b.vehicle)}</td>
                  <td class="p-4"><span class="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] font-bold text-[10px]">${escapeHTML(b.service)}</span></td>
                  <td class="p-4 font-bold">${formatMoney(b.price)}</td>
                  <td class="p-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadgeClass(b.status)}">
                      ${b.status}
                    </span>
                  </td>
                  <td class="p-4 text-right">
                    ${b.status === 'Pendente Aprovação' ? `
                      <button onclick="window.acceptBooking('${b.id}')" class="px-3 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700">
                        Aceitar
                      </button>
                    ` : `
                      <button onclick="window.notifyCarReady('${b.id}')" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]">
                        WhatsApp
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 6.3 Aba Kanban do Pátio
function renderPatioTab(container) {
  const columns = [
    { title: 'Aguardando Chegada', status: 'Agendado', bg: 'bg-blue-50' },
    { title: 'Em Lavagem / Tratamento', status: 'Em Lavagem', bg: 'bg-amber-50' },
    { title: 'Pronto para Retirada', status: 'Pronto', bg: 'bg-emerald-50' },
    { title: 'Entregue / Concluído', status: 'Entregue', bg: 'bg-slate-50' }
  ];

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      ${columns.map(col => {
        const colBookings = bookings.filter(b => b.status === col.status);
        return `
          <div class="rounded-3xl p-5 ${col.bg} border border-slate-200 flex flex-col min-h-[500px]">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <h4 class="font-black text-sm text-slate-900">${col.title}</h4>
              <span class="px-2 py-0.5 rounded-full bg-white text-slate-700 font-bold text-xs shadow-sm">${colBookings.length}</span>
            </div>

            <div class="space-y-3 flex-1 overflow-y-auto">
              ${colBookings.map(b => `
                <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div class="flex items-start justify-between">
                    <span class="text-[10px] font-bold text-slate-400">${b.time} • ${b.id}</span>
                    <span class="text-xs font-black text-[#0066FF]">${formatMoney(b.price)}</span>
                  </div>
                  <div>
                    <h5 class="font-bold text-slate-900 text-sm">${escapeHTML(b.name)}</h5>
                    <p class="text-xs text-slate-500">${escapeHTML(b.vehicle)}</p>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 text-[11px] text-slate-600 font-medium">
                    ${escapeHTML(b.service)}
                  </div>
                  <div class="flex gap-1.5 pt-1">
                    ${col.status === 'Agendado' ? `
                      <button onclick="window.updateBookingStatus('${b.id}', 'Em Lavagem')" class="w-full py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px]">
                        Iniciar Lavagem 🚿
                      </button>
                    ` : col.status === 'Em Lavagem' ? `
                      <button onclick="window.updateBookingStatus('${b.id}', 'Pronto')" class="w-full py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]">
                        Finalizar & Pronto ✨
                      </button>
                    ` : col.status === 'Pronto' ? `
                      <button onclick="window.updateBookingStatus('${b.id}', 'Entregue')" class="w-full py-1.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px]">
                        Dar Baixa (Entregue) 🚗
                      </button>
                    ` : `
                      <span class="text-[10px] text-emerald-600 font-bold text-center w-full block">Serviço Concluído</span>
                    `}
                  </div>
                </div>
              `).join('')}
              ${colBookings.length === 0 ? `<p class="text-xs text-slate-400 text-center py-8">Nenhum veículo nesta etapa</p>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 6.4 Aba Agenda Completa
function renderAgendamentosTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h4 class="font-bold text-lg text-slate-900">Todos os Agendamentos</h4>
        <input type="text" oninput="window.filterBookings(this.value)" placeholder="Buscar cliente, placa ou serviço..." 
               class="px-4 py-2 rounded-full border border-slate-300 text-xs w-full sm:w-72">
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="p-3">Data</th>
              <th class="p-3">Horário</th>
              <th class="p-3">Cliente</th>
              <th class="p-3">Veículo</th>
              <th class="p-3">Serviço</th>
              <th class="p-3">Valor</th>
              <th class="p-3">Status</th>
              <th class="p-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody id="fullBookingsTbody" class="divide-y divide-slate-100 font-medium">
            ${bookings.map(b => `
              <tr class="hover:bg-slate-50">
                <td class="p-3">${formatDateBR(b.date)}</td>
                <td class="p-3 font-bold text-slate-900">${b.time}</td>
                <td class="p-3 font-bold text-slate-800">${escapeHTML(b.name)}</td>
                <td class="p-3">${escapeHTML(b.vehicle)}</td>
                <td class="p-3">${escapeHTML(b.service)}</td>
                <td class="p-3 font-bold">${formatMoney(b.price)}</td>
                <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(b.status)}">${b.status}</span></td>
                <td class="p-3 text-right">
                  <button onclick="window.notifyCarReady('${b.id}')" class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]">
                    WhatsApp
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 6.5 Aba Gestão — 3 Sócios
function renderSociosTab(container) {
  const totalRevenueMonth = bookings.reduce((sum, b) => sum + (b.price || 0), 0) * 1.5; // Estimativa
  const fixedCosts = 3800; // Aluguel ponto Praça de Esportes, água, luz, internet
  const variableCosts = Math.round(totalRevenueMonth * 0.18); // Insumos
  const totalCosts = fixedCosts + variableCosts;
  const netProfit = Math.max(0, totalRevenueMonth - totalCosts - (partners.reduce((s, p) => s + p.prolabore, 0)));
  const profitPerPartner = Math.round(netProfit / 3);

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- DRE Simplificada dos Sócios -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="admin-kpi">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Faturamento Projetado</span>
          <p class="text-2xl font-black text-slate-900">${formatMoney(totalRevenueMonth)}</p>
        </div>
        <div class="admin-kpi">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Custos Fixos + Insumos</span>
          <p class="text-2xl font-black text-red-600">${formatMoney(totalCosts)}</p>
        </div>
        <div class="admin-kpi">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Lucro Líquido a Distribuir</span>
          <p class="text-2xl font-black text-emerald-600">${formatMoney(netProfit)}</p>
        </div>
        <div class="admin-kpi bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <span class="text-[10px] font-bold text-[#0066FF] uppercase">Divisão por Sócio (1/3)</span>
          <p class="text-2xl font-black text-[#0066FF]">${formatMoney(profitPerPartner)}</p>
        </div>
      </div>

      <!-- Cards dos 3 Sócios -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${partners.map((p, i) => `
          <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-blue-100 text-[#0066FF] flex items-center justify-center font-black text-lg">
                S${i+1}
              </div>
              <div>
                <h4 class="font-black text-base text-slate-900">${escapeHTML(p.name)}</h4>
                <span class="text-xs font-semibold text-slate-400">Cota: ${p.share}%</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Pró-labore Fixo:</span>
                <span class="font-bold text-slate-800">${formatMoney(p.prolabore)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Divisão de Lucro (mês):</span>
                <span class="font-bold text-emerald-600">+ ${formatMoney(profitPerPartner)}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm">
                <span>Total Estimado:</span>
                <span class="text-[#0066FF]">${formatMoney(p.prolabore + profitPerPartner)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// 6.6 Ordem de Serviço com Checklist de Avarias 360°
function renderOrdensTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h4 class="font-black text-xl text-slate-900">Checklist de Entrada 360°</h4>
          <p class="text-xs text-slate-500">Registre avarias pré-existentes na lataria antes de iniciar a lavagem</p>
        </div>
        <button onclick="showToast('Checklist salvo com sucesso na OS!')" class="btn-teal pill px-6 py-2.5 text-xs font-bold">
          Salvar Checklist da OS
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Selecione o Veículo:</label>
          <select class="w-full p-3 rounded-2xl border border-slate-300 text-xs mb-4">
            ${bookings.map(b => `<option value="${b.id}">${b.id} - ${b.vehicle} (${b.name})</option>`).join('')}
          </select>

          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Avarias Identificadas:</label>
          <div class="space-y-2 text-xs text-slate-700">
            <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-[#0066FF]"> Risco no capô dianteiro</label>
            <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-[#0066FF]"> Roda dianteira direita ralada no meio-fio</label>
            <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-[#0066FF]"> Mossa leve na porta do motorista</label>
            <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-[#0066FF]"> Para-brisa com pequena trinca de pedrisco</label>
            <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-[#0066FF]"> Manchas de água ácida no teto</label>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center">
          <i data-lucide="shield-alert" class="w-12 h-12 text-[#0066FF] mb-3"></i>
          <h5 class="font-bold text-sm text-slate-800">Segurança Jurídica & Transparência</h5>
          <p class="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
            Ao salvar o checklist, uma cópia com os dados de avarias pode ser enviada diretamente no WhatsApp do cliente antes de iniciar a lavagem.
          </p>
        </div>
      </div>
    </div>
  `;
}

// 6.7 Estoque de Insumos
function renderEstoqueTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <h4 class="font-black text-lg text-slate-900">Insumos & Produtos Homologados KCE</h4>
        <button onclick="window.addNewProductPrompt()" class="btn-line px-4 py-2 rounded-full text-xs font-bold border-slate-300">
          + Adicionar Insumo
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${stock.map(item => {
          const isLow = item.qty <= item.min;
          return `
            <div class="p-5 rounded-2xl border ${isLow ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50'} space-y-2">
              <div class="flex items-start justify-between">
                <h5 class="font-bold text-sm text-slate-900">${escapeHTML(item.name)}</h5>
                ${isLow ? `<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-black text-[10px]">REPOR!</span>` : ''}
              </div>
              <p class="text-2xl font-black text-slate-900">${item.qty} <span class="text-xs font-semibold text-slate-500">${item.unit}</span></p>
              <p class="text-[11px] text-slate-500">Mínimo recomendado: ${item.min} ${item.unit}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

window.addNewProductPrompt = function() {
  const name = prompt('Nome do produto/insumo:');
  if (!name) return;
  const qty = Number(prompt('Quantidade atual:') || 1);
  const unit = prompt('Unidade (L, un, frasco):') || 'un';
  stock.push({ name, qty, unit, min: 2 });
  setStorage('stock', stock);
  renderAdminTabContent();
  showToast(`Insumo ${name} cadastrado!`);
};

// 6.8 Caixa, DRE & Financeiro
function renderCaixaTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
      <h4 class="font-black text-xl text-slate-900">Fechamento de Caixa Diário</h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span class="text-xs text-emerald-700 font-bold">Entradas Pix</span>
          <p class="text-2xl font-black text-emerald-800 mt-1">R$ 467,00</p>
        </div>
        <div class="p-5 rounded-2xl bg-blue-50 border border-blue-200">
          <span class="text-xs text-blue-700 font-bold">Cartão Débito/Crédito</span>
          <p class="text-2xl font-black text-blue-800 mt-1">R$ 380,00</p>
        </div>
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-xs text-slate-600 font-bold">Dinheiro / Espécie</span>
          <p class="text-2xl font-black text-slate-800 mt-1">R$ 129,00</p>
        </div>
      </div>
    </div>
  `;
}

// 6.9 Clientes CRM
function renderClientesTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
      <h4 class="font-black text-lg text-slate-900">Carteira de Clientes Recorrentes</h4>
      <div class="divide-y divide-slate-100 text-xs">
        ${bookings.map(b => `
          <div class="py-3 flex items-center justify-between">
            <div>
              <p class="font-bold text-slate-900">${escapeHTML(b.name)}</p>
              <p class="text-slate-500">${escapeHTML(b.phone)} • ${escapeHTML(b.vehicle)}</p>
            </div>
            <button onclick="window.notifyCarReady('${b.id}')" class="btn-line px-3 py-1.5 rounded-full text-slate-700 text-[11px] font-bold">
              Conversar WhatsApp
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6.10 WhatsApp Templates
function renderWhatsappTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
      <h4 class="font-black text-xl text-slate-900">Disparador de Mensagens KCE</h4>
      <div class="space-y-4 text-xs">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h5 class="font-bold text-slate-800 text-sm mb-1">1. Confirmação de Horário</h5>
          <p class="text-slate-500 mb-3">Enviado automaticamente quando você clica em Aceitar no painel.</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h5 class="font-bold text-slate-800 text-sm mb-1">2. Carro Pronto para Retirada</h5>
          <p class="text-slate-500 mb-3">Avisa o cliente que o veículo foi finalizado e pode ser retirado próximo à Praça de Esportes.</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h5 class="font-bold text-slate-800 text-sm mb-1">3. Lembrete de Retorno (Pós-Venda 15 dias)</h5>
          <p class="text-slate-500 mb-3">Convida o cliente para uma lavagem de manutenção rápida com cupom de desconto.</p>
        </div>
      </div>
    </div>
  `;
}

// 6.11 TV Fullscreen
function renderTvTab(container) {
  container.innerHTML = `
    <div class="p-10 rounded-3xl bg-[#050B1A] text-white text-center space-y-6 shadow-2xl">
      <i data-lucide="tv" class="w-16 h-16 text-[#00E5FF] mx-auto"></i>
      <div>
        <h4 class="text-2xl font-black text-white">Modo Smart TV para Recepção</h4>
        <p class="text-xs text-slate-400 mt-2 max-w-md mx-auto">
          Exibe em tela cheia na recepção a fila de carros, placas, status da lavagem e previsão de entrega em tempo real.
        </p>
      </div>
      <button onclick="document.documentElement.requestFullscreen()" class="btn-teal pill px-8 py-3 text-xs font-bold">
        Ativar Modo Tela Cheia 📺
      </button>
    </div>
  `;
}

// 6.12 Configurações & Backup
function renderConfiguracoesTab(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
      <h4 class="font-black text-xl text-slate-900">Segurança & Backup dos Dados</h4>
      <div class="space-y-4 text-xs">
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h5 class="font-bold text-slate-800">Exportar Backup Completo (JSON)</h5>
          <p class="text-slate-500">Faça download de todos os agendamentos, clientes, estoque e faturamento para sua segurança.</p>
          <button onclick="window.exportFullDataBackup()" class="btn-line px-5 py-2.5 rounded-full font-bold text-slate-800 border-slate-300">
            Baixar Backup Agora
          </button>
        </div>
      </div>
    </div>
  `;
}

window.exportFullDataBackup = function() {
  const fullBackup = {
    establishment: 'KCE Estética Automotiva',
    city: 'Montes Claros - MG',
    exportedAt: new Date().toISOString(),
    services,
    bookings,
    stock,
    partners,
    scores
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `kce_backup_${new Date().toISOString().split('T')[0]}.json`);
  dlAnchor.click();
  showToast('Backup completo baixado com sucesso!');
};

// ==================== 7. MINIGAME: KCE GRAND PRIX ====================
let gameCanvas, gameCtx;
let gameRunning = false;
let gameScore = 0;
let gameDrops = 0;
let gameLap = 1;
let playerCar = { x: 215, y: 280, w: 50, h: 70, speed: 6 };
let dropsList = [];
let obstaclesList = [];
let gameInterval, spawnInterval;

window.startKceGame = function() {
  gameCanvas = document.getElementById('gameCanvas');
  if (!gameCanvas) return;
  gameCtx = gameCanvas.getContext('2d');

  document.getElementById('gameOverlay').classList.add('hidden');
  document.getElementById('gameOverContent').classList.add('hidden');

  gameRunning = true;
  gameScore = 0;
  gameDrops = 0;
  gameLap = 1;
  playerCar.x = gameCanvas.width / 2 - 25;
  dropsList = [];
  obstaclesList = [];

  updateGameHud();

  if (gameInterval) clearInterval(gameInterval);
  if (spawnInterval) clearInterval(spawnInterval);

  gameInterval = setInterval(gameLoop, 1000 / 60);
  spawnInterval = setInterval(spawnGameItems, 1200);
};

function spawnGameItems() {
  if (!gameRunning) return;

  // Gotas de espuma
  dropsList.push({
    x: 80 + Math.random() * (gameCanvas.width - 160),
    y: -30,
    r: 12,
    speed: 3 + Math.random() * 2
  });

  // Obstáculos de pista (cones/manchas de lama)
  if (Math.random() > 0.4) {
    obstaclesList.push({
      x: 80 + Math.random() * (gameCanvas.width - 160),
      y: -40,
      w: 28,
      h: 28,
      speed: 3.5
    });
  }
}

function gameLoop() {
  if (!gameRunning) return;

  // Limpa tela
  gameCtx.fillStyle = '#081126';
  gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Faixas da pista de corrida
  gameCtx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
  gameCtx.lineWidth = 4;
  gameCtx.strokeRect(60, -10, gameCanvas.width - 120, gameCanvas.height + 20);

  gameCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  gameCtx.setLineDash([20, 20]);
  gameCtx.beginPath();
  gameCtx.moveTo(gameCanvas.width / 2, 0);
  gameCtx.lineTo(gameCanvas.width / 2, gameCanvas.height);
  gameCtx.stroke();
  gameCtx.setLineDash([]);

  // Desenhar Carro do Jogador (Esportivo Preto KCE com Neon)
  gameCtx.fillStyle = '#0066FF';
  gameCtx.fillRect(playerCar.x, playerCar.y, playerCar.w, playerCar.h);
  gameCtx.fillStyle = '#00E5FF';
  gameCtx.fillRect(playerCar.x + 8, playerCar.y + 12, playerCar.w - 16, 24); // Para-brisa
  // Rodas
  gameCtx.fillStyle = '#FFFFFF';
  gameCtx.fillRect(playerCar.x - 4, playerCar.y + 8, 4, 16);
  gameCtx.fillRect(playerCar.x + playerCar.w, playerCar.y + 8, 4, 16);
  gameCtx.fillRect(playerCar.x - 4, playerCar.y + 44, 4, 16);
  gameCtx.fillRect(playerCar.x + playerCar.w, playerCar.y + 44, 4, 16);

  // Atualizar e Desenhar Gotas
  for (let i = dropsList.length - 1; i >= 0; i--) {
    const d = dropsList[i];
    d.y += d.speed;

    gameCtx.fillStyle = '#00E5FF';
    gameCtx.beginPath();
    gameCtx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    gameCtx.fill();

    // Colisão com Carro
    if (
      d.x > playerCar.x &&
      d.x < playerCar.x + playerCar.w &&
      d.y > playerCar.y &&
      d.y < playerCar.y + playerCar.h
    ) {
      dropsList.splice(i, 1);
      gameDrops++;
      gameScore += 25;
      if (gameDrops % 5 === 0) gameLap++;
      updateGameHud();
    } else if (d.y > gameCanvas.height + 40) {
      dropsList.splice(i, 1);
    }
  }

  // Atualizar e Desenhar Obstáculos (Cones)
  for (let i = obstaclesList.length - 1; i >= 0; i--) {
    const o = obstaclesList[i];
    o.y += o.speed;

    gameCtx.fillStyle = '#EF4444';
    gameCtx.beginPath();
    gameCtx.moveTo(o.x + o.w / 2, o.y);
    gameCtx.lineTo(o.x, o.y + o.h);
    gameCtx.lineTo(o.x + o.w, o.y + o.h);
    gameCtx.closePath();
    gameCtx.fill();

    // Colisão com Cone -> Fim de Jogo
    if (
      playerCar.x < o.x + o.w &&
      playerCar.x + playerCar.w > o.x &&
      playerCar.y < o.y + o.h &&
      playerCar.y + playerCar.h > o.y
    ) {
      endKceGame();
      return;
    } else if (o.y > gameCanvas.height + 40) {
      obstaclesList.splice(i, 1);
      gameScore += 5;
      updateGameHud();
    }
  }
}

function updateGameHud() {
  const lapEl = document.getElementById('gameLap');
  const dropsEl = document.getElementById('gameDrops');
  const scoreEl = document.getElementById('gameScore');
  if (lapEl) lapEl.innerText = gameLap;
  if (dropsEl) dropsEl.innerText = gameDrops;
  if (scoreEl) scoreEl.innerText = gameScore;
}

function endKceGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  const overlay = document.getElementById('gameOverlay');
  const startContent = document.getElementById('gameStartContent');
  const endContent = document.getElementById('gameOverContent');
  
  startContent.classList.add('hidden');
  endContent.classList.remove('hidden');
  overlay.classList.remove('hidden');

  document.getElementById('finalScore').innerText = gameScore;

  // Definir Cupom
  let coupon = 'KCE5';
  if (gameScore >= 300) coupon = 'KCE15';
  else if (gameScore >= 150) coupon = 'KCE10';

  document.getElementById('wonCoupon').innerText = coupon;

  // Salvar no ranking
  const playerName = (document.getElementById('gamePlayerName').value || 'Piloto KCE').trim();
  scores.push({
    name: playerName,
    score: gameScore,
    laps: gameLap,
    drops: gameDrops,
    coupon
  });
  scores.sort((a, b) => b.score - a.score);
  setStorage('scores', scores);
  renderLeaderboard();
}

window.claimCouponAndBook = function() {
  const coupon = document.getElementById('wonCoupon').innerText;
  window.openBookingModal();
  const input = document.getElementById('bookingClientCoupon');
  if (input) input.value = coupon;
};

// Controles do Teclado e Botões
window.addEventListener('keydown', e => {
  if (!gameRunning) return;
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    playerCar.x = Math.max(70, playerCar.x - playerCar.speed * 4);
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    playerCar.x = Math.min(gameCanvas.width - 70 - playerCar.w, playerCar.x + playerCar.speed * 4);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btnL = document.getElementById('btnLeft');
  const btnR = document.getElementById('btnRight');
  if (btnL && btnR) {
    btnL.addEventListener('pointerdown', () => {
      if (gameRunning) playerCar.x = Math.max(70, playerCar.x - 30);
    });
    btnR.addEventListener('pointerdown', () => {
      if (gameRunning) playerCar.x = Math.min(gameCanvas.width - 70 - playerCar.w, playerCar.x + 30);
    });
  }
  renderLeaderboard();
  updatePendingBadge();
});

function renderLeaderboard() {
  const container = document.getElementById('gameLeaderboardList');
  if (!container) return;

  const topScores = scores.slice(0, 5);
  container.innerHTML = topScores.map((s, idx) => `
    <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full ${idx === 0 ? 'bg-amber-400 text-slate-900' : idx === 1 ? 'bg-slate-300 text-slate-900' : 'bg-amber-700 text-white'} flex items-center justify-center font-bold text-[10px]">
          ${idx + 1}
        </span>
        <span class="font-bold text-slate-200">${escapeHTML(s.name)}</span>
      </div>
      <span class="font-black text-[#00E5FF]">${s.score} pts</span>
    </div>
  `).join('');
}

// ==================== 8. ANTES & DEPOIS SLIDER ====================
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('compareSliderBox');
  const beforeImg = document.getElementById('compareBefore');
  const handle = document.getElementById('compareHandle');

  if (box && beforeImg && handle) {
    let isDown = false;

    function move(e) {
      const rect = box.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      beforeImg.style.width = percent + '%';
      handle.style.left = percent + '%';
    }

    box.addEventListener('mousedown', () => isDown = true);
    window.addEventListener('mouseup', () => isDown = false);
    box.addEventListener('mousemove', e => { if (isDown) move(e); });

    box.addEventListener('touchstart', () => isDown = true, { passive: true });
    window.addEventListener('touchend', () => isDown = false);
    box.addEventListener('touchmove', e => { if (isDown) move(e); }, { passive: true });
  }
});

// ==================== 9. FILTRO E ZOOM DA GALERIA ====================
window.filterGallery = function(category) {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.className = 'gallery-filter-btn px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/15 text-slate-300 transition-all';
  });

  const activeBtn = event.target;
  if (activeBtn) {
    activeBtn.className = 'gallery-filter-btn px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#0066FF] text-white transition-all';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    const cat = item.getAttribute('data-category');
    if (category === 'all' || cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

window.openImageZoom = function(src, caption) {
  const modal = document.getElementById('imageZoomModal');
  const img = document.getElementById('zoomImageSrc');
  const cap = document.getElementById('zoomImageCaption');
  if (!modal || !img) return;

  img.src = src;
  cap.innerText = caption;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeImageZoom = function() {
  const modal = document.getElementById('imageZoomModal');
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
};

// ==================== 10. UTILITÁRIOS ====================
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(num) {
  return Number(num || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Pendente Aprovação':
      return 'bg-amber-100 text-amber-800';
    case 'Agendado':
      return 'bg-blue-100 text-blue-800';
    case 'Em Lavagem':
      return 'bg-purple-100 text-purple-800';
    case 'Pronto':
      return 'bg-emerald-100 text-emerald-800';
    case 'Entregue':
      return 'bg-slate-100 text-slate-800';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}
