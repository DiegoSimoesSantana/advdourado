
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { createWhatsAppLink } from '@/lib/site-config'
import Link from 'next/link'


export function HeroSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, vim pelo site e gostaria de iniciar meu atendimento jurídico.'
  )

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden border-b border-black/10 px-4 pb-10 pt-14 sm:px-6 md:px-8 md:pb-14 md:pt-20 min-h-[70vh] flex items-center justify-center bg-[#e9e1d3]"
    >
      {/* Background institucional com overlay escuro */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/foto-perfil2.jpg"
          alt="Retrato institucional da Dra. Bruna Dourado"
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-105 brightness-[0.42]"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.76)_0%,rgba(15,23,42,0.70)_45%,rgba(15,23,42,0.82)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl w-full flex flex-col items-center text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
          Atendimento jurídico direto em Salvador
        </h1>
        <p className="mb-8 max-w-2xl mx-auto font-sans text-lg text-slate-100/92 sm:text-xl">
          Página institucional com acesso rápido às áreas, conteúdo orientativo e contato imediato.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full border border-white/15 bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.35)] hover:bg-[#1ebe57]">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
              <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20">
            <Link href="/areas">Especialidades</Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-100">
          <Link href="/sobre" className="cursor-pointer underline decoration-white/40 underline-offset-4 transition hover:text-white">
            Saiba mais sobre a formação
          </Link>
          <Link href="/blog" className="cursor-pointer underline decoration-white/40 underline-offset-4 transition hover:text-white">
            Ler conteúdos do blog
          </Link>
          <Link href="/contato" className="cursor-pointer underline decoration-white/40 underline-offset-4 transition hover:text-white">
            Ir para contato
          </Link>
        </div>
      </div>
    </section>
  )
}
