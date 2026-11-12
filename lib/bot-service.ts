import {
  findCachedBotAnswer,
  saveLearnedBotAnswer,
  getOrCreateWhatsAppLead,
  updateWhatsAppLead,
  resetWhatsAppLead,
  WhatsAppLeadItem,
} from './db'

export type ProcessMessageInput = {
  senderPhone: string
  message: string
  isContact?: boolean
  customApiKey?: string
  forceTestMode?: boolean
}

export type ProcessMessageOutput = {
  reply: string
  source: 'cache_neon' | 'gemini_ai' | 'rule_engine'
  status: string
  area?: string
  isTestMode: boolean
  resetTriggered?: boolean
  lead: WhatsAppLeadItem
}

// Números do Diego (Esposo da Dra. Bruna)
const DIEGO_PHONE_NUMBERS = [
  '71988068222',
  '7188068222',
  '5571988068222',
  '557188068222',
  '+5571988068222',
]

export function isDiegoTestNumber(phone: string): boolean {
  const clean = phone.replace(/\D/g, '')
  return DIEGO_PHONE_NUMBERS.some((num) => num.replace(/\D/g, '') === clean || clean.endsWith('88068222'))
}

// Prompt do Sistema para a Inteligência Artificial
const SYSTEM_PROMPT = `Você é o assistente virtual de triagem jurídica do escritório de advocacia da Dra. Bruna Dourado (OAB/BA 71507), atuando com foco em Direito Trabalhista, Cível, Consumidor e triagem para parceiros (ex: Criminal, Previdenciário).

DIRETRIZES FUNDAMENTAIS:
1. Seja empático, sutil, ágil e altamente profissional.
2. Faça perguntas curtas e diretas (1 ou 2 por mensagem) para qualificar o caso sem cansar o cliente.
3. Não prometa ganho de causa nem valores de indenização; atue na coleta de fatos, datas, documentos e pretensão para posterior análise técnica da Dra. Bruna.
4. Se o usuário indicar que é assunto PESSOAL (amigo, família, particular), responda APENAS: "Em breve, Bruna vai te dar uma resposta." e nunca mencione "atendente".
5. Se for identificado que o caso não tem viabilidade jurídica ou se enquadra melhor na Defensoria Pública, dispense com respeito e cordialidade.
6. Responda em português brasileiro fluído, pronto para WhatsApp (use quebras de linha limpas e negrito onde ajudar na leitura).`

export async function callGeminiApi(
  prompt: string,
  history: Array<{ sender: 'client' | 'bot' | 'bruna'; text: string }>,
  apiKey?: string
): Promise<string> {
  const key = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

  // Conversa formatada
  const formattedHistory = history
    .slice(-6)
    .map((h) => `${h.sender === 'client' ? 'Cliente' : 'Assistente Dra. Bruna'}: ${h.text}`)
    .join('\n')

  const fullPrompt = `${SYSTEM_PROMPT}

HISTÓRICO DA CONVERSA:
${formattedHistory}

NOVA MENSAGEM DO CLIENTE:
"${prompt}"

INSTRUÇÃO:
Gere a resposta ideal da Dra. Bruna Dourado para o WhatsApp conforme as diretrizes. Não inclua prefixos como "Assistente:" ou aspas.`

  if (!key) {
    // Fallback inteligente caso ainda não tenha chave API configurada
    return generateSmartRuleFallback(prompt, history)
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      console.warn('Gemini API returned error, fallback to rule engine:', errText)
      return generateSmartRuleFallback(prompt, history)
    }

    const data = await response.json()
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    return generatedText || generateSmartRuleFallback(prompt, history)
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return generateSmartRuleFallback(prompt, history)
  }
}

