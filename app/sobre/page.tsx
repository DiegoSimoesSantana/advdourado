import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Scale, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'

export const metadata: Metadata = {
  title: 'Sobre a Dra. Bruna Dourado e a Banca Associada',
  description:
    'Conheça a trajetória da Dra. Bruna Dourado (OAB/BA 71507), graduada pela UNEB, pós-graduada em Direito e Processo do Trabalho e docente de Filosofia e Sociologia em Salvador/BA.',
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/sobre`,
  },
  openGraph: {
    title: 'Sobre a Dra. Bruna Dourado (OAB/BA 71507) — Banca Boutique em Salvador/BA',
    description:
      'Formação pela UNEB, Pós-Graduação em Direito e Processo do Trabalho, diferencial humanístico e coordenação de Banca Associada Especializada em Salvador.',
    url: `${siteConfig.contact.siteUrl}/sobre`,
    type: 'profile',
  },
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">Sobre Nós e a Banca Associada</span>
        </nav>

        <section className="grid gap-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-border bg-secondary">
            <div className="relative h-[420px] w-full sm:h-[480px]">
              <SafePortraitImage
                src="/images/foto-perfil.jpg"
                alt="Dra. Bruna Dourado — OAB/BA 71507"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="border-t border-border bg-[#121212] p-5 text-[#faf9f6]">
              <p className="font-serif text-xl font-bold text-[#c5a880]">
                Dra. Bruna Dourado da Silva
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#faf9f6]/80">
                Advogada Titular • {siteConfig.brand.oab}
              </p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              {siteConfig.about.subtitle}
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {siteConfig.about.title}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              {siteConfig.about.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="mt-2 font-serif text-base font-bold text-foreground">
                  Universidade do Estado da Bahia (UNEB)
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Formação jurídica pública pautada pelo rigor constitucional, pesquisa acadêmica e responsabilidade social.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <Scale className="h-5 w-5 text-primary" />
                <h2 className="mt-2 font-serif text-base font-bold text-foreground">
                  Pós-Graduação em Direito e Processo do Trabalho
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Especialização técnica voltada tanto ao compliance preventivo empresarial quanto à tutela de direitos laborais.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="mt-2 font-serif text-base font-bold text-foreground">
                  Docência em Filosofia e Sociologia
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Experiência em instituições tradicionais de ensino de Salvador, trazendo didática, escuta ativa e mediação humanizada.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="mt-2 font-serif text-base font-bold text-foreground">
                  Coordenação de Banca Associada
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Triagem pessoal pela Dra. Bruna aliada a especialistas associados em Família, Imobiliário, Consumidor e Saúde.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Explicação detalhada da Banca Associada e dos 6 Eixos */}
        <section className="mt-12 rounded-2xl border border-primary/30 bg-card p-6 shadow-sm sm:p-10">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Por que o modelo de Banca Boutique Associada?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/85">
            {siteConfig.about.bancaExplanation}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areas.map((area) => (
              <Link
                key={area.id}
                href={area.route}
                className="group flex flex-col justify-between rounded-xl border border-border bg-secondary/35 p-5 transition hover:border-primary"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {area.eyebrow}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-foreground group-hover:text-primary">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                  Conhecer Eixo <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <CaseTriageForm
            areaId="institucional"
            areaTitle="Atendimento Institucional"
            originPath="/sobre"
          />
        </section>
      </div>

      <ContactFooterSection />
    </main>
  )
}
