import { Button } from '@/components/ui/button'
import { MessageCircle, Mic, ShieldCheck, ArrowRight } from 'lucide-react'
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
      className="relative isolate w-full max-w-full overflow-hidden border-b border-border bg-[#0a0a0a] px-4 py-16 text-[#faf9f6] sm:px-6 md:px-8 md:py-24"
    >
      {/* Fundo sutil em gradiente arquitetônico sem duplicar foto */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(197, 168, 128, 0.22), transparent 55%), radial-gradient(circle at 85% 80%, rgba(154, 124, 86, 0.16), transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl min-w-0 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="w-full max-w-full min-w-0 text-left">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#c5a880]/45 bg-[#121212] px-3.5 py-1.5 text-xs font-semibold text-[#c5a880] sm:px-4 sm:text-sm">
              <BrandEmblem size="sm" className="h-6 w-6 shrink-0" />
              <span className="break-words">{siteConfig.positioning.badge}</span>
            </div>
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#faf9f6]/90 sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#c5a880]" />
              <span className="break-words">Salvador e Região Metropolitana</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight break-words text-[#faf9f6] sm:text-5xl lg:text-[3.4rem]">
            {siteConfig.positioning.headline}
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed break-words text-[#faf9f6]/85 sm:text-lg line-clamp-3">
            O atendimento, a análise inicial e a condução jurídica são realizados diretamente no escritório da Dra. Bruna Dourado ({siteConfig.brand.oab}), sem triagem robótica.
          </p>

          <div className="mt-9 flex w-full max-w-full min-w-0 flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl bg-[#c5a880] px-5 py-4 text-center text-base font-bold leading-snug whitespace-normal break-words text-[#0a0a0a] shadow-lg transition hover:bg-[#9a7c56] hover:text-[#faf9f6] sm:w-auto sm:px-8 sm:py-5"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
                <span>Falar com a Dra. Bruna no WhatsApp</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto w-full max-w-full min-w-0 rounded-xl border-[#c5a880]/60 bg-[#121212]/90 px-5 py-4 text-center text-base font-semibold leading-snug whitespace-normal break-words text-[#faf9f6] transition hover:bg-[#c5a880]/20 hover:text-[#faf9f6] sm:w-auto sm:px-7 sm:py-5"
            >
              <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-5 w-5 shrink-0 text-[#c5a880]" />
                <span>Prefiro enviar mensagem de áudio no WhatsApp</span>
              </a>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-sm text-[#faf9f6]/80 sm:gap-6 sm:text-base">
            <span>Atendimento Presencial e Digital</span>
            <span className="hidden sm:inline">•</span>
            <Link
              href="#eixos"
              className="inline-flex items-center gap-2 font-semibold text-[#c5a880] underline decoration-[#c5a880]/50 underline-offset-4 hover:text-[#faf9f6]"
            >
              Explorar as 6 Áreas de Atuação
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Retrato Principal (Foto 1 Oficial) */}
        <div className="mx-auto w-full max-w-md min-w-0 lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-[#c5a880]/35 bg-[#121212] shadow-2xl">
            <div className="relative h-[420px] w-full sm:h-[470px]">
              <SafePortraitImage
                src="/images/foto-perfil.jpg"
                alt="Dra. Bruna Dourado — Advogada (OAB/BA 71507)"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-[#c5a880]/30 bg-[#0a0a0a]/90 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-xl font-bold text-[#faf9f6]">
                      Dra. Bruna Dourado
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#c5a880]">
                      Advogada • {siteConfig.brand.oab}
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
