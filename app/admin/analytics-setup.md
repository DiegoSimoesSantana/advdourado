# Configuração do Google Analytics - Checklist de Setup

## Passo 1: Criar Property no Google Analytics

1. Acesse: https://analytics.google.com
2. Crie nova Property: "Bruna Dourado - Advocacia"
3. URL: https://brunadourado.com.br
4. Copie o **Google Tag Manager ID** (formato: G-XXXXXXXXXX)

## Passo 2: Atualizar Código

Substitua `G-XXXXXXXXXX` nos seguintes arquivos:

### app/layout.tsx
\`\`\`tsx
src="https://www.googletagmanager.com/gtag/js?id=G-SEU-ID-AQUI"
gtag('config', 'G-SEU-ID-AQUI', {
\`\`\`

## Passo 3: Eventos Rastreados

O site rastreia automaticamente:

- `whatsapp_click` - Cliques em WhatsApp (source + article)
- `article_view` - Visualizações de artigos
- `blog_search` - Buscas no blog
- `blog_category_filter` - Filtros de categoria
- `form_submission` - Envios de formulário
- `page_view` - Visualizações de página
- `conversion` - Conversões (tipo + valor)

## Passo 4: Verificar Funcionamento

1. Acesse o site em desenvolvimento
2. Abra DevTools (F12)
3. Vá para Network → XHR
4. Clique em WhatsApp ou artigo
5. Procure por `google-analytics` ou `gtag`
6. Se encontrar `POST` com status 200, está funcionando!

## Passo 5: Verificar em Produção

Após deploy:
1. Acesse https://brunadourado.com.br
2. Abra Google Analytics
3. Vá em Relatório em Tempo Real
4. Verifique se há usuários/eventos

## Conversões Esperadas (Primeiro Mês)

- WhatsApp clicks: 20-50
- Article views: 100-200
- Blog searches: 10-30
- Category filters: 5-20

---

## URLs para Monitorar

- Homepage: / (valor conversão: índice de entry)
- Blog Page: /blog (valor: engajamento)
- Artigos (13): /blog/[slug] (valor: tempo no site)
- WhatsApp CTA: tracking automático

---

## Dúvidas?

Consulte: https://support.google.com/analytics/answer/1008015
