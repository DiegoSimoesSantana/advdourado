import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { AreaSectionTracker } from '@/components/area-section-tracker'
import { createWhatsAppLink, getAreaById, siteConfig } from '@/lib/site-config'
import { getArticleBySlug } from '@/lib/blog-data'
import { AreaCtaButtons } from '@/components/area-cta-buttons'

type Props = {
  params: Promise<{ area: string }>
}

type RightsDuties = {
  rights: string[]
  duties: string[]
}

const areaGuidance: Record<string, string> = {
  trabalhista:
    'Nesta etapa você recebe uma leitura inicial do cenário, com foco em direitos, deveres, prazos e documentos essenciais para avançar com segurança.',
  educacional:
    'A triagem mapeia riscos institucionais, define prioridades de adequação à RN-1 e estrutura um plano de atualização documental, operacional e de governança com foco em compliance e LGPD.',
  'servicos-publicos':
    'O atendimento é estruturado em formato educativo e aplicado: diagnóstico de rotina, atualização da equipe sobre mudanças legais da RN-1 e implantação de procedimentos para reduzir risco de responsabilização.',
  familia:
    'A orientação prioriza soluções consensuais, preservação de vínculos e organização jurídica de acordos familiares com clareza.',
  consumidor:
    'A análise verifica impacto patrimonial, documentação de prova e medidas possíveis para reduzir perdas e buscar reparação.',
  'imoveis-inventario':
    'A avaliação foca em viabilidade consensual, documentos necessários e caminho mais seguro para formalização em cartório ou contrato.',
  'planos-saude':
    'A triagem considera urgência médica, documentos clínicos e contrato para orientar o encaminhamento adequado do beneficiário.',
}

const areaRightsAndDuties: Record<string, RightsDuties> = {
  trabalhista: {
    rights: [
      'Compreensão clara de verbas, jornada e prazos legais aplicáveis ao caso.',
      'Orientação técnica para prevenção de passivo ou defesa de direitos trabalhistas.',
      'Encaminhamento com estratégia compatível com documentos e contexto real.',
    ],
    duties: [
      'Reunir documentos essenciais (contrato, holerites, comunicações e comprovantes).',
      'Informar fatos com precisão para reduzir risco de erro na estratégia.',
      'Respeitar prazos legais para não perder oportunidade de atuação.',
    ],
  },
  educacional: {
    rights: [
      'Plano técnico para adequação institucional às exigências da RN-1.',
      'Revisão estratégica de contratos, regimentos e fluxos acadêmico-administrativos.',
      'Direcionamento para conformidade com LGPD e prevenção de passivo regulatório.',
    ],
    duties: [
      'Disponibilizar políticas internas, contratos e procedimentos atualmente vigentes.',
      'Engajar gestão e equipes-chave na execução do plano de atualização.',
      'Implementar registros e rotinas de evidência para auditoria e controle.',
    ],
  },
  'servicos-publicos': {
    rights: [
      'Capacitação jurídica aplicada para servidores municipais, estaduais e federais.',
      'Mapeamento de riscos operacionais com recomendações de adequação à RN-1.',
      'Suporte técnico para estruturar governança, compliance e proteção de dados na rotina pública.',
    ],
    duties: [
      'Apresentar fluxos internos, normas setoriais e pontos críticos de execução.',
      'Designar responsáveis por implementação e acompanhamento das medidas recomendadas.',
      'Manter trilhas de decisão e documentação de conformidade atualizadas.',
    ],
  },
  familia: {
    rights: [
      'Atendimento humanizado com foco em soluções consensuais possíveis.',
      'Clareza sobre impactos de guarda, alimentos e partilha.',
      'Organização jurídica para acordos com segurança e previsibilidade.',
    ],
    duties: [
      'Compartilhar informações familiares e patrimoniais relevantes.',
      'Priorizar comunicação transparente para viabilizar acordo.',
      'Apresentar documentos pessoais e de bens quando necessário.',
    ],
  },
  consumidor: {
    rights: [
      'Avaliação de cobranças, contratos e prejuízos patrimoniais.',
      'Direcionamento para medidas de correção e possível reparação.',
      'Compreensão dos caminhos administrativos e judiciais possíveis.',
    ],
    duties: [
      'Guardar comprovantes, conversas, protocolos e contratos.',
      'Relatar datas e valores de forma precisa.',
      'Agir com agilidade para evitar perda de prazo e prova.',
    ],
  },
  'imoveis-inventario': {
    rights: [
      'Análise de viabilidade para solução consensual e extrajudicial.',
      'Orientação sobre partilha e formalização documental segura.',
      'Maior clareza sobre etapas de cartório e instrumentos aplicáveis.',
    ],
    duties: [
      'Confirmar consenso entre os envolvidos antes de avançar.',
      'Reunir certidões, matrículas e documentos das partes.',
      'Informar passivos, bens e pendências com precisão.',
    ],
  },
  'planos-saude': {
    rights: [
      'Orientação sobre negativas de cobertura e reajustes.',
      'Prioridade de triagem em contexto de urgência médica.',
      'Encaminhamento técnico para proteção do beneficiário.',
    ],
    duties: [
      'Apresentar laudos, prescrições e negativa formal da operadora.',
      'Informar histórico do plano e comunicações já realizadas.',
      'Buscar orientação com rapidez em casos sensíveis de saúde.',
    ],
  },
}

