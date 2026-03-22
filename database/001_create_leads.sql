-- ADVDourado - tabela inicial de leads
-- Execute este script no SQL Editor do Neon antes de validar o formulario em producao.

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  area TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'site',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
