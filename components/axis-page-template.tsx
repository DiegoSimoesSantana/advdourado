'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mic,
  ArrowRight,
  Scale,
  FileCheck2,
  Sparkles,
  UserCheck,
  Building2,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { AreaSectionTracker } from '@/components/area-section-tracker'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { BrandEmblem } from '@/components/brand-emblem'
import { createWhatsAppLink, siteConfig, type PracticeArea } from '@/lib/site-config'
import { getArticleBySlug } from '@/lib/blog-data'

type AxisPageTemplateProps = {
  areaData: PracticeArea
}

export function AxisPageTemplate({ areaData }: AxisPageTemplateProps) {
  const initialDefaultProfile: 'PF' | 'PJ' =
    areaData.id === 'educacional' ? 'PJ' : 'PF'

  const [selectedProfile, setSelectedProfile] = useState<'PF' | 'PJ'>(initialDefaultProfile)
  const [selectedScenarioText, setSelectedScenarioText] = useState<string>('')

  const directWhatsAppLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pela página de *${areaData.title}* (${areaData.route}) no site oficial.`,
      'Gostaria de iniciar a triagem do meu caso diretamente com a senhora.',
    ].join('\n'),
  )

  const audioWhatsAppLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pela página de *${areaData.title}* (${areaData.route}) e prefiro explicar meu caso enviando uma *mensagem de áudio*.`,
      'Aguardo sua confirmação para enviar o áudio.',
    ].join('\n'),
  )

  const relatedArticles = areaData.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => !!article)
    .slice(0, 4)

  const handleSelectScenario = (profile: 'PF' | 'PJ', scenarioText: string) => {
    setSelectedProfile(profile)
    setSelectedScenarioText(
      `Identifiquei meu caso na opção [${profile}]: "${scenarioText}". Gostaria de orientação jurídica sobre os próximos passos e documentos necessários.`,
    )
    const target = document.getElementById('triagem-whatsapp')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LegalService', 'Attorney'],
        '@id': `${siteConfig.contact.siteUrl}${areaData.route}#service`,
        name: `${areaData.title} — ${siteConfig.brand.legalName} (${siteConfig.brand.oab})`,
        description: areaData.seoDescription,
        url: `${siteConfig.contact.siteUrl}${areaData.route}`,
        telephone: '+55-71-99236-3943',
        email: siteConfig.contact.email,
        areaServed: [
          { '@type': 'City', name: 'Salvador' },
          { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Salvador' },
          { '@type': 'State', name: 'Bahia' },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua Mandiguaçun, nº 50, Piatã',
          addressLocality: 'Salvador',
          addressRegion: 'BA',
          postalCode: '41650-000',
          addressCountry: 'BR',
        },
        provider: {
          '@type': 'Person',
          name: 'Dra. Bruna Dourado da Silva',
          identifier: siteConfig.brand.oab,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: areaData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background pb-20 md:pb-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AreaSectionTracker
        areaId={areaData.id}
        areaTitle={areaData.title}
        sectionIds={[
          'escopo',
          'identifique-seu-caso',
          'direitos-prazos',
          'primeiro-atendimento',
          'triagem-whatsapp',
          'artigos-eixo',
          'faq-eixo',
        ]}
      />

      {/* Hero Padronizado do Eixo com Emblema Institucional Acima */}
      <section className="border-b border-border bg-[#0a0a0a] px-4 py-12 text-[#faf9f6] sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb + Emblema Superior */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[#faf9f6]/70 sm:text-sm">
              <Link href="/" className="transition hover:text-[#c5a880]">
                Início
              </Link>
              <span>/</span>
              <Link href="/#eixos" className="transition hover:text-[#c5a880]">
                Eixos de Atuação
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#c5a880]">{areaData.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c5a880]/35 bg-[#121212] px-3 py-1 text-[11px] font-semibold text-[#c5a880]">
              <BrandEmblem size="sm" className="h-6 w-6" />
              <span>Eixo Oficial • {siteConfig.brand.oab}</span>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.28fr_0.72fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c5a880]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{areaData.scopeBadge}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#faf9f6]/90">
                  {areaData.targetAudienceBadge}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#faf9f6] sm:text-4xl md:text-5xl">
                {areaData.title} em Salvador e Região Metropolitana
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[#faf9f6]/85 sm:text-lg">
                {areaData.summary}
              </p>

              <div className="mt-5 rounded-xl border border-white/12 bg-[#121212] p-4 text-xs leading-relaxed text-[#faf9f6]/80 sm:text-sm">
                <strong className="text-[#c5a880]">Atendimento Direto com a Doutora:</strong>{' '}
                Seu primeiro contato neste eixo não passa por robôs. A análise inicial é conduzida pessoalmente pela Dra. Bruna Dourado ({siteConfig.brand.oab}), que coordena sua banca de advogados associados conforme a demanda.
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="rounded-lg bg-[#c5a880] px-6 py-6 text-sm font-bold text-[#0a0a0a] hover:bg-[#9a7c56] hover:text-[#faf9f6] sm:text-base"
                >
                  <a href="#triagem-whatsapp">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Preencher Relatório Rápido para WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-[#c5a880]/60 bg-[#121212] px-6 py-6 text-sm font-semibold text-[#faf9f6] hover:bg-[#c5a880]/20 hover:text-[#faf9f6] sm:text-base"
                >
                  <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                    <Mic className="mr-2 h-5 w-5 text-[#c5a880]" />
                    Prefiro enviar mensagem de áudio no WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Card Lateral de Autoridade com Emblema */}
            <div className="rounded-2xl border border-[#c5a880]/30 bg-[#121212] p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#c5a880]/40">
                    <SafePortraitImage
                      src="/images/foto-perfil.jpg"
                      alt="Dra. Bruna Dourado (OAB/BA 71507)"
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                      Coordenação do Eixo
                    </p>
                    <p className="mt-0.5 font-serif text-lg font-bold text-[#faf9f6]">
                      Dra. Bruna Dourado
                    </p>
                    <p className="text-xs text-[#faf9f6]/75">
                      {siteConfig.brand.oab} • UNEB
                    </p>
                  </div>
                </div>
                <BrandEmblem size="md" />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#faf9f6]/80">
                <strong className="text-[#c5a880]">Público atendido neste eixo:</strong>{' '}
                {areaData.audience}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-[#faf9f6]/75">
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/60 p-2.5">
                  <span className="block font-bold text-[#c5a880]">Triagem Humana</span>
                  Direto com a Advogada
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/60 p-2.5">
                  <span className="block font-bold text-[#c5a880]">Sigilo OAB</span>
                  Art. 34, VII EOAB
                </div>
              </div>

              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#c5a880] transition hover:bg-[#c5a880] hover:text-[#0a0a0a]"
              >
                Abrir WhatsApp Direto: {siteConfig.contact.phoneShort}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Barra Fixa de Navegação Rápida do Funil Interno (Padrão Unificado nas 6 Páginas) */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2.5 text-xs font-semibold sm:px-6 md:px-8">
          <a
            href="#identifique-seu-caso"
            className="shrink-0 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            1. Identifique seu Caso (PF/PJ)
          </a>
          <a
            href="#escopo"
            className="shrink-0 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-foreground/85 transition hover:border-primary/40 hover:text-primary"
          >
            2. Escopo de Atuação
          </a>
          <a
            href="#direitos-prazos"
            className="shrink-0 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-foreground/85 transition hover:border-primary/40 hover:text-primary"
          >
            3. Direitos e Prazos
          </a>
          <a
            href="#primeiro-atendimento"
            className="shrink-0 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-foreground/85 transition hover:border-primary/40 hover:text-primary"
          >
            4. 1º Atendimento
          </a>
          <a
            href="#triagem-whatsapp"
            className="shrink-0 rounded-full border border-primary bg-primary px-3.5 py-1.5 text-primary-foreground transition hover:bg-primary/90"
          >
            5. Enviar Caso no WhatsApp
          </a>
          {relatedArticles.length > 0 && (
            <a
              href="#artigos-eixo"
              className="shrink-0 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-foreground/85 transition hover:border-primary/40 hover:text-primary"
            >
              6. Artigos PF & PJ
            </a>
          )}
          <a
            href="#faq-eixo"
            className="shrink-0 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-foreground/85 transition hover:border-primary/40 hover:text-primary"
          >
            7. Dúvidas (FAQ)
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 md:px-8">
        {/* BLOCO INTERATIVO DE AUTOIDENTIFICAÇÃO PF / PJ (Aumenta Conversão com 1 Clique) */}
        <section
          id="identifique-seu-caso"
          className="scroll-mt-28 rounded-2xl border-2 border-primary/35 bg-card p-6 shadow-sm sm:p-10"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Autoidentificação Rápida • Pessoa Física (PF) e Jurídica (PJ)</span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Qual destas situações descreve melhor a sua necessidade?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Clique na situação correspondente ao seu caso para preencher automaticamente o relatório de triagem abaixo e falar diretamente com a Dra. Bruna Dourado.
              </p>
            </div>
            <span className="shrink-0 rounded-lg border border-border bg-secondary px-3.5 py-2 text-xs font-medium text-muted-foreground">
              Selecione 1 opção para agilizar seu atendimento
            </span>
          </div>

          <div className="mt-6 grid gap-3.5 md:grid-cols-2">
            {areaData.interactiveScenarios.map((scenario) => {
              const isPJ = scenario.profile === 'PJ'
              return (
                <button
                  key={scenario.label}
                  type="button"
                  onClick={() => handleSelectScenario(scenario.profile, scenario.label)}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-secondary/40 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        isPJ
                          ? 'border border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : 'border border-primary/40 bg-primary/15 text-primary'
                      }`}
                    >
                      {isPJ ? (
                        <Building2 className="h-3 w-3" />
                      ) : (
                        <UserCheck className="h-3 w-3" />
                      )}
                      {scenario.profile}
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-foreground group-hover:text-primary">
                      {scenario.label}
                    </span>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              )
            })}
          </div>
        </section>

        {/* ETAPA 1 DO FUNIL: Explicação Clara do Escopo */}
        <section id="escopo" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              1. Escopo Exato de Atuação
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Como atuamos em {areaData.title}
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85">
              {areaData.scopeExplanation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {areaData.scopePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col justify-between rounded-xl border border-border bg-secondary/45 p-6"
              >
                <div>
                  {pillar.profileBadge && (
                    <span className="mb-3 inline-block rounded-full border border-primary/35 bg-primary/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {pillar.profileBadge}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-primary">
                    {pillar.subtitle}
                  </p>
                  <ul className="mt-4 space-y-3 border-t border-border pt-4">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <a
                    href="#triagem-whatsapp"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    Iniciar triagem neste escopo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ETAPA 2 DO FUNIL: Direitos, Deveres e Prazos Legais */}
        <section id="direitos-prazos" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            2. Orientação Jurídica Preventiva
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Direitos, Deveres e Prazos Legais em {areaData.shortTitle}
          </h2>

          {/* Destaque de Prazos Legais */}
          <div className="mt-6 rounded-xl border-2 border-primary/40 bg-primary/10 p-6">
            <div className="flex items-center gap-2.5 text-primary">
              <Clock className="h-5 w-5 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                {areaData.deadlinesTitle}
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {areaData.deadlinesAndRules.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/35 p-6">
              <div className="flex items-center gap-2 text-primary">
                <Scale className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Direitos e Garantias Legais
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {areaData.rights.map((right) => (
                  <li key={right} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-secondary/35 p-6">
              <div className="flex items-center gap-2 text-primary">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Deveres e Cuidados Probatórios
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {areaData.duties.map((duty) => (
                  <li key={duty} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                    <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ETAPA 3 DO FUNIL: O que você recebe no primeiro atendimento */}
        <section id="primeiro-atendimento" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            3. Transparência na Triagem e Consulta
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            O que você recebe no primeiro atendimento
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sem promessas irreais e sem atendimento robotizado: veja como a Dra. Bruna Dourado conduz o seu primeiro contato neste eixo.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {areaData.firstAppointmentDeliverables.map((deliverable, idx) => (
              <div
                key={deliverable.title}
                className="rounded-xl border border-border bg-secondary/40 p-6"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {deliverable.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ETAPA 4 DO FUNIL: Formulário Estruturado + Botão de Áudio/WhatsApp */}
        <section id="triagem-whatsapp" className="scroll-mt-28">
          <CaseTriageForm
            areaId={areaData.id}
            areaTitle={areaData.title}
            originPath={areaData.route}
            defaultProfile={selectedProfile}
            prefilledSummary={selectedScenarioText}
          />
        </section>

        {/* ETAPA 5 DO FUNIL: Artigos Internos PF & PJ Relacionados ao Eixo */}
        {relatedArticles.length > 0 && (
          <section id="artigos-eixo" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span>Artigos Técnicos deste Eixo (PF & PJ)</span>
                </div>
                <h2 className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Guias e Orientações sobre {areaData.shortTitle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leitura educativa elaborada para Pessoas Físicas (PF) e Pessoas Jurídicas (PJ) conforme o Provimento nº 205/2021 da OAB.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/blog">
                  Biblioteca Completa
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {relatedArticles.map((article) => {
                const profileBadge = article.targetProfile ?? 'PF'
                const isPJ = profileBadge === 'PJ'
                return (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-secondary/30 p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {article.categoryName}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isPJ
                              ? 'border border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                              : 'border border-primary/40 bg-primary/15 text-primary'
                          }`}
                        >
                          Público: {profileBadge}
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-serif text-lg font-bold text-foreground group-hover:text-primary">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                      <span className="text-muted-foreground">{article.readTime} min de leitura</span>
                      <span className="inline-flex items-center gap-1 font-bold text-primary">
                        Ler artigo completo <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ETAPA 6: Perguntas Frequentes do Eixo */}
        <section id="faq-eixo" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Dúvidas Recorrentes
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Perguntas frequentes sobre {areaData.title}
          </h2>

          <Accordion type="single" collapsible defaultValue="0" className="mt-6 w-full space-y-3">
            {areaData.faq.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={String(idx)}
                className="rounded-xl border border-border bg-secondary/30 px-5"
              >
                <AccordionTrigger className="py-4 text-left font-serif text-base font-bold text-foreground hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* Barra Fixa Mobile para Conversão Rápida sem Atrito */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-2 border-t border-[#c5a880]/30 bg-[#0a0a0a]/95 p-3 backdrop-blur-md md:hidden">
        <a
          href="#triagem-whatsapp"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#c5a880] px-3 py-3 text-xs font-bold text-[#0a0a0a]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Relatório Rápido</span>
        </a>
        <a
          href={audioWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#c5a880]/50 bg-[#121212] px-3 py-3 text-xs font-semibold text-[#faf9f6]"
        >
          <Mic className="h-4 w-4 text-[#c5a880]" />
          <span>Enviar Áudio</span>
        </a>
      </div>

      <ContactFooterSection />
      <WhatsAppButton />
    </main>
  )
}
