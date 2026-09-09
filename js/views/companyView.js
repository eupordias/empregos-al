/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo da Empresa Parceira (Empregadores & RH)
 */

import { store } from '../store.js';
import { AIEngine } from '../aiEngine.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { ALAGOAS_CITIES, JOB_CATEGORIES } from '../mockData.js';

export const CompanyView = {
  render(activeTab = 'company-dashboard') {
    const company = store.getCurrentCompany();

    if (activeTab === 'company-kanban') {
      return this.renderKanban(company);
    }
    if (activeTab === 'company-talents') {
      return this.renderTalentSearch(company);
    }
    if (activeTab === 'company-new-job') {
      return this.renderNewJobForm(company);
    }

    // Default: 'company-dashboard'
    return this.renderDashboard(company);
  },

  // --- 1. DASHBOARD E GESTÃO DE VAGAS ---
  renderDashboard(company) {
    const allCompanies = store.getCompanies();
    const jobs = store.getJobs().filter(j => j.companyId === company.id);
    const allApps = store.getApplications();
    const companyApps = allApps.filter(a => a.companyId === company.id);
    const activeJobs = jobs.filter(j => j.status === 'active');
    const interviewsCount = companyApps.filter(a => a.status === 'interview').length;

    return `
      <div class="space-y-6 fade-in">
        
        <!-- Header com Seletor de Empresa Parceira (para teste dinâmico) -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-extrabold text-slate-900">${company.tradeName || company.name}</h2>
              <span class="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                CNPJ Homologado SETEQ
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              📍 ${company.city}, AL • Setor: ${company.sector} • CNPJ: ${company.cnpj}
            </p>
          </div>

          <!-- Seletor Rápido de Empresa -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-semibold hidden sm:inline">Alternar Empresa:</span>
            <select id="select-active-company" class="text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 font-medium">
              ${allCompanies.map(c => `
                <option value="${c.id}" ${c.id === company.id ? 'selected' : ''}>${c.tradeName || c.name} (${c.city})</option>
              `).join('')}
            </select>
            <button id="btn-goto-new-job" class="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Publicar Vaga
            </button>
          </div>
        </div>

        <!-- Cards de Métricas de RH -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-medium">Vagas Publicadas</p>
            <p class="text-2xl font-black text-slate-900 mt-1">${jobs.length}</p>
            <p class="text-[11px] text-emerald-600 font-semibold mt-1">${activeJobs.length} ativas no momento</p>
          </div>

          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-medium">Total de Candidaturas</p>
            <p class="text-2xl font-black text-blue-900 mt-1">${companyApps.length}</p>
            <p class="text-[11px] text-blue-600 font-semibold mt-1">Intermediadas via SETEQ</p>
          </div>

          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-medium">Entrevistas Agendadas</p>
            <p class="text-2xl font-black text-amber-600 mt-1">${interviewsCount}</p>
            <p class="text-[11px] text-amber-700 font-semibold mt-1">Fase de avaliação técnica</p>
          </div>

          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-medium">Aderência Média IA</p>
            <p class="text-2xl font-black text-emerald-600 mt-1">91%</p>
            <p class="text-[11px] text-slate-500 font-medium mt-1">Triagem algorítmica ativa</p>
          </div>
        </div>

        <!-- Tabela de Vagas da Empresa -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-900">Vagas da Organização</h3>
            <span class="text-xs text-slate-400">${jobs.length} vaga(s) encontrada(s)</span>
          </div>

          ${jobs.length === 0 ? `
            <div class="p-8 text-center text-slate-500 text-xs">
              Sua empresa ainda não publicou nenhuma vaga. Clique em "+ Nova Vaga" para começar!
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600">
                <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th class="p-4">Cargo / Título</th>
                    <th class="p-4">Município (AL)</th>
                    <th class="p-4">Regime</th>
                    <th class="p-4">Candidatos</th>
                    <th class="p-4">Status</th>
                    <th class="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${jobs.map(job => {
                    const jobApps = companyApps.filter(a => a.jobId === job.id);
                    return `
                      <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4">
                          <p class="font-bold text-slate-900">${job.title}</p>
                          <p class="text-[10px] text-slate-400">CBO: ${job.cbo.split(' - ')[0] || job.cbo}</p>
                        </td>
                        <td class="p-4">${job.city}, AL</td>
                        <td class="p-4">${job.contractType} (${job.workModel})</td>
                        <td class="p-4">
                          <span class="inline-flex items-center gap-1 font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            👥 ${jobApps.length}
                          </span>
                        </td>
                        <td class="p-4">
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${job.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}">
                            ${job.status === 'active' ? '● Ativa' : '○ Pausada'}
                          </span>
                        </td>
                        <td class="p-4 text-right space-x-2">
                          <button data-job-id="${job.id}" class="btn-goto-kanban px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs transition-colors">
                            Triagem Kanban
                          </button>
                          <button data-job-id="${job.id}" class="btn-toggle-job-status px-2.5 py-1 text-slate-500 hover:text-slate-800 rounded-lg text-xs transition-colors">
                            ${job.status === 'active' ? 'Pausar' : 'Reativar'}
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    `;
  },

  attachDashboardEvents(onTabChange) {
    // Alternar empresa
    document.getElementById('select-active-company')?.addEventListener('change', (e) => {
      store.setCurrentCompany(e.target.value);
      Toast.show('Contexto da empresa atualizado', 'info');
      onTabChange('company-dashboard');
    });

    // Ir para nova vaga
    document.getElementById('btn-goto-new-job')?.addEventListener('click', () => {
      onTabChange('company-new-job');
    });

    // Ações na tabela
    document.querySelectorAll('.btn-goto-kanban').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        sessionStorage.setItem('kanban_selected_job', jobId);
        onTabChange('company-kanban');
      });
    });

    document.querySelectorAll('.btn-toggle-job-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        const job = store.getJob(jobId);
        if (job) {
          const newStatus = job.status === 'active' ? 'paused' : 'active';
          store.updateJob(jobId, { status: newStatus });
          Toast.show(`Vaga ${newStatus === 'active' ? 'reativada' : 'pausada'} com sucesso!`, 'info');
          onTabChange('company-dashboard');
        }
      });
    });
  },

  // --- 2. PIPELINE SELETIVO (KANBAN INTERATIVO) ---
  renderKanban(company) {
    const jobs = store.getJobs().filter(j => j.companyId === company.id);
    const savedJobId = sessionStorage.getItem('kanban_selected_job') || (jobs[0]?.id || '');
    const selectedJob = store.getJob(savedJobId) || jobs[0];

    const allApps = store.getApplications();
    const jobApps = selectedJob ? allApps.filter(a => a.jobId === selectedJob.id) : [];

    const columns = [
      { id: 'applied', label: '1. Novos Inscritos', color: 'border-blue-500' },
      { id: 'screening', label: '2. Triagem / Match IA', color: 'border-indigo-500' },
      { id: 'interview', label: '3. Entrevistas', color: 'border-amber-500' },
      { id: 'approved', label: '4. Aprovados / Oferta', color: 'border-emerald-500' },
      { id: 'rejected', label: '5. Banco Reserva / Dispensa', color: 'border-slate-400' }
    ];

    return `
      <div class="space-y-6 fade-in">
        
        <!-- Barra de Controle do Kanban -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-extrabold text-slate-900">Pipeline de Seleção (Quadro Kanban)</h2>
            <p class="text-xs text-slate-500 mt-0.5">Arraste ou mova os candidatos entre as etapas de recrutamento.</p>
          </div>

          <!-- Seletor de Vaga -->
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label class="text-xs font-semibold text-slate-600 whitespace-nowrap">Vaga Ativa:</label>
            <select id="select-kanban-job" class="w-full sm:w-72 text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 font-bold text-slate-800">
              ${jobs.map(j => `
                <option value="${j.id}" ${j.id === selectedJob?.id ? 'selected' : ''}>${j.title} (${j.city})</option>
              `).join('')}
            </select>
          </div>
        </div>

        ${!selectedJob ? `
          <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p class="text-sm font-bold text-slate-700">Nenhuma vaga cadastrada por esta empresa.</p>
          </div>
        ` : `
          <!-- Quadro de Colunas Kanban -->
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-4">
            ${columns.map(col => {
              const colApps = jobApps.filter(a => a.status === col.id);
              return `
                <div class="kanban-col bg-slate-100/90 rounded-2xl p-3 border-t-4 ${col.color} border-slate-200 flex flex-col" data-status="${col.id}">
                  
                  <div class="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/80">
                    <h4 class="text-xs font-bold text-slate-800">${col.label}</h4>
                    <span class="text-xs font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full shadow-2xs">
                      ${colApps.length}
                    </span>
                  </div>

                  <!-- Área de Cards Dropável -->
                  <div class="space-y-2.5 flex-1 min-h-[150px] kanban-cards-area" data-status="${col.id}">
                    ${colApps.length === 0 ? `
                      <div class="h-24 flex items-center justify-center text-slate-400 text-[11px] italic border-2 border-dashed border-slate-200 rounded-xl">
                        Nenhum candidato
                      </div>
                    ` : colApps.map(app => `
                      <div 
                        class="kanban-card bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2"
                        draggable="true" 
                        data-app-id="${app.id}">
                        
                        <div class="flex items-start justify-between gap-1">
                          <h5 class="text-xs font-bold text-slate-900 leading-tight">${app.candidateName}</h5>
                          <span class="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                            ${app.aiScore}%
                          </span>
                        </div>

                        <p class="text-[11px] text-slate-500">${app.jobTitle}</p>
                        
                        ${app.stageNotes ? `
                          <p class="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 line-clamp-2">
                            ${app.stageNotes}
                          </p>
                        ` : ''}

                        <!-- Ações Rápidas do Card -->
                        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <button data-app-id="${app.id}" class="btn-kanban-details text-blue-700 hover:underline font-semibold">
                            Ver Perfil
                          </button>

                          <div class="flex items-center gap-1">
                            <button data-app-id="${app.id}" data-action="prev" class="btn-move-stage px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-bold" title="Mover para etapa anterior">
                              ←
                            </button>
                            <button data-app-id="${app.id}" data-action="next" class="btn-move-stage px-1.5 py-0.5 bg-blue-100 hover:bg-blue-200 rounded text-blue-900 font-bold" title="Avançar etapa">
                              →
                            </button>
                          </div>
                        </div>

                      </div>
                    `).join('')}
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;
  },

  attachKanbanEvents(onTabChange) {
    const jobSelect = document.getElementById('select-kanban-job');
    jobSelect?.addEventListener('change', (e) => {
      sessionStorage.setItem('kanban_selected_job', e.target.value);
      onTabChange('company-kanban');
    });

    const statusOrder = ['applied', 'screening', 'interview', 'approved', 'rejected'];

    // Botões de avanço rápido de etapa
    document.querySelectorAll('.btn-move-stage').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const appId = btn.getAttribute('data-app-id');
        const action = btn.getAttribute('data-action');
        const app = store.getApplications().find(a => a.id === appId);
        if (!app) return;

        const currentIdx = statusOrder.indexOf(app.status);
        let targetIdx = action === 'next' ? currentIdx + 1 : currentIdx - 1;
        if (targetIdx >= 0 && targetIdx < statusOrder.length) {
          const nextStatus = statusOrder[targetIdx];
          
          if (nextStatus === 'interview') {
            CompanyView.openScheduleInterviewModal(app, () => onTabChange('company-kanban'));
          } else {
            store.updateApplicationStage(appId, nextStatus);
            Toast.show(`Candidato movido para nova fase`, 'success');
            onTabChange('company-kanban');
          }
        }
      });
    });

    // Detalhes do candidato
    document.querySelectorAll('.btn-kanban-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-app-id');
        const app = store.getApplications().find(a => a.id === appId);
        if (app) {
          CompanyView.openCandidateDetailsModal(app);
        }
      });
    });

    // Drag and Drop Nativo
    let draggedAppId = null;
    document.querySelectorAll('.kanban-card').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        draggedAppId = card.getAttribute('data-app-id');
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });
    });

    document.querySelectorAll('.kanban-col').forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
      });
      col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
      });
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const newStatus = col.getAttribute('data-status');
        if (draggedAppId && newStatus) {
          const app = store.getApplications().find(a => a.id === draggedAppId);
          if (app && app.status !== newStatus) {
            if (newStatus === 'interview') {
              CompanyView.openScheduleInterviewModal(app, () => onTabChange('company-kanban'));
            } else {
              store.updateApplicationStage(draggedAppId, newStatus);
              Toast.show(`Candidato movido para ${newStatus}`, 'success');
              onTabChange('company-kanban');
            }
          }
        }
      });
    });
  },

  openScheduleInterviewModal(app, onDone) {
    Modal.open({
      title: `Agendar Entrevista • ${app.candidateName}`,
      size: 'md',
      contentHtml: `
        <form id="form-schedule-interview" class="space-y-4 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Data e Horário da Entrevista *</label>
            <input type="datetime-local" id="interview-datetime" required class="w-full p-2.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Instruções / Link do Google Meet ou Endereço *</label>
            <textarea id="interview-instructions" rows="3" required placeholder="Ex: Entrevista online via Google Meet: meet.google.com/xyz ou comparecer à sede em Jaraguá com currículo impresso." class="w-full p-2.5 border border-slate-300 rounded-lg"></textarea>
          </div>
          <div class="text-[11px] text-slate-500 bg-blue-50 p-2.5 rounded-lg border border-blue-200">
            Uma notificação oficial será disparada instantaneamente para o painel do candidato no Empregos AL.
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="submit" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-all">
              Confirmar e Convocar Candidato
            </button>
          </div>
        </form>
      `,
      onRender: (container, close) => {
        container.querySelector('#form-schedule-interview')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const dt = container.querySelector('#interview-datetime')?.value;
          const notes = container.querySelector('#interview-instructions')?.value;
          store.updateApplicationStage(app.id, 'interview', notes, dt);
          Toast.show(`Entrevista agendada com sucesso!`, 'success');
          close();
          if (typeof onDone === 'function') onDone();
        });
      }
    });
  },

  openCandidateDetailsModal(app) {
    const candidate = store.getAllCandidates().find(c => c.id === app.candidateId) || store.getCandidateProfile();

    Modal.open({
      title: `Perfil do Candidato: ${candidate.fullName}`,
      size: 'lg',
      contentHtml: `
        <div class="space-y-4 text-xs">
          
          <div class="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 class="text-sm font-bold text-slate-900">${candidate.fullName}</h4>
              <p class="text-slate-500 mt-0.5">📍 ${candidate.city}, AL • ${candidate.targetRole || 'Profissional Cadastrado'}</p>
              <p class="text-slate-600 mt-1 font-semibold">Contato: ${candidate.phone || '(82) 99654-3210'} • ${candidate.email}</p>
            </div>
            <div class="text-right">
              <span class="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                Score IA: ${app.aiScore || 90}%
              </span>
              <p class="text-[10px] text-slate-400 mt-1">Conformidade LGPD Ativa</p>
            </div>
          </div>

          ${candidate.summary ? `
            <div>
              <h5 class="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Resumo das Qualificações</h5>
              <p class="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">${candidate.summary}</p>
            </div>
          ` : ''}

          <div>
            <h5 class="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">Competências Identificadas</h5>
            <div class="flex flex-wrap gap-1.5">
              ${(candidate.hardSkills || []).map(s => `
                <span class="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">${s}</span>
              `).join('')}
            </div>
          </div>

        </div>
      `
    });
  },

  // --- 3. BANCO DE TALENTOS (BUSCA ATIVA) ---
  renderTalentSearch(company) {
    const candidates = store.getAllCandidates();

    return `
      <div class="space-y-6 fade-in">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-xl font-extrabold text-slate-900">Banco de Talentos SETEQ Alagoas</h2>
          <p class="text-xs text-slate-500 mt-1">Busque proativamente profissionais cadastrados em todo o estado de Alagoas que autorizaram intermediação conforme a LGPD.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${candidates.map(cand => `
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover-lift flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">${cand.fullName}</h4>
                    <p class="text-xs text-blue-900 font-semibold">${cand.targetRole || 'Profissional'}</p>
                  </div>
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">📍 ${cand.city || 'Maceió'}</span>
                </div>

                <p class="text-xs text-slate-500 mt-2 line-clamp-2">
                  ${cand.summary || 'Profissional com cadastro homologado junto à SETEQ para processos seletivos.'}
                </p>

                <div class="flex flex-wrap gap-1 mt-3">
                  ${(cand.hardSkills || []).slice(0, 3).map(s => `
                    <span class="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">${s}</span>
                  `).join('')}
                </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-slate-100 mt-4 text-xs">
                <span class="text-emerald-700 font-bold text-[11px]">Disponível para Contato</span>
                <button data-cand-id="${cand.id}" class="btn-invite-cand px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs transition-colors">
                  Convidar para Vaga
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  attachTalentEvents() {
    document.querySelectorAll('.btn-invite-cand').forEach(btn => {
      btn.addEventListener('click', () => {
        Toast.show('Convite formal enviado com sucesso ao candidato via SETEQ!', 'success');
      });
    });
  },

  // --- 4. FORMULÁRIO DE NOVA VAGA COM ASSISTENTE DE IA ---
  renderNewJobForm(company) {
    return `
      <div class="space-y-6 fade-in max-w-4xl mx-auto">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Publicar Nova Vaga de Emprego</h2>
            <p class="text-xs text-slate-500 mt-1">Preenchimento assistido por Inteligência Artificial e alinhado aos padrões CBO/MTE.</p>
          </div>
          <span class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            ${company.tradeName || company.name}
          </span>
        </div>

        <form id="form-new-job" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          
          <!-- Título + Assistente de IA -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="font-bold text-xs text-slate-800">Título do Cargo / Oportunidade *</label>
              <button type="button" id="btn-ai-fill-job" class="text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 flex items-center gap-1.5 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Preencher Requisitos com IA
              </button>
            </div>
            <input type="text" id="job-title" placeholder="Ex: Desenvolvedor Front-End, Recepcionista, Técnico de Enfermagem..." required class="w-full p-2.5 border border-slate-300 rounded-lg text-xs">
          </div>

          <!-- Grade de Informações Operacionais -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Município de Alagoas *</label>
              <select id="job-city" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                ${ALAGOAS_CITIES.map(c => `
                  <option value="${c}" ${c === company.city ? 'selected' : ''}>${c}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Modalidade *</label>
              <select id="job-model" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Tipo de Contrato *</label>
              <select id="job-contract" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                <option value="CLT">CLT (Efetivo)</option>
                <option value="Estágio">Estágio</option>
                <option value="Jovem Aprendiz">Jovem Aprendiz</option>
                <option value="PJ">PJ / Prestador</option>
                <option value="Temporário">Temporário</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Quantidade de Vagas *</label>
              <input type="number" id="job-vacancies" min="1" value="1" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <!-- CBO e Categoria -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Código CBO (Ocupação SINE) *</label>
              <input type="text" id="job-cbo" value="3171-10 - Programador de Sistemas de Informação" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Setor / Categoria</label>
              <select id="job-category" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                ${JOB_CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Salário & Escolaridade -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Faixa Salarial Exibida *</label>
              <input type="text" id="job-salary" value="R$ 3.500,00 a R$ 4.500,00" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Escolaridade Mínima</label>
              <input type="text" id="job-education" value="Superior Completo ou Cursando" class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <!-- Descrição da Vaga -->
          <div class="text-xs">
            <label class="font-bold text-slate-700 block mb-1">Descrição e Atribuições *</label>
            <textarea id="job-description" rows="4" required class="w-full p-3 border border-slate-300 rounded-lg leading-relaxed"></textarea>
          </div>

          <!-- Requisitos Obrigatórios (separados por vírgula) -->
          <div class="text-xs">
            <label class="font-bold text-slate-700 block mb-1">Competências e Requisitos Técnicos (separados por vírgula) *</label>
            <input type="text" id="job-skills" placeholder="Ex: React, JavaScript, Git, Atendimento, Excel..." class="w-full p-2.5 border border-slate-300 rounded-lg">
          </div>

          <!-- Benefícios (separados por vírgula) -->
          <div class="text-xs">
            <label class="font-bold text-slate-700 block mb-1">Benefícios Oferecidos (separados por vírgula)</label>
            <input type="text" id="job-benefits" value="Vale Refeição, Vale Transporte, Plano de Saúde" class="w-full p-2.5 border border-slate-300 rounded-lg">
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="submit" class="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Publicar Vaga no Empregos AL
            </button>
          </div>

        </form>

      </div>
    `;
  },

  attachNewJobEvents(onTabChange) {
    // Botão de auto-preenchimento com IA
    document.getElementById('btn-ai-fill-job')?.addEventListener('click', () => {
      const title = document.getElementById('job-title')?.value || '';
      if (!title) {
        Toast.show('Digite pelo menos o título do cargo para que a IA possa sugerir!', 'warning');
        return;
      }

      const template = AIEngine.suggestJobTemplate(title);
      document.getElementById('job-cbo').value = template.cbo;
      document.getElementById('job-category').value = template.category;
      document.getElementById('job-education').value = template.educationLevel;
      document.getElementById('job-description').value = template.descriptionTemplate;
      document.getElementById('job-skills').value = template.requiredSkills.join(', ');
      Toast.show('Campos preenchidos com sugestões inteligentes de IA!', 'success');
    });

    // Submissão do formulário
    document.getElementById('form-new-job')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const skillsRaw = document.getElementById('job-skills')?.value || '';
      const benefitsRaw = document.getElementById('job-benefits')?.value || '';

      const newJobData = {
        title: document.getElementById('job-title')?.value,
        city: document.getElementById('job-city')?.value,
        workModel: document.getElementById('job-model')?.value,
        contractType: document.getElementById('job-contract')?.value,
        vacanciesCount: Number(document.getElementById('job-vacancies')?.value) || 1,
        cbo: document.getElementById('job-cbo')?.value,
        category: document.getElementById('job-category')?.value,
        salaryDisplay: document.getElementById('job-salary')?.value,
        educationLevel: document.getElementById('job-education')?.value,
        description: document.getElementById('job-description')?.value,
        requiredSkills: skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
        benefits: benefitsRaw.split(',').map(b => b.trim()).filter(Boolean)
      };

      store.createJob(newJobData);
      Toast.show('Vaga publicada com sucesso e já disponível para os cidadãos alagoanos!', 'success');
      onTabChange('company-dashboard');
    });
  }
};
