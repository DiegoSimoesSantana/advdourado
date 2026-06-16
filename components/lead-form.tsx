
'use client';

'use client';
import React, { useState } from 'react';
import { sendGTMEvent } from '@/lib/gtm';

interface LeadFormProps {
  area?: string;
}

export function LeadForm({ area }: LeadFormProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [resumo, setResumo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    const texto = `Olá, meu nome é ${nome}.\nGostaria de atendimento jurídico${area ? ` na área de ${area}` : ''}.\nResumo: ${resumo}\nMeu WhatsApp: ${whatsapp}`;
    const url = `https://wa.me/5571XXXXXXXXX?text=${encodeURIComponent(texto)}`;
    sendGTMEvent(`Click_WPP_${area || 'Lead'}`);
    window.open(url, '_blank');
    setTimeout(() => setEnviando(false), 2000);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          className="w-full rounded border px-3 py-2"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">WhatsApp</label>
        <input
          type="tel"
          className="w-full rounded border px-3 py-2"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Resumo do problema</label>
        <textarea
          className="w-full rounded border px-3 py-2"
          value={resumo}
          onChange={e => setResumo(e.target.value)}
          required
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary/90 transition"
        disabled={enviando}
      >
        {enviando ? 'Enviando...' : 'Falar no WhatsApp'}
      </button>
    </form>
  );
}
