import React from 'react';
import { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export const metadata: Metadata = {
  title: 'Consultoria Empresarial Premium | ADVDourado',
  description: 'Soluções jurídicas estratégicas para empresas e empresários que exigem discrição, agilidade e atendimento premium. Fale diretamente com a especialista.'
};

export default function EmpresarialLP() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative">
      <section className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary-foreground">Consultoria Empresarial Premium</h1>
        <p className="text-lg md:text-xl mb-8 text-foreground/80">
          Atendimento exclusivo para empresários e gestores que buscam soluções jurídicas estratégicas, sigilo absoluto e acompanhamento personalizado.
        </p>
        <div className="mb-10">
          <LeadForm area="Empresarial" />
        </div>
        <div className="rounded-xl bg-white/90 shadow-lg p-6 text-left text-foreground">
          <h2 className="text-2xl font-semibold mb-4">Por que escolher a ADVDourado?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Atuação focada em demandas empresariais complexas</li>
            <li>Sigilo, ética e discrição em cada etapa</li>
            <li>Consultoria preventiva e contenciosa</li>
            <li>Atendimento ágil e personalizado</li>
          </ul>
        </div>
      </section>
      <FloatingWhatsAppButton />
    </main>
  );
}