const areaCommonCases: Record<string, string[]> = {
  trabalhista: [
    'Verbas rescisórias e diferenças de pagamento.',
    'Horas extras e controle de jornada.',
    'Suporte preventivo para empresas e RH.',
  ],
  educacional: [
    'Adequação institucional às novas exigências da RN-1.',
    'Revisão de contratos educacionais, regimentos e políticas internas.',
    'Treinamento de equipes para reduzir riscos de compliance e LGPD.',
  ],
  'servicos-publicos': [
    'Formação jurídica continuada para servidores e gestores públicos.',
    'Atualização de procedimentos administrativos conforme RN-1 e controles internos.',
    'Mitigação de riscos em tratamento de dados pessoais e conformidade regulatória.',
  ],
  familia: [
    'Divórcio consensual com organização patrimonial.',
    'Acordos de guarda e alimentos.',
    'Formalização de combinações familiares.',
  ],
  consumidor: [
    'Cobranças indevidas e impacto no orçamento.',
    'Problemas com contratos de consumo.',
    'Prejuízos patrimoniais por falha de serviço.',
  ],
  'imoveis-inventario': [
    'Inventário em contexto de consenso familiar.',
    'Partilha amigável com segurança documental.',
    'Revisão de contratos de compra e venda.',
  ],
  'planos-saude': [
    'Negativa de procedimento ou exame.',
    'Reajuste elevado do plano de saúde.',
    'Situações de urgência com necessidade de orientação rápida.',
  ],
}

