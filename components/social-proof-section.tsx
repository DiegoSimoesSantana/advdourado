import { Landmark, ShieldCheck, BookOpenText, MessagesSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'

const icons = [MessagesSquare, BookOpenText, ShieldCheck, Landmark]

export function SocialProofSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#f4eee1_0%,#ffffff_100%)] px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Direcionadores do escritório</p>
          <h2 className="mb-4 text-4xl text-foreground md:text-5xl">Credibilidade construída por postura, método e clareza.</h2>
          <p className="mx-auto max-w-3xl text-justify text-lg leading-8 text-slate-700">
            A nova presença digital evita excessos de marketing e reforça o que realmente importa para o contato
            profissional: escuta, organização do atendimento, sigilo e informação qualificada.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Primeiro contato com triagem inicial conduzida pela Dra. Bruna Dourado, com encaminhamento técnico conforme a especialidade do caso.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.differentiators.map((item, index) => {
            const Icon = icons[index]

            return (
              <Card key={item.title} className="rounded-[1.75rem] border border-border/80 bg-white p-7 shadow-sm">
                <div className="mb-5 rounded-2xl bg-primary/10 p-4 text-primary w-fit">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-3xl text-foreground">{item.title}</h3>
                <p className="text-justify text-base leading-7 text-slate-700">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
