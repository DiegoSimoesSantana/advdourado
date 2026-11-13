import { Landmark, ShieldCheck, BookOpenText, MessagesSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'

const icons = [MessagesSquare, Landmark, BookOpenText, ShieldCheck]

export function SocialProofSection() {
  return (
    <section className="border-b border-border bg-background px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Pilares do Escritório
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Autoridade construída por método, escuta e transparência ética
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Atendimento artesanal em Salvador e Região Metropolitana: sem robôs de triagem, sem promessas mercantilistas e com coordenação direta da Dra. Bruna Dourado ({siteConfig.brand.oab}).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.differentiators.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck

            return (
              <Card
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:border-primary/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