// Fallback baseado em regras heurísticas para manter o robô 100% funcional mesmo sem API Key ativa
function generateSmartRuleFallback(
  message: string,
  history: Array<{ sender: 'client' | 'bot' | 'bruna'; text: string }>
): string {
  const text = message.toLowerCase().trim()

  // 1. Assunto pessoal
  if (
    text.includes('pessoal') ||
    text.includes('particular') ||
    text.includes('amigo') ||
    text.includes('familia') ||
    text.includes('parente')
  ) {
    return 'Em breve, Bruna vai te dar uma resposta.'
  }

  // 2. Trabalhista
  if (
    text.includes('trabalho') ||
    text.includes('empresa') ||
    text.includes('demit') ||
    text.includes('rescis') ||
    text.includes('hora extra') ||
    text.includes('carteira') ||
    text.includes('fgts') ||
    text.includes('salario') ||
    text.includes('patrao')
  ) {
    return `Entendi perfeitamente. No Direito Trabalhista, analisamos com cuidado cada detalhe do contrato.\n\nPara que a Dra. Bruna avalie seu caso:\n1. Você ainda está trabalhando na empresa ou já foi desligado(a)?\n2. Quanto tempo durou o vínculo e qual era sua função principal?`
  }

  // 3. Consumidor / Danos / Banco
  if (
    text.includes('consumidor') ||
    text.includes('golpe') ||
    text.includes('banco') ||
    text.includes('fraude') ||
    text.includes('negativ') ||
    text.includes('spc') ||
    text.includes('serasa') ||
    text.includes('produto') ||
    text.includes('compra') ||
    text.includes('plano de saude')
  ) {
    return `Compreendo a situação. Nas relações de consumo e financeiras, é essencial reunir as provas da cobrança ou do problema.\n\nPoderia me contar brevemente o que aconteceu, a data do ocorrido e se você já tentou contato com o SAC/empresa?`
  }

  // 4. Cível / Família / Imóveis
  if (
    text.includes('divorcio') ||
    text.includes('pensao') ||
    text.includes('heranca') ||
    text.includes('inventario') ||
    text.includes('imovel') ||
    text.includes('contrato') ||
    text.includes('guarda')
  ) {
    return `Certo. Questões cíveis e de família exigem uma condução estratégica e cuidadosa.\n\nHá consenso amigável entre as partes envolvidas ou já existe litígio? Poderia resumir a situação?`
  }

  // 5. Saudação padrão ou resposta genérica
  return `Olá! Sou o assistente do escritório da Dra. Bruna Dourado.\n\nPara que possamos te atender melhor:\n1. De qual cidade e estado você fala?\n2. O seu contato é para um assunto *Profissional/Jurídico* ou *Pessoal*?`
}

// ----------------------------------------------------
// FLUXO PRINCIPAL DE PROCESSAMENTO DO BOT
// ----------------------------------------------------

