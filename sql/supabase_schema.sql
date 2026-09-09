-- ==============================================================================
-- EMPREGOS AL – SETEQ (Governo do Estado de Alagoas)
-- Esquema Completo de Banco de Dados PostgreSQL para Supabase
-- Intermediação de Mão de Obra, Gestão de Vagas, Currículos e Acessibilidade
-- Conformidade: LGPD (Lei 13.709/18), SINE/IMO e WCAG 2.1 AA
-- ==============================================================================

-- 1. Habilitação de Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABELAS PRINCIPAIS
-- ==============================================================================

-- 2.1 Usuários do Sistema
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    papel TEXT NOT NULL CHECK (papel IN ('candidate', 'company', 'admin')),
    telefone TEXT,
    municipio TEXT DEFAULT 'Maceió',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.2 Empresas Parceiras Homologadas (Polos de Alagoas)
CREATE TABLE IF NOT EXISTS public.empresas (
    id TEXT PRIMARY KEY,
    cnpj TEXT UNIQUE NOT NULL,
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT NOT NULL,
    setor TEXT NOT NULL,
    municipio TEXT NOT NULL,
    contato_email TEXT NOT NULL,
    telefone TEXT,
    homologado BOOLEAN DEFAULT TRUE,
    data_homologacao TIMESTAMPTZ DEFAULT NOW(),
    descricao TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.3 Candidatos / Trabalhadores Alagoanos
CREATE TABLE IF NOT EXISTS public.candidatos (
    id TEXT PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    cpf TEXT UNIQUE,
    nome_completo TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    municipio TEXT NOT NULL,
    data_nascimento DATE,
    resumo_profissional TEXT,
    escolaridade TEXT,
    habilidades TEXT[] DEFAULT '{}',
    experiencias JSONB DEFAULT '[]'::jsonb,
    formacao JSONB DEFAULT '[]'::jsonb,
    pcd BOOLEAN DEFAULT FALSE,
    tipo_deficiencia TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.4 Oportunidades de Emprego (Vagas)
CREATE TABLE IF NOT EXISTS public.vagas (
    id TEXT PRIMARY KEY,
    empresa_id TEXT REFERENCES public.empresas(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    cbo_codigo TEXT,
    cbo_titulo TEXT,
    setor TEXT NOT NULL,
    municipio TEXT NOT NULL,
    modalidade TEXT NOT NULL CHECK (modalidade IN ('Presencial', 'Híbrido', 'Remoto')),
    tipo_contrato TEXT NOT NULL DEFAULT 'CLT',
    salario_min NUMERIC(10, 2),
    salario_max NUMERIC(10, 2),
    salario_combinar BOOLEAN DEFAULT FALSE,
    pcd_exclusivo BOOLEAN DEFAULT FALSE,
    competencias_exigidas TEXT[] DEFAULT '{}',
    descricao TEXT NOT NULL,
    beneficios TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'aberta' CHECK (status IN ('aberta', 'pausada', 'encerrada')),
    data_publicacao DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.5 Candidaturas e Pipeline Seletivo (Kanban)
CREATE TABLE IF NOT EXISTS public.candidaturas (
    id TEXT PRIMARY KEY,
    vaga_id TEXT REFERENCES public.vagas(id) ON DELETE CASCADE,
    candidato_id TEXT REFERENCES public.candidatos(id) ON DELETE CASCADE,
    status_etapa TEXT NOT NULL DEFAULT 'novo' CHECK (status_etapa IN ('novo', 'triagem', 'entrevista', 'aprovado', 'reserva')),
    match_percentual INTEGER DEFAULT 0 CHECK (match_percentual BETWEEN 0 AND 100),
    data_candidatura TIMESTAMPTZ DEFAULT NOW(),
    data_entrevista TIMESTAMPTZ,
    local_entrevista TEXT,
    feedback_empresa TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.6 Programa Qualifica Alagoas (Cursos & Treinamentos)
CREATE TABLE IF NOT EXISTS public.cursos (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    instituicao TEXT NOT NULL,
    modalidade TEXT NOT NULL CHECK (modalidade IN ('Presencial', 'EAD', 'Semipresencial')),
    municipio TEXT NOT NULL,
    carga_horaria INTEGER NOT NULL,
    vagas_totais INTEGER DEFAULT 40,
    vagas_disponiveis INTEGER DEFAULT 40,
    descricao TEXT,
    requisitos TEXT,
    status TEXT DEFAULT 'aberto' CHECK (status IN ('aberto', 'em_andamento', 'encerrado')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.7 Inscrições em Cursos
CREATE TABLE IF NOT EXISTS public.inscricoes_cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curso_id TEXT REFERENCES public.cursos(id) ON DELETE CASCADE,
    candidato_id TEXT REFERENCES public.candidatos(id) ON DELETE CASCADE,
    data_inscricao TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'confirmada' CHECK (status IN ('confirmada', 'cancelada', 'concluida'))
);

-- 2.8 Notícias Institucionais & Editais SETEQ
CREATE TABLE IF NOT EXISTS public.noticias (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT,
    categoria TEXT DEFAULT 'Institucional',
    data_publicacao DATE DEFAULT CURRENT_DATE,
    autor TEXT DEFAULT 'SETEQ Comunicação',
    url_imagem TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.9 Rede SINE Alagoas (Postos Físicos e Centrais Já!)
CREATE TABLE IF NOT EXISTS public.postos_sine (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    municipio TEXT NOT NULL,
    endereco TEXT NOT NULL,
    telefone TEXT,
    whatsapp TEXT,
    horario TEXT DEFAULT 'Segunda a Sexta, 08h às 14h',
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.10 Trilha de Auditoria LGPD (Lei 13.709/2018)
CREATE TABLE IF NOT EXISTS public.auditoria_lgpd (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    usuario_id TEXT,
    perfil TEXT NOT NULL,
    acao TEXT NOT NULL,
    detalhe TEXT NOT NULL,
    base_legal TEXT NOT NULL,
    ip_origem TEXT DEFAULT '127.0.0.1'
);

-- ==============================================================================
-- 3. ÍNDICES DE DESEMPENHO E BUSCA GEOGRÁFICA
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_vagas_municipio ON public.vagas(municipio);
CREATE INDEX IF NOT EXISTS idx_vagas_setor ON public.vagas(setor);
CREATE INDEX IF NOT EXISTS idx_vagas_status ON public.vagas(status);
CREATE INDEX IF NOT EXISTS idx_vagas_cbo ON public.vagas(cbo_codigo);
CREATE INDEX IF NOT EXISTS idx_candidatos_municipio ON public.candidatos(municipio);
CREATE INDEX IF NOT EXISTS idx_candidaturas_vaga ON public.candidaturas(vaga_id);
CREATE INDEX IF NOT EXISTS idx_candidaturas_candidato ON public.candidaturas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_cursos_municipio ON public.cursos(municipio);

-- ==============================================================================
-- 4. POLÍTICAS DE SEGURANÇA ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.postos_sine ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditoria_lgpd ENABLE ROW LEVEL SECURITY;

-- 4.1 Políticas de Leitura Pública para Informações Abertas
CREATE POLICY "Leitura pública de vagas abertas" ON public.vagas
    FOR SELECT USING (true);

CREATE POLICY "Leitura pública de empresas parceiras" ON public.empresas
    FOR SELECT USING (true);

CREATE POLICY "Leitura pública de cursos" ON public.cursos
    FOR SELECT USING (true);

CREATE POLICY "Leitura pública de notícias" ON public.noticias
    FOR SELECT USING (true);

CREATE POLICY "Leitura pública de postos SINE" ON public.postos_sine
    FOR SELECT USING (true);

-- 4.2 Políticas de Candidaturas e Candidatos (Permissão Anônima e Autenticada para SPA)
CREATE POLICY "Leitura e inserção de candidaturas" ON public.candidaturas
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Operações de candidatos" ON public.candidatos
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Inserção e leitura de auditoria LGPD" ON public.auditoria_lgpd
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Gerenciamento de vagas por empresas" ON public.vagas
    FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 5. CARGA INICIAL DE DADOS (SEED DATA - ALAGOAS)
-- ==============================================================================

-- 5.1 Empresas
INSERT INTO public.empresas (id, cnpj, razao_social, nome_fantasia, setor, municipio, contato_email, telefone, homologado, descricao)
VALUES 
    ('comp-1', '03.882.145/0001-92', 'Alagoas Tech Inovação S/A', 'Oxente Tech Solutions', 'Tecnologia / TI', 'Maceió', 'talentos@oxentetech.com.br', '(82) 3030-1000', TRUE, 'Empresa âncora do Polo Tecnológico do Jaraguá.'),
    ('comp-2', '12.449.871/0001-30', 'Indústria Química Lagoas do Sul Ltda', 'Química Alagoana', 'Indústria', 'Marechal Deodoro', 'rh@quimicaalagoana.com.br', '(82) 3260-2000', TRUE, 'Integrante do Polo Cloroquímico de Marechal Deodoro.'),
    ('comp-3', '07.311.902/0001-55', 'Rede Agreste Atacadista de Alimentos S/A', 'Agreste Atacado', 'Comércio / Varejo', 'Arapiraca', 'vagas@agreatacado.com.br', '(82) 3522-3000', TRUE, 'Líder em distribuição de secos e molhados no Agreste.'),
    ('comp-4', '18.902.114/0001-41', 'Resort & Spa Costa dos Corais Ltda', 'Pajuçara Grand Resort', 'Turismo / Hotelaria', 'Maragogi', 'gestaodepessoas@pajucararesort.com.br', '(82) 3296-4000', TRUE, 'Complexo hoteleiro 5 estrelas do Litoral Norte.'),
    ('comp-5', '24.118.432/0001-88', 'Laticínios Sertão Forte Cooperativa', 'Laticínios Sertão Forte', 'Agropecuária / Bacia Leiteira', 'Batalha', 'contato@sertaoforte.coop.br', '(82) 3531-1500', TRUE, 'Cooperativa de beneficiamento de leite do Sertão.')
ON CONFLICT (id) DO NOTHING;

-- 5.2 Vagas
INSERT INTO public.vagas (id, empresa_id, titulo, cbo_codigo, cbo_titulo, setor, municipio, modalidade, tipo_contrato, salario_min, salario_max, pcd_exclusivo, competencias_exigidas, descricao)
VALUES
    ('job-1', 'comp-1', 'Desenvolvedor Full Stack Júnior', '2124-05', 'Analista de Desenvolvimento de Sistemas', 'Tecnologia / TI', 'Maceió', 'Híbrido', 'CLT', 3500.00, 4800.00, FALSE, ARRAY['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Git'], 'Desenvolvimento de portais governamentais e sistemas de intermediação para Alagoas.'),
    ('job-2', 'comp-2', 'Técnico em Química Industrial', '3111-05', 'Técnico em Química', 'Indústria', 'Marechal Deodoro', 'Presencial', 'CLT', 2900.00, 3800.00, FALSE, ARRAY['Controle de Qualidade', 'Normas ISO', 'Operações Unitárias', 'Segurança do Trabalho'], 'Atuação em planta química no Polo de Marechal Deodoro com transporte fretado.'),
    ('job-3', 'comp-3', 'Assistente de Logística e Expedição', '4141-05', 'Almoxarife / Estoquista', 'Comércio / Varejo', 'Arapiraca', 'Presencial', 'CLT', 1850.00, 2400.00, TRUE, ARRAY['Excel Intermediário', 'Controle de Estoque', 'Conferência de Cargas', 'WMS'], 'Vaga exclusiva para Pessoa com Deficiência (PCD) no centro de distribuição em Arapiraca.'),
    ('job-4', 'comp-4', 'Recepcionista Bilíngue de Hotelaria', '4221-05', 'Recepcionista de Hotel', 'Turismo / Hotelaria', 'Maragogi', 'Presencial', 'CLT', 2200.00, 2800.00, FALSE, ARRAY['Inglês Intermediário', 'Atendimento ao Público', 'Check-in/Check-out', 'Comunicação'], 'Atendimento cordial a turistas nacionais e estrangeiros em Maragogi.'),
    ('job-5', 'comp-5', 'Operador de Máquinas Agroindustriais', '7212-15', 'Operador de Máquinas', 'Agropecuária / Bacia Leiteira', 'Batalha', 'Presencial', 'CLT', 2100.00, 2600.00, FALSE, ARRAY['Operação de Pasteurizadores', 'Higiene Sanitária', 'Manutenção Preventiva'], 'Operação e pasteurização de laticínios no centro da Bacia Leiteira de Alagoas.')
ON CONFLICT (id) DO NOTHING;

-- 5.3 Cursos Qualifica Alagoas
INSERT INTO public.cursos (id, titulo, instituicao, modalidade, municipio, carga_horaria, vagas_disponiveis, descricao)
VALUES
    ('curso-1', 'Desenvolvimento Web e Programação Full Stack (Oxente Tech)', 'SENAI Alagoas & SETEQ', 'EAD', 'Maceió', 160, 45, 'Capacitação completa em desenvolvimento web para inserção direta no Polo de TI Jaraguá.'),
    ('curso-2', 'Operações Logísticas e Gestão de Almoxarifado', 'IFAL & SETEQ', 'Presencial', 'Arapiraca', 80, 28, 'Treinamento prático de cadeia de suprimentos e armazenagem para o polo atacadista do Agreste.'),
    ('curso-3', 'Boas Práticas e Processamento na Indústria de Laticínios', 'SETEQ & SENAI Batalha', 'Presencial', 'Batalha', 60, 32, 'Capacitação técnica para trabalhadores e jovens produtores da Bacia Leiteira.'),
    ('curso-4', 'Hospitalidade, Atendimento e Inglês Básico para Hotelaria', 'SENAC Alagoas', 'Semipresencial', 'Maragogi', 100, 20, 'Formação para recepcionistas, garçons e guias na Costa dos Corais.')
ON CONFLICT (id) DO NOTHING;

-- 5.4 Postos SINE Alagoas
INSERT INTO public.postos_sine (id, nome, municipio, endereco, telefone, whatsapp, latitude, longitude)
VALUES
    ('sine-1', 'SINE Central Já! Maceió Shopping', 'Maceió', 'Av. Comendador Gustavo Paiva, 2990 - Mangabeiras', '(82) 3315-1875', '(82) 98833-4321', -9.6432, -35.7198),
    ('sine-2', 'SINE Central Já! Arapiraca Garden Shopping', 'Arapiraca', 'Rua José Jailson Nunes, 493 - Santa Edwiges', '(82) 3522-1234', '(82) 98833-9876', -9.7516, -36.6601),
    ('sine-3', 'SINE Penedo - Centro Histórico', 'Penedo', 'Rua Barão de Penedo, 140 - Centro', '(82) 3551-2299', '(82) 98833-5544', -10.2912, -36.5823),
    ('sine-4', 'SINE Delmiro Gouveia - Alto Sertão', 'Delmiro Gouveia', 'Av. Juscelino Kubitschek, 102 - Centro', '(82) 3641-1188', '(82) 98833-7722', -9.3881, -37.9995),
    ('sine-5', 'SINE União dos Palmares - Zona da Mata', 'União dos Palmares', 'Rua Marechal Deodoro, 88 - Centro', '(82) 3281-1900', '(82) 98833-1133', -9.1625, -36.0319)
ON CONFLICT (id) DO NOTHING;

-- 5.5 Notícias Institucionais
INSERT INTO public.noticias (id, titulo, resumo, data_publicacao, categoria)
VALUES
    ('not-1', 'SETEQ abre 450 novas vagas com foco na interiorização de oportunidades em AL', 'Iniciativa conecta postos de trabalho no Agreste, Sertão e Zona da Mata através da plataforma digital.', CURRENT_DATE, 'Empregabilidade'),
    ('not-2', 'Governo de Alagoas lança nova edição do Qualifica Alagoas com bolsas de capacitação', 'Cursos presenciais e EAD gratuitos para mais de 30 municípios com certificação reconhecida pelo MEC.', CURRENT_DATE, 'Capacitação'),
    ('not-3', 'Plataforma Empregos AL atinge 100% de cobertura nos 102 municípios alagoanos', 'Intermediação digitalizada garante inclusão produtiva para moradores do interior sem custos com transporte.', CURRENT_DATE, 'Inovação')
ON CONFLICT (id) DO NOTHING;