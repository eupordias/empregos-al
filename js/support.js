/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo de Atendimento ao Cidadão, Diretório SINE & Suporte Integrado
 */

(function () {
  'use strict';

  window.SupportView = {
    activeSubTab: 'sine', // 'sine' | 'faq' | 'ticket'
    faqFilter: 'all',

    render(subTab = 'sine') {
      this.activeSubTab = subTab;
      const offices = window.SINE_OFFICES || [];
      const faqs = window.INITIAL_FAQS || [];

      return `
        <div class="space-y-6 fade-in">
          
          <!-- Banner de Atendimento -->
          <div class="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl space-y-3">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                ATENDIMENTO MULTICANAL SETEQ & SINE
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                Como podemos ajudar você hoje?
              </h1>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Consulte a rede de agências físicas do SINE em Alagoas, tire dúvidas frequentes sobre intermediação e benefícios trabalhistas, ou envie uma mensagem direta aos nossos analistas.
              </p>

              <!-- Navegação Interna -->
              <div class="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                <button class="support-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'sine' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="sine">
                  🏢 Agências SINE em Alagoas (${offices.length})
                </button>
                <button class="support-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'faq' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="faq">
                  ❓ Perguntas Frequentes (FAQ)
                </button>
                <button class="support-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'ticket' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="ticket">
                  💬 Abrir Chamado de Atendimento
                </button>
                <button id="btn-open-ai-chat-from-support" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto">
                  <span>🤖</span>
                  <span>Falar com IA da SETEQ</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Conteúdo da Aba Ativa -->
          ${this.activeSubTab === 'sine' ? this.renderSineOffices(offices) : ''}
          ${this.activeSubTab === 'faq' ? this.renderFaqs(faqs) : ''}
          ${this.activeSubTab === 'ticket' ? this.renderTicketForm() : ''}

        </div>
      `;
    },

    renderSineOffices(offices) {
      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Rede de Agências e Postos de Atendimento Físico</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Atendimento presencial com agendamento prévio ou ordem de chegada.</p>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              100% Gratuito
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${offices.map(office => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-cyan-600 dark:text-cyan-400">Polo ${office.city}</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>

                  <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">${office.name}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${office.address}</p>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <p>📞 <strong>Telefone:</strong> <a href="tel:${office.phone.replace(/[^0-9]/g, '')}" class="text-cyan-600 hover:underline">${office.phone}</a></p>
                    <p>🕒 <strong>Horário:</strong> ${office.hours}</p>
                  </div>

                  <div>
                    <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Serviços Disponíveis:</span>
                    <div class="flex flex-wrap gap-1">
                      ${office.services.map(s => `
                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          ${s}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <a 
                    href="https://maps.google.com/?q=${encodeURIComponent(office.name + ' ' + office.address)}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="flex-1 text-center px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    📍 Ver no Mapa
                  </a>
                  <a 
                    href="tel:${office.phone.replace(/[^0-9]/g, '')}" 
                    class="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Ligar</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderFaqs(faqs) {
      const filteredFaqs = this.faqFilter === 'all' 
        ? faqs 
        : faqs.filter(f => f.category.toLowerCase().includes(this.faqFilter.toLowerCase()));

      const categories = ['all', 'Geral & Cadastro', 'Candidatos', 'Cursos & Capacitação', 'SINE & Benefícios', 'Empresas Parceiras', 'Acessibilidade & Segurança'];

      return `
        <div class="space-y-5">
          <!-- Filtro de Categorias de FAQ -->
          <div class="flex flex-wrap gap-2">
            ${categories.map(cat => `
              <button class="faq-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.faqFilter === cat ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-filter="${cat}">
                ${cat === 'all' ? 'Todas as Dúvidas' : cat}
              </button>
            `).join('')}
          </div>

          <!-- Lista em Acordeão -->
          <div class="space-y-3">
            ${filteredFaqs.map((faq, index) => `
              <div class="faq-item bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
                <button class="faq-question-btn w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" data-index="${index}">
                  <span class="flex items-center gap-2">
                    <span class="text-cyan-500">❓</span>
                    <span>${faq.question}</span>
                  </span>
                  <svg class="faq-chevron w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="faq-answer-container hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
                  <div class="pt-2">
                    ${faq.answer}
                  </div>
                  <div class="mt-3 pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Categoria: <strong>${faq.category}</strong></span>
                    <button class="text-cyan-600 hover:underline btn-copy-faq">Copiar resposta</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderTicketForm() {
      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Abertura de Chamado ao Cidadão</h2>
            <p class="text-xs text-slate-500 mt-1">Nossa equipe técnica e o assistente de IA da SETEQ responderão sua solicitação.</p>
          </div>

          <form id="support-ticket-form" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                <input type="text" id="ticket-name" required value="Cidadão Alagoano" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail para Resposta</label>
                <input type="email" id="ticket-email" required value="cidadao@al.gov.br" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Município de Residência</label>
                <select id="ticket-city" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium">
                  <option>Maceió</option>
                  <option>Arapiraca</option>
                  <option>Rio Largo</option>
                  <option>Palmeira dos Índios</option>
                  <option>Penedo</option>
                  <option>Outro Município de AL</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assunto / Categoria</label>
                <select id="ticket-category" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium">
                  <option>Dúvidas sobre Vagas e Candidaturas</option>
                  <option>Inscrições em Cursos do Qualifica AL</option>
                  <option>Seguro-Desemprego & Benefícios</option>
                  <option>Homologação de Empresa Parceira</option>
                  <option>Acessibilidade ou Problema no Sistema</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mensagem Detalhada</label>
              <textarea id="ticket-message" required rows="4" placeholder="Descreva sua solicitação com o máximo de detalhes..." class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"></textarea>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-[11px]">
              🔒 Ao enviar este chamado, seus dados serão processados sob estrito sigilo e conformidade com a LGPD (Lei nº 13.709/2018).
            </div>

            <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all">
              Enviar Solicitação de Atendimento (Gerar Protocolo)
            </button>
          </form>
        </div>
      `;
    },

    attachEvents(onNavigate = null) {
      // Subtab click
      document.querySelectorAll('.support-subtab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.activeSubTab = e.currentTarget.dataset.subtab;
          if (window.appInstance) window.appInstance.render();
        });
      });

      // Filtro de FAQ
      document.querySelectorAll('.faq-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.faqFilter = e.currentTarget.dataset.filter;
          if (window.appInstance) window.appInstance.render();
        });
      });

      // Acordeão de FAQ
      document.querySelectorAll('.faq-question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const item = e.currentTarget.closest('.faq-item');
          const container = item.querySelector('.faq-answer-container');
          const chevron = item.querySelector('.faq-chevron');

          const isHidden = container.classList.contains('hidden');
          if (isHidden) {
            container.classList.remove('hidden');
            chevron.classList.add('rotate-180');
          } else {
            container.classList.add('hidden');
            chevron.classList.remove('rotate-180');
          }
        });
      });

      // Submissão do chamado
      const ticketForm = document.getElementById('support-ticket-form');
      if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const protocol = `SETEQ-AL-${Math.floor(100000 + Math.random() * 900000)}`;

          window.Modal.open({
            title: 'Chamado Registrado com Sucesso!',
            size: 'md',
            contentHtml: `
              <div class="text-center space-y-4 py-3">
                <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Protocolo Oficial Gerado</h3>
                <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm font-bold text-cyan-600">
                  ${protocol}
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Uma confirmação foi enviada para o seu e-mail. Nossa equipe técnica entrará em contato em até 24 horas úteis.
                </p>
              </div>
            `,
            footerHtml: `
              <button id="btn-modal-ok" class="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold">
                Concluir
              </button>
            `
          });

          const okBtn = document.getElementById('btn-modal-ok');
          if (okBtn) okBtn.addEventListener('click', () => window.Modal.close());

          ticketForm.reset();
        });
      }

      // Botão de abrir Chatbot de IA a partir da central de atendimento
      const aiBtn = document.getElementById('btn-open-ai-chat-from-support');
      if (aiBtn) {
        aiBtn.addEventListener('click', () => {
          if (window.aiChatAssistant) {
            window.aiChatAssistant.toggle();
          }
        });
      }
    }
  };
})();
