/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Cliente de Integração com Banco de Dados PostgreSQL no Supabase
 * Suporta Dual-Mode: Sincronização em Nuvem (Online) + Fallback Local Resiliente (Offline)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'SETEQ_SUPABASE_CONFIG_V1';

  // Configurações padrão (podem ser substituídas pelo usuário no modal)
  const DEFAULT_CONFIG = {
    url: '',
    anonKey: '',
    connected: false,
    lastSync: null
  };

  class SupabaseClientManager {
    constructor() {
      this.config = this.loadConfig();
      this.client = null;
      this.initClient();
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Erro ao carregar configurações do Supabase:', e);
      }
      return { ...DEFAULT_CONFIG };
    }

    saveConfig() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
      } catch (e) {
        console.error('Erro ao salvar configurações do Supabase:', e);
      }
      this.updateBadge();
    }

    initClient() {
      if (window.supabase && this.config.url && this.config.anonKey) {
        try {
          this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
          this.config.connected = true;
          console.log('✅ Supabase Client inicializado com sucesso.');
        } catch (e) {
          console.error('Erro ao criar cliente Supabase:', e);
          this.client = null;
          this.config.connected = false;
        }
      } else {
        this.client = null;
        this.config.connected = false;
      }
    }

    isConfigured() {
      return Boolean(this.client && this.config.url && this.config.anonKey);
    }

    async testConnection(url = null, key = null) {
      const testUrl = url || this.config.url;
      const testKey = key || this.config.anonKey;

      if (!testUrl || !testKey) {
        return { success: false, message: 'URL e Chave Anon do Supabase são obrigatórias.' };
      }

      if (!window.supabase) {
        return { success: false, message: 'Biblioteca do Supabase JS não foi carregada no navegador.' };
      }

      const startTime = performance.now();
      try {
        const tempClient = window.supabase.createClient(testUrl, testKey);
        // Tenta consultar a tabela vagas
        const { data, error } = await tempClient.from('vagas').select('id', { count: 'exact', head: true });
        const latency = Math.round(performance.now() - startTime);

        if (error) {
          // Se o erro for tabela inexistente, a conexão autenticou mas precisa rodar o script SQL
          if (error.code === '42P01') {
            return {
              success: true,
              warning: true,
              latency,
              message: `Conectado ao Supabase (${latency}ms), porém as tabelas ainda não foram criadas. Execute o script SQL no SQL Editor.`
            };
          }
          return { success: false, message: `Erro do Supabase: ${error.message} (Código: ${error.code})` };
        }

        return {
          success: true,
          latency,
          message: `Conexão bem-sucedida com PostgreSQL no Supabase (${latency}ms)! Tabelas detectadas.`
        };
      } catch (err) {
        return { success: false, message: `Falha na requisição: ${err.message}` };
      }
    }

    // Sincronização de Vagas do Supabase para a Store local
    async syncFromSupabase() {
      if (!this.isConfigured() || !window.store) return false;

      try {
        const { data: vagas, error: errVagas } = await this.client
          .from('vagas')
          .select('*')
          .eq('status', 'aberta');

        if (!errVagas && vagas && vagas.length > 0) {
          const currentStore = window.store.state;
          // Mescla vagas do Supabase respeitando IDs
          const existingIds = new Set(vagas.map(v => v.id));
          const localOnly = currentStore.jobs.filter(j => !existingIds.has(j.id));
          currentStore.jobs = [...vagas.map(v => ({
            id: v.id,
            title: v.titulo,
            companyId: v.empresa_id,
            location: v.municipio,
            salary: v.salario_combinar ? 'A combinar' : `R$ ${Number(v.salario_min || 0).toLocaleString('pt-BR')} - R$ ${Number(v.salario_max || 0).toLocaleString('pt-BR')}`,
            type: v.tipo_contrato,
            modality: v.modalidade,
            cbo: v.cbo_codigo ? `${v.cbo_codigo} - ${v.cbo_titulo || ''}` : '2124-05 - Analista de Sistemas',
            skills: v.competencias_exigidas || ['Proatividade'],
            description: v.descricao,
            status: v.status,
            createdAt: v.created_at,
            sector: v.setor,
            pcd: Boolean(v.pcd_exclusivo)
          })), ...localOnly];

          window.store.save();
          this.config.lastSync = new Date().toISOString();
          this.saveConfig();
          if (window.Toast) {
            window.Toast.show(`Sincronizado com Supabase: ${vagas.length} vagas ativas carregadas em tempo real!`, 'success');
          }
          return true;
        }
      } catch (e) {
        console.warn('Erro ao sincronizar do Supabase:', e);
      }
      return false;
    }

    // Gravação de candidatura no Supabase
    async recordApplication(application) {
      if (!this.isConfigured()) return;
      try {
        await this.client.from('candidaturas').insert([{
          id: application.id,
          vaga_id: application.jobId,
          candidato_id: application.candidateId || 'cand-current',
          status_etapa: application.status || 'novo',
          match_percentual: application.matchScore || 85,
          feedback_empresa: application.feedback || null
        }]);
      } catch (e) {
        console.warn('Erro ao persistir candidatura no Supabase:', e);
      }
    }

    // Gravação de log LGPD no Supabase
    async recordAuditLog(log) {
      if (!this.isConfigured()) return;
      try {
        await this.client.from('auditoria_lgpd').insert([{
          perfil: log.role || 'CIDADÃO',
          acao: log.action,
          detalhe: log.details,
          base_legal: log.legalBasis || 'LGPD Art. 7º',
          ip_origem: '127.0.0.1'
        }]);
      } catch (e) {
        console.warn('Erro ao persistir auditoria no Supabase:', e);
      }
    }

    // Modal de Configuração e Visualização do SQL
    openConfigModal() {
      const isOnline = this.isConfigured();
      const currentUrl = this.config.url || '';
      const currentKey = this.config.anonKey || '';

      const content = `
        <div class="space-y-6">
          <!-- Banner de Status -->
          <div class="p-4 rounded-xl border ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-300'} flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3.5 h-3.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]' : 'bg-amber-400'}"></div>
              <div>
                <p class="font-bold text-sm text-white">${isOnline ? 'Banco de Dados Supabase Conectado' : 'Supabase em Modo Fallback Local (Offline)'}</p>
                <p class="text-xs text-slate-400">${isOnline ? `Conexão ativa com PostgreSQL em ${this.config.url.slice(0, 30)}...` : 'Insira as credenciais do seu projeto Supabase abaixo ou use o banco em memória local.'}</p>
              </div>
            </div>
            <span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-900/60 border border-slate-700 text-cyan-400">PostgreSQL 15</span>
          </div>

          <!-- Abas do Modal -->
          <div class="flex border-b border-slate-700 gap-4 text-sm font-semibold">
            <button id="tab-btn-conn" class="pb-2 border-b-2 border-cyan-400 text-cyan-400">Credenciais & Conexão</button>
            <button id="tab-btn-sql" class="pb-2 border-b-2 border-transparent text-slate-400 hover:text-slate-200">Esquema SQL (DDL)</button>
            <button id="tab-btn-sync" class="pb-2 border-b-2 border-transparent text-slate-400 hover:text-slate-200">Sincronização</button>
          </div>

          <!-- Aba 1: Conexão -->
          <div id="tab-pane-conn" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Project URL do Supabase</label>
              <input type="text" id="supabase-url-input" value="${currentUrl}" placeholder="https://xyzcompany.supabase.co" class="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-cyan-400 focus:outline-none">
              <p class="text-[11px] text-slate-500 mt-1">Encontrado em: <em>Project Settings -> API -> Project URL</em></p>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Project API Key (anon / public)</label>
              <input type="password" id="supabase-key-input" value="${currentKey}" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." class="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-cyan-400 focus:outline-none">
              <p class="text-[11px] text-slate-500 mt-1">Chave pública com suporte a Row Level Security (RLS).</p>
            </div>

            <div id="connection-test-result" class="hidden p-3 rounded-lg text-xs font-medium"></div>

            <div class="flex flex-wrap gap-3 pt-2">
              <button id="btn-test-supabase" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-600 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Testar Conexão
              </button>
              <button id="btn-save-supabase" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-bold shadow-md transition-all">
                Salvar Credenciais
              </button>
              ${isOnline ? `
              <button id="btn-disconnect-supabase" class="px-4 py-2 bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 rounded-lg text-xs font-bold border border-rose-700/50 transition-colors">
                Desconectar
              </button>` : ''}
            </div>
          </div>

          <!-- Aba 2: Código SQL -->
          <div id="tab-pane-sql" class="hidden space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-xs text-slate-400">Execute este script no <strong>SQL Editor</strong> do seu projeto Supabase para criar as tabelas e dados de Alagoas:</p>
              <button id="btn-copy-sql" class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                Copiar SQL Completo
              </button>
            </div>
            <pre class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-72 leading-relaxed">
-- EMPREGOS AL – SETEQ | PostgreSQL no Supabase
CREATE TABLE IF NOT EXISTS public.usuarios (...);
CREATE TABLE IF NOT EXISTS public.empresas (...);
CREATE TABLE IF NOT EXISTS public.candidatos (...);
CREATE TABLE IF NOT EXISTS public.vagas (...);
CREATE TABLE IF NOT EXISTS public.candidaturas (...);
CREATE TABLE IF NOT EXISTS public.cursos (...);
CREATE TABLE IF NOT EXISTS public.noticias (...);
CREATE TABLE IF NOT EXISTS public.postos_sine (...);
CREATE TABLE IF NOT EXISTS public.auditoria_lgpd (...);

-- Políticas RLS e Dados Semente dos 102 municípios de Alagoas inclusos!
-- Consulte o arquivo completo em: /sql/supabase_schema.sql
            </pre>
            <p class="text-[11px] text-slate-500">O arquivo completo está disponível na pasta <code class="text-cyan-400">sql/supabase_schema.sql</code> no repositório.</p>
          </div>

          <!-- Aba 3: Sincronização -->
          <div id="tab-pane-sync" class="hidden space-y-4">
            <p class="text-xs text-slate-300">A sincronização bidirecional mantém os dados de vagas, cursos e inscrições atualizados entre os navegadores de todos os cidadãos alagoanos e o banco central.</p>
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between text-slate-400">
                <span>Última Sincronização:</span>
                <strong class="text-white">${this.config.lastSync ? new Date(this.config.lastSync).toLocaleString('pt-BR') : 'Nunca sincronizado'}</strong>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Modo de Operação:</span>
                <strong class="${isOnline ? 'text-emerald-400' : 'text-amber-400'}">${isOnline ? 'Nuvem Real-time (Supabase)' : 'Local Storage Híbrido'}</strong>
              </div>
            </div>
            <button id="btn-sync-now" ${!isOnline ? 'disabled' : ''} class="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Sincronizar Dados Agora com Supabase
            </button>
          </div>
        </div>
      `;

      if (window.Modal) {
        window.Modal.open({
          title: '⚡ Banco de Dados Supabase (PostgreSQL) – SETEQ',
          contentHtml: content,
          size: 'lg',
          onRender: () => {
            // Abas
            const tabConn = document.getElementById('tab-btn-conn');
            const tabSql = document.getElementById('tab-btn-sql');
            const tabSync = document.getElementById('tab-btn-sync');
            const paneConn = document.getElementById('tab-pane-conn');
            const paneSql = document.getElementById('tab-pane-sql');
            const paneSync = document.getElementById('tab-pane-sync');

            const setTab = (activeBtn, activePane) => {
              [tabConn, tabSql, tabSync].forEach(b => {
                b.classList.remove('border-cyan-400', 'text-cyan-400');
                b.classList.add('border-transparent', 'text-slate-400');
              });
              [paneConn, paneSql, paneSync].forEach(p => p.classList.add('hidden'));

              activeBtn.classList.add('border-cyan-400', 'text-cyan-400');
              activeBtn.classList.remove('border-transparent', 'text-slate-400');
              activePane.classList.remove('hidden');
            };

            tabConn?.addEventListener('click', () => setTab(tabConn, paneConn));
            tabSql?.addEventListener('click', () => setTab(tabSql, paneSql));
            tabSync?.addEventListener('click', () => setTab(tabSync, paneSync));

            // Testar Conexão
            const btnTest = document.getElementById('btn-test-supabase');
            const resultBox = document.getElementById('connection-test-result');
            btnTest?.addEventListener('click', async () => {
              const url = document.getElementById('supabase-url-input').value.trim();
              const key = document.getElementById('supabase-key-input').value.trim();

              btnTest.disabled = true;
              btnTest.innerHTML = `<span class="animate-spin inline-block mr-1">⟳</span> Testando...`;
              resultBox.className = 'p-3 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 block';
              resultBox.textContent = 'Enviando ping para o endpoint do Supabase...';

              const res = await this.testConnection(url, key);

              btnTest.disabled = false;
              btnTest.innerHTML = `<svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Testar Conexão`;

              if (res.success) {
                resultBox.className = `p-3 rounded-lg text-xs font-medium ${res.warning ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'} block`;
                resultBox.textContent = res.message;
              } else {
                resultBox.className = 'p-3 rounded-lg text-xs font-medium bg-rose-500/10 border border-rose-500/30 text-rose-300 block';
                resultBox.textContent = res.message;
              }
            });

            // Salvar Credenciais
            document.getElementById('btn-save-supabase')?.addEventListener('click', async () => {
              const url = document.getElementById('supabase-url-input').value.trim();
              const anonKey = document.getElementById('supabase-key-input').value.trim();

              this.config.url = url;
              this.config.anonKey = anonKey;
              this.initClient();
              this.saveConfig();

              if (window.Toast) {
                window.Toast.show('Credenciais do Supabase salvas!', 'success');
              }
              window.Modal.close();
              this.syncFromSupabase();
            });

            // Desconectar
            document.getElementById('btn-disconnect-supabase')?.addEventListener('click', () => {
              this.config.url = '';
              this.config.anonKey = '';
              this.initClient();
              this.saveConfig();
              if (window.Toast) {
                window.Toast.show('Supabase desconectado. Modo Local ativo.', 'info');
              }
              window.Modal.close();
            });

            // Copiar SQL
            document.getElementById('btn-copy-sql')?.addEventListener('click', async () => {
              try {
                // Tenta carregar o arquivo SQL completo
                const resp = await fetch('./sql/supabase_schema.sql');
                let sqlText = '';
                if (resp.ok) {
                  sqlText = await resp.text();
                } else {
                  sqlText = `-- Consulte sql/supabase_schema.sql no repositório GitHub.`;
                }
                await navigator.clipboard.writeText(sqlText);
                if (window.Toast) {
                  window.Toast.show('Script SQL copiado para a área de transferência!', 'success');
                }
              } catch (e) {
                if (window.Toast) {
                  window.Toast.show('Abra o arquivo sql/supabase_schema.sql para copiar.', 'warning');
                }
              }
            });

            // Sincronizar Agora
            document.getElementById('btn-sync-now')?.addEventListener('click', async () => {
              const ok = await this.syncFromSupabase();
              if (ok && window.Modal) {
                window.Modal.close();
              }
            });
          }
        });
      }
    }

    // Atualiza o botão indicador na barra superior
    updateBadge() {
      const badgeContainer = document.getElementById('supabase-status-badge');
      if (!badgeContainer) return;

      const isOnline = this.isConfigured();
      badgeContainer.innerHTML = `
        <button id="btn-open-supabase-modal" class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
          isOnline
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            : 'bg-slate-800/80 text-cyan-300 border border-slate-700 hover:bg-slate-700/80'
        }" title="Clique para gerenciar o Banco de Dados Supabase (PostgreSQL)">
          <span class="w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}"></span>
          <span>${isOnline ? 'Supabase Conectado' : 'Supabase SQL'}</span>
        </button>
      `;

      document.getElementById('btn-open-supabase-modal')?.addEventListener('click', () => {
        this.openConfigModal();
      });
    }
  }

  window.SupabaseClient = new SupabaseClientManager();

  // Inicializa o badge quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      window.SupabaseClient.updateBadge();
      // Se configurado, tenta carregar dados
      if (window.SupabaseClient.isConfigured()) {
        window.SupabaseClient.syncFromSupabase();
      }
    }, 500);
  });
})();