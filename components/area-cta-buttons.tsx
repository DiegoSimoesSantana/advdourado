'use client'

import { Button } from '@/components/ui/button'
import { sendGTMEvent } from '@/lib/gtm'

type AreaCtaButtonsProps = {
  areaId: string
  areaTitle: string
  whatsappLink: string
  audioWhatsAppLink: string
  emailLink: string
}

function track(areaId: string, areaTitle: string, ctaType: string) {
  sendGTMEvent('area_cta_click', {
    area_id: areaId,
    area_title: areaTitle,
    cta_type: ctaType,
    page_path: `/areas/${areaId}`,
  })
}

export function AreaCtaButtons({
  areaId,
  areaTitle,
  whatsappLink,
  audioWhatsAppLink,
  emailLink,
}: AreaCtaButtonsProps) {
  const alternativeCaseWhatsAppLink = `${whatsappLink}%0A%0AAcredito%20que%20meu%20caso%20pode%20ser%20diferente.%20Podemos%20avaliar%20uma%20estrat%C3%A9gia%20parecida%20ou%20personalizada%3F`

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(areaId, areaTitle, 'whatsapp_text')}
        >
          Falar sobre esta área no WhatsApp
        </a>
      </Button>

      <Button asChild variant="outline" className="rounded-full border-primary/20">
        <a
          href={audioWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(areaId, areaTitle, 'whatsapp_audio')}
        >
          Prefiro enviar áudio no WhatsApp
        </a>
      </Button>

      <details className="group relative">
        <summary className="list-none rounded-full border border-primary/20 px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary/50">
          Menu rápido no WhatsApp
        </summary>
        <div className="absolute left-0 top-12 z-10 min-w-[18rem] rounded-xl border border-border bg-white p-2 shadow-lg">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(areaId, areaTitle, 'whatsapp_menu_text')}
            className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-secondary"
          >
            Quero explicar por texto e já iniciar atendimento
          </a>
          <a
            href={audioWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(areaId, areaTitle, 'whatsapp_menu_audio')}
            className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-secondary"
          >
            Quero enviar áudio direto para a Doutora
          </a>
          <a
            href={alternativeCaseWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(areaId, areaTitle, 'whatsapp_menu_alternative_case')}
            className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-secondary"
          >
            Meu caso pode ser diferente, podem avaliar?
          </a>
        </div>
      </details>

      <Button asChild variant="outline" className="rounded-full border-primary/20">
        <a href={emailLink} onClick={() => track(areaId, areaTitle, 'email')}>
          Enviar por e-mail
        </a>
      </Button>
    </div>
  )
}
