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
    /* Removed h-[650px], flex-col, and justify-center to allow natural content flow */
    <div className="max-w-xl w-full mx-auto py-20 px-6">
      <AnimatePresence mode="wait">
        
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold">Thank You.</h2>
            <p className="text-neutral-500">Your request has been processed.</p>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Progress Tracker: Now flows naturally at the top */}
            <div className="flex gap-2 w-full max-w-sm mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-white' : 'bg-neutral-800'}`} 
                />
              ))}
            </div>

            {/* Content area: Flowing naturally without fixed height constraints */}
            <div>
              {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); setStep(2) }} />}
              {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); setStep(3) }} onBack={() => setStep(1)} />}
              {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); setStep(4) }} onBack={() => setStep(2)} />}
              {step === 4 && <ContactStep onUpdate={update} onBack={() => setStep(3)} onSubmit={async () => { setStatus('submitting'); await submitLead(formData); setStatus('success'); }} status={status} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}