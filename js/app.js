/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Arquitetura Standalone Unificada para Execução Imediata (compatível com file:// e http://)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. COMPONENTE TOAST
  // ==========================================
  window.Toast = {
    show(message, type = 'success', duration = 3500) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      const colors = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-rose-600 text-white',
        warning: 'bg-amber-500 text-white',
        info: 'bg-blue-600 text-white'
      };

      const icons = {
        success: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
        error: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
        warning: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
        info: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
      };

      toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm font-medium transition-all transform duration-300 pointer-events-auto ${colors[type] || colors.info} translate-y-2 opacity-0`;
      toast.innerHTML = `
        ${icons[type] || icons.info}
        <span class="flex-1">${message}</span>
        <button class="text-white/80 hover:text-white ml-2 text-lg leading-none">&times;</button>
      `;

      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      });

      const close = () => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      };

      toast.querySelector('button').addEventListener('click', close);
      setTimeout(close, duration);
    }
  };

  // ==========================================
  // 2. COMPONENTE MODAL
  // ==========================================
  window.Modal = {
    open({ title = '', contentHtml = '', onRender = null, size = 'lg', footerHtml = '' }) {
      const container = document.getElementById('modal-container');
      if (!container) return;

      const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
        xl: 'max-w-5xl',
        full: 'max-w-6xl'
      };

      container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm fade-in" id="modal-backdrop">
          <div class="relative w-full ${sizeClasses[size] || sizeClasses.lg} bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all transform flex flex-col max-h-[90vh]">
            
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                ${title}
              </h3>
              <button id="modal-close-btn" class="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="p-6 overflow-y-auto flex-1 text-slate-700" id="modal-body-content">
              ${contentHtml}
            </div>

            ${footerHtml ? `
              <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                ${footerHtml}
              </div>
            ` : ''}

          </div>
        </div>
      `;

      const backdrop = document.getElementById('modal-backdrop');
      const closeBtn = document.getElementById('modal-close-btn');

      const handleClose = () => {
        container.innerHTML = '';
        document.removeEventListener('keydown', handleKey);
      };

      const handleKey = (e) => {
        if (e.key === 'Escape') handleClose();
      };

      closeBtn?.addEventListener('click', handleClose);
      backdrop?.addEventListener('click', (e) => {
        if (e.target === backdrop) handleClose();
      });
      document.addEventListener('keydown', handleKey);

      if (typeof onRender === 'function') {
        onRender(document.getElementById('modal-body-content'), handleClose);
      }
    },

    close() {
      const container = document.getElementById('modal-container');
      if (container) container.innerHTML = '';
    }
  };

  // ==========================================
  // 3. MOTOR DE INTELIGÊNCIA ARTIFICIAL (IA)
  // ==========================================
  window.AIEngine = {
    calculateMatch(candidate, job) {
      if (!candidate || !job) {
        return { score: 0, label: 'Indisponível', matchingSkills: [], missingSkills: [] };
      }

      const candidateHardSkills = (candidate.hardSkills || []).map(s => s.toLowerCase().trim());
      const candidateSoftSkills = (candidate.softSkills || []).map(s => s.toLowerCase().trim());
      const jobRequiredSkills = (job.requiredSkills || []).map(s => s.toLowerCase().trim());
      const jobSoftSkills = (job.softSkills || []).map(s => s.toLowerCase().trim());

      let hardMatchCount = 0;
      const matchingSkills = [];
      const missingSkills = [];

      jobRequiredSkills.forEach(req => {
        const isMatch = candidateHardSkills.some(candSkill => 
          candSkill.includes(req) || req.includes(candSkill)
        );
        if (isMatch) {
          hardMatchCount++;
          matchingSkills.push(req);
        } else {
          missingSkills.push(req);
        }
      });

      const hardScore = jobRequiredSkills.length > 0 
        ? (hardMatchCount / jobRequiredSkills.length) * 40 
        : 30;

      let softMatchCount = 0;
      jobSoftSkills.forEach(soft => {
        if (candidateSoftSkills.some(candSoft => candSoft.includes(soft) || soft.includes(candSoft))) {
          softMatchCount++;
        }
      });
      const softScore = jobSoftSkills.length > 0 
        ? (softMatchCount / jobSoftSkills.length) * 15 
        : 12;

      const educationHierarchy = {
        'Fundamental Incompleto': 1,
        'Fundamental Completo': 2,
        'Ensino Médio Incompleto': 3,
        'Ensino Médio Completo': 4,
        'Curso Técnico': 5,
        'Curso Técnico em Enfermagem Completo': 5,
        'Superior Cursando': 6,
        'Superior Completo ou Cursando': 6,
        'Superior Completo': 7,
        'Pós-Graduação / Especialização': 8
      };

      const candEduVal = educationHierarchy[candidate.educationLevel] || 4;
      const jobEduVal = educationHierarchy[job.educationLevel] || 4;
      const eduScore = candEduVal >= jobEduVal ? 20 : Math.max(10, 20 - (jobEduVal - candEduVal) * 5);

      let locScore = 15;
      if (job.workModel === 'Remoto') {
        locScore = 15;
      } else {
        if (candidate.city && job.city && candidate.city.toLowerCase() === job.city.toLowerCase()) {
          locScore = 15;
        } else if (candidate.state === 'AL') {
          locScore = 10;
        } else {
          locScore = 5;
        }
      }

      let roleScore = 7;
      const target = (candidate.targetRole || '').toLowerCase();
      const jobTitle = (job.title || '').toLowerCase();
      if (jobTitle.includes(target) || target.includes(jobTitle.split(' ')[0])) {
        roleScore = 10;
      }

      const totalRaw = Math.round(hardScore + softScore + eduScore + locScore + roleScore);
      const finalScore = Math.min(99, Math.max(25, totalRaw));

      let label = 'Em Desenvolvimento';
      let badgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
      let progressColor = 'bg-amber-500';

      if (finalScore >= 85) {
        label = 'Excelente Afinidade';
        badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
        progressColor = 'bg-emerald-600';
      } else if (finalScore >= 70) {
        label = 'Alta Compatibilidade';
        badgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
        progressColor = 'bg-blue-600';
      } else if (finalScore >= 50) {
        label = 'Compatibilidade Média';
        badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
        progressColor = 'bg-yellow-500';
      }

      let aiInsight = '';
      if (finalScore >= 85) {
        aiInsight = `Candidatura altamente recomendada! Seu perfil domina as competências-chave (${matchingSkills.slice(0, 3).join(', ')}) solicitadas para ${job.city}.`;
      } else if (finalScore >= 70) {
        aiInsight = `Forte aderência à vaga. Se você adicionar comprovação em ${missingSkills.slice(0, 2).join(', ') || 'competências complementares'}, suas chances chegam a 95%.`;
      } else {
        aiInsight = `Oportunidade interessante para transição ou estágio. Recomenda-se capacitação rápida em ${missingSkills.slice(0, 2).join(' e ')}.`;
      }

      return {
        score: finalScore,
        label,
        badgeClass,
        progressColor,
        matchingSkills,
        missingSkills,
        aiInsight,
        breakdown: {
          hardSkills: Math.round((hardScore / 40) * 100),
          softSkills: Math.round((softScore / 15) * 100),
          education: Math.round((eduScore / 20) * 100),
          location: Math.round((locScore / 15) * 100)
        }
      };
    },

    extractSkillsFromText(text) {
      if (!text || typeof text !== 'string') return [];

      const knownSkills = [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'HTML5', 'CSS3',
        'Git', 'GitHub', 'SQL', 'PostgreSQL', 'MySQL', 'APIs RESTful', 'Figma', 'Power BI', 'Excel Avançado',
        'COREN', 'Enfermagem', 'Punção Venosa', 'Curativos', 'UTI', 'Primeiros Socorros', 'BLS', 'Sinais Vitais',
        'Atendimento ao Cliente', 'Vendas', 'Caixa', 'Controle de Estoque', 'WMS', 'Notas Fiscais',
        'Logística', 'Inventário', 'Negociação', 'Recepção', 'Inglês', 'Espanhol', 'Rotinas Administrativas',
        'Manutenção Industrial', 'Solda', 'Pneumática', 'NR-10', 'NR-12', 'NR-35', 'Operação de Máquinas',
        'Comunicação Clara', 'Trabalho em Equipe', 'Proatividade', 'Resolução de Problemas',
        'Pontualidade', 'Empatia', 'Liderança', 'Organização', 'Flexibilidade', 'Atenção Concentrada'
      ];

      const normalizedText = text.toLowerCase();
      const foundSkills = [];

      knownSkills.forEach(skill => {
        const regex = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i');
        if (regex.test(normalizedText)) {
          foundSkills.push(skill);
        }
      });

      return foundSkills;
    },

    suggestJobTemplate(title) {
      const t = (title || '').toLowerCase();

      if (t.includes('front') || t.includes('react') || t.includes('web') || t.includes('software')) {
        return {
          cbo: '3171-10 - Programador de Sistemas de Informação',
          category: 'Tecnologia da Informação',
          educationLevel: 'Superior Completo ou Cursando',
          requiredSkills: ['React', 'JavaScript', 'Git', 'HTML5 & CSS3', 'REST APIs'],
          desirableSkills: ['TypeScript', 'Tailwind CSS', 'Next.js'],
          softSkills: ['Trabalho em Equipe', 'Resolução de Problemas', 'Comunicação Clara'],
          descriptionTemplate: 'Profissional atuará na concepção, prototipação e implementação de interfaces web interativas e responsivas, colaborando com designers e engenheiros de backend.'
        };
      }

      if (t.includes('enferm') || t.includes('saude') || t.includes('hospital')) {
        return {
          cbo: '3222-05 - Técnico de Enfermagem',
          category: 'Saúde e Bem-estar',
          educationLevel: 'Curso Técnico em Enfermagem Completo',
          requiredSkills: ['COREN-AL Ativo', 'Técnicas de Curativos', 'Administração de Medicamentos', 'Monitoramento de Sinais Vitais'],
          desirableSkills: ['Suporte Básico de Vida (BLS)', 'Experiência em Pronto Atendimento'],
          softSkills: ['Empatia', 'Atenção Concentrada', 'Equilíbrio Emocional'],
          descriptionTemplate: 'Prestação de assistência e cuidados diretos de enfermagem sob orientação do enfermeiro-chefe, zelando pelo bem-estar e segurança clínica do paciente.'
        };
      }

      if (t.includes('hotel') || t.includes('recep') || t.includes('turism')) {
        return {
          cbo: '4221-05 - Recepcionista de Hotel',
          category: 'Turismo, Gastronomia & Hotelaria',
          educationLevel: 'Ensino Médio Completo',
          requiredSkills: ['Atendimento ao Cliente', 'Informática Básica', 'Sistemas de Check-in'],
          desirableSkills: ['Inglês Intermediário', 'Espanhol Básico'],
          softSkills: ['Simpatia', 'Excelente Dicção', 'Proatividade'],
          descriptionTemplate: 'Acolhimento aos hóspedes e visitantes, registro e controle de hospedagem, atendimento a ligações e suporte às informações turísticas do litoral alagoano.'
        };
      }

      if (t.includes('logist') || t.includes('estoqu') || t.includes('almox')) {
        return {
          cbo: '4141-05 - Almoxarife / Estoquista',
          category: 'Logística, Transporte & Armazém',
          educationLevel: 'Ensino Médio Completo',
          requiredSkills: ['Controle de Estoque', 'Conferência de Notas Fiscais', 'Excel Básico'],
          desirableSkills: ['WMS', 'Operação de Empilhadeira'],
          softSkills: ['Agilidade', 'Atenção aos Detalhes', 'Trabalho em Equipe'],
          descriptionTemplate: 'Recebimento, conferência, estocagem e expedição de produtos e mercadorias, mantendo a integridade dos itens e organização do armazém.'
        };
      }

      return {
        cbo: '5211-10 - Vendedor do Comércio Varejista',
        category: 'Comércio, Varejo & Vendas',
        educationLevel: 'Ensino Médio Completo',
        requiredSkills: ['Atendimento ao Cliente', 'Técnicas de Vendas', 'Negociação'],
        desirableSkills: ['Controle de Caixa', 'Comunicação Digital'],
        softSkills: ['Empatia', 'Persuasão', 'Organização'],
        descriptionTemplate: 'Atendimento consultivo e ativo a clientes, apresentação do catálogo de produtos e serviços, esclarecimento de dúvidas e fechamento de vendas.'
      };
    },

    getCareerInsights(candidate, allJobs) {
      const candidateSkills = (candidate.hardSkills || []).map(s => s.toLowerCase());
      const skillDemands = {};
      (allJobs || []).forEach(job => {
        (job.requiredSkills || []).forEach(skill => {
          const lower = skill.toLowerCase();
          skillDemands[lower] = (skillDemands[lower] || { name: skill, count: 0 });
          skillDemands[lower].count++;
        });
      });

      const topMissing = Object.values(skillDemands)
        .filter(item => !candidateSkills.includes(item.name.toLowerCase()))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

      return {
        topInDemandInAlagoas: topMissing,
        recommendationText: topMissing.length > 0
          ? `Adicionar cursos rápidos em "${topMissing.map(m => m.name).join(', ')}" aumentará seu alcance em até 40% das vagas ativas em Alagoas.`
          : 'Seu perfil técnico possui ampla cobertura para as vagas cadastradas no estado de Alagoas!'
      };
    }
  };

  // ==========================================
  // 4. GERENCIADOR DE ESTADO (STORE)
  // ==========================================
  const STORAGE_KEY = 'EMPREGOS_AL_STATE_V3';

  class Store {
    constructor() {
      this.state = this.loadState();
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Erro ao carregar estado do LocalStorage:', e);
      }

      return {
        currentUser: (window.INITIAL_USERS && window.INITIAL_USERS[0]) || null,
        users: window.INITIAL_USERS || [],
        activeRole: 'candidate',
        currentCompanyId: 'comp-1',
        candidateProfile: window.INITIAL_CANDIDATE_PROFILE,
        otherCandidates: window.INITIAL_OTHER_CANDIDATES,
        companies: window.INITIAL_COMPANIES,
        jobs: window.INITIAL_JOBS,
        applications: window.INITIAL_APPLICATIONS,
        savedJobIds: ['job-1', 'job-3'],
        notifications: window.INITIAL_NOTIFICATIONS,
        auditLogs: window.INITIAL_AUDIT_LOGS,
        indicators: window.SETEQ_INDICATORS
      };
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error('Erro ao salvar no LocalStorage:', e);
      }
      this.notify();
    }

    notify() {
      window.dispatchEvent(new CustomEvent('empregos-al:state-changed', {
        detail: { state: this.state }
      }));
    }

    resetAll() {
      localStorage.removeItem(STORAGE_KEY);
      this.state = this.loadState();
      this.save();
    }

    // --- Autenticação & Usuários ---
    getCurrentUser() { return this.state.currentUser; }
    getUsers() { return this.state.users || []; }
    isAuthenticated() { return Boolean(this.state.currentUser); }

    login(email, password) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const user = (this.state.users || []).find(
        u => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      if (!user) {
        return { success: false, message: 'E-mail ou senha incorretos. Verifique suas credenciais.' };
      }

      this.state.currentUser = user;
      this.state.activeRole = user.role;
      if (user.companyId) {
        this.state.currentCompanyId = user.companyId;
      }

      this.addAuditLog(
        'Login de Usuário',
        `Acesso autenticado de ${user.name} (${user.email}) no perfil ${user.role.toUpperCase()}.`,
        'LGPD Art. 7º, II'
      );

      this.save();
      return { success: true, user };
    }

    logout() {
      const prev = this.state.currentUser;
      this.state.currentUser = null;
      this.addAuditLog(
        'Logout de Sessão',
        `Usuário ${prev ? prev.name : 'Desconhecido'} encerrou sua sessão no portal.`,
        'LGPD Art. 7º'
      );
      this.save();
    }

    registerCandidate(data) {
      const cleanEmail = (data.email || '').trim().toLowerCase();
      const exists = (this.state.users || []).some(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return { success: false, message: 'Este e-mail já está registrado em outra conta.' };
      }

      const newCandId = `cand-${Date.now()}`;
      const newProfile = {
        id: newCandId,
        fullName: data.fullName,
        cpf: data.cpf || '000.***.***-00',
        birthDate: data.birthDate || '2000-01-01',
        gender: data.gender || 'Não informado',
        email: data.email,
        phone: data.phone || '(82) 99999-0000',
        isPcd: Boolean(data.isPcd),
        pcdType: data.pcdType || '',
        city: data.city || 'Maceió',
        state: 'AL',
        neighborhood: data.neighborhood || 'Centro',
        zipCode: '57000-000',
        summary: data.summary || `Profissional de ${data.city || 'Maceió'}, Alagoas com foco em ${data.targetRole || 'oportunidades de trabalho'}.`,
        educationLevel: data.educationLevel || 'Ensino Médio Completo',
        targetRole: data.targetRole || 'Profissional',
        expectedSalary: data.expectedSalary || 'R$ 2.500,00',
        preferredWorkModel: 'Presencial',
        preferredContract: 'CLT',
        academicList: [
          {
            id: `acad-${Date.now()}`,
            institution: 'Escola Estadual de Alagoas',
            degree: data.educationLevel || 'Ensino Médio',
            status: 'Concluído',
            startYear: '2016',
            endYear: '2019'
          }
        ],
        experienceList: [],
        hardSkills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : ['Atendimento ao Cliente', 'Informática Básica', 'Comunicação'],
        softSkills: ['Trabalho em Equipe', 'Pontualidade', 'Dedicação'],
        coursesList: [],
        languages: [{ language: 'Português', level: 'Nativo' }],
        lgpdConsentDate: new Date().toISOString(),
        cvVersion: '1.0'
      };

      const newUser = {
        id: `user-${Date.now()}`,
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: 'candidate',
        candidateId: newCandId,
        city: data.city || 'Maceió',
        badge: 'Cidadão Alagoano'
      };

      this.state.candidateProfile = newProfile;
      this.state.users.push(newUser);
      this.state.currentUser = newUser;
      this.state.activeRole = 'candidate';

      this.addAuditLog(
        'Cadastro de Novo Cidadão',
        `Cidadão ${newUser.name} criou conta no portal Empregos AL (Município: ${newProfile.city}).`,
        'LGPD Art. 7º, I (Consentimento expresso)'
      );

      this.save();
      return { success: true, user: newUser };
    }

    registerCompany(data) {
      const cleanEmail = (data.email || '').trim().toLowerCase();
      const exists = (this.state.users || []).some(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return { success: false, message: 'Este e-mail corporativo já está registrado.' };
      }

      const newCompId = `comp-${Date.now()}`;
      const newCompany = {
        id: newCompId,
        name: data.name,
        tradeName: data.tradeName || data.name,
        cnpj: data.cnpj || '00.000.000/0001-00',
        city: data.city || 'Maceió',
        neighborhood: data.neighborhood || 'Centro',
        sector: data.sector || 'Comércio, Varejo & Vendas',
        status: 'pending', // pendente de homologação pela SETEQ
        verifiedDate: null,
        contactEmail: data.email,
        phone: data.phone || '(82) 3000-0000',
        description: data.description || 'Empresa parceira cadastrada no portal Empregos AL para atração de talentos e intermediação pública de mão de obra.'
      };

      const newUser = {
        id: `user-${Date.now()}`,
        name: data.tradeName || data.name,
        email: data.email,
        password: data.password,
        role: 'company',
        companyId: newCompId,
        city: data.city || 'Maceió',
        badge: 'Empresa Parceira (Aguardando Homologação)'
      };

      this.state.companies.unshift(newCompany);
      this.state.users.push(newUser);
      this.state.currentCompanyId = newCompId;
      this.state.currentUser = newUser;
      this.state.activeRole = 'company';

      this.addAuditLog(
        'Cadastro de Nova Empresa Parceira',
        `Empresa ${newCompany.tradeName} (CNPJ: ${newCompany.cnpj}) cadastrada no portal. Status: Pendente de Homologação.`,
        'Portaria MTE / SINE Alagoas'
      );

      this.save();
      return { success: true, user: newUser };
    }

    getRole() { return this.state.activeRole; }
    getCandidateProfile() { return this.state.candidateProfile; }
    getCompanies() { return this.state.companies; }
    getCompany(id) { return this.state.companies.find(c => c.id === id); }
    getCurrentCompany() { return this.getCompany(this.state.currentCompanyId) || this.state.companies[0]; }
    getJobs() { return this.state.jobs; }
    getJob(id) { return this.state.jobs.find(j => j.id === id); }
    getApplications() { return this.state.applications; }
    getSavedJobIds() { return this.state.savedJobIds || []; }
    getNotifications() { return this.state.notifications; }
    getUnreadNotificationsCount() {
      return (this.state.notifications || []).filter(n => !n.read).length;
    }
    getAuditLogs() { return this.state.auditLogs; }
    getIndicators() { return this.state.indicators; }
    getAllCandidates() {
      return [this.state.candidateProfile, ...(this.state.otherCandidates || [])];
    }

    setRole(newRole) {
      this.state.activeRole = newRole;
      this.addAuditLog(
        'Troca de Contexto de Acesso',
        `Usuário alternou para o perfil: ${newRole.toUpperCase()}`,
        'LGPD Art. 7º (Execução de políticas públicas)'
      );
      this.save();
    }

    setCurrentCompany(companyId) {
      this.state.currentCompanyId = companyId;
      this.save();
    }

    updateCandidateProfile(updatedData) {
      this.state.candidateProfile = {

        ...this.state.candidateProfile,
        ...updatedData
      };
      this.addAuditLog(
        'Atualização de Currículo Cidadão',
        `O candidato ${this.state.candidateProfile.fullName} atualizou suas informações cadastrais.`,
        'LGPD Art. 18, I (Direito de correção de dados)'
      );
      this.save();
    }

    applyToJob(jobId, aiScore = 85) {
      const job = this.getJob(jobId);
      if (!job) return { success: false, message: 'Vaga não encontrada' };

      const existing = this.state.applications.find(
        a => a.jobId === jobId && a.candidateId === this.state.candidateProfile.id
      );
      if (existing) {
        return { success: false, message: 'Você já se candidatou para esta vaga!' };
      }

      const newApp = {
        id: `app-${Date.now()}`,
        candidateId: this.state.candidateProfile.id,
        candidateName: this.state.candidateProfile.fullName,
        jobId: job.id,
        jobTitle: job.title,
        companyId: job.companyId,
        companyName: job.companyName,
        appliedAt: new Date().toISOString(),
        status: 'applied',
        aiScore: aiScore,
        stageNotes: 'Candidatura submetida via portal EMPREGOS AL. Aguardando triagem.',
        interviewDate: null,
        feedbackHistory: [
          {
            date: new Date().toISOString().split('T')[0],
            text: 'Candidatura realizada com sucesso e enviada ao RH.'
          }
        ]
      };

      this.state.applications.unshift(newApp);

      this.addNotification({
        forUserId: this.state.candidateProfile.id,
        title: 'Candidatura Enviada!',
        message: `Você se candidatou com sucesso para "${job.title}" na empresa ${job.companyName}.`,
        type: 'application'
      });

      this.addAuditLog(
        'Inscrição em Vaga de Emprego',
        `Candidato ${this.state.candidateProfile.fullName} candidatou-se à vaga #${job.id} (${job.title}).`,
        'LGPD Art. 7º, V'
      );

      this.save();
      return { success: true, application: newApp };
    }

    toggleSaveJob(jobId) {
      if (!this.state.savedJobIds) this.state.savedJobIds = [];
      const idx = this.state.savedJobIds.indexOf(jobId);
      if (idx >= 0) {
        this.state.savedJobIds.splice(idx, 1);
      } else {
        this.state.savedJobIds.push(jobId);
      }
      this.save();
    }

    createJob(jobData) {
      const company = this.getCurrentCompany();
      const newJob = {
        id: `job-${Date.now()}`,
        companyId: company.id,
        companyName: company.tradeName || company.name,
        title: jobData.title,
        cbo: jobData.cbo || 'Geral',
        city: jobData.city || company.city,
        neighborhood: jobData.neighborhood || company.neighborhood,
        workModel: jobData.workModel || 'Presencial',
        contractType: jobData.contractType || 'CLT',
        category: jobData.category || 'Geral',
        salaryMin: Number(jobData.salaryMin) || 0,
        salaryMax: Number(jobData.salaryMax) || 0,
        salaryDisplay: jobData.salaryDisplay || 'A combinar',
        isPcdExclusive: Boolean(jobData.isPcdExclusive),
        educationLevel: jobData.educationLevel || 'Ensino Médio Completo',
        experienceRequired: jobData.experienceRequired || 'Não exigida',
        requiredSkills: Array.isArray(jobData.requiredSkills) ? jobData.requiredSkills : [],
        desirableSkills: Array.isArray(jobData.desirableSkills) ? jobData.desirableSkills : [],
        softSkills: Array.isArray(jobData.softSkills) ? jobData.softSkills : [],
        description: jobData.description || '',
        benefits: Array.isArray(jobData.benefits) ? jobData.benefits : [],
        vacanciesCount: Number(jobData.vacanciesCount) || 1,
        status: 'active',
        postedDate: new Date().toISOString().split('T')[0],
        moderationStatus: 'approved'
      };

      this.state.jobs.unshift(newJob);
      this.addAuditLog(
        'Publicação de Vaga Autônoma',
        `Empresa ${company.name} publicou a vaga "${newJob.title}" em ${newJob.city}.`,
        'Portaria MTE / IMO'
      );
      this.save();
      return newJob;
    }

    updateJob(jobId, updates) {
      const idx = this.state.jobs.findIndex(j => j.id === jobId);
      if (idx >= 0) {
        this.state.jobs[idx] = { ...this.state.jobs[idx], ...updates };
        this.save();
      }
    }

    updateApplicationStage(appId, newStatus, stageNotes = '', interviewDate = null) {
      const app = this.state.applications.find(a => a.id === appId);
      if (app) {
        const oldStatus = app.status;
        app.status = newStatus;
        if (stageNotes) app.stageNotes = stageNotes;
        if (interviewDate) app.interviewDate = interviewDate;

        const stageLabels = {
          applied: 'Inscrito',
          screening: 'Em Triagem / Match IA',
          interview: 'Entrevista Agendada',
          approved: 'Aprovado / Proposta',
          rejected: 'Desclassificado'
        };

        if (!app.feedbackHistory) app.feedbackHistory = [];
        app.feedbackHistory.push({
          date: new Date().toISOString().split('T')[0],
          text: `Fase alterada para ${stageLabels[newStatus] || newStatus}. ${stageNotes}`
        });

        if (app.candidateId === this.state.candidateProfile.id) {
          let title = 'Atualização no Processo Seletivo';
          if (newStatus === 'interview') title = '🎉 Você foi convocado para Entrevista!';
          if (newStatus === 'approved') title = '🏆 Parabéns! Candidatura Aprovada!';
          
          this.addNotification({
            forUserId: app.candidateId,
            title: title,
            message: `Sua vaga para "${app.jobTitle}" avançou para: ${stageLabels[newStatus]}. ${stageNotes}`,
            type: newStatus === 'interview' ? 'interview' : 'process'
          });
        }

        this.addAuditLog(
          'Movimentação de Candidatura',
          `Candidatura #${app.id} (${app.candidateName}) movida para [${newStatus}].`,
          'Intermediação SINE/MTE'
        );

        this.save();
      }
    }

    verifyCompany(companyId, status) {
      const comp = this.getCompany(companyId);
      if (comp) {
        comp.status = status;
        comp.verifiedDate = status === 'approved' ? new Date().toISOString().split('T')[0] : null;
        this.addAuditLog(
          'Homologação Cadastral pela SETEQ',
          `Empresa ${comp.name} teve status alterado para "${status.toUpperCase()}".`,
          'Diretrizes SINE Alagoas'
        );
        this.save();
      }
    }

    moderateJob(jobId, moderationStatus) {
      const job = this.getJob(jobId);
      if (job) {
        job.moderationStatus = moderationStatus;
        this.addAuditLog(
          'Moderação de Conteúdo de Vaga',
          `Vaga #${job.id} teve moderação definida como: ${moderationStatus}.`,
          'Auditoria SETEQ'
        );
        this.save();
      }
    }

    addNotification(notif) {
      const newNotif = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toISOString(),
        read: false,
        ...notif
      };
      this.state.notifications.unshift(newNotif);
      this.save();
    }

    markAllNotificationsRead() {
      this.state.notifications.forEach(n => { n.read = true; });
      this.save();
    }

    addAuditLog(action, details, legalBasis) {
      const activeRole = this.state.activeRole;
      let actorName = 'Cidadão Usuário';
      if (activeRole === 'company') {
        const c = this.getCurrentCompany();
        actorName = `${c.tradeName || c.name} (RH)`;
      } else if (activeRole === 'admin') {
        actorName = 'Secretaria do Trabalho / SETEQ AL';
      } else if (this.state.candidateProfile) {
        actorName = this.state.candidateProfile.fullName;
      }

      const logEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorName,
        actorRole: activeRole === 'admin' ? 'Gestor SETEQ' : (activeRole === 'company' ? 'Empresa Parceira' : 'Candidato Cidadão'),
        action,
        details,
        legalBasis: legalBasis || 'LGPD Art. 7º',
        ipAddress: '179.185.22.' + Math.floor(Math.random() * 200 + 10)
      };

      this.state.auditLogs.unshift(logEntry);
      if (this.state.auditLogs.length > 200) {
        this.state.auditLogs = this.state.auditLogs.slice(0, 200);
      }
    }

    // ==========================================
    // MÉTODOS DE ACOLHIMENTO INSTITUCIONAL
    // ==========================================
    isWelcomeDismissed() {
      try {
        return localStorage.getItem('EMPREGOS_AL_WELCOME_SEEN') === 'true';
      } catch(e) {
        return false;
      }
    }

    setWelcomeDismissed(val) {
      try {
        localStorage.setItem('EMPREGOS_AL_WELCOME_SEEN', val ? 'true' : 'false');
      } catch(e) {}
    }

    // ==========================================
    // MÉTODOS DE GEOMAPEAMENTO E EXPORTAÇÃO DE DADOS
    // ==========================================
    getGeoData() {
      return window.ALAGOAS_GEO_DATA || [];
    }

    getSectorPalette() {
      return window.SECTOR_PALETTE || {};
    }

    getRegionsData() {
      return window.ALAGOAS_REGIONS_GEO || [];
    }

    getMonthlyIndicators() {
      return window.MONTHLY_SINE_INDICATORS || [];
    }

    downloadFile(content, filename, mimeType = 'text/csv;charset=utf-8;') {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    exportCandidatesCSV(filterCity = '', filterSector = '') {
      const candidates = this.getAllCandidates();
      let filtered = candidates;

      if (filterCity) {
        filtered = filtered.filter(c => c.city === filterCity);
      }

      const rows = [
        ['ID', 'Nome Completo', 'CPF (LGPD)', 'Município (AL)', 'Cargo Desejado', 'Escolaridade', 'Competências Principais', 'Pretensão Salarial', 'Contato / Telefone', 'E-mail', 'Status SINE']
      ];

      filtered.forEach(c => {
        rows.push([
          c.id,
          `"${(c.fullName || '').replace(/"/g, '""')}"`,
          `"${(c.cpf || '***.***.***-**')}"`,
          `"${c.city || 'Maceió'}, AL"`,
          `"${(c.targetRole || 'Geral').replace(/"/g, '""')}"`,
          `"${c.educationLevel || 'Ensino Médio'}"`,
          `"${(c.hardSkills || []).join(', ').replace(/"/g, '""')}"`,
          `"${c.expectedSalary || 'A Combinar'}"`,
          `"${c.phone || '(82) 9****-****'}"`,
          `"${c.email || ''}"`,
          'Ativo no Banco de Talentos'
        ]);
      });

      const csvContent = '\uFEFF' + rows.map(r => r.join(';')).join('\r\n');
      const filename = `relatorio_cidadaos_alagoas_seteq_${new Date().toISOString().split('T')[0]}.csv`;
      this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
      
      this.addAuditLog(
        'Exportação de Dados (Cidadãos)',
        `Exportação em CSV de ${filtered.length} registro(s) de cidadãos de Alagoas.`,
        'LGPD Art. 7º, III (Políticas públicas do Estado)'
      );

      return { success: true, count: filtered.length, filename };
    }

    exportJobsCSV(filterCity = '', filterSector = '') {
      const jobs = this.getJobs();
      let filtered = jobs;

      if (filterCity) {
        filtered = filtered.filter(j => j.city === filterCity);
      }
      if (filterSector) {
        filtered = filtered.filter(j => j.category === filterSector);
      }

      const rows = [
        ['Código Vaga', 'Cargo Ofertado', 'Empresa Empregadora', 'CNPJ', 'Município (AL)', 'Modalidade', 'Regime Contratual', 'Faixa Salarial', 'CBO SINE', 'Setor Econômico', 'Qtd Vagas', 'Status']
      ];

      filtered.forEach(j => {
        rows.push([
          j.id,
          `"${(j.title || '').replace(/"/g, '""')}"`,
          `"${(j.companyName || '').replace(/"/g, '""')}"`,
          `"${j.cnpj || '00.000.000/0001-00'}"`,
          `"${j.city}, AL"`,
          `"${j.workModel}"`,
          `"${j.contractType}"`,
          `"${j.salaryDisplay}"`,
          `"${j.cbo}"`,
          `"${j.category}"`,
          j.vacanciesCount || 1,
          j.status === 'open' ? 'Aberta / SINE' : 'Encerrada'
        ]);
      });

      const csvContent = '\uFEFF' + rows.map(r => r.join(';')).join('\r\n');
      const filename = `relatorio_vagas_empresas_alagoas_seteq_${new Date().toISOString().split('T')[0]}.csv`;
      this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');

      this.addAuditLog(
        'Exportação de Dados (Vagas/Empresas)',
        `Exportação em CSV de ${filtered.length} vaga(s) e empresas parceiras.`,
        'LGPD Art. 7º, II (Cumprimento de obrigação legal)'
      );

      return { success: true, count: filtered.length, filename };
    }

    exportCompleteJSON() {
      const exportPackage = {
        metadata: {
          emissor: 'Governo do Estado de Alagoas',
          secretaria: 'SETEQ - Secretaria do Trabalho, Emprego e Qualificação',
          sistema: 'EMPREGOS AL – Observatório Georreferenciado',
          dataExtracao: new Date().toISOString(),
          versaoEsquema: '2.4.0',
          baseLegal: 'Lei Federal 13.709/2018 (LGPD) e Lei Federal 13.667/2018 (SINE)'
        },
        estatisticasGerais: {
          totalCidadaos: this.getAllCandidates().length,
          totalVagas: this.getJobs().length,
          totalEmpresas: this.getCompanies().length,
          municipiosMonitorados: 102,
          polosAtivos: (window.ALAGOAS_GEO_DATA || []).length
        },
        dadosGeorreferenciados: window.ALAGOAS_GEO_DATA || [],
        mesorregioes: window.ALAGOAS_REGIONS_GEO || [],
        historicoSineMensal: window.MONTHLY_SINE_INDICATORS || [],
        vagasAbertas: this.getJobs().map(j => ({
          id: j.id,
          titulo: j.title,
          empresa: j.companyName,
          municipio: j.city,
          setor: j.category,
          salario: j.salaryDisplay,
          cbo: j.cbo,
          requisitos: j.requiredSkills
        })),
        cidadaosAnonimizados: this.getAllCandidates().map(c => ({
          id: c.id,
          municipio: c.city,
          cargoPretendido: c.targetRole,
          escolaridade: c.educationLevel,
          habilidades: c.hardSkills,
          pretensaoSalarial: c.expectedSalary
        }))
      };

      const jsonStr = JSON.stringify(exportPackage, null, 2);
      const filename = `pacote_completo_observatorio_seteq_alagoas_${new Date().toISOString().split('T')[0]}.json`;
      this.downloadFile(jsonStr, filename, 'application/json;charset=utf-8;');

      this.addAuditLog(
        'Exportação de Pacote JSON Completo',
        'Download do pacote governamental com geoindicadores, vagas e métricas setoriais.',
        'LGPD Art. 7º, III (Políticas públicas)'
      );

      return { success: true, filename };
    }
  }

  window.store = new Store();

  // ==========================================
  // 5. COMPONENTE NAVBAR
  // ==========================================
  window.Navbar = {
    render(activeTab = 'jobs') {
      const role = window.store.getRole();
      const unreadCount = window.store.getUnreadNotificationsCount();
      const candidate = window.store.getCandidateProfile();
      const company = window.store.getCurrentCompany();
      const currentUser = window.store.getCurrentUser();

      let navTabs = [];
      if (role === 'candidate') {
        const appCount = window.store.getApplications().filter(a => a.candidateId === candidate.id).length;
        navTabs = [
          { id: 'jobs', label: 'Explorar Vagas', icon: 'briefcase' },
          { id: 'courses', label: 'Cursos & Qualifica AL', icon: 'academic-cap' },
          { id: 'news', label: 'Notícias & Editais', icon: 'newspaper' },
          { id: 'support', label: 'Atendimento & SINE', icon: 'life-buoy' },
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
          { id: 'company-new-job', label: '+ Nova Vaga (IA)', icon: 'plus-circle' },
          { id: 'news', label: 'Notícias & Comunicados', icon: 'newspaper' },
          { id: 'support', label: 'Suporte à Empresa', icon: 'life-buoy' }
        ];
      } else {
        navTabs = [
          { id: 'admin-dashboard', label: 'Painel Executivo', icon: 'bar-chart-2' },
          { id: 'admin-companies', label: 'Homologação de Empresas', icon: 'shield-check' },
          { id: 'admin-jobs', label: 'Moderação de Vagas', icon: 'list' },
          { id: 'courses', label: 'Gestão de Cursos', icon: 'academic-cap' },
          { id: 'news', label: 'Notícias & Push', icon: 'newspaper' },
          { id: 'admin-audit', label: 'Trilha de Auditoria LGPD', icon: 'lock' },
          { id: 'admin-geo-export', label: 'Exportação & Geomapeamento AL', icon: 'map' },
          { id: 'support', label: 'Atendimento Cidadão', icon: 'life-buoy' }
        ];
      }

      return `
        <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          
          <!-- Faixa Governamental Oficial Unificada SETEQ (Única, Sem Duplicidades) -->
          <div class="bg-slate-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 select-none no-print">
            
            <!-- Lado Esquerdo: Identidade do Governo e Pasta -->
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 font-bold tracking-wide text-white">
                <span class="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shadow-xs"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-white inline-block shadow-xs"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-xs"></span>
                GOVERNO DE ALAGOAS
              </span>
              <span class="text-slate-600 hidden sm:inline">•</span>
              <span class="text-slate-300 font-medium hidden sm:inline">SETEQ – Secretaria do Trabalho, Emprego e Qualificação</span>
              <span class="text-slate-600 hidden lg:inline">•</span>
              <span class="text-emerald-400 font-medium hidden lg:inline text-[11px]">SINE / IMO Integrado</span>
            </div>

            <!-- Lado Direito: Ações Principais e Menu Anexado -->
            <div class="flex items-center gap-2">
              
              <!-- Botão Comunicado Oficial -->
              <button id="btn-open-institutional" class="hover:text-amber-300 text-[11px] flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-900 transition-colors font-semibold text-slate-300 cursor-pointer" title="Ler comunicado oficial da SETEQ">
                <span>🏛️</span>
                <span class="hidden sm:inline">Alagoas em Evolução</span>
              </button>

              <!-- Botão Destaque: Simulador Mobile -->
              <button id="btn-open-mobile-simulator" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all transform active:scale-95 text-[11px]" title="Abrir Simulador do Aplicativo Mobile SETEQ">
                <svg class="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <span>📱 App Mobile</span>
              </button>

              <!-- MENU ANEXADO: Acessibilidade, Tema e Opções Governamentais -->
              <div class="relative inline-block text-left" id="attached-menu-wrapper">
                <button id="btn-toggle-attached-menu" type="button" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold flex items-center gap-1.5 transition-all text-[11px] shadow-sm cursor-pointer" aria-expanded="false" aria-haspopup="true" title="Abrir menu de acessibilidade, preferências e dados">
                  <span class="text-cyan-400">♿</span>
                  <span>Menu Anexado</span>
                  <svg class="w-3 h-3 text-slate-400 transition-transform duration-200" id="attached-menu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Painel Flutuante Anexado (Dropdown) -->
                <div id="attached-menu-dropdown" class="hidden absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-slate-900/98 border border-slate-700 shadow-2xl z-50 p-4 text-slate-200 text-xs fade-in backdrop-blur-xl">
                  
                  <!-- Cabeçalho do Menu Anexado -->
                  <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800">
                    <div class="flex items-center gap-1.5 font-bold text-white text-xs">
                      <span class="text-cyan-400">♿</span>
                      <span>Acessibilidade & Sistema</span>
                    </div>
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">WCAG 2.1 AA</span>
                  </div>

                  <!-- Ajuste de Tamanho de Fonte -->
                  <div class="mb-3">
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1.5">Tamanho da Fonte:</label>
                    <div class="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-center">
                      <button id="btn-font-dec" class="py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors text-xs cursor-pointer" title="Diminuir fonte">A- (85%)</button>
                      <button id="btn-font-reset" class="py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors border-x border-slate-800 text-xs cursor-pointer" title="Fonte padrão">A (100%)</button>
                      <button id="btn-font-inc" class="py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors text-xs cursor-pointer" title="Aumentar fonte">A+ (130%)</button>
                    </div>
                  </div>

                  <!-- Modos Visuais: Dark Mode e Alto Contraste -->
                  <div class="grid grid-cols-2 gap-2 mb-3">
                    <button id="btn-toggle-dark" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer">
                      <span id="dark-icon">🌙</span>
                      <span id="dark-text">Dark Mode</span>
                    </button>
                    <button id="btn-toggle-contrast" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer">
                      <span>⚡</span>
                      <span>Alto Contraste</span>
                    </button>
                  </div>

                  <!-- Sintetizador de Voz TTS -->
                  <button id="btn-tts-toggle" class="w-full p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 font-semibold flex items-center justify-center gap-2 transition-colors text-xs mb-2 cursor-pointer">
                    <span id="tts-icon">🔊</span>
                    <span id="tts-text">Ouvir Conteúdo (Voz)</span>
                  </button>

                  <!-- Intérprete de LIBRAS (Acessibilidade Surdos) -->
                  <button id="btn-libras-toggle" class="w-full p-2 rounded-xl bg-gradient-to-r from-blue-950 to-slate-800 hover:from-blue-900 hover:to-slate-700 border border-cyan-500/40 text-cyan-300 font-semibold flex items-center justify-center gap-2 transition-colors text-xs mb-3 cursor-pointer shadow-sm">
                    <span class="text-base">🤟</span>
                    <span>Ativar Intérprete de LIBRAS</span>
                  </button>

                  <!-- Governança e Dados -->
                  <div class="pt-2.5 border-t border-slate-800 space-y-2">
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1.5 text-slate-300">
                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>LGPD (Lei 13.709/18)</span>
                      </span>
                      <span class="text-emerald-400 font-semibold text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">Conforme</span>
                    </div>

                    <div class="flex items-center justify-between pt-1 text-[11px]">
                      <span class="text-slate-400">Dados do Sistema:</span>
                      <button id="btn-reset-data" class="text-rose-400 hover:text-rose-300 underline underline-offset-2 transition-colors font-medium cursor-pointer">
                        Resetar Dados Demo
                      </button>
                    </div>
                  </div>

                  <!-- Atalhos Rápidos de Teclado -->
                  <div class="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex flex-wrap justify-between gap-1">
                    <span>Alt+C: Contraste</span>
                    <span>Alt+D: Dark</span>
                    <span>Alt+V: Voz</span>
                    <span>Alt+L: LIBRAS</span>
                    <span>Alt+I: Chat IA</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 gap-4">
              
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

              <!-- Ações Direita -->
              <div class="flex items-center gap-2">
                ${currentUser ? `
                  <select id="mobile-role-select" class="md:hidden text-xs border border-slate-300 rounded-lg p-1.5 bg-white font-medium">
                    <option value="candidate" ${role === 'candidate' ? 'selected' : ''}>Cidadão</option>
                    <option value="company" ${role === 'company' ? 'selected' : ''}>Empresa</option>
                    <option value="admin" ${role === 'admin' ? 'selected' : ''}>SETEQ AL</option>
                  </select>

                  <button id="btn-notifications" class="relative p-2 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors" title="Notificações">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    ${unreadCount > 0 ? `
                      <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                        ${unreadCount}
                      </span>
                    ` : ''}
                  </button>

                  <!-- Informações do Usuário Autenticado -->
                  <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <div class="w-8 h-8 rounded-full ${role === 'candidate' ? 'bg-blue-100 text-blue-800' : role === 'company' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'} font-bold text-xs flex items-center justify-center border border-slate-200">
                      ${currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div class="hidden lg:block text-left text-xs">
                      <p class="font-bold text-slate-800 leading-tight">${currentUser.name}</p>
                      <p class="text-[10px] ${role === 'company' ? 'text-emerald-600' : role === 'admin' ? 'text-red-600' : 'text-slate-500'} font-medium">
                        ${currentUser.badge || (role === 'candidate' ? 'Cidadão AL' : role === 'company' ? 'Empresa Parceira' : 'Gestor SETEQ')}
                      </p>
                    </div>

                    ${role === 'candidate' ? `
                      <button id="btn-print-cv-quick" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Imprimir CV SETEQ
                      </button>
                    ` : ''}

                    <button id="btn-nav-switch-account" class="px-2 py-1 text-slate-500 hover:text-blue-900 text-xs font-semibold rounded hover:bg-slate-100 transition-colors" title="Acessar com outra conta">
                      Trocar Conta
                    </button>
                    <button id="btn-nav-logout" class="px-2 py-1 text-rose-600 hover:text-rose-800 text-xs font-semibold rounded hover:bg-rose-50 transition-colors" title="Sair da conta">
                      Sair
                    </button>
                  </div>
                ` : `
                  <div class="flex items-center gap-2">
                    <button id="btn-nav-login" class="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                      Entrar
                    </button>
                    <button id="btn-nav-register" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                      + Criar Conta
                    </button>
                  </div>
                `}

              </div>
            </div>

            <!-- Abas de Navegação -->
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
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.getAttribute('data-tab');
          if (tabId && typeof onTabChange === 'function') {
            onTabChange(tabId);
          }
        });
      });

      document.querySelectorAll('.role-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const newRole = btn.getAttribute('data-role');
          if (newRole) {
            window.store.setRole(newRole);
            window.Toast.show(`Alternado para perfil: ${newRole === 'candidate' ? 'Cidadão' : newRole === 'company' ? 'Empresa Parceira' : 'Gestor SETEQ'}`, 'info');
          }
        });
      });

      document.getElementById('mobile-role-select')?.addEventListener('change', (e) => {
        const newRole = e.target.value;
        window.store.setRole(newRole);
        window.Toast.show(`Alternado para perfil: ${newRole}`, 'info');
      });

      document.getElementById('nav-logo-btn')?.addEventListener('click', () => {
        const role = window.store.getRole();
        if (role === 'candidate') onTabChange('jobs');
        else if (role === 'company') onTabChange('company-dashboard');
        else onTabChange('admin-dashboard');
      });

      document.getElementById('btn-print-cv-quick')?.addEventListener('click', () => {
        onTabChange('print-cv');
      });

      document.getElementById('btn-nav-switch-account')?.addEventListener('click', () => {
        onTabChange('auth');
      });

      document.getElementById('btn-nav-login')?.addEventListener('click', () => {
        onTabChange('auth');
      });

      document.getElementById('btn-nav-register')?.addEventListener('click', () => {
        if (window.appInstance) window.appInstance.authSubTab = 'register-candidate';
        onTabChange('auth');
      });

      document.getElementById('btn-nav-logout')?.addEventListener('click', () => {
        window.store.logout();
        window.Toast.show('Você saiu da sua conta.', 'info');
        onTabChange('auth');
      });

      document.getElementById('btn-open-institutional')?.addEventListener('click', () => {
        onTabChange('welcome');
      });

      document.getElementById('btn-reset-data')?.addEventListener('click', () => {
        if (confirm('Deseja reiniciar a base com os dados iniciais do Governo de Alagoas?')) {
          window.store.resetAll();
          window.Toast.show('Dados restaurados com sucesso!', 'success');
        }
      });

      document.getElementById('btn-notifications')?.addEventListener('click', () => {
        const notifs = window.store.getNotifications();
        window.Modal.open({
          title: 'Central de Notificações Governamentais',
          size: 'md',
          contentHtml: `
            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Alertas sobre candidaturas e processos em Alagoas</span>
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
              window.store.markAllNotificationsRead();
              window.Toast.show('Todas as notificações foram marcadas como lidas', 'info');
              window.Modal.close();
            });
          }
        });
      });
    }
  };

  // ==========================================
  // 6. MÓDULO DO CANDIDATO
  // ==========================================
  window.CandidateView = {
    render(activeTab = 'jobs') {
      const candidate = window.store.getCandidateProfile();

      if (activeTab === 'applications') return this.renderApplications(candidate);
      if (activeTab === 'profile') return this.renderProfile(candidate);
      if (activeTab === 'saved') return this.renderSaved(candidate);
      if (activeTab === 'insights') return this.renderInsights(candidate);

      return this.renderJobsExplorer(candidate);
    },

    renderJobsExplorer(candidate) {
      return `
        <div class="space-y-6 fade-in">
          
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
            <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="text" id="filter-search" placeholder="Cargo, habilidade ou empresa..." class="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800">
              </div>

              <div>
                <select id="filter-city" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white">
                  <option value="">Todos os Municípios de AL</option>
                  ${(window.ALAGOAS_CITIES || []).map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>

              <div>
                <select id="filter-work-model" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white">
                  <option value="">Todas as Modalidades</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>

              <div>
                <select id="filter-category" class="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white">
                  <option value="">Todos os Setores Econômicos</option>
                  ${(window.JOB_CATEGORIES || []).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <label class="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                <input type="checkbox" id="filter-high-match" class="rounded text-blue-800">
                <span>Apenas vagas com Alto Match IA (≥ 80%)</span>
              </label>
              <div id="jobs-count-badge" class="text-slate-500 font-medium">
                Carregando vagas...
              </div>
            </div>
          </div>

          <div id="jobs-grid-container" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

        </div>
      `;
    },

    attachJobsEvents() {
      const candidate = window.store.getCandidateProfile();
      const allJobs = window.store.getJobs();
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

        let calculatedJobs = allJobs.map(job => {
          const match = window.AIEngine.calculateMatch(candidate, job);
          return {
            ...job,
            aiScore: match.score,
            aiMatch: match
          };
        });

        calculatedJobs.sort((a, b) => b.aiScore - a.aiScore);

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
              <p class="text-sm font-bold text-slate-700">Nenhuma vaga encontrada com esses filtros</p>
              <p class="text-xs text-slate-500 mt-1">Tente remover alguns filtros ou buscar por outra cidade de Alagoas.</p>
            </div>
          `;
          return;
        }

        const savedIds = window.store.getSavedJobIds();
        const applications = window.store.getApplications();

        container.innerHTML = filtered.map(job => {
          const isSaved = savedIds.includes(job.id);
          const hasApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidate.id);

          return `
            <div class="bg-white rounded-xl border border-slate-200 hover-lift p-5 flex flex-col justify-between transition-all">
              <div>
                <div class="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <span class="text-xs font-semibold text-blue-900 flex items-center gap-1">
                      ${job.companyName}
                      <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    </span>
                    <h3 class="text-base font-bold text-slate-900 leading-snug mt-0.5">${job.title}</h3>
                  </div>

                  <div class="flex flex-col items-end">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${job.aiMatch.badgeClass}">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      ${job.aiScore}% Match
                    </span>
                    <span class="text-[10px] text-slate-400 font-medium mt-0.5">${job.aiMatch.label}</span>
                  </div>
                </div>

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

                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  ${job.description}
                </p>

                <div class="flex flex-wrap gap-1 mb-4">
                  ${(job.requiredSkills || []).slice(0, 4).map(skill => {
                    const isOwned = (candidate.hardSkills || []).some(s => s.toLowerCase().includes(skill.toLowerCase()));
                    return `
                      <span class="text-[10px] px-2 py-0.5 rounded-md font-medium ${isOwned ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'}">
                        ${isOwned ? '✓ ' : ''}${skill}
                      </span>
                    `;
                  }).join('')}
                </div>
              </div>

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
                      ✓ Inscrito
                    </span>
                  ` : `
                    <button data-job-id="${job.id}" data-score="${job.aiScore}" class="btn-apply-quick px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-all flex items-center gap-1">
                      Candidatar
                    </button>
                  `}
                </div>
              </div>

            </div>
          `;
        }).join('');

        container.querySelectorAll('.btn-toggle-save').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jId = btn.getAttribute('data-job-id');
            window.store.toggleSaveJob(jId);
            renderFiltered();
          });
        });

        container.querySelectorAll('.btn-view-job').forEach(btn => {
          btn.addEventListener('click', () => {
            const jId = btn.getAttribute('data-job-id');
            window.CandidateView.openJobDetailsModal(jId);
          });
        });

        container.querySelectorAll('.btn-apply-quick').forEach(btn => {
          btn.addEventListener('click', () => {
            const jId = btn.getAttribute('data-job-id');
            const score = Number(btn.getAttribute('data-score')) || 85;
            const res = window.store.applyToJob(jId, score);
            if (res.success) {
              window.Toast.show('Candidatura realizada com sucesso! Acompanhe no painel.', 'success');
              renderFiltered();
            } else {
              window.Toast.show(res.message, 'warning');
            }
          });
        });
      };

      searchInput?.addEventListener('input', renderFiltered);
      citySelect?.addEventListener('change', renderFiltered);
      modelSelect?.addEventListener('change', renderFiltered);
      categorySelect?.addEventListener('change', renderFiltered);
      highMatchCheckbox?.addEventListener('change', renderFiltered);

      renderFiltered();
    },

    openJobDetailsModal(jobId) {
      const job = window.store.getJob(jobId);
      if (!job) return;

      const candidate = window.store.getCandidateProfile();
      const match = window.AIEngine.calculateMatch(candidate, job);
      const applications = window.store.getApplications();
      const hasApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidate.id);

      window.Modal.open({
        title: `${job.title} • ${job.companyName}`,
        size: 'xl',
        contentHtml: `
          <div class="space-y-6">
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

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-semibold">Município</p>
                <p class="font-bold text-slate-800 mt-0.5">${job.city}, AL</p>
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-semibold">Remuneração</p>
                <p class="font-bold text-emerald-700 mt-0.5">${job.salaryDisplay}</p>
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-semibold">Modalidade</p>
                <p class="font-bold text-slate-800 mt-0.5">${job.contractType} • ${job.workModel}</p>
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-semibold">Vagas</p>
                <p class="font-bold text-slate-800 mt-0.5">${job.vacanciesCount} vaga(s)</p>
              </div>
            </div>

            <div>
              <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Descrição das Atividades</h4>
              <p class="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                ${job.description}
              </p>
            </div>

            <div>
              <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Competências Solicitadas</h4>
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

            <div>
              <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Benefícios</h4>
              <div class="flex flex-wrap gap-2 text-xs text-slate-700">
                ${(job.benefits || []).map(b => `
                  <span class="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">✨ ${b}</span>
                `).join('')}
              </div>
            </div>

            <div class="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Classificação Brasileira de Ocupações (CBO):</strong> ${job.cbo} • SINE/SETEQ Alagoas.
            </div>
          </div>
        `,
        footerHtml: `
          <button id="modal-close-action" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
            Fechar
          </button>
          ${hasApplied ? `
            <button disabled class="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg opacity-80 cursor-not-allowed">
              ✓ Já Inscrito
            </button>
          ` : `
            <button id="modal-btn-apply" class="px-5 py-2 text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm flex items-center gap-1.5">
              Confirmar Candidatura 1-Clique
            </button>
          `}
        `,
        onRender: (container, close) => {
          container.querySelector('#modal-close-action')?.addEventListener('click', close);
          container.querySelector('#modal-btn-apply')?.addEventListener('click', () => {
            const res = window.store.applyToJob(job.id, match.score);
            if (res.success) {
              window.Toast.show('Candidatura submetida com sucesso! Boa sorte!', 'success');
              close();
              window.CandidateView.attachJobsEvents();
            } else {
              window.Toast.show(res.message, 'warning');
            }
          });
        }
      });
    },

    renderApplications(candidate) {
      const apps = window.store.getApplications().filter(a => a.candidateId === candidate.id);
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
            <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              Total: <strong>${apps.length}</strong> processo(s)
            </span>
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
                        <p class="text-xs text-slate-500 mt-0.5">Inscrição em: ${new Date(app.appliedAt).toLocaleDateString('pt-BR')}</p>
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

    renderProfile(candidate) {
      return `
        <div class="space-y-6 fade-in max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900">Gerenciamento do Currículo Digital</h2>
              <p class="text-xs text-slate-500 mt-1">Mantenha seus dados atualizados para aumentar a assertividade do Match de IA.</p>
            </div>
            <button id="btn-view-printable-cv" class="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Currículo Padronizado SETEQ (PDF)
            </button>
          </div>

          <form id="form-cv-profile" class="space-y-6">
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
                    ${(window.ALAGOAS_CITIES || []).map(c => `
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
                  <label class="font-semibold text-slate-700 block mb-1">Escolaridade</label>
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
              </div>
            </div>

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

            <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-2">
              <label class="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" id="cv-lgpd-consent" checked required class="mt-0.5 rounded text-blue-900">
                <span>
                  <strong>Consentimento LGPD (Lei 13.709/2018):</strong> Autorizo a Secretaria do Trabalho, Emprego e Qualificação de Alagoas (SETEQ) e empresas parceiras a acessarem meus dados para fins exclusivos de intermediação de mão de obra.
                </span>
              </label>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button type="submit" class="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2">
                Salvar Alterações do Currículo
              </button>
            </div>
          </form>
        </div>
      `;
    },

    attachProfileEvents(onTabChange) {
      const candidate = window.store.getCandidateProfile();

      document.getElementById('btn-view-printable-cv')?.addEventListener('click', () => {
        onTabChange('print-cv');
      });

      const inputSkill = document.getElementById('input-new-skill');
      const btnAddSkill = document.getElementById('btn-add-skill');
      const chipsContainer = document.getElementById('chips-hard-skills');

      const addSkillTag = (skillName) => {
        const trimmed = skillName.trim();
        if (!trimmed) return;
        if (!candidate.hardSkills.includes(trimmed)) {
          candidate.hardSkills.push(trimmed);
          window.store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
          window.Toast.show(`Habilidade "${trimmed}" adicionada!`, 'info');
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

      chipsContainer?.querySelectorAll('.btn-remove-skill').forEach(btn => {
        btn.addEventListener('click', () => {
          const skill = btn.getAttribute('data-skill');
          candidate.hardSkills = candidate.hardSkills.filter(s => s !== skill);
          window.store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
          window.Toast.show(`Habilidade "${skill}" removida`, 'info');
          onTabChange('profile');
        });
      });

      document.getElementById('btn-extract-skills')?.addEventListener('click', () => {
        const summaryText = document.getElementById('cv-summary')?.value || '';
        const extracted = window.AIEngine.extractSkillsFromText(summaryText);
        if (extracted.length === 0) {
          window.Toast.show('Nenhuma competência nova identificada no texto.', 'info');
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
          window.store.updateCandidateProfile({ hardSkills: candidate.hardSkills });
          window.Toast.show(`A IA identificou e adicionou ${addedCount} competência(s)!`, 'success');
          onTabChange('profile');
        } else {
          window.Toast.show('Todas as competências identificadas já constam no perfil.', 'info');
        }
      });

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
        window.store.updateCandidateProfile(updated);
        window.Toast.show('Currículo atualizado com sucesso!', 'success');
      });
    },

    renderSaved(candidate) {
      const savedIds = window.store.getSavedJobIds();
      const allJobs = window.store.getJobs();
      const savedJobs = allJobs.filter(j => savedIds.includes(j.id));

      return `
        <div class="space-y-6 fade-in">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-xl font-extrabold text-slate-900">Vagas Favoritadas</h2>
            <p class="text-xs text-slate-500 mt-1">Oportunidades salvas para envio posterior.</p>
          </div>

          ${savedJobs.length === 0 ? `
            <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
              <p class="text-sm font-bold text-slate-700">Você ainda não favoritou nenhuma vaga.</p>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${savedJobs.map(job => {
                const match = window.AIEngine.calculateMatch(candidate, job);
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
          window.store.toggleSaveJob(jId);
          window.Toast.show('Vaga removida dos favoritos', 'info');
          onTabChange('saved');
        });
      });

      document.querySelectorAll('.btn-apply-saved').forEach(btn => {
        btn.addEventListener('click', () => {
          const jId = btn.getAttribute('data-job-id');
          const res = window.store.applyToJob(jId, 88);
          if (res.success) {
            window.Toast.show('Candidatura submetida com sucesso!', 'success');
            onTabChange('applications');
          } else {
            window.Toast.show(res.message, 'warning');
          }
        });
      });
    },

    renderInsights(candidate) {
      const allJobs = window.store.getJobs();
      const insights = window.AIEngine.getCareerInsights(candidate, allJobs);

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

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Cursos e Qualificação Gratuita
              </h3>
              <ul class="text-xs text-slate-700 space-y-2 pt-1">
                <li class="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <strong>Programa Oxente Tech Alagoas:</strong> Formação acelerada em software e tecnologia.
                </li>
                <li class="p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                  <strong>Qualifica Alagoas:</strong> Capacitação em hotelaria, comércio e atendimento ao cliente.
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  };

  // ==========================================
  // 7. MÓDULO DA EMPRESA
  // ==========================================
  window.CompanyView = {
    render(activeTab = 'company-dashboard') {
      const company = window.store.getCurrentCompany();

      if (activeTab === 'company-kanban') return this.renderKanban(company);
      if (activeTab === 'company-talents') return this.renderTalentSearch(company);
      if (activeTab === 'company-new-job') return this.renderNewJobForm(company);

      return this.renderDashboard(company);
    },

    renderDashboard(company) {
      const allCompanies = window.store.getCompanies();
      const jobs = window.store.getJobs().filter(j => j.companyId === company.id);
      const allApps = window.store.getApplications();
      const companyApps = allApps.filter(a => a.companyId === company.id);
      const activeJobs = jobs.filter(j => j.status === 'active');
      const interviewsCount = companyApps.filter(a => a.status === 'interview').length;

      return `
        <div class="space-y-6 fade-in">
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

            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500 font-semibold hidden sm:inline">Alternar Empresa:</span>
              <select id="select-active-company" class="text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 font-medium">
                ${allCompanies.map(c => `
                  <option value="${c.id}" ${c.id === company.id ? 'selected' : ''}>${c.tradeName || c.name} (${c.city})</option>
                `).join('')}
              </select>
              <button id="btn-goto-new-job" class="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                + Publicar Vaga
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p class="text-xs text-slate-500 font-medium">Vagas Publicadas</p>
              <p class="text-2xl font-black text-slate-900 mt-1">${jobs.length}</p>
              <p class="text-[11px] text-emerald-600 font-semibold mt-1">${activeJobs.length} ativas</p>
            </div>

            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p class="text-xs text-slate-500 font-medium">Total de Candidaturas</p>
              <p class="text-2xl font-black text-blue-900 mt-1">${companyApps.length}</p>
              <p class="text-[11px] text-blue-600 font-semibold mt-1">Intermediadas via SETEQ</p>
            </div>

            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p class="text-xs text-slate-500 font-medium">Entrevistas Marcadas</p>
              <p class="text-2xl font-black text-amber-600 mt-1">${interviewsCount}</p>
              <p class="text-[11px] text-amber-700 font-semibold mt-1">Em andamento</p>
            </div>

            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p class="text-xs text-slate-500 font-medium">Aderência Média IA</p>
              <p class="text-2xl font-black text-emerald-600 mt-1">92%</p>
              <p class="text-[11px] text-slate-500 font-medium mt-1">Match ativo</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900">Vagas da Organização</h3>
              <span class="text-xs text-slate-400">${jobs.length} vaga(s) encontrada(s)</span>
            </div>

            ${jobs.length === 0 ? `
              <div class="p-8 text-center text-slate-500 text-xs">
                Sua empresa ainda não publicou nenhuma vaga.
              </div>
            ` : `
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                  <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th class="p-4">Cargo</th>
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
                          <td class="p-4 font-bold text-slate-900">${job.title}</td>
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
                            <button data-job-id="${job.id}" class="btn-goto-kanban px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs">
                              Triagem Kanban
                            </button>
                            <button data-job-id="${job.id}" class="btn-toggle-job-status px-2.5 py-1 text-slate-500 hover:text-slate-800 rounded-lg text-xs">
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
      document.getElementById('select-active-company')?.addEventListener('change', (e) => {
        window.store.setCurrentCompany(e.target.value);
        window.Toast.show('Contexto da empresa atualizado', 'info');
        onTabChange('company-dashboard');
      });

      document.getElementById('btn-goto-new-job')?.addEventListener('click', () => {
        onTabChange('company-new-job');
      });

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
          const job = window.store.getJob(jobId);
          if (job) {
            const newStatus = job.status === 'active' ? 'paused' : 'active';
            window.store.updateJob(jobId, { status: newStatus });
            window.Toast.show(`Vaga ${newStatus === 'active' ? 'reativada' : 'pausada'} com sucesso!`, 'info');
            onTabChange('company-dashboard');
          }
        });
      });
    },

    renderKanban(company) {
      const jobs = window.store.getJobs().filter(j => j.companyId === company.id);
      const savedJobId = sessionStorage.getItem('kanban_selected_job') || (jobs[0]?.id || '');
      const selectedJob = window.store.getJob(savedJobId) || jobs[0];

      const allApps = window.store.getApplications();
      const jobApps = selectedJob ? allApps.filter(a => a.jobId === selectedJob.id) : [];

      const columns = [
        { id: 'applied', label: '1. Novos Inscritos', color: 'border-blue-500' },
        { id: 'screening', label: '2. Triagem / Match IA', color: 'border-indigo-500' },
        { id: 'interview', label: '3. Entrevistas', color: 'border-amber-500' },
        { id: 'approved', label: '4. Aprovados / Oferta', color: 'border-emerald-500' },
        { id: 'rejected', label: '5. Banco Reserva', color: 'border-slate-400' }
      ];

      return `
        <div class="space-y-6 fade-in">
          <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900">Pipeline de Seleção (Quadro Kanban)</h2>
              <p class="text-xs text-slate-500 mt-0.5">Arraste os candidatos entre as etapas do processo.</p>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <label class="text-xs font-semibold text-slate-600 whitespace-nowrap">Vaga:</label>
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

                    <div class="space-y-2.5 flex-1 min-h-[150px] kanban-cards-area" data-status="${col.id}">
                      ${colApps.length === 0 ? `
                        <div class="h-24 flex items-center justify-center text-slate-400 text-[11px] italic border-2 border-dashed border-slate-200 rounded-xl">
                          Vazio
                        </div>
                      ` : colApps.map(app => `
                        <div class="kanban-card bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2" draggable="true" data-app-id="${app.id}">
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

                          <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                            <button data-app-id="${app.id}" class="btn-kanban-details text-blue-700 hover:underline font-semibold">
                              Ver Perfil
                            </button>

                            <div class="flex items-center gap-1">
                              <button data-app-id="${app.id}" data-action="prev" class="btn-move-stage px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-bold">
                                ←
                              </button>
                              <button data-app-id="${app.id}" data-action="next" class="btn-move-stage px-1.5 py-0.5 bg-blue-100 hover:bg-blue-200 rounded text-blue-900 font-bold">
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

      document.querySelectorAll('.btn-move-stage').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const appId = btn.getAttribute('data-app-id');
          const action = btn.getAttribute('data-action');
          const app = window.store.getApplications().find(a => a.id === appId);
          if (!app) return;

          const currentIdx = statusOrder.indexOf(app.status);
          let targetIdx = action === 'next' ? currentIdx + 1 : currentIdx - 1;
          if (targetIdx >= 0 && targetIdx < statusOrder.length) {
            const nextStatus = statusOrder[targetIdx];
            if (nextStatus === 'interview') {
              window.Modal.open({
                title: `Agendar Entrevista • ${app.candidateName}`,
                size: 'md',
                contentHtml: `
                  <form id="form-schedule-interview" class="space-y-4 text-xs">
                    <div>
                      <label class="font-bold text-slate-700 block mb-1">Data e Horário *</label>
                      <input type="datetime-local" id="interview-datetime" required class="w-full p-2.5 border border-slate-300 rounded-lg">
                    </div>
                    <div>
                      <label class="font-bold text-slate-700 block mb-1">Instruções / Link do Google Meet ou Local *</label>
                      <textarea id="interview-instructions" rows="3" required placeholder="Ex: meet.google.com/xyz ou comparecer na sede da empresa..." class="w-full p-2.5 border border-slate-300 rounded-lg"></textarea>
                    </div>
                    <div class="flex justify-end gap-2 pt-2">
                      <button type="submit" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg">
                        Confirmar e Convocar Candidato
                      </button>
                    </div>
                  </form>
                `,
                onRender: (container, close) => {
                  container.querySelector('#form-schedule-interview')?.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    const dt = container.querySelector('#interview-datetime')?.value;
                    const notes = container.querySelector('#interview-instructions')?.value;
                    window.store.updateApplicationStage(app.id, 'interview', notes, dt);
                    window.Toast.show(`Entrevista agendada com sucesso!`, 'success');
                    close();
                    onTabChange('company-kanban');
                  });
                }
              });
            } else {
              window.store.updateApplicationStage(appId, nextStatus);
              window.Toast.show(`Candidato movido para nova etapa`, 'success');
              onTabChange('company-kanban');
            }
          }
        });
      });

      document.querySelectorAll('.btn-kanban-details').forEach(btn => {
        btn.addEventListener('click', () => {
          const appId = btn.getAttribute('data-app-id');
          const app = window.store.getApplications().find(a => a.id === appId);
          if (app) {
            const candidate = window.store.getAllCandidates().find(c => c.id === app.candidateId) || window.store.getCandidateProfile();
            window.Modal.open({
              title: `Perfil do Candidato: ${candidate.fullName}`,
              size: 'lg',
              contentHtml: `
                <div class="space-y-4 text-xs">
                  <div class="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">${candidate.fullName}</h4>
                      <p class="text-slate-500 mt-0.5">📍 ${candidate.city}, AL • ${candidate.targetRole || 'Profissional'}</p>
                      <p class="text-slate-600 mt-1 font-semibold">Contato: ${candidate.phone || '(82) 99654-3210'} • ${candidate.email}</p>
                    </div>
                    <span class="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                      Score IA: ${app.aiScore || 90}%
                    </span>
                  </div>
                  ${candidate.summary ? `
                    <div>
                      <h5 class="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Resumo</h5>
                      <p class="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">${candidate.summary}</p>
                    </div>
                  ` : ''}
                  <div>
                    <h5 class="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">Habilidades</h5>
                    <div class="flex flex-wrap gap-1.5">
                      ${(candidate.hardSkills || []).map(s => `
                        <span class="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">${s}</span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `
            });
          }
        });
      });

      let draggedAppId = null;
      document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', () => {
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
            window.store.updateApplicationStage(draggedAppId, newStatus);
            window.Toast.show(`Candidato movido para ${newStatus}`, 'success');
            onTabChange('company-kanban');
          }
        });
      });
    },

    renderTalentSearch(company) {
      const candidates = window.store.getAllCandidates();
      return `
        <div class="space-y-6 fade-in">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-xl font-extrabold text-slate-900">Banco de Talentos SETEQ Alagoas</h2>
            <p class="text-xs text-slate-500 mt-1">Busque profissionais cadastrados no estado com autorização LGPD para intermediação.</p>
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
                    ${cand.summary || 'Profissional com cadastro homologado junto à SETEQ.'}
                  </p>

                  <div class="flex flex-wrap gap-1 mt-3">
                    ${(cand.hardSkills || []).slice(0, 3).map(s => `
                      <span class="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">${s}</span>
                    `).join('')}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-slate-100 mt-4 text-xs">
                  <span class="text-emerald-700 font-bold text-[11px]">Disponível</span>
                  <button class="btn-invite-cand px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs transition-colors">
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
          window.Toast.show('Convite formal enviado com sucesso ao candidato via SETEQ!', 'success');
        });
      });
    },

    renderNewJobForm(company) {
      return `
        <div class="space-y-6 fade-in max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900">Publicar Nova Vaga de Emprego</h2>
              <p class="text-xs text-slate-500 mt-1">Preenchimento assistido por Inteligência Artificial (SETEQ / CBO).</p>
            </div>
            <span class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
              ${company.tradeName || company.name}
            </span>
          </div>

          <form id="form-new-job" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="font-bold text-xs text-slate-800">Título do Cargo *</label>
                <button type="button" id="btn-ai-fill-job" class="text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 flex items-center gap-1.5 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Preencher com IA
                </button>
              </div>
              <input type="text" id="job-title" placeholder="Ex: Desenvolvedor Front-End, Recepcionista..." required class="w-full p-2.5 border border-slate-300 rounded-lg text-xs">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label class="font-bold text-slate-700 block mb-1">Município de Alagoas *</label>
                <select id="job-city" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                  ${(window.ALAGOAS_CITIES || []).map(c => `
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
                <label class="font-bold text-slate-700 block mb-1">Contrato *</label>
                <select id="job-contract" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                  <option value="CLT">CLT (Efetivo)</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Jovem Aprendiz">Jovem Aprendiz</option>
                  <option value="PJ">PJ</option>
                </select>
              </div>

              <div>
                <label class="font-bold text-slate-700 block mb-1">Vagas *</label>
                <input type="number" id="job-vacancies" min="1" value="1" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="font-bold text-slate-700 block mb-1">CBO *</label>
                <input type="text" id="job-cbo" value="3171-10 - Programador de Sistemas de Informação" required class="w-full p-2.5 border border-slate-300 rounded-lg">
              </div>

              <div>
                <label class="font-bold text-slate-700 block mb-1">Categoria</label>
                <select id="job-category" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                  ${(window.JOB_CATEGORIES || []).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>
            </div>

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

            <div class="text-xs">
              <label class="font-bold text-slate-700 block mb-1">Descrição e Atribuições *</label>
              <textarea id="job-description" rows="4" required class="w-full p-3 border border-slate-300 rounded-lg leading-relaxed"></textarea>
            </div>

            <div class="text-xs">
              <label class="font-bold text-slate-700 block mb-1">Competências Requeridas (separadas por vírgula) *</label>
              <input type="text" id="job-skills" placeholder="Ex: React, JavaScript, Git, Atendimento, Excel..." class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="submit" class="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2">
                Publicar Vaga no Empregos AL
              </button>
            </div>
          </form>
        </div>
      `;
    },

    attachNewJobEvents(onTabChange) {
      document.getElementById('btn-ai-fill-job')?.addEventListener('click', () => {
        const title = document.getElementById('job-title')?.value || '';
        if (!title) {
          window.Toast.show('Digite o cargo para a IA sugerir os requisitos!', 'warning');
          return;
        }

        const template = window.AIEngine.suggestJobTemplate(title);
        document.getElementById('job-cbo').value = template.cbo;
        document.getElementById('job-category').value = template.category;
        document.getElementById('job-education').value = template.educationLevel;
        document.getElementById('job-description').value = template.descriptionTemplate;
        document.getElementById('job-skills').value = template.requiredSkills.join(', ');
        window.Toast.show('Campos preenchidos com sugestões inteligentes da IA!', 'success');
      });

      document.getElementById('form-new-job')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const skillsRaw = document.getElementById('job-skills')?.value || '';

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
          benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde']
        };

        window.store.createJob(newJobData);
        window.Toast.show('Vaga publicada com sucesso!', 'success');
        onTabChange('company-dashboard');
      });
    }
  };

  // ==========================================
  // 8. MÓDULO ADMINISTRATIVO SETEQ
  // ==========================================
  window.AdminView = {
    render(activeTab = 'admin-dashboard') {
      if (activeTab === 'admin-companies') return this.renderCompanyValidation();
      if (activeTab === 'admin-jobs') return this.renderJobModeration();
      if (activeTab === 'admin-audit') return this.renderAuditLogs();
      if (activeTab === 'admin-geo-export') return this.renderGeoExport();

      return this.renderExecutiveDashboard();
    },

    renderExecutiveDashboard() {
      const indicators = window.store.getIndicators();
      const companies = window.store.getCompanies();
      const jobs = window.store.getJobs();

      return `
        <div class="space-y-6 fade-in">
          <div class="bg-gradient-to-r from-red-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Painel Estratégico SETEQ • Gestão 2026
              </span>
              <h2 class="text-2xl font-black mt-2">Observatório da Empregabilidade de Alagoas</h2>
              <p class="text-xs text-slate-300 mt-1">
                Consolidação de dados do Sistema Nacional de Emprego (SINE/IMO) estadual.
              </p>
            </div>
            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              Sistema Operando 100%
            </span>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p class="text-xs text-slate-500 font-semibold">Cidadãos Cadastrados</p>
              <p class="text-3xl font-black text-slate-900 mt-1">${indicators.totalCandidates.toLocaleString('pt-BR')}</p>
              <p class="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14% no trimestre</p>
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
              <p class="text-[11px] text-emerald-700 font-semibold mt-1">${indicators.pcdPlaced} PCDs inseridos</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

    renderCompanyValidation() {
      const companies = window.store.getCompanies();
      return `
        <div class="space-y-6 fade-in">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900">Homologação e Validação Cadastral de Empresas</h2>
              <p class="text-xs text-slate-500 mt-1">Conformidade com o Ministério do Trabalho e Emprego (MTE) para prevenir fraudes.</p>
            </div>
            <span class="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">
              ${companies.length} empresa(s)
            </span>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600">
                <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th class="p-4">Empresa / Razão Social</th>
                    <th class="p-4">CNPJ</th>
                    <th class="p-4">Município</th>
                    <th class="p-4">Status</th>
                    <th class="p-4 text-right">Ação SETEQ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${companies.map(comp => `
                    <tr class="hover:bg-slate-50/80 transition-colors">
                      <td class="p-4 font-bold text-slate-900">${comp.tradeName || comp.name}</td>
                      <td class="p-4 font-mono">${comp.cnpj}</td>
                      <td class="p-4">${comp.city}, AL</td>
                      <td class="p-4">
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          comp.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          comp.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-rose-100 text-rose-800 border border-rose-200'
                        }">
                          ${comp.status === 'approved' ? '✓ Homologada' : comp.status === 'pending' ? '⏳ Aguardando' : '✕ Bloqueada'}
                        </span>
                      </td>
                      <td class="p-4 text-right space-x-1.5">
                        ${comp.status !== 'approved' ? `
                          <button data-comp-id="${comp.id}" data-action="approved" class="btn-verify-company px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs">
                            Homologar
                          </button>
                        ` : ''}
                        ${comp.status !== 'rejected' ? `
                          <button data-comp-id="${comp.id}" data-action="rejected" class="btn-verify-company px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-xs">
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
          window.store.verifyCompany(compId, status);
          window.Toast.show(`Status atualizado com sucesso!`, 'success');
          onTabChange('admin-companies');
        });
      });
    },

    renderJobModeration() {
      const jobs = window.store.getJobs();
      return `
        <div class="space-y-6 fade-in">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900">Moderação de Vagas Estaduais</h2>
              <p class="text-xs text-slate-500 mt-1">Fiscalização de conteúdo e diretrizes do Ministério do Trabalho.</p>
            </div>
            <span class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
              ${jobs.length} vaga(s)
            </span>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600">
                <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th class="p-4">Cargo</th>
                    <th class="p-4">Empresa</th>
                    <th class="p-4">Município</th>
                    <th class="p-4">Remuneração</th>
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
          window.store.moderateJob(jobId, action);
          window.Toast.show(`Vaga #${jobId} moderada como "${action}"`, 'info');
        });
      });
    },

    renderAuditLogs() {
      const logs = window.store.getAuditLogs();
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
              <p class="text-xs text-slate-500 mt-1">Registro imutável de acessos e operações no sistema para auditoria governamental.</p>
            </div>

            <button id="btn-export-audit-log" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
              Exportar Relatório LGPD (JSON)
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600">
                <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th class="p-4">Data/Hora</th>
                    <th class="p-4">Usuário / Ator</th>
                    <th class="p-4">Ação</th>
                    <th class="p-4">Detalhamento</th>
                    <th class="p-4">Base Legal (LGPD)</th>
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
        const logs = window.store.getAuditLogs();
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_auditoria_lgpd_seteq_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        window.Toast.show('Relatório de auditoria exportado com sucesso!', 'success');
      });
    },

    // ==========================================
    // 8.5 OBSERVATÓRIO GEORREFERENCIADO & EXPORTAÇÃO
    // ==========================================
    renderGeoExport() {
      const geoData = window.store.getGeoData();
      const regions = window.store.getRegionsData();
      const palette = window.store.getSectorPalette();
      const candidates = window.store.getAllCandidates();
      const jobs = window.store.getJobs();

      const totalCandGeo = geoData.reduce((acc, c) => acc + c.candidatesCount, 0);
      const totalVacanciesGeo = geoData.reduce((acc, c) => acc + c.vacanciesCount, 0);
      const totalCompGeo = geoData.reduce((acc, c) => acc + c.companiesCount, 0);

      return `
        <div class="space-y-6 fade-in">
          
          <!-- Cabeçalho Executivo do Observatório -->
          <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div class="max-w-2xl">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-3">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Observatório Georreferenciado do Trabalho • SETEQ Alagoas
                </span>
                <h1 class="text-2xl sm:text-3xl font-black tracking-tight">
                  Geomapeamento Econômico & Central de Exportação
                </h1>
                <p class="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
                  Monitoramento territorial dos <strong>102 municípios de Alagoas</strong>, distribuição de mão de obra por setor econômico, mapa real interativo e extração de dados públicos em conformidade com a LGPD.
                </p>
              </div>

              <!-- Ações Rápidas de Exportação -->
              <div class="flex flex-wrap items-center gap-2.5">
                <button id="btn-export-cand-csv" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Exportar Cidadãos (CSV)
                </button>

                <button id="btn-export-jobs-csv" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Exportar Vagas (CSV)
                </button>

                <button id="btn-export-all-json" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Pacote JSON Completo
                </button>

                <button id="btn-print-summary" class="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5" title="Imprimir Relatório">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                  Imprimir
                </button>
              </div>
            </div>
            <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <!-- Cards de Métricas Geográficas e Setoriais -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs text-slate-500 font-semibold">Municípios Monitorados</span>
              <p class="text-3xl font-black text-slate-900 mt-1">102</p>
              <p class="text-[11px] text-blue-700 font-semibold mt-1">15 Pólos Econômicos Mapeados</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs text-slate-500 font-semibold">Mão de Obra Georreferenciada</span>
              <p class="text-3xl font-black text-blue-900 mt-1">${totalCandGeo.toLocaleString('pt-BR')}</p>
              <p class="text-[11px] text-emerald-600 font-semibold mt-1">↑ +18% na Região Metropolitana</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs text-slate-500 font-semibold">Oportunidades em Aberto</span>
              <p class="text-3xl font-black text-emerald-600 mt-1">${totalVacanciesGeo}</p>
              <p class="text-[11px] text-slate-500 font-semibold mt-1">${totalCompGeo} empresas contratando</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs text-slate-500 font-semibold">Setor Líder em Contratações</span>
              <p class="text-xl font-black text-indigo-700 mt-1 truncate" title="Tecnologia e Serviços">Tecnologia & Serviços</p>
              <p class="text-[11px] text-indigo-600 font-semibold mt-1">44% da demanda estadual</p>
            </div>
          </div>

          <!-- Barra de Filtros Interativos do Observatório -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
              <div>
                <label class="font-bold text-slate-600 block text-[11px] mb-1">Filtrar por Setor Econômico:</label>
                <select id="filter-geo-sector" class="py-2 px-3 border border-slate-300 rounded-lg bg-white font-medium text-xs">
                  <option value="">Todos os Setores Econômicos</option>
                  ${Object.keys(palette).map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="font-bold text-slate-600 block text-[11px] mb-1">Filtrar por Macrorregião de AL:</label>
                <select id="filter-geo-region" class="py-2 px-3 border border-slate-300 rounded-lg bg-white font-medium text-xs">
                  <option value="">Todas as Macrorregiões</option>
                  ${regions.map(r => `<option value="${r.name}">${r.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Alternador de Camada do Mapa -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button id="btn-mode-candidates" class="px-3 py-1.5 rounded-lg bg-white text-blue-900 shadow-sm font-bold transition-all">
                👥 Densidade de Mão de Obra
              </button>
              <button id="btn-mode-vacancies" class="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all">
                💼 Volume de Vagas
              </button>
            </div>
          </div>

          <!-- SEÇÃO 1: GRÁFICOS INTERATIVOS -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Gráfico 1: Vagas vs Candidatos por Setor -->
            <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Demanda de Emprego vs Mão de Obra por Setor</h3>
                  <p class="text-xs text-slate-400 mt-0.5">Comparativo de vagas abertas e candidatos ativos no SINE-AL</p>
                </div>
                <span class="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Interativo
                </span>
              </div>
              <div class="h-64 relative" id="container-chart-sector">
                <canvas id="chart-sector-demand"></canvas>
              </div>
            </div>

            <!-- Gráfico 2: Distribuição Territorial por Macrorregião -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Distribuição Territorial</h3>
                  <p class="text-xs text-slate-400 mt-0.5">% de postos por macrorregião</p>
                </div>
                <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Alagoas
                </span>
              </div>
              <div class="h-64 relative flex items-center justify-center" id="container-chart-doughnut">
                <canvas id="chart-regional-doughnut"></canvas>
              </div>
            </div>

          </div>

          <!-- Gráfico 3: Evolução Histórica das Colocações SINE-AL -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Evolução Mensal do SINE Alagoas (Últimos 12 Meses)</h3>
                <p class="text-xs text-slate-400 mt-0.5">Histórico de trabalhadores colocados no mercado, vagas captadas e novos cadastros</p>
              </div>
              <div class="flex items-center gap-4 text-xs font-semibold">
                <span class="flex items-center gap-1.5 text-blue-700"><span class="w-3 h-3 rounded-full bg-blue-600"></span> Colocações Efetivadas</span>
                <span class="flex items-center gap-1.5 text-emerald-700"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Vagas Ofertadas</span>
                <span class="flex items-center gap-1.5 text-purple-700"><span class="w-3 h-3 rounded-full bg-purple-400"></span> Trabalhadores Inscritos</span>
              </div>
            </div>
            <div class="h-60 relative" id="container-chart-trend">
              <canvas id="chart-timeline-trend"></canvas>
            </div>
          </div>

          <!-- SEÇÃO 2: MAPA TEMÁTICO DE ALAGOAS (MEDIÇÃO DE SETORES POR CORES) -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <span class="text-[11px] font-bold text-red-700 uppercase tracking-wider">Mapeamento Vetorial Temático</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-0.5">
                  Mapa de Alagoas: Medição e Predominância de Setores por Cores
                </h3>
                <p class="text-xs text-slate-500 mt-0.5">
                  Passe o cursor ou clique nas macrorregiões para visualizar os dados coletados de cada pólo produtivo alagoano.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button id="btn-reset-thematic-filter" class="text-xs font-semibold text-blue-700 hover:underline">
                  Limpar Destaques
                </button>
              </div>
            </div>

            <!-- Mapa SVG e Painel Lateral de Detalhes -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              <!-- SVG do Estado de Alagoas com as 6 Mesorregiões coloridas -->
              <div class="lg:col-span-2 bg-slate-950 p-4 sm:p-6 rounded-2xl relative overflow-hidden shadow-inner flex flex-col items-center justify-center">
                <div class="w-full flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-800 pb-2">
                  <span>🗺️ Representação Vetorial das Mesorregiões Alagoanas</span>
                  <span>Escala Territorial Oficial SINE/SETEQ</span>
                </div>

                <svg viewBox="0 0 820 440" class="w-full h-auto max-h-[380px] filter drop-shadow-md select-none" id="thematic-alagoas-svg">
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <!-- 1. SERTÃO ALAGOANO (Laranja / Agropecuária & Energia) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Sertão Alagoano (Pólo Delmiro / Santana)" data-sector="Agropecuária & Energias Renováveis">
                    <path class="thematic-region-path" d="M 40,240 C 60,190 120,150 180,140 C 230,135 280,160 300,200 C 320,240 300,290 260,330 C 210,380 150,390 100,360 C 60,330 30,280 40,240 Z" fill="#ea580c" fill-opacity="0.88" stroke="#ffffff" stroke-width="2"></path>
                    <text x="140" y="240" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" pointer-events="none">SERTÃO ALAGOANO</text>
                    <text x="140" y="260" fill="#fed7aa" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">Energia & Agropecuária (12%)</text>
                  </g>

                  <!-- 2. AGRESTE ALAGOANO (Roxo / Comércio & Varejo) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Agreste Alagoano (Pólo Arapiraca)" data-sector="Comércio, Varejo & Distribuição">
                    <path class="thematic-region-path" d="M 290,170 C 340,140 420,140 470,170 C 510,200 500,260 470,310 C 440,360 360,370 310,340 C 270,300 270,220 290,170 Z" fill="#7c3aed" fill-opacity="0.88" stroke="#ffffff" stroke-width="2"></path>
                    <text x="390" y="235" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" pointer-events="none">AGRESTE</text>
                    <text x="390" y="255" fill="#e9d5ff" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">Comércio & Varejo (22%)</text>
                  </g>

                  <!-- 3. ZONA DA MATA ALAGOANA (Verde / Agroindústria) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Zona da Mata Alagoana" data-sector="Agroindústria Sucroalcooleira & Bioenergia">
                    <path class="thematic-region-path" d="M 460,130 C 520,90 600,90 640,130 C 670,170 650,230 620,270 C 580,310 520,300 480,260 C 450,220 440,160 460,130 Z" fill="#059669" fill-opacity="0.88" stroke="#ffffff" stroke-width="2"></path>
                    <text x="545" y="180" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" pointer-events="none">ZONA DA MATA</text>
                    <text x="545" y="200" fill="#a7f3d0" font-size="10" font-weight="600" text-anchor="middle" pointer-events="none">Agroindústria (11%)</text>
                  </g>

                  <!-- 4. LITORAL NORTE (Ciano / Turismo & Hotelaria) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Litoral Norte (Costa dos Corais)" data-sector="Turismo, Hotelaria & Gastronomia">
                    <path class="thematic-region-path" d="M 635,90 C 680,60 740,70 780,100 C 800,125 780,160 740,185 C 700,210 650,180 635,140 Z" fill="#0891b2" fill-opacity="0.88" stroke="#ffffff" stroke-width="2"></path>
                    <text x="710" y="130" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">LITORAL NORTE</text>
                    <text x="710" y="148" fill="#cffafe" font-size="10" font-weight="600" text-anchor="middle" pointer-events="none">Turismo (9%)</text>
                  </g>

                  <!-- 5. REGIÃO METROPOLITANA DE MACEIÓ (Azul / TI & Serviços) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Região Metropolitana de Maceió" data-sector="Tecnologia da Informação & Startups">
                    <path class="thematic-region-path" d="M 590,210 C 650,195 720,215 750,250 C 765,280 735,320 680,335 C 630,345 580,310 570,270 Z" fill="#2563eb" fill-opacity="0.95" stroke="#ffffff" stroke-width="2"></path>
                    <text x="660" y="265" fill="#ffffff" font-size="14" font-weight="extrabold" text-anchor="middle" pointer-events="none">MACEIÓ (METROPOLITANA)</text>
                    <text x="660" y="285" fill="#bfdbfe" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">TI, Saúde & Serviços (44%)</text>
                  </g>

                  <!-- 6. LITORAL SUL (Verde Esmeralda / Turismo & Agroindústria) -->
                  <g class="thematic-region-group cursor-pointer" data-region="Litoral Sul & Baixo São Francisco" data-sector="Agroindústria Sucroalcooleira & Bioenergia">
                    <path class="thematic-region-path" d="M 440,320 C 510,290 600,320 650,350 C 670,380 630,420 560,425 C 490,430 430,380 440,320 Z" fill="#047857" fill-opacity="0.88" stroke="#ffffff" stroke-width="2"></path>
                    <text x="540" y="375" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">LITORAL SUL & PENEDO</text>
                    <text x="540" y="393" fill="#a7f3d0" font-size="10" font-weight="600" text-anchor="middle" pointer-events="none">Bioenergia & Turismo (8%)</text>
                  </g>
                </svg>

                <div class="w-full flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-300 mt-2">
                  <span>🌊 Oceano Atlântico (Leste)</span>
                  <span>•</span>
                  <span>🏞️ Rio São Francisco (Sul)</span>
                  <span>•</span>
                  <span>⛰️ Sertão & Cânions (Oeste)</span>
                </div>
              </div>

              <!-- Painel Interativo de Detalhes da Região Selecionada -->
              <div class="space-y-4" id="thematic-details-panel">
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Região em Destaque</span>
                  <h4 class="text-base font-extrabold text-slate-900 mt-1" id="thematic-region-title">Região Metropolitana de Maceió</h4>
                  <p class="text-xs text-slate-500 mt-1" id="thematic-region-cities">Maceió, Rio Largo, Marechal Deodoro, Pilar, Satuba</p>
                  
                  <div class="mt-4 pt-3 border-t border-slate-200 space-y-2.5 text-xs">
                    <div class="flex justify-between">
                      <span class="text-slate-500">Setor Econômico Líder:</span>
                      <span class="font-bold text-blue-700" id="thematic-region-sector">Tecnologia da Informação & Startups</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-500">Mão de Obra Cadastrada:</span>
                      <span class="font-bold text-slate-800" id="thematic-region-cands">1.980 cidadãos</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-500">Postos de Trabalho SINE:</span>
                      <span class="font-bold text-emerald-700" id="thematic-region-jobs">312 vagas</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-500">Participação Estadual:</span>
                      <span class="font-bold text-indigo-700" id="thematic-region-share">44% do total de Alagoas</span>
                    </div>
                  </div>

                  <button id="btn-filter-by-selected-region" class="w-full mt-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors">
                    Filtrar Painel por Esta Região
                  </button>
                </div>

                <!-- Legenda Oficial das Cores Setoriais -->
                <div class="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <span class="font-bold text-slate-700 block text-[11px]">Legenda dos Setores Econômicos:</span>
                  <div class="grid grid-cols-1 gap-1.5 text-[11px]">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                      <span class="font-medium text-slate-700">Tecnologia, Software & Startups (Azul)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-purple-600"></span>
                      <span class="font-medium text-slate-700">Comércio Atacadista & Distribuição (Roxo)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-cyan-600"></span>
                      <span class="font-medium text-slate-700">Turismo, Gastronomia & Hotelaria (Ciano)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-emerald-600"></span>
                      <span class="font-medium text-slate-700">Agroindústria Sucroalcooleira & Bioenergia (Verde)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-orange-600"></span>
                      <span class="font-medium text-slate-700">Agropecuária & Energias Renováveis (Laranja)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- SEÇÃO 3: MAPA REAL INTERATIVO DE ALAGOAS (OPENSTREETMAP + LEAFLET) -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Georreferenciamento Cartográfico Real</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-0.5">
                  Mapa Real Interativo de Alagoas (OpenStreetMap / Leaflet)
                </h3>
                <p class="text-xs text-slate-500 mt-0.5">
                  Navegue pelos municípios pólos de Alagoas. Clique em cada marcador para inspecionar os dados coletados de vagas, candidatos e remuneração média.
                </p>
              </div>

              <div class="flex items-center gap-2 text-xs font-semibold">
                <span class="text-slate-500">Exibindo 15 Pólos Municipais</span>
              </div>
            </div>

            <!-- Contêiner do Mapa Real Leaflet -->
            <div class="relative w-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div id="real-alagoas-map" class="h-96 sm:h-[460px] w-full bg-slate-100"></div>
              
              <div class="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 shadow-md text-[11px] text-slate-600 max-w-xs pointer-events-none">
                <p class="font-bold text-slate-800">💡 Dica de Navegação:</p>
                <p class="text-[10px]">Use o zoom e arraste para explorar o Litoral, Zona da Mata, Agreste e Sertão.</p>
              </div>
            </div>
          </div>

          <!-- SEÇÃO 4: TABELA DE VISUALIZAÇÃO PRÉVIA & EXPORTAÇÃO COMPLETA -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 class="text-base font-extrabold text-slate-900">Base Consolidada de Dados para Extração</h3>
                <p class="text-xs text-slate-500 mt-0.5">Auditoria, prestação de contas governamentais e integração com observatórios federais.</p>
              </div>

              <!-- Alternador de Dados (Cidadãos vs Vagas) -->
              <div class="flex items-center gap-2">
                <div class="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold flex items-center">
                  <button id="btn-table-view-cand" class="px-3 py-1.5 rounded-lg bg-white text-blue-900 shadow-sm font-bold transition-all">
                    Cidadãos Cadastrados
                  </button>
                  <button id="btn-table-view-jobs" class="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all">
                    Vagas & Empresas
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div class="relative w-full sm:w-72">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="text" id="input-search-table" placeholder="Filtrar por cidade, cargo ou setor..." class="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg">
              </div>

              <div id="export-table-counter" class="text-xs font-medium text-slate-500">
                Mostrando registros
              </div>
            </div>

            <div class="overflow-x-auto border border-slate-100 rounded-xl" id="table-export-container">
              <!-- Conteúdo da tabela preenchido dinamicamente -->
            </div>
          </div>

        </div>
      `;
    },

    attachGeoExportEvents(onTabChange) {
      const geoData = window.store.getGeoData();
      const regions = window.store.getRegionsData();
      const palette = window.store.getSectorPalette();
      const monthly = window.store.getMonthlyIndicators();

      let activeTableMode = 'candidates'; // 'candidates' ou 'jobs'
      let activeSectorFilter = '';
      let activeRegionFilter = '';
      let activeSearchText = '';
      let mapMetricMode = 'candidates'; // 'candidates' ou 'vacancies'

      // 1. Export Buttons Event Binding
      document.getElementById('btn-export-cand-csv')?.addEventListener('click', () => {
        const res = window.store.exportCandidatesCSV(activeRegionFilter, activeSectorFilter);
        window.Toast.show(`Relatório de cidadãos exportado (${res.count} registros)!`, 'success');
      });

      document.getElementById('btn-export-jobs-csv')?.addEventListener('click', () => {
        const res = window.store.exportJobsCSV(activeRegionFilter, activeSectorFilter);
        window.Toast.show(`Relatório de vagas exportado (${res.count} registros)!`, 'success');
      });

      document.getElementById('btn-export-all-json')?.addEventListener('click', () => {
        window.store.exportCompleteJSON();
        window.Toast.show('Pacote completo de dados do Observatório exportado com sucesso!', 'success');
      });

      document.getElementById('btn-print-summary')?.addEventListener('click', () => {
        window.print();
      });

      // 2. Gráficos Interativos (Chart.js)
      const renderCharts = () => {
        if (typeof Chart === 'undefined') {
          console.warn('Chart.js ainda não carregado via CDN');
          return;
        }

        // Limpar instâncias anteriores se existirem
        if (window._geoCharts && Array.isArray(window._geoCharts)) {
          window._geoCharts.forEach(c => {
            try { c.destroy(); } catch (e) {}
          });
        }
        window._geoCharts = [];

        // Gráfico 1: Vagas vs Candidatos por Setor
        const ctxSector = document.getElementById('chart-sector-demand')?.getContext('2d');
        if (ctxSector) {
          const sectorsList = Object.keys(palette);
          const candidatesBySector = [1420, 680, 590, 480, 410, 320, 260];
          const vacanciesBySector = [215, 96, 78, 64, 46, 38, 30];

          const chart1 = new Chart(ctxSector, {
            type: 'bar',
            data: {
              labels: sectorsList.map(s => palette[s].tag || s),
              datasets: [
                {
                  label: 'Mão de Obra Disponível (Cidadãos)',
                  data: candidatesBySector,
                  backgroundColor: '#3b82f6',
                  borderRadius: 6
                },
                {
                  label: 'Vagas em Aberto (SINE)',
                  data: vacanciesBySector,
                  backgroundColor: '#10b981',
                  borderRadius: 6
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top', labels: { font: { size: 11, family: 'Inter' } } }
              },
              scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
              }
            }
          });
          window._geoCharts.push(chart1);
        }

        // Gráfico 2: Donut Regional
        const ctxDoughnut = document.getElementById('chart-regional-doughnut')?.getContext('2d');
        if (ctxDoughnut) {
          const chart2 = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
              labels: regions.map(r => r.name.split('(')[0].trim()),
              datasets: [{
                data: regions.map(r => r.sharePercent),
                backgroundColor: ['#2563eb', '#7c3aed', '#ea580c', '#0891b2', '#059669', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { size: 10, family: 'Inter' } } }
              }
            }
          });
          window._geoCharts.push(chart2);
        }

        // Gráfico 3: Linha de Tendência Mensal
        const ctxTrend = document.getElementById('chart-timeline-trend')?.getContext('2d');
        if (ctxTrend) {
          const chart3 = new Chart(ctxTrend, {
            type: 'line',
            data: {
              labels: monthly.map(m => m.month),
              datasets: [
                {
                  label: 'Colocações Efetivadas',
                  data: monthly.map(m => m.colocacoes),
                  borderColor: '#2563eb',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  fill: true,
                  tension: 0.35,
                  pointRadius: 4
                },
                {
                  label: 'Vagas Captadas',
                  data: monthly.map(m => m.vagasAbertas),
                  borderColor: '#10b981',
                  backgroundColor: 'transparent',
                  borderDash: [5, 5],
                  tension: 0.35,
                  pointRadius: 3
                },
                {
                  label: 'Inscritos no SINE',
                  data: monthly.map(m => m.inscritos),
                  borderColor: '#a855f7',
                  backgroundColor: 'transparent',
                  tension: 0.35,
                  pointRadius: 3
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { color: '#f1f5f9' } }
              }
            }
          });
          window._geoCharts.push(chart3);
        }
      };

      // Inicializa gráficos se Chart estiver pronto, ou aguarda meio segundo
      setTimeout(renderCharts, 150);

      // 3. Mapa Real Interativo (Leaflet)
      let leafletMap = null;
      let markersLayer = null;

      const initRealMap = () => {
        if (typeof L === 'undefined') {
          const container = document.getElementById('real-alagoas-map');
          if (container) {
            container.innerHTML = `
              <div class="h-full w-full flex flex-col items-center justify-center p-6 text-center text-slate-500 bg-slate-50">
                <p class="font-bold text-slate-800">Carregamento do Mapa Cartográfico</p>
                <p class="text-xs mt-1">Conectando aos servidores de tiles do OpenStreetMap...</p>
              </div>
            `;
          }
          return;
        }

        const mapContainer = document.getElementById('real-alagoas-map');
        if (!mapContainer) return;

        // Se já houver instância anterior, descartar
        if (window._alagoasLeafletMap) {
          try { window._alagoasLeafletMap.remove(); } catch (e) {}
          window._alagoasLeafletMap = null;
        }

        // Centro geográfico de Alagoas [-9.57, -36.78]
        leafletMap = L.map('real-alagoas-map', {
          center: [-9.5713, -36.7820],
          zoom: 8,
          scrollWheelZoom: false
        });
        window._alagoasLeafletMap = leafletMap;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap | SETEQ Alagoas',
          maxZoom: 18
        }).addTo(leafletMap);

        markersLayer = L.layerGroup().addTo(leafletMap);
        updateMapMarkers();
      };

      const updateMapMarkers = () => {
        if (!markersLayer) return;
        markersLayer.clearLayers();

        let filtered = geoData;
        if (activeSectorFilter) {
          filtered = filtered.filter(c => c.dominantSector === activeSectorFilter);
        }
        if (activeRegionFilter) {
          filtered = filtered.filter(c => c.region === activeRegionFilter);
        }

        filtered.forEach(city => {
          const sec = palette[city.dominantSector] || { color: '#2563eb', hex: '#2563eb', tag: city.dominantSector };
          const markerValue = mapMetricMode === 'candidates' ? city.candidatesCount : city.vacanciesCount;
          const markerLabel = mapMetricMode === 'candidates' ? 'Candidatos' : 'Vagas';

          // Custom HTML icon com cor temática do setor
          const customIcon = L.divIcon({
            className: 'alagoas-custom-marker',
            html: `
              <div class="alagoas-marker-pulse" style="background-color: ${sec.color};"></div>
              <div class="alagoas-marker-pin" style="background-color: ${sec.color};"></div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          });

          const popupContent = `
            <div class="p-2 space-y-2 text-xs font-sans max-w-xs">
              <div class="border-b border-slate-100 pb-1.5">
                <span class="text-[10px] font-bold text-slate-400 uppercase">${city.region}</span>
                <h4 class="text-sm font-black text-slate-900">${city.city}, AL</h4>
              </div>

              <div class="space-y-1">
                <p class="text-[11px] font-bold" style="color: ${sec.color};">
                  Setor: ${sec.tag || city.dominantSector}
                </p>
                <div class="flex justify-between text-slate-600 text-[11px]">
                  <span>${mapMetricMode === 'candidates' ? '👥 Trabalhadores Cadastrados:' : '💼 Vagas Abertas:'}</span>
                  <span class="font-bold text-slate-900">${markerValue}</span>
                </div>
                <div class="flex justify-between text-slate-600 text-[11px]">
                  <span>Salário Médio SINE:</span>
                  <span class="font-bold text-emerald-700">${city.avgSalary}</span>
                </div>
                <p class="text-[10px] text-slate-400 mt-1">
                  <strong>CBO Líder:</strong> ${city.cboLeader}
                </p>
              </div>

              <div class="pt-1.5 border-t border-slate-100">
                <button data-filter-city="${city.city}" class="btn-popup-filter w-full py-1 bg-blue-900 text-white rounded font-bold text-[10px] hover:bg-blue-800 transition-colors">
                  Filtrar Tabela por ${city.city}
                </button>
              </div>
            </div>
          `;

          const marker = L.marker([city.lat, city.lng], { icon: customIcon }).bindPopup(popupContent);
          markersLayer.addLayer(marker);
        });

        // Event delegation para botões dentro dos popups do Leaflet
        setTimeout(() => {
          document.querySelectorAll('.btn-popup-filter').forEach(btn => {
            btn.addEventListener('click', () => {
              const cityName = btn.getAttribute('data-filter-city');
              const searchInput = document.getElementById('input-search-table');
              if (searchInput && cityName) {
                searchInput.value = cityName;
                activeSearchText = cityName.toLowerCase();
                renderTable();
                window.Toast.show(`Tabela filtrada por: ${cityName}`, 'info');
              }
            });
          });
        }, 100);
      };

      setTimeout(initRealMap, 200);

      // Alternador de Mão de Obra vs Vagas no Mapa Real
      document.getElementById('btn-mode-candidates')?.addEventListener('click', () => {
        mapMetricMode = 'candidates';
        document.getElementById('btn-mode-candidates').className = 'px-3 py-1.5 rounded-lg bg-white text-blue-900 shadow-sm font-bold transition-all';
        document.getElementById('btn-mode-vacancies').className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
        updateMapMarkers();
        window.Toast.show('Mapa alternado para: Densidade de Mão de Obra', 'info');
      });

      document.getElementById('btn-mode-vacancies')?.addEventListener('click', () => {
        mapMetricMode = 'vacancies';
        document.getElementById('btn-mode-vacancies').className = 'px-3 py-1.5 rounded-lg bg-white text-emerald-800 shadow-sm font-bold transition-all';
        document.getElementById('btn-mode-candidates').className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
        updateMapMarkers();
        window.Toast.show('Mapa alternado para: Volume de Vagas', 'info');
      });

      // 4. Mapa Temático SVG: Interação com as Regiões
      const regionTitle = document.getElementById('thematic-region-title');
      const regionCities = document.getElementById('thematic-region-cities');
      const regionSector = document.getElementById('thematic-region-sector');
      const regionCands = document.getElementById('thematic-region-cands');
      const regionJobs = document.getElementById('thematic-region-jobs');
      const regionShare = document.getElementById('thematic-region-share');

      document.querySelectorAll('.thematic-region-group').forEach(group => {
        group.addEventListener('click', () => {
          const regName = group.getAttribute('data-region');
          const found = regions.find(r => r.name === regName) || regions[0];

          document.querySelectorAll('.thematic-region-path').forEach(p => p.classList.remove('active'));
          group.querySelector('.thematic-region-path')?.classList.add('active');

          if (regionTitle) regionTitle.innerText = found.name;
          if (regionCities) regionCities.innerText = found.citiesText;
          if (regionSector) regionSector.innerText = found.dominantSector;
          if (regionCands) regionCands.innerText = `${found.candidates.toLocaleString('pt-BR')} cidadãos`;
          if (regionJobs) regionJobs.innerText = `${found.vacancies} vagas`;
          if (regionShare) regionShare.innerText = `${found.sharePercent}% do total estadual`;

          window.Toast.show(`Região selecionada: ${found.name}`, 'info');
        });
      });

      document.getElementById('btn-filter-by-selected-region')?.addEventListener('click', () => {
        const curRegion = regionTitle?.innerText || '';
        const regionSelect = document.getElementById('filter-geo-region');
        if (regionSelect && curRegion) {
          regionSelect.value = curRegion;
          activeRegionFilter = curRegion;
          updateMapMarkers();
          renderTable();
          window.Toast.show(`Filtros aplicados para: ${curRegion}`, 'success');
        }
      });

      document.getElementById('btn-reset-thematic-filter')?.addEventListener('click', () => {
        document.querySelectorAll('.thematic-region-path').forEach(p => p.classList.remove('active'));
        const regSelect = document.getElementById('filter-geo-region');
        const secSelect = document.getElementById('filter-geo-sector');
        if (regSelect) regSelect.value = '';
        if (secSelect) secSelect.value = '';
        activeRegionFilter = '';
        activeSectorFilter = '';
        updateMapMarkers();
        renderTable();
        window.Toast.show('Filtros resetados com sucesso.', 'info');
      });

      // 5. Filtros Gerais (Setor e Macrorregião)
      document.getElementById('filter-geo-sector')?.addEventListener('change', (e) => {
        activeSectorFilter = e.target.value;
        updateMapMarkers();
        renderTable();
      });

      document.getElementById('filter-geo-region')?.addEventListener('change', (e) => {
        activeRegionFilter = e.target.value;
        updateMapMarkers();
        renderTable();
      });

      // 6. Tabela Dinâmica e Alternador de Base (Cidadãos vs Vagas)
      const btnViewCand = document.getElementById('btn-table-view-cand');
      const btnViewJobs = document.getElementById('btn-table-view-jobs');
      const tableContainer = document.getElementById('table-export-container');
      const counterBadge = document.getElementById('export-table-counter');
      const searchInput = document.getElementById('input-search-table');

      const renderTable = () => {
        if (!tableContainer) return;

        if (activeTableMode === 'candidates') {
          const candidates = window.store.getAllCandidates();
          let filtered = candidates.filter(c => {
            if (activeSearchText) {
              const q = activeSearchText.toLowerCase();
              const inName = (c.fullName || '').toLowerCase().includes(q);
              const inCity = (c.city || '').toLowerCase().includes(q);
              const inRole = (c.targetRole || '').toLowerCase().includes(q);
              const inSkill = (c.hardSkills || []).some(s => s.toLowerCase().includes(q));
              if (!inName && !inCity && !inRole && !inSkill) return false;
            }
            if (activeRegionFilter && c.city) {
              // Checa se a cidade pertence à macrorregião
              const geoItem = geoData.find(g => g.city === c.city);
              if (geoItem && geoItem.region !== activeRegionFilter) return false;
            }
            return true;
          });

          if (counterBadge) {
            counterBadge.innerHTML = `Exibindo <strong>${filtered.length}</strong> de ${candidates.length} trabalhadores alagoanos`;
          }

          tableContainer.innerHTML = `
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th class="p-3">Nome / Cidadão</th>
                  <th class="p-3">Município (AL)</th>
                  <th class="p-3">Cargo Pretendido</th>
                  <th class="p-3">Escolaridade</th>
                  <th class="p-3">Habilidades Principais</th>
                  <th class="p-3">Contato / WhatsApp</th>
                  <th class="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                ${filtered.length === 0 ? `
                  <tr><td colspan="7" class="p-8 text-center text-slate-400">Nenhum cidadão encontrado com os filtros aplicados.</td></tr>
                ` : filtered.map(c => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-3 font-bold text-slate-900">${c.fullName}</td>
                    <td class="p-3"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">${c.city || 'Maceió'}, AL</span></td>
                    <td class="p-3 font-semibold text-blue-900">${c.targetRole || 'Geral'}</td>
                    <td class="p-3 text-slate-500">${c.educationLevel || 'Ensino Médio'}</td>
                    <td class="p-3">
                      <div class="flex flex-wrap gap-1">
                        ${(c.hardSkills || []).slice(0, 3).map(s => `<span class="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded">${s}</span>`).join('')}
                      </div>
                    </td>
                    <td class="p-3 font-mono text-slate-500">${c.phone || '(82) 9****-****'}</td>
                    <td class="p-3 text-right">
                      <button data-candidate-id="${c.id}" class="btn-inspect-cand text-blue-700 hover:underline font-bold text-xs">
                        Ver Perfil
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        } else {
          // Tabela de Vagas & Empresas
          const jobs = window.store.getJobs();
          let filtered = jobs.filter(j => {
            if (activeSearchText) {
              const q = activeSearchText.toLowerCase();
              const inTitle = (j.title || '').toLowerCase().includes(q);
              const inCompany = (j.companyName || '').toLowerCase().includes(q);
              const inCity = (j.city || '').toLowerCase().includes(q);
              const inSector = (j.category || '').toLowerCase().includes(q);
              if (!inTitle && !inCompany && !inCity && !inSector) return false;
            }
            if (activeSectorFilter && j.category !== activeSectorFilter) return false;
            if (activeRegionFilter && j.city) {
              const geoItem = geoData.find(g => g.city === j.city);
              if (geoItem && geoItem.region !== activeRegionFilter) return false;
            }
            return true;
          });

          if (counterBadge) {
            counterBadge.innerHTML = `Exibindo <strong>${filtered.length}</strong> de ${jobs.length} vagas homologadas em Alagoas`;
          }

          tableContainer.innerHTML = `
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th class="p-3">Cargo Ofertado</th>
                  <th class="p-3">Empresa Parceira</th>
                  <th class="p-3">Município (AL)</th>
                  <th class="p-3">Setor Econômico</th>
                  <th class="p-3">Regime / Modalidade</th>
                  <th class="p-3">Remuneração</th>
                  <th class="p-3 text-right">Vagas</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                ${filtered.length === 0 ? `
                  <tr><td colspan="7" class="p-8 text-center text-slate-400">Nenhuma vaga encontrada com os filtros aplicados.</td></tr>
                ` : filtered.map(j => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-3 font-bold text-slate-900">${j.title}</td>
                    <td class="p-3 text-blue-900 font-semibold">${j.companyName}</td>
                    <td class="p-3"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">${j.city}, AL</span></td>
                    <td class="p-3"><span class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold text-[10px]">${j.category}</span></td>
                    <td class="p-3 text-slate-500">${j.contractType} (${j.workModel})</td>
                    <td class="p-3 font-bold text-emerald-700">${j.salaryDisplay}</td>
                    <td class="p-3 text-right font-black text-slate-800">${j.vacanciesCount || 1}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
      };

      btnViewCand?.addEventListener('click', () => {
        activeTableMode = 'candidates';
        btnViewCand.className = 'px-3 py-1.5 rounded-lg bg-white text-blue-900 shadow-sm font-bold transition-all';
        btnViewJobs.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
        renderTable();
      });

      btnViewJobs?.addEventListener('click', () => {
        activeTableMode = 'jobs';
        btnViewJobs.className = 'px-3 py-1.5 rounded-lg bg-white text-blue-900 shadow-sm font-bold transition-all';
        btnViewCand.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
        renderTable();
      });

      searchInput?.addEventListener('input', (e) => {
        activeSearchText = e.target.value;
        renderTable();
      });

      renderTable();
    }
  };

  // ==========================================
  // 9. CURRÍCULO PADRONIZADO SETEQ (PDF)
  // ==========================================
  window.PrintableCvView = {
    render() {
      const candidate = window.store.getCandidateProfile();

      return `
        <div class="space-y-6 fade-in max-w-4xl mx-auto">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between no-print">
            <button id="btn-back-from-cv" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors">
              ← Voltar ao Portal
            </button>
            <button id="btn-trigger-print" class="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Imprimir / Salvar em PDF
            </button>
          </div>

          <div id="printable-cv-container" class="bg-white p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-md text-slate-800 space-y-6">
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

            <div class="space-y-2 pt-2">
              <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                1. Resumo das Qualificações
              </h3>
              <p class="text-xs text-slate-700 leading-relaxed text-justify">
                ${candidate.summary}
              </p>
            </div>

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

            <div class="pt-6 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
              <p>Documento padronizado emitido eletronicamente pela Plataforma EMPREGOS AL (SETEQ / Governo de Alagoas).</p>
              <p class="font-semibold">Conforme LGPD (Lei 13.709/18)</p>
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

  // ==========================================
  // 10. MÓDULO DE AUTENTICAÇÃO, LOGIN & CADASTRO
  // ==========================================
  window.AuthView = {
    render(activeSubTab = 'login') {
      return `
        <div class="max-w-3xl mx-auto py-4 space-y-6 fade-in">
          
          <!-- Cabeçalho Institucional do Portal de Acesso -->
          <div class="text-center space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
              Acesso Seguro • SETEQ Governo de Alagoas
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Portal do Trabalhador e Empregador
            </h1>
            <p class="text-xs text-slate-500 max-w-lg mx-auto">
              Acesse sua conta ou cadastre-se para intermediar oportunidades de trabalho com inteligência artificial em todo o estado de Alagoas.
            </p>
          </div>

          <!-- Acesso Rápido de Demonstração (1-Clique) -->
          <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 rounded-2xl text-white shadow-md space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold flex items-center gap-1.5 text-blue-200">
                <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Acesso Rápido de Demonstração (1-Clique):
              </span>
              <span class="text-[11px] text-slate-400">Clique para alternar direto para uma conta demo</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <button data-email="maria.silveira.al@email.com" class="btn-fast-login text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all">
                <p class="font-bold text-white leading-tight">Maria Eduarda</p>
                <p class="text-[10px] text-blue-300">Cidadão (Maceió)</p>
              </button>

              <button data-email="rh@alagoastech.com.br" class="btn-fast-login text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all">
                <p class="font-bold text-white leading-tight">Alagoas Tech</p>
                <p class="text-[10px] text-emerald-300">Empresa (Jaraguá)</p>
              </button>

              <button data-email="selecao@maceiosaude.com.br" class="btn-fast-login text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all">
                <p class="font-bold text-white leading-tight">Maceió Saúde</p>
                <p class="text-[10px] text-emerald-300">Empresa (Hospital)</p>
              </button>

              <button data-email="admin@seteq.al.gov.br" class="btn-fast-login text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all">
                <p class="font-bold text-white leading-tight">Dra. Camila (SETEQ)</p>
                <p class="text-[10px] text-red-300">Gestor Governamental</p>
              </button>
            </div>
          </div>

          <!-- Card Principal de Formulários -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            <!-- Segmented Control das 3 Abas -->
            <div class="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
              <button data-subtab="login" class="auth-subtab-btn py-3.5 px-2 text-center transition-all border-b-2 ${activeSubTab === 'login' ? 'border-blue-900 bg-white text-blue-900' : 'border-transparent hover:text-slate-900'}">
                🔑 Entrar na Conta
              </button>
              <button data-subtab="register-candidate" class="auth-subtab-btn py-3.5 px-2 text-center transition-all border-b-2 ${activeSubTab === 'register-candidate' ? 'border-blue-900 bg-white text-blue-900' : 'border-transparent hover:text-slate-900'}">
                👤 Cadastrar Cidadão
              </button>
              <button data-subtab="register-company" class="auth-subtab-btn py-3.5 px-2 text-center transition-all border-b-2 ${activeSubTab === 'register-company' ? 'border-blue-900 bg-white text-blue-900' : 'border-transparent hover:text-slate-900'}">
                🏢 Cadastrar Empresa
              </button>
            </div>

            <div class="p-6 sm:p-8">
              ${activeSubTab === 'register-candidate' ? this.renderCandidateRegisterForm() :
                activeSubTab === 'register-company' ? this.renderCompanyRegisterForm() :
                this.renderLoginForm()}
            </div>

          </div>

        </div>
      `;
    },

    renderLoginForm() {
      return `
        <form id="form-login" class="space-y-4 max-w-md mx-auto text-xs">
          <div class="text-center mb-4">
            <h3 class="text-base font-bold text-slate-900">Acesse sua Conta</h3>
            <p class="text-slate-500 text-[11px] mt-0.5">Informe seu e-mail cadastrado e senha para prosseguir</p>
          </div>

          <div>
            <label class="font-bold text-slate-700 block mb-1">E-mail Cadastrado *</label>
            <input type="email" id="login-email" placeholder="seuemail@exemplo.com" value="maria.silveira.al@email.com" required class="w-full p-2.5 border border-slate-300 rounded-lg text-xs">
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="font-bold text-slate-700">Senha de Acesso *</label>
              <span class="text-[10px] text-slate-400">Padrão demo: 123</span>
            </div>
            <input type="password" id="login-password" placeholder="Digite sua senha" value="123" required class="w-full p-2.5 border border-slate-300 rounded-lg text-xs">
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-900">
              <span>Lembrar meu acesso</span>
            </label>
            <a href="#" class="text-blue-800 hover:underline">Esqueci minha senha</a>
          </div>

          <button type="submit" class="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            Entrar no Portal
          </button>

          <div class="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
            Ainda não tem conta?
            <div class="flex justify-center gap-4 mt-1 font-bold text-blue-900">
              <button type="button" data-switch-to="register-candidate" class="hover:underline">Criar conta Cidadão</button>
              <span>•</span>
              <button type="button" data-switch-to="register-company" class="hover:underline">Criar conta Empresa</button>
            </div>
          </div>
        </form>
      `;
    },

    renderCandidateRegisterForm() {
      return `
        <form id="form-register-candidate" class="space-y-4 text-xs">
          <div class="border-b border-slate-100 pb-3 mb-3">
            <h3 class="text-base font-bold text-slate-900">Cadastro de Cidadão (Trabalhador)</h3>
            <p class="text-slate-500 text-[11px] mt-0.5">Preencha seus dados para receber recomendações inteligentes de vagas em Alagoas.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Nome Completo *</label>
              <input type="text" id="reg-cand-name" placeholder="Ex: Lucas Gabriel da Silva" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">CPF (apenas números ou formatado) *</label>
              <input type="text" id="reg-cand-cpf" placeholder="000.000.000-00" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">E-mail Pessoal *</label>
              <input type="email" id="reg-cand-email" placeholder="lucas@exemplo.com" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Telefone / WhatsApp *</label>
              <input type="text" id="reg-cand-phone" placeholder="(82) 99999-0000" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Senha de Acesso *</label>
              <input type="password" id="reg-cand-password" placeholder="Mínimo 3 caracteres" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Município de Alagoas onde reside *</label>
              <select id="reg-cand-city" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white" required>
                ${(window.ALAGOAS_CITIES || []).map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Cargo ou Área de Interesse *</label>
              <input type="text" id="reg-cand-role" placeholder="Ex: Assistente Administrativo, Vendas, TI..." required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Escolaridade Principal</label>
              <select id="reg-cand-education" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                <option value="Curso Técnico">Curso Técnico</option>
                <option value="Superior Cursando">Superior Cursando</option>
                <option value="Superior Completo">Superior Completo</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
              </select>
            </div>
          </div>

          <div>
            <label class="font-bold text-slate-700 block mb-1">Habilidades / Conhecimentos (separados por vírgula)</label>
            <input type="text" id="reg-cand-skills" placeholder="Ex: Atendimento ao Cliente, Excel, Comunicação, Vendas..." class="w-full p-2.5 border border-slate-300 rounded-lg">
          </div>

          <div class="bg-blue-50/70 p-3 rounded-xl border border-blue-200 text-[11px] text-slate-700 space-y-1">
            <label class="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" id="reg-cand-lgpd" checked required class="mt-0.5 rounded text-blue-900">
              <span>
                <strong>Termo de Consentimento LGPD (Lei 13.709/18):</strong> Autorizo a Secretaria do Trabalho, Emprego e Qualificação de Alagoas (SETEQ) a armazenar e processar meus dados profissionais para fins de intermediação de mão de obra e indicação a vagas.
              </span>
            </label>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="submit" class="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2">
              ✓ Concluir Cadastro de Cidadão
            </button>
          </div>
        </form>
      `;
    },

    renderCompanyRegisterForm() {
      return `
        <form id="form-register-company" class="space-y-4 text-xs">
          <div class="border-b border-slate-100 pb-3 mb-3">
            <h3 class="text-base font-bold text-slate-900">Cadastro de Empresa Parceira (Empregador / RH)</h3>
            <p class="text-slate-500 text-[11px] mt-0.5">Cadastre sua organização para publicar vagas e gerenciar triagens no sistema SINE/SETEQ.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Razão Social *</label>
              <input type="text" id="reg-comp-name" placeholder="Ex: Varejo e Logística Nordeste Ltda" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Nome Fantasia *</label>
              <input type="text" id="reg-comp-trade" placeholder="Ex: Varejo Nordeste" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">CNPJ da Empresa *</label>
              <input type="text" id="reg-comp-cnpj" placeholder="00.000.000/0001-00" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">E-mail Corporativo / RH *</label>
              <input type="email" id="reg-comp-email" placeholder="rh@suaempresa.com.br" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Senha de Acesso ao Painel *</label>
              <input type="password" id="reg-comp-password" placeholder="Defina uma senha segura" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Telefone de Contato do RH *</label>
              <input type="text" id="reg-comp-phone" placeholder="(82) 3300-0000" required class="w-full p-2.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Município Sede em Alagoas *</label>
              <select id="reg-comp-city" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white" required>
                ${(window.ALAGOAS_CITIES || []).map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Segmento / Setor Produtivo *</label>
              <select id="reg-comp-sector" class="w-full p-2.5 border border-slate-300 rounded-lg bg-white">
                ${(window.JOB_CATEGORIES || []).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="font-bold text-slate-700 block mb-1">Breve Descrição da Organização</label>
            <textarea id="reg-comp-desc" rows="2" placeholder="Resumo das atividades da empresa e quantidade de colaboradores em Alagoas..." class="w-full p-2.5 border border-slate-300 rounded-lg"></textarea>
          </div>

          <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-[11px] text-slate-700 space-y-1">
            <label class="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" id="reg-comp-terms" checked required class="mt-0.5 rounded text-emerald-800">
              <span>
                <strong>Termo de Responsabilidade e Adesão IMO/MTE:</strong> Declaro a idoneidade das vagas a serem veiculadas no Sistema Público de Emprego do Estado de Alagoas, respeitando a gratuidade da intermediação para o trabalhador e a legislação trabalhista brasileira.
              </span>
            </label>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="submit" class="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2">
              ✓ Concluir Cadastro de Empresa
            </button>
          </div>
        </form>
      `;
    },

    attachEvents(onTabChange, onAuthSuccess, onSubTabChange) {
      document.querySelectorAll('.auth-subtab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sub = btn.getAttribute('data-subtab');
          if (sub && typeof onSubTabChange === 'function') {
            onSubTabChange(sub);
          }
        });
      });

      document.querySelectorAll('[data-switch-to]').forEach(btn => {
        btn.addEventListener('click', () => {
          const sub = btn.getAttribute('data-switch-to');
          if (sub && typeof onSubTabChange === 'function') {
            onSubTabChange(sub);
          }
        });
      });

      document.querySelectorAll('.btn-fast-login').forEach(btn => {
        btn.addEventListener('click', () => {
          const email = btn.getAttribute('data-email');
          const res = window.store.login(email, '123');
          if (res.success) {
            window.Toast.show(`Bem-vindo(a), ${res.user.name}!`, 'success');
            if (typeof onAuthSuccess === 'function') onAuthSuccess(res.user);
          } else {
            window.Toast.show(res.message, 'error');
          }
        });
      });

      document.getElementById('form-login')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value;
        const pass = document.getElementById('login-password')?.value;

        const res = window.store.login(email, pass);
        if (res.success) {
          window.Toast.show(`Login efetuado com sucesso! Bem-vindo(a), ${res.user.name}.`, 'success');
          if (typeof onAuthSuccess === 'function') onAuthSuccess(res.user);
        } else {
          window.Toast.show(res.message, 'error');
        }
      });

      document.getElementById('form-register-candidate')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          fullName: document.getElementById('reg-cand-name')?.value,
          cpf: document.getElementById('reg-cand-cpf')?.value,
          email: document.getElementById('reg-cand-email')?.value,
          phone: document.getElementById('reg-cand-phone')?.value,
          password: document.getElementById('reg-cand-password')?.value,
          city: document.getElementById('reg-cand-city')?.value,
          targetRole: document.getElementById('reg-cand-role')?.value,
          educationLevel: document.getElementById('reg-cand-education')?.value,
          skills: document.getElementById('reg-cand-skills')?.value
        };

        const res = window.store.registerCandidate(data);
        if (res.success) {
          window.Toast.show(`Conta de cidadão criada com sucesso! Bem-vindo(a), ${res.user.name}!`, 'success');
          if (typeof onAuthSuccess === 'function') onAuthSuccess(res.user);
        } else {
          window.Toast.show(res.message, 'warning');
        }
      });

      document.getElementById('form-register-company')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById('reg-comp-name')?.value,
          tradeName: document.getElementById('reg-comp-trade')?.value,
          cnpj: document.getElementById('reg-comp-cnpj')?.value,
          email: document.getElementById('reg-comp-email')?.value,
          phone: document.getElementById('reg-comp-phone')?.value,
          password: document.getElementById('reg-comp-password')?.value,
          city: document.getElementById('reg-comp-city')?.value,
          sector: document.getElementById('reg-comp-sector')?.value,
          description: document.getElementById('reg-comp-desc')?.value
        };

        const res = window.store.registerCompany(data);
        if (res.success) {
          window.Toast.show(`Conta da empresa criada! Seu CNPJ está em análise pela SETEQ, e seu painel já está liberado.`, 'success');
          if (typeof onAuthSuccess === 'function') onAuthSuccess(res.user);
        } else {
          window.Toast.show(res.message, 'warning');
        }
      });
    }
  };

  // ==========================================
  // 11. PÁGINA INSTITUCIONAL & AVISO SETEQ (WELCOME VIEW)
  // ==========================================
  window.WelcomeView = {
    render() {
      const data = window.ALAGOAS_INSTITUTIONAL_DATA || {
        headlineBadge: 'COMUNICADO OFICIAL DO GOVERNO DE ALAGOAS',
        mainTitle: 'Alagoas Está Evoluindo: A SETEQ Moderniza e Facilita o Acesso ao Emprego em Todo o Estado',
        leadParagraph: 'O Governo do Estado de Alagoas, por meio da Secretaria do Trabalho, Emprego e Qualificação (SETEQ), dá um passo decisivo rumo à modernização das políticas públicas de emprego.',
        officialNote: 'A nova plataforma EMPREGOS AL rompe barreiras geográficas e operacionais, garantindo que trabalhadores da capital e do interior tenham igualdade de acesso às vagas.',
        pillars: [],
        keyMetrics: []
      };

      const isDismissed = window.store.isWelcomeDismissed();

      return `
        <div class="space-y-8 fade-in max-w-5xl mx-auto py-2">
          
          <!-- Banner Heroico Institucional -->
          <div class="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-slate-800">
            <div class="relative z-10 space-y-4 max-w-3xl">
              
              <!-- Selo Oficial do Estado -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  ${data.headlineBadge}
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/15">
                  SETEQ • Gestão do Trabalho 2026
                </span>
              </div>

              <!-- Título e Mensagem Principal -->
              <h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                ${data.mainTitle}
              </h1>

              <p class="text-blue-100 text-sm sm:text-base leading-relaxed">
                ${data.leadParagraph}
              </p>

              <!-- Caixa de Aviso Oficial -->
              <div class="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-blue-50 space-y-1.5">
                <p class="font-bold flex items-center gap-2 text-amber-300">
                  <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Diretriz Governamental de Acesso Público & Gratuito
                </p>
                <p class="leading-relaxed">
                  ${data.officialNote}
                </p>
              </div>

            </div>

            <!-- Efeito de Luz Decorativo -->
            <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute right-10 top-10 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          <!-- Métricas de Avanço de Alagoas -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            ${(data.keyMetrics || []).map(m => `
              <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span class="text-xs text-slate-500 font-semibold">${m.label}</span>
                  <p class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${m.value}</p>
                </div>
                <p class="text-[11px] text-blue-800 font-semibold mt-2">${m.sub}</p>
              </div>
            `).join('')}
          </div>

          <!-- Os 4 Pilares da Modernização da SETEQ -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="text-center max-w-2xl mx-auto space-y-1">
              <span class="text-xs font-bold text-blue-900 uppercase tracking-wider">Políticas Públicas em Ação</span>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">Como a SETEQ está transformando o mercado alagoano</h2>
              <p class="text-xs text-slate-500">Tecnologia, interiorização e transparência a favor de trabalhadores e empregadores.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              ${(data.pillars || []).map((p, idx) => `
                <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all space-y-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-blue-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      ${idx + 1}
                    </div>
                    <h3 class="text-sm font-bold text-slate-900">${p.title}</h3>
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed pl-11">
                    ${p.description}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Portais de Entrada Direcionados (Ações) -->
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
            <div class="text-center max-w-xl mx-auto space-y-1">
              <span class="text-xs font-bold text-amber-300 uppercase tracking-wider">Acesso Imediato</span>
              <h2 class="text-xl sm:text-2xl font-black">Como você deseja acessar a plataforma hoje?</h2>
              <p class="text-xs text-blue-200">Escolha o seu perfil para ser direcionado aos serviços correspondentes.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <!-- Card Cidadão -->
              <div class="bg-white text-slate-900 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover-lift">
                <div>
                  <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <h3 class="text-base font-bold text-slate-900">Sou Cidadão</h3>
                  <p class="text-xs text-slate-500 mt-1">Busque vagas no seu município, candidate-se com Match IA e baixe seu currículo digital padronizado.</p>
                </div>
                <button id="btn-welcome-candidate" class="mt-4 w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  Acessar Vagas de Emprego →
                </button>
              </div>

              <!-- Card Empresa Parceira -->
              <div class="bg-white text-slate-900 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover-lift">
                <div>
                  <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </div>
                  <h3 class="text-base font-bold text-slate-900">Sou Empresa Parceira</h3>
                  <p class="text-xs text-slate-500 mt-1">Cadastre sua empresa, anuncie vagas com auxílio de IA e gerencie seleções em Kanban interativo.</p>
                </div>
                <button id="btn-welcome-company" class="mt-4 w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  Painel de Recrutamento →
                </button>
              </div>

              <!-- Card Gestor SETEQ -->
              <div class="bg-white text-slate-900 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover-lift">
                <div>
                  <div class="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  <h3 class="text-base font-bold text-slate-900">Acesso SETEQ</h3>
                  <p class="text-xs text-slate-500 mt-1">Painel executivo, geomapeamento interativo dos 102 municípios e extração pública de dados.</p>
                </div>
                <button id="btn-welcome-admin" class="mt-4 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  Observatório Governamental →
                </button>
              </div>

            </div>

            <!-- Botão Direto & Preferência -->
            <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label class="inline-flex items-center gap-2 cursor-pointer text-xs text-blue-200 hover:text-white transition-colors select-none">
                <input type="checkbox" id="chk-dismiss-welcome" class="rounded text-blue-500 focus:ring-blue-400 bg-white/10 border-white/20" ${isDismissed ? 'checked' : ''}>
                <span>Entrar direto no sistema nas próximas visitas (reabra quando quiser no topo)</span>
              </label>

              <button id="btn-welcome-direct" class="px-5 py-2.5 bg-white text-blue-950 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap">
                Prosseguir para a Plataforma Principal →
              </button>
            </div>

          </div>

        </div>
      `;
    },

    attachEvents(onEnterAction) {
      const chkDismiss = document.getElementById('chk-dismiss-welcome');

      const savePreference = () => {
        if (chkDismiss) {
          window.store.setWelcomeDismissed(chkDismiss.checked);
        }
      };

      document.getElementById('btn-welcome-candidate')?.addEventListener('click', () => {
        savePreference();
        window.store.setRole('candidate');
        window.Toast.show('Bem-vindo ao Portal do Cidadão Alagoano!', 'success');
        if (typeof onEnterAction === 'function') onEnterAction('jobs');
      });

      document.getElementById('btn-welcome-company')?.addEventListener('click', () => {
        savePreference();
        window.store.setRole('company');
        window.Toast.show('Bem-vindo ao Portal da Empresa Parceira!', 'success');
        if (typeof onEnterAction === 'function') onEnterAction('company-dashboard');
      });

      document.getElementById('btn-welcome-admin')?.addEventListener('click', () => {
        savePreference();
        window.store.setRole('admin');
        window.Toast.show('Acesso ao Observatório Governamental SETEQ liberado.', 'info');
        if (typeof onEnterAction === 'function') onEnterAction('admin-dashboard');
      });

      document.getElementById('btn-welcome-direct')?.addEventListener('click', () => {
        savePreference();
        const role = window.store.getRole();
        if (typeof onEnterAction === 'function') {
          if (role === 'company') onEnterAction('company-dashboard');
          else if (role === 'admin') onEnterAction('admin-dashboard');
          else onEnterAction('jobs');
        }
      });
    }
  };

  // ==========================================
  // 12. CONTROLADOR DO APLICATIVO (APP)
  // ==========================================
  class AppController {
    constructor() {
      const isDismissed = window.store.isWelcomeDismissed();
      this.activeTab = isDismissed ? 'jobs' : 'welcome';
      this.authSubTab = 'login';
      this.init();
    }

    init() {
      this.syncDefaultTabForRole();

      window.addEventListener('empregos-al:state-changed', () => {
        this.syncDefaultTabForRole();
        this.render();
      });

      this.render();
    }

    syncDefaultTabForRole() {
      if (this.activeTab === 'auth' || this.activeTab === 'print-cv' || this.activeTab === 'welcome' || this.activeTab === 'courses' || this.activeTab === 'news' || this.activeTab === 'support') return;

      const role = window.store.getRole();
      if (role === 'candidate') {
        const valid = ['jobs', 'courses', 'news', 'support', 'applications', 'profile', 'saved', 'insights', 'print-cv', 'auth', 'welcome'];
        if (!valid.includes(this.activeTab)) this.activeTab = 'jobs';
      } else if (role === 'company') {
        const valid = ['company-dashboard', 'company-kanban', 'company-talents', 'company-new-job', 'news', 'support', 'auth', 'welcome'];
        if (!valid.includes(this.activeTab)) this.activeTab = 'company-dashboard';
      } else {
        const valid = ['admin-dashboard', 'admin-companies', 'admin-jobs', 'courses', 'news', 'admin-audit', 'admin-geo-export', 'support', 'auth', 'welcome'];
        if (!valid.includes(this.activeTab)) this.activeTab = 'admin-dashboard';
      }
    }

    setTab(tabId) {
      this.activeTab = tabId;
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
      const navbarRoot = document.getElementById('navbar-root');
      const mainContent = document.getElementById('main-content');

      if (!navbarRoot || !mainContent) return;

      navbarRoot.innerHTML = window.Navbar.render(this.activeTab);
      window.Navbar.attachEvents((newTab) => this.setTab(newTab));

      // Aba especial de Acolhimento e Comunicado Institucional SETEQ
      if (this.activeTab === 'welcome') {
        mainContent.innerHTML = window.WelcomeView.render();
        window.WelcomeView.attachEvents((targetTab) => {
          this.setTab(targetTab);
        });
        return;
      }

      // Aba especial de Autenticação / Login / Cadastro
      if (this.activeTab === 'auth') {
        mainContent.innerHTML = window.AuthView.render(this.authSubTab || 'login');
        window.AuthView.attachEvents(
          (newTab) => this.setTab(newTab),
          (user) => {
            if (user.role === 'candidate') this.setTab('jobs');
            else if (user.role === 'company') this.setTab('company-dashboard');
            else this.setTab('admin-dashboard');
          },
          (newSubTab) => {
            this.authSubTab = newSubTab;
            this.render();
          }
        );
        return;
      }

      if (this.activeTab === 'print-cv') {
        mainContent.innerHTML = window.PrintableCvView.render();
        window.PrintableCvView.attachEvents((newTab) => this.setTab(newTab));
        return;
      }

      // Aba de Cursos e Qualificação Profissional (Qualifica Alagoas)
      if (this.activeTab === 'courses') {
        if (window.CoursesView) {
          mainContent.innerHTML = window.CoursesView.render();
          window.CoursesView.attachEvents((newTab) => this.setTab(newTab));
        }
        return;
      }

      // Aba de Notícias e Comunicação Institucional
      if (this.activeTab === 'news') {
        if (window.NewsView) {
          mainContent.innerHTML = window.NewsView.render();
          window.NewsView.attachEvents((newTab) => this.setTab(newTab));
        }
        return;
      }

      // Aba de Atendimento ao Cidadão e SINE Alagoas
      if (this.activeTab === 'support') {
        if (window.SupportView) {
          mainContent.innerHTML = window.SupportView.render();
          window.SupportView.attachEvents((newTab) => this.setTab(newTab));
        }
        return;
      }

      const role = window.store.getRole();

      if (role === 'candidate') {
        mainContent.innerHTML = window.CandidateView.render(this.activeTab);

        if (this.activeTab === 'jobs') {
          window.CandidateView.attachJobsEvents();
        } else if (this.activeTab === 'profile') {
          window.CandidateView.attachProfileEvents((newTab) => this.setTab(newTab));
        } else if (this.activeTab === 'saved') {
          window.CandidateView.attachSavedEvents((newTab) => this.setTab(newTab));
        }
      } else if (role === 'company') {
        mainContent.innerHTML = window.CompanyView.render(this.activeTab);

        if (this.activeTab === 'company-dashboard') {
          window.CompanyView.attachDashboardEvents((newTab) => this.setTab(newTab));
        } else if (this.activeTab === 'company-kanban') {
          window.CompanyView.attachKanbanEvents((newTab) => this.setTab(newTab));
        } else if (this.activeTab === 'company-talents') {
          window.CompanyView.attachTalentEvents();
        } else if (this.activeTab === 'company-new-job') {
          window.CompanyView.attachNewJobEvents((newTab) => this.setTab(newTab));
        }
      } else {
        mainContent.innerHTML = window.AdminView.render(this.activeTab);

        if (this.activeTab === 'admin-companies') {
          window.AdminView.attachCompanyValidationEvents((newTab) => this.setTab(newTab));
        } else if (this.activeTab === 'admin-jobs') {
          window.AdminView.attachJobModerationEvents((newTab) => this.setTab(newTab));
        } else if (this.activeTab === 'admin-audit') {
          window.AdminView.attachAuditEvents();
        } else if (this.activeTab === 'admin-geo-export') {
          window.AdminView.attachGeoExportEvents((newTab) => this.setTab(newTab));
        }
      }
    }
  }

  window.AppController = AppController;

  // Inicialização segura
  function startApp() {
    if (!window.appInstance) {
      window.appInstance = new AppController();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }
})();

