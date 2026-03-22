# 🚀 ADVDourado - Pré & Pós-Deploy Checklist

**Data:** Março 2026 | **Status:** ✅ Validado para Deploy | **Versão:** 1.0

---

## 📋 Pré-Deploy Checklist - VALIDADO ✅

Todos os itens foram testados em ambiente local (`npm run dev`).

| # | Item | Status | Observação |
|---|------|--------|------------|
| 1 | Build local | ✅ OK | `npm run build` sem erros; Turbopack otimizado |
| 2 | Rotas das 10 áreas | ✅ OK | `/areas/trabalhista`, `/areas/planos-saude`, `/areas/digital` → HTTP 200 |
| 3 | Sitemap dinâmico | ✅ OK | `/sitemap.xml` inclui todas as 10 áreas + páginas principais |
| 4 | Robots.txt dinâmico | ✅ OK | `/robots.txt` aponta para `advdourado.com.br` |
| 5 | Conflito de arquivos | ✅ Corrigido | `public/sitemap.xml` e `public/robots.txt` removidos; dinâmico now |
| 6 | FAQ por área | ✅ OK | 3-5 perguntas cada uma das 10 áreas; accordion funcional |
| 7 | Artigos relacionados | ✅ OK | Mapeamento de slugs pronto; renderização testada |
| 8 | Schema.org | ✅ OK | 4 schemas injetados: LegalService, FAQPage, BreadcrumbList, LocalBusiness |
| 9 | API de contato | ✅ OK | POST `/api/contato` responde com JSON estruturado |
| 10 | Validação de form | ✅ OK | React Hook Form + Zod validando fields obrigatórios |
| 11 | Fallback WhatsApp | ✅ OK | Redireciona mesmo se banco indisponível |
| 12 | CI/CD (GitHub) | ✅ OK | `.github/workflows/ci.yml` configurado para lint + build |

**Resumo:** Todas as 12 validações passaram. Estrutura técnica pronta para produção. ✅

---

## 🚀 Runbook Pós-Deploy (Tempo estimado: 10-15 minutos)

### Fase 1: Verificar Deploy na Vercel (1-2 min)

1. Acesse **Vercel Dashboard** → seu projeto → **Deployments**
2. Confirme que o build passou (deve aparecer com badge verde ✅)
3. Se falhou, clique nele para ver logs de erro
4. Copie a URL de produção (ex: `https://advdourado.vercel.app` ou seu domínio)

### Fase 2: Configurar Banco Neon (3-5 min)

**Acessar Neon Dashboard:**
- URL: https://console.neon.tech
- Faça login com sua conta

**Executar SQL (copie e cole no SQL Editor da Neon):**

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

**Validar (execute no SQL Editor):**
```sql
SELECT COUNT(*) FROM leads;
-- Resultado esperado: 0 (tabela vazia)
```

**Obter DATABASE_URL:**
- Seu projeto Neon → **Connection Details**
- Copiar a string que começa com `postgresql://`
- Formato: `postgresql://user:password@host/database`

### Fase 3: Configurar Vercel (2-3 min)

**Acesse:** https://vercel.com → seu projeto

**Seção 1: Environment Variables (Settings → Environment Variables)**

Adicione 3 variáveis:

| Nome | Valor | Exemplo |
|------|-------|---------|
| `DATABASE_URL` | Cola string do Neon | `postgresql://user:pass@ep-xxxx.neon.tech/dbname` |
| `NEXT_PUBLIC_SITE_URL` | `https://advdourado.com.br` | Seu domínio final |
| `NEXT_PUBLIC_GA_ID` | (opcional) Google Analytics ID | `G-00L2F10Y9W` |

⚠️ **Importante:** Após adicionar `DATABASE_URL`, redeploy o projeto (Settings → Redeploy).

**Seção 2: Domínio (Settings → Domains)**

1. Clique em **Add Domain**
2. Adicione: `advdourado.com.br`
3. Vercel fornecerá instruções DNS (ex: CNAME ou registros A)
4. Vá até seu registrador de domínio (GoDaddy, Namecheap, etc.)
5. Aplique os registros DNS conforme Vercel instruir
6. Aguarde propagação (pode levar de 5min a 48h, geralmente < 1h)

### Fase 4: Redeploy se Necessário

Se adicionou `DATABASE_URL` após o push inicial:
- Vercel Dashboard → **Deployments** → Deploy (botão preto "Deploy")
- Ou: `git commit --allow-empty -m "chore: redeploy com DATABASE_URL" && git push origin main`

---

## ✅ Matriz de Testes Pós-Deploy (5-10 min)

