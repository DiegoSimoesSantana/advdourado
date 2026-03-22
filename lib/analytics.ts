export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      conversion_type: conversionType,
      value: value || 0,
    })
  }
}

export const trackWhatsAppClick = (source: string, articleSlug?: string) => {
  trackEvent('whatsapp_click', {
    source,
    article_slug: articleSlug,
    timestamp: new Date().toISOString(),
  })
}

export const trackArticleView = (slug: string, title: string, category: string, readTime: number) => {
  trackEvent('article_view', {
    article_slug: slug,
    article_title: title,
    category,
    read_time: readTime,
    timestamp: new Date().toISOString(),
  })
}

export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submission', {
    form_type: formType,
    timestamp: new Date().toISOString(),
  })
}

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent('search_query', {
    search_term: query,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  })
}
