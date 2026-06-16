'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false)
  const whatsappLink = createWhatsAppLink('Olá, vim pelo site e gostaria de iniciar o contato com o escritório.')

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/areas', label: 'Áreas de Atuação' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm">
            BD
          </div>
          <div>
            <p className="text-base font-semibold text-foreground group-hover:text-primary">{siteConfig.brand.shortName}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{siteConfig.brand.oab}</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-700 hover:text-slate-950 transition-colors">
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary hover:bg-primary/90"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="px-4 sm:px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-slate-700 hover:text-slate-950 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                size="sm"
                className="w-full rounded-full bg-primary hover:bg-primary/90"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
