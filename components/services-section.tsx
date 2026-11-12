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
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandEmblem } from '@/components/brand-emblem'
import { siteConfig } from '@/lib/site-config'

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

  const filteredAreas = siteConfig.areas.filter((area) => {
    if (audienceFilter === 'ALL') return true
    if (audienceFilter === 'PF') {
      return area.interactiveScenarios.some((s) => s.profile === 'PF')
    }
    return area.interactiveScenarios.some((s) => s.profile === 'PJ')
  })

  return (
    <section id="eixos" className="border-b border-border bg-background px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>Especialidades Jurídicas</span>
          </div>

          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            6 Áreas de Atuação sob Coordenação Direta
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Filtre pelo seu perfil e escolha a área para consultar situações comuns, prazos legais e iniciar sua triagem.
          </p>

          {/* Filtro PF vs PJ com Tipografia Ampliada */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 p-2">
            <button
              type="button"
              onClick={() => setAudienceFilter('ALL')}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold transition sm:text-base ${
                audienceFilter === 'ALL'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Todas as Áreas (6)
            </button>
            <button
              type="button"
              onClick={() => setAudienceFilter('PF')}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition sm:text-base ${
                audienceFilter === 'PF'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              Para Você e Família (PF)
            </button>
            <button
              type="button"
              onClick={() => setAudienceFilter('PJ')}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition sm:text-base ${
                audienceFilter === 'PJ'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Para Empresas e Escolas (PJ)
            </button>
          </div>
        </div>

        {/* Grid de Cards Enxutos: Título Direto + Máximo 2 Linhas + Botão "Explorar Área" */}
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredAreas.map((area) => {
            const Icon = areaIcons[area.id] ?? BriefcaseBusiness

            return (
              <article
                key={area.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {area.targetAudienceBadge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                    {area.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>
                </div>

                <div className="mt-8 pt-2">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-primary py-6 text-base font-bold text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Link href={area.route}>
                      <span>Explorar Área</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
