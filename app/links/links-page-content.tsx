'use client'

import Image from 'next/image'
import { MessageCircle, Calendar, Globe, BookOpen, Scale, Mail, MapPin, ArrowRight } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { trackEvent } from '@/lib/analytics'

export default function LinksPageContent() {
  const instagramWhatsAppLink = createWhatsAppLink(
    'Olá Dra. Bruna, vim pelo seu Instagram e gostaria de tirar uma dúvida sobre atendimento jurídico.'
  )

  const handleLinkClick = (destination: string) => {
    trackEvent('instagram_links_click', {
      destination,
      timestamp: new Date().toISOString(),
    })
  }

  const links = [
    {
      title: 'Falar no WhatsApp',
      description: 'Iniciar atendimento e tirar dúvidas',
      url: instagramWhatsAppLink,
      icon: MessageCircle,
      isPrimary: true,
      id: 'whatsapp'
    },
    {
      title: 'Agendar Consulta Jurídica',
      description: 'Escolha o melhor dia e horário',
      url: siteConfig.contact.calendarUrl,
      icon: Calendar,
      isPrimary: false,
      id: 'calendar'
    },
    {
      title: 'Visitar Nosso Site Oficial',
      description: 'Conheça nossa estrutura e atuação',
      url: '/',
      icon: Globe,
      isPrimary: false,
      id: 'website'
    },
    {
      title: 'Blog & Dicas Jurídicas',
      description: 'Artigos explicativos sobre seus direitos',
      url: '/blog',
      icon: BookOpen,
      isPrimary: false,
      id: 'blog'
    },
    {
      title: 'Áreas de Atuação',
      description: 'Conheça nossas especialidades',
      url: '/areas',
      icon: Scale,
      isPrimary: false,
      id: 'areas'
    }
  ]

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-slate-800 flex flex-col justify-between py-12 px-4 sm:px-6">
      {/* Container Principal */}
      <div className="w-full max-w-md mx-auto">
        
        {/* Header - Perfil */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#b89052] shadow-md transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/foto-perfil.jpg"
              alt="Dra. Bruna Dourado"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
            Dra. Bruna Dourado
          </h1>
          <p className="text-xs uppercase tracking-[0.18em] text-[#b89052] font-semibold mt-1">
            Advogada • OAB/BA 71507
          </p>
          <p className="text-sm text-slate-600 max-w-xs mt-3 leading-relaxed">
            Atendimento jurídico estratégico e humanizado em Salvador/BA para proteger seus direitos.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4 mb-10">
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
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  link.isPrimary
                    ? 'bg-[#25D366] hover:bg-[#1ebe57] border-[#25D366] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#b89052]/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${
                    link.isPrimary 
                      ? 'bg-white/15 text-white' 
                      : 'bg-[#b89052]/10 text-[#b89052]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-semibold leading-tight">
                      {link.title}
                    </h2>
                    <p className={`text-xs mt-0.5 ${
                      link.isPrimary ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                  link.isPrimary ? 'text-white/80' : 'text-slate-400 group-hover:text-[#b89052]'
                }`} />
              </a>
            )
          })}
        </div>

        {/* Card de Contato Rápido */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 text-sm mb-6">
          <h3 className="font-serif text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            Contatos do Escritório
          </h3>
          
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#b89052] flex-shrink-0" />
            <a 
              href={`mailto:${siteConfig.contact.email}`} 
              onClick={() => handleLinkClick('email')}
              className="text-slate-600 hover:text-[#b89052] transition-colors overflow-hidden text-ellipsis"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#b89052] flex-shrink-0" />
            <span className="text-slate-600 leading-relaxed text-xs">
              {siteConfig.contact.address}
            </span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.brand.name}
        </p>
        <p className="text-[10px] text-slate-400/80 mt-1 uppercase tracking-wider">
          OAB/BA 71507 • Advocacia Ética e Transparente
        </p>
      </div>
    </div>
  )
}
