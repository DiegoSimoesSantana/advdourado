'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function ContactFooterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const directWhatsAppLink = createWhatsAppLink(
    'Olá, vim pelo site da ADVDourado e gostaria de solicitar atendimento jurídico sigiloso.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, prefiro explicar meu caso por áudio. Gostaria de iniciar a triagem com a Dra. Bruna Dourado.',
  )

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappMessage = `Olá, vim pelo site da ADVDourado.
Meu nome é ${formData.name}
WhatsApp: ${formData.whatsapp}
Mensagem breve: ${formData.message}`

    try {
      await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: '',
          phone: formData.whatsapp,
          area: '',
          subject: 'Solicitação de atendimento sigiloso',
          message: formData.message,
        }),
      })
    } catch {
      // Mantemos o fluxo de captação por WhatsApp mesmo se o banco estiver indisponível.
    } finally {
      window.open(createWhatsAppLink(whatsappMessage), '_blank')
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="bg-foreground text-white">
      <div className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#b89052]">Contato direto</p>
              <h2 className="mb-6 font-serif text-3xl md:text-5xl">
                Atendimento reservado, com acesso simples e objetivo.
              </h2>
              <p className="mb-8 max-w-xl text-justify text-lg leading-8 text-white/88">
                Escolha o canal mais conveniente para iniciar o contato. O atendimento presencial em Salvador ocorre sob agendamento prévio.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 rounded-sm border border-white/14 bg-white/6 p-5">
                  <div className="mt-1 flex-shrink-0 rounded-sm bg-[#b89052]/15 p-3">
                    <Mail className="w-5 h-5 text-[#b89052]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm uppercase tracking-[0.18em] text-white/65">E-mail</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-lg text-white transition hover:text-[#d4b07a]">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-sm border border-white/14 bg-white/6 p-5">
                  <div className="mt-1 flex-shrink-0 rounded-sm bg-[#b89052]/15 p-3">
                    <Phone className="w-5 h-5 text-[#b89052]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm uppercase tracking-[0.18em] text-white/65">WhatsApp</p>
                    <a href={directWhatsAppLink} target="_blank" rel="noopener noreferrer" className="text-lg text-white transition hover:text-[#d4b07a]">
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-sm border border-white/14 bg-white/6 p-5">
                  <div className="mt-1 flex-shrink-0 rounded-sm bg-[#b89052]/15 p-3">
                    <MapPin className="w-5 h-5 text-[#b89052]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm uppercase tracking-[0.18em] text-white/65">Escritório em Salvador</p>
                    <p className="text-lg text-white/92">{siteConfig.contact.address}</p>
                    <p className="mt-2 text-justify text-sm leading-6 text-white/72">Atendimento presencial exclusivamente sob agendamento.</p>
                  </div>
                </div>

                <div className="rounded-sm border border-white/14 bg-white/6 p-5 text-justify text-sm leading-7 text-white/84">
                  <p>{siteConfig.compliance.informational}</p>
                  <p className="mt-3 text-white/74">{siteConfig.compliance.privacy}</p>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-white/10 bg-white px-6 py-7 text-slate-900 shadow-sm sm:px-8 sm:py-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b5e35]">Mensagem inicial</p>
                  <h3 className="mt-3 font-serif text-2xl text-slate-900">Descreva seu caso e receba retorno para agendamento.</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b89052]/40"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b89052]/40"
                      placeholder="(71) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Mensagem breve</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full resize-none rounded-sm border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b89052]/40"
                      placeholder="Descreva brevemente a demanda para orientar o primeiro contato."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-sm bg-[#0f172a] py-3 text-white font-semibold hover:bg-[#0f172a]/92"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar dados e abrir WhatsApp'}
                  </Button>

                  <a
                    href={audioWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-sm border border-emerald-600 px-4 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Prefiro enviar áudio no WhatsApp
                  </a>

                  <a
                    href={siteConfig.contact.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-sm border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Solicitar reunião
                  </a>

                  <p className="text-justify text-xs leading-6 text-slate-600">
                    O envio deste formulário organiza o contato inicial e não configura contratação automática nem
                    consultoria jurídica imediata.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 px-4 md:px-8 py-12 bg-foreground/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{siteConfig.brand.name}</h3>
              <p className="text-white/82 text-sm">
                {siteConfig.brand.title}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-white/82">
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="/sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Áreas</h4>
              <ul className="space-y-2 text-sm text-white/82">
                {siteConfig.areas.map((area) => (
                  <li key={area.id}><a href={`/areas/${area.id}`} className="hover:text-white transition-colors">{area.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/82">
                <li><span>{siteConfig.compliance.informational}</span></li>
                <li><span>{siteConfig.compliance.ethics}</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 text-sm text-white/76 md:mb-0">
              © 2026 {siteConfig.brand.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/76">
              <span>OAB/BA:</span>
              <span className="font-semibold">71507</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/76">
              Desenvolvido por <a href="https://ssantana.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">ssantana.com.br</a>
              <span className="mx-1">|</span>
              <span>versão {new Date().getFullYear()}{(new Date().getMonth()+1).toString().padStart(2,'0')}{new Date().getDate().toString().padStart(2,'0')}{new Date().getHours().toString().padStart(2,'0')}{new Date().getMinutes().toString().padStart(2,'0')}</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
