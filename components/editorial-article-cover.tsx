import {
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Home,
  Stethoscope,
  Scale,
} from 'lucide-react'
import { BrandEmblem } from '@/components/brand-emblem'

type EditorialArticleCoverProps = {
  category: string
  categoryName: string
  variant?: 'card' | 'hero'
}

const categoryVisuals: Record<
  string,
  {
    icon: typeof Scale
    accentLabel: string
    patternClass: string
  }
> = {
  trabalhista: {
    icon: BriefcaseBusiness,
    accentLabel: 'Direito & Processo do Trabalho',
    patternClass: 'from-[#0a0a0a] via-[#151310] to-[#1f1a12]',
  },
  educacional: {
    icon: Building2,
    accentLabel: 'Instituições de Ensino',
    patternClass: 'from-[#0a0a0a] via-[#11151c] to-[#1a1610]',
  },
  familia: {
    icon: HeartHandshake,
    accentLabel: 'Via Extrajudicial • Cartório & Consenso',
    patternClass: 'from-[#0a0a0a] via-[#171312] to-[#211b14]',
  },
  imobiliario: {
    icon: Home,
    accentLabel: 'Patrimônio, Imóveis & Sucessões',
    patternClass: 'from-[#0a0a0a] via-[#121615] to-[#1e1912]',
  },
  saude: {
    icon: Stethoscope,
    accentLabel: 'Tutela de Urgência • Beneficiários',
    patternClass: 'from-[#0a0a0a] via-[#101718] to-[#1b1711]',
  },
  bancos: {
    icon: ShieldCheck,
    accentLabel: 'Defesa Bancária & Proteção Patrimonial',
    patternClass: 'from-[#0a0a0a] via-[#141418] to-[#1f1912]',
  },
  compras: {
    icon: ShieldCheck,
    accentLabel: 'Relações de Consumo & Responsabilidade Civil',
    patternClass: 'from-[#0a0a0a] via-[#141418] to-[#1f1912]',
  },
  voos: {
    icon: ShieldCheck,
    accentLabel: 'Direito do Passageiro & Indenizações',
    patternClass: 'from-[#0a0a0a] via-[#141418] to-[#1f1912]',
  },
}

export function EditorialArticleCover({
  category,
  categoryName,
  variant = 'card',
}: EditorialArticleCoverProps) {
  const visual = categoryVisuals[category] ?? {
    icon: Scale,
    accentLabel: 'Publicação Jurídica Informativa',
    patternClass: 'from-[#0a0a0a] via-[#141414] to-[#1f1a12]',
  }
  const Icon = visual.icon

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${visual.patternClass} text-[#faf9f6] select-none ${
        variant === 'hero' ? 'h-56 sm:h-64' : 'h-48'
      }`}
    >
      {/* Grade arquitetônica sutil em dourado */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(197, 168, 128, 0.35), transparent 55%), linear-gradient(to right, rgba(197, 168, 128, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 168, 128, 0.08) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      {/* Ícone temático conceitual em marca d'água */}
      <Icon
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-6 -right-4 text-[#c5a880]/10 transition-transform duration-500 group-hover:scale-105 ${
          variant === 'hero' ? 'h-44 w-44' : 'h-36 w-36'
        }`}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5">
            <BrandEmblem size="sm" className="h-7 w-7" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
              Editorial Jurídico
            </span>
          </div>

          <span className="rounded-full border border-[#c5a880]/40 bg-[#0a0a0a]/80 px-3 py-1 text-xs font-semibold tracking-wider text-[#c5a880]">
            OAB/BA 71507
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[#c5a880]/20 pt-4">
          <div>
            <p className="font-serif text-lg font-bold text-[#faf9f6] sm:text-xl">
              {categoryName}
            </p>
            <p className="mt-0.5 text-xs font-medium tracking-wide text-[#c5a880]/90">
              {visual.accentLabel}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c5a880]/35 bg-[#c5a880]/10 text-[#c5a880]">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
