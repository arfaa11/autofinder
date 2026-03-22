'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react'
import VehicleStep from './form/VehicleStep'
import EmploymentStep from './form/EmploymentStep'
import IncomeStep from './form/IncomeStep'
import ContactStep from './form/ContactStep'

const variants = {
  enter: (direction: number) => ({ y: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? -24 : 24, opacity: 0 }),
}

const TOTAL_STEPS = 4

export default function LeadFormContainer() {
  const [[step, direction], setStepWithDirection] = useState([0, 0])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
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

  const paginate = (nextStep: number) => {
    setStepWithDirection([nextStep, nextStep > step ? 1 : -1])
  }

  const update = (key: string, value: string) =>
    setFormData(p => ({ ...p, [key]: value }))

  return (
    <div className="w-full flex flex-col items-center justify-start py-10 md:py-20 px-4">
      <AnimatePresence mode="wait" custom={direction}>

        {/* ── step 0: hero ──────────────────────────────────── */}
        {step === 0 && (
          <motion.div
            key="hero"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="flex flex-col items-center text-center space-y-10 max-w-3xl w-full"
          >
            {/* headline */}
            <div className="space-y-5">
              <h2 className="text-5xl md:text-[5.5rem] font-black text-black leading-[1] uppercase tracking-[-0.02em]">
                your new car is{" "}
                <br className="hidden md:block" />
                <span className="text-blue-600">one click away.</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-500 font-semibold max-w-xl mx-auto leading-relaxed">
                Edmonton's fastest credit approvals. No matter your history, we have a deal for you.
              </p>
            </div>

            {/* CTA button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0px 24px 48px rgba(37, 99, 235, 0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => paginate(1)}
              className="group relative flex items-center justify-center gap-4 px-10 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm md:text-base shadow-lg overflow-hidden"
            >
              {/* shine sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative leading-none">get approved now</span>
              <ArrowRight
                className="relative group-hover:translate-x-1.5 transition-transform duration-200 w-5 h-5"
                strokeWidth={3}
              />
            </motion.button>

            {/* trust pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                { icon: Zap, label: "fast results" },
                { icon: Lock, label: "secure & private" },
                { icon: ShieldCheck, label: "no obligations" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider"
                >
                  <Icon size={13} className="text-blue-600" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── steps 1–4: form ───────────────────────────────── */}
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
            {/* progress bar */}
            <div className="flex gap-1.5 w-full mb-8">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-neutral-200"
                >
                  <motion.div
                    className="h-full bg-black rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                  />
                </div>
              ))}
            </div>

            {/* step label */}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-center mb-6">
              step {step} of {TOTAL_STEPS}
            </p>

            {/* step modules */}
            <div>
              {step === 1 && (
                <VehicleStep onNext={(v) => { update('vehicle_type', v); paginate(2) }} />
              )}
              {step === 2 && (
                <EmploymentStep
                  onNext={(e) => { update('employment_status', e); paginate(3) }}
                  onBack={() => paginate(1)}
                />
              )}
              {step === 3 && (
                <IncomeStep
                  onNext={(i) => { update('monthly_income_range', i); paginate(4) }}
                  onBack={() => paginate(2)}
                />
              )}
              {step === 4 && (
                <ContactStep
                  onUpdate={update}
                  onBack={() => paginate(3)}
                  onSubmit={async () => {
                    setStatus('submitting')
                    try {
                      const response = await fetch('/api', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                      })
                      const result = await response.json()
                      if (result.success) {
                        setStatus('success')
                      } else {
                        alert("Error: " + (result.error || "Submission failed"))
                        setStatus('idle')
                      }
                    } catch (err) {
                      console.error("Submission failed:", err)
                      alert("Network error. Please try again.")
                      setStatus('idle')
                    }
                  }}
                  status={status}
                />
              )}
            </div>
          </motion.div>
        )}

        {/* ── success state ─────────────────────────────────── */}
        {status === 'success' && (
          <motion.div
            key="success"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            className="flex flex-col items-center text-center p-12 bg-white rounded-[2rem] max-w-md mx-auto"
            style={{
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.10)"
            }}
          >
            {/* animated checkmark */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-8 shadow-lg"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </svg>
            </motion.div>

            <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-3">
              you're in!
            </h2>
            <p className="text-neutral-500 text-base font-semibold leading-relaxed">
              Our Edmonton team is reviewing your application.
              Expect a call from us shortly to discuss your options.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}