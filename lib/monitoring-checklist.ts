export const monitoringChecklist = {
  immediateChecks: {
    title: 'Verificações Imediatas (Primeira Hora Após Deploy)',
    items: [
      '1. Site carrega em < 3 segundos',
      '2. WhatsApp button aparece (bottom-right)',
      '3. Todas as imagens carregam',
      '4. Responsive em mobile (teste em celular real)',
      '5. Hero section renderiza corretamente',
      '6. Blog page acessível (/blog)',
      '7. Artigos aparecem na listagem',
      '8. Busca funciona',
      '9. Filtros de categoria funcionam',
      '10. Links internos funcionam (breadcrumb)',
    ]
  },

  dailyChecks: {
    title: 'Verificações Diárias (Primeira Semana)',
    items: [
      '1. Google Analytics recebendo dados em tempo real',
      '2. Sem erros de console (DevTools → Console)',
      '3. WhatsApp CTAs sendo clicados',
      '4. Verificar Core Web Vitals em PageSpeed Insights',
      '5. Monitorar erros 404 (search-console)',
      '6. Verificar status de saúde em Vercel dashboard',
      '7. Confirmar HTTPS ativo',
      '8. Testar em diferentes navegadores',
      '9. Verificar meta tags (DevTools → Network → documento)',
      '10. Confirmar favicon aparecendo',
    ]
  },

  weeklyChecks: {
    title: 'Verificações Semanais',
    items: [
      '1. Analisar padrões de tráfego no Analytics',
      '2. Identificar páginas mais visitadas',
      '3. Verificar fonte de tráfego (organic, direct, referral)',
      '4. Analisar comportamento de usuários (scroll depth)',
      '5. Verificar taxa de conversão (WhatsApp clicks / visits)',
      '6. Confirmar rankings de keywords no Search Console',
      '7. Revisar relatório de erros',
      '8. Testar performance em diferentes devices',
      '9. Verificar backup automático',
      '10. Análise de comentários/feedback de clientes',
    ]
  },

  monthlyChecks: {
    title: 'Verificações Mensais',
    items: [
      '1. Análise completa de performance',
      '2. Identificar oportunidades de otimização',
      '3. Planejar novo conteúdo baseado em dados',
      '4. A/B testing de headlines/CTAs',
      '5. Atualizar conteúdo desatualizado',
      '6. Monitorar concorrentes',
      '7. Verificar atualizações de segurança',
      '8. Revisar infraestrutura (CDN, cache)',
      '9. Análise ROI de campanhas',
      '10. Feedback de usuários e melhorias UX',
    ]
  },

  keyMetricsToTrack: {
    title: 'Métricas Principais a Monitorar',
    metrics: [
      {
        name: 'Page Views',
        target: '500+ no mês 1',
        description: 'Total de visualizações de página'
      },
      {
        name: 'Unique Visitors',
        target: '100+ no mês 1',
        description: 'Usuários únicos'
      },
      {
        name: 'Bounce Rate',
        target: '< 60%',
        description: 'Taxa de rejeição (quanto menor melhor)'
      },
      {
        name: 'Avg Session Duration',
        target: '> 2 min',
        description: 'Tempo médio de sessão'
      },
      {
        name: 'Conversion Rate (WhatsApp Clicks)',
        target: '> 2%',
        description: '(Cliques em WhatsApp / Total Visits)'
      },
      {
        name: 'Core Web Vitals',
        target: 'All GREEN',
        description: 'LCP < 2.5s, FID < 100ms, CLS < 0.1'
      },
      {
        name: 'Organic Traffic',
        target: '50%+ após 3 meses',
        description: 'Tráfego vindo de buscas (Google)'
      },
      {
        name: 'Mobile Traffic',
        target: '60%+',
        description: 'Visitantes em mobile'
      },
    ]
  },

  alertsToSetup: {
    title: 'Alertas a Configurar no Google Analytics',
    alerts: [
      '1. Tráfego 50% abaixo da média (erro possível)',
      '2. Taxa de bounce acima de 80% (conteúdo fraco)',
      '3. Tempo de sessão muito baixo (< 30 seg)',
      '4. Sem dados por > 4 horas (tracking down)',
      '5. Spike de 200%+ (bom! investigar o quê gerou)',
    ]
  }
}

export const healthCheckScript = `
# Script para verificar saúde do site
# Execute com: bash health-check.sh

#!/bin/bash

URL="https://brunadourado.com.br"

echo "====== HEALTH CHECK - Bruna Dourado ======"
echo "URL: $URL"
echo ""

# Teste 1: HTTP Status
echo "1. HTTP Status:"
curl -s -o /dev/null -w "Status: %{http_code}\\n" $URL

# Teste 2: Tempo de resposta
echo "2. Tempo de Resposta (segundos):"
curl -s -o /dev/null -w "Time: %{time_total}\\n" $URL

# Teste 3: Tamanho da página
echo "3. Tamanho da Página:"
curl -s $URL | wc -c

# Teste 4: Verificar HTTPS
echo "4. HTTPS:"
curl -s -I $URL | grep -i "https"

# Teste 5: Verificar Headers importantes
echo "5. Headers Importantes:"
curl -s -I $URL | grep -i "cache-control\\|content-type\\|x-frame"

echo ""
echo "====== FIM DO CHECK ======"
`
}