Execute esses testes na URL de produção. Se usar domínio customizado, aguarde DNS propagar.

### Teste 1: Carregamento Básico
```
URL: https://advdourado.com.br/
Esperado:
  ✅ Página carrega sem erro
  ✅ Logo e menu visíveis
  ✅ Footer com links corretos
  ✅ Nenhum erro console (F12 → Console)
```

### Teste 2: Navegação de Áreas
```
Teste cada URL:
  ✅ /areas/trabalhista
  ✅ /areas/empresarial
  ✅ /areas/civil
  ✅ /areas/familia
  ✅ /areas/tributario
  ✅ /areas/planos-saude
  ✅ /areas/consumidor
  ✅ /areas/educacional
  ✅ /areas/digital
  ✅ /areas/inss

Esperado (cada página):
  ✅ Carrega em < 3 segundos
  ✅ FAQ accordion expande/contrai
  ✅ Artigos relacionados aparecem abaixo
  ✅ Botão "Informar caso" (WhatsApp) funciona
  ✅ Botão "Contatar" leva a /contato
```

### Teste 3: Sitemap e Robots
```
URL: /sitemap.xml
Esperado:
  ✅ XML válido (sem erro 404)
  ✅ Inclui: / , /sobre , /contato , /blog
  ✅ Inclui todas as 10 áreas: /areas/trabalhista , /areas/empresarial , etc.
  ✅ Inclui posts de blog

URL: /robots.txt
Esperado:
  ✅ Texto legível (sem erro)
  ✅ Contém: "User-Agent: *"
  ✅ Contém: "Allow: /"
  ✅ Contém: "Sitemap: https://advdourado.com.br/sitemap.xml"
```

### Teste 4: Formulário de Contato
```
URL: /contato

Preencher:
  Nome: "Teste ADVDourado"
  Email: "seu-email-pessoal@example.com"
  Telefone: "71999999999"
  Área: (selecionar uma)
  Assunto: "Teste de formulário pós-deploy"
  Mensagem: "Mensagem de teste"

Esperado:
  ✅ Botão "Enviar" ativado após preenchimento
  ✅ Clique em "Enviar"
  ✅ Toast/notificação de sucesso aparece
  ✅ Redirecionamento automático para WhatsApp (ou abre em nova aba)

Validação no banco:
  1. Neon Dashboard → SQL Editor
  2. Execute: SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;
  3. ✅ Registro aparece com seus dados
```

### Teste 5: Schema.org (Rich Results)
```
Ferramenta: https://search.google.com/test/rich-results

1. Copie URL de uma área (ex: /areas/trabalhista)
2. Cole no Google Rich Results Tester
3. Aguarde análise

Esperado:
  ✅ FAQ (com perguntas e respostas)
  ✅ BreadcrumbList (navegação)
  ✅ LocalBusiness (infos da empresa)
  ✅ LegalService (descrição de serviço)
  ✅ Nenhum erro crítico
```

### Teste 6: WhatsApp Integration
```
Clique em qualquer botão "Informar caso" ou "Entre em contato via WhatsApp"

Esperado:
  ✅ Abre WhatsApp Web ou app do telefone
  ✅ Conversa com: +55 71 99236-3943
  ✅ Mensagem pré-preenchida com: "Olá, gostaria de informações sobre [ÁREA]"
```

### Teste 7: Analytics
```
Se configurou NEXT_PUBLIC_GA_ID:

1. Acesse seu Google Analytics
2. Reporte → Tempo real
3. Acesse a URL de produção em outra janela
4. Aguarde 10-15 segundos

Esperado:
  ✅ Sessão ativa aparece em "Tempo real"
  ✅ Páginas visitadas registradas
```

---

## 📊 Teste de API (Opcional - Linha de Comando)

Se você usa PowerShell:

```powershell
$body = @{
    name = "Teste API Pos-Deploy"
    email = "teste@exemplo.com"
    phone = "71999999999"
    area = "Direito Trabalhista"
    subject = "Teste"
    message = "Mensagem de validacao"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://advdourado.com.br/api/contato" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

Esperado:
```json
{
  "ok": true,
  "lead": {
    "id": 1,
    "created_at": "2026-03-22T10:30:00.000Z"
  }
}
```

Se falhar, verifique:
1. ✅ `DATABASE_URL` foi adicionada à Vercel e redeploy foi feito
2. ✅ SQL foi executada no Neon para criar tabela
3. ✅ URL de produção está correta (com `https://`)

---

## 🎯 Post-Deploy Decisões - Próximas Fases

Após validar tudo acima, escolha a direção de evolução:

