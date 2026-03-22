# Deploy via GitHub + Vercel (ADVDourado)

## 1) Preparar localmente
1. Na raiz do projeto, garanta que build passa:
   - `npm run build`
2. Garanta que o arquivo `.env.local` nao sera commitado (ja esta coberto por `.gitignore`).
3. Copie o template de ambiente:
   - `copy .env.local.example .env.local`
4. Preencha `DATABASE_URL` com a string do Neon e demais variaveis opcionais.

## 2) Criar repositorio no GitHub
1. No GitHub, crie um repositorio novo (exemplo: `advdourado-site`).
2. No terminal da raiz:
   - `git init`
   - `git add .`
   - `git commit -m "chore: base unificada pronta para deploy"`
   - `git branch -M main`
   - `git remote add origin https://github.com/SEU-USUARIO/advdourado-site.git`
   - `git push -u origin main`

## 2.1) Ativar CI no GitHub
1. O workflow ja esta versionado em `.github/workflows/ci.yml`.
2. Ao abrir PR ou fazer push na `main`, o GitHub executa:
   - `npm install --legacy-peer-deps`
   - `npm run lint`
   - `npm run build`
3. Recomenda-se proteger a branch `main` exigindo CI verde antes de merge.

## 3) Importar no Vercel
1. Acesse https://vercel.com/new
2. Selecione o repositorio `advdourado-site`.
3. Framework: Next.js (detectado automaticamente).
4. Root Directory: `./` (raiz).
5. Build Command: `npm run build`.
6. Install Command: `npm install --legacy-peer-deps`.
7. Deploy.

## 4) Configurar variaveis de ambiente no Vercel
1. Dentro do projeto na Vercel: `Settings` > `Environment Variables`.
2. Crie as variaveis:
   - `DATABASE_URL` = string do Neon
   - `NEXT_PUBLIC_SITE_URL` = dominio final (exemplo: `https://advdourado.com.br`)
   - `NEXT_PUBLIC_GA_ID` = opcional
3. Aplique para `Production`, `Preview` e `Development` (quando fizer sentido).
4. Clique em `Redeploy` na ultima build para aplicar novas variaveis.

## 4.1) Inicializar tabela de leads no Neon
1. Acesse o SQL Editor do Neon.
2. Execute o script `database/001_create_leads.sql`.
3. Confirme a criacao com:
   - `SELECT COUNT(*) FROM leads;`

## 5) Conectar dominio
1. `Settings` > `Domains`.
2. Adicione `advdourado.com.br` e `www.advdourado.com.br`.
3. Siga as instrucoes de DNS no seu provedor.
4. Aguarde validacao SSL automatica.

## 6) Validacoes pos-deploy
1. Acesse home, areas, sobre e contato.
2. Envie formulario e confira no Neon se um registro foi criado em `leads`.
3. Teste CTA de WhatsApp.
4. Verifique `https://SEU-DOMINIO/sitemap.xml` e `https://SEU-DOMINIO/robots.txt`.

## 7) Fluxo de publicacao continua
1. Toda alteracao em `main` gera novo deploy automatico na Vercel.
2. Recomenda-se fluxo por branch + Pull Request para revisar mudancas.

## Observacao importante
- Se `npm install` falhar em ambiente local por peer dependencies, use `npm install --legacy-peer-deps`.
