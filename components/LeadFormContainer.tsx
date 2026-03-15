'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div key={step} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
          {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); setStep(2) }} />}
          {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); setStep(3) }} onBack={() => setStep(1)} />}
          {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); setStep(4) }} onBack={() => setStep(2)} />}
          {step === 4 && <ContactStep data={formData} onUpdate={update} onBack={() => setStep(3)} onSubmit={async () => { setStatus('submitting'); await submitLead(formData); setStatus('success'); }} status={status} />}
        </motion.div>
      </AnimatePresence>
      {status === 'success' && <p className="mt-6 text-center text-green-600 font-bold animate-pulse">Registration complete!</p>}
    </div>
  )
}