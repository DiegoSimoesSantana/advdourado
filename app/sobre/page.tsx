import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Scale, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Sobre a Dra. Bruna Dourado e a Banca Associada',
  description:
    'Conheça a trajetória da Dra. Bruna Dourado (OAB/BA 71507), pós-graduada em Direito e Processo do Trabalho e docente de Filosofia e Sociologia em Salvador/BA.',
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/sobre`,
  },
  openGraph: {
    title: 'Sobre a Dra. Bruna Dourado (OAB/BA 71507) — Banca Boutique em Salvador/BA',
    description:
      'Pós-Graduação em Direito e Processo do Trabalho, diferencial humanístico e coordenação de Banca Associada Especializada em Salvador.',
    url: `${siteConfig.contact.siteUrl}/sobre`,
    type: 'profile',
  },
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <nav className="mb-8 text-base text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-foreground">Sobre Nós e a Banca Associada</span>
        </nav>

        <section className="grid gap-12 rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-border bg-secondary">
            <div className="relative h-[440px] w-full sm:h-[500px]">
              <SafePortraitImage
                src="/images/foto-perfil2.jpg"
                alt="Dra. Bruna Dourado — OAB/BA 71507"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="border-t border-border bg-[#121212] p-6 text-[#faf9f6]">
              <p className="font-serif text-2xl font-bold text-[#c5a880]">
                Dra. Bruna Dourado da Silva
              </p>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#faf9f6]/80">
                Advogada Titular • {siteConfig.brand.oab}
              </p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              {siteConfig.about.subtitle}
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {siteConfig.about.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-foreground/90">
              {siteConfig.about.text[0]}
            </p>

            {/* Credenciais Principais em Cards Espaçados */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/40 p-6">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-serif text-xl font-bold text-foreground">
                  Formação Jurídica
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                  Bacharela em Direito com atuação pautada pelo rigor técnico, ética e responsabilidade social.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-6">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-serif text-xl font-bold text-foreground">
                  Pós-Graduação Trabalhista
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                  Especialização em Direito e Processo do Trabalho para consultoria preventiva e defesa técnica.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-serif text-xl font-bold text-foreground">
                  Docência e Didática
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                  Trajetória como professora de Filosofia e Sociologia em instituições tradicionais de Salvador.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-6">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-serif text-xl font-bold text-foreground">
                  Banca Associada
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                  Triagem pessoal pela Dra. Bruna aliada a especialistas em cada área de atuação.
                </p>
              </div>
            </div>

            {/* Revelação Progressiva para Detalhes Adicionais */}
            <Accordion type="single" collapsible className="mt-6 w-full space-y-3">
              <AccordionItem value="formacao-completa" className="rounded-xl border border-border bg-secondary/25 px-6">
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-bold text-foreground hover:no-underline">
                  Ler trajetória completa e filosofia de atendimento
                </AccordionTrigger>
                <AccordionContent className="pb-6 space-y-4 text-base leading-relaxed text-foreground/85">
                  {siteConfig.about.text.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="font-medium text-foreground">
                    {siteConfig.about.bancaExplanation}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Atalhos Enxutos para as 6 Áreas */}
        <section className="mt-16 rounded-2xl border border-primary/30 bg-card p-7 shadow-sm sm:p-10">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Áreas Coordenadas pela Banca
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Selecione a área desejada para consultar escopo, prazos e iniciar seu atendimento.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areas.map((area) => (
              <Link
                key={area.id}
                href={area.route}
                className="group flex flex-col justify-between rounded-xl border border-border bg-secondary/35 p-7 transition hover:border-primary"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary">
                    {area.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-bold text-primary">
                  Explorar Área <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
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
