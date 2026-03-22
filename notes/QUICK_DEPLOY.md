# ⚡ Quick Deploy Guide - ADVDourado

**Status:** ✅ Pronto para deploy | **Tempo:** ~15 minutos

---

## 1️⃣ Push para GitHub

```bash
cd c:\Projetos\advdourado
git add .
git commit -m "chore: pre-deploy validation complete; all 10 areas with FAQ and schema"
git push origin main
```

✅ **O que acontece:** GitHub Actions CI roda automaticamente (lint + build)

---

## 2️⃣ Vercel Deploy (Auto)

- Acesse https://vercel.com
- Seu projeto fará deploy automático após push
- Aguarde badge verde ✅ na aba **Deployments**

---

## 3️⃣ Configurar Banco Neon (5 min)

### 3.1. Criar/Selecionar Projeto
- https://console.neon.tech
- Crie novo projeto ou acesse existente

### 3.2. Executar SQL
Copie e cole no **SQL Editor** (canto direito do Neon Dashboard):

```sql
CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    area TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'site',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
```

### 3.3. Copiar CONNECTION STRING
- Neon Dashboard → **Connection Details** → PostgreSQL
- Copiar string que começa com `postgresql://`

---

## 4️⃣ Configurar Vercel (5 min)

### 4.1. Environment Variables
- Vercel Dashboard → seu projeto → **Settings → Environment Variables**

Adicione:

```
DATABASE_URL = [cola a string do Neon aqui]
NEXT_PUBLIC_SITE_URL = https://advdourado.com.br
NEXT_PUBLIC_GA_ID = G-00L2F10Y9W (opcional)
```

### 4.2. Redeploy
- Clique **Redeploy** para aplicar as variáveis
- Aguarde nova build passar ✅

### 4.3. Domínio (Optional - Se tiver domínio próprio)
- Settings → **Domains**
- Adicione: `advdourado.com.br`
- Siga instruções DNS do Vercel (CNAME/registros A)

---

## 5️⃣ Testar (2 min)

### ✅ Teste Rápido 1: Carregamento
```
URL: https://advdourado.com.br
Esperado: Página carrega, menu funciona
```

### ✅ Teste Rápido 2: Formulário
```
URL: https://advdourado.com.br/contato
1. Preencha: Nome, Email, Telefone, Área, Assunto, Mensagem
2. Clique "Enviar"
3. Esperado: Toast "Sucesso" + abre WhatsApp
```

### ✅ Teste Rápido 3: Validar no Banco
```sql
-- Neon SQL Editor
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;
-- Esperado: Seu lead de teste aparece
```

### ✅ Teste Rápido 4: URL Validation
```
/areas/trabalhista       → HTTP 200
/areas/planos-saude      → HTTP 200
/sitemap.xml             → HTTP 200 (com todas as 10 áreas)
/robots.txt              → HTTP 200 (aponta para advdourado.com.br)
```

---

## 🎯 Próximas Fases (Após validar tudo ✅)

Escolha uma opção para evoluir:

| Opção | Foco | Tempo | Impacto |
|-------|------|-------|---------|
| **A** | Conteúdo & SEO (30-50 artigos) | 1-2 sem | ⭐⭐⭐⭐⭐ |
| **B** | Calculadoras Interativas | 1-2 sem | ⭐⭐⭐⭐ |
| **C** | Dashboard de Leads | 3-5 dias | ⭐⭐⭐ |
| **D** | Migrar Blog Legado | 2-3 sem | ⭐⭐⭐⭐ |

👉 **Veja detalhes em:** `notes/PRE_POS_DEPLOY_CHECKLIST.md`

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Build falha em Vercel | Clique no deploy → ver logs de erro |
| Formulário retorna erro | Verificar se `DATABASE_URL` foi adicionada + redeploy |
| Domínio não resolve | Aguardar propagação DNS (até 48h) |
| Sitemap vazio | Validar que `public/sitemap.xml` foi deletado (deve ser dinâmico) |

---

## 📞 Recursos

- **Documentação completa:** `notes/PRE_POS_DEPLOY_CHECKLIST.md`
- **Deploy guide detalhado:** `notes/DEPLOY_GITHUB_VERCEL.md`
- **Site config:** `lib/site-config.ts` (10 áreas, FAQ, artigos relacionados)
- **Database schema:** `database/001_create_leads.sql`

---

**Tudo pronto! 🚀 Vamos fazer o deploy?**
