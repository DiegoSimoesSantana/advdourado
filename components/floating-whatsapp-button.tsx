'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

interface FloatingWhatsAppButtonProps {
  phone?: string
  text?: string
  message?: string
}

export function FloatingWhatsAppButton({
  phone = siteConfig.contact.phoneRaw,
  text = 'Falar direto com a Dra. Bruna',
  message = 'Olá, Dra. Bruna Dourado. Vim pelo site e gostaria de iniciar meu atendimento jurídico.',
}: FloatingWhatsAppButtonProps) {
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-[#c5a880]/50 bg-[#121212] px-5 py-3.5 font-semibold text-[#faf9f6] shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#c5a880]"
      aria-label="Falar com a Dra. Bruna Dourado no WhatsApp"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880] text-[#0a0a0a]">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline text-sm">{text}</span>
    </a>
  )
}
