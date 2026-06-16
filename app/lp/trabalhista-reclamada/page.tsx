import React from 'react';
import { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export const metadata: Metadata = {
  title: 'Defesa Trabalhista para Empresas | ADVDourado',
  description: 'Especialista em defesa de empresas em ações trabalhistas de alto valor. Atendimento premium, sigilo e estratégia para proteger seu patrimônio.'
};

export default function TrabalhistaReclamadaLP() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative">
      <section className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary-foreground">Defesa Trabalhista para Empresas</h1>
        <p className="text-lg md:text-xl mb-8 text-foreground/80">
          Proteja sua empresa com uma atuação estratégica e personalizada em ações trabalhistas de alto valor. Atendimento exclusivo para empresários e gestores.
        </p>
        <div className="mb-10">
          <LeadForm area="Trabalhista" />
        </div>
        <div className="rounded-xl bg-white/90 shadow-lg p-6 text-left text-foreground">
          <h2 className="text-2xl font-semibold mb-4">Diferenciais da ADVDourado</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Defesa técnica em processos trabalhistas complexos</li>
            <li>Sigilo absoluto e ética profissional</li>
            <li>Atendimento ágil e consultivo</li>
            <li>Foco na redução de riscos e custos</li>
          </ul>
        </div>
      </section>
      <FloatingWhatsAppButton />
    </main>
  );
}
