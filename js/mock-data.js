/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Base de Dados Inicial (Seed Data)
 * Compatível com carregamento direto via file:// e http:// (Sem dependência de ES Modules/CORS)
 */

window.ALAGOAS_CITIES = [
  'Maceió',
  'Arapiraca',
  'Rio Largo',
  'Palmeira dos Índios',
  'União dos Palmares',
  'Penedo',
  'São Miguel dos Campos',
  'Marechal Deodoro',
  'Delmiro Gouveia',
  'Coruripe',
  'Santana do Ipanema',
  'Atalaia',
  'Teotônio Vilela',
  'Girau do Ponciano',
  'Pilar',
  'São Sebastião',
  'Maragogi',
  'Porto Calvo',
  'Batalha',
  'Ibateguara'
];

window.JOB_CATEGORIES = [
  'Tecnologia da Informação',
  'Saúde e Bem-estar',
  'Comércio, Varejo & Vendas',
  'Turismo, Gastronomia & Hotelaria',
  'Administração & Finanças',
  'Logística, Transporte & Armazém',
  'Construção Civil & Engenharia',
  'Agroindústria & Açúcar/Álcool',
  'Educação & Treinamento',
  'Atendimento & Suporte ao Cliente'
];

window.INITIAL_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Alagoas Tech Solutions Ltda',
    tradeName: 'Alagoas Tech',
    cnpj: '12.345.678/0001-90',
    city: 'Maceió',
    neighborhood: 'Jaraguá (Polo Tecnológico)',
    sector: 'Tecnologia da Informação',
    status: 'approved',
    verifiedDate: '2026-01-15',
    contactEmail: 'rh@alagoastech.com.br',
    phone: '(82) 3221-4500',
    description: 'Empresa alagoana pioneira em soluções digitais em nuvem, inteligência artificial e consultoria em TI.'
  },
  {
    id: 'comp-2',
    name: 'Hospital e Maternidade Maceió Saúde S/A',
    tradeName: 'Maceió Saúde',
    cnpj: '98.765.432/0001-11',
    city: 'Maceió',
    neighborhood: 'Farol',
    sector: 'Saúde e Bem-estar',
    status: 'approved',
    verifiedDate: '2026-01-20',
    contactEmail: 'selecao@maceiosaude.com.br',
    phone: '(82) 3315-8000',
    description: 'Complexo hospitalar de referência no estado de Alagoas, com mais de 300 leitos e UTI de ponta.'
  },
  {
    id: 'comp-3',
    name: 'Rede Hoteleira Ponta Verde Mar Ltda',
    tradeName: 'Ponta Verde Hotels & Resorts',
    cnpj: '45.123.789/0001-33',
    city: 'Maceió',
    neighborhood: 'Ponta Verde',
    sector: 'Turismo, Gastronomia & Hotelaria',
    status: 'approved',
    verifiedDate: '2026-02-01',
    contactEmail: 'talentos@pontaverderesort.com.br',
    phone: '(82) 3142-2000',
    description: 'Rede de hotéis 5 estrelas na orla de Maceió e Francês, impulsionando o turismo receptivo em Alagoas.'
  },
  {
    id: 'comp-4',
    name: 'Cooperativa Agroindustrial do Vale do Paraíba Alagoano',
    tradeName: 'AgroVale Alagoas',
    cnpj: '23.888.999/0001-44',
    city: 'União dos Palmares',
    neighborhood: 'Zona Industrial',
    sector: 'Agroindústria & Açúcar/Álcool',
    status: 'approved',
    verifiedDate: '2026-02-10',
    contactEmail: 'rh@agrovaleal.com.br',
    phone: '(82) 3281-1122',
    description: 'Produtora e processadora agrícola de cana, milho e derivados no agreste e zona da mata alagoana.'
  },
  {
    id: 'comp-5',
    name: 'Distribuidora Agreste Log & Varejo Ltda',
    tradeName: 'AgresteLog Arapiraca',
    cnpj: '67.444.222/0001-55',
    city: 'Arapiraca',
    neighborhood: 'Baixão',
    sector: 'Logística, Transporte & Armazém',
    status: 'approved',
    verifiedDate: '2026-02-18',
    contactEmail: 'carreiras@agrestelog.com.br',
    phone: '(82) 3522-9090',
    description: 'Maior centro de distribuição logística do interior de Alagoas, conectando o agreste a todo o Nordeste.'
  },
  {
    id: 'comp-6',
    name: 'Inova Nordeste Call Center e Atendimento Ltda',
    tradeName: 'Inova Contact Center',
    cnpj: '33.999.111/0001-88',
    city: 'Rio Largo',
    neighborhood: 'Centro Empresarial',
    sector: 'Atendimento & Suporte ao Cliente',
    status: 'pending',
    verifiedDate: null,
    contactEmail: 'recrutamento@inovacc.com.br',
    phone: '(82) 3261-7788',
    description: 'Operação de atendimento telefônico e multicanal em expansão na região metropolitana de Maceió.'
  }
];

