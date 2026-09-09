/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Gerenciador de Estado Reativo e Persistência Local (Store)
 */

import {
  ALAGOAS_CITIES,
  JOB_CATEGORIES,
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_CANDIDATE_PROFILE,
  INITIAL_OTHER_CANDIDATES,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  SETEQ_INDICATORS
} from './mockData.js';

const STORAGE_KEY = 'EMPREGOS_AL_STATE_V1';

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
      activeRole: 'candidate', // 'candidate' | 'company' | 'admin'
      currentCompanyId: 'comp-1', // Empresa ativa quando em modo Empresa
      candidateProfile: INITIAL_CANDIDATE_PROFILE,
      otherCandidates: INITIAL_OTHER_CANDIDATES,
      companies: INITIAL_COMPANIES,
      jobs: INITIAL_JOBS,
      applications: INITIAL_APPLICATIONS,
      savedJobIds: ['job-1', 'job-3'],
      notifications: INITIAL_NOTIFICATIONS,
      auditLogs: INITIAL_AUDIT_LOGS,
      indicators: SETEQ_INDICATORS
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

  // --- Getters ---
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
    return [this.state.candidateProfile, ...this.state.otherCandidates];
  }

  // --- Ações de Papel (Role Switcher) ---
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

  // --- Ações do Candidato ---
  updateCandidateProfile(updatedData) {
    this.state.candidateProfile = {
      ...this.state.candidateProfile,
      ...updatedData
    };
    this.addAuditLog(
      'Atualização de Currículo Cidadão',
      `O candidato ${this.state.candidateProfile.fullName} atualizou suas informações cadastrais/profissionais.`,
      'LGPD Art. 18, I (Direito de correção de dados incompletos ou inexatos)'
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
      status: 'applied', // 'applied' (Inscrito), 'screening' (Triagem), 'interview' (Entrevista), 'approved', 'rejected'
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

    // Adiciona notificação de confirmação
    this.addNotification({
      forUserId: this.state.candidateProfile.id,
      title: 'Candidatura Enviada!',
      message: `Você se candidatou com sucesso para "${job.title}" na empresa ${job.companyName}.`,
      type: 'application'
    });

    this.addAuditLog(
      'Inscrição em Vaga de Emprego',
      `Candidato ${this.state.candidateProfile.fullName} candidatou-se à vaga #${job.id} (${job.title}) em ${job.city}.`,
      'LGPD Art. 7º, V (Execução de contrato ou procedimentos preliminares)'
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

  // --- Ações da Empresa ---
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
      `Empresa ${company.name} publicou a vaga "${newJob.title}" em ${newJob.city} (CBO: ${newJob.cbo}).`,
      'Portaria MTE / Intermediação de Mão de Obra (IMO)'
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

  deleteJob(jobId) {
    this.state.jobs = this.state.jobs.filter(j => j.id !== jobId);
    this.save();
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

      // Notificar candidato se for o candidato logado
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
        'Movimentação de Candidatura (Kanban RH)',
        `Candidatura #${app.id} (${app.candidateName}) movida de [${oldStatus}] para [${newStatus}].`,
        'Intermediação SINE/MTE'
      );

      this.save();
    }
  }

  // --- Ações do Módulo Administrativo SETEQ ---
  verifyCompany(companyId, status) {
    const comp = this.getCompany(companyId);
    if (comp) {
      comp.status = status;
      comp.verifiedDate = status === 'approved' ? new Date().toISOString().split('T')[0] : null;
      this.addAuditLog(
        'Homologação Cadastral pela SETEQ',
        `A empresa ${comp.name} (CNPJ: ${comp.cnpj}) teve seu status alterado para "${status.toUpperCase()}".`,
        'LGPD Art. 7º, II c/c Diretrizes do SINE Alagoas'
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
        `Vaga #${job.id} ("${job.title}") teve moderação definida como: ${moderationStatus}.`,
        'Auditoria SETEQ / Prevenção a Vagas Abusivas'
      );
      this.save();
    }
  }

  // --- Notificações & Auditoria ---
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

  markNotificationAsRead(notifId) {
    const n = this.state.notifications.find(x => x.id === notifId);
    if (n) {
      n.read = true;
      this.save();
    }
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
    // Manter últimos 200 logs
    if (this.state.auditLogs.length > 200) {
      this.state.auditLogs = this.state.auditLogs.slice(0, 200);
    }
  }
}

export const store = new Store();
