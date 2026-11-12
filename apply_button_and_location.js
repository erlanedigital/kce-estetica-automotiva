const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

console.log('1. Atualizando "AGENDAR AVALIAÇÃO" e variações para "AGENDAR SERVIÇO"...');
html = html.replace(/AGENDAR AVALIAÇÃO/g, 'AGENDAR SERVIÇO');
html = html.replace(/Agendar Avaliação/g, 'Agendar Serviço');
html = html.replace(/agendar avaliação/g, 'agendar serviço');
html = html.replace(/Agendar avaliação/g, 'Agendar serviço');
html = html.replace(/Avaliação gratuita/g, 'Orçamento rápido');
html = html.replace(/avaliação gratuita/g, 'orçamento rápido');

console.log('2. Verificando o rodapé com endereço...');
// Ajusta o endereço no rodapé para ficar perfeito em 2 linhas:
// "Próximo à Praça de Esportes" em cima e "Montes Claros - MG" embaixo
html = html.replace(
  /Próximo à Praça de Esportes[^\n<]*Montes Claros - MG/gi,
  'Próximo à Praça de Esportes<br>Montes Claros - MG'
);

// 3. Garantir a Seção "ONDE ESTAMOS EM MONTES CLAROS"
// Vamos verificar se a seção de localização / contato está visível e com o título claro
console.log('3. Verificando título de localização...');
if (!html.includes('Onde estamos em Montes Claros')) {
  // Vamos ver onde podemos adicionar o bloco destacado de localização com mapa/endereço
  console.log('Adicionando bloco estilizado de localização antes do rodapé...');
  const locationBlock = `
    <!-- BLOCO DE LOCALIZAÇÃO OFICIAL KCL -->
    <section id="localizacao" class="relative overflow-hidden bg-[#071026] border-t border-[var(--line)] py-16 sm:py-24 text-center">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <p class="text-[13px] tracking-[.3em] text-[#2F9BFF] font-bold uppercase mb-2">LOCALIZAÇÃO PRIVILEGIADA</p>
        <h2 class="font-display font-extrabold text-[32px] sm:text-[46px] text-white tracking-tight leading-tight mb-4">
          Onde estamos <span class="font-elegant text-[#2F9BFF]">em Montes Claros</span>
        </h2>
        <p class="text-base sm:text-lg text-[#93A3BC] max-w-2xl mx-auto mb-8">
          Fácil acesso, ponto de referência central e atendimento com hora marcada sem filas.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mt-8">
          <div class="p-6 rounded-2xl bg-[#0B1739] border border-[#2F9BFF]/20 shadow-xl">
            <div class="w-12 h-12 rounded-xl bg-[#0066FF]/20 text-[#2F9BFF] flex items-center justify-center text-2xl mb-4">📍</div>
            <h3 class="font-bold text-white text-lg mb-1">Endereço</h3>
            <p class="text-[#C8D0DA] text-sm leading-relaxed">
              Próximo à Praça de Esportes<br>
              <strong>Montes Claros - MG</strong>
            </p>
            <a href="https://maps.google.com/?q=Praca+de+Esportes+Montes+Claros+MG" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs text-[#2F9BFF] font-bold mt-3 hover:underline">
              Abrir no GPS / Google Maps →
            </a>
          </div>

          <div class="p-6 rounded-2xl bg-[#0B1739] border border-[#2F9BFF]/20 shadow-xl">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4">💬</div>
            <h3 class="font-bold text-white text-lg mb-1">WhatsApp & Agendamento</h3>
            <p class="text-[#C8D0DA] text-sm leading-relaxed">
              Atendimento ágil direto no WhatsApp oficial da estética.
            </p>
            <a href="https://wa.me/5538999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o%20na%20KCL." target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-3 hover:underline">
              Conversar no WhatsApp →
            </a>
          </div>

          <div class="p-6 rounded-2xl bg-[#0B1739] border border-[#2F9BFF]/20 shadow-xl sm:col-span-2 lg:col-span-1">
            <div class="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-4">⭐</div>
            <h3 class="font-bold text-white text-lg mb-1">Diferenciais</h3>
            <p class="text-[#C8D0DA] text-sm leading-relaxed">
              Wi-Fi de alta velocidade • Café expresso cortesia • Produtos nobres certificados.
            </p>
            <span class="inline-block text-xs text-purple-300 font-semibold mt-3">
              Ambiente de estúdio premium
            </span>
          </div>
        </div>
      </div>
    </section>
  `;

  // Inserir antes da tag <footer ou antes de fechamento de root
  if (html.includes('<footer')) {
    html = html.replace('<footer', locationBlock + '\n<footer');
  } else {
    // Insere antes de </main> ou </body>
    const targetPos = html.lastIndexOf('</div>\n  <script>');
    if (targetPos !== -1) {
      html = html.slice(0, targetPos) + locationBlock + html.slice(targetPos);
    }
  }
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('dist/index.html e index.html atualizados com sucesso!');
