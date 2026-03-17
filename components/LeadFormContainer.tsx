'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react'
import { submitLead } from '@/app/actions'
import VehicleStep from './form/VehicleStep'
import EmploymentStep from './form/EmploymentStep'
import IncomeStep from './form/IncomeStep'
import ContactStep from './form/ContactStep'

/**
 * animation variants for step-based transitions.
 * handles vertical displacement and opacity based on navigation direction.
 */
const variants = {
  enter: (direction: number) => ({ y: direction > 0 ? 20 : -20, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? -20 : 20, opacity: 0 }),
}

export default function LeadFormContainer() {
  /**
   * state management for multi-step navigation.
   * step 0: entry hero section.
   * step 1-4: data collection sequence.
   */
  const [[step, direction], setStepWithDirection] = useState([0, 0])
  
  // asynchronous submission status tracking
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  
  // centralized form state for lead generation data
  const [formData, setFormData] = useState({
    vehicle_type: '', 
    employment_status: '', 
    monthly_income_range: '',
    name: '', 
    city: '', 
    postal_code: '', 
    phone: '', 
    email: ''
  })

  // updates step index and sets animation directionality
  const paginate = (nextStep: number) => {
    const dir = nextStep > step ? 1 : -1
    setStepWithDirection([nextStep, dir])
  }

  // functional update for nested form state keys
  const update = (key: string, value: string) => setFormData(p => ({ ...p, [key]: value }))

  return (
    <div className="w-full flex flex-col items-center justify-start py-8 md:py-16 px-4 min-h-[60vh]">
      <AnimatePresence mode="wait" custom={direction}>
        
        {/* entry section - conversion hook and primary cta */}
        {step === 0 && (
          <motion.div
            key="hero"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center text-center space-y-10 max-w-4xl"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-black font-montserrat leading-tight uppercase tracking-tighter">
                your new car is <br />
                <span className="text-blue-600">one click away.</span>
              </h2>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium max-w-2xl mx-auto">
                Edmonton's fastest credit approvals. No matter your history, we have a deal for you.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => paginate(1)}
              className="group flex items-center justify-center gap-4 px-10 md:px-12 py-8 bg-blue-600 text-white rounded-full text-1xl md:text-1xl font-black uppercase tracking-widest shadow-xl transition-all"
            >
              <span className="leading-none">get approved now</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
            </motion.button>

            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-neutral-500 font-bold text-xs uppercase">
                <Zap size={16} className="text-blue-600" />
                fast results
              </div>
              <div className="flex items-center gap-2 text-neutral-500 font-bold text-xs uppercase">
                <Lock size={16} className="text-blue-600" />
                secure & private
              </div>
              <div className="flex items-center gap-2 text-neutral-500 font-bold text-xs uppercase">
                <ShieldCheck size={16} className="text-blue-600" />
                no obligations
              </div>
            </div>
          </motion.div>
        )}

        {/* lead capture sequence - renders conditional sub-steps */}
        {step > 0 && status !== 'success' && (
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-container"
          >
            {/* visual progress indicator */}
            <div className="flex gap-2 w-full max-w-[200px] mx-auto mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-black' : 'bg-[#aaaaaa]'}`} 
                />
              ))}
            </div>

            {/* step-specific form modules */}
            <div>
              {step === 1 && <VehicleStep onNext={(v) => { update('vehicle_type', v); paginate(2) }} />}
              {step === 2 && <EmploymentStep onNext={(e) => { update('employment_status', e); paginate(3) }} onBack={() => paginate(1)} />}
              {step === 3 && <IncomeStep onNext={(i) => { update('monthly_income_range', i); paginate(4) }} onBack={() => paginate(2)} />}
              {step === 4 && (
                <ContactStep 
                  onUpdate={update} 
                  onBack={() => paginate(3)} 
                  onSubmit={async () => { 
                    setStatus('submitting'); 
                    const result = await submitLead(formData); 
                    if (result?.success) {
                      setStatus('success'); 
                    } else {
                      alert("Error: " + (result?.error || "Submission failed"));
                      setStatus('idle');
                    }
                  }} 
                  status={status} 
                />
              )}
            </div>
          </motion.div>
        )}

        {/* post-submission success state */}
        {status === 'success' && (
          <motion.div 
            key="success"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            className="text-center p-12 bg-white rounded-[2rem] shadow-2xl max-w-md mx-auto"
          >
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-4xl font-black text-black font-montserrat uppercase">success!</h2>
            <p className="text-neutral-600 mt-4 text-lg">
              Our Edmonton team is reviewing your application. Expect a call from us shortly to discuss your options!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}