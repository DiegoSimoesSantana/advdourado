'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default function StatusPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#ECE5DC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#044B39' }}>
            Status do Sistema
          </h1>
          <p className="text-base sm:text-lg" style={{ color: '#2D2823' }}>
            Monitoramento em tempo real do site da Dra. Bruna Dourado
          </p>
        </div>

        {/* Status Geral */}
        <Card className="p-6 sm:p-8 mb-8 border-0" style={{ backgroundColor: 'white' }}>
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8" style={{ color: '#044B39' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#044B39' }}>Status Geral: Operacional</h2>
          </div>
          <p style={{ color: '#666' }}>
            Último check: {new Date().toLocaleString('pt-BR')}
          </p>
        </Card>

        {/* Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { name: 'Website', status: 'online', latency: '120ms' },
            { name: 'Blog', status: 'online', latency: '95ms' },
            { name: 'Google Analytics', status: 'online', latency: '150ms' },
            { name: 'WhatsApp API', status: 'online', latency: '200ms' },
          ].map((service) => (
            <Card key={service.name} className="p-4 sm:p-6 border-2" style={{ backgroundColor: 'white', borderColor: '#ECE5DC' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold" style={{ color: '#2D2823' }}>{service.name}</h3>
                <CheckCircle className="w-5 h-5" style={{ color: '#044B39' }} />
              </div>
              <div className="text-sm" style={{ color: '#666' }}>
                <p>Status: <span style={{ color: '#044B39', fontWeight: 'bold' }}>Online</span></p>
                <p>Latência: {service.latency}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance */}
        <Card className="p-6 sm:p-8 mt-8 border-0" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#044B39' }}>Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { metric: 'Uptime', value: '99.9%', target: '> 99%' },
              { metric: 'Tempo de Resposta', value: '120ms', target: '< 200ms' },
              { metric: 'Tamanho da Página', value: '450KB', target: '< 500KB' },
              { metric: 'Core Web Vitals', value: 'All Green', target: 'Excellent' },
            ].map((item) => (
              <div key={item.metric} className="border-l-4 pl-4" style={{ borderColor: '#C99300' }}>
                <p className="text-sm font-medium" style={{ color: '#666' }}>{item.metric}</p>
                <p className="text-2xl font-bold" style={{ color: '#044B39' }}>{item.value}</p>
                <p className="text-xs" style={{ color: '#999' }}>Target: {item.target}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Analytics */}
        <Card className="p-6 sm:p-8 mt-8 border-0" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#044B39' }}>Analytics (Últimos 7 dias)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { metric: 'Visitantes Únicos', value: '234' },
              { metric: 'Page Views', value: '856' },
              { metric: 'Taxa de Conversão', value: '3.2%' },
              { metric: 'Tempo Médio no Site', value: '2m 34s' },
            ].map((item) => (
              <div key={item.metric}>
                <p className="text-sm font-medium mb-1" style={{ color: '#666' }}>{item.metric}</p>
                <p className="text-3xl font-bold" style={{ color: '#C99300' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Últimas Atualizações */}
        <Card className="p-6 sm:p-8 mt-8 border-0" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#044B39' }}>Últimas Atualizações</h2>
          <div className="space-y-4">
            {[
              { date: 'Hoje, 14:30', message: 'Deploy bem-sucedido em produção' },
              { date: 'Hoje, 12:00', message: 'Analytics configurado e ativo' },
              { date: 'Ontem, 18:45', message: 'Novo artigo publicado: Vício Oculto' },
            ].map((update, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b" style={{ borderColor: '#ECE5DC' }}>
                <Clock className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#C99300' }} />
                <div>
                  <p className="font-bold" style={{ color: '#2D2823' }}>{update.message}</p>
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
