import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GraduationCap, Scale, BookOpen, Users, MessageCircle, ArrowRight } from 'lucide-react'
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
    'Olá, Dra. Bruna Dourado. Gostaria de conversar sobre uma demanda jurídica e entender como funciona o atendimento da banca.',
  )

  return (
    <section id="sobre" className="border-b border-border bg-secondary/45 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Segunda Foto Oficial da Dra. Bruna Dourado (foto-perfil2.jpg) */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="relative h-[440px] w-full sm:h-[520px]">
              <SafePortraitImage
                src="/images/foto-perfil2.jpg"
                alt="Dra. Bruna Dourado — Coordenação da Banca Associada (OAB/BA 71507)"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#faf9f6]">
                <span className="inline-block rounded-full border border-[#c5a880]/50 bg-[#0a0a0a]/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                  Coordenação e Triagem Pessoal
                </span>
                <p className="mt-2 font-serif text-2xl font-bold">
                  Dra. Bruna Dourado da Silva
                </p>
                <p className="mt-0.5 text-sm text-[#faf9f6]/85">
                  {siteConfig.brand.oab} • UNEB • Salvador/BA
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sobre a Advogada e a Banca Associada
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Atendimento Humano Direto com a Doutora, sem Triagem Robótica
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Graduada em Direito pela <strong>UNEB</strong>, Pós-Graduada em <strong>Direito e Processo do Trabalho</strong> e docente de Filosofia e Sociologia, a Dra. Bruna Dourado conduz pessoalmente o seu primeiro atendimento e coordena especialistas associados para cada demanda.
          </p>

          {/* Cards de Credenciais Enxutos */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2.5 text-primary">
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span className="text-base font-bold text-foreground">Formação UNEB</span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                Bacharela pela Universidade do Estado da Bahia e Especialista em Direito do Trabalho.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2.5 text-primary">
                <Users className="h-5 w-5 shrink-0" />
                <span className="text-base font-bold text-foreground">Banca Associada</span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                Atuação integrada com advogados especialistas em Saúde, Família, Imóveis e Consumidor.
              </p>
            </div>
          </div>

          {/* Revelação Progressiva: Clicar para Expandir Detalhes Institucionais */}
          <Accordion type="single" collapsible className="mt-6 w-full">
            <AccordionItem
              value="detalhes-banca"
              className="rounded-xl border border-border bg-card px-6"
            >
              <AccordionTrigger className="py-5 text-left font-serif text-lg font-bold text-foreground hover:no-underline">
                Como funciona a coordenação da nossa Banca Associada?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground space-y-3">
                <p>{siteConfig.about.bancaExplanation}</p>
                <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-primary">
                  <span className="inline-flex items-center gap-1.5">
                    <Scale className="h-4 w-4" /> Rigor Técnico e Sigilo OAB
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> Didática e Clareza em Cada Etapa
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com a Dra. Bruna
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-xl px-6 py-6 text-base font-semibold">
              <Link href="/sobre">
                Trajetória Completa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