window.INITIAL_JOBS = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    title: 'Desenvolvedor(a) Front-End React / TypeScript',
    cbo: '3171-10 - Programador de Sistemas de Informação',
    city: 'Maceió',
    neighborhood: 'Jaraguá',
    workModel: 'Híbrido',
    contractType: 'CLT',
    category: 'Tecnologia da Informação',
    salaryMin: 4500,
    salaryMax: 6500,
    salaryDisplay: 'R$ 4.500,00 a R$ 6.500,00',
    isPcdExclusive: false,
    educationLevel: 'Superior Completo ou Cursando',
    experienceRequired: '2 anos comprovados em desenvolvimento web',
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    desirableSkills: ['Next.js', 'Testes Automatizados', 'Node.js', 'Figma'],
    softSkills: ['Trabalho em Equipe', 'Comunicação Clara', 'Resolução de Problemas'],
    description: 'Buscamos desenvolvedor(a) para atuar na criação de interfaces modernas para clientes do setor público e privado em Alagoas. Ambiente colaborativo no polo de inovação do Jaraguá.',
    benefits: ['Vale Refeição (R$ 750/mês)', 'Plano de Saúde e Odontológico', 'Auxílio Home Office', 'Seguro de Vida', 'Subsídio para Cursos'],
    vacanciesCount: 2,
    status: 'active',
    postedDate: '2026-03-01',
    moderationStatus: 'approved'
  },
  {
    id: 'job-2',
    companyId: 'comp-2',
    companyName: 'Hospital e Maternidade Maceió Saúde',
    title: 'Técnico(a) de Enfermagem - UTI Adulto',
    cbo: '3222-05 - Técnico de Enfermagem',
    city: 'Maceió',
    neighborhood: 'Farol',
    workModel: 'Presencial',
    contractType: 'CLT',
    category: 'Saúde e Bem-estar',
    salaryMin: 3325,
    salaryMax: 3800,
    salaryDisplay: 'R$ 3.325,00 + Adicional de Insalubridade',
    isPcdExclusive: false,
    educationLevel: 'Curso Técnico em Enfermagem Completo',
    experienceRequired: 'Mínimo de 6 meses em ambiente hospitalar ou UTI',
    requiredSkills: ['COREN-AL Ativo', 'Técnicas de Curativos', 'Administração de Medicamentos', 'Punção Venosa', 'Monitoramento de Sinais Vitais'],
    desirableSkills: ['Protocolos de Segurança do Paciente', 'Suporte Básico de Vida (BLS)'],
    softSkills: ['Empatia', 'Atenção aos Detalhes', 'Equilíbrio Emocional', 'Pontualidade'],
    description: 'Atuação na assistência direta a pacientes em leitos de terapia intensiva, ministração de medicamentos e suporte à equipe médica.',
    benefits: ['Plano de Saúde', 'Refeitório no Local', 'Vale Transporte', 'Auxílio Creche'],
    vacanciesCount: 5,
    status: 'active',
    postedDate: '2026-03-02',
    moderationStatus: 'approved'
  },
  {
    id: 'job-3',
    companyId: 'comp-3',
    companyName: 'Ponta Verde Hotels & Resorts',
    title: 'Recepcionista Bilíngue de Hotelaria',
    cbo: '4221-05 - Recepcionista de Hotel',
    city: 'Maceió',
    neighborhood: 'Ponta Verde',
    workModel: 'Presencial',
    contractType: 'CLT',
    category: 'Turismo, Gastronomia & Hotelaria',
    salaryMin: 2200,
    salaryMax: 2800,
    salaryDisplay: 'R$ 2.200,00 + Pontuação Hoteleira',
    isPcdExclusive: false,
    educationLevel: 'Ensino Médio Completo',
    experienceRequired: '1 ano de experiência em atendimento ou recepção',
    requiredSkills: ['Inglês Intermediário/Avançado', 'Atendimento ao Cliente', 'Sistemas de PMS/Check-in', 'Informática Básica'],
    desirableSkills: ['Espanhol Básico', 'Conhecimento dos Pontos Turísticos de Alagoas'],
    softSkills: ['Simpatia', 'Excelente Comunicação Verbal', 'Proatividade', 'Organização'],
    description: 'Recepção de hóspedes nacionais e internacionais, procedimentos de check-in/check-out e esclarecimento de dúvidas turísticas sobre o destino Alagoas.',
    benefits: ['Vale Alimentação', 'Vale Transporte', 'Plano Odontológico', 'Treinamento de Idiomas'],
    vacanciesCount: 3,
    status: 'active',
    postedDate: '2026-03-03',
    moderationStatus: 'approved'
  },
  {
    id: 'job-4',
    companyId: 'comp-5',
    companyName: 'AgresteLog Arapiraca',
    title: 'Assistente de Logística e Expedição',
    cbo: '4141-05 - Almoxarife / Estoquista',
    city: 'Arapiraca',
    neighborhood: 'Baixão',
    workModel: 'Presencial',
    contractType: 'CLT',
    category: 'Logística, Transporte & Armazém',
    salaryMin: 1850,
    salaryMax: 2300,
    salaryDisplay: 'R$ 1.850,00 a R$ 2.300,00',
    isPcdExclusive: false,
    educationLevel: 'Ensino Médio Completo',
    experienceRequired: 'Experiência em estoque ou conferência de mercadorias',
    requiredSkills: ['Controle de Estoque', 'Conferência de Notas Fiscais', 'Excel Básico', 'WMS'],
    desirableSkills: ['Operação de Empilhadeira', 'Logística Reversa'],
    softSkills: ['Atenção Concentrada', 'Trabalho em Equipe', 'Agilidade'],
    description: 'Conferência de cargas e descargas de caminhões, controle de inventário no armazém e emissão de romaneios para rotas do interior de Alagoas.',
    benefits: ['Cesta Básica', 'Vale Transporte', 'Convênio Farmácia'],
    vacanciesCount: 4,
    status: 'active',
    postedDate: '2026-03-04',
    moderationStatus: 'approved'
  },
  {
    id: 'job-5',
    companyId: 'comp-4',
    companyName: 'AgroVale Alagoas',
    title: 'Mecânico(a) de Manutenção Industrial',
    cbo: '9113-05 - Mecânico de Manutenção de Máquinas Industriais',
    city: 'União dos Palmares',
    neighborhood: 'Zona Industrial',
    workModel: 'Presencial',
    contractType: 'CLT',
    category: 'Agroindústria & Açúcar/Álcool',
    salaryMin: 3200,
    salaryMax: 4200,
    salaryDisplay: 'R$ 3.200,00 a R$ 4.200,00 + Adicionais',
    isPcdExclusive: false,
    educationLevel: 'Ensino Médio com Curso Técnico em Mecânica ou Eletromecânica',
    experienceRequired: '2 anos em manutenção mecânica industrial',
    requiredSkills: ['Manutenção Preventiva e Corretiva', 'Solda Elétrica', 'Pneumática e Hidráulica', 'Leitura de Desenho Técnico'],
    desirableSkills: ['NR-12', 'NR-33', 'NR-35'],
    softSkills: ['Responsabilidade com Segurança', 'Diagnóstico Ágil', 'Comprometimento'],
    description: 'Manutenção de esteiras, turbinas, moendas e maquinário pesado da usina. Escala de revezamento no período de moagem da safra.',
    benefits: ['Transporte Fretado', 'Refeição na Empresa', 'Seguro de Vida', 'Participação nos Lucros'],
    vacanciesCount: 2,
    status: 'active',
    postedDate: '2026-03-05',
    moderationStatus: 'approved'
  },
  {
    id: 'job-6',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    title: 'Analista de Suporte e Dados Júnior',
    cbo: '3172-10 - Técnico de Apoio ao Usuário de Informática',
    city: 'Maceió',
    neighborhood: 'Jaraguá',
    workModel: 'Remoto',
    contractType: 'CLT',
    category: 'Tecnologia da Informação',
    salaryMin: 2800,
    salaryMax: 3500,
    salaryDisplay: 'R$ 2.800,00 a R$ 3.500,00',
    isPcdExclusive: false,
    educationLevel: 'Ensino Superior em andamento ou Tecnólogo',
    experienceRequired: 'Não obrigatória experiência prévia (Aceita primeiro emprego em TI)',
    requiredSkills: ['SQL Básico', 'Excel Avançado', 'Atendimento ao Usuário', 'Lógica de Programação'],
    desirableSkills: ['Python', 'Power BI', 'Noções de LGPD'],
    softSkills: ['Curiosidade Técnica', 'Boa Didática', 'Paciência', 'Resolução de Conflitos'],
    description: 'Atendimento e suporte técnico a usuários de sistemas governamentais, extração de relatórios simples em SQL e apoio na higienização de bases de dados.',
    benefits: ['Auxílio Remoto (R$ 300)', 'Vale Refeição', 'Acesso a Plataformas de Cursos Online'],
    vacanciesCount: 1,
    status: 'active',
    postedDate: '2026-03-06',
    moderationStatus: 'approved'
  }
];

window.INITIAL_CANDIDATE_PROFILE = {
  id: 'cand-user',
  fullName: 'Maria Eduarda dos Santos Silveira',
  cpf: '098.***.***-45',
  birthDate: '1998-07-22',
  gender: 'Feminino',
  email: 'maria.silveira.al@email.com',
  phone: '(82) 99654-3210',
  isPcd: false,
  pcdType: '',
  city: 'Maceió',
  state: 'AL',
  neighborhood: 'Mangabeiras',
  zipCode: '57037-000',
  summary: 'Desenvolvedora web com 2 anos e meio de experiência em interfaces responsivas, React, JavaScript moderno e estilização com Tailwind CSS. Apaixonada pelo desenvolvimento do ecossistema de inovação e tecnologia em Alagoas.',
  educationLevel: 'Superior Completo',
  targetRole: 'Desenvolvedora Front-End / Web',
  expectedSalary: 'R$ 4.500,00',
  preferredWorkModel: 'Híbrido',
  preferredContract: 'CLT',
  
  academicList: [
    {
      id: 'acad-1',
      institution: 'Universidade Federal de Alagoas (UFAL)',
      degree: 'Bacharelado em Ciência da Computação',
      status: 'Concluído',
      startYear: '2018',
      endYear: '2023'
    },
    {
      id: 'acad-2',
      institution: 'Instituto Federal de Alagoas (IFAL)',
      degree: 'Técnico em Informática Integrado',
      status: 'Concluído',
      startYear: '2014',
      endYear: '2017'
    }
  ],

  experienceList: [
    {
      id: 'exp-1',
      company: 'Nordeste Web Studio',
      role: 'Desenvolvedora Front-End Júnior',
      city: 'Maceió, AL',
      startDate: '2023-03',
      endDate: 'Atualmente',
      isCurrent: true,
      description: 'Desenvolvimento de portais web responsivos utilizando React, Vite, Tailwind CSS e consumo de APIs RESTful. Implementação de boas práticas de acessibilidade e performance.'
    },
    {
      id: 'exp-2',
      company: 'SETEQ - Governo de Alagoas (Estágio)',
      role: 'Estagiária de Suporte e Sistemas',
      city: 'Maceió, AL',
      startDate: '2022-01',
      endDate: '2023-02',
      isCurrent: false,
      description: 'Manutenção preventiva de estações de trabalho, auxílio no cadastramento de trabalhadores no sistema SINE/IMO e apoio na extração de relatórios estatísticos.'
    }
  ],

  hardSkills: [
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'HTML5 & CSS3',
    'Git',
    'REST APIs',
    'SQL Básico',
    'Figma'
  ],

  softSkills: [
    'Trabalho em Equipe',
    'Comunicação Clara',
    'Resolução de Problemas',
    'Aprendizado Rápido',
    'Organização'
  ],

  coursesList: [
    {
      id: 'crs-1',
      title: 'Desenvolvimento React e Ecossistema Moderno (60h)',
      issuer: 'Oxente Tech Alagoas',
      year: '2023'
    },
    {
      id: 'crs-2',
      title: 'Boas Práticas de LGPD no Setor Público e Privado (20h)',
      issuer: 'Escola de Governo de Alagoas (EGAL)',
      year: '2024'
    }
  ],

  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Intermediário (Leitura técnica)' }
  ],

  lgpdConsentDate: '2026-01-10T09:30:00Z',
  cvVersion: '2.1'
};