export async function processIncomingMessage(input: ProcessMessageInput): Promise<ProcessMessageOutput> {
  const { senderPhone, message, isContact, customApiKey, forceTestMode } = input
  const cleanPhone = senderPhone.replace(/\D/g, '')
  const rawText = message.trim()
  const lowerText = rawText.toLowerCase()

  const isDiego = isDiegoTestNumber(cleanPhone) || Boolean(forceTestMode)

  // Recupera ou cria lead no banco Neon
  let lead = await getOrCreateWhatsAppLead(cleanPhone, isDiego)
  const history = Array.isArray(lead.history) ? [...lead.history] : []

  // ----------------------------------------------------------------
  // REGRA 3: MODO DE TESTE (DIEGO) - RESET COM "OI" OU "RESET"
  // ----------------------------------------------------------------
  if (isDiego && (lowerText === 'oi' || lowerText === 'olá' || lowerText === 'reset' || lowerText === 'reiniciar')) {
    lead = await resetWhatsAppLead(cleanPhone)
    const initialGreeting = `[MODO TESTE ATIVO - DIEGO]\nOlá! Sou o assistente virtual da Dra. Bruna Dourado.\n\nPara direcionar seu atendimento:\n1. De qual *cidade e estado* você fala?\n2. Seu contato é para um assunto *Profissional/Jurídico* ou *Pessoal*?`

    const newHistory = [
      ...history,
      { sender: 'client' as const, text: rawText, timestamp: new Date().toISOString() },
      { sender: 'bot' as const, text: initialGreeting, timestamp: new Date().toISOString() },
    ]

    const updated = await updateWhatsAppLead(cleanPhone, {
      conversation_step: 'aguardando_saudacao',
      status: 'em_triagem',
      is_test_mode: true,
      history: newHistory,
    })

    return {
      reply: initialGreeting,
      source: 'rule_engine',
      status: 'em_triagem',
      isTestMode: true,
      resetTriggered: true,
      lead: updated || lead,
    }
  }

  // ----------------------------------------------------------------
  // REGRA 2.A: TRIAGEM INICIAL DE CONTATO DESCONHECIDO
  // ----------------------------------------------------------------
  // Se for assunto pessoal e NÃO for o modo de teste Diego
  if (
    !isDiego &&
    (lowerText === 'pessoal' ||
      lowerText.includes('é pessoal') ||
      lowerText.includes('assunto pessoal') ||
      lowerText.includes('amigo') ||
      lowerText.includes('familiar'))
  ) {
    const personalReply = 'Em breve, Bruna vai te dar uma resposta.'

    const newHistory = [
      ...history,
      { sender: 'client' as const, text: rawText, timestamp: new Date().toISOString() },
      { sender: 'bot' as const, text: personalReply, timestamp: new Date().toISOString() },
    ]

    const updated = await updateWhatsAppLead(cleanPhone, {
      status: 'pessoal',
      conversation_step: 'pausado_pessoal',
      history: newHistory,
    })

    return {
      reply: personalReply,
      source: 'rule_engine',
      status: 'pessoal',
      isTestMode: false,
      lead: updated || lead,
    }
  }

  // Se o lead já estava marcado como "pessoal" e não é Diego, o bot permanece pausado
  if (!isDiego && lead.status === 'pessoal') {
    return {
      reply: '',
      source: 'rule_engine',
      status: 'pessoal_pausado',
      isTestMode: false,
      lead,
    }
  }

  // ----------------------------------------------------------------
  // REGRA 4: CONSULTA PRIMEIRO AO CACHE DO BANCO NEON
  // ----------------------------------------------------------------
  let detectedCategory = lead.area || 'geral'
  if (lowerText.includes('trabalh')) detectedCategory = 'trabalhista'
  else if (lowerText.includes('consumid') || lowerText.includes('golpe') || lowerText.includes('banco')) detectedCategory = 'consumidor'
  else if (lowerText.includes('civel') || lowerText.includes('divorc') || lowerText.includes('imovel')) detectedCategory = 'civel'

  const cachedItem = await findCachedBotAnswer(rawText, detectedCategory)

  if (cachedItem) {
    const replyText = cachedItem.answer

    const newHistory = [
      ...history,
      { sender: 'client' as const, text: rawText, timestamp: new Date().toISOString() },
      { sender: 'bot' as const, text: replyText, timestamp: new Date().toISOString() },
    ]

    const updated = await updateWhatsAppLead(cleanPhone, {
      area: detectedCategory,
      status: 'qualificado',
      history: newHistory,
    })

    return {
      reply: replyText,
      source: 'cache_neon',
      status: 'qualificado',
      area: detectedCategory,
      isTestMode: isDiego,
      lead: updated || lead,
    }
  }

  // ----------------------------------------------------------------
  // SE NÃO ESTIVER NO CACHE -> CHAMA GEMINI AI
  // ----------------------------------------------------------------
  const aiGeneratedReply = await callGeminiApi(rawText, history, customApiKey)

  // Salva a nova pergunta/resposta aprendida no banco Neon para uso futuro
  if (rawText.length > 5 && aiGeneratedReply.length > 10) {
    try {
      const keywords = rawText
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter((w) => w.length > 3)
        .slice(0, 5)

      await saveLearnedBotAnswer(detectedCategory, rawText, aiGeneratedReply, keywords)
    } catch (saveErr) {
      console.warn('Erro ao salvar resposta aprendida no Neon:', saveErr)
    }
  }

  const newHistory = [
    ...history,
    { sender: 'client' as const, text: rawText, timestamp: new Date().toISOString() },
    { sender: 'bot' as const, text: aiGeneratedReply, timestamp: new Date().toISOString() },
  ]

  const updated = await updateWhatsAppLead(cleanPhone, {
    area: detectedCategory,
    status: 'qualificado',
    history: newHistory,
  })

  return {
    reply: aiGeneratedReply,
    source: 'gemini_ai',
    status: 'qualificado',
    area: detectedCategory,
    isTestMode: isDiego,
    lead: updated || lead,
  }
}
