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

  return (
    <div className="max-w-md w-full min-h-[600px] p-8 bg-white border border-gray-100 rounded-3xl shadow-2xl flex flex-col justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        
        {status === 'success' ? (
          // SUCCESS SCREEN: Hard locked, no navigation
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
            <p className="text-gray-500 leading-relaxed">
              We've received your request. One of our specialists will contact you shortly regarding your vehicle selection.
            </p>
          </motion.div>
        ) : (
          // FORM SCREENS: Step-by-step logic
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {/* Progress Bar */}
            <div className="mb-8 flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              ))}
            </div>

            {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); setStep(2) }} />}
            {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); setStep(3) }} onBack={() => setStep(1)} />}
            {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); setStep(4) }} onBack={() => setStep(2)} />}
            {step === 4 && <ContactStep onUpdate={update} onBack={() => setStep(3)} onSubmit={async () => { setStatus('submitting'); await submitLead(formData); setStatus('success'); }} status={status} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}