window.INITIAL_OTHER_CANDIDATES = [
  {
    id: 'cand-2',
    fullName: 'José Carlos Peixoto',
    city: 'Maceió',
    targetRole: 'Técnico de Enfermagem',
    educationLevel: 'Curso Técnico em Enfermagem Completo',
    hardSkills: ['COREN-AL Ativo', 'Técnicas de Curativos', 'Administração de Medicamentos', 'Punção Venosa', 'Monitoramento de Sinais Vitais'],
    softSkills: ['Empatia', 'Pontualidade', 'Trabalho em Equipe'],
    experienceYears: 4,
    status: 'available',
    phone: '(82) 98877-1122',
    email: 'jose.peixoto@email.com'
  },
  {
    id: 'cand-3',
    fullName: 'Ana Beatriz Vasconcelos',
    city: 'Maceió',
    targetRole: 'Recepcionista Bilíngue de Hotelaria',
    educationLevel: 'Superior Cursando - Turismo',
    hardSkills: ['Inglês Intermediário/Avançado', 'Atendimento ao Cliente', 'Sistemas de PMS/Check-in', 'Informática Básica', 'Espanhol Básico'],
    softSkills: ['Simpatia', 'Comunicação Clara', 'Proatividade'],
    experienceYears: 2,
    status: 'available',
    phone: '(82) 99123-4567',
    email: 'ana.beatriz.al@email.com'
  },
  {
    id: 'cand-4',
    fullName: 'Cláudio Roberto Lins',
    city: 'Arapiraca',
    targetRole: 'Assistente de Logística e Expedição',
    educationLevel: 'Ensino Médio Completo',
    hardSkills: ['Controle de Estoque', 'Conferência de Notas Fiscais', 'Excel Básico', 'WMS', 'Operação de Empilhadeira'],
    softSkills: ['Agilidade', 'Atenção Concentrada'],
    experienceYears: 3,
    status: 'available',
    phone: '(82) 99344-5566',
    email: 'claudio.lins@email.com'
  },
  {
    id: 'cand-5',
    fullName: 'Lucas Fernandes Moura',
    city: 'Maceió',
    targetRole: 'Desenvolvedor Front-End React / Full Stack',
    educationLevel: 'Superior Completo ou Cursando',
    hardSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'Tailwind CSS'],
    softSkills: ['Resolução de Problemas', 'Trabalho em Equipe'],
    experienceYears: 3,
    status: 'available',
    phone: '(82) 99881-2233',
    email: 'lucas.moura@email.com'
  }
];

window.INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    candidateId: 'cand-user',
    candidateName: 'Maria Eduarda dos Santos Silveira',
    jobId: 'job-1',
    jobTitle: 'Desenvolvedor(a) Front-End React / TypeScript',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    appliedAt: '2026-03-02T14:20:00Z',
    status: 'interview',
    aiScore: 95,
    stageNotes: 'Candidata com excelente fit técnico em React e Tailwind. Entrevista técnica agendada para 12/03 às 14h30 via Google Meet.',
    interviewDate: '2026-03-12T14:30:00',
    feedbackHistory: [
      { date: '2026-03-02', text: 'Candidatura recebida pelo portal Empregos AL.' },
      { date: '2026-03-03', text: 'Triagem automatizada via IA: Score 95% de compatibilidade.' },
      { date: '2026-03-05', text: 'Convocada para entrevista técnica com a equipe de engenharia da Alagoas Tech.' }
    ]
  },
  {
    id: 'app-2',
    candidateId: 'cand-user',
    candidateName: 'Maria Eduarda dos Santos Silveira',
    jobId: 'job-6',
    jobTitle: 'Analista de Suporte e Dados Júnior',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    appliedAt: '2026-03-06T10:15:00Z',
    status: 'screening',
    aiScore: 82,
    stageNotes: 'Perfil qualificado, currículo em análise pelo gestor de suporte.',
    interviewDate: null,
    feedbackHistory: [
      { date: '2026-03-06', text: 'Candidatura realizada com sucesso.' },
      { date: '2026-03-07', text: 'Currículo encaminhado para análise da equipe de suporte.' }
    ]
  },
  {
    id: 'app-3',
    candidateId: 'cand-2',
    candidateName: 'José Carlos Peixoto',
    jobId: 'job-2',
    jobTitle: 'Técnico(a) de Enfermagem - UTI Adulto',
    companyId: 'comp-2',
    companyName: 'Hospital e Maternidade Maceió Saúde',
    appliedAt: '2026-03-03T09:00:00Z',
    status: 'interview',
    aiScore: 96,
    stageNotes: 'Excelente histórico hospitalar, COREN ativo validado.',
    interviewDate: '2026-03-10T09:00:00',
    feedbackHistory: []
  },
  {
    id: 'app-4',
    candidateId: 'cand-3',
    candidateName: 'Ana Beatriz Vasconcelos',
    jobId: 'job-3',
    jobTitle: 'Recepcionista Bilíngue de Hotelaria',
    companyId: 'comp-3',
    companyName: 'Ponta Verde Hotels & Resorts',
    appliedAt: '2026-03-04T11:30:00Z',
    status: 'screening',
    aiScore: 91,
    stageNotes: 'Fluência em inglês verificada no perfil.',
    interviewDate: null,
    feedbackHistory: []
  },
  {
    id: 'app-5',
    candidateId: 'cand-4',
    candidateName: 'Cláudio Roberto Lins',
    jobId: 'job-4',
    jobTitle: 'Assistente de Logística e Expedição',
    companyId: 'comp-5',
    companyName: 'AgresteLog Arapiraca',
    appliedAt: '2026-03-05T08:45:00Z',
    status: 'approved',
    aiScore: 89,
    stageNotes: 'Aprovado para contratação imediata em Arapiraca.',
    interviewDate: null,
    feedbackHistory: []
  },
  {
    id: 'app-6',
    candidateId: 'cand-5',
    candidateName: 'Lucas Fernandes Moura',
    jobId: 'job-1',
    jobTitle: 'Desenvolvedor(a) Front-End React / TypeScript',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    appliedAt: '2026-03-03T16:00:00Z',
    status: 'screening',
    aiScore: 92,
    stageNotes: 'Candidato com boa base frontend e git.',
    interviewDate: null,
    feedbackHistory: []
  }
];

window.INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    forUserId: 'cand-user',
    title: 'Entrevista Agendada!',
    message: 'A empresa Alagoas Tech Solutions agendou sua entrevista técnica para 12/03 às 14h30.',
    type: 'interview',
    read: false,
    timestamp: '2026-03-05T15:00:00Z'
  },
  {
    id: 'notif-2',
    forUserId: 'cand-user',
    title: 'Novo Match Inteligente (95%)',
    message: 'Seu currículo tem altíssima afinidade com a vaga "Desenvolvedor(a) Front-End React" da Alagoas Tech.',
    type: 'ai_match',
    read: true,
    timestamp: '2026-03-02T14:25:00Z'
  },
  {
    id: 'notif-3',
    forUserId: 'cand-user',
    title: 'Bem-vinda ao Empregos AL!',
    message: 'Seu cadastro na plataforma oficial da SETEQ foi homologado com sucesso.',
    type: 'system',
    read: true,
    timestamp: '2026-03-01T10:00:00Z'
  }
];

window.INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-03-08T14:35:12Z',
    actorName: 'Dra. Camila Nogueira (SETEQ / Gestor)',
    actorRole: 'Admin SETEQ',
    action: 'Homologação Cadastral de Empresa',
    details: 'Aprovação do CNPJ 45.123.789/0001-33 (Ponta Verde Mar Ltda) após validação na Receita Federal e MTE.',
    legalBasis: 'LGPD Art. 7º, II (Cumprimento de obrigação regulatória)',
    ipAddress: '179.185.22.45'
  },
  {
    id: 'log-2',
    timestamp: '2026-03-08T11:20:05Z',
    actorName: 'Alagoas Tech Solutions (RH)',
    actorRole: 'Empresa Parceira',
    action: 'Consulta a Banco de Talentos Autorizado',
    details: 'Visualização de perfil profissional de candidato com consentimento prévio ativo para intermediação.',
    legalBasis: 'LGPD Art. 7º, I (Consentimento do titular)',
    ipAddress: '177.136.90.12'
  },
  {
    id: 'log-3',
    timestamp: '2026-03-07T16:44:30Z',
    actorName: 'Maria Eduarda Silveira',
    actorRole: 'Candidato / Cidadão',
    action: 'Atualização de Consentimento LGPD',
    details: 'Renovação de autorização para compartilhamento de currículo em processos seletivos estaduais.',
    legalBasis: 'LGPD Art. 8º (Termo de consentimento livre e informado)',
    ipAddress: '187.19.144.60'
  },
  {
    id: 'log-4',
    timestamp: '2026-03-06T09:12:00Z',
    actorName: 'Sistema Automatizado (IA Engine)',
    actorRole: 'Sistema / Algoritmo',
    action: 'Processamento de Score de Compatibilidade',
    details: 'Geração de ranking algorítmico sem viés discriminatório para vaga #job-1.',
    legalBasis: 'LGPD Art. 20 (Revisão e transparência de decisões automatizadas)',
    ipAddress: '127.0.0.1 (Local Engine)'
  }
];

