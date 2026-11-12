import { MessageCircle } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function WhatsAppButton() {
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelo site e gostaria de iniciar o atendimento com o escritório.',
  )

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full border border-[#c5a880]/50 bg-[#121212] px-4 py-3.5 text-sm font-semibold text-[#faf9f6] shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#c5a880] hover:bg-[#1a1a1a]"
      aria-label={`Conversar com Dra. Bruna Dourado (${siteConfig.brand.oab}) no WhatsApp`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c5a880] text-[#0a0a0a]">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline pr-1">Falar com a Dra. Bruna</span>
    </a>
  )
}
