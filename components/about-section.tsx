import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Scale, BookOpen, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function AboutSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Gostaria de conversar sobre uma demanda jurídica e entender como funciona o atendimento do escritório.',
  )

  return (
    <section id="sobre" className="w-full max-w-full overflow-hidden border-b border-border bg-secondary/45 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Segunda Foto Oficial da Dra. Bruna Dourado (foto-perfil2.jpg) */}
        <div className="w-full max-w-full min-w-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="relative h-[440px] w-full sm:h-[520px]">
              <SafePortraitImage
                src="/images/foto-perfil2.jpg"
                alt="Dra. Bruna Dourado — Advogada (OAB/BA 71507)"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#faf9f6]">
                <span className="inline-block rounded-full border border-[#c5a880]/50 bg-[#0a0a0a]/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                  Atendimento e Condução Direta
                </span>
                <p className="mt-2 font-serif text-2xl font-bold">
                  Dra. Bruna Dourado da Silva
                </p>
                <p className="mt-0.5 text-sm text-[#faf9f6]/85">
                  {siteConfig.brand.oab} • Salvador e Região Metropolitana
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full min-w-0 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sobre a Advogada e o Escritório
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight break-words text-foreground sm:text-4xl">
            Atendimento Humano Direto no Escritório da Dra. Bruna Dourado, sem Triagem Robótica
          </h2>

          <p className="mt-5 text-lg leading-relaxed break-words text-foreground/90">
            Advogada ({siteConfig.brand.oab}), Pós-Graduada em <strong>Direito e Processo do Trabalho</strong> e docente de Filosofia e Sociologia em instituições tradicionais de Salvador/BA, a Dra. Bruna Dourado realiza diretamente o atendimento, a análise e a condução jurídica de cada demanda em seu escritório.
          </p>

          {/* Cards de Credenciais Enxutos */}
          <div className="mt-8 grid w-full max-w-full min-w-0 gap-4 sm:grid-cols-2">
            <div className="w-full max-w-full min-w-0 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2.5 text-primary">
                <Scale className="h-5 w-5 shrink-0" />
                <span className="text-base font-bold text-foreground">Especialização Trabalhista</span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                Pós-Graduada em Direito e Processo do Trabalho, com sólida vivência consultiva e contenciosa.
              </p>
            </div>

            <div className="w-full max-w-full min-w-0 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2.5 text-primary">
                <BookOpen className="h-5 w-5 shrink-0" />
                <span className="text-base font-bold text-foreground">Docência e Didática</span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                Docente de Filosofia e Sociologia em instituições tradicionais de Salvador/BA, unindo técnica e escuta.
              </p>
            </div>
          </div>

          {/* Revelação Progressiva: Clicar para Expandir Detalhes Institucionais */}
          <Accordion type="single" collapsible className="mt-6 w-full max-w-full min-w-0">
            <AccordionItem
              value="detalhes-escritorio"
              className="rounded-xl border border-border bg-card px-5 sm:px-6"
            >
              <AccordionTrigger className="py-5 text-left font-serif text-lg font-bold text-foreground hover:no-underline">
                Como funciona o atendimento direto no escritório?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground space-y-3">
                <p>{siteConfig.about.officeExplanation}</p>
                <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-primary">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 shrink-0" /> Rigor Técnico e Sigilo OAB
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 shrink-0" /> Didática e Clareza em Cada Etapa
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 flex w-full max-w-full min-w-0 flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl bg-primary px-6 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-8 sm:py-5"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
                <span>Falar com a Dra. Bruna</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl px-6 py-4 text-center text-base font-semibold leading-snug whitespace-normal break-words sm:w-auto sm:py-5"
            >
              <Link href="/sobre">
                <span>Trajetória Completa</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
