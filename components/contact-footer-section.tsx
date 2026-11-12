'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Linkedin, ShieldCheck, Lock } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { CaseTriageForm } from '@/components/case-triage-form'

export function ContactFooterSection() {
  const directWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelo site oficial e gostaria de solicitar atendimento jurídico.',
  )

  return (
    <section id="contato" className="bg-[#0a0a0a] text-[#faf9f6]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c5a880]">
            Atendimento Direto com a Doutora
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#faf9f6] sm:text-4xl md:text-5xl">
            Inicie sua triagem com sigilo e coordenação pessoal
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#faf9f6]/80">
            Envie o resumo estruturado da sua necessidade ou opte por gravar uma mensagem de áudio diretamente no WhatsApp da Dra. Bruna Dourado ({siteConfig.brand.oab}).
          </p>
        </div>

        {/* Formulário Compilador de Relatório + Botão de Áudio */}
        <CaseTriageForm
          areaId="contato"
          areaTitle="Triagem Geral — Escritório Dra. Bruna Dourado"
          originPath="/#contato"
        />

        {/* Cartões de Contato Oficial */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-4 rounded-xl border border-white/12 bg-[#121212] p-5">
            <div className="mt-0.5 rounded-lg border border-[#c5a880]/30 bg-[#c5a880]/10 p-3 text-[#c5a880]">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#faf9f6]/65">
                WhatsApp / Telefone Oficial
              </p>
              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-serif text-lg font-bold text-[#faf9f6] transition hover:text-[#c5a880]"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-[#faf9f6]/70">
                Atendimento direto (texto ou áudio)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-white/12 bg-[#121212] p-5">
            <div className="mt-0.5 rounded-lg border border-[#c5a880]/30 bg-[#c5a880]/10 p-3 text-[#c5a880]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#faf9f6]/65">
                E-mail Institucional
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-1 block font-serif text-lg font-bold text-[#faf9f6] transition hover:text-[#c5a880]"
              >
                {siteConfig.contact.email}
              </a>
              <p className="mt-1 text-xs text-[#faf9f6]/70">
                Envio de documentos e solicitações B2B
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-white/12 bg-[#121212] p-5">
            <div className="mt-0.5 rounded-lg border border-[#c5a880]/30 bg-[#c5a880]/10 p-3 text-[#c5a880]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#faf9f6]/65">
                Localização e Abrangência
              </p>
              <p className="mt-1 font-serif text-base font-bold text-[#faf9f6]">
                {siteConfig.contact.city}
              </p>
              <p className="mt-1 text-xs text-[#faf9f6]/70">
                {siteConfig.contact.address} • Presencial e Digital
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Institucional e Avisos Legais Obrigatórios (OAB/BA e LGPD) */}
      <footer className="border-t border-white/10 bg-[#070707] px-4 py-14 sm:px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c5a880]/40 bg-[#121212] font-serif text-base font-bold text-[#c5a880]">
                  BD
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#faf9f6]">
                    {siteConfig.brand.shortName}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#c5a880]">
                    {siteConfig.brand.oab}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#faf9f6]/75">
                Escritório de advocacia boutique sediado em Salvador/BA, com atendimento presencial e digital. Triagem e coordenação feitas pessoalmente pela Dra. Bruna Dourado, com apoio de banca associada especializada.
              </p>
              <div className="mt-4 flex items-center gap-3">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 p-2 text-[#faf9f6]/80 transition hover:border-[#c5a880] hover:text-[#c5a880]"
                    aria-label="Instagram da Dra. Bruna Dourado"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 p-2 text-[#faf9f6]/80 transition hover:border-[#c5a880] hover:text-[#c5a880]"
                    aria-label="LinkedIn da Dra. Bruna Dourado"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-[#c5a880]">
                6 Eixos de Atuação
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-[#faf9f6]/80">
                {siteConfig.areas.map((area) => (
                  <li key={area.id}>
                    <Link href={area.route} className="transition hover:text-[#c5a880]">
                      {area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-[#c5a880]">
                Institucional
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-[#faf9f6]/80">
                <li>
                  <Link href="/" className="transition hover:text-[#c5a880]">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="transition hover:text-[#c5a880]">
                    Sobre a Dra. Bruna e a Banca
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="transition hover:text-[#c5a880]">
                    Artigos Informativos
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="transition hover:text-[#c5a880]">
                    Contato e Triagem
                  </Link>
                </li>
                <li>
                  <a href="/llms.txt" className="transition hover:text-[#c5a880]">
                    Índice Estruturado (llms.txt)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-1.5 font-serif text-sm font-bold uppercase tracking-[0.18em] text-[#c5a880]">
                <ShieldCheck className="h-4 w-4" />
                Conformidade Ética OAB/BA e LGPD
              </h4>
              <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#faf9f6]/75">
                <p>{siteConfig.compliance.informational}</p>
                <p>{siteConfig.compliance.contractDisclaimer}</p>
                <p className="flex items-start gap-1.5">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c5a880]" />
                  <span>{siteConfig.compliance.privacy}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#faf9f6]/65 md:flex-row">
            <p>
              © {new Date().getFullYear()} {siteConfig.brand.legalName} ({siteConfig.brand.oab}). Todos os direitos reservados.
            </p>
            <p>
              Salvador e Região Metropolitana — Bahia, Brasil • WhatsApp: {siteConfig.contact.phoneDisplay}
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
