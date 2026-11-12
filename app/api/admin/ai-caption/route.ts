import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, area = 'trabalhista', tone = 'informativo_estrategico', apiKey } = body

    if (!topic) {
      return NextResponse.json({ ok: false, error: 'Tema ou rascunho é obrigatório.' }, { status: 400 })
    }

    const key = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

    if (key) {
      try {
        const prompt = `Você é uma especialista em marketing jurídico e copywriter para o escritório da Dra. Bruna Dourado (OAB/BA 71507).
Elabore 4 variações de post adaptadas para cada rede social sobre o tema: "${topic}".
Área: ${area}.
Tom: ${tone} (em estrita conformidade com o Provimento 205/2021 da OAB - meramente informativo, sem mercantilização).

Retorne APENAS um JSON válido no seguinte formato exato (sem markdown em volta):
{
  "title": "Título conciso do tema",
  "linkedin": "Texto formal e aprofundado com análise técnica, tópicos explicativos e 3 hashtags no final.",
  "instagram": "Gancho chamativo na 1ª linha, parágrafos curtos com quebras de linha limpas, emojis elegantes e CTA suave.",
  "facebook": "Texto direto, linguagem clara e explicativa para cidadãos e empresários.",
  "whatsapp": "Texto curto formatado com asteriscos para *negrito*, tópicos objetivos e link para o site advdourado.com.br"
}`

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                responseMimeType: 'application/json',
              },
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const jsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (jsonText) {
            const parsed = JSON.parse(jsonText)
            return NextResponse.json({ ok: true, variations: parsed })
          }
        }
      } catch (geminiError) {
        console.warn('Erro ao chamar Gemini no ai-caption, aplicando template gerador:', geminiError)
      }
    }

    // Fallback com template gerador de alta qualidade
    const cleanTopic = String(topic).trim()
    const variations = {
      title: cleanTopic,
      linkedin: `🏛️ Orientação Jurídica Estratégica: ${cleanTopic}\n\nNo ambiente corporativo e nas relações de trabalho atuais, a conformidade preventiva é o caminho mais seguro para evitar passivos e assegurar direitos.\n\n📌 Pontos essenciais:\n• Documentação clara e arquivada;\n• Cumprimento rigoroso dos prazos legais;\n• Avaliação técnica individualizada de cada caso.\n\nA ADVDourado atua de forma consultiva e estratégica para esclarecer dúvidas e estruturar soluções jurídicas seguras.\n\n#DireitoTrabalhista #ConsultoriaJuridica #ADVDourado #GestaoEmpresarial`,
      instagram: `Você sabe como funciona na prática?\n\n${cleanTopic}\n\n⚖️ Muitas dúvidas surgem no dia a dia sobre direitos e deveres legais. Ter clareza sobre a legislação evita prejuízos e garante segurança para o seu patrimônio ou trabalho.\n\n💡 Dica importante: sempre documente comunicações formais e busque orientação especializada antes de assinar acordos.\n\n📲 Dúvidas sobre o tema? Envie uma mensagem no direct ou acesse o link na bio.\n\n#advocacia #direitodotrabalho #direitocivil #brunadourado #salvador`,
      facebook: `Esclarecimento Jurídico: ${cleanTopic}\n\nA informação correta é a melhor ferramenta para proteger seus direitos e conduzir decisões com segurança.\n\nSe você ou sua empresa estão enfrentando dúvidas sobre este tema, conte com a ADVDourado para uma análise técnica e humanizada.\n\nConheça mais em: advdourado.com.br`,
      whatsapp: `*Orientação Jurídica - Dra. Bruna Dourado*\n\n📌 *Tema:* ${cleanTopic}\n\nPara garantir segurança jurídica no seu caso:\n• Reúna documentos e comprovantes;\n• Observe os prazos aplicáveis;\n• Consulte uma análise jurídica personalizada.\n\n👉 Saiba mais no site oficial: https://advdourado.com.br`,
    }

    return NextResponse.json({ ok: true, variations })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Erro ao gerar legendas com IA.' },
      { status: 500 }
    )
  }
}
