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
  const [name, setName] = useState('')
  const [profile, setProfile] = useState<'PF' | 'PJ'>(
    areaId === 'educacional' ? 'PJ' : defaultProfile,
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
      setProfile(areaId === 'educacional' ? 'PJ' : defaultProfile)
    }
  }, [defaultProfile, areaId])

  const audioWhatsAppLink = createWhatsAppLink(
    [
      'Olá, Dra. Bruna Dourado.',
      `Vim pelo eixo de *${areaTitle}* no site (${originPath}).`,
      `Perfil: *${profile === 'PJ' ? 'Empresa / Instituição (PJ)' : 'Pessoa Física (PF)'}*`,
      'Prefiro explicar o contexto do meu caso enviando uma *mensagem de áudio* por aqui.',
      'Aguardo sua sinalização para enviar o áudio com sigilo.',
    ].join('\n'),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const profileLabel =
      profile === 'PJ' ? 'Pessoa Jurídica (Empresa / Instituição)' : 'Pessoa Física (Individual / Família)'

    const structuredReport = [
      `*RELATÓRIO DE TRIAGEM INICIAL — SITE OFICIAL*`,
      `• *Eixo:* ${areaTitle}`,
      `• *Perfil:* ${profileLabel}`,
      `• *Nome / Instituição:* ${name.trim()}`,
      `• *Preferência de Retorno:* ${returnPreference}${phone.trim() ? ` (${phone.trim()})` : ''}`,
      `• *Resumo do Caso:* ${summary.trim()}`,
      `• *Origem:* ${originPath}`,
      `---`,
      `Olá, Dra. Bruna Dourado. Enviei os dados acima pelo formulário do site para sua análise inicial.`,
    ].join('\n')

    sendGTMEvent('triage_form_submit', {
      area_id: areaId,
      area_title: areaTitle,
      client_profile: profile,
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
          area: `${areaTitle} (${profile})`,
          subject: `Triagem [${profile}] (${areaTitle}) — Retorno via ${returnPreference}`,
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
    <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <div className="mb-6 border-b border-border pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Atendimento Direto com a Dra. Bruna Dourado (Sem Robôs)
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Atendimento PF e PJ • {siteConfig.brand.oab}
          </span>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Relatório Rápido para Triagem no WhatsApp
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Selecione seu perfil (PF ou PJ) e preencha os campos abaixo para abrir o WhatsApp oficial ({siteConfig.contact.phoneDisplay}) com seu relato formatado, ou utilize o botão de mensagem de áudio ao lado.
        </p>
      </div>

      <div className={compact ? 'space-y-6' : 'grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seletor de Perfil PF vs PJ */}
          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Perfil de Atendimento *
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setProfile('PF')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                  profile === 'PF'
                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                    : 'border-border bg-input text-foreground hover:border-primary/50'
                }`}
              >
                <User className="h-4 w-4 shrink-0" />
                <span>Para Mim / Família (PF)</span>
              </button>
              <button
                type="button"
                onClick={() => setProfile('PJ')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                  profile === 'PJ'
                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                    : 'border-border bg-input text-foreground hover:border-primary/50'
                }`}
              >
                <Building2 className="h-4 w-4 shrink-0" />
                <span>Empresa / Escola (PJ)</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor={`triage-name-${areaId}`} className="mb-1.5 block text-sm font-medium text-foreground">
              1. {profile === 'PJ' ? 'Seu Nome e Nome da Empresa / Instituição *' : 'Seu Nome Completo *'}
            </label>
            <input
              id={`triage-name-${areaId}`}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                profile === 'PJ'
                  ? 'Ex.: Carlos Mendes — Diretor do Colégio / Empresa X'
                  : 'Ex.: Maria Silva'
              }
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                2. Preferência de Retorno *
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setReturnPreference('WhatsApp')}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
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
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
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
              <label htmlFor={`triage-phone-${areaId}`} className="mb-1.5 block text-sm font-medium text-foreground">
                Telefone / WhatsApp (opcional)
              </label>
              <input
                id={`triage-phone-${areaId}`}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(71) 99999-9999"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`triage-summary-${areaId}`} className="mb-1.5 block text-sm font-medium text-foreground">
              3. Resumo do Caso *
            </label>
            <textarea
              id={`triage-summary-${areaId}`}
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={
                profile === 'PJ'
                  ? `Descreva a demanda preventiva, contratual ou contenciosa da sua empresa/instituição em ${areaTitle}...`
                  : `Descreva brevemente o contexto da sua situação em ${areaTitle} (datas principais, documentos ou dúvida)...`
              }
              className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary py-6 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Formatando Relatório...' : 'Compilar Relatório e Abrir WhatsApp da Doutora'}
          </Button>
        </form>

        {/* Coluna Lateral: Opção de Áudio + Avisos OAB e LGPD */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-primary/30 bg-secondary/60 p-5">
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mic className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-xl font-bold text-foreground">
              Prefere explicar por áudio?
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Muitas situações jurídicas — pessoais ou empresariais — são mais fáceis de explicar falando do que digitando. Clique abaixo para abrir o WhatsApp da Dra. Bruna Dourado e enviar seu áudio.
            </p>
            <a
              href={audioWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                sendGTMEvent('audio_cta_click', {
                  area_id: areaId,
                  area_title: areaTitle,
                  client_profile: profile,
                  page_path: originPath,
                })
              }
              className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border-2 border-primary bg-background px-4 py-3.5 text-center text-sm font-bold text-foreground shadow-xs transition hover:bg-primary hover:text-primary-foreground"
            >
              <Mic className="h-4 w-4 shrink-0 text-primary" />
              <span>Prefiro enviar mensagem de áudio no WhatsApp</span>
            </a>
          </div>

          <div className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
            <p className="flex items-start gap-2 font-medium text-foreground/90">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>Sigilo Profissional (Art. 34 do Estatuto da OAB) e Proteção LGPD</span>
            </p>
            <p>{siteConfig.compliance.contractDisclaimer}</p>
            <p>{siteConfig.compliance.informational}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
