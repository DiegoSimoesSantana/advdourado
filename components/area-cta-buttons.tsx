'use client'

import { Button } from '@/components/ui/button'
import { sendGTMEvent } from '@/lib/gtm'

type AreaCtaButtonsProps = {
  areaId: string
  areaTitle: string
  whatsappLink: string
  audioWhatsAppLink: string
  calendarUrl: string
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
  calendarUrl,
  emailLink,
}: AreaCtaButtonsProps) {
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

      <Button asChild variant="outline" className="rounded-full border-primary/20">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(areaId, areaTitle, 'meeting')}
        >
          Solicitar agendamento de reunião
        </a>
      </Button>

      <Button asChild variant="outline" className="rounded-full border-primary/20">
        <a href={emailLink} onClick={() => track(areaId, areaTitle, 'email')}>
          Enviar por e-mail
        </a>
      </Button>
    </div>
  )
}
