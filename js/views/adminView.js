/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo Administrativo e de Governança (SETEQ / SINE Alagoas)
 */

import { store } from '../store.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const AdminView = {
  render(activeTab = 'admin-dashboard') {
    if (activeTab === 'admin-companies') {
      return this.renderCompanyValidation();
    }
    if (activeTab === 'admin-jobs') {
      return this.renderJobModeration();
    }
    if (activeTab === 'admin-audit') {
      return this.renderAuditLogs();
    }

    // Default: 'admin-dashboard' (Painel Executivo)
    return this.renderExecutiveDashboard();
  },

  // --- 1. PAINEL EXECUTIVO & INDICADORES ESTADUAIS ---
  renderExecutiveDashboard() {
    const indicators = store.getIndicators();
    const companies = store.getCompanies();
    const jobs = store.getJobs();
    const applications = store.getApplications();

    return `
      <div class="space-y-6 fade-in">
        
        <!-- Faixa de Controle Governamental -->
        <div class="bg-gradient-to-r from-red-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Painel Estratégico SETEQ • Gestão 2026
            </span>
            <h2 class="text-2xl font-black mt-2">Observatório da Empregabilidade de Alagoas</h2>
            <p class="text-xs text-slate-300 mt-1">
              Consolidação de dados do Sistema Nacional de Emprego (SINE/IMO) e intermediação digital estadual.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              Sistema Operando 100%
            </span>
          </div>
        </div>

        <!-- Indicadores Chave de Desempenho (KPIs) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-semibold">Cidadãos Cadastrados</p>
            <p class="text-3xl font-black text-slate-900 mt-1">${indicators.totalCandidates.toLocaleString('pt-BR')}</p>
            <p class="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14% neste trimestre</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-semibold">Vagas no Estado</p>
            <p class="text-3xl font-black text-blue-900 mt-1">${jobs.length}</p>
            <p class="text-[11px] text-slate-500 font-semibold mt-1">Em ${indicators.municipalitiesCovered} municípios de AL</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-semibold">Empresas Credenciadas</p>
            <p class="text-3xl font-black text-slate-900 mt-1">${companies.length}</p>
            <p class="text-[11px] text-indigo-600 font-semibold mt-1">Homologadas pela SETEQ</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs text-slate-500 font-semibold">Colocações Efetivadas</p>
            <p class="text-3xl font-black text-emerald-600 mt-1">${indicators.placedWorkers}</p>
            <p class="text-[11px] text-emerald-700 font-semibold mt-1">${indicators.pcdPlaced} vagas afirmativas PCD</p>
          </div>
        </div>

        <!-- Distribuição por Municípios e Setores Econômicos -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Distribuição Territorial em Alagoas -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-sm font-bold text-slate-900">Distribuição Territorial das Vagas (Alagoas)</h3>
              <span class="text-xs text-slate-400">Dados SINE-AL</span>
            </div>

            <div class="space-y-3">
              ${indicators.cityDistribution.map(item => `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-slate-800">${item.city}</span>
                    <span class="text-slate-500">${item.vacancies} vagas (${item.percentage}%)</span>
                  </div>
                  <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-800 rounded-full" style="width: ${item.percentage}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Distribuição por Setor Produtivo -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-sm font-bold text-slate-900">Demanda por Setor Econômico</h3>
              <span class="text-xs text-slate-400">CAGED & IMO</span>
            </div>

            <div class="space-y-3">
              ${indicators.sectorDistribution.map(item => `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-slate-800">${item.sector}</span>
                    <span class="text-slate-500">${item.percentage}% do total</span>
                  </div>
                  <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-red-600 rounded-full" style="width: ${item.percentage}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  },

  // --- 2. HOMOLOGAÇÃO CADASTRAL DE EMPRESAS ---
  renderCompanyValidation() {
    const companies = store.getCompanies();

    return `
      <div class="space-y-6 fade-in">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Homologação e Validação Cadastral de Empresas</h2>
            <p class="text-xs text-slate-500 mt-1">Conformidade com os padrões do Ministério do Trabalho e Emprego (MTE) para coibir anúncios falsos e fraudes.</p>
          </div>
          <span class="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">
            ${companies.length} empresa(s) cadastradas
          </span>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th class="p-4">Razão Social / Fantasia</th>
                  <th class="p-4">CNPJ</th>
                  <th class="p-4">Sede / Município</th>
                  <th class="p-4">Ramo / Setor</th>
                  <th class="p-4">Status Cadastral</th>
                  <th class="p-4 text-right">Ação SETEQ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${companies.map(comp => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="p-4">
                      <p class="font-bold text-slate-900">${comp.tradeName || comp.name}</p>
                      <p class="text-[10px] text-slate-400">${comp.name}</p>
                    </td>
                    <td class="p-4 font-mono font-medium">${comp.cnpj}</td>
                    <td class="p-4">${comp.city}, AL</td>
                    <td class="p-4">${comp.sector}</td>
                    <td class="p-4">
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        comp.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        comp.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-rose-100 text-rose-800 border border-rose-200'
                      }">
                        ${comp.status === 'approved' ? '✓ Homologada' : comp.status === 'pending' ? '⏳ Aguardando Validação' : '✕ Bloqueada'}
                      </span>
                    </td>
                    <td class="p-4 text-right space-x-1.5">
                      ${comp.status !== 'approved' ? `
                        <button data-comp-id="${comp.id}" data-action="approved" class="btn-verify-company px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors">
                          Homologar
                        </button>
                      ` : ''}
                      ${comp.status !== 'rejected' ? `
                        <button data-comp-id="${comp.id}" data-action="rejected" class="btn-verify-company px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-xs transition-colors">
                          Bloquear
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  attachCompanyValidationEvents(onTabChange) {
    document.querySelectorAll('.btn-verify-company').forEach(btn => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-comp-id');
        const status = btn.getAttribute('data-action');
        store.verifyCompany(compId, status);
        Toast.show(`Status da empresa atualizado com sucesso!`, 'success');
        onTabChange('admin-companies');
      });
    });
  },

  // --- 3. MODERAÇÃO DE VAGAS ---
  renderJobModeration() {
    const jobs = store.getJobs();

    return `
      <div class="space-y-6 fade-in">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Moderação de Vagas Estaduais</h2>
            <p class="text-xs text-slate-500 mt-1">Inspeção e conformidade legal das oportunidades anunciadas no portal Empregos AL.</p>
          </div>
          <span class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            ${jobs.length} vaga(s) ativas
          </span>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th class="p-4">Cargo Anunciado</th>
                  <th class="p-4">Empresa Anunciante</th>
                  <th class="p-4">Município</th>
                  <th class="p-4">Remuneração</th>
                  <th class="p-4">CBO Registrado</th>
                  <th class="p-4 text-right">Moderação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${jobs.map(job => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="p-4 font-bold text-slate-900">${job.title}</td>
                    <td class="p-4">${job.companyName}</td>
                    <td class="p-4">${job.city}, AL</td>
                    <td class="p-4 font-semibold text-emerald-700">${job.salaryDisplay}</td>
                    <td class="p-4 font-mono text-[11px] text-slate-500">${job.cbo}</td>
                    <td class="p-4 text-right space-x-1.5">
                      <button data-job-id="${job.id}" data-action="approved" class="btn-moderate-job px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-bold text-xs">
                        Aprovar
                      </button>
                      <button data-job-id="${job.id}" data-action="flagged" class="btn-moderate-job px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md font-bold text-xs">
                        Suspender
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  attachJobModerationEvents(onTabChange) {
    document.querySelectorAll('.btn-moderate-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        const action = btn.getAttribute('data-action');
        store.moderateJob(jobId, action);
        Toast.show(`Vaga #${jobId} moderada como "${action}"`, 'info');
      });
    });
  },

  // --- 4. TRILHA DE AUDITORIA LGPD ---
  renderAuditLogs() {
    const logs = store.getAuditLogs();

    return `
      <div class="space-y-6 fade-in">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-extrabold text-slate-900">Trilha de Auditoria e Conformidade LGPD</h2>
              <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                Lei 13.709/2018
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Registro imutável de operações, acessos a currículos e consentimentos para auditoria governamental.</p>
          </div>

          <button id="btn-export-audit-log" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Exportar Relatório LGPD (JSON)
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th class="p-4">Carimbo de Data/Hora</th>
                  <th class="p-4">Usuário / Ator</th>
                  <th class="p-4">Ação Realizada</th>
                  <th class="p-4">Detalhamento da Operação</th>
                  <th class="p-4">Base Legal (LGPD)</th>
                  <th class="p-4">IP</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                ${logs.map(log => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="p-4 text-slate-500 whitespace-nowrap">${new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                    <td class="p-4 font-sans font-bold text-slate-800">${log.actorName}</td>
                    <td class="p-4 font-sans font-semibold text-blue-900">${log.action}</td>
                    <td class="p-4 font-sans text-slate-600 max-w-xs truncate" title="${log.details}">${log.details}</td>
                    <td class="p-4 font-sans text-emerald-800 bg-emerald-50/40">${log.legalBasis}</td>
                    <td class="p-4 text-slate-400">${log.ipAddress}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  attachAuditEvents() {
    document.getElementById('btn-export-audit-log')?.addEventListener('click', () => {
      const logs = store.getAuditLogs();
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_auditoria_lgpd_seteq_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      Toast.show('Relatório de auditoria LGPD exportado com sucesso!', 'success');
    });
  }
};
