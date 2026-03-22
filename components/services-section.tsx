import Link from 'next/link'
import { Scale, BriefcaseBusiness, GraduationCap, ArrowRight, Building2, Handshake, FileText, HeartHandshake, Shield, Laptop, UserRoundCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

const icons = [
  Scale,
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  FileText,
  Shield,
  Handshake,
  GraduationCap,
  Laptop,
  UserRoundCheck,
]

export function ServicesSection() {
  return (
    <section id="areas" className="bg-white px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Áreas de atuação</p>
          <h2 className="mb-4 text-4xl text-foreground md:text-5xl">Especialidades organizadas em uma única estrutura de atendimento.</h2>
          <p className="text-lg leading-8 text-foreground/72">
            Cada área mantém sua especificidade técnica, mas o contato, a triagem e a orientação inicial passaram a
            funcionar em uma estrutura única e mais clara para o cliente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.areas.map((area, index) => {
            const Icon = icons[index % icons.length]
            const whatsappLink = createWhatsAppLink(
              `Olá, gostaria de atendimento em ${area.title}. Vim pelo site e quero informar minha demanda.`,
            )

            return (
              <Card key={area.id} className="flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-secondary/40 p-7 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-primary/10 bg-white px-3 py-1 text-xs uppercase tracking-[0.22em] text-foreground/55">
                    {area.id}
                  </span>
                </div>

                <h3 className="mb-3 text-3xl text-foreground">{area.title}</h3>
                <p className="mb-4 text-base leading-7 text-foreground/72">{area.summary}</p>
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-primary/75">{area.audience}</p>

                <div className="mb-8 flex-grow space-y-3">
                  {area.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-foreground/72 shadow-sm">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild variant="outline" className="rounded-full border-primary/20 bg-white hover:bg-primary hover:text-primary-foreground">
                    <Link href={`/areas/${area.id}`}>Ver página da área</Link>
                  </Button>
                  <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      Informar caso
                    </a>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
