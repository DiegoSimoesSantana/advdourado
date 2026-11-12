import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_SENSITIVE_PATHS = [
  '/.env',
  '/.env.local',
  '/.env.production',
  '/.git',
  '/package.json',
  '/package-lock.json',
  '/pnpm-lock.yaml',
  '/composer.json',
  '/composer.lock',
  '/tsconfig.json',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = (request.headers.get('host') || '').toLowerCase()
  const lowerPath = pathname.toLowerCase()

  // 1. Bloqueio de arquivos sensíveis na borda da aplicação (Defesa em profundidade complementar ao WAF do Cloudflare)
  const isBlockedFile =
    BLOCKED_SENSITIVE_PATHS.some(
      (blocked) => lowerPath === blocked || lowerPath.startsWith(`${blocked}/`),
    ) ||
    lowerPath.endsWith('.env') ||
    lowerPath.includes('/.git/')

  if (isBlockedFile) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 2. Redirecionamento 301 de subdomínios legados (trabalhista. e consumidor.) para rotas internas
  if (host.startsWith('trabalhista.')) {
    return NextResponse.redirect(new URL('/trabalhista', 'https://advdourado.com.br'), 301)
  }
  if (host.startsWith('consumidor.')) {
    return NextResponse.redirect(new URL('/consumidor', 'https://advdourado.com.br'), 301)
  }
  if (host.startsWith('educacional.')) {
    return NextResponse.redirect(new URL('/educacional', 'https://advdourado.com.br'), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

