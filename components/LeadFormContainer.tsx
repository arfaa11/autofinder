'use client'
import { useState } from 'react'
import { submitLead } from '@/app/actions'
import VehicleStep from './form/VehicleStep'
import EmploymentStep from './form/EmploymentStep'
import IncomeStep from './form/IncomeStep'
import ContactStep from './form/ContactStep'

export default function LeadFormContainer() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    vehicle_type: '', employment_status: '', monthly_income_range: '',
    name: '', city: '', postal_code: '', phone: '', email: ''
  })

  const update = (key: string, value: string) => setFormData(p => ({ ...p, [key]: value }))

  async function handleFinalSubmit() {
    setStatus('submitting')
    try {
      await submitLead(formData)
      setStatus('success')
    } catch (e: any) { alert(e.message); setStatus('idle') }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-xl shadow-sm">
      {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); setStep(2) }} />}
      {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); setStep(3) }} onBack={() => setStep(1)} />}
      {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); setStep(4) }} onBack={() => setStep(2)} />}
      {step === 4 && <ContactStep data={formData} onUpdate={update} onBack={() => setStep(3)} onSubmit={handleFinalSubmit} status={status} />}
      {status === 'success' && <p className="text-green-600 text-center mt-4 font-bold">Registration complete!</p>}
    </div>
  )
}