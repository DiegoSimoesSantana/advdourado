# Guia Técnico Cloudflare (WAF, Cache, Bot Fight Mode e 301) & Parecer de Conformidade OAB

## Parte 1 — Regras de Infraestrutura e Segurança no Cloudflare (`advdourado.com.br`)

Além da defesa em profundidade já configurada no código (`middleware.ts` e `next.config.mjs`), aplique as configurações abaixo diretamente no painel do **Cloudflare** do domínio `advdourado.com.br`:

### 1.1. Bloqueio de Arquivos Sensíveis (Cloudflare WAF Custom Rule)
No painel do Cloudflare, acesse **Security > WAF > Custom rules > Create rule**:
- **Rule name:** `Bloquear Arquivos Sensiveis (.env, .git, package.json, composer.json)`
- **Clique em "Edit expression"** e cole exatamente:
```txt
(http.request.uri.path contains "/.env") or
(http.request.uri.path contains "/.git") or
(lower(http.request.uri.path) eq "/package.json") or
(lower(http.request.uri.path) eq "/package-lock.json") or
(lower(http.request.uri.path) eq "/pnpm-lock.yaml") or
(lower(http.request.uri.path) eq "/composer.json") or
(lower(http.request.uri.path) eq "/composer.lock")
```
- **Then take action:** `Block`

### 1.2. Otimização de Cache na Borda (Cloudflare Cache Rules)
Para elevar a taxa de acerto de cache (que estava em ~1,53%) e acelerar o carregamento de ativos estáticos:
Acesse **Caching > Cache Rules > Create rule**:
- **Rule name:** `Cache Estatico agressivo (Assets, Imagens, Fontes, Next Static)`
- **Clique em "Edit expression"** e cole:
```txt
(starts_with(http.request.uri.path, "/_next/static/")) or
(starts_with(http.request.uri.path, "/images/")) or
(http.request.uri.path.extension in {"css" "js" "jpg" "jpeg" "png" "webp" "avif" "svg" "ico" "woff" "woff2" "ttf"})
```
- **Cache eligibility:** `Eligible for cache`
- **Edge TTL:** `Override origin` -> `1 month` (ou `1 year` para `/_next/static/`)
- **Browser TTL:** `Respect origin TTL`

### 1.3. Filtro de Tráfego Automatizado (Bot Fight Mode)
1. Acesse **Security > Bots** no painel do Cloudflare.
2. Ative a chave **Bot Fight Mode: ON** para conter varreduras automatizadas internacionais (como bots de scan originados nos EUA) e preservar as métricas reais de acesso de clientes no Brasil.
3. *(Opcional — WAF Managed Challenge para países fora do Brasil caso haja ataque de força bruta, preservando IAs e Buscadores)*:
```txt
(ip.geoip.country ne "BR" and not cf.client.bot and not http.user_agent contains "GPTBot" and not http.user_agent contains "ClaudeBot" and not http.user_agent contains "PerplexityBot" and not http.user_agent contains "Google")
```

### 1.4. Redirecionamento 301 dos Subdomínios Antigos (`trabalhista.` e `consumidor.`)
No painel do Cloudflare:
1. Em **DNS > Records**, certifique-se de que `trabalhista` e `consumidor` possuem registro `CNAME` ou `A` com a **nuvem laranja ativada (Proxied)**.
2. Acesse **Rules > Redirect Rules > Create rule**:
   - **Regra 1 (`Subdominio Trabalhista -> /trabalhista`):**
     - Expression: `(http.host eq "trabalhista.advdourado.com.br")`
     - Type: `Static` | URL: `https://advdourado.com.br/trabalhista` | Status code: `301`
   - **Regra 2 (`Subdominio Consumidor -> /consumidor`):**
     - Expression: `(http.host eq "consumidor.advdourado.com.br")`
     - Type: `Static` | URL: `https://advdourado.com.br/consumidor` | Status code: `301`

---

## Parte 2 — Validação das Estratégias de Captação perante a OAB (Provimento nº 205/2021 CFOAB)

Abaixo apresentamos a validação jurídica e deontológica de cada estratégia de captação implementada no ecossistema da **Dra. Bruna Dourado (OAB/BA 71507)**, confrontando o código e o funil com o **Estatuto da Advocacia (Lei nº 8.906/94)**, o **Código de Ética e Disciplina (CED)** e o **Provimento nº 205/2021 do Conselho Federal da OAB**.