window.SETEQ_INDICATORS = {
  totalJobs: 148,
  activeJobs: 86,
  totalCandidates: 3420,
  verifiedCompanies: 94,
  placedWorkers: 712,
  pcdPlaced: 48,
  sineAgencyCount: 14,
  municipalitiesCovered: 28,
  
  cityDistribution: [
    { city: 'Maceió', percentage: 46, vacancies: 68 },
    { city: 'Arapiraca', percentage: 22, vacancies: 32 },
    { city: 'Rio Largo', percentage: 10, vacancies: 15 },
    { city: 'União dos Palmares', percentage: 7, vacancies: 10 },
    { city: 'Penedo', percentage: 6, vacancies: 9 },
    { city: 'Outros Municípios de AL', percentage: 9, vacancies: 14 }
  ],

  sectorDistribution: [
    { sector: 'Serviços & TI', percentage: 34, count: 50 },
    { sector: 'Comércio & Varejo', percentage: 26, count: 39 },
    { sector: 'Turismo & Hotelaria', percentage: 18, count: 27 },
    { sector: 'Saúde & Farmacêutica', percentage: 12, count: 18 },
    { sector: 'Indústria & Agro', percentage: 10, count: 14 }
  ]
};

window.INITIAL_USERS = [
  {
    id: 'user-cand-1',
    name: 'Maria Eduarda Silveira',
    email: 'maria.silveira.al@email.com',
    password: '123',
    role: 'candidate',
    candidateId: 'cand-user',
    city: 'Maceió',
    badge: 'Cidadão Alagoano'
  },
  {
    id: 'user-comp-1',
    name: 'Alagoas Tech Solutions',
    email: 'rh@alagoastech.com.br',
    password: '123',
    role: 'company',
    companyId: 'comp-1',
    city: 'Maceió',
    badge: 'Empresa Parceira Homologada'
  },
  {
    id: 'user-comp-2',
    name: 'Hospital Maceió Saúde',
    email: 'selecao@maceiosaude.com.br',
    password: '123',
    role: 'company',
    companyId: 'comp-2',
    city: 'Maceió',
    badge: 'Empresa Parceira Homologada'
  },
  {
    id: 'user-admin-1',
    name: 'Dra. Camila Nogueira (SETEQ)',
    email: 'admin@seteq.al.gov.br',
    password: '123',
    role: 'admin',
    city: 'Maceió',
    badge: 'Gestor SETEQ / Governo AL'
  }
];

// ==========================================
// PALETA DE CORES OFICIAIS DOS SETORES PRODUTIVOS DE ALAGOAS
// ==========================================
window.SECTOR_PALETTE = {
  'Tecnologia da Informação & Startups': {
    color: '#2563eb', // blue-600
    hex: '#2563eb',
    tag: 'TI & Software',
    bgClass: 'bg-blue-100 text-blue-800 border-blue-300',
    accentColor: '#1d4ed8'
  },
  'Turismo, Hotelaria & Gastronomia': {
    color: '#0891b2', // cyan-600
    hex: '#0891b2',
    tag: 'Turismo & Hotelaria',
    bgClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    accentColor: '#0e7490'
  },
  'Agroindústria Sucroalcooleira & Bioenergia': {
    color: '#059669', // emerald-600
    hex: '#059669',
    tag: 'Agroindústria & Açúcar',
    bgClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#047857'
  },
  'Saúde, Farmácia & Biotecnologia': {
    color: '#db2777', // pink-600
    hex: '#db2777',
    tag: 'Saúde & Cuidados',
    bgClass: 'bg-pink-100 text-pink-800 border-pink-300',
    accentColor: '#be185d'
  },
  'Comércio, Varejo & Distribuição': {
    color: '#7c3aed', // violet-600
    hex: '#7c3aed',
    tag: 'Comércio & Varejo',
    bgClass: 'bg-purple-100 text-purple-800 border-purple-300',
    accentColor: '#6d28d9'
  },
  'Construção Civil & Infraestrutura': {
    color: '#d97706', // amber-600
    hex: '#d97706',
    tag: 'Construção Civil',
    bgClass: 'bg-amber-100 text-amber-800 border-amber-300',
    accentColor: '#b45309'
  },
  'Agropecuária & Energias Renováveis': {
    color: '#ea580c', // orange-600
    hex: '#ea580c',
    tag: 'Energia & Agropecuária',
    bgClass: 'bg-orange-100 text-orange-800 border-orange-300',
    accentColor: '#c2410c'
  }
};

// ==========================================
// DADOS GEORREFERENCIADOS DOS MUNICÍPIOS DE ALAGOAS
// (Coordenadas geográficas, setor líder, vagas e cidadãos)
// ==========================================
window.ALAGOAS_GEO_DATA = [
  {
    city: 'Maceió',
    region: 'Região Metropolitana',
    lat: -9.6658,
    lng: -35.7351,
    dominantSector: 'Tecnologia da Informação & Startups',
    candidatesCount: 1420,
    companiesCount: 68,
    vacanciesCount: 215,
    avgSalary: 'R$ 3.850',
    cboLeader: '3171-10 (Programador de Sistemas)',
    pcdCandidates: 88,
    topSkills: ['React', 'Atendimento ao Cliente', 'SQL', 'Enfermagem', 'Vendas B2B']
  },
  {
    city: 'Arapiraca',
    region: 'Agreste Alagoano',
    lat: -9.7547,
    lng: -36.6614,
    dominantSector: 'Comércio, Varejo & Distribuição',
    candidatesCount: 680,
    companiesCount: 42,
    vacanciesCount: 96,
    avgSalary: 'R$ 2.450',
    cboLeader: '5211-10 (Vendedor de Comércio Varejista)',
    pcdCandidates: 45,
    topSkills: ['Vendas', 'Logística & WMS', 'Operação de Caixa', 'Contabilidade']
  },
  {
    city: 'Rio Largo',
    region: 'Região Metropolitana',
    lat: -9.4794,
    lng: -35.8406,
    dominantSector: 'Construção Civil & Infraestrutura',
    candidatesCount: 295,
    companiesCount: 19,
    vacanciesCount: 48,
    avgSalary: 'R$ 2.180',
    cboLeader: '7152-10 (Pedreiro e Montador)',
    pcdCandidates: 19,
    topSkills: ['Operação de Máquinas', 'Logística', 'Solda', 'Alvenaria']
  },
  {
    city: 'Palmeira dos Índios',
    region: 'Agreste Alagoano',
    lat: -9.4069,
    lng: -36.6289,
    dominantSector: 'Comércio, Varejo & Distribuição',
    candidatesCount: 215,
    companiesCount: 15,
    vacanciesCount: 34,
    avgSalary: 'R$ 2.050',
    cboLeader: '4110-10 (Assistente Administrativo)',
    pcdCandidates: 12,
    topSkills: ['Atendimento', 'Excel', 'Cobrança', 'Recepção']
  },
  {
    city: 'União dos Palmares',
    region: 'Zona da Mata',
    lat: -9.1625,
    lng: -36.0319,
    dominantSector: 'Agroindústria Sucroalcooleira & Bioenergia',
    candidatesCount: 265,
    companiesCount: 17,
    vacanciesCount: 46,
    avgSalary: 'R$ 2.650',
    cboLeader: '9113-05 (Mecânico de Manutenção Industrial)',
    pcdCandidates: 16,
    topSkills: ['Manutenção Mecânica', 'Caldeiraria', 'Solda MIG/MAG', 'Segurança do Trabalho']
  },
  {
    city: 'Penedo',
    region: 'Litoral Sul',
    lat: -10.2897,
    lng: -36.5864,
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    candidatesCount: 185,
    companiesCount: 14,
    vacanciesCount: 30,
    avgSalary: 'R$ 2.250',
    cboLeader: '5134-05 (Garçom e Atendente de Restaurante)',
    pcdCandidates: 9,
    topSkills: ['Hotelaria', 'Inglês Básico', 'Gastronomia Regional', 'Guia Turístico']
  },
  {
    city: 'Delmiro Gouveia',
    region: 'Sertão Alagoano',
    lat: -9.3878,
    lng: -37.9997,
    dominantSector: 'Agropecuária & Energias Renováveis',
    candidatesCount: 225,
    companiesCount: 16,
    vacanciesCount: 38,
    avgSalary: 'R$ 2.900',
    cboLeader: '3131-05 (Técnico em Eletrotécnica / Solar)',
    pcdCandidates: 14,
    topSkills: ['Instalação Fotovoltaica', 'Eletrotécnica', 'Automação', 'Irrigação']
  },
  {
    city: 'Coruripe',
    region: 'Litoral Sul',
    lat: -10.1264,
    lng: -36.1756,
    dominantSector: 'Agroindústria Sucroalcooleira & Bioenergia',
    candidatesCount: 198,
    companiesCount: 15,
    vacanciesCount: 32,
    avgSalary: 'R$ 2.780',
    cboLeader: '7825-10 (Motorista de Caminhão Pesado / Canavieiro)',
    pcdCandidates: 11,
    topSkills: ['CNH Categoria E', 'Operação de Tratores', 'Logística de Colheita']
  },
  {
    city: 'Maragogi',
    region: 'Litoral Norte',
    lat: -9.0122,
    lng: -35.2214,
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    candidatesCount: 245,
    companiesCount: 24,
    vacanciesCount: 58,
    avgSalary: 'R$ 2.550',
    cboLeader: '5132-05 (Cozinheiro Geral)',
    pcdCandidates: 15,
    topSkills: ['Recepção Bilíngue', 'Governança Hoteleira', 'Cozinha Internacional', 'Condutor Náutico']
  },
  {
    city: 'Santana do Ipanema',
    region: 'Sertão Alagoano',
    lat: -9.3694,
    lng: -37.2431,
    dominantSector: 'Agropecuária & Energias Renováveis',
    candidatesCount: 168,
    companiesCount: 12,
    vacanciesCount: 26,
    avgSalary: 'R$ 2.180',
    cboLeader: '6220-20 (Trabalhador da Pecuária / Bacia Leiteira)',
    pcdCandidates: 8,
    topSkills: ['Manejo Leiteiro', 'Inseminação Artificial', 'Gestão de Rebanho']
  },
  {
    city: 'São Miguel dos Campos',
    region: 'Zona da Mata',
    lat: -9.7811,
    lng: -36.0911,
    dominantSector: 'Agroindústria Sucroalcooleira & Bioenergia',
    candidatesCount: 192,
    companiesCount: 16,
    vacanciesCount: 35,
    avgSalary: 'R$ 2.720',
    cboLeader: '8111-10 (Operador de Processos Químicos / Álcool)',
    pcdCandidates: 10,
    topSkills: ['Química Industrial', 'Controle de Destilação', 'Segurança NR-13']
  },
  {
    city: 'Marechal Deodoro',
    region: 'Região Metropolitana',
    lat: -9.7114,
    lng: -35.8958,
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    candidatesCount: 178,
    companiesCount: 17,
    vacanciesCount: 39,
    avgSalary: 'R$ 2.680',
    cboLeader: '5135-05 (Atendente de Bar / Pousada)',
    pcdCandidates: 11,
    topSkills: ['Hospitalidade', 'Gestão de Pousadas', 'Culinária Alagoana', 'Eventos']
  },
  {
    city: 'Piranhas',
    region: 'Sertão Alagoano',
    lat: -9.6256,
    lng: -37.7567,
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    candidatesCount: 115,
    companiesCount: 10,
    vacanciesCount: 22,
    avgSalary: 'R$ 2.340',
    cboLeader: '5114-05 (Guia de Turismo dos Cânions do São Francisco)',
    pcdCandidates: 6,
    topSkills: ['Ecoturismo', 'História Regional', 'Atendimento Humanizado', 'Navegação']
  },
  {
    city: 'Murici',
    region: 'Zona da Mata',
    lat: -9.3061,
    lng: -35.9431,
    dominantSector: 'Construção Civil & Infraestrutura',
    candidatesCount: 128,
    companiesCount: 9,
    vacanciesCount: 19,
    avgSalary: 'R$ 2.080',
    cboLeader: '7153-05 (Armador de Estrutura de Concreto)',
    pcdCandidates: 7,
    topSkills: ['Construção', 'Carpintaria', 'Operação de Betoneira']
  },
  {
    city: 'Porto de Pedras',
    region: 'Litoral Norte',
    lat: -9.1581,
    lng: -35.2983,
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    candidatesCount: 94,
    companiesCount: 9,
    vacanciesCount: 17,
    avgSalary: 'R$ 2.290',
    cboLeader: '5134-25 (Copeiro e Barista de Pousada de Charme)',
    pcdCandidates: 5,
    topSkills: ['Eco-Hotelaria', 'Sustentabilidade', 'Monitor Ambiental', 'Inglês']
  }
];

