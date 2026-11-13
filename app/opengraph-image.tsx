import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dra. Bruna Dourado — Advocacia e Assessoria Jurídica (OAB/BA 71507)'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(197, 168, 128, 0.22), transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #121212 60%, #1a1610 100%)',
          padding: '64px 72px',
          border: '2px solid rgba(197, 168, 128, 0.35)',
          color: '#faf9f6',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                border: '2px solid #c5a880',
                backgroundColor: 'rgba(197, 168, 128, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
                color: '#c5a880',
              }}
            >
              BD
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '18px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#c5a880',
                }}
              >
                Advocacia Especializada • Salvador/BA
              </span>
              <span
                style={{
                  fontSize: '22px',
                  color: '#e5e0d5',
                  marginTop: '4px',
                }}
              >
                OAB/BA 71507
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              border: '1px solid rgba(197, 168, 128, 0.45)',
              backgroundColor: 'rgba(197, 168, 128, 0.1)',
              color: '#c5a880',
              fontSize: '16px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Atendimento Direto com a Doutora
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '960px' }}>
          <div
            style={{
              fontSize: '60px',
              fontWeight: 700,
              lineHeight: 1.12,
              color: '#faf9f6',
              marginBottom: '20px',
            }}
          >
            Dra. Bruna Dourado
          </div>
          <div
            style={{
              fontSize: '30px',
              lineHeight: 1.35,
              color: '#c5a880',
              marginBottom: '20px',
            }}
          >
            Advocacia e Assessoria Jurídica Estratégica
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: 1.5,
              color: '#d6d3cd',
            }}
          >
            Trabalhista • Educacional (B2B) • Família Consensual • Consumidor Patrimonial • Imóveis e Inventário • Planos de Saúde
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(197, 168, 128, 0.25)',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#e5e0d5',
          }}
        >
          <span>advdourado.com.br</span>
          <span style={{ color: '#c5a880' }}>WhatsApp: +55 (71) 99236-3943</span>
          <span>Salvador e Região Metropolitana</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

