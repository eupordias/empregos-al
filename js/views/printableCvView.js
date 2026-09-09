/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Modelo Oficial de Currículo Padronizado SETEQ / IMO / MTE
 * Preparado para visualização em tela e exportação direta em PDF via impressão.
 */

import { store } from '../store.js';

export const PrintableCvView = {
  render() {
    const candidate = store.getCandidateProfile();

    return `
      <div class="space-y-6 fade-in max-w-4xl mx-auto">
        
        <!-- Barra de Ações Superior (Ocultada na Impressão) -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between no-print">
          <div class="flex items-center gap-2">
            <button id="btn-back-from-cv" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors">
              ← Voltar ao Portal
            </button>
            <span class="text-xs text-slate-500 font-medium">Currículo Digital Padronizado SETEQ / Alagoas</span>
          </div>

          <button id="btn-trigger-print" class="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Imprimir / Salvar em PDF
          </button>
        </div>

        <!-- Documento Oficial Impresso (Container visível na impressão) -->
        <div id="printable-cv-container" class="bg-white p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-md text-slate-800 space-y-6">
          
          <!-- Cabeçalho Oficial do Governo de Alagoas -->
          <div class="border-b-2 border-slate-900 pb-5">
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-slate-200 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-blue-700 inline-block"></span>
                  <span class="text-xs uppercase font-extrabold tracking-widest text-slate-900">ESTADO DE ALAGOAS</span>
                </div>
                <h1 class="text-xl font-black uppercase text-slate-900 mt-1">SETEQ • Secretaria do Trabalho, Emprego e Qualificação</h1>
                <p class="text-[11px] text-slate-500 uppercase font-semibold">Sistema Público de Intermediação de Mão de Obra (IMO) / SINE Alagoas</p>
              </div>

              <div class="text-right text-[10px] font-mono text-slate-400">
                <p>AUTENTICAÇÃO DIGITAL</p>
                <p class="font-bold text-slate-700 mt-0.5">AL-SETEQ-2026-${candidate.id.toUpperCase()}</p>
                <p>Emissão: ${new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <!-- Dados Pessoais do Trabalhador -->
          <div class="space-y-1">
            <h2 class="text-2xl font-black text-slate-900">${candidate.fullName}</h2>
            <p class="text-sm font-bold text-blue-900">${candidate.targetRole || 'Profissional'}</p>
            
            <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600 pt-2">
              <span><strong>Município:</strong> ${candidate.city} - AL (${candidate.neighborhood})</span>
              <span><strong>E-mail:</strong> ${candidate.email}</span>
              <span><strong>Telefone:</strong> ${candidate.phone}</span>
              <span><strong>Pretensão:</strong> ${candidate.expectedSalary}</span>
            </div>
          </div>

          <!-- 1. Resumo Profissional -->
          <div class="space-y-2 pt-2">
            <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              1. Resumo das Qualificações
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed text-justify">
              ${candidate.summary}
            </p>
          </div>

          <!-- 2. Formação Acadêmica -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              2. Formação Acadêmica & Escolaridade
            </h3>
            <div class="space-y-2">
              ${(candidate.academicList || []).map(acad => `
                <div class="text-xs">
                  <div class="flex justify-between font-bold text-slate-800">
                    <span>${acad.degree}</span>
                    <span class="text-slate-500">${acad.startYear} - ${acad.endYear} (${acad.status})</span>
                  </div>
                  <p class="text-slate-600">${acad.institution}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. Experiência Profissional -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              3. Histórico Profissional
            </h3>
            <div class="space-y-3">
              ${(candidate.experienceList || []).map(exp => `
                <div class="text-xs space-y-1">
                  <div class="flex justify-between font-bold text-slate-800">
                    <span>${exp.role} • <span class="text-blue-900">${exp.company}</span></span>
                    <span class="text-slate-500">${exp.startDate} a ${exp.endDate}</span>
                  </div>
                  <p class="text-slate-500 text-[11px]">Local: ${exp.city}</p>
                  <p class="text-slate-700 text-justify leading-relaxed">${exp.description}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 4. Competências & Cursos -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="space-y-2">
              <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                4. Competências Técnicas
              </h3>
              <div class="flex flex-wrap gap-1.5 text-[11px]">
                ${(candidate.hardSkills || []).map(s => `
                  <span class="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium border border-slate-200">${s}</span>
                `).join('')}
              </div>
            </div>

            <div class="space-y-2">
              <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                5. Cursos Complementares
              </h3>
              <ul class="text-xs text-slate-700 space-y-1">
                ${(candidate.coursesList || []).map(c => `
                  <li>• <strong>${c.title}</strong> (${c.issuer}, ${c.year})</li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- Rodapé de Conformidade Governamental -->
          <div class="pt-6 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
            <p>Documento padronizado emitido eletronicamente pela Plataforma EMPREGOS AL (SETEQ / Governo de Alagoas).</p>
            <p class="font-semibold">Conforme Lei Geral de Proteção de Dados (LGPD 13.709/18)</p>
          </div>

        </div>

      </div>
    `;
  },

  attachEvents(onTabChange) {
    document.getElementById('btn-back-from-cv')?.addEventListener('click', () => {
      onTabChange('profile');
    });

    document.getElementById('btn-trigger-print')?.addEventListener('click', () => {
      window.print();
    });
  }
};