// ==========================================
// MESORREGIÕES ECONÔMICAS DE ALAGOAS
// (Para o Mapa Temático de Cores e Gráfico Donut)
// ==========================================
window.ALAGOAS_REGIONS_GEO = [
  {
    id: 'reg-metro',
    name: 'Região Metropolitana de Maceió',
    citiesText: 'Maceió, Rio Largo, Marechal Deodoro, Pilar, Satuba',
    dominantSector: 'Tecnologia da Informação & Startups',
    sectorKey: 'Tecnologia da Informação & Startups',
    candidates: 1980,
    vacancies: 312,
    companies: 112,
    sharePercent: 44,
    accentColor: '#2563eb'
  },
  {
    id: 'reg-agreste',
    name: 'Agreste Alagoano (Pólo Arapiraca)',
    citiesText: 'Arapiraca, Palmeira dos Índios, Girau do Ponciano, Lagoa da Canoa',
    dominantSector: 'Comércio, Varejo & Distribuição',
    sectorKey: 'Comércio, Varejo & Distribuição',
    candidates: 960,
    vacancies: 138,
    companies: 62,
    sharePercent: 22,
    accentColor: '#7c3aed'
  },
  {
    id: 'reg-sertao',
    name: 'Sertão Alagoano (Pólo Delmiro / Santana)',
    citiesText: 'Delmiro Gouveia, Santana do Ipanema, Piranhas, Mata Grande',
    dominantSector: 'Agropecuária & Energias Renováveis',
    sectorKey: 'Agropecuária & Energias Renováveis',
    candidates: 530,
    vacancies: 88,
    companies: 39,
    sharePercent: 12,
    accentColor: '#ea580c'
  },
  {
    id: 'reg-lit-norte',
    name: 'Litoral Norte (Costa dos Corais)',
    citiesText: 'Maragogi, Porto de Pedras, Japaratinga, São Luís do Quitunde',
    dominantSector: 'Turismo, Hotelaria & Gastronomia',
    sectorKey: 'Turismo, Hotelaria & Gastronomia',
    candidates: 360,
    vacancies: 78,
    companies: 35,
    sharePercent: 9,
    accentColor: '#0891b2'
  },
  {
    id: 'reg-lit-sul',
    name: 'Litoral Sul & Baixo São Francisco',
    citiesText: 'Penedo, Coruripe, Piaçabuçu, Igreja Nova',
    dominantSector: 'Agroindústria Sucroalcooleira & Bioenergia',
    sectorKey: 'Agroindústria Sucroalcooleira & Bioenergia',
    candidates: 410,
    vacancies: 64,
    companies: 30,
    sharePercent: 8,
    accentColor: '#059669'
  },
  {
    id: 'reg-mata',
    name: 'Zona da Mata Alagoana',
    citiesText: 'União dos Palmares, São Miguel dos Campos, Murici, Viçosa',
    dominantSector: 'Agroindústria Sucroalcooleira & Bioenergia',
    sectorKey: 'Agroindústria Sucroalcooleira & Bioenergia',
    candidates: 590,
    vacancies: 102,
    companies: 43,
    sharePercent: 11,
    accentColor: '#059669'
  }
];

// ==========================================
// EVOLUÇÃO TEMPORAL SINE-ALAGOAS (12 MESES)
// ==========================================
window.MONTHLY_SINE_INDICATORS = [
  { month: 'Abr/25', colocacoes: 142, vagasAbertas: 210, inscritos: 420 },
  { month: 'Mai/25', colocacoes: 168, vagasAbertas: 245, inscritos: 460 },
  { month: 'Jun/25', colocacoes: 185, vagasAbertas: 280, inscritos: 510 },
  { month: 'Jul/25', colocacoes: 210, vagasAbertas: 310, inscritos: 580 },
  { month: 'Ago/25', colocacoes: 230, vagasAbertas: 330, inscritos: 620 },
  { month: 'Set/25', colocacoes: 260, vagasAbertas: 375, inscritos: 690 },
  { month: 'Out/25', colocacoes: 295, vagasAbertas: 410, inscritos: 750 },
  { month: 'Nov/25', colocacoes: 340, vagasAbertas: 480, inscritos: 890 },
  { month: 'Dez/25', colocacoes: 390, vagasAbertas: 520, inscritos: 940 },
  { month: 'Jan/26', colocacoes: 310, vagasAbertas: 460, inscritos: 820 },
  { month: 'Fev/26', colocacoes: 365, vagasAbertas: 495, inscritos: 870 },
  { month: 'Mar/26', colocacoes: 412, vagasAbertas: 560, inscritos: 1020 }
];

