import { neon } from '@neondatabase/serverless'

export type LeadPayload = {
  name: string
  email: string
  phone: string
  area: string
  subject: string
  message: string
}

export type BotKnowledgeItem = {
  id?: number
  category: string
  pattern_question: string
  answer: string
  keywords?: string[]
  usage_count?: number
  is_verified?: boolean
  created_at?: string
  updated_at?: string
}

export type WhatsAppLeadItem = {
  id?: number
  phone: string
  name?: string
  city?: string
  state?: string
  area?: string
  subject?: string
  status?: string
  conversation_step?: string
  notes?: string
  history?: Array<{ sender: 'client' | 'bot' | 'bruna'; text: string; timestamp: string }>
  is_test_mode?: boolean
  created_at?: string
  updated_at?: string
}

export type SocialPostItem = {
  id?: number
  post_type: 'texto' | 'imagem' | 'video'
  title?: string
  caption: string
  caption_linkedin?: string
  caption_instagram?: string
  caption_facebook?: string
  caption_whatsapp?: string
  media_url?: string
  media_type?: string
  target_networks?: string[]
  status?: 'rascunho' | 'publicado' | 'agendado'
  created_at?: string
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL não configurada')
  }
  return url
}

export function getDb() {
  return neon(getDatabaseUrl())
}

