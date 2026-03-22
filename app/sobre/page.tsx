import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Sobre | ${siteConfig.brand.name}`,
  description:
    'Conheça a ADVDourado, sua proposta de atuação estratégica e a gestão conduzida por Bruna Dourado em Salvador/BA.',
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Institucional</p>
        <h1 className="mt-3 text-4xl text-foreground md:text-5xl">{siteConfig.about.title}</h1>

        <div className="mt-8 space-y-5 text-lg leading-8 text-foreground/80">
          {siteConfig.about.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-10 rounded-2xl bg-secondary/50 p-6">
          <h2 className="text-2xl text-foreground">Valores institucionais</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/75">
            <li>Justiça com empatia e responsabilidade técnica</li>
            <li>Respeito, tradição, história e visão de futuro</li>
            <li>Comunicação clara, ética e orientada ao cliente</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
