export const deploymentChecklist = {
  preDeployment: [
    {
      category: 'Environment Variables',
      tasks: [
        '[ ] Google Analytics ID configurado (G-XXXXXXXXXX)',
        '[ ] WhatsApp número atualizado (55 11 XXXXXXXXX)',
        '[ ] Domain name configurado',
        '[ ] Email para contato confirmado',
      ]
    },
    {
      category: 'Code Quality',
      tasks: [
        '[ ] Sem console.log de debug',
        '[ ] TypeScript compilation sem erros',
        '[ ] Build production passou',
        '[ ] Links internos funcionando',
        '[ ] Imagens otimizadas',
      ]
    },
    {
      category: 'SEO & Meta',
      tasks: [
        '[ ] Sitemap.xml acessível',
        '[ ] Robots.txt correto',
        '[ ] Meta tags preenchidas',
        '[ ] OG tags testadas',
        '[ ] Favicon configurado',
      ]
    },
    {
      category: 'Performance',
      tasks: [
        '[ ] Core Web Vitals otimizados',
        '[ ] Imagens com lazy loading',
        '[ ] CSS minified',
        '[ ] JS bundled corretamente',
        '[ ] Caching headers configurados',
      ]
    },
  ],

  deploymentSteps: [
    '1. Commit final no Git',
    '2. Push para branch main',
    '3. Vercel auto-deploy ativa',
    '4. Aguardar build (2-5 min)',
    '5. Verificar deploy em vercel.com/dashboard',
    '6. Testar site em produção',
  ],

  postDeployment: [
    {
      category: 'Verificação Imediata',
      tasks: [
        '[ ] Site carrega em < 3s',
        '[ ] WhatsApp links funcionam',
        '[ ] Formulário de contato funciona',
        '[ ] Imagens carregam corretamente',
        '[ ] Mobile responsivo (testar em celular)',
      ]
    },
    {
      category: 'Analytics Setup',
      tasks: [
        '[ ] Google Analytics conectado',
        '[ ] Verificar em Real Time',
        '[ ] Submeter sitemap ao Google Search Console',
        '[ ] Verificar Google Tag Manager',
        '[ ] Setup de alertas de erro',
      ]
    },
    {
      category: 'Monitoramento Contínuo',
      tasks: [
        '[ ] Verificar analytics diariamente (Week 1)',
        '[ ] Monitorar Core Web Vitals',
        '[ ] Rastrear erros em Sentry (opcional)',
        '[ ] Backup de dados',
        '[ ] Update de conteúdo (new articles)',
      ]
    },
  ],

  expectedMetrics: {
    weekOne: {
      pageViews: '50-200',
      users: '10-50',
      whatsappClicks: '2-10',
      bounceRate: '50-80%',
      avgSessionDuration: '1-3 min',
    },
    monthOne: {
      pageViews: '500-2000',
      users: '100-500',
      whatsappClicks: '20-100',
      bounceRate: '40-60%',
      avgSessionDuration: '2-5 min',
      conversionRate: '2-5%',
    }
  }
}
