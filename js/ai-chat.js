/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo: Assistente Virtual com Inteligência Artificial Especializada
 * Responde dúvidas sobre SETEQ, SINEs, Vagas, Cursos, Seguro-Desemprego e Empregabilidade
 */

(function () {
  'use strict';

  class AiChatAssistant {
    constructor() {
      this.isOpen = false;
      this.isTyping = false;
      this.messages = [];
      this.synth = window.speechSynthesis || null;

      this.init();
    }

    init() {
      this.loadHistory();
      if (this.messages.length === 0) {
        this.addSystemGreeting();
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.render());
      } else {
        this.render();
      }
    }

    loadHistory() {
      try {
        const saved = sessionStorage.getItem('seteq_ai_chat_history');
        if (saved) {
          this.messages = JSON.parse(saved);
        }
      } catch (e) {
        this.messages = [];
      }
    }

    saveHistory() {
      try {
        sessionStorage.setItem('seteq_ai_chat_history', JSON.stringify(this.messages.slice(-30)));
      } catch (e) {}
    }

    addSystemGreeting() {
      this.messages.push({
        id: 'msg-init',
        sender: 'ai',
        time: this.getCurrentTime(),
        text: `Olá! Sou a **SETEQ IA**, assistente virtual oficial do Governo de Alagoas. 🏛️✨\n\nEstou aqui para ajudar você com:\n- 💼 **Vagas de emprego abertas** e cálculo de Match IA\n- 🎓 **Cursos gratuitos** do Qualifica Alagoas\n- 🏢 **Endereços, telefones e agendamentos no SINE AL**\n- 📄 **Seguro-Desemprego & Carteira de Trabalho Digital**\n- 💡 **Dicas de currículo e empregabilidade**\n\nComo posso ajudar você hoje? Escolha uma sugestão abaixo ou digite sua pergunta!`,
        suggestions: [
          'Quais vagas de emprego estão abertas?',
          'Como dar entrada no Seguro-Desemprego?',
          'Quais cursos gratuitos têm vagas?',
          'Onde fica o SINE mais próximo?',
          'Como funciona o cálculo de Match IA?',
          'A SETEQ cobra alguma taxa?'
        ]
      });
    }

    getCurrentTime() {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    toggle() {
      this.isOpen = !this.isOpen;
      const chatWin = document.getElementById('ai-chat-window');
      const triggerBtn = document.getElementById('ai-chat-trigger-btn');
      const badge = document.getElementById('ai-chat-unread-badge');

      if (!chatWin) return;

      if (this.isOpen) {
        chatWin.classList.remove('minimized');
        chatWin.classList.remove('hidden');
        if (badge) badge.classList.add('hidden');
        this.scrollToBottom();
        setTimeout(() => {
          const input = document.getElementById('ai-chat-input');
          if (input) input.focus();
        }, 300);
      } else {
        chatWin.classList.add('minimized');
        setTimeout(() => {
          if (!this.isOpen) chatWin.classList.add('hidden');
        }, 300);
      }
    }

    render() {
      let root = document.getElementById('ai-chat-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'ai-chat-root';
        document.body.appendChild(root);
      }

      root.innerHTML = `
        <!-- Botão Flutuante Disparador do Chat -->
        <div class="fixed bottom-5 right-5 z-40 select-none no-print">
          <button id="ai-chat-trigger-btn" class="ai-chat-trigger group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-cyan-500/50 shadow-2xl transition-all cursor-pointer" title="Conversar com a Inteligência Artificial da SETEQ">
            <div class="relative">
              <div class="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-base">
                🤖
              </div>
              <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
            </div>
            <div class="text-left hidden sm:block">
              <div class="text-xs font-black tracking-wide text-cyan-400 flex items-center gap-1.5">
                <span>SETEQ IA</span>
                <span class="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Oficial</span>
              </div>
              <p class="text-[10px] text-slate-300 font-medium">Tire dúvidas sobre SINE & Vagas</p>
            </div>
            <span id="ai-chat-unread-badge" class="w-2 h-2 rounded-full bg-cyan-400 animate-ping ml-1 hidden"></span>
          </button>
        </div>

        <!-- Janela de Conversa Flutuante -->
        <div id="ai-chat-window" class="ai-chat-window fixed bottom-20 right-4 sm:right-6 z-50 w-96 max-w-[94vw] h-[550px] max-h-[82vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden hidden minimized">
          
          <!-- Cabeçalho do Chat -->
          <div class="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-xl shadow-inner">
                  🤖
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>SETEQ IA</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-900 text-cyan-300 font-semibold border border-blue-700">Governo de AL</span>
                </h3>
                <p class="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Base SINE & MTE Integrada
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button id="ai-chat-clear-btn" class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors" title="Limpar conversa">
                🗑️
              </button>
              <button id="ai-chat-close-btn" class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-base leading-none font-bold" title="Minimizar assistente">
                ✕
              </button>
            </div>
          </div>

          <!-- Área de Mensagens -->
          <div id="ai-chat-messages-container" class="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50 dark:bg-slate-950/80">
            <!-- Mensagens renderizadas dinamicamente -->
          </div>

          <!-- Indicador de Digitação -->
          <div id="ai-chat-typing" class="hidden px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 bg-slate-50 dark:bg-slate-950/80">
            <span class="ai-typing-indicator flex items-center gap-1">
              <span></span><span></span><span></span>
            </span>
            <span>SETEQ IA está consultando as bases oficiais...</span>
          </div>

          <!-- Barra de Sugestões Rápidas (Chips) -->
          <div id="ai-chat-chips-bar" class="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button class="ai-quick-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors" data-prompt="Quais vagas de emprego estão abertas hoje?">
              💼 Vagas Abertas
            </button>
            <button class="ai-quick-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors" data-prompt="Como dar entrada no Seguro-Desemprego?">
              📄 Seguro-Desemprego
            </button>
            <button class="ai-quick-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors" data-prompt="Quais cursos gratuitos do Qualifica AL têm vagas?">
              🎓 Cursos Gratuitos
            </button>
            <button class="ai-quick-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors" data-prompt="Onde ficam os postos físicos do SINE em Alagoas?">
              🏛️ Postos SINE AL
            </button>
            <button class="ai-quick-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors" data-prompt="Como melhorar meu currículo para ter 100% de Match IA?">
              🎯 Dicas de Match IA
            </button>
          </div>

          <!-- Caixa de Entrada e Envio -->
          <form id="ai-chat-form" class="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
            <input 
              type="text" 
              id="ai-chat-input" 
              autocomplete="off"
              placeholder="Pergunte sobre vagas, cursos, SINE, seguro..." 
              class="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
            />
            <button type="submit" id="ai-chat-send-btn" class="w-9 h-9 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center font-bold shadow-md transition-all active:scale-95 flex-shrink-0" title="Enviar mensagem">
              <svg class="w-4 h-4 transform rotate-45 -translate-y-0.5 -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>

        </div>
      `;

      this.renderMessages();
      this.bindEvents();
    }

    bindEvents() {
      // Toggle chat
      const triggerBtn = document.getElementById('ai-chat-trigger-btn');
      if (triggerBtn) {
        triggerBtn.addEventListener('click', () => this.toggle());
      }

      // Close chat
      const closeBtn = document.getElementById('ai-chat-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.toggle());
      }

      // Clear chat
      const clearBtn = document.getElementById('ai-chat-clear-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Deseja limpar o histórico da conversa com a SETEQ IA?')) {
            this.messages = [];
            this.addSystemGreeting();
            this.saveHistory();
            this.renderMessages();
          }
        });
      }

      // Form submit
      const form = document.getElementById('ai-chat-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = document.getElementById('ai-chat-input');
          if (!input) return;
          const text = input.value.trim();
          if (!text || this.isTyping) return;

          input.value = '';
          this.sendMessage(text);
        });
      }

      // Chips click
      document.querySelectorAll('.ai-quick-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          const prompt = e.currentTarget.dataset.prompt;
          if (prompt && !this.isTyping) {
            this.sendMessage(prompt);
          }
        });
      });

      // Atalho de teclado global Alt+I para abrir o Chatbot
      window.addEventListener('keydown', (e) => {
        if (e.altKey && (e.key === 'i' || e.key === 'I')) {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    renderMessages() {
      const container = document.getElementById('ai-chat-messages-container');
      if (!container) return;

      container.innerHTML = this.messages.map(msg => this.renderMessageHtml(msg)).join('');
      this.attachMessageEventListeners();
      this.scrollToBottom();
    }

    renderMessageHtml(msg) {
      const isUser = msg.sender === 'user';

      if (isUser) {
        return `
          <div class="flex justify-end fade-in">
            <div class="chat-bubble-user max-w-[85%] bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm space-y-1">
              <p class="leading-relaxed whitespace-pre-wrap">${this.escapeHtml(msg.text)}</p>
              <span class="text-[9px] text-cyan-200 block text-right">${msg.time}</span>
            </div>
          </div>
        `;
      }

      // Formatar Markdown simples na resposta da IA
      const formattedText = this.formatMarkdown(msg.text);

      return `
        <div class="flex items-start gap-2 fade-in">
          <div class="w-7 h-7 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
            🤖
          </div>
          <div class="chat-bubble-ai flex-1 max-w-[88%] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div class="leading-relaxed space-y-2 break-words">
              ${formattedText}
            </div>

            <!-- Botões de Ação Dinâmicos se houver -->
            ${msg.actionButtons ? `
              <div class="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-700">
                ${msg.actionButtons.map(btn => `
                  <button class="chat-action-btn px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${btn.style || 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100'}" data-action="${btn.action}" data-payload="${btn.payload}">
                    ${btn.label}
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <!-- Rodapé da Mensagem da IA -->
            <div class="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-700/60">
              <span>${msg.time} • SETEQ IA</span>
              <button class="btn-listen-msg text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium" data-id="${msg.id}">
                <span>🔊</span> Ouvir
              </button>
            </div>
          </div>
        </div>
      `;
    }

    attachMessageEventListeners() {
      // Botões de ouvir áudio
      document.querySelectorAll('.btn-listen-msg').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          const msg = this.messages.find(m => m.id === id);
          if (msg && this.synth) {
            this.synth.cancel();
            const cleanText = msg.text.replace(/[*_#`[\]()]/g, '');
            const utt = new SpeechSynthesisUtterance(cleanText);
            utt.lang = 'pt-BR';
            this.synth.speak(utt);
            if (window.Toast) window.Toast.show('🔊 Reproduzindo resposta...', 'info', 1500);
          }
        });
      });

      // Botões de ação dinâmica (ex: abrir vaga, navegar para aba)
      document.querySelectorAll('.chat-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.currentTarget.dataset.action;
          const payload = e.currentTarget.dataset.payload;

          if (action === 'navigate' && window.appInstance) {
            window.appInstance.setTab(payload);
            this.toggle(); // minimiza o chat para ver a aba
          } else if (action === 'open-job' && window.CandidateView) {
            window.CandidateView.openJobDetailsModal(payload);
          } else if (action === 'open-course' && window.CoursesView) {
            window.CoursesView.openCourseDetailsModal(payload);
          } else if (action === 'open-mobile' && window.MobileSimulator) {
            window.MobileSimulator.open();
          } else if (action === 'call') {
            window.location.href = `tel:${payload}`;
          }
        });
      });
    }

    scrollToBottom() {
      const container = document.getElementById('ai-chat-messages-container');
      if (container) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }

    sendMessage(text) {
      // 1. Adicionar mensagem do usuário
      const userMsg = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        time: this.getCurrentTime(),
        text
      };
      this.messages.push(userMsg);
      this.renderMessages();
      this.saveHistory();

      // 2. Simular indicador de digitação
      this.isTyping = true;
      const typingEl = document.getElementById('ai-chat-typing');
      if (typingEl) typingEl.classList.remove('hidden');
      this.scrollToBottom();

      // 3. Processar resposta da IA
      const delay = Math.min(900, Math.max(400, text.length * 15));
      setTimeout(() => {
        const aiResponse = this.generateAiResponse(text);
        if (typingEl) typingEl.classList.add('hidden');
        this.isTyping = false;

        this.messages.push({
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          time: this.getCurrentTime(),
          text: aiResponse.text,
          actionButtons: aiResponse.actionButtons || null
        });

        this.renderMessages();
        this.saveHistory();
      }, delay);
    }

    // ==========================================
    // MOTOR DE INFERÊNCIA COGNITIVA DA SETEQ IA
    // ==========================================
    generateAiResponse(prompt) {
      const lower = prompt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // 1. SEGURO-DESEMPREGO
      if (lower.includes('seguro') || lower.includes('desemprego') || lower.includes('rescisao') || lower.includes('demitido')) {
        return {
          text: `📄 **Orientações sobre o Seguro-Desemprego em Alagoas:**\n\n` +
            `O Seguro-Desemprego é um benefício temporário garantido pela legislação aos trabalhadores dispensados sem justa causa.\n\n` +
            `**1. Prazo Legal para Solicitação:**\n` +
            `- De **7 até 120 dias corridos** a contar da data de demissão.\n\n` +
            `**2. Onde Solicitar:**\n` +
            `- **100% Online:** Pelo aplicativo *Carteira de Trabalho Digital* ou portal *Gov.br*.\n` +
            `- **Presencial:** Em qualquer agência física do SINE em Alagoas (Maceió, Arapiraca, Penedo, etc.).\n\n` +
            `**3. Documentos Necessários:**\n` +
            `- Requerimento do Seguro-Desemprego fornecido pelo empregador;\n` +
            `- Termo de Rescisão do Contrato de Trabalho (TRCT);\n` +
            `- Comprovante de saque ou depósito do FGTS;\n` +
            `- Documento oficial com foto e CPF.`,
          actionButtons: [
            { label: '🏢 Ver Agências SINE em AL', action: 'navigate', payload: 'support' },
            { label: '📱 Carteira Digital no App', action: 'open-mobile', payload: 'wallet' }
          ]
        };
      }

      // 2. CURSOS & QUALIFICAÇÃO PROFISSIONAL
      if (lower.includes('curso') || lower.includes('qualifica') || lower.includes('capacit') || lower.includes('senai') || lower.includes('senac') || lower.includes('estud')) {
        const courses = window.INITIAL_COURSES || [];
        let listText = courses.map(c => `• **${c.title}** (${c.workload} - ${c.modality} em *${c.city}*) - *${c.provider}*`).join('\n');

        return {
          text: `🎓 **Programa Qualifica Alagoas 2026:**\n\n` +
            `A SETEQ oferece formações técnicas gratuitas com certificação oficial e bolsas de auxílio conectividade e transporte.\n\n` +
            `**Cursos com Inscrições Abertas:**\n${listText}\n\n` +
            `✅ Todos os cursos são **100% gratuitos**, sem cobrança de taxas de matrícula ou material.`,
          actionButtons: [
            { label: '📚 Ver Catálogo Completo de Cursos', action: 'navigate', payload: 'courses' },
            { label: '🎓 Inscrição Rápida no Curso Web Full Stack', action: 'open-course', payload: 'curso-1' }
          ]
        };
      }

      // 3. VAGAS DE EMPREGO (GERAL OU ESPECÍFICO)
      if (lower.includes('vaga') || lower.includes('emprego') || lower.includes('trabalho') || lower.includes('salario') || lower.includes('contrat') || lower.includes('oportunidade')) {
        const allJobs = window.INITIAL_JOBS || [];

        // Filtro por cidade se especificado
        let matchingJobs = allJobs;
        if (lower.includes('arapiraca')) {
          matchingJobs = allJobs.filter(j => j.city.toLowerCase().includes('arapiraca'));
        } else if (lower.includes('maceio')) {
          matchingJobs = allJobs.filter(j => j.city.toLowerCase().includes('maceio'));
        } else if (lower.includes('tecnologia') || lower.includes('ti') || lower.includes('desenvolvedor') || lower.includes('programador')) {
          matchingJobs = allJobs.filter(j => j.category.toLowerCase().includes('tecnologia') || j.title.toLowerCase().includes('desenvolvedor'));
        } else if (lower.includes('saude') || lower.includes('enferm') || lower.includes('medico')) {
          matchingJobs = allJobs.filter(j => j.category.toLowerCase().includes('saude'));
        }

        const displayJobs = matchingJobs.slice(0, 4);
        const jobsList = displayJobs.map(j => 
          `• **${j.title}** na empresa *${j.companyName || 'Empresa Parceira'}*\n  📍 ${j.city} | 💰 R$ ${j.salary || 'A combinar'} | ✨ Match IA: **${j.matchScore || 95}%**`
        ).join('\n\n');

        return {
          text: `💼 **Oportunidades de Emprego Ativas no SINE Alagoas:**\n\nTemos **${allJobs.length} vagas homologadas** disponíveis hoje na plataforma:\n\n${jobsList}\n\n💡 Você pode se candidatar diretamente pelo sistema com seu currículo digital padronizado.`,
          actionButtons: [
            { label: '🔍 Explorar Todas as Vagas', action: 'navigate', payload: 'jobs' },
            { label: '📱 Candidatar pelo App Mobile', action: 'open-mobile', payload: 'jobs' }
          ]
        };
      }

      // 4. POSTOS E AGÊNCIAS DO SINE EM ALAGOAS
      if (lower.includes('sine') || lower.includes('agencia') || lower.includes('posto') || lower.includes('endereco') || lower.includes('telefone') || lower.includes('atendimento')) {
        const offices = window.SINE_OFFICES || [];
        const officeList = offices.map(o => 
          `🏢 **${o.name}**\n  📍 ${o.address}\n  📞 ${o.phone} | 🕒 ${o.hours}`
        ).join('\n\n');

        return {
          text: `🏛️ **Rede de Agências Regionais do SINE em Alagoas:**\n\n${officeList}\n\nℹ️ O atendimento é gratuito por ordem de chegada ou agendamento prévio.`,
          actionButtons: [
            { label: '📞 Ligar para o SINE Central', action: 'call', payload: '8233151818' },
            { label: '📍 Ver Agências no Mapa', action: 'navigate', payload: 'support' }
          ]
        };
      }

      // 5. GRATUIDADE / TAXAS / GOLPES
      if (lower.includes('taxa') || lower.includes('pagar') || lower.includes('custo') || lower.includes('cobrar') || lower.includes('gratis') || lower.includes('gratuito') || lower.includes('golpe')) {
        return {
          text: `🛡️ **ALERTA OFICIAL DE GRATUIDADE (Lei Federal nº 7.998/1990):**\n\n` +
            `**A SETEQ e o SINE NÃO cobram qualquer taxa!**\n\n` +
            `• A inscrição em vagas, geração de currículo e participação em processos seletivos são **100% gratuitos** para o trabalhador.\n` +
            `• Os cursos profissionalizantes do programa *Qualifica Alagoas* também são inteiramente custeados pelo Governo de Alagoas.\n\n` +
            `⚠️ **Atenção:** Se alguém solicitar pagamento de taxas para "garantir vaga" ou "exame admissional antecipado", desconfie: trata-se de fraude. Denuncie imediatamente à SETEQ ou à Ouvidoria Geral do Estado.`,
          actionButtons: [
            { label: '📜 Ler Comunicado Oficial', action: 'navigate', payload: 'welcome' }
          ]
        };
      }

      // 6. MATCH IA E CURRÍCULO
      if (lower.includes('match') || lower.includes('ia') || lower.includes('curriculo') || lower.includes('score') || lower.includes('pontua') || lower.includes('algoritmo')) {
        return {
          text: `🧠 **Como Funciona o Cálculo de Match IA do EMPREGOS AL?**\n\n` +
            `Nossa Inteligência Artificial analisa mais de **30 variáveis** do seu perfil em relação às exigências da vaga:\n\n` +
            `1. **CBO (Classificação Brasileira de Ocupações):** Afinidade de cargos anteriores;\n` +
            `2. **Proximidade Geográfica:** Residência no mesmo município ou pólo produtivo de AL;\n` +
            `3. **Competências & Cursos:** Certificações do Qualifica AL, SENAI e SEBRAE;\n` +
            `4. **Escolaridade e Idiomas:** Compatibilidade com o nível exigido pela empresa.\n\n` +
            `💡 **Dica de Ouro:** Mantenha seu currículo 100% preenchido no sistema para aumentar seu score acima de 90%!`,
          actionButtons: [
            { label: '📝 Atualizar Meu Currículo', action: 'navigate', payload: 'profile' },
            { label: '🖨️ Emitir Currículo Oficial (PDF)', action: 'navigate', payload: 'print-cv' }
          ]
        };
      }

      // 7. EMPRESAS PARCEIRAS / HOMOLOGAÇÃO
      if (lower.includes('empresa') || lower.includes('cnpj') || lower.includes('homologa') || lower.includes('anunciar') || lower.includes('recrut')) {
        return {
          text: `🏢 **Para Empresas e Empregadores em Alagoas:**\n\n` +
            `Empresas parceiras contam com apoio governamental para fechar suas vagas com agilidade e segurança jurídica:\n\n` +
            `• **Homologação Cadastral:** O CNPJ é verificado junto ao MTE e Receita em até 24 horas úteis;\n` +
            `• **Publicação Assistida por IA:** Geração automática de requisitos e descrição de cargo;\n` +
            `• **Gestão Kanban:** Acompanhamento visual dos candidatos em cada fase do processo seletivo;\n` +
            `• **Incentivo Fiscal Primeiro Emprego:** Dedução de encargos para jovens concluintes de cursos estaduais.`,
          actionButtons: [
            { label: '👥 Acessar Painel da Empresa', action: 'navigate', payload: 'company-dashboard' }
          ]
        };
      }

      // 8. O QUE É A SETEQ / GOVERNO DE ALAGOAS
      if (lower.includes('quem e') || lower.includes('o que e') || lower.includes('seteq') || lower.includes('secretaria') || lower.includes('governo')) {
        return {
          text: `🏛️ **Sobre a SETEQ (Secretaria de Estado do Trabalho, Emprego e Qualificação):**\n\n` +
            `A SETEQ é o órgão da administração direta do Governo de Alagoas responsável pela gestão do Sistema Nacional de Emprego (SINE) em todo o estado.\n\n` +
            `**Nossa Missão:**\n` +
            `Promover a inserção de trabalhadores no mercado formal, fomentar o empreendedorismo, qualificar profissionalmente os cidadãos dos 102 municípios alagoanos e garantir o cumprimento das normas trabalhistas e da LGPD.`,
          actionButtons: [
            { label: '🏛️ Ler Manifesto Alagoas em Evolução', action: 'navigate', payload: 'welcome' }
          ]
        };
      }

      // 9. CUMPRIMENTOS / CONVERSA GERAL
      if (lower.includes('ola') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde') || lower.includes('boa noite') || lower.includes('obrigado') || lower.includes('valeu')) {
        return {
          text: `Olá! É um prazer atender você. 😊 Como assistente de IA da Secretaria do Trabalho de Alagoas, estou pronto para tirar suas dúvidas sobre vagas, postos SINE, cursos gratuitos ou benefícios trabalhistas.\n\nNo que posso ajudar neste momento?`,
          actionButtons: [
            { label: '💼 Ver Vagas Abertas', action: 'navigate', payload: 'jobs' },
            { label: '🎓 Ver Cursos do Qualifica AL', action: 'navigate', payload: 'courses' }
          ]
        };
      }

      // 10. RESPOSTA INTELIGENTE PADRÃO (FALLBACK ENRIQUECIDO)
      return {
        text: `Entendi sua dúvida sobre: *"**${this.escapeHtml(prompt)}**"*\n\n` +
          `Como assistente oficial da **SETEQ e Rede SINE de Alagoas**, tenho acesso às seguintes áreas do sistema:\n\n` +
          `• 💼 **Vagas de Trabalho:** Mais de 24 oportunidades abertas em Maceió, Arapiraca e interior;\n` +
          `• 🎓 **Capacitação:** Cursos presenciais e EAD pelo Qualifica Alagoas;\n` +
          `• 🏛️ **Atendimento Presencial:** 6 agências regionais do SINE;\n` +
          `• 📄 **Direitos Trabalhistas:** Orientações sobre Seguro-Desemprego e Carteira Digital.\n\n` +
          `Por favor, selecione uma das ações rápidas ou reformule sua pergunta com termos como *"vagas em Maceió"*, *"curso de tecnologia"*, *"posto SINE"* ou *"seguro desemprego"*.`,
        actionButtons: [
          { label: '💼 Ver Todas as Vagas', action: 'navigate', payload: 'jobs' },
          { label: '🎓 Ver Cursos Abertos', action: 'navigate', payload: 'courses' },
          { label: '🏢 Postos do SINE em AL', action: 'navigate', payload: 'support' }
        ]
      };
    }

    formatMarkdown(text) {
      if (!text) return '';

      // Bold: **text** -> <strong>text</strong>
      let out = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Italic: *text* -> <em>$1</em>
      out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Bullets: • or -
      out = out.replace(/\n• (.*?)/g, '<div class="flex items-start gap-1.5 ml-1 mt-1"><span class="text-cyan-500 font-bold">•</span><span>$1</span></div>');
      out = out.replace(/\n- (.*?)/g, '<div class="flex items-start gap-1.5 ml-1 mt-1"><span class="text-cyan-500 font-bold">•</span><span>$1</span></div>');

      // Line breaks
      out = out.replace(/\n\n/g, '<br/><br/>');
      out = out.replace(/\n/g, '<br/>');

      return out;
    }

    escapeHtml(text) {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }

  window.AiChatAssistant = AiChatAssistant;
  window.aiChatAssistant = new AiChatAssistant();
})();
