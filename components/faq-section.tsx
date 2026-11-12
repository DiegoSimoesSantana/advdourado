'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Tenho uma dúvida sobre o atendimento jurídico e gostaria de orientação inicial.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Prefiro enviar uma mensagem de áudio no WhatsApp para explicar minha dúvida.',
  )

  return (
    <section className="border-b border-border bg-background px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Perguntas Frequentes
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Dúvidas sobre a triagem e o atendimento da banca
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Transparência sobre como funciona o contato direto com a Dra. Bruna Dourado.
          </p>
        </div>

        <div className="space-y-3.5">
          {siteConfig.faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-border bg-card transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4.5 text-left transition-colors hover:bg-secondary/50"
              >
                <h3 className="pr-4 font-serif text-lg font-bold text-foreground">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-border bg-secondary/25 px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/30 bg-card p-6 text-center shadow-sm sm:p-8">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Prefere falar diretamente sobre o seu caso?
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Inicie o contato por texto ou envie uma mensagem de áudio no WhatsApp para análise direta da Dra. Bruna Dourado.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-lg bg-primary px-6 py-5 font-semibold text-primary-foreground hover:bg-primary/90">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com a Dra. Bruna no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-lg border-primary/50 px-6 py-5 font-semibold text-foreground hover:bg-primary/10"
            >
              <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-4 w-4 text-primary" />
                Prefiro enviar mensagem de áudio no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
