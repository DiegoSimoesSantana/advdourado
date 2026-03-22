import type { Metadata } from 'next'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Contato | ${siteConfig.brand.name}`,
  description: 'Entre em contato com a ADVDourado para triagem inicial e agendamento de consulta jurídica.',
}

export default function ContatoPage() {
  return <ContactFooterSection />
}
