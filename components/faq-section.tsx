'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const whatsappLink = createWhatsAppLink(
    'Olá, minha dúvida não está no site. Gostaria de explicar minha situação para triagem inicial.',
  )

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-white via-amber-50/50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Perguntas frequentes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dúvidas sobre a nova estrutura e sobre o atendimento
          </h2>
          <p className="text-lg text-foreground/70">
            Questões comuns de quem chega ao escritório pela primeira vez.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {siteConfig.faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-amber-50/50 transition-colors text-left"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-gradient-to-br from-amber-50/30 to-white">
                  <p className="text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-100/50 to-emerald-100/30 rounded-xl p-8 text-center border border-primary/20">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Sua dúvida não está aqui?
          </h3>
          <p className="text-foreground/70 mb-6">
            Use o WhatsApp para triagem inicial e encaminhamento para a área correta.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full font-semibold"
            >
              Enviar minha dúvida
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
