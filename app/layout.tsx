import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { HeaderNav } from '@/components/header-nav'
import { ScrollDepthTracker } from '@/components/scroll-depth-tracker'
import { siteConfig } from '@/lib/site-config'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.contact.siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.brand.shortName} (${siteConfig.brand.oab})`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: `${siteConfig.brand.shortName} — ${siteConfig.brand.oab}` }],
  alternates: {
    canonical: siteConfig.contact.siteUrl,
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.contact.siteUrl,
    siteName: siteConfig.brand.legalName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LegalService', 'Attorney'],
      '@id': `${siteConfig.contact.siteUrl}/#legalservice`,
      name: siteConfig.brand.legalName,
      alternateName: 'Dra. Bruna Dourado Advocacia Boutique',
      description: siteConfig.seo.description,
      url: siteConfig.contact.siteUrl,
      telephone: '+55-71-99236-3943',
      email: siteConfig.contact.email,
      image: `${siteConfig.contact.siteUrl}/images/foto-perfil.jpg`,
      priceRange: 'Sob consulta formal (Tabela OAB/BA)',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Mandiguaçun, nº 50, Piatã',
        addressLocality: 'Salvador',
        addressRegion: 'BA',
        postalCode: '41650-000',
        addressCountry: 'BR',
      },
      areaServed: [
        { '@type': 'City', name: 'Salvador' },
        { '@type': 'City', name: 'Lauro de Freitas' },
        { '@type': 'City', name: 'Camaçari' },
        { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Salvador' },
        { '@type': 'State', name: 'Bahia' },
      ],
      founder: {
        '@type': 'Person',
        name: 'Dra. Bruna Dourado da Silva',
        jobTitle: 'Advogada Titular (OAB/BA 71507)',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidade do Estado da Bahia (UNEB)',
        },
      },
      knowsAbout: [
        'Direito Trabalhista',
        'Direito Educacional Institucional B2B',
        'Direito de Família Consensual e Extrajudicial',
        'Direito do Consumidor e Patrimonial',
        'Direito Imobiliário e Inventário Extrajudicial',
        'Direito à Saúde e Planos de Saúde',
      ],
      sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Detecção Automática de Tema (Light/Dark Mode) com window.matchMedia e persistência em localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageKey = 'advdourado-theme';
                  var saved = localStorage.getItem(storageKey);
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = saved ? saved === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Schema.org LegalService / Attorney */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5CDJ5RCS');
            `,
          }}
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-00L2F10Y9W"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-00L2F10Y9W', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5CDJ5RCS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <HeaderNav />
        <ScrollDepthTracker />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
