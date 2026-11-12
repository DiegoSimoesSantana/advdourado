import { NextResponse } from 'next/server'
import { processIncomingMessage } from '@/lib/bot-service'

// Configuração para suportar CORS caso a extensão chame diretamente
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const senderPhone = String(body?.senderPhone ?? body?.phone ?? '').trim()
    const message = String(body?.message ?? body?.text ?? '').trim()
    const isContact = Boolean(body?.isContact)
    const customApiKey = body?.apiKey || body?.geminiApiKey
    const forceTestMode = Boolean(body?.forceTestMode)

    if (!senderPhone || !message) {
      return NextResponse.json(
        { ok: false, error: 'Parâmetros "senderPhone" e "message" são obrigatórios.' },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      )
    }

    const result = await processIncomingMessage({
      senderPhone,
      message,
      isContact,
      customApiKey,
      forceTestMode,
    })

    return NextResponse.json(
      {
        ok: true,
        reply: result.reply,
        source: result.source,
        status: result.status,
        area: result.area,
        isTestMode: result.isTestMode,
        resetTriggered: result.resetTriggered,
        lead: result.lead,
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    )
  } catch (error) {
    console.error('Erro na rota /api/bot/chat:', error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Erro ao processar mensagem do bot.',
      },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    )
  }
}
