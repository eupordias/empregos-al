/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo Simulador Interativo de Aplicativo Mobile Nativo (iOS & Android)
 */

(function () {
  'use strict';

  window.MobileSimulator = {
    isOpen: false,
    activeTab: 'jobs', // 'jobs' | 'courses' | 'news' | 'sine' | 'wallet'
    osTheme: 'ios',    // 'ios' | 'android'
    currentTime: '14:32',
    pushQueue: [],

    open() {
      this.isOpen = true;
      this.updateClock();
      this.render();
      const container = document.getElementById('mobile-simulator-modal');
      if (container) {
        container.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    },

    close() {
      this.isOpen = false;
      const container = document.getElementById('mobile-simulator-modal');
      if (container) {
        container.classList.add('hidden');
        document.body.style.overflow = '';
      }
    },

    updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      this.currentTime = `${h}:${m}`;
    },

    setTab(tab) {
      this.activeTab = tab;
      this.renderAppContent();
      this.updateBottomNav();
    },

    setOs(os) {
      this.osTheme = os;
      this.render();
    },

    triggerPushBanner({ title, body, type = 'job' }) {
      const banner = document.getElementById('simulator-push-banner');
      if (!banner) return;

      const titleEl = banner.querySelector('.push-banner-title');
      const bodyEl = banner.querySelector('.push-banner-body');

      if (titleEl) titleEl.textContent = title;
      if (bodyEl) bodyEl.textContent = body;

      banner.classList.add('show');

      // Tocar som de notificação sintético via Web Audio API
      this.playPushBeep();

      setTimeout(() => {
        banner.classList.remove('show');
      }, 5500);
    },

    playPushBeep() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15); // E6
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } catch (e) {
        // Áudio desativado ou sem permissão
      }
    },

    render() {
      const container = document.getElementById('mobile-simulator-modal');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md fade-in select-none">
          
          <!-- Controles Externos do Simulador (Barra Superior de Suporte) -->
          <div class="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-4 py-1.5 rounded-full text-xs text-white shadow-2xl z-50">
            <span class="font-bold text-cyan-400">📱 Simulador Mobile SETEQ</span>
            <span class="text-slate-500">•</span>
            <button id="sim-toggle-os" class="hover:text-cyan-300 font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              Sistema: ${this.osTheme === 'ios' ? ' iOS (Apple)' : '🤖 Android (Material)'}
            </button>
            <span class="text-slate-500">•</span>
            <button id="sim-btn-push-demo" class="hover:text-cyan-300 font-semibold text-[11px] text-amber-300">
              🔔 Testar Push
            </button>
            <span class="text-slate-500">•</span>
            <button id="sim-btn-ai-chat" class="hover:text-cyan-300 font-semibold text-[11px] text-cyan-300 flex items-center gap-1">
              🤖 Falar com IA
            </button>
            <span class="text-slate-500">•</span>
            <button id="sim-btn-close" class="text-slate-400 hover:text-white text-base leading-none font-bold px-1.5 py-0.5 rounded hover:bg-slate-800">
              ✕
            </button>
          </div>

          <!-- Chassis do Smartphone -->
          <div class="mobile-device-wrapper my-auto">
            <div class="smartphone-frame text-slate-100 shadow-2xl">
              
              <!-- Ilha Dinâmica / Notch -->
              <div class="smartphone-island">
                <div class="smartphone-island-camera"></div>
                <div class="smartphone-island-sensor"></div>
              </div>

              <!-- Status Bar Superior -->
              <div class="pt-3 px-6 flex items-center justify-between text-[12px] font-semibold text-white tracking-tight z-30">
                <span id="phone-clock">${this.currentTime}</span>
                <div class="flex items-center gap-1.5 text-[11px]">
                  <span>5G</span>
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
                  <span>98%</span>
                </div>
              </div>

              <!-- Banner de Notificação Push Deslizante -->
              <div id="simulator-push-banner" class="mobile-push-banner bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md cursor-pointer">
                <div class="flex items-start gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black flex-shrink-0">
                    AL
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wide">SETEQ Alagoas • agora</span>
                    </div>
                    <h5 class="push-banner-title text-xs font-bold text-white truncate mt-0.5">Nova Vaga Compatível</h5>
                    <p class="push-banner-body text-[11px] text-slate-300 line-clamp-2 mt-0.5">Empresa homologada abriu oportunidade no seu perfil.</p>
                  </div>
                </div>
              </div>

              <!-- Tela Principal do Aplicativo (Área com Scroll) -->
              <div id="simulator-screen-content" class="flex-1 overflow-y-auto px-4 pt-4 pb-20 text-slate-900 bg-slate-50 dark:bg-slate-950">
                <!-- Conteúdo dinâmico injetado aqui -->
              </div>

              <!-- Barra de Navegação Inferior Nativa (Tab Bar) -->
              <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md flex items-center justify-around px-2 z-40">
                
                <button class="mobile-nav-btn flex flex-col items-center justify-center flex-1 py-1 transition-colors ${this.activeTab === 'jobs' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}" data-tab="jobs">
                  <span class="text-base">💼</span>
                  <span class="text-[10px] font-bold mt-0.5">Vagas</span>
                </button>

                <button class="mobile-nav-btn flex flex-col items-center justify-center flex-1 py-1 transition-colors ${this.activeTab === 'courses' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}" data-tab="courses">
                  <span class="text-base">🎓</span>
                  <span class="text-[10px] font-bold mt-0.5">Cursos</span>
                </button>

                <button class="mobile-nav-btn flex flex-col items-center justify-center flex-1 py-1 transition-colors ${this.activeTab === 'news' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}" data-tab="news">
                  <span class="text-base">📰</span>
                  <span class="text-[10px] font-bold mt-0.5">Notícias</span>
                </button>

                <button class="mobile-nav-btn flex flex-col items-center justify-center flex-1 py-1 transition-colors ${this.activeTab === 'sine' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}" data-tab="sine">
                  <span class="text-base">🏛️</span>
                  <span class="text-[10px] font-bold mt-0.5">SINE AL</span>
                </button>

                <button class="mobile-nav-btn flex flex-col items-center justify-center flex-1 py-1 transition-colors ${this.activeTab === 'wallet' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}" data-tab="wallet">
                  <span class="text-base">🪪</span>
                  <span class="text-[10px] font-bold mt-0.5">Carteira</span>
                </button>

              </div>

              <!-- Indicador de Início (Home Bar do iOS) -->
              <div class="smartphone-home-indicator"></div>

            </div>
          </div>

        </div>
      `;

      this.renderAppContent();
      this.bindModalEvents();
    },

    renderAppContent() {
      const screen = document.getElementById('simulator-screen-content');
      if (!screen) return;

      if (this.activeTab === 'jobs') {
        screen.innerHTML = this.renderMobileJobs();
      } else if (this.activeTab === 'courses') {
        screen.innerHTML = this.renderMobileCourses();
      } else if (this.activeTab === 'news') {
        screen.innerHTML = this.renderMobileNews();
      } else if (this.activeTab === 'sine') {
        screen.innerHTML = this.renderMobileSine();
      } else if (this.activeTab === 'wallet') {
        screen.innerHTML = this.renderMobileWallet();
      }

      this.bindScreenEvents();
    },

    renderMobileJobs() {
      const jobs = window.INITIAL_JOBS ? window.INITIAL_JOBS.slice(0, 5) : [];
      return `
        <div class="space-y-4">
          
          <!-- Top App Header -->
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Empregos AL • SINE</span>
              <h2 class="text-lg font-black text-slate-900 dark:text-white">Oportunidades</h2>
            </div>
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              AL
            </div>
          </div>

          <!-- Quick Search Chips -->
          <div class="flex gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
            <span class="px-2.5 py-1 rounded-full bg-cyan-600 text-white font-bold whitespace-nowrap">Todas (24)</span>
            <span class="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap">Maceió</span>
            <span class="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap">Arapiraca</span>
            <span class="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap">Home Office</span>
          </div>

          <!-- Job Cards -->
          <div class="space-y-3">
            ${jobs.map(job => `
              <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-tight">${job.title}</h4>
                    <p class="text-[11px] text-slate-500">${job.companyName || 'Empresa Homologada'}</p>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    95% Match
                  </span>
                </div>

                <div class="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                  <span>📍 ${job.city}</span>
                  <span>•</span>
                  <span>💰 R$ ${job.salary || 'A combinar'}</span>
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-[10px] text-slate-400">Publicada via SINE AL</span>
                  <button class="mob-btn-apply px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-all" data-id="${job.id}">
                    Candidatar
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      `;
    },

    renderMobileCourses() {
      const courses = window.INITIAL_COURSES || [];
      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Qualifica Alagoas</span>
              <h2 class="text-lg font-black text-slate-900 dark:text-white">Cursos Gratuitos</h2>
            </div>
            <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">100% Grátis</span>
          </div>

          <div class="space-y-3">
            ${courses.map(course => `
              <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">${course.provider}</span>
                  <span class="text-[10px] font-semibold text-slate-500">${course.workload}</span>
                </div>

                <h4 class="text-xs font-bold text-slate-900 dark:text-white">${course.title}</h4>
                <p class="text-[10px] text-slate-500 line-clamp-2">${course.description}</p>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                  <span>📍 ${course.city} (${course.modality})</span>
                  <button class="mob-btn-enroll-course px-3 py-1 rounded-lg bg-cyan-600 text-white font-bold text-[11px]" data-id="${course.id}">
                    Inscrever
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderMobileNews() {
      const news = window.INITIAL_NEWS || [];
      return `
        <div class="space-y-4">
          <div class="pb-2 border-b border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Comunicação SETEQ</span>
            <h2 class="text-lg font-black text-slate-900 dark:text-white">Notícias & Editais</h2>
          </div>

          <div class="space-y-3">
            ${news.map(n => `
              <div class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                <img src="${n.bannerUrl}" alt="${n.title}" class="w-full h-28 object-cover" />
                <div class="p-3 space-y-1.5">
                  <div class="flex items-center justify-between text-[10px] text-slate-400">
                    <span class="text-cyan-600 font-bold">${n.category}</span>
                    <span>${n.date}</span>
                  </div>
                  <h4 class="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">${n.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2">${n.summary}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderMobileSine() {
      const offices = window.SINE_OFFICES || [];
      return `
        <div class="space-y-4">
          <div class="pb-2 border-b border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Rede de Atendimento</span>
            <h2 class="text-lg font-black text-slate-900 dark:text-white">Postos SINE Alagoas</h2>
          </div>

          <div class="space-y-2.5">
            ${offices.map(o => `
              <div class="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">${o.name}</h4>
                <p class="text-[10px] text-slate-500">📍 ${o.address}</p>
                <p class="text-[10px] text-slate-600 dark:text-slate-400">🕒 ${o.hours}</p>
                <div class="pt-2 flex gap-2">
                  <a href="tel:${o.phone.replace(/[^0-9]/g, '')}" class="flex-1 py-1 rounded-lg bg-cyan-600 text-white text-center text-[10px] font-bold">
                    📞 Ligar ${o.phone}
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderMobileWallet() {
      return `
        <div class="space-y-4 text-xs">
          <div class="pb-2 border-b border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Identidade Digital</span>
            <h2 class="text-lg font-black text-slate-900 dark:text-white">Carteira do Trabalhador</h2>
          </div>

          <!-- Cartão Digital Virtual com Estilo Gov.br -->
          <div class="rounded-2xl p-4 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-cyan-500/30 space-y-4 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-md bg-white text-blue-900 font-extrabold flex items-center justify-center text-[10px]">
                  AL
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider">Governo de Alagoas</p>
                  <p class="text-[9px] text-slate-300">SETEQ • Trabalho e Emprego</p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Selo Ouro Gov.br
              </span>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <div class="w-12 h-12 rounded-full bg-slate-700 border-2 border-cyan-400 overflow-hidden flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">Cidadão Trabalhador Alagoano</h3>
                <p class="text-[10px] text-slate-300">CPF: ***.456.789-**</p>
                <p class="text-[10px] text-cyan-300 font-medium">PIS/PASEP: 128.49012.33-4</p>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-[10px]">
              <div>
                <p class="text-slate-400">Status no SINE AL:</p>
                <p class="font-bold text-emerald-400">Cadastrado & Apto a Vagas</p>
              </div>
              <div class="text-right">
                <p class="text-slate-400">Qualifica AL:</p>
                <p class="font-bold text-cyan-300">1 Curso Inscrito</p>
              </div>
            </div>

            <div class="text-center pt-1">
              <span class="text-[9px] text-slate-400 font-mono">Autenticação: SETEQ-AL-2026-VAL-OK</span>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="space-y-2">
            <button class="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 text-xs shadow-sm">
              <span>📄</span> Exportar Carteira em PDF
            </button>
            <button class="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 text-xs shadow-sm">
              <span>🔒</span> Gerenciar Permissões LGPD
            </button>
          </div>
        </div>
      `;
    },

    updateBottomNav() {
      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        const tab = btn.dataset.tab;
        if (tab === this.activeTab) {
          btn.classList.add('text-cyan-600', 'dark:text-cyan-400');
          btn.classList.remove('text-slate-400');
        } else {
          btn.classList.remove('text-cyan-600', 'dark:text-cyan-400');
          btn.classList.add('text-slate-400');
        }
      });
    },

    bindModalEvents() {
      const closeBtn = document.getElementById('sim-btn-close');
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());

      const toggleOsBtn = document.getElementById('sim-toggle-os');
      if (toggleOsBtn) {
        toggleOsBtn.addEventListener('click', () => {
          this.setOs(this.osTheme === 'ios' ? 'android' : 'ios');
        });
      }

      const pushDemoBtn = document.getElementById('sim-btn-push-demo');
      if (pushDemoBtn) {
        pushDemoBtn.addEventListener('click', () => {
          this.triggerPushBanner({
            title: '🎯 Nova Vaga Compatível (Match IA 96%)',
            body: 'Alagoas Tech Solutions abriu vaga de Desenvolvedor em Maceió. Toque para se candidatar!'
          });
        });
      }

      const aiChatBtn = document.getElementById('sim-btn-ai-chat');
      if (aiChatBtn) {
        aiChatBtn.addEventListener('click', () => {
          if (window.aiChatAssistant) {
            window.aiChatAssistant.toggle();
          }
        });
      }

      // Bottom nav bar click
      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = e.currentTarget.dataset.tab;
          this.setTab(tab);
        });
      });

      // Push banner click
      const pushBanner = document.getElementById('simulator-push-banner');
      if (pushBanner) {
        pushBanner.addEventListener('click', () => {
          this.setTab('jobs');
          pushBanner.classList.remove('show');
        });
      }
    },

    bindScreenEvents() {
      // 1-tap candidatar
      document.querySelectorAll('.mob-btn-apply').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = '✓ Enviado';
          btn.classList.remove('bg-cyan-600');
          btn.classList.add('bg-emerald-600');
          this.triggerPushBanner({
            title: '✅ Candidatura Registrada!',
            body: 'Seu currículo foi enviado para o recrutador da empresa.'
          });
        });
      });

      // 1-tap curso
      document.querySelectorAll('.mob-btn-enroll-course').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = '✓ Inscrito';
          btn.classList.remove('bg-cyan-600');
          btn.classList.add('bg-emerald-600');
          this.triggerPushBanner({
            title: '🎓 Inscrição Confirmada!',
            body: 'Turma do Qualifica Alagoas garantida. Acesse a Carteira.'
          });
        });
      });
    }
  };
})();
