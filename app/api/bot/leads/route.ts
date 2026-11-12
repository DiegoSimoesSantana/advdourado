import { NextResponse } from 'next/server'
import { listWhatsAppLeads, updateWhatsAppLead } from '@/lib/db'

export async function GET() {
  try {
    const leads = await listWhatsAppLeads()
    return NextResponse.json({ ok: true, leads })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao listar leads do WhatsApp.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { phone, ...updates } = body

    if (!phone) {
      return NextResponse.json({ ok: false, error: 'Telefone é obrigatório.' }, { status: 400 })
    }

    const updated = await updateWhatsAppLead(phone, updates)
    return NextResponse.json({ ok: true, lead: updated })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao atualizar lead.' },
      { status: 500 }
    )
  }
}
