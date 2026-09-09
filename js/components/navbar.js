/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Componente Navbar Unificado e Alternador de Perfis
 */

import { store } from '../store.js';
import { Modal } from './modal.js';
import { Toast } from './toast.js';

export const Navbar = {
  render(activeTab = 'jobs') {
    const role = store.getRole();
    const unreadCount = store.getUnreadNotificationsCount();
    const candidate = store.getCandidateProfile();
    const company = store.getCurrentCompany();

    // Abas de acordo com o perfil ativo
    let navTabs = [];
    if (role === 'candidate') {
      const appCount = store.getApplications().filter(a => a.candidateId === candidate.id).length;
      navTabs = [
        { id: 'jobs', label: 'Explorar Vagas', icon: 'briefcase' },
        { id: 'applications', label: `Minhas Candidaturas ${appCount > 0 ? `(${appCount})` : ''}`, icon: 'check-circle' },
        { id: 'profile', label: 'Meu Currículo', icon: 'file-text' },
        { id: 'saved', label: 'Vagas Salvas', icon: 'bookmark' },
        { id: 'insights', label: 'IA & Mercado AL', icon: 'sparkles' }
      ];
    } else if (role === 'company') {
      navTabs = [
        { id: 'company-dashboard', label: 'Minhas Vagas', icon: 'layout' },
        { id: 'company-kanban', label: 'Processo Seletivo (Kanban)', icon: 'columns' },
        { id: 'company-talents', label: 'Banco de Talentos', icon: 'users' },
        { id: 'company-new-job', label: '+ Nova Vaga (IA)', icon: 'plus-circle' }
      ];
    } else {
      // SETEQ / Admin
      navTabs = [
        { id: 'admin-dashboard', label: 'Painel Executivo', icon: 'bar-chart-2' },
        { id: 'admin-companies', label: 'Homologação de Empresas', icon: 'shield-check' },
        { id: 'admin-jobs', label: 'Moderação de Vagas', icon: 'list' },
        { id: 'admin-audit', label: 'Trilha de Auditoria LGPD', icon: 'lock' }
      ];
    }

    return `
      <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        
        <!-- Faixa Institucional do Governo de Alagoas -->
        <div class="bg-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 font-medium tracking-wide">
              <span class="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              GOVERNO DE ALAGOAS
            </span>
            <span class="text-slate-400 hidden sm:inline">•</span>
            <span class="text-slate-300 font-normal hidden sm:inline">SETEQ – Secretaria do Trabalho, Emprego e Qualificação</span>
            <span class="text-slate-400 hidden md:inline">•</span>
            <span class="text-emerald-400 font-medium hidden md:inline">SINE / IMO Nacional Integrado</span>
          </div>

          <div class="flex items-center gap-3 text-slate-300">
            <span class="inline-flex items-center gap-1 text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              LGPD em Conformidade
            </span>
            <button id="btn-reset-data" class="hover:text-amber-300 text-[11px] underline underline-offset-2 transition-colors" title="Restaurar dados de demonstração da plataforma">
              Resetar Dados Demo
            </button>
          </div>
        </div>

        <!-- Barra Principal: Logo + Alternador de Perfis + Ações -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 gap-4">
            
            <!-- Logo Oficial -->
            <div class="flex items-center gap-3 cursor-pointer" id="nav-logo-btn">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-indigo-950 flex items-center justify-center text-white font-extrabold shadow-md border-b-2 border-red-600">
                <span class="text-base tracking-tighter">AL</span>
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-lg font-black tracking-tight text-slate-900">EMPREGOS</span>
                  <span class="text-xs font-black bg-red-600 text-white px-1.5 py-0.5 rounded">AL</span>
                </div>
                <p class="text-[10px] uppercase font-semibold text-blue-900 tracking-wider">SETEQ • Intermediação de Mão de Obra</p>
              </div>
            </div>

            <!-- Alternador de Papéis (Role Switcher) -->
            <div class="bg-slate-100 p-1 rounded-xl border border-slate-200 hidden md:flex items-center text-xs font-semibold text-slate-600">
              <button data-role="candidate" class="role-switch-btn px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${role === 'candidate' ? 'bg-white text-blue-800 shadow-sm font-bold' : 'hover:text-slate-900'}">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Cidadão
              </button>
              
              <button data-role="company" class="role-switch-btn px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${role === 'company' ? 'bg-white text-blue-800 shadow-sm font-bold' : 'hover:text-slate-900'}">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Empresa Parceira
              </button>

              <button data-role="admin" class="role-switch-btn px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${role === 'admin' ? 'bg-white text-red-800 shadow-sm font-bold' : 'hover:text-slate-900'}">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Gestor SETEQ
              </button>
            </div>

            <!-- Ações Direita: Notificações + Perfil Ativo -->
            <div class="flex items-center gap-2">
              
              <!-- Seletor Mobile de Papel -->
              <select id="mobile-role-select" class="md:hidden text-xs border border-slate-300 rounded-lg p-1.5 bg-white font-medium">
                <option value="candidate" ${role === 'candidate' ? 'selected' : ''}>Cidadão</option>
                <option value="company" ${role === 'company' ? 'selected' : ''}>Empresa</option>
                <option value="admin" ${role === 'admin' ? 'selected' : ''}>SETEQ AL</option>
              </select>

              <!-- Botão Notificações -->
              <button id="btn-notifications" class="relative p-2 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors" title="Notificações">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                ${unreadCount > 0 ? `
                  <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    ${unreadCount}
                  </span>
                ` : ''}
              </button>

              <!-- Seção do Usuário Ativo -->
              ${role === 'candidate' ? `
                <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center border border-blue-200">
                    ME
                  </div>
                  <div class="hidden lg:block text-left text-xs">
                    <p class="font-bold text-slate-800 leading-tight">Maria Eduarda</p>
                    <p class="text-[10px] text-slate-500">Maceió - AL</p>
                  </div>
                  <button id="btn-print-cv-quick" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Imprimir CV SETEQ
                  </button>
                </div>
              ` : role === 'company' ? `
                <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                    🏢
                  </div>
                  <div class="hidden lg:block text-left text-xs">
                    <p class="font-bold text-slate-800 leading-tight">${company.tradeName || company.name}</p>
                    <p class="text-[10px] text-emerald-600 font-medium">CNPJ Homologado</p>
                  </div>
                </div>
              ` : `
                <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div class="w-8 h-8 rounded-lg bg-red-100 text-red-800 font-bold text-xs flex items-center justify-center border border-red-200">
                    🏛️
                  </div>
                  <div class="hidden lg:block text-left text-xs">
                    <p class="font-bold text-slate-800 leading-tight">Auditoria & Gestão</p>
                    <p class="text-[10px] text-red-600 font-bold">SETEQ / ALAGOAS</p>
                  </div>
                </div>
              `}

            </div>
          </div>

          <!-- Abas de Navegação Inferior -->
          <nav class="flex space-x-1 sm:space-x-4 border-t border-slate-100 overflow-x-auto py-2 text-xs font-semibold">
            ${navTabs.map(tab => `
              <button 
                data-tab="${tab.id}" 
                class="nav-tab-btn flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-xs' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}">
                ${tab.label}
              </button>
            `).join('')}
          </nav>

        </div>
      </header>
    `;
  },

  attachEvents(onTabChange) {
    // Alternância de abas
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        if (tabId && typeof onTabChange === 'function') {
          onTabChange(tabId);
        }
      });
    });

    // Alternância de papéis (desktop)
    document.querySelectorAll('.role-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newRole = btn.getAttribute('data-role');
        if (newRole) {
          store.setRole(newRole);
          Toast.show(`Alternado para perfil: ${newRole === 'candidate' ? 'Cidadão' : newRole === 'company' ? 'Empresa Parceira' : 'Gestor SETEQ'}`, 'info');
        }
      });
    });

    // Alternância de papéis (mobile)
    document.getElementById('mobile-role-select')?.addEventListener('change', (e) => {
      const newRole = e.target.value;
      store.setRole(newRole);
      Toast.show(`Alternado para perfil: ${newRole}`, 'info');
    });

    // Clique no Logo retorna para aba inicial
    document.getElementById('nav-logo-btn')?.addEventListener('click', () => {
      const role = store.getRole();
      if (role === 'candidate') onTabChange('jobs');
      else if (role === 'company') onTabChange('company-dashboard');
      else onTabChange('admin-dashboard');
    });

    // Quick print CV
    document.getElementById('btn-print-cv-quick')?.addEventListener('click', () => {
      onTabChange('print-cv');
    });

    // Resetar dados demo
    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Deseja reiniciar a base com os dados iniciais do Governo de Alagoas?')) {
        store.resetAll();
        Toast.show('Dados restaurados com sucesso!', 'success');
      }
    });

    // Modal de notificações
    document.getElementById('btn-notifications')?.addEventListener('click', () => {
      this.openNotificationsModal();
    });
  },

  openNotificationsModal() {
    const notifs = store.getNotifications();
    Modal.open({
      title: 'Central de Notificações Governamentais',
      size: 'md',
      contentHtml: `
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>Alertas sobre candidaturas, vagas e mensagens da SETEQ</span>
            <button id="btn-mark-all-read" class="text-blue-700 hover:underline font-semibold">Marcar todas como lidas</button>
          </div>
          ${notifs.length === 0 ? `
            <p class="text-center text-slate-400 py-6 text-sm">Nenhuma notificação no momento.</p>
          ` : notifs.map(n => `
            <div class="p-3 rounded-xl border ${n.read ? 'bg-slate-50 border-slate-200' : 'bg-blue-50/70 border-blue-200'} transition-all">
              <div class="flex items-start justify-between gap-2">
                <h4 class="text-sm font-bold text-slate-900">${n.title}</h4>
                <span class="text-[10px] text-slate-400 whitespace-nowrap">${new Date(n.timestamp).toLocaleDateString('pt-BR')}</span>
              </div>
              <p class="text-xs text-slate-600 mt-1">${n.message}</p>
            </div>
          `).join('')}
        </div>
      `,
      onRender: (container) => {
        container.querySelector('#btn-mark-all-read')?.addEventListener('click', () => {
          store.markAllNotificationsRead();
          Toast.show('Todas as notificações marcadas como lidas', 'info');
          Modal.close();
        });
      }
    });
  }
};
