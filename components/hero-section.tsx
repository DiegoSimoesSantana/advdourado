import { Button } from '@/components/ui/button'
import { MessageCircle, Mic, ShieldCheck, ArrowRight, UserCheck, Building2 } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { BrandEmblem } from '@/components/brand-emblem'
import Link from 'next/link'

export function HeroSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pela página inicial do site e gostaria de iniciar meu atendimento jurídico.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pela página inicial do site e prefiro explicar meu caso enviando uma mensagem de áudio.',
  )

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden border-b border-border bg-[#0a0a0a] px-4 py-14 text-[#faf9f6] sm:px-6 md:px-8 md:py-22"
    >
      {/* Background institucional com foto oficial e fallback seguro */}
      <div className="absolute inset-0 z-0 opacity-30">
        <SafePortraitImage
          src="/images/foto-perfil2.jpg"
          alt="Retrato institucional da Dra. Bruna Dourado (OAB/BA 71507)"
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#121212]/75" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.22fr_0.78fr]">
        <div className="text-left">
          {/* Emblema Institucional + Selo de Atendimento Direto no Topo */}
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c5a880]/45 bg-[#121212]/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c5a880]">
              <BrandEmblem size="sm" className="h-6 w-6" />
              <span>{siteConfig.positioning.badge}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#faf9f6]/90">
              <ShieldCheck className="h-3.5 w-3.5 text-[#c5a880]" />
              Atendimento PF & PJ
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-[#faf9f6] sm:text-5xl lg:text-[3.35rem]">
            {siteConfig.positioning.headline}
          </h1>

          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#faf9f6]/85 sm:text-lg">
            {siteConfig.positioning.subheadline}
          </p>

          {/* Atalhos Rápidos de Autoidentificação PF vs PJ */}
          <div className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            <Link
              href="#eixos"
              className="group flex items-center justify-between rounded-xl border border-white/15 bg-[#121212]/85 px-4 py-3 text-left transition hover:border-[#c5a880]/60 hover:bg-[#121212]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/15 text-[#c5a880]">
                  <UserCheck className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                    Para Você e Família (PF)
                  </span>
                  <span className="text-[11px] text-[#faf9f6]/75">
                    Trabalhista, Saúde, Família, Imóveis e Consumidor
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#c5a880] transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#eixos"
              className="group flex items-center justify-between rounded-xl border border-white/15 bg-[#121212]/85 px-4 py-3 text-left transition hover:border-[#c5a880]/60 hover:bg-[#121212]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/15 text-[#c5a880]">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                    Para Empresas e Escolas (PJ)
                  </span>
                  <span className="text-[11px] text-[#faf9f6]/75">
                    Compliance Trabalhista, Educacional B2B e Contratos
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#c5a880] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="rounded-lg bg-[#c5a880] px-7 py-6 text-base font-bold text-[#0a0a0a] shadow-lg transition hover:bg-[#9a7c56] hover:text-[#faf9f6]"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com a Dra. Bruna no WhatsApp
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-[#c5a880]/60 bg-[#121212]/90 px-6 py-6 text-base font-semibold text-[#faf9f6] transition hover:bg-[#c5a880]/20 hover:text-[#faf9f6]"
            >
              <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-5 w-5 text-[#c5a880]" />
                Prefiro enviar mensagem de áudio no WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-[#faf9f6]/75 sm:text-sm">
            <span>• Salvador e Região Metropolitana (Presencial e Digital)</span>
            <span>• {siteConfig.brand.oab}</span>
            <Link
              href="#eixos"
              className="inline-flex items-center gap-1 font-semibold text-[#c5a880] underline decoration-[#c5a880]/50 underline-offset-4 hover:text-[#faf9f6]"
            >
              Conhecer os 6 Eixos de Atuação
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Retrato em Destaque Boutique com Emblema */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-[#c5a880]/35 bg-[#121212] shadow-2xl">
            <div className="relative h-[390px] w-full sm:h-[440px]">
              <SafePortraitImage
                src="/images/foto-perfil.jpg"
                alt="Dra. Bruna Dourado — Advogada Titular (OAB/BA 71507)"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#c5a880]/30 bg-[#0a0a0a]/90 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg font-bold text-[#faf9f6]">
                      Dra. Bruna Dourado — {siteConfig.brand.oab}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#faf9f6]/80">
                      Triagem inicial conduzida pessoalmente pela Doutora, com atuação coordenada de banca associada por especialidade.
                    </p>
                  </div>
                  <BrandEmblem size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
