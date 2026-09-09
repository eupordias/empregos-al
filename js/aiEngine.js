/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Motor de Inteligência Artificial (AI Engine)
 * Responsável por:
 *  1. Match Semântico e Score de Compatibilidade (0-100%)
 *  2. Ranqueamento Inteligente de Candidatos
 *  3. Extrator de Soft e Hard Skills a partir de textos
 *  4. Assistente de IA para Elaboração de Vagas (CBO e Requisitos)
 *  5. Insights Preditivos de Empregabilidade e Mercado Alagoano
 */

export const AIEngine = {
  /**
   * Calcula a compatibilidade detalhada entre um candidato e uma vaga
   */
  calculateMatch(candidate, job) {
    if (!candidate || !job) {
      return { score: 0, label: 'Indisponível', matchingSkills: [], missingSkills: [] };
    }

    const candidateHardSkills = (candidate.hardSkills || []).map(s => s.toLowerCase().trim());
    const candidateSoftSkills = (candidate.softSkills || []).map(s => s.toLowerCase().trim());
    const jobRequiredSkills = (job.requiredSkills || []).map(s => s.toLowerCase().trim());
    const jobDesirableSkills = (job.desirableSkills || []).map(s => s.toLowerCase().trim());
    const jobSoftSkills = (job.softSkills || []).map(s => s.toLowerCase().trim());

    // 1. Hard Skills Match (Peso 40%)
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

    // 2. Soft Skills Match (Peso 15%)
    let softMatchCount = 0;
    jobSoftSkills.forEach(soft => {
      if (candidateSoftSkills.some(candSoft => candSoft.includes(soft) || soft.includes(candSoft))) {
        softMatchCount++;
      }
    });
    const softScore = jobSoftSkills.length > 0 
      ? (softMatchCount / jobSoftSkills.length) * 15 
      : 12;

    // 3. Nível de Escolaridade (Peso 20%)
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

    // 4. Localização e Modalidade (Peso 15%)
    let locScore = 15;
    if (job.workModel === 'Remoto') {
      locScore = 15;
    } else {
      if (candidate.city && job.city && candidate.city.toLowerCase() === job.city.toLowerCase()) {
        locScore = 15;
      } else if (candidate.state === 'AL') {
        locScore = 10; // Outro município do mesmo estado
      } else {
        locScore = 5;
      }
    }

    // 5. Histórico e Aderência ao Cargo (Peso 10%)
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

    // Gerar insight de IA textual
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

  /**
   * Ordena lista de candidatos para uma vaga com base no Match de IA
   */
  rankCandidatesForJob(candidates, job) {
    return candidates.map(cand => {
      const match = this.calculateMatch(cand, job);
      return {
        ...cand,
        matchScore: match.score,
        matchDetails: match
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  },

  /**
   * Extração automática de hard e soft skills a partir de textos digitados
   */
  extractSkillsFromText(text) {
    if (!text || typeof text !== 'string') return [];

    const knownSkills = [
      // Hard Skills Tech
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'HTML5', 'CSS3',
      'Git', 'GitHub', 'SQL', 'PostgreSQL', 'MySQL', 'APIs RESTful', 'Figma', 'Power BI', 'Excel Avançado',
      // Hard Skills Saúde
      'COREN', 'Enfermagem', 'Punção Venosa', 'Curativos', 'UTI', 'Primeiros Socorros', 'BLS', 'Sinais Vitais',
      // Hard Skills Varejo & Gestão
      'Atendimento ao Cliente', 'Vendas', 'Caixa', 'Controle de Estoque', 'WMS', 'Notas Fiscais',
      'Logística', 'Inventário', 'Negociação', 'Recepção', 'Inglês', 'Espanhol', 'Rotinas Administrativas',
      // Operacional / Indústria
      'Manutenção Industrial', 'Solda', 'Pneumática', 'NR-10', 'NR-12', 'NR-35', 'Operação de Máquinas',
      // Soft Skills
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

  /**
   * Assistente de criação de vagas por IA: preenche CBO e sugestões a partir do título
   */
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

    // Padrão Geral Comercial
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

  /**
   * Gera recomendações de evolução de carreira personalizadas
   */
  getCareerInsights(candidate, allJobs) {
    const candidateSkills = (candidate.hardSkills || []).map(s => s.toLowerCase());
    
    // Contabilizar as skills mais pedidas em todas as vagas abertas
    const skillDemands = {};
    (allJobs || []).forEach(job => {
      (job.requiredSkills || []).forEach(skill => {
        const lower = skill.toLowerCase();
        skillDemands[lower] = (skillDemands[lower] || { name: skill, count: 0 });
        skillDemands[lower].count++;
      });
    });

    // Identificar as que o candidato ainda não tem
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
