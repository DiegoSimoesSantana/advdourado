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

  const reportLines = [
    `*RELATÓRIO DE TRIAGEM INICIAL — SITE OFICIAL*`,
    `• *Área:* ${areaTitle}`,
    ...(isLaborAxis
      ? [`• *Atendimento:* ${profile === 'PJ' ? 'Empresa / RH' : 'Trabalhador(a)'}`]
      : []),
    `• *Nome:* ${name.trim() || '(seu nome)'}`,
    `• *Preferência de Retorno:* ${returnPreference}${phone.trim() ? ` (${phone.trim()})` : ''}`,
    `• *Resumo do Caso:* ${summary.trim() || '(resumo da sua necessidade jurídica)'}`,
    `• *Origem:* ${originPath}`,
    `---`,
    `Olá, Dra. Bruna Dourado. Enviei os dados acima pelo formulário do site para sua análise inicial.`,
  ]

  const structuredReport = reportLines.join('\n')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

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
    <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8">
      <div className="mb-8 w-full max-w-full min-w-0 border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="break-words">
              Atendimento Direto com a Dra. Bruna Dourado (Sem Robôs)
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {siteConfig.brand.oab} • Salvador/BA
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-bold break-words text-foreground sm:text-3xl">
          Relatório Rápido para Triagem no WhatsApp
        </h3>
        <p className="mt-2 text-base leading-relaxed break-words text-muted-foreground sm:text-lg">
          Preencha os campos abaixo para abrir o WhatsApp oficial ({siteConfig.contact.phoneDisplay}) com seu relato pronto, ou envie uma mensagem de áudio.
        </p>
      </div>

      <div
        className={
          compact
            ? 'w-full max-w-full min-w-0 space-y-6'
            : 'grid w-full max-w-full min-w-0 gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start'
        }
      >
        <form onSubmit={handleSubmit} className="w-full max-w-full min-w-0 space-y-5">
          {/* Seletor exibido apenas em Direito Trabalhista */}
          {isLaborAxis && (
            <div className="w-full max-w-full min-w-0">
              <span className="mb-2 block text-base font-semibold text-foreground">
                Você busca atendimento como:
              </span>
              <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setProfile('PF')}
                  className={`flex w-full max-w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-all sm:px-4 sm:text-base ${
                    profile === 'PF'
                      ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span className="break-words">Trabalhador(a)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfile('PJ')}
                  className={`flex w-full max-w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-all sm:px-4 sm:text-base ${
                    profile === 'PJ'
                      ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="break-words">Empresa / RH</span>
                </button>
              </div>
            </div>
          )}

          <div className="w-full max-w-full min-w-0">
            <label htmlFor={`triage-name-${areaId}`} className="mb-2 block text-base font-semibold break-words text-foreground">
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
              className="w-full max-w-full min-w-0 rounded-xl border border-border bg-input px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="grid w-full max-w-full min-w-0 gap-4 sm:grid-cols-2">
            <div className="w-full max-w-full min-w-0">
              <span className="mb-2 block text-base font-semibold text-foreground">
                2. Preferência de Retorno *
              </span>
              <div className="grid w-full max-w-full min-w-0 grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setReturnPreference('WhatsApp')}
                  className={`flex w-full max-w-full min-w-0 items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
                    returnPreference === 'WhatsApp'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReturnPreference('Ligação')}
                  className={`flex w-full max-w-full min-w-0 items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
                    returnPreference === 'Ligação'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-input text-foreground hover:border-primary/50'
                  }`}
                >
                  <PhoneCall className="h-4 w-4 shrink-0" />
                  <span className="truncate">Ligação</span>
                </button>
              </div>
            </div>

            <div className="w-full max-w-full min-w-0">
              <label htmlFor={`triage-phone-${areaId}`} className="mb-2 block text-base font-semibold text-foreground">
                Telefone / WhatsApp (opcional)
              </label>
              <input
                id={`triage-phone-${areaId}`}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(71) 99999-9999"
                className="w-full max-w-full min-w-0 rounded-xl border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="w-full max-w-full min-w-0">
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
              className="w-full max-w-full min-w-0 resize-none rounded-xl border border-border bg-input px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Caixa de Pré-visualização da Mensagem Gerada (Responsiva sem estouro horizontal) */}
          <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-border bg-secondary/40 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Pré-visualização do Relatório para o WhatsApp
            </p>
            <div className="w-full max-w-full min-w-0 overflow-hidden text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap break-words">
              {structuredReport}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-auto w-full max-w-full min-w-0 rounded-xl bg-primary px-4 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:py-5"
          >
            <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
            <span>
              {isSubmitting ? 'Formatando Relatório...' : 'Enviar Relatório no WhatsApp'}
            </span>
          </Button>
        </form>

        {/* Coluna Lateral: Opção de Áudio + Avisos OAB e LGPD */}
        <div className="flex w-full max-w-full min-w-0 flex-col justify-between space-y-5 overflow-hidden rounded-2xl border border-primary/30 bg-secondary/60 p-5 sm:p-7">
          <div className="w-full max-w-full min-w-0">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Mic className="h-6 w-6" />
            </div>
            <h4 className="font-serif text-xl font-bold break-words text-foreground sm:text-2xl">
              Prefere explicar por áudio?
            </h4>
            <p className="mt-3 text-base leading-relaxed break-words text-muted-foreground">
              Clique abaixo para abrir o WhatsApp do escritório da Dra. Bruna Dourado e explicar sua demanda enviando uma mensagem de áudio com total sigilo.
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
              className="mt-5 flex h-auto w-full max-w-full min-w-0 items-center justify-center gap-2.5 rounded-xl border-2 border-primary bg-background px-4 py-4 text-center text-sm font-bold leading-snug whitespace-normal break-words text-foreground shadow-xs transition hover:bg-primary hover:text-primary-foreground sm:px-5 sm:text-base"
            >
              <Mic className="h-5 w-5 shrink-0 text-primary" />
              <span>Prefiro enviar mensagem de áudio no WhatsApp</span>
            </a>
          </div>

          <div className="w-full max-w-full min-w-0 border-t border-border pt-5 text-sm leading-relaxed break-words text-muted-foreground space-y-2">
            <p className="flex items-start gap-2 font-semibold text-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="break-words">Sigilo Profissional (Art. 34 do Estatuto da OAB) e LGPD</span>
            </p>
            <p className="break-words">{siteConfig.compliance.contractDisclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
