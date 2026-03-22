import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Áreas de Atuação | ${siteConfig.brand.name}`,
  description: 'Conheça as especialidades da ADVDourado e encontre a área jurídica mais adequada para sua demanda.',
}

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Especialidades</p>
        <h1 className="mt-3 text-4xl text-foreground md:text-5xl">Áreas de atuação da ADVDourado</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/75">
          Selecione a área com maior proximidade com sua demanda. A equipe fará a triagem inicial e direcionará o
          atendimento técnico adequado.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.areas.map((area) => (
            <Card key={area.id} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-2xl text-foreground">{area.title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{area.summary}</p>
              <Link href={`/areas/${area.id}`} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
                Acessar área
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
