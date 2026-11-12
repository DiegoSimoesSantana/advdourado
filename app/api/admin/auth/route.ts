import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Diego1985!@#'
const AUTH_COOKIE_NAME = 'advdourado_admin_session'
const AUTH_TOKEN_SECRET = 'advdourado_secure_session_2025_diego_bruna'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = String(body?.password ?? '').trim()

    if (!password) {
      return NextResponse.json({ ok: false, error: 'Senha não informada.' }, { status: 400 })
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: 'Senha incorreta. Verifique suas credenciais.' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 dias de persistência
      path: '/',
    })

    return NextResponse.json({
      ok: true,
      message: 'Autenticado com sucesso.',
      user: { name: 'Dra. Bruna & Diego', role: 'admin' },
    })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Erro interno ao autenticar.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(AUTH_COOKIE_NAME)

    if (session && session.value === AUTH_TOKEN_SECRET) {
      return NextResponse.json({
        ok: true,
        authenticated: true,
        user: { name: 'Dra. Bruna & Diego', role: 'admin' },
      })
    }

    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_NAME)
    return NextResponse.json({ ok: true, message: 'Sessão encerrada com sucesso.' })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Erro ao encerrar sessão.' }, { status: 500 })
  }
}
