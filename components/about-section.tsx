import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function AboutSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, gostaria de conversar sobre uma demanda jurídica e entender como funciona o atendimento do escritório.',
  )

  return (
    <section id="sobre" className="bg-foreground px-4 py-20 text-white sm:px-6 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">Estrutura institucional</p>
          <h2 className="mb-6 text-4xl text-white md:text-5xl">Um escritório, uma narrativa mais clara, a mesma atuação responsável.</h2>
          <div className="space-y-5 text-lg leading-8 text-white/76">
            <p>{siteConfig.positioning.description}</p>
            <p>
              A proposta da nova estrutura é reduzir ruído para quem chega ao site: em vez de três páginas isoladas,
              há um fluxo único para contato, triagem, produção de conteúdo e encaminhamento da área adequada.
            </p>
            <p>
              Na frente educacional, o escritório incorpora a vivência de 18 anos no ambiente escolar e o olhar para
              temas regulatórios, digitais e de proteção institucional. Nas frentes consumerista e trabalhista, mantém
              atendimento estratégico para demandas recorrentes do cotidiano de pessoas e famílias.
            </p>
          </div>

          <Button asChild size="lg" className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Falar com o escritório
            </a>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-[1.5rem] border-white/10 bg-white/5 p-6 text-white shadow-none sm:col-span-2">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/55">Identificação profissional</p>
            <h3 className="mb-2 text-3xl">{siteConfig.brand.name}</h3>
            <p className="text-white/72">{siteConfig.brand.title}</p>
            <p className="mt-4 text-sm text-white/72">{siteConfig.brand.oab}</p>
          </Card>

          <Card className="rounded-[1.5rem] border-white/10 bg-white/5 p-6 text-white shadow-none">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/55">Atendimento</p>
            <p className="text-2xl">Online em todo o Brasil</p>
            <p className="mt-3 text-sm leading-6 text-white/72">Atendimento presencial sob agendamento em Salvador/BA.</p>
          </Card>

          <Card className="rounded-[1.5rem] border-white/10 bg-white/5 p-6 text-white shadow-none">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/55">Contato</p>
            <p className="text-2xl">{siteConfig.contact.phoneDisplay}</p>
            <p className="mt-3 text-sm leading-6 text-white/72">{siteConfig.contact.email}</p>
          </Card>

          <Card className="rounded-[1.5rem] border-white/10 bg-white/5 p-6 text-white shadow-none sm:col-span-2">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/55">Compromissos de atuação</p>
            <div className="grid gap-3 md:grid-cols-2">
              {siteConfig.differentiators.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="mb-2 text-lg">{item.title}</p>
                  <p className="text-sm leading-6 text-white/72">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
