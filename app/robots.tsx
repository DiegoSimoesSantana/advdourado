import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const publicAllow = [
    '/',
    '/trabalhista',
    '/educacional',
    '/familia',
    '/consumidor',
    '/imobiliario',
    '/saude',
    '/sobre',
    '/blog',
    '/contato',
    '/llms.txt',
  ]
  const privateDisallow = ['/admin', '/admin/', '/api/', '/.env', '/.git/']

  return {
    rules: [
      {
        userAgent: '*',
        allow: publicAllow,
        disallow: privateDisallow,
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
        ],
        allow: publicAllow,
        disallow: privateDisallow,
      },
    ],
    host: siteConfig.contact.siteUrl,
    sitemap: `${siteConfig.contact.siteUrl}/sitemap.xml`,
  }
}
