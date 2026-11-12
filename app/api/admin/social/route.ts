import { NextResponse } from 'next/server'
import { saveSocialPost, listSocialPosts, SocialPostItem } from '@/lib/db'

export async function GET() {
  try {
    const posts = await listSocialPosts()
    return NextResponse.json({ ok: true, posts })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao listar posts.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body?.caption) {
      return NextResponse.json({ ok: false, error: 'A legenda do post é obrigatória.' }, { status: 400 })
    }

    const postPayload: SocialPostItem = {
      post_type: body.post_type || 'texto',
      title: body.title || 'Publicação Sem Título',
      caption: body.caption,
      caption_linkedin: body.caption_linkedin || body.caption,
      caption_instagram: body.caption_instagram || body.caption,
      caption_facebook: body.caption_facebook || body.caption,
      caption_whatsapp: body.caption_whatsapp || body.caption,
      media_url: body.media_url,
      media_type: body.media_type,
      target_networks: body.target_networks || ['linkedin', 'instagram', 'facebook', 'whatsapp'],
      status: body.status || 'publicado',
    }

    const saved = await saveSocialPost(postPayload)

    return NextResponse.json({ ok: true, post: saved })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao salvar publicação.' },
      { status: 500 }
    )
  }
}
