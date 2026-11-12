'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Home,
  Stethoscope,
  Mic,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandEmblem } from '@/components/brand-emblem'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

const areaIcons: Record<string, typeof BriefcaseBusiness> = {
  trabalhista: BriefcaseBusiness,
  educacional: Building2,
  familia: HeartHandshake,
  consumidor: ShieldCheck,
  imobiliario: Home,
  saude: Stethoscope,
}

type AudienceFilter = 'ALL' | 'PF' | 'PJ'

export function ServicesSection() {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>('ALL')

  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Estou na página inicial do site e prefiro enviar uma mensagem de áudio para explicar meu caso.',
  )

  const filteredAreas = siteConfig.areas.filter((area) => {
    if (audienceFilter === 'ALL') return true
    if (audienceFilter === 'PF') {
      return area.interactiveScenarios.some((s) => s.profile === 'PF')
    }
    return area.interactiveScenarios.some((s) => s.profile === 'PJ')
  })

  return (
    <section id="eixos" className="border-b border-border bg-background px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>Eixos de Atuação Especializada</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            6 Eixos Jurídicos sob Coordenação da Dra. Bruna Dourado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Selecione o seu perfil — <strong>Pessoa Física (PF)</strong> ou <strong>Empresa / Instituição de Ensino (PJ)</strong> — e acesse o eixo correspondente para ver escopo, prazos legais e atendimento direto.
          </p>

          {/* Filtro Rápido PF vs PJ */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 p-1.5">
            <button
              type="button"
              onClick={() => setAudienceFilter('ALL')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                audienceFilter === 'ALL'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Todos os 6 Eixos
            </button>
            <button
              type="button"
              onClick={() => setAudienceFilter('PF')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                audienceFilter === 'PF'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              Para Você e Família (PF)
            </button>
            <button
              type="button"
              onClick={() => setAudienceFilter('PJ')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                audienceFilter === 'PJ'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Para Empresas e Escolas (PJ)
            </button>
          </div>
        </div>

        {/* Grid dos Cards de Especialidades com botão "Conhecer Eixo" */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAreas.map((area) => {
            const Icon = areaIcons[area.id] ?? BriefcaseBusiness

            return (
              <article
                key={area.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {area.targetAudienceBadge}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {area.eyebrow}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-border pt-4">
                    {area.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/85 sm:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-2">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-primary py-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Link href={area.route}>
                      <span>Conhecer Eixo</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Faixa de Apoio Direto / Áudio */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/30 bg-secondary/70 p-6 sm:flex-row sm:p-8">
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Dúvida sobre qual eixo escolher?
            </p>
            <h3 className="mt-1.5 font-serif text-2xl font-bold text-foreground">
              Fale diretamente com a Dra. Bruna Dourado, sem triagem robótica.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Você pode enviar uma mensagem de áudio no WhatsApp explicando o contexto com suas próprias palavras (seja Pessoa Física ou Empresa/Escola). A Doutora avaliará pessoalmente o enquadramento.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="shrink-0 rounded-lg border-2 border-primary bg-background px-6 py-6 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
              <Mic className="mr-2 h-4 w-4 text-primary" />
              Prefiro enviar mensagem de áudio no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
