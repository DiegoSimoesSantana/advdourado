'use client'

import { useState } from 'react'
import {
  MessageCircle,
  Mic,
  Globe,
  BookOpen,
  Scale,
  Mail,
  MapPin,
  ArrowRight,
  Linkedin,
  UserPlus,
  Share2,
} from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { trackEvent } from '@/lib/analytics'
import { SafePortraitImage } from '@/components/safe-portrait-image'

export default function LinksPageContent() {
  const [copied, setCopied] = useState(false)

  const instagramWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelos canais oficiais e gostaria de iniciar meu atendimento jurídico.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelos canais oficiais e prefiro explicar meu caso enviando uma mensagem de áudio.',
  )

  const handleLinkClick = (destination: string) => {
    trackEvent('instagram_links_click', {
      destination,
      timestamp: new Date().toISOString(),
    })
  }

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Dra. Bruna Dourado — Advocacia e Assessoria Jurídica (OAB/BA 71507)',
          text: 'Canais oficiais de atendimento da Dra. Bruna Dourado em Salvador/BA.',
          url: window.location.href,
        })
        trackEvent('instagram_links_click', { destination: 'share_native' })
      } catch {
        // User cancelled share
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      trackEvent('instagram_links_click', { destination: 'share_copy' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const links = [
    {
      title: 'Atendimento Direto no WhatsApp',
      description: `Falar com a Dra. Bruna • ${siteConfig.contact.phoneShort}`,
      url: instagramWhatsAppLink,
      icon: MessageCircle,
      isPrimary: true,
      id: 'whatsapp_direct',
    },
    {
      title: 'Prefiro Enviar Mensagem de Áudio',
      description: 'Explique seu caso falando diretamente no WhatsApp',
      url: audioWhatsAppLink,
      icon: Mic,
      isPrimary: false,
      id: 'whatsapp_audio',
    },
    {
      title: 'Conhecer os 6 Eixos de Atuação',
      description: 'Trabalhista, Educacional B2B, Família, Consumidor, Imóveis e Saúde',
      url: '/#eixos',
      icon: Scale,
      isPrimary: false,
      id: 'eixos',
    },
    {
      title: 'Visitar Site Institucional Completo',
      description: 'advdourado.com.br',
      url: '/',
      icon: Globe,
      isPrimary: false,
      id: 'website',
    },
    {
      title: 'Artigos Jurídicos Informativos',
      description: 'Orientações sobre direitos, deveres e prazos',
      url: '/blog',
      icon: BookOpen,
      isPrimary: false,
      id: 'blog',
    },
    {
      title: 'Perfil Oficial no LinkedIn',
      description: 'Trajetória acadêmica e institucional',
      url: siteConfig.social.linkedin,
      icon: Linkedin,
      isPrimary: false,
      id: 'linkedin',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header - Perfil */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-primary shadow-md">
            <SafePortraitImage
              src="/images/foto-perfil.jpg"
              alt="Dra. Bruna Dourado (OAB/BA 71507)"
              fill
              sizes="96px"
              className="object-cover object-top"
              priority
            />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground leading-tight">
            Dra. Bruna Dourado
          </h1>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mt-1">
            Advogada • {siteConfig.brand.oab}
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mt-3 leading-relaxed">
            Advocacia Especializada em Salvador/BA. Atendimento e condução direta no escritório da Dra. Bruna Dourado, sem robôs.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3.5 mb-8">
          {links.map((link) => {
            const Icon = link.icon
            const isExternal = link.url.startsWith('http')

            return (
              <a
                key={link.id}
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => handleLinkClick(link.id)}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                  link.isPrimary
                    ? 'bg-primary border-primary text-primary-foreground shadow-md hover:opacity-95'
                    : 'bg-card hover:bg-secondary/60 border-border text-card-foreground shadow-xs hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2.5 rounded-lg ${
                      link.isPrimary
                        ? 'bg-black/15 text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-bold leading-tight">{link.title}</h2>
                    <p
                      className={`text-xs mt-0.5 ${
                        link.isPrimary ? 'text-primary-foreground/85' : 'text-muted-foreground'
                      }`}
                    >
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                    link.isPrimary ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
                  }`}
                />
              </a>
            )
          })}
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="/bruna-dourado.vcf"
            download="Dra_Bruna_Dourado.vcf"
            onClick={() => handleLinkClick('vcard_download')}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-semibold text-xs transition-all shadow-xs"
          >
            <UserPlus className="w-4 h-4 text-primary" />
            Salvar Contato
          </a>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-semibold text-xs transition-all shadow-xs"
          >
            <Share2 className="w-4 h-4 text-primary" />
            {copied ? 'Copiado!' : 'Compartilhar'}
          </button>
        </div>

        {/* Card de Contato Rápido */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-xs space-y-3 text-sm mb-6">
          <h3 className="font-serif text-base font-bold text-foreground border-b border-border pb-2">
            Contato Institucional
          </h3>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              onClick={() => handleLinkClick('email')}
              className="text-muted-foreground hover:text-primary transition-colors text-xs"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground leading-relaxed text-xs">
              {siteConfig.contact.city}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Ético OAB */}
      <div className="text-center mt-6 max-w-md mx-auto">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.brand.legalName}
        </p>
        <p className="text-[11px] text-primary font-semibold mt-1 uppercase tracking-wider">
          {siteConfig.brand.oab} • Provimento nº 205/2021 OAB
        </p>
      </div>
    </div>
  )
}
