import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { HeaderNav } from '@/components/header-nav'
import { ScrollDepthTracker } from '@/components/scroll-depth-tracker'
import { siteConfig } from '@/lib/site-config'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.contact.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  generator: 'v0.app',
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.contact.siteUrl,
    siteName: siteConfig.brand.legalName,
    locale: 'pt_BR',
    type: 'website',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
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
        {/* Google Analytics (mantido) */}
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
        {/* Fontes premium */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <style>{`
          body, .font-sans { font-family: 'Inter', sans-serif; }
          h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        `}</style>
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CDJ5RCS"
                  height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        <HeaderNav />
        <ScrollDepthTracker />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
