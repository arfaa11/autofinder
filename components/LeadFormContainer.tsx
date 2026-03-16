'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead } from '@/app/actions'
import VehicleStep from './form/VehicleStep'
import EmploymentStep from './form/EmploymentStep'
import IncomeStep from './form/IncomeStep'
import ContactStep from './form/ContactStep'

const variants = {
  enter: (direction: number) => ({ y: direction > 0 ? 20 : -20, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? -20 : 20, opacity: 0 }),
}

export default function LeadFormContainer() {
  const [[step, direction], setStepWithDirection] = useState([1, 0])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    vehicle_type: '', employment_status: '', monthly_income_range: '',
    name: '', city: '', postal_code: '', phone: '', email: ''
  })

  const paginate = (nextStep: number) => {
    const dir = nextStep > step ? 1 : -1
    setStepWithDirection([nextStep, dir])
  }

  const update = (key: string, value: string) => setFormData(p => ({ ...p, [key]: value }))

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-6">
      {/* Applying the .form-container class from globals.css for modularity */}
      <div className="form-container">
        
        <AnimatePresence mode="wait" custom={direction}>
          {status === 'success' ? (
            <motion.div 
              key="success"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-black">Thank you!</h2>
              <p className="text-black mt-2">Our team will be reaching out to you soon to assist you with your vehicle needs.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-8"
            >
              {/* Progress Tracker */}
              <div className="flex gap-2 w-full max-w-[200px] mx-auto mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-black' : 'bg-[#aaaaaa]'}`} 
                  />
                ))}
              </div>

              {/* The "Step" wrapper provides the content */}
              <div>
                {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); paginate(2) }} />}
                {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); paginate(3) }} onBack={() => paginate(1)} />}
                {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); paginate(4) }} onBack={() => paginate(2)} />}
                {step === 4 && <ContactStep onUpdate={update} onBack={() => paginate(3)} onSubmit={async () => { setStatus('submitting'); await submitLead(formData); setStatus('success'); }} status={status} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}