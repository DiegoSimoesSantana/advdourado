import { Card } from '@/components/ui/card'
import { ClipboardList, FolderSearch, MessageCircleMore, Scale } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const icons = [ClipboardList, FolderSearch, MessageCircleMore, Scale]

export function ProcessSection() {
  return (
    <section id="atendimento" className="bg-white px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Fluxo de atendimento</p>
          <h2 className="mb-4 text-4xl text-foreground md:text-5xl">Um caminho claro do primeiro contato até o WhatsApp da Doutora.</h2>
          <p className="mx-auto max-w-3xl text-justify text-lg leading-8 text-slate-700">
            Você escolhe a especialidade, entende as opções e inicia por texto ou áudio no WhatsApp. O objetivo é reduzir dúvidas e acelerar o encaminhamento certo.
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
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-3xl text-foreground">{step.title}</h3>
                <p className="text-justify text-base leading-7 text-slate-700">{step.description}</p>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-primary/12 bg-foreground p-8 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Observação ética</p>
          <p className="max-w-4xl text-justify text-base leading-8 text-white/90">
            O contato inicial é informativo e de triagem. Não há promessa de resultado e a estratégia jurídica depende da análise do caso concreto, documentos e consulta formal.
          </p>
        </div>
      </div>
    </section>
  )
}
