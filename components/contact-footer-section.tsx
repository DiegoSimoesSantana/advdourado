import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, MessageCircle, Mic, ShieldCheck, Lock } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { BrandEmblem } from '@/components/brand-emblem'

export function ContactFooterSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelo site e gostaria de iniciar meu atendimento jurídico.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelo site e prefiro explicar o contexto da minha demanda enviando uma mensagem de áudio.',
  )

  return (
    <section
      id="contato"
      className="w-full max-w-full overflow-hidden border-t border-border bg-[#0a0a0a] px-4 py-16 text-[#faf9f6] sm:px-6 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl min-w-0">
        {/* Bloco Superior de Contato Direto */}
        <div className="mb-16 grid w-full max-w-full min-w-0 gap-8 overflow-hidden rounded-2xl border border-[#c5a880]/30 bg-[#121212] p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="w-full max-w-full min-w-0">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span className="break-words">Atendimento Direto • Sem Robôs</span>
            </span>
            <h2 className="mt-4 font-serif text-2xl font-bold leading-tight break-words text-[#faf9f6] sm:text-4xl">
              Converse Diretamente com a Dra. Bruna Dourado ({siteConfig.brand.oab})
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed break-words text-[#faf9f6]/80">
              Atendimento presencial em Salvador/BA (mediante agendamento) e digital para toda a Bahia e o Brasil. Inicie seu contato enviando um resumo por escrito ou uma mensagem de áudio.
            </p>

            <div className="mt-7 flex w-full max-w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-auto w-full max-w-full min-w-0 rounded-xl bg-[#c5a880] px-5 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-[#0a0a0a] hover:bg-[#9a7c56] hover:text-[#faf9f6] sm:w-auto sm:px-7 sm:py-5"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
                  <span>Falar no WhatsApp ({siteConfig.contact.phoneShort})</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto w-full max-w-full min-w-0 rounded-xl border-[#c5a880]/55 bg-transparent px-5 py-4 text-center text-base font-semibold leading-snug whitespace-normal break-words text-[#faf9f6] hover:bg-[#c5a880]/20 hover:text-[#faf9f6] sm:w-auto sm:px-6 sm:py-5"
              >
                <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                  <Mic className="mr-2 h-5 w-5 shrink-0 text-[#c5a880]" />
                  <span>Prefiro enviar mensagem de áudio no WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-full min-w-0 gap-4 sm:grid-cols-2">
            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4">
              <Phone className="h-5 w-5 text-[#c5a880]" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#faf9f6]/60">
                WhatsApp e Telefone
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-bold break-words text-[#faf9f6] hover:text-[#c5a880]"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>

            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4">
              <Mail className="h-5 w-5 text-[#c5a880]" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#faf9f6]/60">
                E-mail Institucional
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-1 block text-sm font-bold break-all text-[#faf9f6] hover:text-[#c5a880]"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4">
              <MapPin className="h-5 w-5 text-[#c5a880]" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#faf9f6]/60">
                Localização
              </p>
              <p className="mt-1 text-sm font-medium break-words text-[#faf9f6]">
                Salvador e Região Metropolitana — BA
              </p>
              <p className="text-xs break-words text-[#faf9f6]/65">Piatã, Salvador/BA</p>
            </div>

            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4">
              <Clock className="h-5 w-5 text-[#c5a880]" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#faf9f6]/60">
                Horário de Atendimento
              </p>
              <p className="mt-1 text-sm font-medium text-[#faf9f6]">Segunda a Sexta</p>
              <p className="text-xs text-[#faf9f6]/65">09h às 18h (com agendamento)</p>
            </div>
          </div>
        </div>

        {/* Rodapé Institucional */}
        <footer className="border-t border-white/15 pt-12">
          <div className="mb-10 grid w-full max-w-full min-w-0 gap-10 md:grid-cols-4">
            <div className="min-w-0 md:col-span-1">
              <div className="flex items-center gap-3">
                <BrandEmblem size="md" />
                <div className="min-w-0">
                  <h4 className="font-serif text-lg font-bold text-[#faf9f6]">
                    {siteConfig.brand.shortName}
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
                    {siteConfig.brand.oab}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed break-words text-[#faf9f6]/75">
                Escritório de advocacia especializada sediado em Salvador/BA. Atendimento humano, análise e condução jurídica realizados diretamente no escritório da Dra. Bruna Dourado.
              </p>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 font-serif text-base font-bold text-[#c5a880]">
                Áreas de Atuação
              </h4>
              <ul className="space-y-2.5 text-sm text-[#faf9f6]/80">
                {siteConfig.areas.map((area) => (
                  <li key={area.id}>
                    <Link href={area.route} className="transition hover:text-[#c5a880]">
                      {area.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 font-serif text-base font-bold text-[#c5a880]">
                Navegação Institucional
              </h4>
              <ul className="space-y-2.5 text-sm text-[#faf9f6]/80">
                <li>
                  <Link href="/" className="transition hover:text-[#c5a880]">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="transition hover:text-[#c5a880]">
                    Sobre a Dra. Bruna Dourado
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="transition hover:text-[#c5a880]">
                    Artigos e Informativos
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="transition hover:text-[#c5a880]">
                    Contato e Triagem
                  </Link>
                </li>
                <li>
                  <Link href="/llms.txt" className="transition hover:text-[#c5a880]">
                    Índice Estruturado (/llms.txt)
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 font-serif text-base font-bold text-[#c5a880]">
                Canais Oficiais
              </h4>
              <ul className="space-y-2.5 text-sm text-[#faf9f6]/80">
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words transition hover:text-[#c5a880]"
                  >
                    WhatsApp Oficial: {siteConfig.contact.phoneShort}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[#c5a880]"
                  >
                    Instagram (@brunadouradoadv)
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[#c5a880]"
                  >
                    LinkedIn Oficial
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimers Éticos OAB (Provimento 205/2021) e LGPD */}
          <div className="mb-8 w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#121212] p-5 text-xs leading-relaxed break-words text-[#faf9f6]/75 space-y-2">
            <p className="flex items-center gap-2 font-semibold text-[#c5a880]">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span>Conformidade Ética OAB (Provimento nº 205/2021 CFOAB) e LGPD (Lei nº 13.709/2018)</span>
            </p>
            <p>{siteConfig.compliance.informational}</p>
            <p>{siteConfig.compliance.contractDisclaimer}</p>
            <p>{siteConfig.compliance.confidentiality}</p>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#faf9f6]/65 sm:flex-row">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {siteConfig.brand.legalName} — {siteConfig.brand.oab}. Todos os direitos reservados.
            </p>
            <p className="text-center sm:text-right">Salvador e Região Metropolitana • Bahia • Brasil</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