| Estratégia Implementada no Site | Status OAB | Fundamentação Legal (Provimento 205/2021 e CED) | Como foi blindada na refatoração |
| :--- | :---: | :--- | :--- |
| **1. Posicionamento "Atendimento Direto com a Doutora (Sem Robôs)"** | **PERMITIDO** | Art. 3º, § 2º do Prov. 205/2021 e Art. 44 do CED | Identificação ostensiva do nome completo e inscrição (**Dra. Bruna Dourado — OAB/BA 71507**) e transparência sobre o atendimento e condução jurídica direta no escritório da Dra. Bruna Dourado, sem induzir o cliente a erro. |
| **2. Cards "Conhecer Eixo" substituindo Calculadoras/Diagnósticos Automáticos** | **PERMITIDO E RECOMENDADO** | Art. 4º e Anexo Único do Prov. 205/2021 | Calculadoras que prometem "valor a receber" podem ser interpretadas pelos Tribunais de Ética (TED/OAB) como mercantilização ou consulta simulada automática. A navegação por eixos informativos ("Conhecer Eixo") é 100% ética e educativa. |
| **3. Formulário Compilador de Relatório para WhatsApp + Botão de Áudio** | **PERMITIDO** | Anexo Único do Prov. 205/2021 (Redes Sociais, WhatsApp e Sites) | O Provimento 205/2021 autoriza expressamente o uso de formulários de contato e botões de WhatsApp para que o interessado inicie o atendimento por iniciativa própria (publicidade passiva/receptiva). O botão de áudio humaniza a acessibilidade sem configurar captação indevida. |
| **4. SEO Local (Salvador/BA), `sitemap.xml`, `robots.txt` e `/llms.txt`** | **PERMITIDO** | Art. 2º, III e IV e Anexo Único do Prov. 205/2021 | A indexação orgânica em buscadores (Google/Bing) e motores de resposta de IA (ChatGPT, Claude, Perplexity, Gemini) por meio de conteúdo técnico e estruturado (`Schema.org` + `llms.txt`) é plenamente lícita, desde que o texto seja sóbrio e informativo. |
| **5. Divulgação de Credenciais Acadêmicas e Docência (Pós-Graduação + Filosofia/Sociologia)** | **PERMITIDO** | Art. 44 do CED e Art. 3º, § 2º do Prov. 205/2021 | Títulos reais (Advogada OAB/BA 71507, Pós-Graduada em Direito e Processo do Trabalho) e atuação como docente de Filosofia e Sociologia em instituições tradicionais de Salvador/BA podem e devem ser destacados como diferenciais técnicos e humanísticos, substituindo contagens genéricas de anos. |
| **6. Remoção de "Consulta Gratuita", "Pare de perder dinheiro" e "Recuperação média: R$ X"** | **OBRIGATÓRIO (Saneado)** | Art. 3º, § 1º e Art. 6º do Prov. 205/2021; Arts. 39 a 41 do CED | A OAB proíbe terminantemente: (a) oferta de consulta/análise gratuita como isca comercial; (b) promessa de resultado ou divulgação de médias financeiras de ganho; (c) frases imperativas mercantilistas ou gatilhos de escassez ("apenas 10 vagas"). Todos esses itens foram erradicados das páginas e do blog. |
| **7. Disclaimers de Caráter Educativo, Ausência de Vínculo Automático, Sigilo (Art. 34) e LGPD** | **PERMITIDO E PROTETIVO** | Art. 34, VII da Lei 8.906/94; Lei 13.709/2018 (LGPD); Art. 4º Prov. 205/2021 | Presentes em todos os formulários e no rodapé, protegendo juridicamente o escritório contra alegações de consultoria informal e reforçando a confiança do cliente no sigilo profissional. |

### O que a Dra. Bruna PODE fazer na operação diária de captação (Permitido pelo Provimento 205/2021):
1. **Google Ads (Rede de Pesquisa) e Patrocínio no Instagram/LinkedIn:** O Provimento 205/2021 (Art. 5º e Anexo Único) **permite o impulsionamento e patrocínio de anúncios** direcionando para as 6 páginas internas (`/trabalhista`, `/educacional`, `/familia`, `/consumidor`, `/imobiliario`, `/saude`), **desde que** o texto do anúncio seja informativo/institucional (ex.: *"Assessoria em Direito Trabalhista em Salvador/BA — Dra. Bruna Dourado (OAB/BA 71507). Conheça direitos, deveres e prazos legais"*) e não utilize frases comerciais apelativas (*"Fale agora e recupere seu dinheiro"*).
2. **Prospecção B2B Ética no Direito Educacional (`/educacional`) e Trabalhista Preventivo (`/trabalhista`):** A advogada pode produzir cartilhas informativas, ministrar palestras/workshops em sindicatos patronais, eventos educacionais e instituições de ensino (Art. 7º do Prov. 205/2021), utilizando a página `/educacional` como ponto focal de autoridade institucional.
3. **Compartilhamento de Links no WhatsApp com Cartão OpenGraph:** Ao enviar os links `advdourado.com.br/trabalhista`, `advdourado.com.br/saude`, etc., o cartão visual sóbrio com o nome e número da OAB/BA 71507 cumpre integralmente o dever de identificação profissional (Art. 44 do CED).