// ==========================================
// MANIFESTO E COMUNICADO INSTITUCIONAL SETEQ
// (Alagoas em Evolução e Acesso Universal ao Emprego)
// ==========================================
window.ALAGOAS_INSTITUTIONAL_DATA = {
  headlineBadge: 'COMUNICADO OFICIAL DO GOVERNO DE ALAGOAS',
  mainTitle: 'Alagoas Está Evoluindo: A SETEQ Moderniza e Facilita o Acesso ao Emprego em Todo o Estado',
  leadParagraph: 'O Governo do Estado de Alagoas, por meio da Secretaria do Trabalho, Emprego e Qualificação (SETEQ), dá um passo decisivo rumo à modernização das políticas públicas de emprego. Esta plataforma oficial foi criada para transformar a forma como as oportunidades de trabalho chegam até você: de maneira rápida, transparente, sem custos e com o auxílio da Inteligência Artificial.',
  officialNote: 'A nova plataforma EMPREGOS AL rompe barreiras geográficas e operacionais, garantindo que trabalhadores da capital, do litoral, da zona da mata, do agreste e do sertão tenham igualdade de acesso às vagas cadastradas por empresas parceiras e pelo SINE/IMO nacional.',
  pillars: [
    {
      icon: 'sparkles',
      title: 'Vagas Mais Acessíveis & Gratuidade Total',
      description: 'Chega de filas e deslocamentos custosos. O trabalhador alagoano busca vagas, se candidata e gera currículo oficial diretamente pelo celular ou computador, sem pagar qualquer taxa.'
    },
    {
      icon: 'cpu',
      title: 'Inteligência Artificial a Serviço do Povo',
      description: 'Algoritmos inteligentes calculam a compatibilidade entre o currículo e os requisitos da vaga com base na CBO (Classificação Brasileira de Ocupações), orientando quem mais precisa a encontrar seu espaço.'
    },
    {
      icon: 'map-pin',
      title: 'Integração dos 102 Municípios de Alagoas',
      description: 'As oportunidades não estão restritas aos grandes centros. O sistema georreferencia vagas e candidatos por pólos produtivos regionais, valorizando os talentos do interior.'
    },
    {
      icon: 'shield-check',
      title: 'Segurança Jurídica, Anti-Fraude e LGPD',
      description: 'Todas as empresas parceiras passam por homologação cadastral no MTE para proteger os trabalhadores de fraudes, com sigilo rigoroso dos dados conforme a Lei Geral de Proteção de Dados.'
    }
  ],
  keyMetrics: [
    { label: 'Municípios Integrados', value: '102', sub: 'Todo o território de AL' },
    { label: 'Custo para o Trabalhador', value: 'R$ 0,00', sub: 'Serviço 100% público e gratuito' },
    { label: 'Pólos Econômicos Mapeados', value: '15', sub: 'Capital, Agreste, Sertão e Litoral' },
    { label: 'Conformidade Legal', value: '100%', sub: 'SINE / IMO / MTE e LGPD' }
  ]
};

// ==========================================
// CATÁLOGO DE CURSOS E CAPACITAÇÃO SETEQ
// (Qualifica Alagoas / SENAI / SENAC / Polos Tecnológicos)
// ==========================================
window.INITIAL_COURSES = [
  {
    id: 'curso-1',
    title: 'Desenvolvedor Web Full Stack & IA Aplicada',
    provider: 'SETEQ & Polo Tecnológico Jaraguá',
    partnerLogo: '💻',
    category: 'Tecnologia da Informação',
    workload: '400 horas',
    modality: 'Híbrido (Online + Práticas em Jaraguá)',
    city: 'Maceió',
    address: 'Polo Tecnológico de Alagoas, Jaraguá - Maceió/AL',
    status: 'open',
    vacancies: 60,
    vacanciesTotal: 60,
    enrolledCount: 38,
    badgeColor: 'cyan',
    startDate: '2026-04-14',
    endDate: '2026-09-30',
    description: 'Capacitação completa e imersiva para formação de desenvolvedores modernos. Aborda lógica avançada, JavaScript/TypeScript, React, Node.js, bancos de dados relacionais e integração com Inteligência Artificial generativa para o mercado alagoano.',
    requirements: [
      'Ensino Médio completo ou cursando o 3º ano em escola pública de AL',
      'Idade mínima de 16 anos',
      'Conhecimento básico de informática e uso de computadores',
      'Residir em qualquer município de Alagoas'
    ],
    syllabus: [
      'Módulo 1: Fundamentos da Web (HTML5 Semântico, CSS3 Moderno, Tailwind e Git)',
      'Módulo 2: Lógica de Programação e JavaScript ECMAScript 2026',
      'Módulo 3: Front-end Reativo com React e Arquitetura de Componentes',
      'Módulo 4: Back-end RESTful com Node.js, Express e PostgreSQL',
      'Módulo 5: Integração com Modelos de Inteligência Artificial e LLMs',
      'Módulo 6: Projeto Final Aplicado a Demandas de Empresas Parceiras da SETEQ'
    ],
    benefits: [
      'Certificado Oficial reconhecido pelo MEC e SETEQ com QR Code de autenticidade',
      'Bolsa auxílio conectividade e transporte para aulas presenciais',
      'Encaminhamento direto para processos seletivos de empresas parceiras'
    ]
  },
  {
    id: 'curso-2',
    title: 'Instalação e Manutenção de Sistemas Solares Fotovoltaicos',
    provider: 'SETEQ & SENAI Arapiraca',
    partnerLogo: '☀️',
    category: 'Energias Renováveis & Infraestrutura',
    workload: '160 horas',
    modality: 'Presencial',
    city: 'Arapiraca',
    address: 'Unidade SENAI Arapiraca, Bairro Primavera - Arapiraca/AL',
    status: 'open',
    vacancies: 40,
    vacanciesTotal: 40,
    enrolledCount: 29,
    badgeColor: 'amber',
    startDate: '2026-04-20',
    endDate: '2026-06-25',
    description: 'Curso técnico e prático voltado para o setor de energia solar, um dos que mais cresce no Agreste e Sertão de Alagoas. O aluno aprende dimensionamento, montagem em telhados e usinas, conexão à rede e normas de segurança NR-10 e NR-35.',
    requirements: [
      'Ensino Fundamental completo',
      'Idade mínima de 18 anos',
      'Aptidão física para trabalho em altura (exames fornecidos no local)'
    ],
    syllabus: [
      'Módulo 1: Eletricidade Básica e Fundamentos Fotovoltaicos',
      'Módulo 2: Segurança no Trabalho (NR-10 e NR-35 - Trabalho em Altura)',
      'Módulo 3: Dimensionamento e Projeto de Sistemas On-Grid e Off-Grid',
      'Módulo 4: Instalação Mecânica de Painéis e Inversores',
      'Módulo 5: Testes de Comissionamento, Manutenção Preventiva e Corretiva'
    ],
    benefits: [
      'Certificação dupla SENAI + SETEQ',
      'EPI completo gratuito para as aulas práticas',
      'Cadastramento prioritário no banco de profissionais do SINE Solar AL'
    ]
  },
  {
    id: 'curso-3',
    title: 'Excel Avançado, Power BI e Análise de Dados para o Comércio',
    provider: 'Qualifica Alagoas EAD',
    partnerLogo: '📊',
    category: 'Gestão, Comércio & Tecnologia',
    workload: '80 horas',
    modality: 'Online EAD (com tutoria ao vivo semanal)',
    city: 'Estadual (102 Municípios)',
    address: 'Ambiente Virtual de Aprendizagem SETEQ',
    status: 'open',
    vacancies: 150,
    vacanciesTotal: 150,
    enrolledCount: 112,
    badgeColor: 'emerald',
    startDate: '2026-04-05',
    endDate: '2026-05-15',
    description: 'Voltado para profissionais do comércio, varejo, escritórios e cooperativas que precisam dominar planilhas dinâmicas, fórmulas avançadas, dashboards interativos e automação para tomada de decisão com Power BI.',
    requirements: [
      'Ensino Médio em andamento ou concluído',
      'Acesso a computador ou tablet com internet'
    ],
    syllabus: [
      'Módulo 1: Fórmulas Avançadas no Excel (PROCV, PROCX, ÍNDICE, CORRESP, SEs compostos)',
      'Módulo 2: Tabelas Dinâmicas, Segmentação de Dados e Gráficos Gerenciais',
      'Módulo 3: Introdução ao Power Query e Tratamento de Bases de Dados Comerciais',
      'Módulo 4: Construção de Painéis Executivos (Dashboards) no Power BI Desktop',
      'Módulo 5: Indicadores Chave de Vendas, Estoque e Faturamento'
    ],
    benefits: [
      '100% Flexível com aulas gravadas e encontros síncronos tira-dúvidas',
      'Acesso gratuito à licença de softwares durante o período do curso',
      'Certificado digital com chancela do Governo do Estado'
    ]
  },
  {
    id: 'curso-4',
    title: 'Gestão Hoteleira, Ecoturismo & Recepção Bilíngue',
    provider: 'SETEQ & SENAC Costa dos Corais',
    partnerLogo: '🌴',
    category: 'Turismo, Gastronomia & Hotelaria',
    workload: '120 horas',
    modality: 'Presencial',
    city: 'Maragogi',
    address: 'Centro de Capacitação Turística, Rodovia AL-101 Norte - Maragogi/AL',
    status: 'open',
    vacancies: 45,
    vacanciesTotal: 45,
    enrolledCount: 31,
    badgeColor: 'blue',
    startDate: '2026-04-10',
    endDate: '2026-06-12',
    description: 'Capacitação prática para a vocação turística do Litoral Norte e Costa dos Corais de Alagoas. Foco em atendimento de alto padrão em resorts e pousadas, check-in/check-out em sistemas hoteleiros, inglês instrumental e práticas de sustentabilidade ambiental.',
    requirements: [
      'Ensino Médio completo',
      'Idade mínima de 18 anos',
      'Residir na região da Costa dos Corais (Maragogi, Japaratinga, Porto de Pedras ou Porto Calvo)'
    ],
    syllabus: [
      'Módulo 1: Panorama do Turismo Alagoano e Práticas de Ecoturismo Sustentável',
      'Módulo 2: Rotinas de Governança, Recepção e Concierge em Hotelaria',
      'Módulo 3: Softwares de Gestão Hoteleira (PMS) e Tarifação',
      'Módulo 4: Inglês Instrumental Aplicado à Recepção e Atendimento a Turistas Estrangeiros',
      'Módulo 5: Resolução de Conflitos e Excelência no Encantamento do Hóspede'
    ],
    benefits: [
      'Parceria com a Associação dos Hoteleiros de Maragogi (AHMAR)',
      'Visitas técnicas guiadas aos maiores resorts da região',
      'Entrevistas de contratação agendadas na conclusão do curso'
    ]
  },
  {
    id: 'curso-5',
    title: 'Soldagem Industrial (MIG/MAG & Eletrodo Revestido)',
    provider: 'SETEQ & SENAI Polo Cloroquímico',
    partnerLogo: '⚡',
    category: 'Construção Civil & Indústria',
    workload: '220 horas',
    modality: 'Presencial',
    city: 'Marechal Deodoro',
    address: 'Polo Industrial Cloroquímico de Alagoas - Marechal Deodoro/AL',
    status: 'open',
    vacancies: 30,
    vacanciesTotal: 30,
    enrolledCount: 22,
    badgeColor: 'rose',
    startDate: '2026-04-18',
    endDate: '2026-07-20',
    description: 'Curso industrial de alta demanda no parque fabril e sucroalcooleiro alagoano. O aluno adquire domínio técnico em processos de união e corte de metais por arco elétrico, leitura de simbologia técnica e normas da American Welding Society (AWS).',
    requirements: [
      'Ensino Fundamental completo',
      'Idade mínima de 18 anos'
    ],
    syllabus: [
      'Módulo 1: Metrologia Aplicada e Desenho Técnico Mecânico',
      'Módulo 2: Segurança em Processos de Soldagem e Oxicorte',
      'Módulo 3: Soldagem com Eletrodo Revestido em Posições Plana e Horizontal',
      'Módulo 4: Soldagem com Processo Semiautomático MIG/MAG',
      'Módulo 5: Inspeção Visual e Ensaios Não Destrutivos de Juntas Soldadas'
    ],
    benefits: [
      'Laboratórios industriais com equipamentos de solda de última geração',
      'Material didático e consumíveis de soldagem 100% gratuitos',
      'Cadastro prioritário nas indústrias químicas e usinas de cana de AL'
    ]
  },
  {
    id: 'curso-6',
    title: 'Assistente de Logística, Armazenagem e Gestão de Frotas',
    provider: 'SETEQ & SEBRAE Alagoas',
    partnerLogo: '🚚',
    category: 'Logística, Transporte & Suprimentos',
    workload: '100 horas',
    modality: 'Híbrido',
    city: 'Rio Largo',
    address: 'Hub Logístico do Aeroporto Zumbi dos Palmares - Rio Largo/AL',
    status: 'open',
    vacancies: 50,
    vacanciesTotal: 50,
    enrolledCount: 37,
    badgeColor: 'indigo',
    startDate: '2026-04-15',
    endDate: '2026-06-05',
    description: 'Formação estratégica voltada para o corredor logístico da Região Metropolitana de Maceió e Rio Largo. Prepara o participante para atuar em centros de distribuição, recebimento, conferência fiscal, inventários e roteirização inteligente.',
    requirements: [
      'Ensino Médio em andamento ou concluído',
      'Conhecimentos básicos de matemática e informática'
    ],
    syllabus: [
      'Módulo 1: Fundamentos da Cadeia de Suprimentos (Supply Chain Management)',
      'Módulo 2: Armazenagem, Layout de Depósitos e Endereçamento de Cargas',
      'Módulo 3: Documentação Fiscal de Transporte (CT-e, MDF-e, DANFE)',
      'Módulo 4: Gestão de Estoques (Curva ABC, PEPS, Giro de Estoque)',
      'Módulo 5: Softwares WMS e Roteirização de Frotas por GPS'
    ],
    benefits: [
      'Conexão direta com galpões e transportadoras do distrito industrial',
      'Estudo de casos reais de empresas distribuidoras em Alagoas',
      'Certificado chancelado pelo SEBRAE e Governo de Alagoas'
    ]
  }
];

