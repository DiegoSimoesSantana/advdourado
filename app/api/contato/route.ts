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

    // Se a variável DATABASE_URL não estiver configurada na hospedagem, degradamos graciosamente (202)
    // sem gerar erro 500, pois o fluxo principal de conversão abre o WhatsApp da Doutora imediatamente.
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          ok: true,
          persisted: false,
          channel: 'whatsapp_direct',
        },
        { status: 202 },
      )
    }

    try {
      const lead = await saveLead(payload)
      return NextResponse.json({ ok: true, persisted: true, lead })
    } catch (dbError) {
      console.warn('Aviso: falha ao persistir lead no banco, mantendo fluxo via WhatsApp:', dbError)
      return NextResponse.json(
        {
          ok: true,
          persisted: false,
          channel: 'whatsapp_direct',
        },
        { status: 202 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Formato de requisição inválido.',
      },
      { status: 400 },
    )
  }
}
