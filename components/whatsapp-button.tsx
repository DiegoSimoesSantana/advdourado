import { MessageCircle } from 'lucide-react'
import { createWhatsAppLink } from '@/lib/site-config'

export function WhatsAppButton() {
  const whatsappLink = createWhatsAppLink(
    'Olá, vim pelo site e gostaria de iniciar o atendimento com o escritório.',
  )

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-300 group"
      aria-label="Conversar com Dra. Bruna no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  )
}