// ==========================================
// NOTÍCIAS INSTITUCIONAIS E COMUNICADOS SETEQ
// ==========================================
window.INITIAL_NEWS = [
  {
    id: 'noticia-1',
    title: 'SETEQ Abre Mais de 500 Vagas de Qualificação Gratuita em Parceria com o Polo Tecnológico e SENAI',
    summary: 'Cursos nas áreas de Tecnologia da Informação, Energia Solar, Logística e Hotelaria com bolsas conectividade e auxílio transporte.',
    date: '08 de Março de 2026',
    dateIso: '2026-03-08',
    category: 'Cursos & Qualificação',
    categoryColor: 'cyan',
    readTime: '3 min de leitura',
    author: 'Assessoria de Comunicação SETEQ Alagoas',
    pinned: true,
    bannerUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p class="mb-4">O Governo de Alagoas, por meio da Secretaria do Trabalho, Emprego e Qualificação (SETEQ), lançou nesta semana o maior pacote de capacitação profissional do primeiro semestre de 2026. São mais de 500 vagas totalmente gratuitas distribuídas em municípios estratégicos como Maceió, Arapiraca, Maragogi, Marechal Deodoro e Rio Largo, além de turmas em modalidade EAD com alcance para os 102 municípios alagoanos.</p>
      <p class="mb-4">As capacitações contemplam setores de altíssima empregabilidade, incluindo Desenvolvimento Web e Inteligência Artificial, Instalação de Sistemas Solares Fotovoltaicos, Gestão Hoteleira para a Costa dos Corais e Soldagem Industrial para o Polo Cloroquímico.</p>
      <p class="mb-4"><em>"Nosso compromisso é qualificar o trabalhador alagoano para as reais necessidades das empresas instaladas em nosso estado. Nenhuma taxa é cobrada e os alunos ainda contam com suporte para transporte e materiais de alta tecnologia"</em>, ressaltou o Secretário da pasta.</p>
      <p class="mb-4">As inscrições podem ser feitas diretamente pelo aplicativo oficial EMPREGOS AL ou pelo portal web com apenas um clique.</p>
    `
  },
  {
    id: 'noticia-2',
    title: 'Governador Anuncia Expansão das Agências SINE Itinerantes no Agreste e Sertão Alagoano',
    summary: 'Unidades móveis levarão intermediação de vagas, emissão de carteira digital e seguro-desemprego para municípios do interior.',
    date: '05 de Março de 2026',
    dateIso: '2026-03-05',
    category: 'SINE & Políticas Públicas',
    categoryColor: 'blue',
    readTime: '4 min de leitura',
    author: 'SECOM Governo de Alagoas',
    pinned: false,
    bannerUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p class="mb-4">Para democratizar ainda mais o acesso ao mercado formal de trabalho, o Governo de Alagoas apresentou o novo cronograma da <strong>Caravana SINE Itinerante</strong>. Quatro ônibus totalmente equipados com internet via satélite e atendentes treinados percorrerão 25 cidades do Agreste, Sertão e Bacia Leiteira durante os próximos 60 dias.</p>
      <p class="mb-4">O objetivo é garantir que o cidadão do interior não precise viajar até os grandes centros para cadastrar seu currículo, homologar rescisões ou solicitar orientações previdenciárias e de qualificação.</p>
      <p class="mb-4">As equipes também realizarão triagem presencial para vagas locais em cooperativas leiteiras, agricultura familiar, comércio e obras públicas estaduais.</p>
    `
  },
  {
    id: 'noticia-3',
    title: 'Nova Lei Estadual Garante Incentivos Fiscais para Empresas que Contratarem Jovens do Programa Primeiro Emprego',
    summary: 'Iniciativa reduz alíquotas de ICMS para parceiros comerciais que admitirem concluintes dos cursos técnicos estaduais.',
    date: '02 de Março de 2026',
    dateIso: '2026-03-02',
    category: 'Legislação & Economia',
    categoryColor: 'amber',
    readTime: '3 min de leitura',
    author: 'Núcleo de Relações Institucionais SETEQ',
    pinned: false,
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p class="mb-4">Entrou em vigor nesta semana a nova legislação estadual que estabelece incentivos fiscais progressivos para indústrias, comércios e empresas de serviços que destinarem pelo menos 15% de suas contratações anuais a jovens entre 16 e 24 anos em busca da primeira oportunidade profissional.</p>
      <p class="mb-4">A plataforma EMPREGOS AL já conta com um selo especial de <strong>"Empresa Cidadã Parceira do Jovem"</strong>, facilitando o cálculo de contrapartidas fiscais em tempo real junto à Secretaria de Fazenda (SEFAZ/AL).</p>
      <p class="mb-4">Empresas homologadas no sistema recebem relatórios automáticos de conformidade e auditoria com validade jurídica.</p>
    `
  },
  {
    id: 'noticia-4',
    title: 'Plataforma Digital SETEQ Registra Redução de 45% no Tempo de Contratação com Inteligência Artificial',
    summary: 'Algoritmo de Match IA baseado na CBO acelera conexão entre perfis de candidatos e requisitos das empresas alagoanas.',
    date: '28 de Fevereiro de 2026',
    dateIso: '2026-02-28',
    category: 'Inovação & Tecnologia',
    categoryColor: 'emerald',
    readTime: '2 min de leitura',
    author: 'Diretoria de Transformação Digital SETEQ',
    pinned: false,
    bannerUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p class="mb-4">O balanço dos primeiros meses de operação do sistema unificado de empregos de Alagoas apontou um salto inédito de eficiência. O tempo médio entre a publicação de uma vaga e o preenchimento da vaga caiu de 18 dias úteis para apenas 7 dias.</p>
      <p class="mb-4">A ferramenta de Inteligência Artificial analisa mais de 30 variáveis de compatibilidade, incluindo proximidade geográfica por município, experiências prévias, certificações técnicas e habilidades complementares, respeitando rigorosamente os critérios de não-discriminação e a LGPD.</p>
    `
  }
];