### 📝 Opção A: Conteúdo e SEO Avançado
**Tempo:** 1-2 semanas | **Impacto:** ⭐⭐⭐⭐⭐ Alto

- [ ] Criar 3-5 artigos por área de atuação (30-50 posts total)
- [ ] Expandir FAQ com 5-10 perguntas por área (em vez de 3-5)
- [ ] Configurar Google Search Console (verificação de site + sitemap submit)
- [ ] Implementar Google Analytics avançado (goals, events, KPIs)
- [ ] Otimizar meta descriptions únicas para cada página
- [ ] Estruturar blog completo com buscador e filtros por categoria

**Resultado esperado:** Melhor posicionamento Google, mais leads orgânicos.

---

### 🛠️ Opção B: Ferramentas Interativas
**Tempo:** 1-2 semanas | **Impacto:** ⭐⭐⭐⭐ Alto (diferencial)

- [ ] **Calculadora Trabalhista**: FGTS, horas extras, rescisão, aviso prévio
- [ ] **Simulador INSS**: Contribuição, aposentadoria, tempo de serviço
- [ ] **Calculadora Plano de Saúde**: Reajuste anual, comparativo de períodos
- [ ] **Avaliador Consumidor**: Prazos de troca, garantia, cancelamento

**Implementação:**
- React components com formulas matemáticas
- Resultados em real-time
- CTA "Consultar especialista" ao final

**Resultado esperado:** +40% de engajamento, diferencial competitivo.

---

### 📊 Opção C: Dashboard Administrativo
**Tempo:** 3-5 dias | **Impacto:** ⭐⭐⭐ Médio (operacional)

- [ ] Painel privado para visualizar leads em tempo real
- [ ] Filtros: por área, data, origem (formulário vs. WhatsApp)
- [ ] Tags/classificação de leads (já convertido, em negociação, etc.)
- [ ] Relatórios: conversões por fonte, taxa de resposta
- [ ] Exportar CSV para CRM/Excel
- [ ] Acesso protegido com autenticação simples (básica ou Magic Link)

**Implementação:**
- Rota protegida: `/admin/leads`
- Query Neon: `SELECT * FROM leads ORDER BY created_at DESC`
- UI simples com Radix UI

**Resultado esperado:** Gestão operacional de leads, métricas visíveis.

---

### 📚 Opção D: Migração do Blog Legado
**Tempo:** 2-3 semanas | **Impacto:** ⭐⭐⭐⭐ Alto (contenteúdo)

- [ ] Extrair artigos dos repos legados (`consumidor/`, `educacional/`)
- [ ] Classificar cada artigo por área de atuação (trabalhista, consumidor, etc.)
- [ ] Atualizar URLs amigáveis: `/blog/titulo-do-artigo`
- [ ] Migrar para banco de dados (Neon) ou arquivo JSON estruturado
- [ ] Atualizar `relatedArticleSlugs` no `site-config.ts` com artigos reais
- [ ] Implement busca de artigos (`/blog?search=termo`)

**Resultado esperado:** Mais conteúdo, melhor SEO, mais páginas indexadas.

---

## 📋 Checklist Pós-Deploy Imediato (Hoje)

```
[ ] 1. Verificar deploy na Vercel (verde ✅)
[ ] 2. Executar SQL no Neon (tabela criada)
[ ] 3. Adicionar DATABASE_URL no Vercel
[ ] 4. Redeploy automático ou manual
[ ] 5. Testar formulário e validar lead no banco
[ ] 6. Testar sitemap.xml e robots.txt
[ ] 7. Testar schema.org com Google Rich Results
[ ] 8. Validar WhatsApp links funcionando
[ ] 9. Documentar URLs de acesso (Neon, Vercel, domínio)
[ ] 10. Comunicar com Bruna que está em produção
```

---

## 🔗 Links Importantes

| Sistema | URLs | Status |
|---------|------|--------|
| **Vercel** | https://vercel.com/projects | Dashboard |
| **Neon** | https://console.neon.tech | Banco de dados |
| **Site** | https://advdourado.com.br | Produção |
| **Repo** | https://github.com/seu-user/advdourado-site | GitHub |

---

## 📞 Contato & Suporte

Se algo falhar durante o deploy:

1. **Build falha no Vercel:** Verifique logs em Deployments → voir logs
2. **Database não conecta:** Validar `DATABASE_URL` format e permissões Neon
3. **Domínio não resolve:** Aguardar propagação DNS (até 48h) ou validar CNAME
4. **Formulário retorna erro:** Verifique se SQL foi executada no Neon

---

**Próximo passo:** Defina qual opção (A, B, C ou D) deseja priorizar após o deploy validar com sucesso. Tudo está pronto para sair! 🚀