// Inicializa tabelas caso ainda não existam no Neon
export async function ensureTablesExist() {
  const sql = getDb()

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      area TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      source TEXT DEFAULT 'site',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS bot_knowledge_base (
      id BIGSERIAL PRIMARY KEY,
      category TEXT NOT NULL DEFAULT 'geral',
      pattern_question TEXT NOT NULL,
      answer TEXT NOT NULL,
      keywords TEXT[] DEFAULT '{}',
      usage_count INTEGER NOT NULL DEFAULT 1,
      is_verified BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS whatsapp_leads (
      id BIGSERIAL PRIMARY KEY,
      phone TEXT NOT NULL UNIQUE,
      name TEXT,
      city TEXT,
      state TEXT,
      area TEXT,
      subject TEXT,
      status TEXT NOT NULL DEFAULT 'novo',
      conversation_step TEXT NOT NULL DEFAULT 'inicio',
      notes TEXT,
      history JSONB NOT NULL DEFAULT '[]'::jsonb,
      is_test_mode BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS social_posts (
      id BIGSERIAL PRIMARY KEY,
      post_type TEXT NOT NULL DEFAULT 'texto',
      title TEXT,
      caption TEXT NOT NULL,
      caption_linkedin TEXT,
      caption_instagram TEXT,
      caption_facebook TEXT,
      caption_whatsapp TEXT,
      media_url TEXT,
      media_type TEXT,
      target_networks TEXT[] DEFAULT ARRAY['linkedin', 'instagram', 'facebook', 'whatsapp'],
      status TEXT NOT NULL DEFAULT 'rascunho',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `
}

// Salvar Lead do Site
export async function saveLead(payload: LeadPayload) {
  const sql = getDb()
  await ensureTablesExist()

  const [inserted] = await sql`
    INSERT INTO leads (name, email, phone, area, subject, message)
    VALUES (${payload.name}, ${payload.email}, ${payload.phone}, ${payload.area}, ${payload.subject}, ${payload.message})
    RETURNING id, created_at;
  `

  return inserted
}

// ----------------------------------------------------
// BASE DE CONHECIMENTO DO BOT (CACHE INTELIGENTE)
// ----------------------------------------------------

export async function findCachedBotAnswer(userMessage: string, category?: string): Promise<BotKnowledgeItem | null> {
  const sql = getDb()
  await ensureTablesExist()

  const cleaned = userMessage.toLowerCase().trim()
  const words = cleaned.split(/\s+/).filter((w) => w.length > 2)

  // 1. Busca exata ou por similaridade direta
  const directMatches = (await sql`
    SELECT * FROM bot_knowledge_base
    WHERE LOWER(pattern_question) = ${cleaned}
       OR ${cleaned} ILIKE '%' || LOWER(pattern_question) || '%'
       OR LOWER(pattern_question) ILIKE '%' || ${cleaned} || '%'
    ORDER BY usage_count DESC, id ASC
    LIMIT 1;
  `) as BotKnowledgeItem[]

  if (directMatches.length > 0) {
    const match = directMatches[0]
    // Incrementa contagem de uso de forma assíncrona
    await sql`
      UPDATE bot_knowledge_base
      SET usage_count = usage_count + 1, updated_at = NOW()
      WHERE id = ${match.id};
    `
    return match
  }

  // 2. Busca por interseção de palavras-chave se houver
  if (words.length > 0) {
    const keywordMatches = (await sql`
      SELECT * FROM bot_knowledge_base
      WHERE keywords && ${words}
      ORDER BY usage_count DESC
      LIMIT 1;
    `) as BotKnowledgeItem[]

    if (keywordMatches.length > 0) {
      const match = keywordMatches[0]
      await sql`
        UPDATE bot_knowledge_base
        SET usage_count = usage_count + 1, updated_at = NOW()
        WHERE id = ${match.id};
      `
      return match
    }
  }

  return null
}

export async function saveLearnedBotAnswer(
  category: string,
  patternQuestion: string,
  answer: string,
  keywords: string[] = []
): Promise<BotKnowledgeItem> {
  const sql = getDb()
  await ensureTablesExist()

  const [inserted] = (await sql`
    INSERT INTO bot_knowledge_base (category, pattern_question, answer, keywords, usage_count, is_verified)
    VALUES (${category}, ${patternQuestion.trim()}, ${answer.trim()}, ${keywords}, 1, true)
    RETURNING *;
  `) as BotKnowledgeItem[]

  return inserted
}

export async function listBotKnowledge(): Promise<BotKnowledgeItem[]> {
  const sql = getDb()
  await ensureTablesExist()

  const list = (await sql`
    SELECT * FROM bot_knowledge_base
    ORDER BY usage_count DESC, updated_at DESC
    LIMIT 100;
  `) as BotKnowledgeItem[]

  return list
}

export async function deleteBotKnowledge(id: number) {
  const sql = getDb()
  await sql`DELETE FROM bot_knowledge_base WHERE id = ${id};`
}

// ----------------------------------------------------
// GESTÃO DE LEADS DO WHATSAPP
// ----------------------------------------------------

export async function getOrCreateWhatsAppLead(phone: string, isTestMode = false): Promise<WhatsAppLeadItem> {
  const sql = getDb()
  await ensureTablesExist()

  const cleanPhone = phone.replace(/\D/g, '')

  const existing = (await sql`
    SELECT * FROM whatsapp_leads
    WHERE phone = ${cleanPhone}
    LIMIT 1;
  `) as WhatsAppLeadItem[]

  if (existing.length > 0) {
    return existing[0]
  }

  const [inserted] = (await sql`
    INSERT INTO whatsapp_leads (phone, status, conversation_step, is_test_mode, history)
    VALUES (${cleanPhone}, 'novo', 'inicio', ${isTestMode}, '[]'::jsonb)
    RETURNING *;
  `) as WhatsAppLeadItem[]

  return inserted
}

export async function updateWhatsAppLead(phone: string, updates: Partial<WhatsAppLeadItem>) {
  const sql = getDb()
  await ensureTablesExist()

  const cleanPhone = phone.replace(/\D/g, '')

  const lead = await getOrCreateWhatsAppLead(cleanPhone)
  const currentHistory = Array.isArray(lead.history) ? lead.history : []

  const newHistory = updates.history ? updates.history : currentHistory

  const [updated] = (await sql`
    UPDATE whatsapp_leads
    SET 
      name = COALESCE(${updates.name ?? null}, name),
      city = COALESCE(${updates.city ?? null}, city),
      state = COALESCE(${updates.state ?? null}, state),
      area = COALESCE(${updates.area ?? null}, area),
      subject = COALESCE(${updates.subject ?? null}, subject),
      status = COALESCE(${updates.status ?? null}, status),
      conversation_step = COALESCE(${updates.conversation_step ?? null}, conversation_step),
      notes = COALESCE(${updates.notes ?? null}, notes),
      history = ${JSON.stringify(newHistory)}::jsonb,
      is_test_mode = COALESCE(${updates.is_test_mode ?? null}, is_test_mode),
      updated_at = NOW()
    WHERE phone = ${cleanPhone}
    RETURNING *;
  `) as WhatsAppLeadItem[]

  return updated
}

export async function resetWhatsAppLead(phone: string) {
  const sql = getDb()
  await ensureTablesExist()
  const cleanPhone = phone.replace(/\D/g, '')

  const [reset] = (await sql`
    UPDATE whatsapp_leads
    SET 
      conversation_step = 'inicio',
      status = 'novo',
      area = NULL,
      subject = NULL,
      updated_at = NOW()
    WHERE phone = ${cleanPhone}
    RETURNING *;
  `) as WhatsAppLeadItem[]

  return reset
}

export async function listWhatsAppLeads(): Promise<WhatsAppLeadItem[]> {
  const sql = getDb()
  await ensureTablesExist()

  const list = (await sql`
    SELECT * FROM whatsapp_leads
    ORDER BY updated_at DESC
    LIMIT 100;
  `) as WhatsAppLeadItem[]

  return list
}

// ----------------------------------------------------
// GESTÃO DE POSTS SOCIAIS (SOCIAL HUB)
// ----------------------------------------------------

export async function saveSocialPost(post: SocialPostItem): Promise<SocialPostItem> {
  const sql = getDb()
  await ensureTablesExist()

  const [inserted] = (await sql`
    INSERT INTO social_posts (
      post_type, title, caption, caption_linkedin, caption_instagram, 
      caption_facebook, caption_whatsapp, media_url, media_type, target_networks, status
    )
    VALUES (
      ${post.post_type}, ${post.title ?? null}, ${post.caption}, 
      ${post.caption_linkedin ?? null}, ${post.caption_instagram ?? null}, 
      ${post.caption_facebook ?? null}, ${post.caption_whatsapp ?? null}, 
      ${post.media_url ?? null}, ${post.media_type ?? null}, 
      ${post.target_networks ?? ['linkedin', 'instagram', 'facebook', 'whatsapp']}, 
      ${post.status ?? 'rascunho'}
    )
    RETURNING *;
  `) as SocialPostItem[]

  return inserted
}

export async function listSocialPosts(): Promise<SocialPostItem[]> {
  const sql = getDb()
  await ensureTablesExist()

  const list = (await sql`
    SELECT * FROM social_posts
    ORDER BY created_at DESC
    LIMIT 50;
  `) as SocialPostItem[]

  return list
}
