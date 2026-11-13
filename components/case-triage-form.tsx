'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MessageCircle, ShieldCheck, Lock, PhoneCall, User, Building2 } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { sendGTMEvent } from '@/lib/gtm'

type CaseTriageFormProps = {
  areaId?: string
  areaTitle?: string
  originPath?: string
  compact?: boolean
  defaultProfile?: 'PF' | 'PJ'
  prefilledSummary?: string
}

export function CaseTriageForm({
  areaId = 'geral',
  areaTitle = 'Atendimento Geral',
  originPath = '/',
  compact = false,
  defaultProfile = 'PF',
  prefilledSummary = '',
}: CaseTriageFormProps) {
  const isLaborAxis = areaId === 'trabalhista'
  const isEducationAxis = areaId === 'educacional'

  const [name, setName] = useState('')
  const [profile, setProfile] = useState<'PF' | 'PJ'>(
    isEducationAxis ? 'PJ' : defaultProfile,
  )
  const [returnPreference, setReturnPreference] = useState<'WhatsApp' | 'Ligação'>('WhatsApp')
  const [phone, setPhone] = useState('')
  const [summary, setSummary] = useState(prefilledSummary)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (prefilledSummary) {
      setSummary(prefilledSummary)
    }
  }, [prefilledSummary])

  useEffect(() => {
    if (defaultProfile) {
      setProfile(isEducationAxis ? 'PJ' : defaultProfile)
    }
  }, [defaultProfile, isEducationAxis])

  const audioWhatsAppLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pela área de *${areaTitle}* no site (${originPath}).`,
      'Prefiro explicar o contexto do meu caso enviando uma *mensagem de áudio* por aqui.',
      'Aguardo sua sinalização para enviar o áudio com sigilo.',
    ].join('\n'),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const reportLines = [
      `*RELATÓRIO DE TRIAGEM INICIAL — SITE OFICIAL*`,
      `• *Área:* ${areaTitle}`,
      ...(isLaborAxis
        ? [`• *Atendimento:* ${profile === 'PJ' ? 'Empresa / RH' : 'Trabalhador(a)'}`]
        : []),
      `• *Nome:* ${name.trim()}`,
      `• *Preferência de Retorno:* ${returnPreference}${phone.trim() ? ` (${phone.trim()})` : ''}`,
      `• *Resumo do Caso:* ${summary.trim()}`,
      `• *Origem:* ${originPath}`,
      `---`,
      `Olá, Dra. Bruna Dourado. Enviei os dados acima pelo formulário do site para sua análise inicial.`,
    ]

    const structuredReport = reportLines.join('\n')

    sendGTMEvent('triage_form_submit', {
      area_id: areaId,
      area_title: areaTitle,
      return_preference: returnPreference,
      page_path: originPath,
    })

    try {
      await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: '',
          phone: phone.trim(),
          area: areaTitle,
          subject: `Triagem (${areaTitle}) — Retorno via ${returnPreference}`,
          message: summary.trim(),
        }),
      })
    } catch {
      // Continua para o WhatsApp mesmo se o endpoint de back-end estiver offline
    } finally {
      window.open(createWhatsAppLink(structuredReport), '_blank', 'noopener,noreferrer')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7 text-card-foreground shadow-sm sm:p-8">
      <div className="mb-8 border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" />
            Atendimento Direto com a Dra. Bruna Dourado (Sem Robôs)
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {siteConfig.brand.oab} • Salvador/BA
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Relatório Rápido para Triagem no WhatsApp
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          Preencha os campos abaixo para abrir o WhatsApp oficial ({siteConfig.contact.phoneDisplay}) com seu relato pronto, ou envie uma mensagem de áudio ao lado.
        </p>
      </div>

      <div className={compact ? 'space-y-6' : 'grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start'}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Seletor exibido apenas em Direito Trabalhista (onde há distinção natural Trabalhador vs Empresa/RH) */}
          {isLaborAxis && (
            <div>
              <span className="mb-2 block text-base font-semibold text-foreground">
                Você busca atendimento como:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProfile('PF')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-semibold transition-all ${
                    profile === 'PF'
                      ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span>Trabalhador(a)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfile('PJ')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-semibold transition-all ${
                    profile === 'PJ'
                      ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>Empresa / RH</span>
                </button>
              </div>
            </div>
          )}

          <div>
            <label htmlFor={`triage-name-${areaId}`} className="mb-2 block text-base font-semibold text-foreground">
              1. {isEducationAxis || (isLaborAxis && profile === 'PJ') ? 'Seu Nome e Instituição / Empresa *' : 'Seu Nome Completo *'}
            </label>
            <input
              id={`triage-name-${areaId}`}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                isEducationAxis
                  ? 'Ex.: Carlos Mendes — Diretor Escolar'
                  : 'Ex.: Maria Silva'
              }
              className="w-full rounded-xl border border-border bg-input px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-base font-semibold text-foreground">
                2. Preferência de Retorno *
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setReturnPreference('WhatsApp')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-semibold transition-colors ${
                    returnPreference === 'WhatsApp'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setReturnPreference('Ligação')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-semibold transition-colors ${
                    returnPreference === 'Ligação'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <PhoneCall className="h-4 w-4" />
                  Ligação
                </button>
              </div>
            </div>

            <div>
              <label htmlFor={`triage-phone-${areaId}`} className="mb-2 block text-base font-semibold text-foreground">
                Telefone / WhatsApp (opcional)
              </label>
              <input
                id={`triage-phone-${areaId}`}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(71) 99999-9999"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`triage-summary-${areaId}`} className="mb-2 block text-base font-semibold text-foreground">
              3. Resumo do Caso *
            </label>
            <textarea
              id={`triage-summary-${areaId}`}
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={`Descreva brevemente o contexto da sua necessidade em ${areaTitle} (datas principais, documentos ou dúvida)...`}
              className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-6 text-base font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Formatando Relatório...' : 'Compilar Relatório e Abrir WhatsApp da Doutora'}
          </Button>
        </form>

        {/* Coluna Lateral: Opção de Áudio + Avisos OAB e LGPD */}
        <div className="flex flex-col justify-between space-y-5 rounded-2xl border border-primary/30 bg-secondary/60 p-7">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Mic className="h-6 w-6" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-foreground">
              Prefere explicar por áudio?
            </h4>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Clique abaixo para abrir o WhatsApp da Dra. Bruna Dourado e explicar sua demanda enviando uma mensagem de áudio com total sigilo.
            </p>
            <a
              href={audioWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                sendGTMEvent('audio_cta_click', {
                  area_id: areaId,
                  area_title: areaTitle,
                  page_path: originPath,
                })
              }
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-primary bg-background px-5 py-4 text-center text-base font-bold text-foreground shadow-xs transition hover:bg-primary hover:text-primary-foreground"
            >
              <Mic className="h-5 w-5 shrink-0 text-primary" />
              <span>Enviar Mensagem de Áudio no WhatsApp</span>
            </a>
          </div>

          <div className="border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground space-y-2">
            <p className="flex items-start gap-2 font-semibold text-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Sigilo Profissional (Art. 34 do Estatuto da OAB) e LGPD</span>
            </p>
            <p>{siteConfig.compliance.contractDisclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
