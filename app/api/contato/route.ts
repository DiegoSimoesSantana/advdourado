import { NextResponse } from 'next/server'
import { saveLead } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      name: String(body?.name ?? '').trim(),
      email: String(body?.email ?? '').trim(),
      phone: String(body?.phone ?? '').trim(),
      area: String(body?.area ?? '').trim(),
      subject: String(body?.subject ?? '').trim(),
      message: String(body?.message ?? '').trim(),
    }

    if (!payload.name || !payload.message) {
      return NextResponse.json({ ok: false, error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const lead = await saveLead(payload)

    return NextResponse.json({ ok: true, lead })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : 'Falha ao processar o envio. Verifique as variáveis de ambiente.',
      },
      { status: 500 },
    )
  }
}
