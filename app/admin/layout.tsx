import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ADVDourado Studio | Central Interna & Publicador',
  description: 'Painel interno de publicação para redes sociais e central de automação jurídica com IA.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {children}
    </div>
  )
}
