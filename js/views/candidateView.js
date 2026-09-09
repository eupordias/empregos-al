/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo do Candidato (Cidadão)
 */

import { store } from '../store.js';
import { AIEngine } from '../aiEngine.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { ALAGOAS_CITIES, JOB_CATEGORIES } from '../mockData.js';

export const CandidateView = {
  render(activeTab = 'jobs') {
    const candidate = store.getCandidateProfile();

    if (activeTab === 'applications') {
      return this.renderApplications(candidate);
    }
    if (activeTab === 'profile') {
      return this.renderProfile(candidate);
    }
    if (activeTab === 'saved') {
      return this.renderSaved(candidate);
    }
    if (activeTab === 'insights') {
      return this.renderInsights(candidate);
    }

    // Default: 'jobs' (Explorador de Vagas)
    return this.renderJobsExplorer(candidate);
  },

  // --- 1. EXPLORADOR DE VAGAS ---
  renderJobsExplorer(candidate) {
    const jobs = store.getJobs();
    const savedIds = store.getSavedJobIds();

    return `
      <div class="space-y-6 fade-in">
        
        <!-- Hero Banner Institucional -->
        <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div class="relative z-10 max-w-2xl">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-3">
              <svg class="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Recomendações com Inteligência Artificial
            </span>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Oportunidades de Trabalho em Alagoas</h1>
            <p class="text-blue-100 text-sm mt-2 leading-relaxed">
              Olá, <strong>${candidate.fullName.split(' ')[0]}</strong>! O motor de IA analisou seu currículo e ranqueou as vagas com maior aderência ao seu perfil profissional.
            </p>
          </div>
          <!-- Efeito decorativo sutil de fundo -->
          <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <!-- Barra de Busca e Filtros Avançados -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <!-- Campo Busca Livre -->
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input type="text" id="filter-search" placeholder="Cargo, habilidade ou empresa..." class="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent">
            </div>

            <!-- Município de Alagoas -->
            <div>
              <select id="filter-city" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 bg-white">
                <option value="">Todos os Municípios de AL</option>
                ${ALAGOAS_CITIES.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <!-- Modalidade -->
            <div>
              <select id="filter-work-model" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 bg-white">
                <option value="">Todas as Modalidades</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <!-- Categoria / Setor -->
            <div>
              <select id="filter-category" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 bg-white">
                <option value="">Todos os Setores Econômicos</option>
                ${JOB_CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
              </select>
            </div>

          </div>

          <!-- Filtros Rápidos (Chips) -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div class="flex items-center gap-2">
              <label class="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                <input type="checkbox" id="filter-high-match" class="rounded text-blue-800 focus:ring-blue-800">
                <span>Apenas vagas com Alto Match IA (≥ 80%)</span>
              </label>
            </div>
            <div id="jobs-count-badge" class="text-slate-500 font-medium">
              Carregando vagas...
            </div>
          </div>
        </div>

        <!-- Grid de Cards de Vagas -->
        <div id="jobs-grid-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Renderizado via JavaScript interativo -->
        </div>

      </div>
    `;
  },

  attachJobsEvents() {
    const candidate = store.getCandidateProfile();
    const allJobs = store.getJobs();
    const container = document.getElementById('jobs-grid-container');
    const countBadge = document.getElementById('jobs-count-badge');
    const searchInput = document.getElementById('filter-search');
    const citySelect = document.getElementById('filter-city');
    const modelSelect = document.getElementById('filter-work-model');
    const categorySelect = document.getElementById('filter-category');
    const highMatchCheckbox = document.getElementById('filter-high-match');

    if (!container) return;

    const renderFiltered = () => {
      const search = (searchInput?.value || '').toLowerCase();
      const city = citySelect?.value || '';
      const model = modelSelect?.value || '';
      const category = categorySelect?.value || '';
      const highMatchOnly = highMatchCheckbox?.checked || false;

      // Calcular match para cada vaga
      let calculatedJobs = allJobs.map(job => {
        const match = AIEngine.calculateMatch(candidate, job);
        return {
          ...job,
          aiScore: match.score,
          aiMatch: match
        };
      });

      // Ordenar por score de Match decrescente
      calculatedJobs.sort((a, b) => b.aiScore - a.aiScore);

      // Aplicar filtros
      const filtered = calculatedJobs.filter(job => {
        if (search) {
          const inTitle = job.title.toLowerCase().includes(search);
          const inCompany = job.companyName.toLowerCase().includes(search);
          const inDesc = job.description.toLowerCase().includes(search);
          const inSkills = (job.requiredSkills || []).some(s => s.toLowerCase().includes(search));
          if (!inTitle && !inCompany && !inDesc && !inSkills) return false;
        }

        if (city && job.city !== city) return false;
        if (model && job.workModel !== model) return false;
        if (category && job.category !== category) return false;
        if (highMatchOnly && job.aiScore < 80) return false;

        return true;
      });

      if (countBadge) {
        countBadge.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${allJobs.length} vagas`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200">
            <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 class="text-sm font-bold text-slate-700">Nenhuma vaga encontrada com esses filtros</h3>
            <p class="text-xs text-slate-500 mt-1">Tente remover alguns filtros ou buscar por outra cidade de Alagoas.</p>
          </div>
        `;
        return;
      }

      const savedIds = store.getSavedJobIds();
      const applications = store.getApplications();

      container.innerHTML = filtered.map(job => {
        const isSaved = savedIds.includes(job.id);
        const hasApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidate.id);

        return `
          <div class="bg-white rounded-xl border border-slate-200 hover-lift p-5 flex flex-col justify-between transition-all relative">
            
            <div>
              <!-- Cabeçalho do Card: Empresa + Match Badge -->
              <div class="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <span class="text-xs font-semibold text-blue-900 flex items-center gap-1">
                    ${job.companyName}
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  </span>
                  <h3 class="text-base font-bold text-slate-900 leading-snug mt-0.5">${job.title}</h3>
                </div>

                <!-- Match Badge -->
                <div class="flex flex-col items-end">
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${job.aiMatch.badgeClass}">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    ${job.aiScore}% Match
                  </span>
                  <span class="text-[10px] text-slate-400 font-medium mt-0.5">${job.aiMatch.label}</span>
                </div>
              </div>

              <!-- Tags de Local, Modalidade e Salário -->
              <div class="flex flex-wrap gap-1.5 text-xs text-slate-600 mb-3">
                <span class="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                  📍 ${job.city}, AL
                </span>
                <span class="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                  💼 ${job.contractType} (${job.workModel})
                </span>
                <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                  💰 ${job.salaryDisplay}
                </span>
              </div>

              <!-- Descrição Curta -->
              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                ${job.description}
              </p>

              <!-- Competências Requeridas (Chips) -->
              <div class="flex flex-wrap gap-1 mb-4">
                ${(job.requiredSkills || []).slice(0, 4).map(skill => {
                  const isOwned = (candidate.hardSkills || []).some(s => s.toLowerCase().includes(skill.toLowerCase()));
                  return `
                    <span class="text-[10px] px-2 py-0.5 rounded-md font-medium ${isOwned ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'}">
                      ${isOwned ? '✓ ' : ''}${skill}
                    </span>
                  `;
                }).join('')}
                ${(job.requiredSkills || []).length > 4 ? `
                  <span class="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">+${job.requiredSkills.length - 4}</span>
                ` : ''}
              </div>
            </div>

            <!-- Ações do Card -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
              <button data-job-id="${job.id}" class="btn-toggle-save p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors" title="${isSaved ? 'Remover dos favoritos' : 'Favoritar vaga'}">
                <svg class="w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>

              <div class="flex items-center gap-2">
                <button data-job-id="${job.id}" class="btn-view-job px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                  Ver Detalhes
                </button>

                ${hasApplied ? `
                  <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Candidatado
                  </span>
                ` : `
                  <button data-job-id="${job.id}" data-score="${job.aiScore}" class="btn-apply-quick px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-xs flex items-center gap-1">
                    Candidatar
                  </button>
                `}
              </div>
            </div>

          </div>
        `;
      }).join('');

      // Eventos dos botões do card
      container.querySelectorAll('.btn-toggle-save').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const jId = btn.getAttribute('data-job-id');
          store.toggleSaveJob(jId);
          renderFiltered();
        });
      });

      container.querySelectorAll('.btn-view-job').forEach(btn => {
        btn.addEventListener('click', () => {
          const jId = btn.getAttribute('data-job-id');
          CandidateView.openJobDetailsModal(jId);
        });
      });

      container.querySelectorAll('.btn-apply-quick').forEach(btn => {
        btn.addEventListener('click', () => {
          const jId = btn.getAttribute('data-job-id');
          const score = Number(btn.getAttribute('data-score')) || 85;
          const res = store.applyToJob(jId, score);
          if (res.success) {
            Toast.show('Candidatura realizada com sucesso! Acompanhe no painel.', 'success');
            renderFiltered();
          } else {
            Toast.show(res.message, 'warning');
          }
        });
      });
    };

    // Listeners de filtro
    searchInput?.addEventListener('input', renderFiltered);
    citySelect?.addEventListener('change', renderFiltered);
    modelSelect?.addEventListener('change', renderFiltered);
    categorySelect?.addEventListener('change', renderFiltered);
    highMatchCheckbox?.addEventListener('change', renderFiltered);

    // Render inicial
    renderFiltered();
  },

  // Modal detalhado da vaga com Raio-X da IA
  openJobDetailsModal(jobId) {
    const job = store.getJob(jobId);
    if (!job) return;

    const candidate = store.getCandidateProfile();
    const match = AIEngine.calculateMatch(candidate, job);
    const applications = store.getApplications();
    const hasApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidate.id);

    Modal.open({
      title: `${job.title} • ${job.companyName}`,
      size: 'xl',
      contentHtml: `
        <div class="space-y-6">
          
          <!-- Box de Diagnóstico de IA -->
          <div class="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-xl p-5 shadow-inner">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-xl">
                  ${match.score}%
                </div>
                <div>
                  <h4 class="font-bold text-sm text-white flex items-center gap-1.5">
                    Diagnóstico de Compatibilidade Inteligente
                    <span class="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-semibold">${match.label}</span>
                  </h4>
                  <p class="text-xs text-slate-300 mt-0.5">${match.aiInsight}</p>
                </div>
              </div>
            </div>

            <!-- Barras de Aderência -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Hard Skills</span>
                  <span>${match.breakdown.hardSkills}%</span>
                </div>
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500" style="width: ${match.breakdown.hardSkills}%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Soft Skills</span>
                  <span>${match.breakdown.softSkills}%</span>
                </div>
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-400" style="width: ${match.breakdown.softSkills}%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Escolaridade</span>
                  <span>${match.breakdown.education}%</span>
                </div>
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-400" style="width: ${match.breakdown.education}%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Localização (AL)</span>
                  <span>${match.breakdown.location}%</span>
                </div>
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-400" style="width: ${match.breakdown.location}%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações Operacionais da Vaga -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <p class="text-slate-400 text-[10px] uppercase font-semibold">Município</p>
              <p class="font-bold text-slate-800 mt-0.5">${job.city}, AL (${job.neighborhood})</p>
            </div>
            <div>
              <p class="text-slate-400 text-[10px] uppercase font-semibold">Remuneração</p>
              <p class="font-bold text-emerald-700 mt-0.5">${job.salaryDisplay}</p>
            </div>
            <div>
              <p class="text-slate-400 text-[10px] uppercase font-semibold">Regime / Modalidade</p>
              <p class="font-bold text-slate-800 mt-0.5">${job.contractType} • ${job.workModel}</p>
            </div>
            <div>
              <p class="text-slate-400 text-[10px] uppercase font-semibold">Vagas Abertas</p>
              <p class="font-bold text-slate-800 mt-0.5">${job.vacanciesCount} vaga(s)</p>
            </div>
          </div>

          <!-- Descrição e Atividades -->
          <div>
            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Descrição das Atividades</h4>
            <p class="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
              ${job.description}
            </p>
          </div>

          <!-- Requisitos & Competências -->
          <div>
            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Competências Obrigatórias</h4>
            <div class="flex flex-wrap gap-1.5">
              ${(job.requiredSkills || []).map(skill => {
                const isOwned = (candidate.hardSkills || []).some(s => s.toLowerCase().includes(skill.toLowerCase()));
                return `
                  <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${isOwned ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-200'}">
                    ${isOwned ? '✓ Você possui' : '✕ Requisito'} : ${skill}
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Benefícios -->
          <div>
            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Benefícios Oferecidos</h4>
            <div class="flex flex-wrap gap-2 text-xs text-slate-700">
              ${(job.benefits || []).map(b => `
                <span class="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                  ✨ ${b}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- CBO e Conformidade IMO/MTE -->
          <div class="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Classificação Brasileira de Ocupações (CBO):</strong> ${job.cbo} • Vaga intermediada pelo Sistema Público de Emprego SINE/SETEQ Alagoas.
          </div>

        </div>
      `,
      footerHtml: `
        <button id="modal-close-action" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
          Fechar
        </button>
        ${hasApplied ? `
          <button disabled class="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg opacity-80 cursor-not-allowed">
            ✓ Já Candidatado
          </button>
        ` : `
          <button id="modal-btn-apply" class="px-5 py-2 text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm transition-all flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Confirmar Candidatura 1-Clique
          </button>
        `}
      `,
      onRender: (container, close) => {
        container.querySelector('#modal-close-action')?.addEventListener('click', close);
        container.querySelector('#modal-btn-apply')?.addEventListener('click', () => {
          const res = store.applyToJob(job.id, match.score);
          if (res.success) {
            Toast.show('Candidatura submetida com sucesso! Boa sorte!', 'success');
            close();
            // Atualizar grid
            CandidateView.attachJobsEvents();
          } else {
            Toast.show(res.message, 'warning');
          }
        });
      }
    });
  },

  // --- 2. MINHAS CANDIDATURAS ---
  renderApplications(candidate) {
    const apps = store.getApplications().filter(a => a.candidateId === candidate.id);

    const stageMap = {
      applied: { label: 'Inscrito', color: 'bg-blue-100 text-blue-800 border-blue-200', step: 1 },
      screening: { label: 'Em Triagem / IA Match', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', step: 2 },
      interview: { label: 'Entrevista Agendada', color: 'bg-amber-100 text-amber-800 border-amber-200', step: 3 },
      approved: { label: 'Aprovado / Proposta', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', step: 4 },
      rejected: { label: 'Processo Finalizado', color: 'bg-slate-100 text-slate-700 border-slate-300', step: 4 }
    };

    return `
      <div class="space-y-6 fade-in">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Acompanhamento de Candidaturas</h2>
            <p class="text-xs text-slate-500 mt-1">Status em tempo real das suas inscrições intermediadas pelo Governo de Alagoas.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              Total: <strong>${apps.length}</strong> processo(s)
            </span>
          </div>
        </div>

        ${apps.length === 0 ? `
          <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p class="text-sm font-bold text-slate-700">Você ainda não se candidatou a nenhuma vaga.</p>
            <p class="text-xs text-slate-500 mt-1">Explore as vagas disponíveis e encontre a melhor oportunidade para o seu perfil!</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${apps.map(app => {
              const info = stageMap[app.status] || stageMap.applied;
              return `
                <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span class="text-xs font-semibold text-blue-900">${app.companyName}</span>
                      <h3 class="text-base font-bold text-slate-900">${app.jobTitle}</h3>
                      <p class="text-xs text-slate-500 mt-0.5">Inscrição realizada em: ${new Date(app.appliedAt).toLocaleDateString('pt-BR')}</p>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${info.color}">
                        <span class="w-2 h-2 rounded-full bg-current"></span>
                        ${info.label}
                      </span>
                      <span class="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                        ${app.aiScore}% Match
                      </span>
                    </div>
                  </div>

                  <!-- Linha do Tempo Visual das Etapas -->
                  <div class="py-2">
                    <div class="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                      <div class="${info.step >= 1 ? 'text-blue-900' : 'text-slate-400'}">
                        <div class="w-full h-1.5 rounded-full mb-1.5 ${info.step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}"></div>
                        1. Candidatura
                      </div>
                      <div class="${info.step >= 2 ? 'text-blue-900' : 'text-slate-400'}">
                        <div class="w-full h-1.5 rounded-full mb-1.5 ${info.step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}"></div>
                        2. Triagem IA
                      </div>
                      <div class="${info.step >= 3 ? 'text-blue-900' : 'text-slate-400'}">
                        <div class="w-full h-1.5 rounded-full mb-1.5 ${info.step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}"></div>
                        3. Entrevista
                      </div>
                      <div class="${info.step >= 4 ? (app.status === 'approved' ? 'text-emerald-700' : 'text-slate-700') : 'text-slate-400'}">
                        <div class="w-full h-1.5 rounded-full mb-1.5 ${info.step >= 4 ? (app.status === 'approved' ? 'bg-emerald-500' : 'bg-slate-400') : 'bg-slate-200'}"></div>
                        4. Resultado
                      </div>
                    </div>
                  </div>

                  <!-- Caixa de Notificação / Notas da Empresa -->
                  ${app.stageNotes ? `
                    <div class="p-3.5 rounded-xl text-xs ${app.status === 'interview' ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-slate-50 border border-slate-200 text-slate-700'}">
                      <p class="font-bold flex items-center gap-1.5">
                        ${app.status === 'interview' ? '📅 Convocação para Entrevista:' : '💬 Feedback do RH:'}
                      </p>
                      <p class="mt-1">${app.stageNotes}</p>
                      ${app.interviewDate ? `
                        <p class="mt-1.5 font-semibold text-blue-900">Horário Previsto: ${new Date(app.interviewDate).toLocaleString('pt-BR')}</p>
                      ` : ''}
                    </div>
                  ` : ''}

                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;
  },

  // --- 3. MEU CURRÍCULO PROFISSIONAL ---
  renderProfile(candidate) {
    return `
      <div class="space-y-6 fade-in max-w-4xl mx-auto">
        
        <!-- Cabeçalho com ações -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Gerenciamento do Currículo Digital</h2>
            <p class="text-xs text-slate-500 mt-1">Mantenha seus dados atualizados para aumentar a assertividade do Match de IA.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-view-printable-cv" class="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Currículo Padronizado SETEQ (PDF)
            </button>
          </div>
        </div>

        <form id="form-cv-profile" class="space-y-6">
          
          <!-- Bloco 1: Dados Pessoais & Localização -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
              1. Identificação & Contato (Alagoas)
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Nome Completo *</label>
                <input type="text" id="cv-name" value="${candidate.fullName}" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">CPF (Conforme LGPD)</label>
                <input type="text" value="${candidate.cpf}" disabled class="w-full p-2.5 border border-slate-200 bg-slate-100 rounded-lg text-slate-500">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">E-mail *</label>
                <input type="email" id="cv-email" value="${candidate.email}" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">Telefone / WhatsApp *</label>
                <input type="text" id="cv-phone" value="${candidate.phone}" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">Município de Alagoas *</label>
                <select id="cv-city" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                  ${ALAGOAS_CITIES.map(c => `
                    <option value="${c}" ${candidate.city === c ? 'selected' : ''}>${c}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">Bairro</label>
                <input type="text" id="cv-neighborhood" value="${candidate.neighborhood}" class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>
            </div>
          </div>

          <!-- Bloco 2: Cargo Desejado & Resumo com Assistente IA -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                2. Objetivo Profissional & Resumo
              </h3>
              <button type="button" id="btn-extract-skills" class="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Auto-extrair Competências com IA
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Cargo / Função Desejada *</label>
                <input type="text" id="cv-target-role" value="${candidate.targetRole}" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">Pretensão Salarial</label>
                <input type="text" id="cv-expected-salary" value="${candidate.expectedSalary}" class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-semibold text-slate-700 block mb-1">Escolaridade Principal</label>
                <select id="cv-education-level" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                  <option ${candidate.educationLevel === 'Ensino Médio Completo' ? 'selected' : ''}>Ensino Médio Completo</option>
                  <option ${candidate.educationLevel === 'Curso Técnico' ? 'selected' : ''}>Curso Técnico</option>
                  <option ${candidate.educationLevel === 'Superior Cursando' ? 'selected' : ''}>Superior Cursando</option>
                  <option ${candidate.educationLevel === 'Superior Completo' ? 'selected' : ''}>Superior Completo</option>
                  <option ${candidate.educationLevel === 'Pós-Graduação / Especialização' ? 'selected' : ''}>Pós-Graduação / Especialização</option>
                </select>
              </div>
            </div>

            <div class="text-xs">
              <label class="font-semibold text-slate-700 block mb-1">Resumo das Qualificações & Experiência *</label>
              <textarea id="cv-summary" rows="4" class="w-full p-3 border border-slate-300 rounded-lg leading-relaxed">${candidate.summary}</textarea>
              <p class="text-[11px] text-slate-400 mt-1">Dica: Cite as ferramentas, softwares e funções que você domina para que a IA aumente suas recomendações.</p>
            </div>
          </div>

          <!-- Bloco 3: Competências Técnicas e Comportamentais (Chips Interativos) -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              3. Competências & Habilidades (Para o Match de IA)
            </h3>

            <div class="text-xs space-y-2">
              <label class="font-semibold text-slate-700 block">Habilidades Técnicas (Hard Skills)</label>
              <div class="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl" id="chips-hard-skills">
                ${(candidate.hardSkills || []).map(skill => `
                  <span class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-md font-medium">
                    ${skill}
                    <button type="button" data-skill="${skill}" class="btn-remove-skill text-blue-600 hover:text-blue-900 font-bold">&times;</button>
                  </span>
                `).join('')}
              </div>
              <div class="flex gap-2">
                <input type="text" id="input-new-skill" placeholder="Ex: Excel Avançado, React, Atendimento..." class="flex-1 p-2 border border-slate-300 rounded-lg text-xs">
                <button type="button" id="btn-add-skill" class="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700">
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          <!-- Termo de Consentimento LGPD -->
          <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-2">
            <label class="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" id="cv-lgpd-consent" checked required class="mt-0.5 rounded text-blue-900 focus:ring-blue-900">
              <span>
                <strong>Consentimento LGPD (Lei 13.709/2018):</strong> Autorizo a Secretaria do Trabalho, Emprego e Qualificação de Alagoas (SETEQ) e empresas parceiras validadas a acessarem meus dados profissionais para fins exclusivos de intermediação de mão de obra e processos seletivos.
              </span>
            </label>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="submit" class="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Salvar Alterações do Currículo
            </button>
          </div>

        </form>

      </div>
    `;
  },

  attachProfileEvents(onTabChange) {
    const candidate = store.getCandidateProfile();

    // Botão para ver e imprimir currículo padronizado
    document.getElementById('btn-view-printable-cv')?.addEventListener('click', () => {
      onTabChange('print-cv');
    });

    // Adicionar nova habilidade
    const inputSkill = document.getElementById('input-new-skill');
    const btnAddSkill = document.getElementById('btn-add-skill');
    const chipsContainer = document.getElementById('chips-hard-skills');

    const addSkillTag = (skillName) => {
      const trimmed = skillName.trim();
      if (!trimmed) return;
      if (!candidate.hardSkills.includes(trimmed)) {
        candidate.hardSkills.push(trimmed);
        store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
        Toast.show(`Habilidade "${trimmed}" adicionada!`, 'info');
        onTabChange('profile');
      }
    };

    btnAddSkill?.addEventListener('click', () => {
      if (inputSkill?.value) {
        addSkillTag(inputSkill.value);
        inputSkill.value = '';
      }
    });

    inputSkill?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (inputSkill.value) {
          addSkillTag(inputSkill.value);
          inputSkill.value = '';
        }
      }
    });

    // Remover habilidade
    chipsContainer?.querySelectorAll('.btn-remove-skill').forEach(btn => {
      btn.addEventListener('click', () => {
        const skill = btn.getAttribute('data-skill');
        candidate.hardSkills = candidate.hardSkills.filter(s => s !== skill);
        store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
        Toast.show(`Habilidade "${skill}" removida`, 'info');
        onTabChange('profile');
      });
    });

    // Auto-extrair habilidades com IA
    document.getElementById('btn-extract-skills')?.addEventListener('click', () => {
      const summaryText = document.getElementById('cv-summary')?.value || '';
      const extracted = AIEngine.extractSkillsFromText(summaryText);
      if (extracted.length === 0) {
        Toast.show('Nenhuma competência nova identificada no texto.', 'info');
        return;
      }
      let addedCount = 0;
      extracted.forEach(skill => {
        if (!candidate.hardSkills.includes(skill)) {
          candidate.hardSkills.push(skill);
          addedCount++;
        }
      });
      if (addedCount > 0) {
        store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
        Toast.show(`A IA identificou e adicionou ${addedCount} competência(s) ao seu perfil!`, 'success');
        onTabChange('profile');
      } else {
        Toast.show('Todas as competências identificadas já constam no seu perfil.', 'info');
      }
    });

    // Submissão do formulário
    document.getElementById('form-cv-profile')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        fullName: document.getElementById('cv-name')?.value,
        email: document.getElementById('cv-email')?.value,
        phone: document.getElementById('cv-phone')?.value,
        city: document.getElementById('cv-city')?.value,
        neighborhood: document.getElementById('cv-neighborhood')?.value,
        targetRole: document.getElementById('cv-target-role')?.value,
        expectedSalary: document.getElementById('cv-expected-salary')?.value,
        educationLevel: document.getElementById('cv-education-level')?.value,
        summary: document.getElementById('cv-summary')?.value
      };
      store.updateCandidateProfile(updated);
      Toast.show('Currículo atualizado com sucesso!', 'success');
    });
  },

  // --- 4. VAGAS SALVAS ---
  renderSaved(candidate) {
    const savedIds = store.getSavedJobIds();
    const allJobs = store.getJobs();
    const savedJobs = allJobs.filter(j => savedIds.includes(j.id));

    return `
      <div class="space-y-6 fade-in">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-xl font-extrabold text-slate-900">Vagas Favoritadas</h2>
          <p class="text-xs text-slate-500 mt-1">Oportunidades que você salvou para candidatar-se posteriormente.</p>
        </div>

        ${savedJobs.length === 0 ? `
          <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p class="text-sm font-bold text-slate-700">Você ainda não favoritou nenhuma vaga.</p>
            <p class="text-xs text-slate-500 mt-1">Clique no ícone de coração nos cards de vagas para salvar.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${savedJobs.map(job => {
              const match = AIEngine.calculateMatch(candidate, job);
              return `
                <div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <span class="text-xs font-semibold text-blue-900">${job.companyName}</span>
                    <h3 class="text-base font-bold text-slate-900 mt-0.5">${job.title}</h3>
                    <p class="text-xs text-slate-500 mt-1">📍 ${job.city}, AL • ${job.salaryDisplay}</p>
                  </div>
                  <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-3">
                    <span class="text-xs font-bold text-emerald-700">${match.score}% Match IA</span>
                    <div class="flex gap-2">
                      <button data-job-id="${job.id}" class="btn-remove-saved text-xs text-rose-600 hover:underline">Remover</button>
                      <button data-job-id="${job.id}" class="btn-apply-saved px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold">Candidatar</button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  },

  attachSavedEvents(onTabChange) {
    document.querySelectorAll('.btn-remove-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const jId = btn.getAttribute('data-job-id');
        store.toggleSaveJob(jId);
        Toast.show('Vaga removida dos favoritos', 'info');
        onTabChange('saved');
      });
    });

    document.querySelectorAll('.btn-apply-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const jId = btn.getAttribute('data-job-id');
        const res = store.applyToJob(jId, 88);
        if (res.success) {
          Toast.show('Candidatura submetida com sucesso!', 'success');
          onTabChange('applications');
        } else {
          Toast.show(res.message, 'warning');
        }
      });
    });
  },

  // --- 5. INSIGHTS DE IA & MERCADO ALAGOAS ---
  renderInsights(candidate) {
    const allJobs = store.getJobs();
    const insights = AIEngine.getCareerInsights(candidate, allJobs);

    return `
      <div class="space-y-6 fade-in max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md">
          <span class="text-xs font-semibold bg-emerald-500/30 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30">
            Inteligência Preditiva SETEQ Alagoas
          </span>
          <h2 class="text-2xl font-extrabold mt-3">Raio-X de Empregabilidade em Alagoas</h2>
          <p class="text-xs text-blue-200 mt-1 leading-relaxed">
            Monitoramento em tempo real das competências mais demandadas pelo setor produtivo nos municípios alagoanos.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Recomendações de Qualificação -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Competências em Alta no Mercado Local
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              ${insights.recommendationText}
            </p>
            <div class="pt-2 space-y-2">
              ${insights.topInDemandInAlagoas.map(item => `
                <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span class="font-bold text-slate-800">${item.name}</span>
                  <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    ${item.count} vaga(s) exigem
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dicas da Escola de Governo e SINE AL -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Cursos e Qualificação Gratuita
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              A SETEQ disponibiliza através de parcerias cursos de capacitação técnica alinhados com o polo de tecnologia do Jaraguá e polos industriais de Arapiraca.
            </p>
            <ul class="text-xs text-slate-700 space-y-2 pt-1">
              <li class="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <strong>Programa Oxente Tech Alagoas:</strong> Formação acelerada em desenvolvimento de software e dados.
              </li>
              <li class="p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                <strong>Qualifica Alagoas:</strong> Treinamentos em hotelaria, turismo e atendimento ao cliente.
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
};
