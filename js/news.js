/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo de Comunicação, Notícias Oficiais & Notificações Push
 */

(function () {
  'use strict';

  window.NewsView = {
    selectedCategory: 'all',

    render() {
      const allNews = window.INITIAL_NEWS || [];
      const pinnedNews = allNews.find(n => n.pinned) || allNews[0];
      const otherNews = allNews.filter(n => n.id !== pinnedNews.id);

      const filteredOthers = this.selectedCategory === 'all' 
        ? otherNews 
        : otherNews.filter(n => n.category.includes(this.selectedCategory));

      return `
        <div class="space-y-8 fade-in">
          
          <!-- Cabeçalho de Comunicação -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                <span>📰</span>
                <span>CENTRAL DE COMUNICAÇÃO INSTITUCIONAL</span>
              </div>
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">
                Notícias, Editais & Atualizações da SETEQ
              </h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Acompanhe as principais ações, parcerias e programas de geração de emprego em todo o território alagoano.
              </p>
            </div>

            <!-- Botão de Simulação de Notificação Push -->
            <button id="btn-open-push-simulator" class="self-start md:self-auto px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 shadow-sm flex items-center gap-2 transition-all">
              <span class="text-cyan-400">🔔</span>
              <span>Testar Simulador Push</span>
            </button>
          </div>

          <!-- Filtro de Categorias -->
          <div class="flex flex-wrap gap-2">
            <button class="news-cat-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedCategory === 'all' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-cat="all">
              Todas as Notícias
            </button>
            <button class="news-cat-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedCategory === 'Cursos' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-cat="Cursos">
              Cursos & Capacitação
            </button>
            <button class="news-cat-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedCategory === 'SINE' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-cat="SINE">
              SINE & Políticas Públicas
            </button>
            <button class="news-cat-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedCategory === 'Legislação' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-cat="Legislação">
              Legislação & Primeiro Emprego
            </button>
            <button class="news-cat-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedCategory === 'Inovação' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}" data-cat="Inovação">
              Inovação & Tecnologia
            </button>
          </div>

          <!-- Destaque Principal (Hero News Card) -->
          ${pinnedNews ? `
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 cursor-pointer group btn-read-article" data-id="${pinnedNews.id}">
              <div class="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-slate-950">
                <img src="${pinnedNews.bannerUrl}" alt="${pinnedNews.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <div class="absolute top-4 left-4 bg-cyan-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  ⭐ Destaque do Governo
                </div>
              </div>

              <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span class="font-semibold text-cyan-600 dark:text-cyan-400">${pinnedNews.category}</span>
                    <span>•</span>
                    <span>${pinnedNews.date}</span>
                    <span>•</span>
                    <span>${pinnedNews.readTime}</span>
                  </div>

                  <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    ${pinnedNews.title}
                  </h2>

                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed">
                    ${pinnedNews.summary}
                  </p>
                </div>

                <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${pinnedNews.author}</span>
                  <span class="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ler reportagem completa →
                  </span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Grade de Notícias Secundárias -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Recentes</span>
              <span class="text-xs font-normal text-slate-500">(${filteredOthers.length} publicações)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${filteredOthers.map(news => `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover-lift cursor-pointer group btn-read-article" data-id="${news.id}">
                  <div class="h-44 overflow-hidden relative bg-slate-950">
                    <img src="${news.bannerUrl}" alt="${news.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span class="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-cyan-300 backdrop-blur-sm border border-slate-700">
                      ${news.category}
                    </span>
                  </div>

                  <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>${news.date}</span>
                        <span>•</span>
                        <span>${news.readTime}</span>
                      </div>

                      <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        ${news.title}
                      </h4>

                      <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        ${news.summary}
                      </p>
                    </div>

                    <div class="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                      Ler notícia →
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      `;
    },

    openArticleModal(articleId) {
      const allNews = window.INITIAL_NEWS || [];
      const article = allNews.find(n => n.id === articleId);
      if (!article) return;

      const contentHtml = `
        <div class="space-y-5 text-sm">
          <div class="h-56 sm:h-72 -mx-6 -mt-6 mb-4 relative overflow-hidden bg-slate-950">
            <img src="${article.bannerUrl}" alt="${article.title}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-6 right-6 text-white">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-600">
                ${article.category}
              </span>
              <p class="text-xs text-slate-300 mt-2">
                Por ${article.author} • ${article.date} • ${article.readTime}
              </p>
            </div>
          </div>

          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            ${article.title}
          </h2>

          <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 prose dark:prose-invert max-w-none">
            ${article.content}
          </div>

          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span>🏛️ Fonte Oficial:</span>
              <strong>Secretaria do Trabalho, Emprego e Qualificação de Alagoas</strong>
            </div>
            <button id="btn-share-news" class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5">
              <span>🔗</span> Compartilhar Notícia
            </button>
          </div>
        </div>
      `;

      const footerHtml = `
        <button id="btn-close-article" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Fechar
        </button>
        <button id="btn-listen-article" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors">
          <span>🔊</span> Ouvir Notícia
        </button>
      `;

      window.Modal.open({
        title: 'Comunicado Oficial SETEQ',
        contentHtml,
        footerHtml,
        size: 'xl'
      });

      const closeBtn = document.getElementById('btn-close-article');
      if (closeBtn) closeBtn.addEventListener('click', () => window.Modal.close());

      const shareBtn = document.getElementById('btn-share-news');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          if (window.Toast) window.Toast.show('Link oficial copiado para a área de transferência!', 'success');
        });
      }

      const listenBtn = document.getElementById('btn-listen-article');
      if (listenBtn) {
        listenBtn.addEventListener('click', () => {
          if (window.accessibilityEngine) {
            window.accessibilityEngine.synth.cancel();
            const textToSpeak = `${article.title}. ${article.summary}`;
            const utt = new SpeechSynthesisUtterance(textToSpeak);
            utt.lang = 'pt-BR';
            window.accessibilityEngine.synth.speak(utt);
            if (window.Toast) window.Toast.show('🔊 Lendo notícia...', 'info');
          }
        });
      }
    },

    openPushSimulatorModal() {
      const contentHtml = `
        <div class="space-y-4 text-xs">
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Como gestor ou cidadão conectado ao ecossistema SETEQ, você pode testar o disparo em tempo real de <strong>notificações push</strong> para o aplicativo mobile (Android e iOS).
          </p>

          <div class="space-y-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipo de Notificação</label>
              <select id="push-type-select" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium">
                <option value="job">🎯 Vaga Compatível (Match IA)</option>
                <option value="course">🎓 Inscrição em Curso Aberta</option>
                <option value="news">📢 Alerta / Notícia Institucional</option>
                <option value="application">👀 Atualização de Candidatura</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título da Notificação</label>
              <input id="push-title-input" type="text" value="🎯 Nova Vaga Compatível: Desenvolvedor Front-end em Maceió" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mensagem (Corpo do Push)</label>
              <textarea id="push-body-input" rows="2" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium">Empresa parceira Alagoas Tech tem 94% de afinidade com suas competências cadastradas. Salário: R$ 4.500.</textarea>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300">
            ℹ️ Ao disparar, o alerta surgirá no cabeçalho do Simulador Mobile com som de push e vibração nativa simulada.
          </div>
        </div>
      `;

      const footerHtml = `
        <button id="btn-close-push" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Fechar
        </button>
        <button id="btn-trigger-push" class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all">
          🚀 Disparar Notificação no Smartphone
        </button>
      `;

      window.Modal.open({
        title: 'Simulador de Notificações Push (Mobile)',
        contentHtml,
        footerHtml,
        size: 'md'
      });

      const closeBtn = document.getElementById('btn-close-push');
      if (closeBtn) closeBtn.addEventListener('click', () => window.Modal.close());

      const triggerBtn = document.getElementById('btn-trigger-push');
      if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
          const title = document.getElementById('push-title-input').value;
          const body = document.getElementById('push-body-input').value;
          const type = document.getElementById('push-type-select').value;

          window.Modal.close();

          // Abre o simulador mobile e dispara a notificação nele
          if (window.MobileSimulator) {
            window.MobileSimulator.open();
            setTimeout(() => {
              window.MobileSimulator.triggerPushBanner({ title, body, type });
            }, 400);
          }

          if (window.Toast) {
            window.Toast.show('🔔 Notificação enviada para o aplicativo!', 'success');
          }
        });
      }
    },

    attachEvents(onNavigate = null) {
      // Filtros de categoria
      document.querySelectorAll('.news-cat-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.selectedCategory = e.currentTarget.dataset.cat;
          if (window.appInstance) window.appInstance.render();
        });
      });

      // Leitura de artigo
      document.querySelectorAll('.btn-read-article').forEach(card => {
        card.addEventListener('click', (e) => {
          const articleId = e.currentTarget.dataset.id;
          this.openArticleModal(articleId);
        });
      });

      // Abrir simulador de push
      const btnPush = document.getElementById('btn-open-push-simulator');
      if (btnPush) {
        btnPush.addEventListener('click', () => this.openPushSimulatorModal());
      }
    }
  };
})();
