/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Base de Dados Inicial (Seed Data)
 */

export const ALAGOAS_CITIES = [
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

export const JOB_CATEGORIES = [
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

export const INITIAL_COMPANIES = [
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

export const INITIAL_JOBS = [
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

export const INITIAL_CANDIDATE_PROFILE = {
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

export const INITIAL_OTHER_CANDIDATES = [
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

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    candidateId: 'cand-user',
    candidateName: 'Maria Eduarda dos Santos Silveira',
    jobId: 'job-1',
    jobTitle: 'Desenvolvedor(a) Front-End React / TypeScript',
    companyId: 'comp-1',
    companyName: 'Alagoas Tech Solutions',
    appliedAt: '2026-03-02T14:20:00Z',
    status: 'interview', // 'applied', 'screening', 'interview', 'approved', 'rejected'
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

export const INITIAL_NOTIFICATIONS = [
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

export const INITIAL_AUDIT_LOGS = [
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

export const SETEQ_INDICATORS = {
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
