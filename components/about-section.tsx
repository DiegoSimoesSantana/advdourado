import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function AboutSection() {
  const whatsappLink = createWhatsAppLink(
    'Olá, gostaria de conversar sobre uma demanda jurídica e entender como funciona o atendimento do escritório.',
  )

  return (
    <section id="sobre" className="bg-[#f5f1e8] px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm">
            <div className="relative h-[420px] w-full sm:h-[520px]">
              <Image
                src="/images/foto-perfil.jpg"
                alt="Dra. Bruna Dourado em retrato institucional"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover sepia-[0.18] grayscale contrast-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#8a6a3d]">Sobre a Advogada</p>
          <h2 className="mb-6 font-serif text-4xl leading-tight text-slate-900 md:text-5xl">
            Bruna Dourado da Silva, OAB/BA 71507
          </h2>
          <div className="space-y-5 text-justify text-lg leading-8 text-slate-800">
            <p>
              Atuação jurídica nas áreas Trabalhista, Família, Direito Educacional e Consumidor, com condução estratégica e linguagem acessível para pessoas, famílias e instituições.
            </p>
            <p>
              Trajetória também como docente de Filosofia e Sociologia em instituições de ensino de Salvador, unindo técnica jurídica e formação humana no atendimento.
            </p>
            <p>
              Além da atuação jurídica, também oferece serviço de compliance e treinamentos para equipes e servidores públicos, com ações já realizadas em Catu/BA e Porto Seguro/BA.
            </p>
            <p>
              O primeiro atendimento é direto, com triagem clara e encaminhamento objetivo para o melhor formato de solução.
            </p>
          </div>

          <Button asChild size="lg" className="mt-8 rounded-full bg-[#25D366] px-8 text-white hover:bg-[#1ebe57]">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>

          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-slate-500">{siteConfig.brand.oab}</p>
        </div>
      </div>
    </section>
  )
}
