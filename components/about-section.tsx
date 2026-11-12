import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GraduationCap, Scale, BookOpen, Users, MessageCircle, Mic } from 'lucide-react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'

export function AboutSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Gostaria de conversar sobre uma demanda jurídica e entender como funciona o atendimento da banca.',
  )
  const audioWhatsAppLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Prefiro enviar uma mensagem de áudio para explicar minha situação jurídica.',
  )

  return (
    <section id="sobre" className="border-b border-border bg-secondary/45 px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="relative h-[440px] w-full sm:h-[520px]">
              <SafePortraitImage
                src="/images/foto-perfil.jpg"
                alt="Dra. Bruna Dourado — Advogada Titular (OAB/BA 71507)"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-[#faf9f6]">
                <span className="inline-block rounded-full border border-[#c5a880]/50 bg-[#0a0a0a]/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
                  Banca Boutique Especializada
                </span>
                <p className="mt-2 font-serif text-2xl font-bold">
                  Dra. Bruna Dourado da Silva
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-[#faf9f6]/80">
                  {siteConfig.brand.oab} • Salvador e Região Metropolitana
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Sobre Nós • Credenciais e Banca Associada
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Rigor Técnico, Didática e Coordenação Pessoal da Dra. Bruna Dourado
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
            {siteConfig.about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Grid de Credenciais Reais */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2.5 text-primary">
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Graduação Pública</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                Bacharela em Direito pela Universidade do Estado da Bahia (UNEB)
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2.5 text-primary">
                <Scale className="h-5 w-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Pós-Graduação</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                Especialista em Direito e Processo do Trabalho
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2.5 text-primary">
                <BookOpen className="h-5 w-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Diferencial Humanístico</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                Vivência como docente de Filosofia e Sociologia em instituições tradicionais de Salvador
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2.5 text-primary">
                <Users className="h-5 w-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Banca Associada</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                Atendimento inicial pela Dra. Bruna com atuação integrada de especialistas associados
              </p>
            </div>
          </div>

          {/* Box Explicativo da Banca Associada */}
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-5">
            <h3 className="font-serif text-lg font-bold text-foreground">
              Como funciona nossa Banca Associada
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
              {siteConfig.about.bancaExplanation}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="rounded-lg bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com a Dra. Bruna
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-primary/50 text-foreground hover:bg-primary/10"
            >
              <a href={audioWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-4 w-4 text-primary" />
                Prefiro enviar mensagem de áudio
              </a>
            </Button>

            <Button asChild variant="ghost" size="lg" className="text-primary hover:text-primary/80">
              <Link href="/sobre">Conhecer detalhes institucionais →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
