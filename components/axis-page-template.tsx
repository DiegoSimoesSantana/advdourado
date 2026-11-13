'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  MessageCircle,
  Mic,
  ArrowRight,
  Scale,
  FileCheck2,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { AreaSectionTracker } from '@/components/area-section-tracker'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { BrandEmblem } from '@/components/brand-emblem'
import { EditorialArticleCover } from '@/components/editorial-article-cover'
import { createWhatsAppLink, siteConfig, type PracticeArea } from '@/lib/site-config'
import { getArticleBySlug } from '@/lib/blog-data'

type AxisPageTemplateProps = {
  areaData: PracticeArea
}

export function AxisPageTemplate({ areaData }: AxisPageTemplateProps) {
  const initialDefaultProfile: 'PF' | 'PJ' =
    areaData.id === 'educacional' ? 'PJ' : 'PF'

  const [selectedProfile, setSelectedProfile] = useState<'PF' | 'PJ'>(initialDefaultProfile)
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number | null>(null)
  const [selectedScenarioText, setSelectedScenarioText] = useState<string>('')

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
    .slice(0, 3)

  const handleSelectScenario = (index: number, profile: 'PF' | 'PJ', scenarioText: string) => {
    setSelectedScenarioIndex(index)
    setSelectedProfile(profile)
    setSelectedScenarioText(
      `Identifiquei meu caso na situação: "${scenarioText}". Gostaria de orientação jurídica sobre prazos, documentos e próximos passos.`,
    )
  }

  const handleScrollToForm = () => {
    const target = document.getElementById('triagem-whatsapp')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeScenario =
    selectedScenarioIndex !== null
      ? areaData.interactiveScenarios[selectedScenarioIndex]
      : null

  const dynamicRight =
    selectedScenarioIndex !== null
      ? areaData.rights[selectedScenarioIndex % areaData.rights.length]
      : areaData.rights[0]
  const dynamicDeadline =
    selectedScenarioIndex !== null
      ? areaData.deadlinesAndRules[selectedScenarioIndex % areaData.deadlinesAndRules.length]
      : areaData.deadlinesAndRules[0]
  const dynamicDuty =
    selectedScenarioIndex !== null
      ? areaData.duties[selectedScenarioIndex % areaData.duties.length]
      : areaData.duties[0]

  const getScenarioContextTag = (profile: 'PF' | 'PJ') => {
    if (areaData.id === 'trabalhista') {
      return profile === 'PJ' ? 'Para Empresa / RH' : 'Para Trabalhador(a)'
    }
    if (areaData.id === 'educacional') {
      return 'Gestão Escolar'
    }
    return 'Situação Comum'
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
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-background pb-24 md:pb-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AreaSectionTracker
        areaId={areaData.id}
        areaTitle={areaData.title}
        sectionIds={[
          'situacoes-comuns',
          'detalhes-revelacao',
          'triagem-whatsapp',
          'artigos-eixo',
        ]}
      />

      {/* TOPO ENXUTO DA PÁGINA INTERNA */}
      <section className="border-b border-border bg-[#0a0a0a] px-4 py-16 text-[#faf9f6] sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <nav className="flex flex-wrap items-center gap-2 text-base text-[#faf9f6]/75">
              <Link href="/" className="transition hover:text-[#c5a880]">
                Início
              </Link>
              <span>/</span>
              <Link href="/#eixos" className="transition hover:text-[#c5a880]">
                Especialidades
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#c5a880]">{areaData.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c5a880]/40 bg-[#121212] px-4 py-1.5 text-sm font-semibold text-[#c5a880]">
              <BrandEmblem size="sm" className="h-6 w-6" />
              <span>Coordenação: Dra. Bruna Dourado ({siteConfig.brand.oab})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-1.5 text-sm font-semibold text-[#c5a880]">
              <ShieldCheck className="h-4 w-4" />
              {areaData.scopeBadge}
            </span>
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#faf9f6] sm:text-4xl md:text-5xl">
            {areaData.title} em Salvador e Região Metropolitana
          </h1>

          {/* Descrição objetiva limitada a no máximo 2 linhas visíveis */}
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#faf9f6]/85 line-clamp-2">
            {areaData.summary}
          </p>

          <div className="mt-9 flex w-full max-w-full min-w-0 flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl bg-[#c5a880] px-5 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-[#0a0a0a] hover:bg-[#9a7c56] hover:text-[#faf9f6] sm:w-auto sm:px-7 sm:py-5"
            >
              <a href="#situacoes-comuns">
                <Sparkles className="mr-2 h-5 w-5 shrink-0" />
                <span>Identificar Minha Situação</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl border-[#c5a880]/60 bg-[#121212] px-5 py-4 text-center text-base font-semibold leading-snug whitespace-normal break-words text-[#faf9f6] hover:bg-[#c5a880]/20 hover:text-[#faf9f6] sm:w-auto sm:px-7 sm:py-5"
            >
              <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-5 w-5 shrink-0 text-[#c5a880]" />
                <span>Prefiro enviar mensagem de áudio no WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-20 sm:px-6 md:px-8 md:py-24">
        {/* ETAPA 1 INTERATIVA: Cards Clicáveis de "Situações Comuns" com Diagnóstico Dinâmico */}
        <section id="situacoes-comuns" className="scroll-mt-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Passo 1 • Toque na Sua Situação</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Situações Comuns em {areaData.shortTitle}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Clique na situação que melhor descreve sua demanda para exibir imediatamente o resumo de direitos, prazos aplicáveis e preparar seu relatório para o WhatsApp.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {areaData.interactiveScenarios.map((scenario, idx) => {
              const isSelected = selectedScenarioIndex === idx
              const contextTag = getScenarioContextTag(scenario.profile)

              return (
                <button
                  key={scenario.label}
                  type="button"
                  onClick={() => handleSelectScenario(idx, scenario.profile, scenario.label)}
                  className={`group flex flex-col justify-between rounded-2xl border p-7 text-left transition-all sm:p-8 ${
                    isSelected
                      ? 'border-2 border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                        {contextTag}
                      </span>

                      <span className="text-sm font-semibold text-primary">
                        {isSelected ? 'Situação Selecionada ✓' : 'Clicar para ver direitos →'}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-foreground group-hover:text-primary">
                      {scenario.label}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* PAINEL DINÂMICO REVELADO AO CLICAR EM UMA SITUAÇÃO */}
          {activeScenario && (
            <div className="mt-8 rounded-2xl border-2 border-primary bg-card p-7 shadow-lg sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Resumo de Direitos e Prazos para a Situação Selecionada
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Relatório pré-preenchido abaixo
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">
                “{activeScenario.label}”
              </h3>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-secondary/45 p-5">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Scale className="h-5 w-5" />
                    <span className="text-base">Direito / Enquadramento</span>
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90">
                    {dynamicRight}
                  </p>
                </div>

                <div className="rounded-xl border border-primary/40 bg-primary/10 p-5">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Clock className="h-5 w-5" />
                    <span className="text-base">Prazo e Regra de Atenção</span>
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90">
                    {dynamicDeadline}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/45 p-5">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <FileCheck2 className="h-5 w-5" />
                    <span className="text-base">Cuidado Documental</span>
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90">
                    {dynamicDuty}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <p className="text-base text-muted-foreground">
                  Sua situação já foi inserida no formulário de triagem abaixo.
                </p>
                <Button
                  type="button"
                  size="lg"
                  onClick={handleScrollToForm}
                  className="h-auto w-full max-w-full min-w-0 rounded-xl bg-primary px-5 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-7 sm:py-5"
                >
                  <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
                  <span>Continuar para o Relatório no WhatsApp</span>
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* ETAPA 2: REVELAÇÃO PROGRESSIVA (ACCORDIONS RECOLHIDOS POR PADRÃO) */}
        <section id="detalhes-revelacao" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Passo 2 • Consulta Rápida Sob Demanda
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Entenda Seus Direitos, Documentos e Atendimento
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
              Clique apenas no tópico que deseja expandir para ler os detalhes sem excesso de informação na tela.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Item A: Direitos, Deveres e Prazos Legais */}
            <AccordionItem
              value="direitos-deveres-prazos"
              className="rounded-2xl border border-border bg-card px-7 shadow-xs sm:px-8"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-xl font-bold text-foreground hover:no-underline sm:text-2xl">
                <span className="flex items-center gap-3">
                  <Scale className="h-6 w-6 shrink-0 text-primary" />
                  <span>1. Direitos, Deveres e Prazos Legais ({areaData.shortTitle})</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2 space-y-6 text-base leading-relaxed text-foreground/90">
                <div className="rounded-xl border-2 border-primary/40 bg-primary/10 p-6">
                  <div className="flex items-center gap-2.5 text-primary">
                    <Clock className="h-5 w-5 shrink-0" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {areaData.deadlinesTitle}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {areaData.deadlinesAndRules.map((rule) => (
                      <li key={rule} className="flex items-start gap-3 text-base leading-relaxed">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {areaData.scopePillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl border border-border bg-secondary/40 p-6"
                    >
                      <h4 className="font-serif text-xl font-bold text-foreground">
                        {pillar.title}
                      </h4>
                      <p className="mt-1 text-base font-medium text-primary">
                        {pillar.subtitle}
                      </p>
                      <ul className="mt-4 space-y-3 border-t border-border pt-4">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Item B: Documentos Recomendados e Cuidados Probatórios */}
            <AccordionItem
              value="documentos-recomendados"
              className="rounded-2xl border border-border bg-card px-7 shadow-xs sm:px-8"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-xl font-bold text-foreground hover:no-underline sm:text-2xl">
                <span className="flex items-center gap-3">
                  <FileCheck2 className="h-6 w-6 shrink-0 text-primary" />
                  <span>2. Documentos Recomendados e Cuidados Probatórios</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2 space-y-6 text-base leading-relaxed text-foreground/90">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-secondary/35 p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      O que preservar e reunir para a análise
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {areaData.duties.map((duty) => (
                        <li key={duty} className="flex items-start gap-3 text-base leading-relaxed">
                          <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                          <span>{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/35 p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Garantias e Fundamentos Legais
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {areaData.rights.map((right) => (
                        <li key={right} className="flex items-start gap-3 text-base leading-relaxed">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Item C: Como Funciona o 1º Atendimento */}
            <AccordionItem
              value="primeiro-atendimento"
              className="rounded-2xl border border-border bg-card px-7 shadow-xs sm:px-8"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-xl font-bold text-foreground hover:no-underline sm:text-2xl">
                <span className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
                  <span>3. Como Funciona o 1º Atendimento com a Dra. Bruna</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2">
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  Sem atendimento robotizado: veja as 3 entregas objetivas do seu primeiro contato com a Dra. Bruna Dourado ({siteConfig.brand.oab}).
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  {areaData.firstAppointmentDeliverables.map((deliverable, idx) => (
                    <div
                      key={deliverable.title}
                      className="rounded-xl border border-border bg-secondary/40 p-6"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        0{idx + 1}
                      </span>
                      <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                        {deliverable.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        {deliverable.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Item D: Perguntas Frequentes (FAQ) */}
            <AccordionItem
              value="perguntas-frequentes"
              className="rounded-2xl border border-border bg-card px-7 shadow-xs sm:px-8"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-xl font-bold text-foreground hover:no-underline sm:text-2xl">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 shrink-0 text-primary" />
                  <span>4. Perguntas Frequentes sobre {areaData.shortTitle}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2 space-y-5">
                {areaData.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border border-border bg-secondary/30 p-6"
                  >
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* ETAPA 3 DO FUNIL: Formulário Estruturado + Botão de Áudio/WhatsApp */}
        <section id="triagem-whatsapp" className="scroll-mt-24">
          <CaseTriageForm
            areaId={areaData.id}
            areaTitle={areaData.title}
            originPath={areaData.route}
            defaultProfile={selectedProfile}
            prefilledSummary={selectedScenarioText}
          />
        </section>

        {/* ETAPA 4: Artigos Relacionados */}
        {relatedArticles.length > 0 && (
          <section id="artigos-eixo" className="scroll-mt-24">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Leitura Complementar
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
                  Artigos sobre {areaData.shortTitle}
                </h2>
              </div>
              <Button asChild variant="outline" size="lg" className="rounded-xl text-base font-semibold">
                <Link href="/blog">
                  Ver Todos os Artigos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-7 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-md"
                >
                  <EditorialArticleCover
                    category={article.category}
                    categoryName={article.categoryName}
                    variant="card"
                  />

                  <div className="flex flex-grow flex-col justify-between p-7">
                    <div>
                      <h3 className="line-clamp-2 font-serif text-xl font-bold text-foreground group-hover:text-primary">
                        {article.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-bold text-primary">
                      Ler artigo ({article.readTime} min) <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Barra Fixa Mobile para Conversão Rápida sem Atrito (Ajustada para 320px-390px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex w-full max-w-full min-w-0 items-center gap-2 overflow-hidden border-t border-[#c5a880]/30 bg-[#0a0a0a]/95 px-3 py-3 backdrop-blur-md md:hidden">
        <a
          href="#triagem-whatsapp"
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#c5a880] px-2.5 py-3 text-center text-xs font-bold leading-tight text-[#0a0a0a] sm:px-4 sm:py-3.5 sm:text-sm"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">Enviar Relatório</span>
        </a>
        <a
          href={audioWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#c5a880]/50 bg-[#121212] px-2.5 py-3 text-center text-xs font-semibold leading-tight text-[#faf9f6] sm:px-4 sm:py-3.5 sm:text-sm"
        >
          <Mic className="h-4 w-4 shrink-0 text-[#c5a880]" />
          <span className="truncate">Enviar Áudio</span>
        </a>
      </div>

      <ContactFooterSection />
      <WhatsAppButton />
    </main>
  )
}
