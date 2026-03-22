'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function ContactFooterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappMessage = `Olá, vim pelo site da ADVDourado.
Meu nome é ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Área: ${formData.area}
Assunto: ${formData.subject}
Relato inicial: ${formData.message}`

    try {
      await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Central de contato e triagem
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Use o formulário para organizar sua demanda e abrir o atendimento pelo WhatsApp com os dados básicos já
                estruturados.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-white/70">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">WhatsApp</p>
                    <p className="text-white/70">{siteConfig.contact.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Atendimento</p>
                    <p className="text-white/70">Online em todo o Brasil e presencial sob agendamento em Salvador/BA</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
                  <p>{siteConfig.compliance.informational}</p>
                  <p className="mt-3">{siteConfig.compliance.privacy}</p>
                </div>
              </div>
            </div>

            <div>
              <Card className="p-8 bg-white/10 border-white/20">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Seu Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Seu E-mail</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="(71) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Área de interesse</label>
                      <select
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="" className="bg-foreground">Selecione a área</option>
                        {siteConfig.areas.map((area) => (
                          <option key={area.id} value={area.title} className="bg-foreground">
                            {area.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Resumo do tema"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Relato inicial</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Conte o contexto básico do seu caso para agilizar a triagem."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar e abrir WhatsApp'}
                  </Button>

                  <p className="text-xs leading-6 text-white/60">
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
              <p className="text-white/70 text-sm">
                {siteConfig.brand.title}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="/sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Áreas</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {siteConfig.areas.map((area) => (
                  <li key={area.id}><a href={`/areas/${area.id}`} className="hover:text-white transition-colors">{area.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><span>{siteConfig.compliance.informational}</span></li>
                <li><span>{siteConfig.compliance.ethics}</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60 mb-4 md:mb-0">
              © 2026 {siteConfig.brand.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>OAB/BA:</span>
              <span className="font-semibold">71507</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
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
