import type { Metadata } from 'next'
import LinksPageContent from './links-page-content'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Canais de Atendimento | Dra. Bruna Dourado`,
  description: `Links oficiais de contato e agendamento para atendimento jurídico com a Dra. Bruna Dourado. Fale diretamente no WhatsApp ou consulte nosso site oficial.`,
  openGraph: {
    title: `Canais de Atendimento | Dra. Bruna Dourado`,
    description: `Links oficiais de contato e agendamento para atendimento jurídico com a Dra. Bruna Dourado. Fale diretamente no WhatsApp ou consulte nosso site oficial.`,
    url: `${siteConfig.contact.siteUrl}/links`,
    type: 'website',
  },
}

export default function LinksPage() {
  return <LinksPageContent />
}
