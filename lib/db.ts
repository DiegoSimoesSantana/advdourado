import { neon } from '@neondatabase/serverless'

type LeadPayload = {
  name: string
  email: string
  phone: string
  area: string
  subject: string
  message: string
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL não configurada')
  }
  return url
}

export async function saveLead(payload: LeadPayload) {
  const sql = neon(getDatabaseUrl())

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      area TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `

  const [inserted] = await sql`
    INSERT INTO leads (name, email, phone, area, subject, message)
    VALUES (${payload.name}, ${payload.email}, ${payload.phone}, ${payload.area}, ${payload.subject}, ${payload.message})
    RETURNING id, created_at;
  `

  return inserted
}
