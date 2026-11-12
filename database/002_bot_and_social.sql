-- ADVDourado - Migração 002: Base de Conhecimento do Bot, Leads WhatsApp e Posts Sociais
-- Execute este script no SQL Editor do Neon ou deixe que a aplicação inicialize automaticamente.

-- 1. Tabela de Conhecimento Aprendido do Bot (Cache e Inteligência Contínua)
CREATE TABLE IF NOT EXISTS bot_knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'geral', -- 'saudacao', 'trabalhista', 'civel', 'consumidor', 'pessoal', 'parceiros', 'geral'
  pattern_question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  usage_count INTEGER NOT NULL DEFAULT 1,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bot_knowledge_category ON bot_knowledge_base (category);
CREATE INDEX IF NOT EXISTS idx_bot_knowledge_usage ON bot_knowledge_base (usage_count DESC);

-- 2. Tabela de Leads e Atendimentos do WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_leads (
  id BIGSERIAL PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  name TEXT,
  city TEXT,
  state TEXT,
  area TEXT, -- 'trabalhista', 'civel', 'consumidor', 'parceiro_criminal', 'outro'
  subject TEXT,
  status TEXT NOT NULL DEFAULT 'novo', -- 'novo', 'em_triagem', 'qualificado', 'pessoal', 'encaminhado_bruna', 'descartado'
  conversation_step TEXT NOT NULL DEFAULT 'inicio',
  notes TEXT,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_test_mode BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_phone ON whatsapp_leads (phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_status ON whatsapp_leads (status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_updated_at ON whatsapp_leads (updated_at DESC);

-- 3. Tabela de Posts de Redes Sociais Salvos
CREATE TABLE IF NOT EXISTS social_posts (
  id BIGSERIAL PRIMARY KEY,
  post_type TEXT NOT NULL DEFAULT 'texto', -- 'texto', 'imagem', 'video'
  title TEXT,
  caption TEXT NOT NULL,
  caption_linkedin TEXT,
  caption_instagram TEXT,
  caption_facebook TEXT,
  caption_whatsapp TEXT,
  media_url TEXT,
  media_type TEXT,
  target_networks TEXT[] DEFAULT ARRAY['linkedin', 'instagram', 'facebook', 'whatsapp'],
  status TEXT NOT NULL DEFAULT 'rascunho', -- 'rascunho', 'publicado', 'agendado'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_posts_created_at ON social_posts (created_at DESC);

-- Inserir regras iniciais aprendidas no bot_knowledge_base se vazia
INSERT INTO bot_knowledge_base (category, pattern_question, answer, keywords)
SELECT 'pessoal', 'assunto pessoal', 'Em breve, Bruna vai te dar uma resposta.', ARRAY['pessoal', 'amigo', 'familia', 'particular']
WHERE NOT EXISTS (SELECT 1 FROM bot_knowledge_base WHERE category = 'pessoal' LIMIT 1);

INSERT INTO bot_knowledge_base (category, pattern_question, answer, keywords)
SELECT 'saudacao', 'oi ola bom dia boa tarde boa noite', 'Olá! Sou o assistente do escritório da Dra. Bruna Dourado. Para direcionar seu atendimento: de qual cidade e estado você fala? O seu contato é para um assunto Profissional/Jurídico ou Pessoal?', ARRAY['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'inicio']
WHERE NOT EXISTS (SELECT 1 FROM bot_knowledge_base WHERE pattern_question ILIKE '%saudacao%' LIMIT 1);
