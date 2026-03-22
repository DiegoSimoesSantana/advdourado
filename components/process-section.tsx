import { Card } from '@/components/ui/card'
import { ClipboardList, FolderSearch, CalendarCheck2, Scale } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const icons = [ClipboardList, FolderSearch, CalendarCheck2, Scale]

export function ProcessSection() {
  return (
    <section id="atendimento" className="bg-white px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Fluxo de atendimento</p>
          <h2 className="mb-4 text-4xl text-foreground md:text-5xl">Uma jornada simples para quem chega com urgência e precisa de direção.</h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-foreground/72">
            A estrutura unificada também organiza a entrada do cliente: menos dispersão entre sites e mais clareza sobre
            a área, os documentos e o formato correto de contratação.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <Card key={step.title} className="rounded-[1.75rem] border border-border/80 bg-secondary/35 p-7 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/45">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-3xl text-foreground">{step.title}</h3>
                <p className="text-base leading-7 text-foreground/72">{step.description}</p>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-primary/12 bg-foreground p-8 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/55">Observação ética</p>
          <p className="max-w-4xl text-base leading-8 text-white/76">
            O contato inicial não substitui consulta formal e não representa promessa de resultado. A estratégia só pode
            ser definida após análise concreta dos fatos e documentos apresentados.
          </p>
        </div>
      </div>
    </section>
  )
}
