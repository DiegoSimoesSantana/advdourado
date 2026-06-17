import type { Metadata } from 'next'
import Link from 'next/link'
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

        <section className="mt-8 rounded-2xl border border-border bg-white p-6">
          <h2 className="text-2xl text-foreground">Formação e projetos educacionais</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            A atuação formativa inclui projetos aplicados de treinamento institucional, com foco em orientação prática,
            prevenção de risco e melhoria de tomada de decisão por equipes.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/75">Projeto 01</p>
              <h3 className="mt-2 text-lg text-foreground">Treinamento institucional em Catu/BA</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/75">
                Formação voltada para alinhamento de equipe, fluxo de conduta e compreensão prévia de processos.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/75">Projeto 02</p>
              <h3 className="mt-2 text-lg text-foreground">Treinamento institucional em Porto Seguro/BA</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/75">
                Capacitação com foco em rotina de equipe, comunicação orientada e condução preventiva de cenários complexos.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-secondary/25 p-6">
          <h2 className="text-2xl text-foreground">Biblioteca de vídeos da formação</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            Neste deploy, os espaços de vídeo já estão prontos. No próximo ajuste, ao subir os arquivos, os players serão ativados automaticamente.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-border bg-white p-4">
              <p className="text-sm font-semibold text-foreground">Vídeo 1 (Evento Catu/BA)</p>
              <p className="mt-2 text-xs text-foreground/70">Arquivo esperado: public/videos/formacao/evento-catu-ba.mp4</p>
            </div>
            <div className="rounded-xl border border-dashed border-border bg-white p-4">
              <p className="text-sm font-semibold text-foreground">Vídeo 2 (Evento Porto Seguro/BA)</p>
              <p className="mt-2 text-xs text-foreground/70">Arquivo esperado: public/videos/formacao/evento-porto-seguro-ba.mp4</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-secondary/25 p-6">
          <h2 className="text-2xl text-foreground">Continue sua navegação</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            A página institucional conecta você com as áreas de atuação, conteúdos explicativos e o canal direto de contato.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-primary/80">
              Voltar para início
            </Link>
            <Link href="/areas" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-primary/80">
              Ir para áreas de atuação
            </Link>
            <Link href="/blog" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-primary/80">
              Ler artigos do blog
            </Link>
            <Link href="/contato" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-primary/80">
              Abrir página de contato
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
