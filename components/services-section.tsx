import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Home,
  Stethoscope,
  ShieldEllipsis,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const featuredAreas = [
  {
    id: 'trabalhista',
    title: 'Trabalhista (Empresa e Trabalhador)',
    eyebrow: 'Trabalhista',
    problem:
      'Análise de direitos e deveres para empresa e trabalhador, com foco em prevenção de passivo, organização documental e estratégia processual quando necessária.',
    highlights: [
      'Consultoria para empresas e RH',
      'Orientação a trabalhadores em verbas e jornada',
      'Condução técnica com linguagem clara e prazo definido',
    ],
    icon: BriefcaseBusiness,
  },
  {
    id: 'educacional',
    title: 'Educacional (Instituições de Ensino)',
    eyebrow: 'Escolas, cursos e faculdades',
    problem:
      'Atendimento voltado a instituições de ensino para contratos, prevenção de conflitos, políticas internas, formação de equipes e conformidade educacional.',
    highlights: [
      'Revisão de contratos educacionais',
      'Apoio em conflitos com responsáveis e rotinas institucionais',
      'Integração com Direito Digital e LGPD na rotina escolar',
    ],
    icon: Building2,
  },
  {
    id: 'digital',
    title: 'Direito Digital e LGPD',
    eyebrow: 'Proteção de dados e governança',
    problem:
      'Estruturação de protocolos para tratamento de dados, prevenção de incidentes digitais e adequação prática à LGPD com foco em operação real.',
    highlights: [
      'Mapeamento de riscos e plano de adequação em LGPD',
      'Resposta a incidentes e comunicação com titulares',
      'Treinamento de equipes para cultura de proteção de dados',
    ],
    icon: ShieldEllipsis,
  },
  {
    id: 'familia',
    title: 'Família e Divórcio Consensual',
    eyebrow: 'Acordos e reorganização familiar',
    problem:
      'Condução humanizada para acordos familiares, com foco em soluções consensuais, previsibilidade e preservação dos vínculos.',
    highlights: [
      'Divórcio consensual e acordos',
      'Guarda e alimentos com orientação prática',
      'Estrutura jurídica segura para formalização',
    ],
    icon: HeartHandshake,
  },
  {
    id: 'consumidor',
    title: 'Consumidor (com foco patrimonial)',
    eyebrow: 'Proteção do patrimônio pessoal',
    problem:
      'Atuação em cobranças indevidas, contratos abusivos e situações que afetam diretamente o patrimônio financeiro do cliente.',
    highlights: [
      'Fraudes e cobranças indevidas',
      'Revisão contratual em relações de consumo',
      'Medidas para reduzir perdas e recuperar valores',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'imoveis-inventario',
    title: 'Imóveis e Inventário Consensual',
    eyebrow: 'Apenas demandas consensuais',
    problem:
      'Suporte para contratos imobiliários e inventário extrajudicial quando há consenso entre as partes e necessidade de condução técnica segura.',
    highlights: [
      'Inventário consensual em cartório',
      'Acordos para partilha amigável',
      'Revisão de documentos imobiliários essenciais',
    ],
    icon: Home,
    href: '/areas/imoveis-inventario',
  },
  {
    id: 'planos-saude',
    title: 'Planos de Saúde (Beneficiário)',
    eyebrow: 'Defesa exclusiva do paciente',
    problem:
      'Atuação para beneficiários em negativas de cobertura, reajustes e urgências médicas, com triagem célere e encaminhamento estratégico.',
    highlights: [
      'Negativa de procedimento e exame',
      'Revisão de reajustes abusivos',
      'Apoio em situações urgentes',
    ],
    icon: Stethoscope,
  },
] as const

export function ServicesSection() {
  return (
    <section id="areas" className="bg-gradient-to-br from-[#f7f3eb] via-[#efe8dc] to-[#e7dece] px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#8a6a3d]">Áreas de Atuação</p>
          <h2 className="mb-5 text-4xl font-serif leading-tight text-slate-900 md:text-5xl">
            Escolha a especialidade e avance para o atendimento com a Dra. Bruna.
          </h2>
          <p className="max-w-xl text-justify text-lg leading-8 text-slate-800">
            Esta página institucional organiza seu caminho por área. Em cada especialidade, você entende direitos,
            deveres e opções reais de solução antes do contato final por WhatsApp, e-mail ou reunião.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link href="/sobre" className="inline-flex cursor-pointer items-center gap-2 font-semibold text-slate-800 underline decoration-[#b89052]/60 underline-offset-4 transition hover:text-[#8a6a3d]">
              Saiba mais sobre formação da Dra. Bruna
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contato" className="inline-flex cursor-pointer items-center gap-2 font-semibold text-slate-800 underline decoration-[#b89052]/60 underline-offset-4 transition hover:text-[#8a6a3d]">
              Ir para contato
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm">
            <div className="relative h-[320px] w-full">
              <Image
                src="/images/foto-perfil.jpg"
                alt="Advogada Bruna Dourado"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-slate-950/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                OAB/BA 71507
              </span>
            </div>
            <div className="border-t border-black/10 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-600">Condução estratégica</p>
              <p className="mt-2 text-justify text-base leading-7 text-slate-800">
                Primeiro contato e triagem conduzidos pela Dra. Bruna Dourado. Conforme o caso, especialistas associados atuam sob coordenação estratégica.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-black/10 bg-white/95 p-6 shadow-sm sm:p-8">
          <Accordion type="single" collapsible defaultValue={featuredAreas[0].id} className="w-full">
            {featuredAreas.map((area) => {
              const Icon = area.icon

              return (
                <AccordionItem key={area.id} value={area.id} className="border-black/10 py-1">
                  <AccordionTrigger className="cursor-pointer py-6 hover:no-underline">
                    <div className="flex items-start gap-4 text-left">
                      <div className="mt-1 rounded-sm border border-[#b89052]/25 bg-[#b89052]/10 p-3 text-[#8a6a3d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{area.eyebrow}</p>
                        <h3 className="mt-2 text-2xl font-serif text-slate-900">{area.title}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pl-[4.5rem] pr-10">
                    <div className="space-y-3">
                      {area.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3 border-l border-[#b89052]/45 pl-4 text-justify text-sm leading-7 text-slate-700">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#b89052]" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={area.href ?? `/areas/${area.id}`}
                      className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-[#8a6a3d]"
                    >
                      Saiba mais desta frente
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          <div className="mt-8 border-t border-black/10 pt-6 text-justify text-sm text-slate-700">
            Cada área possui um caminho interno de funil: explicação objetiva, direcionamento do caso e CTA de contato direto para início do atendimento.
            <div className="mt-3">
              <Link href="/areas" className="inline-flex cursor-pointer items-center gap-2 font-medium text-slate-800 underline decoration-[#b89052]/60 underline-offset-4 transition hover:text-[#8a6a3d]">
                Ver todas as especialidades
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-sm text-slate-700">
                Quer explorar conteúdos antes de decidir?
                <Link href="/blog" className="ml-1 cursor-pointer font-semibold text-slate-900 underline decoration-[#b89052]/60 underline-offset-4 transition hover:text-[#8a6a3d]">
                  Entrar no blog jurídico.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
