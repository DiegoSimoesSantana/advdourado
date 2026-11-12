'use client'

import React from 'react'
import { CaseTriageForm } from '@/components/case-triage-form'

interface LeadFormProps {
  area?: string
}

export function LeadForm({ area = 'Atendimento Jurídico' }: LeadFormProps) {
  return <CaseTriageForm areaTitle={area} areaId={area.toLowerCase()} compact />
}
