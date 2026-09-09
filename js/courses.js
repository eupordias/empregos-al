/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo de Capacitação Profissional & Cursos (Qualifica Alagoas)
 */

(function () {
  'use strict';

  window.CoursesView = {
    currentFilter: {
      search: '',
      modality: 'all',
      city: 'all',
      category: 'all'
    },
    activeSubTab: 'catalog', // 'catalog' | 'enrolled' | 'certificates'

    render(subTab = 'catalog') {
      this.activeSubTab = subTab;
      const courses = this.getCourses();
      const enrolledIds = this.getEnrolledCourseIds();
      const filteredCourses = this.getFilteredCourses(courses);

      return `
        <div class="space-y-6 fade-in">
          
          <!-- Hero Banner Institucional de Cursos -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-xl">
            <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-20 pointer-events-none" style="background-image: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80');"></div>
            <div class="relative z-10 max-w-3xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold mb-3">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                PROGRAMA QUALIFICA ALAGOAS 2026
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Capacitação Gratuita para o Mercado de Trabalho Alagoano
              </h1>
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                Cursos certificados em parceria com o SENAI, SENAC, SEBRAE e Polos Tecnológicos. Formações com aulas práticas, bolsas auxílio e conexão direta com as empresas parceiras da SETEQ.
              </p>
              
              <!-- Abas Rápidas -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                <button class="course-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'catalog' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="catalog">
                  📚 Catálogo de Cursos (${courses.length})
                </button>
                <button class="course-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'enrolled' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="enrolled">
                  ✍️ Minhas Inscrições (${enrolledIds.length})
                </button>
                <button class="course-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${this.activeSubTab === 'certificates' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}" data-subtab="certificates">
                  🎓 Certificados Oficiais
                </button>
              </div>
            </div>
          </div>

          <!-- Conteúdo da Aba Selecionada -->
          ${this.activeSubTab === 'catalog' ? this.renderCatalog(filteredCourses, enrolledIds) : ''}
          ${this.activeSubTab === 'enrolled' ? this.renderEnrolled(courses, enrolledIds) : ''}
          ${this.activeSubTab === 'certificates' ? this.renderCertificates() : ''}

        </div>
      `;
    },

    renderCatalog(courses, enrolledIds) {
      return `
        <!-- Filtros e Busca -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                id="course-search-input" 
                value="${this.currentFilter.search}"
                placeholder="Buscar por curso, área técnica, tecnologia ou parceiro..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
              <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div class="flex flex-wrap sm:flex-nowrap gap-2">
              <select id="course-modality-filter" class="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-medium outline-none">
                <option value="all" ${this.currentFilter.modality === 'all' ? 'selected' : ''}>Todas as Modalidades</option>
                <option value="Presencial" ${this.currentFilter.modality === 'Presencial' ? 'selected' : ''}>Presencial</option>
                <option value="Online EAD" ${this.currentFilter.modality === 'Online EAD' ? 'selected' : ''}>Online EAD</option>
                <option value="Híbrido" ${this.currentFilter.modality === 'Híbrido' ? 'selected' : ''}>Híbrido</option>
              </select>

              <select id="course-city-filter" class="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-medium outline-none">
                <option value="all" ${this.currentFilter.city === 'all' ? 'selected' : ''}>Todos os Municípios</option>
                <option value="Maceió" ${this.currentFilter.city === 'Maceió' ? 'selected' : ''}>Maceió</option>
                <option value="Arapiraca" ${this.currentFilter.city === 'Arapiraca' ? 'selected' : ''}>Arapiraca</option>
                <option value="Maragogi" ${this.currentFilter.city === 'Maragogi' ? 'selected' : ''}>Maragogi</option>
                <option value="Marechal Deodoro" ${this.currentFilter.city === 'Marechal Deodoro' ? 'selected' : ''}>Marechal Deodoro</option>
                <option value="Rio Largo" ${this.currentFilter.city === 'Rio Largo' ? 'selected' : ''}>Rio Largo</option>
                <option value="Estadual" ${this.currentFilter.city === 'Estadual' ? 'selected' : ''}>Estadual (EAD)</option>
              </select>

              <button id="course-clear-filters" class="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                Limpar
              </button>
            </div>
          </div>
        </div>

        <!-- Grade de Cursos -->
        ${courses.length === 0 ? `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <span class="text-4xl block mb-2">🔍</span>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">Nenhum curso encontrado</h3>
            <p class="text-xs text-slate-500 mt-1">Tente remover os filtros ou pesquisar por outro termo.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${courses.map(course => this.renderCourseCard(course, enrolledIds.includes(course.id))).join('')}
          </div>
        `}
      `;
    },

    renderCourseCard(course, isEnrolled) {
      const remainingVacancies = Math.max(0, course.vacanciesTotal - course.enrolledCount);
      const occupancyPct = Math.round((course.enrolledCount / course.vacanciesTotal) * 100);

      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover-lift relative overflow-hidden group">
          
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <span>${course.partnerLogo}</span>
                <span>${course.provider}</span>
              </span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ⏱️ ${course.workload}
              </span>
            </div>

            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                ${course.title}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">
                ${course.description}
              </p>
            </div>

            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-1.5">
                <span class="text-slate-400">📍</span>
                <span class="font-medium text-slate-800 dark:text-slate-200">${course.city}</span>
                <span class="text-slate-400">•</span>
                <span>${course.modality}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-slate-400">📅</span>
                <span>Início: <strong>${this.formatDate(course.startDate)}</strong></span>
              </div>
            </div>

            <!-- Barra de Vagas -->
            <div class="space-y-1 pt-2">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-slate-500 dark:text-slate-400">Vagas restantes:</span>
                <span class="font-bold ${remainingVacancies <= 10 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}">
                  ${remainingVacancies} de ${course.vacanciesTotal} (${occupancyPct}% preenchido)
                </span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style="width: ${occupancyPct}%;"></div>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <button 
              class="btn-course-details flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
              data-id="${course.id}"
            >
              Ver Ementa
            </button>

            ${isEnrolled ? `
              <button 
                class="px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold flex items-center gap-1 cursor-default"
              >
                <span>✓</span> Inscrito
              </button>
            ` : `
              <button 
                class="btn-course-enroll px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                data-id="${course.id}"
              >
                <span>Inscrever-se</span>
              </button>
            `}
          </div>

        </div>
      `;
    },

    renderEnrolled(courses, enrolledIds) {
      const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));

      if (enrolledCourses.length === 0) {
        return `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <span class="text-4xl block">📖</span>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">Você ainda não se inscreveu em nenhum curso</h3>
            <p class="text-xs text-slate-500 max-w-md mx-auto">
              Explore nosso catálogo gratuito do Qualifica Alagoas e capacite-se nas profissões que mais contratam no estado.
            </p>
            <button class="course-subtab-btn px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all inline-flex items-center gap-1" data-subtab="catalog">
              Ver Cursos Disponíveis
            </button>
          </div>
        `;
      }

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-800 dark:text-slate-200">Seus Cursos em Andamento (${enrolledCourses.length})</h2>
            <span class="text-xs text-slate-500">Acompanhe sua frequência e materiais</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${enrolledCourses.map(course => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">${course.provider}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Turma Confirmada
                  </span>
                </div>

                <h3 class="text-base font-bold text-slate-900 dark:text-white">${course.title}</h3>
                
                <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>📍 ${course.address || course.city}</p>
                  <p>⏱️ Carga Horária: ${course.workload} (${course.modality})</p>
                  <p>📅 Início das Aulas: ${this.formatDate(course.startDate)}</p>
                </div>

                <div class="pt-2">
                  <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Progresso das Aulas</span>
                    <span class="font-bold text-cyan-600 dark:text-cyan-400">45% Concluído</span>
                  </div>
                  <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-cyan-500 h-2.5 rounded-full" style="width: 45%;"></div>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button class="btn-open-classroom px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex-1" data-id="${course.id}">
                    💻 Acessar Sala Virtual
                  </button>
                  <button class="btn-cancel-enrollment px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors" data-id="${course.id}">
                    Cancelar
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderCertificates() {
      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Emissão de Certificados Digitais SETEQ</h2>
              <p class="text-xs text-slate-500 mt-0.5">Certificados autênticos com assinatura digital do Governo de Alagoas e QR Code nacional.</p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span>🛡️</span> Validação ICP-Brasil
            </span>
          </div>

          <!-- Modelo de Certificado Demonstrativo -->
          <div class="border-2 border-dashed border-cyan-500/40 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-800/30 relative">
            <div class="max-w-2xl mx-auto text-center space-y-4">
              <div class="flex items-center justify-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-600"></span>
                <span class="w-3 h-3 rounded-full bg-white border border-slate-400"></span>
                <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                <span class="text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">Governo do Estado de Alagoas • SETEQ</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-wide">
                CERTIFICADO DE QUALIFICAÇÃO PROFISSIONAL
              </h3>

              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Certificamos que o(a) cidadão(ã) concluinte cumpriu com aproveitamento excelente todas as etapas do programa oficial de formação profissional da Secretaria de Estado do Trabalho, Emprego e Qualificação de Alagoas.
              </p>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 shadow-sm">
                <p><strong>Curso:</strong> Desenvolvimento Web Full Stack & IA Aplicada (400 Horas)</p>
                <p><strong>Parceiro Certificador:</strong> Polo Tecnológico de Alagoas & SENAI</p>
                <p><strong>Livro de Registro:</strong> SETEQ-CERT/2026 • Registro nº 84.912-AL</p>
                <p><strong>Chave Criptográfica:</strong> <code>AL-SETEQ-9A7F-4B2E-88D1-2026</code></p>
              </div>

              <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button id="btn-print-certificate" class="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                  Imprimir / Baixar Certificado Oficial (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    openCourseDetailsModal(courseId) {
      const course = this.getCourses().find(c => c.id === courseId);
      if (!course) return;

      const enrolledIds = this.getEnrolledCourseIds();
      const isEnrolled = enrolledIds.includes(course.id);
      const remainingVacancies = Math.max(0, course.vacanciesTotal - course.enrolledCount);

      const contentHtml = `
        <div class="space-y-5 text-sm">
          <!-- Cabeçalho -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300">
                ${course.category}
              </span>
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400">
                ⏱️ Carga Horária: ${course.workload}
              </span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              <strong>Parceiro Oficial:</strong> ${course.provider} • <strong>Modalidade:</strong> ${course.modality}
            </p>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              <strong>Local das Aulas:</strong> ${course.address}
            </p>
          </div>

          <!-- Sobre o Curso -->
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">Sobre a Formação</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${course.description}</p>
          </div>

          <!-- Ementa Completa -->
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">Plano de Aulas e Ementa Modular</h4>
            <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              ${course.syllabus.map(item => `
                <li class="flex items-start gap-2">
                  <span class="text-cyan-500 font-bold">✓</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Requisitos -->
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">Requisitos de Ingresso</h4>
            <ul class="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              ${course.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>

          <!-- Benefícios e Auxílios -->
          <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
            <h4 class="font-bold text-emerald-900 dark:text-emerald-300 text-xs mb-1.5 flex items-center gap-1.5">
              <span>🎁</span> Benefícios Inclusos para o Aluno
            </h4>
            <ul class="space-y-1 text-xs text-emerald-800 dark:text-emerald-400">
              ${course.benefits.map(b => `<li>• ${b}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      const footerHtml = `
        <button id="btn-close-modal" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Fechar
        </button>
        ${isEnrolled ? `
          <button class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-default">
            ✓ Você já está inscrito neste curso
          </button>
        ` : `
          <button id="modal-btn-enroll" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md active:scale-95" data-id="${course.id}">
            Confirmar Minha Inscrição com 1 Clique (Gov.br)
          </button>
        `}
      `;

      window.Modal.open({
        title: course.title,
        contentHtml,
        footerHtml,
        size: 'lg'
      });

      const modalEnrollBtn = document.getElementById('modal-btn-enroll');
      if (modalEnrollBtn) {
        modalEnrollBtn.addEventListener('click', () => {
          this.enroll(course.id);
          window.Modal.close();
        });
      }

      const closeBtn = document.getElementById('btn-close-modal');
      if (closeBtn) closeBtn.addEventListener('click', () => window.Modal.close());
    },

    enroll(courseId) {
      const enrolled = this.getEnrolledCourseIds();
      if (enrolled.includes(courseId)) {
        if (window.Toast) window.Toast.show('Você já está inscrito neste curso.', 'info');
        return;
      }

      enrolled.push(courseId);
      localStorage.setItem('seteq_enrolled_courses', JSON.stringify(enrolled));

      if (window.Toast) {
        window.Toast.show('🎉 Inscrição confirmada com sucesso no Qualifica Alagoas!', 'success');
      }

      // Re-render
      if (window.appInstance) {
        window.appInstance.render();
      }
    },

    cancelEnrollment(courseId) {
      let enrolled = this.getEnrolledCourseIds();
      enrolled = enrolled.filter(id => id !== courseId);
      localStorage.setItem('seteq_enrolled_courses', JSON.stringify(enrolled));

      if (window.Toast) {
        window.Toast.show('Inscrição cancelada.', 'info');
      }

      if (window.appInstance) {
        window.appInstance.render();
      }
    },

    attachEvents(onNavigate = null) {
      // Subtab click
      document.querySelectorAll('.course-subtab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const subtab = e.currentTarget.dataset.subtab;
          this.activeSubTab = subtab;
          if (window.appInstance) window.appInstance.render();
        });
      });

      // Busca e filtros
      const searchInput = document.getElementById('course-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.currentFilter.search = e.target.value;
          this.refreshCatalogView();
        });
      }

      const modalityFilter = document.getElementById('course-modality-filter');
      if (modalityFilter) {
        modalityFilter.addEventListener('change', (e) => {
          this.currentFilter.modality = e.target.value;
          this.refreshCatalogView();
        });
      }

      const cityFilter = document.getElementById('course-city-filter');
      if (cityFilter) {
        cityFilter.addEventListener('change', (e) => {
          this.currentFilter.city = e.target.value;
          this.refreshCatalogView();
        });
      }

      const clearFilters = document.getElementById('course-clear-filters');
      if (clearFilters) {
        clearFilters.addEventListener('click', () => {
          this.currentFilter = { search: '', modality: 'all', city: 'all', category: 'all' };
          this.refreshCatalogView();
        });
      }

      // Botões de detalhes
      document.querySelectorAll('.btn-course-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const courseId = e.currentTarget.dataset.id;
          this.openCourseDetailsModal(courseId);
        });
      });

      // Botões de inscrição rápida
      document.querySelectorAll('.btn-course-enroll').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const courseId = e.currentTarget.dataset.id;
          this.enroll(courseId);
        });
      });

      // Cancelar inscrição
      document.querySelectorAll('.btn-cancel-enrollment').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const courseId = e.currentTarget.dataset.id;
          this.cancelEnrollment(courseId);
        });
      });

      // Acessar sala virtual
      document.querySelectorAll('.btn-open-classroom').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.Toast) window.Toast.show('Redirecionando para o AVA / Sala Virtual SETEQ...', 'info');
        });
      });

      // Imprimir certificado
      const printCert = document.getElementById('btn-print-certificate');
      if (printCert) {
        printCert.addEventListener('click', () => {
          window.print();
        });
      }
    },

    refreshCatalogView() {
      if (window.appInstance) {
        window.appInstance.render();
      }
    },

    getCourses() {
      return window.INITIAL_COURSES || [];
    },

    getEnrolledCourseIds() {
      try {
        return JSON.parse(localStorage.getItem('seteq_enrolled_courses') || '["curso-1"]');
      } catch (e) {
        return ['curso-1'];
      }
    },

    getFilteredCourses(courses) {
      return courses.filter(course => {
        const matchesSearch = !this.currentFilter.search || 
          course.title.toLowerCase().includes(this.currentFilter.search.toLowerCase()) ||
          course.description.toLowerCase().includes(this.currentFilter.search.toLowerCase()) ||
          course.provider.toLowerCase().includes(this.currentFilter.search.toLowerCase()) ||
          course.category.toLowerCase().includes(this.currentFilter.search.toLowerCase());

        const matchesModality = this.currentFilter.modality === 'all' || course.modality.includes(this.currentFilter.modality);
        const matchesCity = this.currentFilter.city === 'all' || course.city.includes(this.currentFilter.city);

        return matchesSearch && matchesModality && matchesCity;
      });
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
  };
})();
