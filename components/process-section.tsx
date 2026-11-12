import { Card } from '@/components/ui/card'
import { ClipboardList, FolderSearch, MessageCircleMore, Scale, Lock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const icons = [ClipboardList, FolderSearch, MessageCircleMore, Scale]

export function ProcessSection() {
  return (
    <section id="atendimento" className="border-b border-border bg-secondary/40 px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Jornada de Atendimento
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Do seu relato por texto ou áudio até a estratégia jurídica
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Estruturamos um fluxo transparente para que você saiba exatamente o que acontece desde o primeiro contato no WhatsApp até a condução técnica pela banca.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.steps.map((step, index) => {
            const Icon = icons[index] ?? Scale
            return (
              <Card
                key={step.title}
                className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    Etapa 0{index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/35 bg-[#121212] p-6 text-[#faf9f6] sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
            <Lock className="h-4 w-4" />
            <span>Compromisso Ético OAB/BA e Sigilo Profissional</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#faf9f6]/85">
            {siteConfig.compliance.privacy} {siteConfig.compliance.contractDisclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
