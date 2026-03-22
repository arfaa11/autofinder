'use client'
import { motion } from 'framer-motion'
import { User, Building2, MapPin, Phone, Mail } from 'lucide-react'

const fields = [
  { icon: User, key: 'name', placeholder: 'Full name', type: 'text', autoComplete: 'name' },
  { icon: Building2, key: 'city', placeholder: 'City', type: 'text', autoComplete: 'address-level2' },
  { icon: MapPin, key: 'postal_code', placeholder: 'Postal code', type: 'text', autoComplete: 'postal-code' },
  { icon: Phone, key: 'phone', placeholder: 'Phone (10 digits)', type: 'tel', autoComplete: 'tel' },
  { icon: Mail, key: 'email', placeholder: 'Email address', type: 'email', autoComplete: 'email' },
]

export default function ContactStep({
  onUpdate,
  onBack,
  onSubmit,
  status,
}: any) {
  const isSubmitting = status === 'submitting'

  return (
    <div className="flex flex-col space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          your details
        </h2>
        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mt-1">
          almost there — last step
        </p>
      </div>

      <div className="space-y-3">
        {fields.map(({ icon: Icon, key, placeholder, type, autoComplete }, i) => (
          <motion.div
            key={key}
            className="input-wrapper"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Icon className="input-icon" size={17} strokeWidth={2.2} />
            <input
              id={key}
              name={key}
              type={type}
              placeholder={placeholder}
              onChange={e => onUpdate(key, e.target.value)}
              className="input-field-with-icon"
              disabled={isSubmitting}
              autoComplete={autoComplete}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 pt-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-4 bg-neutral-100 rounded-2xl text-black text-xs font-black uppercase tracking-widest transition-colors hover:bg-neutral-200 disabled:opacity-40"
        >
          ← back
        </button>

        <motion.button
          type="button"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-colors hover:bg-blue-700 disabled:bg-neutral-300 disabled:text-neutral-500 shadow-md hover:shadow-lg relative overflow-hidden"
        >
          {/* shine */}
          {!isSubmitting && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          )}
          <span className="relative">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                submitting...
              </span>
            ) : (
              'get my approval →'
            )}
          </span>
        </motion.button>
      </div>

      <p className="text-center text-[10px] text-neutral-400 font-semibold">
        🔒 your information is encrypted and never shared
      </p>
    </div>
  )
}