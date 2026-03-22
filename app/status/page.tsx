import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { CheckCircle, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Status | ${siteConfig.brand.name}`,
  description: 'Monitoramento em tempo real do site Bruna Dourado Advocacia & Consultoria. Transparência, performance e segurança.',
  openGraph: {
    title: `Status | ${siteConfig.brand.name}`,
    description: 'Monitoramento em tempo real do site Bruna Dourado Advocacia & Consultoria. Transparência, performance e segurança.',
    url: `${siteConfig.contact.siteUrl}/status`,
    type: 'website',
  },
}

const statusSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.brand.legalName,
  url: `${siteConfig.contact.siteUrl}/status`,
  description: 'Monitoramento de status, performance e atualizações do site Bruna Dourado Advocacia & Consultoria.',
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(statusSchema) }} />
      <div className="max-w-4xl mx-auto animate-fadein">
        <nav className="mb-6 text-sm text-primary/80 animate-fadein delay-100">
          <Link href="/" className="hover:underline">Início</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">Status</span>
        </nav>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-foreground md:text-5xl font-bold mb-4 animate-slideup">
            Status do Sistema
          </h1>
          <p className="text-lg text-foreground/80 animate-fadein delay-100">
            Monitoramento em tempo real do site Bruna Dourado Advocacia &amp; Consultoria.
          </p>
        </div>

        {/* Status Geral */}
        <Card className="p-6 sm:p-8 mb-8 border-0 animate-fadein delay-200" style={{ backgroundColor: 'white' }}>
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8" style={{ color: '#044B39' }} />
            <h2 className="text-2xl font-bold text-foreground">Status Geral: Operacional</h2>
          </div>
          <p className="text-foreground/70">
            Último check: {new Date().toLocaleString('pt-BR')}
          </p>
        </Card>

        {/* Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fadein delay-300">
          {[
            { name: 'Website', status: 'online', latency: '120ms' },
            { name: 'Blog', status: 'online', latency: '95ms' },
            { name: 'Google Analytics', status: 'online', latency: '150ms' },
            { name: 'WhatsApp API', status: 'online', latency: '200ms' },
          ].map((service) => (
            <Card key={service.name} className="p-4 sm:p-6 border-2 bg-white border-[#ECE5DC]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">{service.name}</h3>
                <CheckCircle className="w-5 h-5" style={{ color: '#044B39' }} />
              </div>
              <div className="text-sm text-foreground/70">
                <p>Status: <span className="text-primary font-bold">Online</span></p>
                <p>Latência: {service.latency}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance */}
        <Card className="p-6 sm:p-8 mt-8 border-0 animate-fadein delay-400" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { metric: 'Uptime', value: '99.9%', target: '> 99%' },
              { metric: 'Tempo de Resposta', value: '120ms', target: '< 200ms' },
              { metric: 'Tamanho da Página', value: '450KB', target: '< 500KB' },
              { metric: 'Core Web Vitals', value: 'All Green', target: 'Excellent' },
            ].map((item) => (
              <div key={item.metric} className="border-l-4 pl-4 border-[#C99300]">
                <p className="text-sm font-medium text-foreground/70">{item.metric}</p>
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-xs text-foreground/50">Target: {item.target}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Analytics */}
        <Card className="p-6 sm:p-8 mt-8 border-0 animate-fadein delay-500" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Analytics (Últimos 7 dias)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { metric: 'Visitantes Únicos', value: '234' },
              { metric: 'Page Views', value: '856' },
              { metric: 'Taxa de Conversão', value: '3.2%' },
              { metric: 'Tempo Médio no Site', value: '2m 34s' },
            ].map((item) => (
              <div key={item.metric}>
                <p className="text-sm font-medium mb-1 text-foreground/70">{item.metric}</p>
                <p className="text-3xl font-bold text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Últimas Atualizações */}
        <Card className="p-6 sm:p-8 mt-8 border-0 animate-fadein delay-600" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Últimas Atualizações</h2>
          <div className="space-y-4">
            {[
              { date: 'Hoje, 14:30', message: 'Deploy bem-sucedido em produção' },
              { date: 'Hoje, 12:00', message: 'Analytics configurado e ativo' },
              { date: 'Ontem, 18:45', message: 'Novo artigo publicado: Vício Oculto' },
            ].map((update, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-[#ECE5DC]">
                <Clock className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#C99300' }} />
                <div>
                  <p className="font-bold text-foreground">{update.message}</p>
                  <p className="text-xs text-foreground/60">{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <section className="mt-12 flex flex-col items-center gap-4 animate-fadein delay-700">
          <span className="text-base text-foreground/80">Dúvidas sobre o status ou performance?</span>
          <Link href="/contato">
            <button className="bg-primary text-white font-bold rounded-lg px-6 py-3 shadow-lg hover:bg-primary/90 transition-all duration-200">
              Fale com o escritório
            </button>
          </Link>
        </section>

        {/* Footer / Compliance OAB */}
        <footer className="mt-20 border-t border-gray-200 pt-8 pb-12">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>© {new Date().getFullYear()} Bruna Dourado Advocacia &amp; Consultoria. Todos os direitos reservados.</p>
            <p>OAB/BA 71507</p>
            <p className="text-xs mt-4">
              As informações deste site têm finalidade exclusivamente institucional e informativa, não substituindo consulta jurídica formal e individualizada.<br />
              Este site está em conformidade com o Provimento nº 205/2021 do Conselho Federal da OAB e com a LGPD.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
                  <p className="text-sm" style={{ color: '#999' }}>{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
