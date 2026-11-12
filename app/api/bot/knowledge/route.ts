import { NextResponse } from 'next/server'
import { listBotKnowledge, saveLearnedBotAnswer, deleteBotKnowledge } from '@/lib/db'

export async function GET() {
  try {
    const items = await listBotKnowledge()
    return NextResponse.json({ ok: true, items })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao obter base de conhecimento.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category = 'geral', pattern_question, answer, keywords = [] } = body

    if (!pattern_question || !answer) {
      return NextResponse.json(
        { ok: false, error: 'Pergunta padrão e Resposta são obrigatórias.' },
        { status: 400 }
      )
    }

    const saved = await saveLearnedBotAnswer(category, pattern_question, answer, keywords)
    return NextResponse.json({ ok: true, item: saved })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao salvar conhecimento.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const idParam = searchParams.get('id')

    if (!idParam) {
      return NextResponse.json({ ok: false, error: 'ID é obrigatório.' }, { status: 400 })
    }

    await deleteBotKnowledge(Number(idParam))
    return NextResponse.json({ ok: true, message: 'Item excluído com sucesso.' })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao excluir item.' },
      { status: 500 }
    )
  }
}