export async function generateStaticParams() {
  return siteConfig.areas.map((area) => ({ area: area.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    return {
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
    }
  }

  return {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    openGraph: {
      title: areaData.seoTitle,
      description: areaData.seoDescription,
      url: `${siteConfig.contact.siteUrl}/areas/${areaData.id}`,
      type: 'article',
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    notFound()
    return null
  }

  const whatsappLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pela página de ${areaData.title} no site.`,
      'Gostaria de triagem inicial do meu caso.',
      `Origem: /areas/${areaData.id}`,
    ].join('\n'),
  )
  const audioWhatsAppLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pela página de ${areaData.title} no site e prefiro explicar meu caso por áudio.`,
      'Aguardo orientação para os próximos passos.',
      `Origem: /areas/${areaData.id}`,
    ].join('\n'),
  )
  const emailLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Contato pelo site - ${areaData.title}`,
  )}&body=${encodeURIComponent(
    [
      'Olá, Dra. Bruna Dourado,',
      '',
      `Vim pela página de ${areaData.title} e gostaria de orientação inicial.`,
      '',
      `Origem: /areas/${areaData.id}`,
      'Nome:',
      'Telefone:',
      'Resumo do caso:',
    ].join('\n'),
  )}`

  const relatedArticles = areaData.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => !!article)
    .slice(0, 3)

  // JSON-LD schemas
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.brand.legalName,
  }

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      <AreaSectionTracker
        areaId={areaData.id}
        areaTitle={areaData.title}
        sectionIds={[
          'area-overview',
          'area-approach',
          'area-rights-duties',
          'area-common-cases',
          'area-faq',
          'area-articles',
        ]}
      />
      <div className="mx-auto max-w-5xl">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/areas" className="hover:text-primary hover:underline">
            Áreas
          </Link>
          <span className="mx-2">/</span>
          <span>{areaData.title}</span>
        </nav>

        <header id="area-overview" className="mt-6 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Área de atuação</p>
          <h1 className="mt-3 text-4xl text-foreground md:text-5xl">{areaData.title}</h1>
          <p className="mt-4 text-lg leading-8 text-foreground/75">{areaData.summary}</p>
          <p className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm leading-7 text-foreground/70">
            {areaData.audience}
          </p>
        </header>


        <section id="area-approach" className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground mb-6">Como a ADVDourado pode atuar</h2>
          <p className="mb-6 text-sm leading-7 text-foreground/75">
            {areaGuidance[areaData.id] ??
              'Nesta área, o atendimento começa com triagem objetiva para identificar cenário, documentos e o melhor encaminhamento técnico.'}
          </p>
          <Accordion type="single" collapsible className="w-full mb-8">
            {areaData.highlights.map((highlight, idx) => (
              <AccordionItem key={highlight} value={String(idx)}>
                <AccordionTrigger className="text-base font-semibold text-foreground bg-secondary/40 rounded-2xl px-4 py-3">
                  {highlight}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/80 px-4 pb-4">
                  Explicamos de forma simples o que pode ser feito no seu caso, quais documentos ajudam na avaliação e qual é o próximo passo recomendado.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <AreaCtaButtons
            areaId={areaData.id}
            areaTitle={areaData.title}
            whatsappLink={whatsappLink}
            audioWhatsAppLink={audioWhatsAppLink}
            calendarUrl={siteConfig.contact.calendarUrl}
            emailLink={emailLink}
          />

          <p className="mt-8 text-xs leading-6 text-muted-foreground">
            {siteConfig.compliance.informational} {siteConfig.compliance.ethics}
          </p>
        </section>

        <section id="area-rights-duties" className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-6 text-3xl text-foreground">Direitos e deveres nesta especialidade</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-5">
              <h3 className="mb-3 text-lg font-semibold text-emerald-900">Seus direitos</h3>
              <ul className="space-y-2 text-sm leading-7 text-emerald-900/90">
                {(areaRightsAndDuties[areaData.id]?.rights ?? [
                  'Receber orientação clara sobre possibilidades e próximos passos.',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-amber-50/40 p-5">
              <h3 className="mb-3 text-lg font-semibold text-amber-900">Seus deveres</h3>
              <ul className="space-y-2 text-sm leading-7 text-amber-900/90">
                {(areaRightsAndDuties[areaData.id]?.duties ?? [
                  'Compartilhar informações e documentos de forma completa e fiel aos fatos.',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="area-common-cases" className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-6 text-3xl text-foreground">Casos comuns que atendemos nesta área</h2>
          <p className="mb-5 text-sm leading-7 text-foreground/75">
            Estes exemplos servem para ajudar você a identificar rapidamente se sua situação se encaixa nesta especialidade.
          </p>
          <ul className="space-y-2 text-sm leading-7 text-foreground/85">
            {(areaCommonCases[areaData.id] ?? [
              'Situações que exigem análise jurídica individualizada e orientação estratégica.',
            ]).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="area-faq" className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground mb-6">Perguntas frequentes sobre {areaData.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {areaData.faq.map((item, idx) => (
              <AccordionItem key={item.question} value={String(idx)}>
                <AccordionTrigger className="text-base font-semibold text-foreground bg-secondary/35 rounded-2xl px-4 py-3">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-foreground/75 px-4 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="area-articles" className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground">Artigos relacionados</h2>

          {relatedArticles.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <article key={article.slug} className="rounded-2xl border border-border/70 bg-secondary/25 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/75">{article.categoryName}</p>
                  <h3 className="mt-2 text-lg text-foreground">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/75 line-clamp-3">{article.excerpt}</p>
                  <Link href={`/blog/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                    Ler artigo
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-foreground/75">
              Em breve, esta área contará com conteúdo editorial específico no blog. Enquanto isso, você pode acessar a
              biblioteca completa de artigos.
            </p>
          )}

          <Button asChild variant="outline" className="mt-6 rounded-full border-primary/20">
            <Link href="/blog">Ver todos os artigos</Link>
          </Button>
        </section>
      </div>
    </main>
  )
}
