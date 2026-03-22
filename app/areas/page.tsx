import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: `Áreas de Atuação | ${siteConfig.brand.name}`,
  description: 'Conheça as especialidades da ADVDourado e encontre a área jurídica mais adequada para sua demanda.',
  openGraph: {
    title: `Áreas de Atuação | ${siteConfig.brand.name}`,
    description: 'Conheça as especialidades da ADVDourado e encontre a área jurídica mais adequada para sua demanda.',
    url: `${siteConfig.contact.siteUrl}/areas`,
    type: 'website',
  },
}

export default function AreasPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_areas_page')
    }
  }, [])

  // JSON-LD LegalService para SEO institucional
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.brand.legalName,
    description: 'Especialidades jurídicas da ADVDourado',
    url: `${siteConfig.contact.siteUrl}/areas`,
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Salvador',
      addressRegion: 'BA',
      addressCountry: 'BR',
    },
  }

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      <div className="mx-auto max-w-6xl animate-fadein">
        <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Especialidades</p>
        <h1 className="mt-3 text-4xl font-serif text-foreground md:text-5xl animate-slideup">Áreas de atuação da ADVDourado</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/75 animate-fadein delay-100">
          Selecione a área com maior proximidade com sua demanda. A equipe fará a triagem inicial e direcionará o atendimento técnico adequado.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.areas.map((area, idx) => (
            <Card
              key={area.id}
              className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg animate-fadein"
              style={{ animationDelay: `${150 + idx * 60}ms` }}
            >
              <h2 className="text-2xl text-foreground font-serif">{area.title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{area.summary}</p>
              <Link href={`/areas/${area.id}`} className="mt-5 inline-block">
                <Button variant="outline" className="font-semibold text-primary border-primary hover:bg-primary/10 transition-colors duration-200">
                  Acessar área
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 animate-fadein delay-200">
          <span className="text-base text-foreground/80">Não encontrou sua demanda?</span>
          <Link href="/contato">
            <Button size="lg" className="bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-200">
              Fale com a equipe jurídica
            </Button>
          </Link>
        </div>

        <footer className="mt-20 text-xs text-center text-foreground/50 animate-fadein delay-300">
          {siteConfig.brand.legalName} | OAB {siteConfig.brand.oab} | {siteConfig.contact.address}
        </footer>
      </div>
    </main>
  )
}
