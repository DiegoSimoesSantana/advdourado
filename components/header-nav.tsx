'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon, MessageCircle, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createWhatsAppLink, siteConfig } from '@/lib/site-config'
import { BrandEmblem } from '@/components/brand-emblem'
import { usePathname } from 'next/navigation'

const THEME_STORAGE_KEY = 'advdourado-theme'

export function HeaderNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const initialDark = saved ? saved === 'dark' : mediaQuery.matches

    setIsDark(initialDark)
    document.documentElement.classList.toggle('dark', initialDark)

    const handleSystemChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setIsDark(event.matches)
        document.documentElement.classList.toggle('dark', event.matches)
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    localStorage.setItem(THEME_STORAGE_KEY, nextDark ? 'dark' : 'light')
  }

  if (
    pathname === '/links' ||
    pathname.startsWith('/links/') ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/')
  ) {
    return null
  }

  const whatsappLink = createWhatsAppLink(
    'Olá, Dra. Bruna Dourado. Vim pelo site e gostaria de iniciar meu atendimento jurídico.',
  )

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'A Banca' },
    { href: '/blog', label: 'Artigos PF & PJ' },
    { href: '/contato', label: 'Contato' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 transition-colors">
          <BrandEmblem size="md" className="transition-transform duration-200 group-hover:scale-105" />
          <div>
            <p className="font-serif text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
              {siteConfig.brand.shortName}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {siteConfig.brand.oab} • Salvador/BA
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
          >
            Início
          </Link>

          {/* Dropdown de Eixos */}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
            >
              <span>Eixos de Atuação</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-80 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
              {siteConfig.areas.map((area) => (
                <Link
                  key={area.id}
                  href={area.route}
                  className="flex items-center justify-between rounded-lg px-3.5 py-2.5 transition-colors hover:bg-secondary"
                >
                  <div>
                    <p className="font-serif text-sm font-semibold text-foreground">{area.shortTitle}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{area.eyebrow}</p>
                  </div>
                  <span className="ml-2 shrink-0 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {area.targetAudienceBadge.includes('Exclusivo PJ') ? 'PJ' : 'PF/PJ'}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {mounted && isDark ? <Sun className="h-4 w-4 text-[#c5a880]" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4" />
              Atendimento Direto
            </a>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground transition-colors"
          >
            {mounted && isDark ? <Sun className="h-4 w-4 text-[#c5a880]" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu de navegação"
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-xl lg:hidden">
            <div className="mx-auto max-w-6xl space-y-4 px-4 py-5 sm:px-6">
              <div className="space-y-1">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  6 Eixos de Atuação (PF & PJ)
                </p>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {siteConfig.areas.map((area) => (
                    <Link
                      key={area.id}
                      href={area.route}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <span>{area.shortTitle}</span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                        {area.targetAudienceBadge.includes('Exclusivo PJ') ? 'B2B' : 'PF/PJ'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  size="sm"
                  className="w-full rounded-full bg-primary py-5 font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar Direto com a Dra. Bruna
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
