import { Button } from '@/components/ui/button'
import { ArrowRight, CalendarDays, MessageCircle, ShieldCheck } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function HeroSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, vim pelo site e gostaria de informar minha demanda para verificar a área de atendimento adequada.',
  )

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(183,134,56,0.18),_transparent_35%),linear-gradient(135deg,#f8f2e7_0%,#f4eee1_40%,#efe6d6_100%)] px-4 pb-16 pt-20 sm:px-6 md:px-8 md:pb-20 md:pt-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>{siteConfig.brand.oab}</span>
            <span className="text-muted-foreground">Comunicação institucional</span>
          </div>

          <div className="mb-5 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
              {siteConfig.brand.name}
            </p>
            <h1 className="text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
              Estrutura única para atender demandas de consumo, trabalho e educação.
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-foreground/78 sm:text-xl">
            {siteConfig.positioning.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {siteConfig.areas.map((area) => (
              <span
                key={area.id}
                className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm"
              >
                {area.title}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/92">
              <a href={siteConfig.contact.calendarUrl} target="_blank" rel="noopener noreferrer">
                Agendar consulta
                <CalendarDays className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/25 bg-white/75 px-8 text-foreground hover:bg-white">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Informar minha demanda
                <MessageCircle className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/12 bg-white/70 p-4 text-sm text-foreground/72 shadow-sm backdrop-blur sm:max-w-2xl">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <p>
              {siteConfig.compliance.informational} {siteConfig.compliance.ethics}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-10 top-8 h-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-primary/10 bg-slate-950 p-6 text-white shadow-2xl shadow-primary/10 sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-primary-foreground/70">Atendimento</p>
                <p className="text-2xl">Online e presencial sob agendamento</p>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Salvador/BA</div>
            </div>

            <div className="space-y-4">
              {siteConfig.areas.map((area, index) => (
                <div key={area.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.18em] text-white/55">0{index + 1}</span>
                    <ArrowRight className="h-4 w-4 text-primary-foreground/55" />
                  </div>
                  <h2 className="mb-2 text-2xl text-white">{area.title}</h2>
                  <p className="text-sm leading-7 text-white/72">{area.summary}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/12 p-5 text-sm leading-7 text-white/80">
              O primeiro contato organiza a triagem da demanda. A orientação jurídica personalizada ocorre por consulta
              formal, conforme a natureza do caso.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