// ==========================================
// NOTIFICAÇÕES PUSH SIMULADAS PARA O APLICATIVO MOBILE
// ==========================================
window.INITIAL_PUSH_NOTIFICATIONS = [
  {
    id: 'push-1',
    title: '🎯 Nova Vaga Compatível (Match IA: 94%)',
    body: 'Alagoas Tech abriu vaga de Desenvolvedor Web em Maceió com salário de R$ 4.500. Candidate-se agora!',
    time: 'Há 12 minutos',
    type: 'job',
    targetTab: 'jobs',
    icon: 'briefcase'
  },
  {
    id: 'push-2',
    title: '🎓 Inscrição Liberada: Curso de Energia Solar',
    body: 'Turma de 160h presencial no SENAI Arapiraca com bolsa auxílio. Restam poucas vagas!',
    time: 'Há 1 hora',
    type: 'course',
    targetTab: 'courses',
    icon: 'academic-cap'
  },
  {
    id: 'push-3',
    title: '📢 Comunicado Oficial SETEQ',
    body: 'Caravana SINE Itinerante estará em Palmeira dos Índios e Santana do Ipanema nesta quinta-feira.',
    time: 'Há 3 horas',
    type: 'news',
    targetTab: 'news',
    icon: 'bell'
  },
  {
    id: 'push-4',
    title: '👀 Seu currículo foi visualizado!',
    body: 'Hospital Maceió Saúde analisou sua candidatura para Enfermeiro Assistencial.',
    time: 'Ontem',
    type: 'application',
    targetTab: 'applications',
    icon: 'check-circle'
  }
];

// ==========================================
// REDE DE POSTOS E AGÊNCIAS SINE EM ALAGOAS
// ==========================================
window.SINE_OFFICES = [
  {
    id: 'sine-maceio-central',
    name: 'SINE Central Maceió',
    city: 'Maceió',
    address: 'Rua do Livramento, 153 - Centro, Maceió - AL, 57020-030',
    phone: '(82) 3315-1818',
    hours: 'Segunda a Sexta, das 08h às 14h',
    services: ['Intermediação de Mão de Obra', 'Entrada Seguro-Desemprego', 'Carteira de Trabalho Digital', 'Atendimento PCD'],
    lat: -9.6658,
    lng: -35.7350
  },
  {
    id: 'sine-maceio-jaragua',
    name: 'SINE / SETEQ Inovação Jaraguá',
    city: 'Maceió',
    address: 'Rua Sá e Albuquerque, 320 - Jaraguá, Maceió - AL, 57022-180',
    phone: '(82) 3315-4200',
    hours: 'Segunda a Sexta, das 08h às 17h',
    services: ['Cursos Tecnológicos', 'Capacitação Qualifica AL', 'Atendimento a Startups & Empresas'],
    lat: -9.6710,
    lng: -35.7280
  },
  {
    id: 'sine-arapiraca',
    name: 'SINE Regional Arapiraca (Agreste)',
    city: 'Arapiraca',
    address: 'Rua São Francisco, 450 - Centro, Arapiraca - AL, 57300-080',
    phone: '(82) 3522-3150',
    hours: 'Segunda a Sexta, das 08h às 14h',
    services: ['Vagas do Agreste', 'Seguro-Desemprego', 'Cursos Técnicos SENAI/SETEQ', 'Capacitação Solar'],
    lat: -9.7517,
    lng: -36.6606
  },
  {
    id: 'sine-penedo',
    name: 'SINE Regional Penedo (Baixo São Francisco)',
    city: 'Penedo',
    address: 'Avenida Getúlio Vargas, 89 - Centro Histórico, Penedo - AL, 57200-000',
    phone: '(82) 3551-2244',
    hours: 'Segunda a Sexta, das 08h às 13h',
    services: ['Vagas do Setor Turístico & Náutico', 'Atendimento a Pescadores e Trabalhadores Rurais'],
    lat: -10.2908,
    lng: -36.5819
  },
  {
    id: 'sine-delmiro',
    name: 'SINE Regional Delmiro Gouveia (Alto Sertão)',
    city: 'Delmiro Gouveia',
    address: 'Praça Vicente de Menezes, 12 - Centro, Delmiro Gouveia - AL, 57480-000',
    phone: '(82) 3641-1188',
    hours: 'Segunda a Sexta, das 08h às 13h',
    services: ['Vagas do Sertão e Bacia Leiteira', 'Encaminhamento para Obras e Indústria'],
    lat: -9.3886,
    lng: -37.9997
  },
  {
    id: 'sine-uniao',
    name: 'SINE Regional União dos Palmares (Zona da Mata)',
    city: 'União dos Palmares',
    address: 'Rua Marechal Deodoro, 78 - Centro, União dos Palmares - AL, 57900-000',
    phone: '(82) 3281-2900',
    hours: 'Segunda a Sexta, das 08h às 13h30',
    services: ['Vagas do Setor Sucroalcooleiro', 'Comércio Local', 'Qualificação Técnica'],
    lat: -9.1627,
    lng: -36.0319
  }
];

// ==========================================
// BASE DE PERGUNTAS FREQUENTES (FAQ) & SUPORTE
// ==========================================
window.INITIAL_FAQS = [
  {
    category: 'Geral & Cadastro',
    question: 'A plataforma EMPREGOS AL e os serviços da SETEQ cobram alguma taxa?',
    answer: 'Não! Todo o serviço de intermediação de mão de obra do Governo de Alagoas e do SINE é 100% público e gratuito, conforme previsto na Lei Federal nº 7.998/1990. Nunca pague para conseguir emprego ou para fazer cursos ofertados pela SETEQ.'
  },
  {
    category: 'Candidatos',
    question: 'Como funciona o cálculo de Match IA entre meu perfil e a vaga?',
    answer: 'Nossa Inteligência Artificial compara suas competências, histórico de trabalho cadastrado, formação escolar e proximidade geográfica com as exigências da empresa, atribuindo um percentual de 0 a 100%. Quanto mais completo for o preenchimento do seu currículo, mais assertivo será o seu índice de afinidade.'
  },
  {
    category: 'Cursos & Capacitação',
    question: 'Como recebo o certificado ao concluir um curso na SETEQ?',
    answer: 'Após atingir no mínimo 75% de frequência e aprovação nas avaliações do curso, o certificado oficial em PDF é emitido com assinatura digital do Governo de Alagoas e QR Code de autenticação criptográfica válida em todo o território nacional.'
  },
  {
    category: 'SINE & Benefícios',
    question: 'Como solicitar a habilitação ao Seguro-Desemprego?',
    answer: 'O trabalhador dispensado sem justa causa pode requerer o benefício pelo aplicativo Carteira de Trabalho Digital, pelo portal Gov.br ou presencialmente em uma de nossas agências regionais do SINE em Alagoas, munido do termo de rescisão e requerimento do empregador.'
  },
  {
    category: 'Empresas Parceiras',
    question: 'Quanto tempo leva para homologar o cadastro de uma empresa?',
    answer: 'A equipe técnica de fiscalização da SETEQ valida o CNPJ junto à Receita Federal e ao Ministério do Trabalho em até 24 horas úteis. Uma vez homologada, a empresa parceira pode publicar vagas ilimitadas e utilizar o painel Kanban de recrutamento.'
  },
  {
    category: 'Acessibilidade & Segurança',
    question: 'Meus dados cadastrais estão protegidos conforme a LGPD?',
    answer: 'Sim, a plataforma adota criptografia AES-256 em repouso e TLS 1.3 em trânsito. O cidadão possui controle total de seus dados pessoais através da Trilha de Auditoria LGPD, podendo solicitar anonimização ou exclusão a qualquer instante.'
  }
];



