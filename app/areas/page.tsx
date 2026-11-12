import type { Metadata } from 'next'
import { ServicesSection } from '@/components/services-section'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Eixos de Atuação Jurídica em Salvador/BA',
  description:
    'Conheça os 6 eixos de atuação da Dra. Bruna Dourado (OAB/BA 71507) em Salvador e Região Metropolitana: Trabalhista, Educacional B2B, Família Consensual, Consumidor Patrimonial, Imóveis/Inventário e Planos de Saúde.',
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/areas`,
  },
}

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-background">
      <ServicesSection />
      <ContactFooterSection />
      <WhatsAppButton />
    </main>
  )
}
